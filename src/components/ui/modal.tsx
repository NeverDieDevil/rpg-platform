"use client";

import { X } from "lucide-react";
import { useEffect, useId, useRef } from "react";
import type { ReactNode } from "react";

import { Button } from "./button";

/**
 * Modal na natywnym `<dialog>` + `showModal()`: przeglądarka sama trzyma focus
 * wewnątrz, blokuje resztę strony (inert), zamyka na Esc i oddaje focus
 * elementowi, który otworzył okno. Kliknięcie w tło też zamyka.
 */
export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      aria-describedby={description ? descId : undefined}
      onClose={onClose}
      onClick={(e) => {
        // Kliknięcie poza panelem trafia w sam <dialog> (tło).
        if (e.target === ref.current) ref.current?.close();
      }}
      className="border-border bg-surface-raised text-fg backdrop:bg-overlay m-auto w-[min(32rem,calc(100vw-2rem))] rounded-lg border p-0 shadow-lg"
    >
      <div className="border-border flex items-start justify-between gap-4 border-b p-5">
        <div>
          <h2 id={titleId} className="text-xl">
            {title}
          </h2>
          {description ? (
            <p id={descId} className="text-fg-muted mt-1 text-sm">
              {description}
            </p>
          ) : null}
        </div>
        <Button
          variant="ghost"
          size="sm"
          aria-label="Zamknij okno"
          onClick={() => ref.current?.close()}
        >
          <X aria-hidden="true" className="size-4" />
        </Button>
      </div>
      {children ? <div className="p-5">{children}</div> : null}
      {footer ? (
        <div className="border-border flex flex-wrap justify-end gap-2 border-t p-5">
          {footer}
        </div>
      ) : null}
    </dialog>
  );
}
