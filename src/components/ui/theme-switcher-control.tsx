"use client";

import { useState } from "react";

import { applyTheme } from "@/lib/apply-theme";
import { cn } from "@/lib/cn";
import { THEMES, THEME_LABELS } from "@/lib/theme";
import type { Theme } from "@/lib/theme";

export function ThemeSwitcherControl({ initial }: { initial: Theme }) {
  const [theme, setTheme] = useState<Theme>(initial);

  function choose(next: Theme) {
    setTheme(next);
    applyTheme(next);
  }

  return (
    <div
      role="group"
      aria-label="Motyw"
      className="border-border-strong bg-surface-raised inline-flex rounded-md border p-0.5"
    >
      {THEMES.map((t) => (
        <button
          key={t}
          type="button"
          aria-pressed={theme === t}
          onClick={() => choose(t)}
          className={cn(
            "min-h-8 rounded-sm px-3 text-sm font-[var(--rpg-control-weight)] transition-colors",
            theme === t
              ? "bg-accent text-accent-fg"
              : "text-fg hover:bg-surface-muted",
          )}
        >
          {THEME_LABELS[t]}
        </button>
      ))}
    </div>
  );
}
