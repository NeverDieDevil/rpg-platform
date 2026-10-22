import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

import { Spinner } from "./states";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md border font-[var(--rpg-control-weight)] " +
  "transition-colors duration-[var(--rpg-duration-fast)] select-none " +
  "disabled:cursor-not-allowed disabled:border-border disabled:bg-bg-disabled disabled:text-fg-disabled " +
  "aria-disabled:cursor-not-allowed aria-disabled:border-border aria-disabled:bg-bg-disabled aria-disabled:text-fg-disabled";

const variants: Record<ButtonVariant, string> = {
  primary:
    "border-transparent bg-accent text-accent-fg shadow-sm hover:bg-accent-hover active:bg-accent-active",
  secondary:
    "border-border-strong bg-surface-raised text-fg hover:bg-surface-muted active:bg-border",
  ghost:
    "border-transparent bg-transparent text-fg hover:bg-surface-muted active:bg-border",
  danger:
    "border-transparent bg-danger text-danger-fg shadow-sm hover:brightness-110 active:brightness-90",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-8 px-3 text-sm",
  md: "min-h-10 px-4 text-base",
  lg: "min-h-12 px-6 text-lg",
};

/** Klasy przycisku — do stylowania linków (`<Link className={buttonClasses()}>`). */
export function buttonClasses(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
) {
  return cn(base, variants[variant], sizes[size], className);
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Stan ładowania: blokuje kliknięcie, pokazuje spinner, ustawia aria-busy. */
  loading?: boolean;
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  className,
  disabled,
  type = "button",
  onClick,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClasses(variant, size, className)}
      disabled={disabled}
      aria-disabled={loading || undefined}
      aria-busy={loading || undefined}
      // Podczas ładowania przycisk zostaje w kolejności tabulacji (nie `disabled`),
      // ale kliknięcie jest ignorowane.
      onClick={loading ? undefined : onClick}
      {...rest}
    >
      {loading ? <Spinner className="size-4" /> : null}
      {children}
    </button>
  );
}
