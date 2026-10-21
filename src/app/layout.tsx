import type { Metadata } from "next";

import { DEFAULT_THEME } from "@/lib/theme";
import "./globals.css";

export const metadata: Metadata = {
  title: "Platforma RPG",
  description: "Platforma do prowadzenia sesji RPG online.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // `data-theme` wybiera skin z src/styles/tokens.css.
    // Faza 0: skin statyczny. Faza 1: przełączany per kampania.
    <html lang="pl" data-theme={DEFAULT_THEME} className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
