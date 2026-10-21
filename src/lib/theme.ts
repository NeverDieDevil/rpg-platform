/**
 * Skiny aplikacji. Wygląd każdego z nich definiuje `src/styles/tokens.css`
 * przez selektor `[data-theme="..."]`.
 *
 * Faza 0 ustawia skin statycznie w layoucie. Przełączanie per kampania
 * (decyzja z SHE-2) dochodzi w Fazie 1.
 */
export const THEMES = ["fantasy", "neon"] as const;

export type Theme = (typeof THEMES)[number];

export const DEFAULT_THEME: Theme = "fantasy";

export function isTheme(value: string): value is Theme {
  return (THEMES as readonly string[]).includes(value);
}
