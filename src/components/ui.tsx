import type { ReactNode } from "react";

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

type ButtonVariant = "solid" | "outline" | "fairway" | "ghost" | "onDark" | "tan";

const buttonVariants: Record<ButtonVariant, string> = {
  solid: "border-navy bg-navy text-white hover:bg-navy-deep",
  outline: "border-navy bg-transparent text-navy hover:bg-navy hover:text-white",
  fairway: "border-fairway bg-fairway text-navy-ink hover:bg-fairway-light",
  ghost: "border-white/60 bg-white/10 text-white hover:bg-white/20",
  onDark: "border-fairway bg-transparent text-white hover:bg-fairway hover:text-navy-ink",
  tan: "border-tan bg-tan text-white hover:bg-tan-deep",
};

export function buttonClass(variant: ButtonVariant = "solid", size: "md" | "sm" = "md") {
  return cn(
    "display inline-flex items-center justify-center gap-3 rounded border-2 font-bold tracking-wide transition hover:-translate-y-px",
    size === "md" ? "px-6 py-3 text-[19px]" : "px-4 py-2 text-base",
    buttonVariants[variant],
  );
}

export function Arrow() {
  return (
    <span aria-hidden="true" className="font-body text-lg">
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

export function SectionTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h2 className={cn("display mb-4 text-[clamp(36px,5vw,56px)] font-extrabold text-navy", className)}>{children}</h2>;
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
