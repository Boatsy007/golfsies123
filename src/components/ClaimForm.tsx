"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { contactEmail, formEndpoint, photos } from "@/lib/site";
import { Arrow, buttonClass, Container, Wordmark } from "./ui";

const inputClass =
  "w-full rounded border-[1.5px] border-line bg-white px-3.5 py-3 text-base text-ink focus:border-navy focus:shadow-[0_0_0_3px_rgba(184,199,110,0.6)] focus:outline-none";
const labelClass = "text-sm font-bold";

function Pick({ name, type, options }: { name: string; type: "radio" | "checkbox"; options: { value: string; label: string }[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <label key={o.value} className="relative">
          <input type={type} name={name} value={o.value} className="peer pointer-events-none absolute opacity-0" />
          <span className="display inline-block cursor-pointer rounded border-[1.5px] border-line bg-white px-4 py-2 text-base font-bold select-none peer-checked:border-navy peer-checked:bg-navy peer-checked:text-white peer-focus-visible:shadow-[0_0_0_3px_rgba(184,199,110,0.8)]">
            {o.label}
          </span>
        </label>
      ))}
    </div>
  );
}

export function ClaimForm() {
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const data = new FormData(e.currentTarget);
    if (data.get("_gotcha")) return; // a bot filled the hidden field

    const team = String(data.get("team_name") ?? "").trim();
    const name = String(data.get("owner_name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const mobile = String(data.get("mobile") ?? "").trim();
    if (!team) return setError("Please add the team name you want to claim.");
    if (!name || !email || !mobile) return setError("Please add the team owner's name, mobile and email.");
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("That email doesn't look quite right.");
    if (!data.get("understands_free_reservation")) return setError("Please tick the box to confirm you understand how name reservations work.");

    const times = data.getAll("times").join(", ");
    data.delete("times");
    data.set("times", times);

    if (!formEndpoint) {
      const lines: string[] = [];
      data.forEach((v, k) => {
        if (k !== "_gotcha" && v) lines.push(`${k.replace(/_/g, " ")}: ${v}`);
      });
      const subject = encodeURIComponent(`Golfsies team name claim: ${team}`);
      window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${encodeURIComponent(lines.join("\n"))}`;
      setDone(true);
      return;
    }

    setSending(true);
    try {
      const res = await fetch(formEndpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(`Form endpoint responded ${res.status}`);
      setDone(true);
    } catch {
      setError(`Something went wrong. Please try again, or email us at ${contactEmail}.`);
    } finally {
      setSending(false);
    }
  }

  return (
    <section
      id="register"
      className="py-16 text-white sm:py-24"
      style={{
        background: [
          "linear-gradient(180deg, rgba(11,26,43,0.7), rgba(11,26,43,0.92))",
          photos.register && `url('${photos.register}') center / cover no-repeat`,
          "linear-gradient(160deg, #3a3a44 0%, #6b3f2a 60%, #c06a2c 100%)",
        ]
          .filter(Boolean)
          .join(", "),
      }}
    >
      <Container>
        <div className="mx-auto mb-9 max-w-[760px] text-center">
          <h2 className="display mb-3.5 text-[clamp(32px,4.4vw,48px)] leading-none font-extrabold">Claim your Founding Team name</h2>
          <p className="text-white/80">
            Reserve your team name free. There&apos;s no payment and no commitment. You&apos;ll get the founding price, first entry to
            tournaments, and an invite to the Try Golfsies Day.
          </p>
        </div>

        <div className="mx-auto max-w-[860px] rounded-md bg-paper px-4.5 py-6 text-ink sm:p-8">
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div
                key="done"
                role="status"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-2.5 py-6.5 text-center"
              >
                <Wordmark className="text-[56px] text-navy" />
                <h3 className="display my-1.5 text-4xl font-extrabold text-navy">Name request received!</h3>
                <p className="mx-auto max-w-[44ch] text-muted">
                  We&apos;ll email you to confirm your team name, along with your Try Golfsies Day invite and founding pricing. Now go and pick
                  your three clubs.
                </p>
              </motion.div>
            ) : (
              <motion.form key="form" noValidate onSubmit={onSubmit} exit={{ opacity: 0 }} className="grid gap-x-5 gap-y-4.5 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label htmlFor="team" className={labelClass}>
                    Team name you want to claim *
                  </label>
                  <input id="team" name="team_name" type="text" required placeholder="e.g. The Drop Bears" autoComplete="off" className={inputClass} />
                </div>
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label htmlFor="team2" className={labelClass}>
                    Back-up name <span className="font-medium text-muted">(in case your first choice is taken)</span>
                  </label>
                  <input id="team2" name="backup_name" type="text" autoComplete="off" className={inputClass} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="owner" className={labelClass}>
                    Team owner&apos;s name *
                  </label>
                  <input id="owner" name="owner_name" type="text" required autoComplete="name" className={inputClass} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="mobile" className={labelClass}>
                    Mobile *
                  </label>
                  <input id="mobile" name="mobile" type="tel" required autoComplete="tel" placeholder="04xx xxx xxx" className={inputClass} />
                </div>
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label htmlFor="email" className={labelClass}>
                    Email *
                  </label>
                  <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} />
                </div>
                <fieldset className="flex flex-col gap-1.5 sm:col-span-2">
                  <legend className={labelClass + " mb-1.5"}>How many players?</legend>
                  <Pick
                    name="players"
                    type="radio"
                    options={[
                      { value: "Just me (match me to a team)", label: "Just me" },
                      { value: "2-3", label: "2–3" },
                      { value: "4", label: "4" },
                      { value: "5-8", label: "5–8" },
                    ]}
                  />
                </fieldset>
                <fieldset className="flex flex-col gap-1.5 sm:col-span-2">
                  <legend className={labelClass + " mb-1.5"}>
                    When could your team play tournaments? <span className="font-medium text-muted">(pick any)</span>
                  </legend>
                  <Pick
                    name="times"
                    type="checkbox"
                    options={[
                      { value: "Weeknight twilight", label: "Weeknight twilight" },
                      { value: "Weekend afternoon", label: "Weekend arvo" },
                      { value: "Weekday daytime", label: "Weekday daytime" },
                    ]}
                  />
                </fieldset>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="type" className={labelClass}>
                    Team type
                  </label>
                  <select id="type" name="team_type" className={inputClass}>
                    <option>Group of friends</option>
                    <option>Company / work team</option>
                    <option>Sports club / social club</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="experience" className={labelClass}>
                    Golf experience
                  </label>
                  <select id="experience" name="experience" className={inputClass}>
                    <option>Mostly beginners</option>
                    <option>A mix</option>
                    <option>Mostly regular golfers</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="suburb" className={labelClass}>
                    Suburb
                  </label>
                  <input id="suburb" name="suburb" type="text" placeholder="e.g. Burleigh Heads" autoComplete="address-level2" className={inputClass} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="heard" className={labelClass}>
                    How did you hear about us?
                  </label>
                  <select id="heard" name="heard_from" className={inputClass}>
                    <option>Instagram</option>
                    <option>TikTok</option>
                    <option>Facebook</option>
                    <option>A friend</option>
                    <option>At a golf course</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label htmlFor="msg" className={labelClass}>
                    Anything else? <span className="font-medium text-muted">(optional)</span>
                  </label>
                  <textarea
                    id="msg"
                    name="message"
                    placeholder="Questions, ideas, or the trash talk you've prepared for the grand final"
                    className={inputClass + " min-h-[90px] resize-y"}
                  />
                </div>
                <label className="flex items-start gap-2.5 rounded bg-cream px-3.5 py-3 text-sm text-[#3a434d] sm:col-span-2">
                  <input type="checkbox" name="understands_free_reservation" value="yes" className="mt-0.5 h-[18px] w-[18px] flex-none" />
                  <span>
                    I understand this reserves my team name for free. Names are first in, first served and confirmed by email. Membership is
                    optional, and I won&apos;t be charged unless I choose to join after receiving the terms.
                  </span>
                </label>
                <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px]" />
                {error && (
                  <p role="alert" className="m-0 font-bold text-[#b3261e] sm:col-span-2">
                    {error}
                  </p>
                )}
                <div className="flex flex-wrap items-center justify-between gap-4 sm:col-span-2">
                  <small className="max-w-[46ch] text-muted">We&apos;ll only use your details to contact you about Golfsies. No spam, ever.</small>
                  <button type="submit" disabled={sending} className={buttonClass("solid") + " disabled:opacity-60"}>
                    {sending ? "Sending…" : (
                      <>
                        Claim our name <Arrow />
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
