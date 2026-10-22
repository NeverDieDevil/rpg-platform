import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

export function Card({
  className,
  raised = false,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { raised?: boolean }) {
  return (
    <div
      className={cn(
        "border-border rounded-lg border p-5 shadow-sm",
        raised ? "bg-surface-raised shadow-md" : "bg-surface",
        className,
      )}
      {...rest}
    />
  );
}

export function CardHeader({
  title,
  description,
  actions,
  as: Heading = "h3",
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  as?: "h2" | "h3" | "h4";
}) {
  return (
    <div className="mb-4 flex items-start justify-between gap-3">
      <div className="min-w-0">
        <Heading className="text-lg">{title}</Heading>
        {description ? (
          <p className="text-fg-muted text-sm">{description}</p>
        ) : null}
      </div>
      {actions}
    </div>
  );
}
