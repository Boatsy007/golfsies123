"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitPartnerEnquiry } from "@/app/actions";
import { initialFormState } from "@/lib/forms";
import { contactEmail, partnerTypes, type PartnerType } from "@/lib/site";
import { Arrow, ButtonLink, cn } from "../ui";
import { FieldError, FormAlert, SpamGuards, SubmitButton, TextArea, TextField, useFocusFirstError } from "./fields";

const isPartnerType = (value: string): value is PartnerType => partnerTypes.some((p) => p.id === value);

export function PartnerForm() {
  const [state, formAction, pending] = useActionState(submitPartnerEnquiry, initialFormState);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const [chosen, setChosen] = useState<PartnerType | "">("");
  useFocusFirstError(formRef, state.fieldErrors, state.key);

  // The "Talk about …" links on this page point at #enquire-<type>; preselect that option.
  useEffect(() => {
    const pick = () => {
      const type = window.location.hash.replace("#enquire-", "");
      if (isPartnerType(type)) setChosen(type);
    };
    pick();
    window.addEventListener("hashchange", pick);
    return () => window.removeEventListener("hashchange", pick);
  }, []);

  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div role="status" className="py-6 text-center">
        <h3 ref={successRef} tabIndex={-1} className="display text-[40px] leading-none font-extrabold text-navy focus:outline-none">
          Thanks, we&apos;ll be in touch
        </h3>
        <p className="mx-auto mt-4 max-w-[44ch] text-muted">
          Your enquiry has been sent. We&apos;ll reply from {contactEmail}.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/how-it-works">
            See how a tournament runs <Arrow />
          </ButtonLink>
        </div>
      </div>
    );
  }

  const errors = state.fieldErrors ?? {};
  const v = (name: string) => (typeof state.values?.[name] === "string" ? (state.values[name] as string) : undefined);
  const echoedType = v("partner_type");
  const selected = chosen || (echoedType && isPartnerType(echoedType) ? echoedType : "");

  return (
    <form ref={formRef} key={state.key} action={formAction} noValidate className="relative grid gap-x-5 gap-y-5 sm:grid-cols-2">
      {state.status === "error" && state.message && (
        <div className="sm:col-span-2">
          <FormAlert tone="error">
            {state.message}
            {state.reason === "delivery" && (
              <>
                {" "}
                <a className="font-bold underline" href={`mailto:${contactEmail}?subject=Golfsies%20partnership`}>
                  Email us
                </a>
              </>
            )}
          </FormAlert>
        </div>
      )}

      <fieldset className="sm:col-span-2" aria-describedby={errors.partner_type ? "partner_type-error" : undefined}>
        <legend className="mb-2 text-sm font-bold">
          I&apos;d like to talk about<span aria-hidden="true"> *</span>
        </legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {partnerTypes.map((p) => (
            <label key={p.id} className="relative">
              <input
                type="radio"
                name="partner_type"
                value={p.id}
                checked={selected === p.id}
                onChange={() => setChosen(p.id)}
                className="peer absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
              <span
                className={cn(
                  "display pointer-events-none block rounded border-[1.5px] border-line bg-white px-4 py-3 text-center text-[17px] font-bold",
                  "peer-checked:border-navy peer-checked:bg-navy peer-checked:text-white peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-fairway-deep",
                )}
              >
                {p.title}
              </span>
            </label>
          ))}
        </div>
        <FieldError name="partner_type" error={errors.partner_type} />
      </fieldset>

      <TextField name="name" label="Your name" required autoComplete="name" defaultValue={v("name")} error={errors.name} />
      <TextField
        name="organisation"
        label="Venue, business or company"
        required
        autoComplete="organization"
        defaultValue={v("organisation")}
        error={errors.organisation}
      />
      <TextField name="email" label="Email" type="email" inputMode="email" required autoComplete="email" defaultValue={v("email")} error={errors.email} />
      <TextField name="phone" label="Phone" hint="(optional)" type="tel" inputMode="tel" autoComplete="tel" defaultValue={v("phone")} error={errors.phone} />
      <TextArea
        name="message"
        label="What do you have in mind?"
        required
        placeholder="e.g. We run a par-3 course in Robina with quiet Tuesday evenings."
        defaultValue={v("message")}
        error={errors.message}
        className="sm:col-span-2"
      />

      <SpamGuards formId="partner" />

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5 sm:col-span-2">
        <p className="max-w-[44ch] text-sm text-muted">
          Prefer email? Write to{" "}
          <a href={`mailto:${contactEmail}`} className="underline">
            {contactEmail}
          </a>
          .
        </p>
        <SubmitButton pending={pending}>
          Send enquiry <Arrow />
        </SubmitButton>
      </div>
    </form>
  );
}
