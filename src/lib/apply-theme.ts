import { THEME_COOKIE } from "@/lib/theme";
import type { Theme } from "@/lib/theme";

const ONE_YEAR = 60 * 60 * 24 * 365;

/**
 * Przełącza skin w przeglądarce: zmiana `data-theme` podmienia wszystkie
 * tokeny naraz, a ciasteczko sprawia, że kolejne żądanie renderuje serwer
 * od razu we wybranym skinie (bez mignięcia).
 */
export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  document.cookie = `${THEME_COOKIE}=${theme}; path=/; max-age=${ONE_YEAR}; samesite=lax`;
}
