import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

import { getDb } from "@/db";
import { healthCheck } from "@/db/schema";

/**
 * Sprawdzenie łańcucha aplikacja -> baza.
 *
 * Tylko odczyt: zwraca najnowszy wpis z tabeli kontrolnej założonej migracją.
 * Odpowiedź 200 oznacza, że połączenie i migracje działają end-to-end.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [latest] = await getDb()
      .select()
      .from(healthCheck)
      .orderBy(desc(healthCheck.id))
      .limit(1);

    return NextResponse.json({
      status: "ok",
      latest: latest ?? null,
    });
  } catch (error) {
    // Treść błędu może zawierać adres połączenia — do logu serwera, nie do odpowiedzi.
    console.error("health/db: zapytanie do bazy nie powiodło się", error);

    return NextResponse.json(
      { status: "error", message: "Zapytanie do bazy nie powiodło się." },
      { status: 503 },
    );
  }
}
