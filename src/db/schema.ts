import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

/**
 * Tabela kontrolna Fazy 0.
 *
 * Jej jedynym zadaniem jest potwierdzić, że łańcuch
 * schemat -> migracja -> baza -> aplikacja działa end-to-end.
 * Nie jest encją produktową i zostanie usunięta migracją w Fazie 2,
 * gdy wejdzie właściwy schemat (użytkownicy, kampanie, członkostwa).
 *
 * `enableRLS()` realizuje decyzję z SHE-2: każda tabela ma włączone RLS
 * i zero polityk, więc publiczne API Supabase (PostgREST) nie wystawia danych.
 * Aplikacja łączy się jako właściciel bazy i RLS jej nie ogranicza.
 */
export const healthCheck = pgTable("health_check", {
  id: serial("id").primaryKey(),
  label: text("label").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
}).enableRLS();

export type HealthCheck = typeof healthCheck.$inferSelect;
