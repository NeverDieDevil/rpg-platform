"use client";

import { cloneElement, useId, useState } from "react";
import type { ReactElement } from "react";

/**
 * Tooltip: pokazuje się na hover i na focus klawiatury, znika po Esc
 * (WCAG 1.4.13) i pozostaje widoczny, gdy kursor jest nad nim. Opis jest
 * podpięty przez `aria-describedby`. Dziecko musi być elementem fokusowalnym
 * (przycisk, link) — nie wolno wkładać tu treści niezbędnej do obsługi.
 */
export function Tooltip({
  text,
  children,
}: {
  text: string;
  children: ReactElement<{ "aria-describedby"?: string }>;
}) {
  const id = useId();
  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      onKeyDown={(e) => {
        if (e.key === "Escape") hide();
      }}
    >
      {cloneElement(children, { "aria-describedby": id })}
      <span
        id={id}
        role="tooltip"
        hidden={!visible}
        className="border-border-strong bg-surface-raised text-fg absolute bottom-full left-1/2 z-40 mb-2 w-max max-w-64 -translate-x-1/2 rounded-md border px-3 py-1.5 text-sm shadow-md"
      >
        {text}
      </span>
    </span>
  );
}
