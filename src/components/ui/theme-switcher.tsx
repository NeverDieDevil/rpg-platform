import { cookies } from "next/headers";

import { THEME_COOKIE, resolveTheme } from "@/lib/theme";

import { ThemeSwitcherControl } from "./theme-switcher-control";

/**
 * Przełącznik skinu. Część serwerowa czyta aktualny skin z ciasteczka, więc
 * zaznaczenie jest poprawne już w pierwszym HTML-u.
 */
export async function ThemeSwitcher() {
  const theme = resolveTheme((await cookies()).get(THEME_COOKIE)?.value);
  return <ThemeSwitcherControl initial={theme} />;
}
