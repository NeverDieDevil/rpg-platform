import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { getServerEnv } from "@/lib/env";
import * as schema from "./schema";

type Database = ReturnType<typeof createDatabase>;

function createDatabase() {
  const client = postgres(getServerEnv().DATABASE_URL, {
    // Pula Supavisor w trybie transaction nie obsługuje prepared statements.
    prepare: false,
    // Jeden izolat Workers obsługuje niewiele równoległych żądań, a pula
    // połączeń Supabase na planie Free jest mała — trzymamy jedno połączenie.
    max: 1,
  });

  return drizzle(client, { schema });
}

let database: Database | undefined;

/**
 * Połączenie z bazą, tworzone leniwie i współdzielone w obrębie izolatu.
 * Leniwie, bo `next build` nie ma dostępu do bazy i nie może jej wymagać.
 */
export function getDb(): Database {
  database ??= createDatabase();
  return database;
}
