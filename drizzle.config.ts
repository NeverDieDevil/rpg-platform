import "dotenv/config";

import { defineConfig } from "drizzle-kit";

/**
 * Konfiguracja drizzle-kit (generowanie i stosowanie migracji).
 *
 * `DATABASE_URL` jest potrzebny tylko dla `db:migrate`. `db:generate` tworzy
 * pliki SQL ze schematu i działa bez bazy.
 */
export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
  strict: true,
  verbose: true,
});
