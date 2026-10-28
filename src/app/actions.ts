"use server";

import { claimSchema, fieldErrorsFrom, formDataToObject, partnerSchema, type FormState } from "@/lib/forms";
import { contactEmail } from "@/lib/site";

// Complete submissions faster than this after the form loaded are treated as possibly automated.
const MIN_FILL_MS = 2000;

type Kind = "team_claim" | "partner_enquiry";

// The hidden honeypot field is only ever filled in by bots.
function isBot(formData: FormData) {
  return Boolean(formData.get("_gotcha"));
}

// A complete form sent within moments of loading is probably automated, but could be autofill,
// so the visitor is asked to send it again rather than being silently dropped.
function tooFast(formData: FormData) {
  const started = Number(formData.get("_started"));
  return Number.isFinite(started) && started > 0 && Date.now() - started < MIN_FILL_MS;
}

const tooFastState = (values: FormState["values"]): FormState => ({
  status: "error",
  reason: "too-fast",
  message: "That was quick! Please check your details and send the form again.",
  values,
  key: Date.now(),
});

// Forwards a validated submission to the configured webhook (e.g. Formspree, Zapier or Make).
async function deliver(kind: Kind, data: Record<string, unknown>): Promise<"sent" | "not-configured" | "failed"> {
  if (process.env.ENQUIRY_DRY_RUN === "1") return "sent";

  const url = process.env.ENQUIRY_WEBHOOK_URL;
  if (!url) return "not-configured";

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ kind, submitted_at: new Date().toISOString(), ...data }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error(`[${kind}] webhook responded ${res.status}`);
      return "failed";
    }
    return "sent";
  } catch (err) {
    console.error(`[${kind}] webhook request failed`, err);
    return "failed";
  }
}

function deliveryError(result: "not-configured" | "failed", values: FormState["values"]): FormState {
  return {
    status: "error",
    reason: "delivery",
    message:
      result === "not-configured"
        ? `Online submissions aren't switched on yet. Please email ${contactEmail} and we'll take care of it.`
        : `We couldn't send that just now. Please try again in a minute, or email ${contactEmail}.`,
    values,
    key: Date.now(),
  };
}

export async function submitClaim(_prev: FormState, formData: FormData): Promise<FormState> {
  if (isBot(formData)) return { status: "success", key: Date.now() };

  const values = formDataToObject(formData, ["times"]);
  const parsed = claimSchema.safeParse(values);
  if (!parsed.success) {
    return {
      status: "error",
      reason: "validation",
      message: "Please check the highlighted fields.",
      fieldErrors: fieldErrorsFrom(parsed.error),
      values,
      key: Date.now(),
    };
  }

  if (tooFast(formData)) return tooFastState(values);

  const result = await deliver("team_claim", parsed.data);
  if (result !== "sent") return deliveryError(result, values);
  return { status: "success", message: parsed.data.team_name, key: Date.now() };
}

export async function submitPartnerEnquiry(_prev: FormState, formData: FormData): Promise<FormState> {
  if (isBot(formData)) return { status: "success", key: Date.now() };

  const values = formDataToObject(formData);
  const parsed = partnerSchema.safeParse(values);
  if (!parsed.success) {
    return {
      status: "error",
      reason: "validation",
      message: "Please check the highlighted fields.",
      fieldErrors: fieldErrorsFrom(parsed.error),
      values,
      key: Date.now(),
    };
  }

  if (tooFast(formData)) return tooFastState(values);

  const result = await deliver("partner_enquiry", parsed.data);
  if (result !== "sent") return deliveryError(result, values);
  return { status: "success", message: parsed.data.name, key: Date.now() };
}
