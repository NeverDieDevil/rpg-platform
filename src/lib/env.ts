import { z } from "zod";

/**
 * Konfiguracja środowiska po stronie serwera.
 *
 * Walidacja jest leniwa (nie przy imporcie modułu), bo `next build` i CI
 * działają bez dostępu do bazy. Brakujący `DATABASE_URL` ma wywrócić żądanie,
 * które naprawdę potrzebuje bazy — nie build.
 *
 * Na Cloudflare Workers sekrety trafiają do `process.env` dzięki
 * `nodejs_compat` i warstwie OpenNext.
 */
const serverEnvSchema = z.object({
  DATABASE_URL: z
    .string()
    .min(1)
    .refine(
      (value) =>
        value.startsWith("postgres://") || value.startsWith("postgresql://"),
      "musi być adresem postgres:// lub postgresql://",
    ),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

let cached: ServerEnv | undefined;

export function getServerEnv(): ServerEnv {
  if (cached) return cached;

  const parsed = serverEnvSchema.safeParse({
    DATABASE_URL: process.env.DATABASE_URL,
  });

  if (!parsed.success) {
    // Celowo bez wartości pól — connection string nie może trafić do logów.
    const details = parsed.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ");
    throw new Error(`Nieprawidłowa konfiguracja środowiska (${details})`);
  }

  cached = parsed.data;
  return cached;
}
