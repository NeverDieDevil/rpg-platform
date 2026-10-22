"use client";

import type { ButtonHTMLAttributes } from "react";

import { Spinner } from "./states";
import {
  buttonClasses,
  type ButtonSize,
  type ButtonVariant,
} from "./button-classes";

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
      // ale kliknięcie i natywny submit formularza są blokowane.
      onClick={(e) => {
        if (loading) {
          e.preventDefault();
          return;
        }
        onClick?.(e);
      }}
      {...rest}
    >
      {loading ? <Spinner className="size-4" /> : null}
      {children}
    </button>
  );
}
