/**
 * Weryfikacja migracji bez zewnętrznej bazy.
 *
 * Uruchamia wszystkie migracje z `drizzle/` na PGlite (Postgres skompilowany
 * do WASM, działa lokalnie i w CI), a potem zapisuje i odczytuje wiersz.
 * Dzięki temu CI sprawdza łańcuch schemat -> migracja -> zapis -> odczyt
 * bez dostępu do Supabase i bez żadnego kosztu.
 *
 * To NIE zastępuje `db:migrate` na prawdziwej bazie — sprawdza poprawność
 * samych migracji, nie konfigurację Supabase.
 */
import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import { migrate } from "drizzle-orm/pglite/migrator";

import { healthCheck } from "../src/db/schema";

async function main() {
  const client = new PGlite();
  const db = drizzle(client, { schema: { healthCheck } });

  await migrate(db, { migrationsFolder: "./drizzle" });
  console.log("Migracje zastosowane.");

  const label = `ci-${Date.now()}`;
  const [inserted] = await db.insert(healthCheck).values({ label }).returning();

  if (inserted?.label !== label) {
    throw new Error(
      "Zapis do tabeli health_check nie zwrócił oczekiwanego wiersza.",
    );
  }

  const rows = await db.select().from(healthCheck);
  if (rows.length !== 1) {
    throw new Error(
      `Oczekiwano 1 wiersza w health_check, znaleziono ${rows.length}.`,
    );
  }

  // Potwierdza, że migracja faktycznie włączyła RLS (decyzja z SHE-2).
  const rls = await client.query<{ relrowsecurity: boolean }>(
    "select relrowsecurity from pg_class where relname = 'health_check'",
  );
  if (rls.rows[0]?.relrowsecurity !== true) {
    throw new Error("Tabela health_check nie ma włączonego RLS.");
  }

  await client.close();
  console.log("Zapis, odczyt i RLS potwierdzone.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
