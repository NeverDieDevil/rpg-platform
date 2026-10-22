"use client";

import { Dices, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export type NavItem = { href: string; label: string };

/**
 * Nagłówek aplikacji: marka, nawigacja (na telefonie zwijana do przycisku
 * menu) i miejsce na akcje (przełącznik motywu, konto). Aktywna pozycja ma
 * `aria-current="page"`.
 */
export function AppHeader({
  nav,
  actions,
}: {
  nav: NavItem[];
  actions?: ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-border bg-surface border-b">
      <div className="mx-auto flex max-w-[var(--rpg-content-max)] flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
        <Link
          href="/"
          className="font-display text-fg flex items-center gap-2 text-lg"
        >
          <Dices aria-hidden="true" className="text-accent size-6" />
          Platforma RPG
        </Link>

        <button
          type="button"
          className="border-border-strong ml-auto inline-flex min-h-10 min-w-10 items-center justify-center rounded-md border md:hidden"
          aria-expanded={open}
          aria-controls="main-nav"
          aria-label={open ? "Zamknij menu" : "Otwórz menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <X aria-hidden="true" className="size-5" />
          ) : (
            <Menu aria-hidden="true" className="size-5" />
          )}
        </button>

        <nav
          id="main-nav"
          aria-label="Główna"
          className={cn(
            "w-full md:ml-0 md:block md:w-auto md:flex-1",
            open ? "block" : "hidden",
          )}
        >
          <ul className="flex flex-col gap-1 md:flex-row">
            {nav.map((item) => {
              const current =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href + "/"));
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "flex min-h-10 items-center rounded-md px-3 transition-colors",
                      current
                        ? "bg-surface-muted text-fg decoration-accent underline decoration-2 underline-offset-8"
                        : "text-fg-muted hover:bg-surface-muted hover:text-fg",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {actions ? (
          <div
            className={cn(
              "w-full md:w-auto",
              open ? "block" : "hidden md:block",
            )}
          >
            {actions}
          </div>
        ) : null}
      </div>
    </header>
  );
}
