import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { getServerEnv } from "@/lib/env";
import * as schema from "./schema";

type Database = ReturnType<typeof drizzle<typeof schema>>;

/**
 * Połączenie z bazą na czas jednego żądania.
 *
 * Połączenia NIE WOLNO trzymać w module i współdzielić między żądaniami.
 * Gniazdo TCP należy na Workers do kontekstu żądania, w którym powstało; użyte
 * w kolejnym żądaniu nigdy nie dostarczy odpowiedzi, a obietnica zapytania
 * nigdy się nie rozwiąże. Runtime wykrywa to jako zawieszenie i zwraca 1101 —
 * czego nie łapie żaden `try/catch`, bo nie ma wyjątku, jest brak odpowiedzi.
 *
 * Objawiało się to niestabilnością: żądanie na świeżym izolacie przechodziło,
 * każde następne na tym samym izolacie wisiało (ok. 90% zapytań).
 *
 * Pula Supavisor w trybie transaction (port 6543) jest zrobiona pod taki wzorzec
 * — krótkie połączenie na żądanie — więc to nie obejście, a docelowy sposób.
 */
export async function withDb<T>(
  query: (db: Database) => Promise<T>,
): Promise<T> {
  const client = postgres(getServerEnv().DATABASE_URL, {
    // Pula Supavisor w trybie transaction nie obsługuje prepared statements.
    prepare: false,
    // Jedno połączenie na żądanie; pula Supabase na planie Free jest mała.
    max: 1,
    idle_timeout: 5,
    connect_timeout: 10,
  });

  try {
    return await query(drizzle(client, { schema }));
  } finally {
    // Gniazdo zamykamy jawnie — izolat może obsłużyć kolejne żądanie i nie
    // może odziedziczyć po tym żadnego otwartego połączenia.
    await client.end({ timeout: 5 }).catch(() => {});
  }
}
