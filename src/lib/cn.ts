/** Skleja nazwy klas, pomijając wartości puste. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
