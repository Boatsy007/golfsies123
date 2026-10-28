import { z } from "zod";

export type FormState = {
  status: "idle" | "success" | "error";
  // Why it failed: bad fields, sent too quickly, or the message couldn't be delivered.
  reason?: "validation" | "too-fast" | "delivery";
  message?: string;
  fieldErrors?: Record<string, string>;
  // Echoed back on a failed submission so the visitor doesn't lose what they typed.
  values?: Record<string, string | string[]>;
  // Changes on every response so the form remounts with the echoed values.
  key?: number;
};

export const initialFormState: FormState = { status: "idle" };

const text = (max: number) => z.string().trim().max(max, `Keep this under ${max} characters.`);
const optionalText = (max: number) => text(max).optional().transform((v) => v || undefined);

// Australian mobile: 04xx xxx xxx or +61 4xx xxx xxx, spaces allowed.
const auMobile = z
  .string()
  .trim()
  .transform((v) => v.replace(/[\s()-]/g, ""))
  .refine((v) => /^(\+?61|0)4\d{8}$/.test(v), "Enter an Australian mobile number, e.g. 0412 345 678.");

const email = z.string().trim().pipe(z.email("Enter a valid email address, e.g. name@example.com."));

export const claimSchema = z.object({
  team_name: text(40).min(2, "Add the team name you want to claim."),
  backup_name: optionalText(40),
  owner_name: text(80).min(2, "Add the team owner's name."),
  mobile: auMobile,
  email,
  players: z.enum(["Just me (match me to a team)", "2-3", "4", "5-8"]).optional(),
  times: z.array(z.enum(["Weeknight twilight", "Weekend afternoon", "Weekday daytime"])).default([]),
  team_type: z.enum(["Group of friends", "Company / work team", "Sports club / social club", "Other"]),
  experience: z.enum(["Mostly beginners", "A mix", "Mostly regular golfers"]),
  suburb: optionalText(60),
  heard_from: z.enum(["Instagram", "TikTok", "Facebook", "A friend", "At a golf course", "Other"]),
  message: optionalText(1000),
  consent: z.literal("yes", "Tick the box to confirm you understand how name reservations work."),
});

export const partnerSchema = z.object({
  partner_type: z.enum(["venue", "sponsor", "company"], "Choose what you'd like to talk about."),
  name: text(80).min(2, "Add your name."),
  organisation: text(120).min(2, "Add your venue, business or company name."),
  email,
  phone: optionalText(20),
  message: text(1500).min(10, "Tell us a little about what you have in mind."),
});

export type ClaimInput = z.infer<typeof claimSchema>;
export type PartnerInput = z.infer<typeof partnerSchema>;

// Turns FormData into a plain object, keeping repeated fields (checkbox groups) as arrays.
export function formDataToObject(formData: FormData, arrayFields: string[] = []) {
  const out: Record<string, string | string[]> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value !== "string" || key.startsWith("$ACTION") || key.startsWith("_")) continue;
    if (arrayFields.includes(key)) {
      out[key] = [...((out[key] as string[]) ?? []), value];
    } else {
      out[key] = value;
    }
  }
  for (const key of arrayFields) out[key] ??= [];
  return out;
}

export function fieldErrorsFrom(error: z.ZodError) {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const field = String(issue.path[0] ?? "form");
    errors[field] ??= issue.message;
  }
  return errors;
}
