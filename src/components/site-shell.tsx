import type { ReactNode } from "react";

import { AppHeader, ToastProvider } from "@/components/ui";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import type { NavItem } from "@/components/ui";

const NAV: NavItem[] = [
  { href: "/", label: "Start" },
  { href: "/design", label: "Design system" },
  { href: "/makiety", label: "Makiety" },
];

/** Wspólna oprawa stron: nagłówek z przełącznikiem skinu, treść, stopka. */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <a
        href="#main"
        className="focus:bg-accent focus:text-accent-fg sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-2 focus:rounded-md focus:px-4 focus:py-2"
      >
        Przejdź do treści
      </a>
      <AppHeader nav={NAV} actions={<ThemeSwitcher />} />
      <main
        id="main"
        className="mx-auto w-full max-w-[var(--rpg-content-max)] flex-1 px-4 py-8"
      >
        {children}
      </main>
      <footer className="border-border bg-surface text-fg-muted border-t px-4 py-4 text-sm">
        <div className="mx-auto max-w-[var(--rpg-content-max)]">
          Platforma RPG — widok poglądowy (Faza 1). Dane na stronach makiet są
          zaślepkowe.
        </div>
      </footer>
    </ToastProvider>
  );
}

export function PageTitle({
  title,
  lead,
  actions,
}: {
  title: string;
  lead?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-prose">
        <h1 className="text-3xl md:text-4xl">{title}</h1>
        {lead ? <p className="text-fg-muted mt-2">{lead}</p> : null}
      </div>
      {actions}
    </div>
  );
}
