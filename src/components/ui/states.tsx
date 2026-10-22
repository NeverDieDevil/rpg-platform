import { AlertTriangle, Inbox, LoaderCircle } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/** Spinner — dekoracyjny; etykietę dla czytników ekranu daje kontener. */
export function Spinner({ className }: { className?: string }) {
  return (
    <LoaderCircle
      aria-hidden="true"
      className={cn("animate-spin motion-reduce:animate-none", className)}
    />
  );
}

/** Szkielet ładowania. Kształt i rozmiar ustawia `className`. */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "bg-surface-muted rounded-md bg-[linear-gradient(90deg,transparent,var(--rpg-color-border),transparent)] " +
          "bg-[length:200%_100%] motion-safe:animate-[rpg-shimmer_1.6s_linear_infinite]",
        className,
      )}
    />
  );
}

/** Kontener stanu ładowania: ogłasza „Ładowanie” i oznacza region jako zajęty. */
export function LoadingState({
  label = "Ładowanie…",
  children,
  className,
}: {
  label?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div role="status" aria-busy="true" className={className}>
      <span className="sr-only">{label}</span>
      {children}
    </div>
  );
}

/** Szkielet wiersza tekstu: `lines` pasków, ostatni krótszy. */
export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-4",
            i === lines - 1 && lines > 1 ? "w-2/3" : "w-full",
          )}
        />
      ))}
    </div>
  );
}

type StateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

const stateBox =
  "flex flex-col items-center gap-3 rounded-lg border border-dashed border-border-strong bg-surface p-8 text-center";

/** Stan pusty: wyjaśnia, dlaczego nic nie ma, i podpowiada pierwszy krok. */
export function EmptyState({
  title,
  description,
  action,
  className,
  icon,
}: StateProps & { icon?: ReactNode }) {
  return (
    <div className={cn(stateBox, className)}>
      <span aria-hidden="true" className="text-fg-muted">
        {icon ?? <Inbox className="size-8" />}
      </span>
      <h3 className="text-lg">{title}</h3>
      {description ? (
        <p className="text-fg-muted max-w-prose">{description}</p>
      ) : null}
      {action}
    </div>
  );
}

/** Stan błędu: ogłaszany czytnikom (role=alert), z akcją ponowienia. */
export function ErrorState({
  title,
  description,
  action,
  className,
}: StateProps) {
  return (
    <div role="alert" className={cn(stateBox, "border-danger", className)}>
      <span aria-hidden="true" className="text-danger">
        <AlertTriangle className="size-8" />
      </span>
      <h3 className="text-lg">{title}</h3>
      {description ? (
        <p className="text-fg-muted max-w-prose">{description}</p>
      ) : null}
      {action}
    </div>
  );
}
