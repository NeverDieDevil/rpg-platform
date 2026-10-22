import { cn } from "@/lib/cn";

const sizes = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-14 text-lg",
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

/** Awatar: obraz, a bez niego inicjały. `name` jest etykietą dla czytników. */
export function Avatar({
  name,
  src,
  size = "md",
  online,
  className,
}: {
  name: string;
  src?: string;
  size?: keyof typeof sizes;
  /** `true`/`false` pokazuje wskaźnik obecności; `undefined` — brak wskaźnika. */
  online?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("relative inline-flex shrink-0", className)}>
      <span
        role="img"
        aria-label={name}
        className={cn(
          "font-display border-border-strong bg-surface-muted text-fg inline-flex items-center justify-center overflow-hidden rounded-full border",
          sizes[size],
        )}
      >
        {src ? (
          // Zewnętrzne adresy obrazów (bez optymalizacji Next) — świadomie zwykły <img>.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt="" className="size-full object-cover" />
        ) : (
          <span aria-hidden="true">{initials(name)}</span>
        )}
      </span>
      {online !== undefined ? (
        <span
          title={online ? "Online" : "Offline"}
          className={cn(
            "border-surface absolute right-0 bottom-0 size-3 rounded-full border-2",
            online ? "bg-success" : "bg-fg-muted",
          )}
        />
      ) : null}
    </span>
  );
}
