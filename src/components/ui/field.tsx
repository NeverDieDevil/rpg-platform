import { useId } from "react";
import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

import { cn } from "@/lib/cn";

const control =
  "w-full rounded-md border border-border-strong bg-surface-raised px-3 text-fg " +
  "placeholder:text-fg-muted transition-colors duration-[var(--rpg-duration-fast)] " +
  "hover:border-accent disabled:cursor-not-allowed disabled:border-border disabled:bg-bg-disabled " +
  "disabled:text-fg-disabled aria-[invalid=true]:border-danger aria-[invalid=true]:border-2";

type FieldBase = {
  label: string;
  hint?: string;
  /** Komunikat błędu; ustawia też `aria-invalid`. */
  error?: string;
};

/** Etykieta + opis + błąd wokół kontrolki; powiązania ARIA robi `useId`. */
function FieldShell({
  id,
  label,
  hint,
  error,
  required,
  className,
  children,
}: FieldBase & {
  id: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-[var(--rpg-control-weight)]">
        {label}
        {required ? (
          <span aria-hidden="true" className="text-danger">
            {" "}
            *
          </span>
        ) : null}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="text-fg-muted text-sm">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="text-danger text-sm font-medium">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function describedBy(id: string, hint?: string, error?: string) {
  if (error) return `${id}-error`;
  return hint ? `${id}-hint` : undefined;
}

export type TextFieldProps = FieldBase &
  Omit<InputHTMLAttributes<HTMLInputElement>, "id"> & { id?: string };

export function TextField({
  label,
  hint,
  error,
  id: idProp,
  className,
  ...rest
}: TextFieldProps) {
  const generated = useId();
  const id = idProp ?? generated;
  return (
    <FieldShell
      id={id}
      label={label}
      hint={hint}
      error={error}
      required={rest.required}
      className={className}
    >
      <input
        id={id}
        className={cn(control, "min-h-10")}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        {...rest}
      />
    </FieldShell>
  );
}

export type TextareaFieldProps = FieldBase &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> & { id?: string };

export function TextareaField({
  label,
  hint,
  error,
  id: idProp,
  className,
  rows = 4,
  ...rest
}: TextareaFieldProps) {
  const generated = useId();
  const id = idProp ?? generated;
  return (
    <FieldShell
      id={id}
      label={label}
      hint={hint}
      error={error}
      required={rest.required}
      className={className}
    >
      <textarea
        id={id}
        rows={rows}
        className={cn(control, "py-2")}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        {...rest}
      />
    </FieldShell>
  );
}

export type SelectFieldProps = FieldBase &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, "id"> & { id?: string };

/** Natywny `<select>` — pełna klawiatura i dostępność za darmo. */
export function SelectField({
  label,
  hint,
  error,
  id: idProp,
  className,
  children,
  ...rest
}: SelectFieldProps) {
  const generated = useId();
  const id = idProp ?? generated;
  return (
    <FieldShell
      id={id}
      label={label}
      hint={hint}
      error={error}
      required={rest.required}
      className={className}
    >
      <select
        id={id}
        className={cn(control, "min-h-10")}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        {...rest}
      >
        {children}
      </select>
    </FieldShell>
  );
}

type ChoiceProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
  hint?: string;
};

function Choice({
  type,
  label,
  hint,
  className,
  id: idProp,
  ...rest
}: ChoiceProps & { type: "checkbox" | "radio" }) {
  const generated = useId();
  const id = idProp ?? generated;
  return (
    <div className={cn("flex items-start gap-3", className)}>
      <input
        id={id}
        type={type}
        aria-describedby={hint ? `${id}-hint` : undefined}
        className="mt-0.5 size-5 shrink-0 cursor-pointer accent-[var(--rpg-color-accent)] disabled:cursor-not-allowed"
        {...rest}
      />
      <label htmlFor={id} className="flex flex-col">
        <span>{label}</span>
        {hint ? (
          <span id={`${id}-hint`} className="text-fg-muted text-sm">
            {hint}
          </span>
        ) : null}
      </label>
    </div>
  );
}

export function Checkbox(props: ChoiceProps) {
  return <Choice type="checkbox" {...props} />;
}

export function Radio(props: ChoiceProps) {
  return <Choice type="radio" {...props} />;
}

/** Grupa pól (np. radio) z legendą — `<fieldset>` czytają czytniki ekranu. */
export function FieldGroup({
  legend,
  children,
  className,
}: {
  legend: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <fieldset className={cn("flex flex-col gap-2", className)}>
      <legend className="mb-1 text-sm font-[var(--rpg-control-weight)]">
        {legend}
      </legend>
      {children}
    </fieldset>
  );
}
