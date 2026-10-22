import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

export type BadgeVariant =
  | "neutral"
  | "accent"
  | "highlight"
  | "success"
  | "warning"
  | "danger"
  | "info";

// Wypełnienie + para `-fg`: obie strony pary sprawdza check:contrast.
const variants: Record<BadgeVariant, string> = {
  neutral: "border border-border-strong bg-surface-muted text-fg",
  accent: "bg-accent text-accent-fg",
  highlight: "bg-highlight text-highlight-fg",
  success: "bg-success text-success-fg",
  warning: "bg-warning text-warning-fg",
  danger: "bg-danger text-danger-fg",
  info: "bg-info text-info-fg",
};

export function Badge({
  variant = "neutral",
  className,
  ...rest
}: HTMLAttributes<HTMLSpanElement> & { variant?: BadgeVariant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-sm px-2 py-0.5 text-xs font-[var(--rpg-control-weight)] whitespace-nowrap",
        variants[variant],
        className,
      )}
      {...rest}
    />
  );
}
