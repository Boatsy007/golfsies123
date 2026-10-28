"use client";

import { useEffect, useRef, type ReactNode, type RefObject } from "react";
import { buttonClass, cn } from "../ui";

export const inputClass =
  "w-full rounded border-[1.5px] border-line bg-white px-3.5 py-3 text-base text-ink placeholder:text-[#767d85] focus:border-navy focus:shadow-[0_0_0_3px_rgba(184,199,110,0.6)] focus:outline-none aria-[invalid=true]:border-[#b3261e]";

type FieldProps = {
  name: string;
  label: ReactNode;
  error?: string;
  hint?: ReactNode;
  className?: string;
  required?: boolean;
};

function errorId(name: string) {
  return `${name}-error`;
}

export function FieldError({ name, error }: { name: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={errorId(name)} className="m-0 text-sm font-semibold text-[#b3261e]">
      {error}
    </p>
  );
}

function Label({ name, label, required, hint }: Pick<FieldProps, "name" | "label" | "required" | "hint">) {
  return (
    <label htmlFor={name} className="text-sm font-bold">
      {label}
      {required && <span aria-hidden="true"> *</span>}
      {hint && <span className="font-medium text-muted"> {hint}</span>}
    </label>
  );
}

export function TextField({
  name,
  label,
  error,
  hint,
  className,
  required,
  type = "text",
  defaultValue,
  ...rest
}: FieldProps & { type?: string; defaultValue?: string; placeholder?: string; autoComplete?: string; inputMode?: "tel" | "email" | "text" }) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label name={name} label={label} required={required} hint={hint} />
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId(name) : undefined}
        className={inputClass}
        {...rest}
      />
      <FieldError name={name} error={error} />
    </div>
  );
}

export function TextArea({ name, label, error, hint, className, required, defaultValue, placeholder }: FieldProps & { defaultValue?: string; placeholder?: string }) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label name={name} label={label} required={required} hint={hint} />
      <textarea
        id={name}
        name={name}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId(name) : undefined}
        className={inputClass + " min-h-[110px] resize-y"}
      />
      <FieldError name={name} error={error} />
    </div>
  );
}

export function SelectField({ name, label, error, className, options, defaultValue }: FieldProps & { options: string[]; defaultValue?: string }) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label name={name} label={label} />
      <select
        id={name}
        name={name}
        defaultValue={defaultValue}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId(name) : undefined}
        className={inputClass}
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <FieldError name={name} error={error} />
    </div>
  );
}

// Toggle-button style radio or checkbox group.
export function ChoiceGroup({
  name,
  legend,
  hint,
  type,
  options,
  selected = [],
  error,
  className,
}: {
  name: string;
  legend: ReactNode;
  hint?: ReactNode;
  type: "radio" | "checkbox";
  options: { value: string; label: string }[];
  selected?: string[];
  error?: string;
  className?: string;
}) {
  return (
    <fieldset className={cn("flex flex-col gap-1.5", className)} aria-describedby={error ? errorId(name) : undefined}>
      <legend className="mb-1.5 text-sm font-bold">
        {legend}
        {hint && <span className="font-medium text-muted"> {hint}</span>}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o.value} className="relative">
            <input
              type={type}
              name={name}
              value={o.value}
              defaultChecked={selected.includes(o.value)}
              className="peer absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
            <span className="display pointer-events-none inline-block rounded border-[1.5px] border-line bg-white px-4 py-2.5 text-base font-bold select-none peer-checked:border-navy peer-checked:bg-navy peer-checked:text-white peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-fairway-deep">
              {o.label}
            </span>
          </label>
        ))}
      </div>
      <FieldError name={name} error={error} />
    </fieldset>
  );
}

// When each form was first shown, kept outside React so it survives the form remounting after an error.
const firstShown = new Map<string, number>();

// Hidden spam traps: a honeypot field and the time the form was first shown.
export function SpamGuards({ formId }: { formId: string }) {
  const startedRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!firstShown.has(formId)) firstShown.set(formId, Date.now());
    if (startedRef.current) startedRef.current.value = String(firstShown.get(formId));
  }, [formId]);

  return (
    <>
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${formId}-gotcha`}>Leave this empty</label>
        <input id={`${formId}-gotcha`} type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </div>
      <input ref={startedRef} type="hidden" name="_started" defaultValue="" />
    </>
  );
}

// After a failed submission, moves keyboard focus to the first field with an error.
export function useFocusFirstError(formRef: RefObject<HTMLFormElement | null>, fieldErrors: Record<string, string> | undefined, key: number | undefined) {
  useEffect(() => {
    const first = fieldErrors && Object.keys(fieldErrors)[0];
    if (!first || !formRef.current) return;
    formRef.current.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }, [formRef, fieldErrors, key]);
}

export function SubmitButton({ pending, children, pendingLabel = "Sending…" }: { pending: boolean; children: ReactNode; pendingLabel?: string }) {
  return (
    <button type="submit" disabled={pending} aria-busy={pending} className={buttonClass("solid") + " min-w-[200px] disabled:cursor-wait disabled:opacity-70"}>
      {pending ? (
        <>
          <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          {pendingLabel}
        </>
      ) : (
        children
      )}
    </button>
  );
}

export function FormAlert({ tone, children }: { tone: "error" | "info"; children: ReactNode }) {
  return (
    <div
      role="alert"
      className={cn(
        "rounded border-l-4 px-4 py-3 text-[15px]",
        tone === "error" ? "border-[#b3261e] bg-[#fdecea] text-[#7a1c15]" : "border-navy bg-cream text-ink",
      )}
    >
      {children}
    </div>
  );
}
