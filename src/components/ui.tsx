import Link from "next/link";
import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

// Joins class names; when two Tailwind classes conflict, the later one wins.
export function cn(...classes: (string | false | null | undefined)[]) {
  return twMerge(classes.filter(Boolean).join(" "));
}

type ButtonVariant = "solid" | "outline" | "fairway" | "ghost" | "onDark";

const buttonVariants: Record<ButtonVariant, string> = {
  solid: "border-navy bg-navy text-white hover:bg-navy-deep",
  outline: "border-navy bg-transparent text-navy hover:bg-navy hover:text-white",
  fairway: "border-fairway bg-fairway text-navy-ink hover:bg-fairway-light",
  ghost: "border-white/60 bg-white/10 text-white hover:bg-white/20",
  onDark: "border-fairway bg-transparent text-white hover:bg-fairway hover:text-navy-ink",
};

export function buttonClass(variant: ButtonVariant = "solid", size: "md" | "sm" = "md") {
  return cn(
    "display inline-flex items-center justify-center gap-3 rounded border-2 font-bold tracking-wide transition hover:-translate-y-px",
    size === "md" ? "px-6 py-3 text-[19px]" : "px-4 py-2 text-base",
    buttonVariants[variant],
  );
}

// A link styled as a button. Internal paths use Next.js client-side navigation.
export function ButtonLink({
  href,
  variant = "solid",
  size = "md",
  className,
  children,
}: {
  href: string;
  variant?: ButtonVariant;
  size?: "md" | "sm";
  className?: string;
  children: ReactNode;
}) {
  const classes = cn(buttonClass(variant, size), className);
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={classes}>
      {children}
    </a>
  );
}

export function Arrow() {
  return (
    <span aria-hidden="true" className="inline-block font-body text-lg">
      →
    </span>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return <span className={cn("font-script leading-none font-normal", className)}>Golfsies</span>;
}

export function Reg() {
  return <span className="ml-0.5 align-super font-body text-[0.32em]">®</span>;
}

export function SectionTitle({ children, className, as: Tag = "h2" }: { children: ReactNode; className?: string; as?: "h1" | "h2" }) {
  return <Tag className={cn("display mb-4 text-[clamp(36px,5vw,56px)] font-extrabold text-navy", className)}>{children}</Tag>;
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("display mb-3 text-[15px] font-bold tracking-[0.12em] text-fairway-deep", className)}>{children}</p>;
}

// Shared header band for inner pages.
export function PageHeader({ eyebrow, title, intro, children }: { eyebrow: string; title: ReactNode; intro: ReactNode; children?: ReactNode }) {
  return (
    <header className="relative overflow-hidden bg-navy-deep text-white">
      <svg aria-hidden="true" viewBox="0 0 1440 120" preserveAspectRatio="none" className="pointer-events-none absolute right-0 bottom-0 left-0 h-16 w-full sm:h-24">
        <path d="M0 80 C 300 40, 620 50, 900 75 S 1260 95, 1440 60 L 1440 120 L 0 120 Z" fill="#14304f" />
      </svg>
      {/* Title on the left; the intro (and any extra element) sits in the right column on large screens. */}
      <Container className="relative grid gap-6 pt-14 pb-24 sm:pt-20 sm:pb-32 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-16">
        <div>
          <p className="display mb-4 text-[15px] font-bold tracking-[0.12em] text-fairway">{eyebrow}</p>
          <h1 className="display text-[clamp(48px,7.5vw,96px)] leading-[0.9] font-extrabold">{title}</h1>
        </div>
        <div className="lg:border-l-2 lg:border-fairway lg:pb-2 lg:pl-8">
          <div className="max-w-[48ch] text-lg text-white/80">{intro}</div>
          {children && <div className="mt-6">{children}</div>}
        </div>
      </Container>
    </header>
  );
}

// Closing call to action used at the foot of every page.
export function CtaBand({
  title = "Sixteen Founding spots. Claim yours.",
  body = "Reserving a team name is free. There's nothing to pay until the first event is confirmed.",
  primary = { label: "Claim your team name", href: "/claim" },
  secondary = { label: "How it works", href: "/how-it-works" },
}: {
  title?: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="bg-fairway py-16 sm:py-20" aria-labelledby="cta-title">
      <Container className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
        <div>
          <h2 id="cta-title" className="display text-[clamp(40px,6vw,72px)] leading-[0.9] font-extrabold text-navy-ink">
            {title}
          </h2>
          <p className="mt-4 max-w-[52ch] text-lg text-navy-ink/80">{body}</p>
        </div>
        <div className="flex flex-wrap gap-3 lg:justify-end">
          <ButtonLink href={primary.href}>
            {primary.label} <Arrow />
          </ButtonLink>
          <ButtonLink href={secondary.href} variant="outline">
            {secondary.label}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

export function BarTitle({ children, className, center }: { children: ReactNode; className?: string; center?: boolean }) {
  return (
    <h3
      className={cn(
        "display m-0 bg-navy px-3.5 py-2.5 font-bold text-white",
        center ? "text-center text-[clamp(30px,4vw,42px)]" : "text-[26px]",
        className,
      )}
    >
      {children}
    </h3>
  );
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[1180px] px-4 sm:px-6", className)}>{children}</div>;
}

export function Crest({ short, color, text, size = 30 }: { short: string; color: string; text: string; size?: number }) {
  return (
    <span
      className="display grid flex-none place-items-center rounded-md font-extrabold"
      style={{ width: size, height: size, background: color, color: text, fontSize: size * 0.43 }}
    >
      {short}
    </span>
  );
}
