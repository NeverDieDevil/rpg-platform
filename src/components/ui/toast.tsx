"use client";

import { CheckCircle2, Info, TriangleAlert, X, XCircle } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export type ToastVariant = "info" | "success" | "warning" | "danger";
type ToastItem = {
  id: number;
  variant: ToastVariant;
  title: string;
  description?: string;
};

const icons = {
  info: Info,
  success: CheckCircle2,
  warning: TriangleAlert,
  danger: XCircle,
} as const;

const accents: Record<ToastVariant, string> = {
  info: "border-l-info text-info",
  success: "border-l-success text-success",
  warning: "border-l-warning text-warning",
  danger: "border-l-danger text-danger",
};

type ToastApi = {
  toast: (
    t: Omit<ToastItem, "id" | "variant"> & { variant?: ToastVariant },
  ) => void;
};

const ToastContext = createContext<ToastApi | null>(null);

/** Wywołanie: `const { toast } = useToast(); toast({ title: "Zapisano" })`. */
export function useToast(): ToastApi {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast wymaga <ToastProvider>");
  return ctx;
}

const AUTO_DISMISS_MS = 6000;

/**
 * Powiadomienia w regionie `aria-live="polite"`. Znikają same po 6 s, można je
 * zamknąć przyciskiem. Błędy (`danger`) są ogłaszane natychmiast (`role=alert`).
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const nextId = useRef(1);

  const dismiss = useCallback((id: number) => {
    setItems((list) => list.filter((t) => t.id !== id));
  }, []);

  const api = useMemo<ToastApi>(
    () => ({
      toast: ({ variant = "info", ...rest }) => {
        const id = nextId.current++;
        setItems((list) => [...list, { id, variant, ...rest }]);
        window.setTimeout(() => dismiss(id), AUTO_DISMISS_MS);
      },
    }),
    [dismiss],
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed right-4 bottom-4 z-50 flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-2"
      >
        {items.map((t) => {
          const Icon = icons[t.variant];
          return (
            <div
              key={t.id}
              role={t.variant === "danger" ? "alert" : "status"}
              className={cn(
                "border-border bg-surface-raised pointer-events-auto flex items-start gap-3 rounded-md border border-l-4 p-4 shadow-lg",
                "motion-safe:animate-[rpg-toast-in_var(--rpg-duration-base)_var(--rpg-ease)]",
                accents[t.variant],
              )}
            >
              <Icon aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
              <div className="text-fg min-w-0 flex-1">
                <p className="font-[var(--rpg-control-weight)]">{t.title}</p>
                {t.description ? (
                  <p className="text-fg-muted text-sm">{t.description}</p>
                ) : null}
              </div>
              <button
                type="button"
                aria-label="Zamknij powiadomienie"
                onClick={() => dismiss(t.id)}
                className="text-fg-muted hover:bg-surface-muted hover:text-fg rounded-sm p-1"
              >
                <X aria-hidden="true" className="size-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
