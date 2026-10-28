"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";
import { submitClaim } from "@/app/actions";
import { initialFormState } from "@/lib/forms";
import { contactEmail } from "@/lib/site";
import { Arrow, ButtonLink, Wordmark } from "../ui";
import { ChoiceGroup, FormAlert, SelectField, SpamGuards, SubmitButton, TextArea, TextField, useFocusFirstError } from "./fields";

export function ClaimForm() {
  const [state, formAction, pending] = useActionState(submitClaim, initialFormState);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  useFocusFirstError(formRef, state.fieldErrors, state.key);

  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div role="status" className="py-4 text-center sm:py-8">
        <Wordmark className="text-[56px] text-navy" />
        <h2 ref={successRef} tabIndex={-1} className="display mt-2 text-[40px] leading-none font-extrabold text-navy focus:outline-none">
          Name request received
        </h2>
        <p className="mx-auto mt-4 max-w-[46ch] text-muted">
          {state.message ? (
            <>
              We&apos;ve got your claim for <b className="text-ink">{state.message}</b>.{" "}
            </>
          ) : null}
          We&apos;ll email you to confirm the name, along with your Try Golfsies Day invite and founding pricing.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/how-it-works">
            See how it works <Arrow />
          </ButtonLink>
          <ButtonLink href="/" variant="outline">
            Back to home
          </ButtonLink>
        </div>
      </div>
    );
  }

  const errors = state.fieldErrors ?? {};
  const v = (name: string) => (typeof state.values?.[name] === "string" ? (state.values[name] as string) : undefined);
  const list = (name: string) => {
    const value = state.values?.[name];
    return Array.isArray(value) ? value : value ? [value] : [];
  };

  return (
    <form ref={formRef} key={state.key} action={formAction} noValidate className="relative grid gap-x-5 gap-y-5 sm:grid-cols-2" aria-describedby="claim-required">
      <p id="claim-required" className="text-sm text-muted sm:col-span-2">
        Fields marked * are required.
      </p>

      {state.status === "error" && state.message && (
        <div className="sm:col-span-2">
          <FormAlert tone="error">
            {state.message}
            {state.reason === "delivery" && (
              <>
                {" "}
                <a className="font-bold underline" href={`mailto:${contactEmail}?subject=Golfsies%20team%20name%20claim`}>
                  Email us
                </a>
              </>
            )}
          </FormAlert>
        </div>
      )}

      <TextField
        name="team_name"
        label="Team name you want to claim"
        required
        placeholder="e.g. The Drop Bears"
        autoComplete="off"
        defaultValue={v("team_name")}
        error={errors.team_name}
        className="sm:col-span-2"
      />
      <TextField
        name="backup_name"
        label="Back-up name"
        hint="(in case your first choice is taken)"
        autoComplete="off"
        defaultValue={v("backup_name")}
        error={errors.backup_name}
        className="sm:col-span-2"
      />
      <TextField name="owner_name" label="Team owner's name" required autoComplete="name" defaultValue={v("owner_name")} error={errors.owner_name} />
      <TextField
        name="mobile"
        label="Mobile"
        type="tel"
        inputMode="tel"
        required
        autoComplete="tel"
        placeholder="0412 345 678"
        defaultValue={v("mobile")}
        error={errors.mobile}
      />
      <TextField
        name="email"
        label="Email"
        type="email"
        inputMode="email"
        required
        autoComplete="email"
        placeholder="name@example.com"
        defaultValue={v("email")}
        error={errors.email}
        className="sm:col-span-2"
      />

      <ChoiceGroup
        name="players"
        legend="How many players do you have?"
        type="radio"
        selected={list("players")}
        error={errors.players}
        className="sm:col-span-2"
        options={[
          { value: "Just me (match me to a team)", label: "Just me" },
          { value: "2-3", label: "2–3" },
          { value: "4", label: "4" },
          { value: "5-8", label: "5–8" },
        ]}
      />
      <ChoiceGroup
        name="times"
        legend="When could your team play?"
        hint="(pick any)"
        type="checkbox"
        selected={list("times")}
        error={errors.times}
        className="sm:col-span-2"
        options={[
          { value: "Weeknight twilight", label: "Weeknight twilight" },
          { value: "Weekend afternoon", label: "Weekend arvo" },
          { value: "Weekday daytime", label: "Weekday daytime" },
        ]}
      />

      <SelectField
        name="team_type"
        label="Team type"
        defaultValue={v("team_type")}
        error={errors.team_type}
        options={["Group of friends", "Company / work team", "Sports club / social club", "Other"]}
      />
      <SelectField
        name="experience"
        label="Golf experience"
        defaultValue={v("experience")}
        error={errors.experience}
        options={["Mostly beginners", "A mix", "Mostly regular golfers"]}
      />
      <TextField name="suburb" label="Suburb" placeholder="e.g. Burleigh Heads" autoComplete="address-level2" defaultValue={v("suburb")} error={errors.suburb} />
      <SelectField
        name="heard_from"
        label="How did you hear about us?"
        defaultValue={v("heard_from")}
        error={errors.heard_from}
        options={["Instagram", "TikTok", "Facebook", "A friend", "At a golf course", "Other"]}
      />
      <TextArea
        name="message"
        label="Anything else?"
        hint="(optional)"
        placeholder="Questions, ideas, or the trash talk you've prepared for the Championship"
        defaultValue={v("message")}
        error={errors.message}
        className="sm:col-span-2"
      />

      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label className="flex items-start gap-3 rounded bg-cream px-4 py-3.5 text-[15px] text-[#3a434d]">
          <input
            type="checkbox"
            name="consent"
            value="yes"
            defaultChecked={v("consent") === "yes"}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            className="mt-0.5 h-5 w-5 flex-none accent-navy"
          />
          <span>
            I understand this reserves my team name for free. Names are first in, first served and confirmed by email. Membership is optional,
            and I won&apos;t be charged unless I choose to join after receiving the terms.
          </span>
        </label>
        {errors.consent && (
          <p id="consent-error" className="m-0 text-sm font-semibold text-[#b3261e]">
            {errors.consent}
          </p>
        )}
      </div>

      <SpamGuards formId="claim" />

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5 sm:col-span-2">
        <p className="max-w-[44ch] text-sm text-muted">
          We only use your details to contact you about Golfsies. See our{" "}
          <Link href="/privacy" className="underline">
            privacy notice
          </Link>
          .
        </p>
        <SubmitButton pending={pending}>
          Claim our name <Arrow />
        </SubmitButton>
      </div>
    </form>
  );
}
