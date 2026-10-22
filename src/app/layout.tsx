import type { Metadata } from "next";
import { cookies } from "next/headers";

import { THEME_COOKIE, resolveTheme } from "@/lib/theme";
import "@fontsource-variable/cinzel";
import "@fontsource-variable/crimson-pro";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource/chakra-petch/500.css";
import "@fontsource/chakra-petch/600.css";
import "@fontsource/chakra-petch/700.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Platforma RPG",
  description: "Platforma do prowadzenia sesji RPG online.",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Skin wybiera serwer z ciasteczka, więc pierwszy HTML ma już `data-theme`
  // i przeglądarka maluje właściwe kolory — bez skryptu i bez mignięcia.
  const theme = resolveTheme((await cookies()).get(THEME_COOKIE)?.value);

  return (
    <html lang="pl" data-theme={theme} className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
