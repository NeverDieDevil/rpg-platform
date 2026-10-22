/**
 * Skiny aplikacji. Wygląd każdego z nich definiuje `src/styles/tokens.css`
 * przez selektor `[data-theme="..."]`.
 *
 * Skin wybiera serwer: layout czyta ciasteczko `THEME_COOKIE` i od razu
 * renderuje `<html data-theme>`, więc pierwszy render jest już we właściwym
 * skinie (bez mignięcia). Docelowo skin wynika z systemu kampanii (Faza 2) —
 * ciasteczko jest wtedy tylko wyborem w UI poglądowym i dla ekranów poza
 * kampanią.
 */
export const THEMES = ["fantasy", "neon"] as const;

export type Theme = (typeof THEMES)[number];

export const DEFAULT_THEME: Theme = "fantasy";

export const THEME_COOKIE = "rpg-theme";

export const THEME_LABELS: Record<Theme, string> = {
  fantasy: "Fantasy",
  neon: "Neon",
};

export function isTheme(value: string): value is Theme {
  return (THEMES as readonly string[]).includes(value);
}

/** Wartość z ciasteczka -> skin; nieznane lub brak = domyślny. */
export function resolveTheme(value: string | undefined | null): Theme {
  return value && isTheme(value) ? value : DEFAULT_THEME;
}
