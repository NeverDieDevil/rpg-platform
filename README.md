# Platforma RPG

Platforma do prowadzenia sesji RPG online. **Faza 0 — szkielet aplikacji.**
Funkcji produktowych (kampanie, karty postaci, pokój sesji) jeszcze tu nie ma.

Decyzje techniczne są wiążące i opisane w zadaniu SHE-2, dokument
`decyzje-techniczne`. Ten plik opisuje tylko, jak uruchomić projekt.

## Stos

| Warstwa      | Wybór                                                    |
| ------------ | -------------------------------------------------------- |
| Aplikacja    | Next.js 16 (App Router) + TypeScript                     |
| Style        | Tailwind CSS 4 + własna warstwa tokenów motywu           |
| Hosting      | Cloudflare Workers przez adapter OpenNext                |
| Baza         | Supabase (Postgres), pula Supavisor w trybie transaction |
| ORM/migracje | Drizzle ORM + drizzle-kit                                |
| CI/CD        | GitHub Actions                                           |

Wszystko działa na darmowych planach. Nic w tym repozytorium nie wymaga karty
płatniczej ani płatnego planu.

## Wymagania

- Node.js 22 lub nowszy
- npm 10 lub nowszy
- konto Supabase (plan Free) — tylko jeśli chcesz uruchomić część bazodanową

## Uruchomienie lokalne

```bash
npm ci
cp .env.example .env     # Windows: copy .env.example .env
```

Uzupełnij `DATABASE_URL` w `.env` — connection string z puli Supavisor
(panel Supabase → **Connect** → **Transaction pooler**). Potem:

```bash
npm run db:migrate       # zakłada schemat w bazie
npm run dev              # http://localhost:3000
```

Aplikacja wstanie też **bez** `DATABASE_URL` — strona startowa działa, a
`/api/health/db` zwróci wtedy 503. Walidacja środowiska jest celowo leniwa,
żeby build i CI nie wymagały bazy.

### Sprawdzenie łańcucha do bazy

```
GET /api/health/db
```

`200` z polem `status: "ok"` oznacza, że połączenie i migracje działają.

## Przydatne polecenia

| Polecenie              | Działanie                                                       |
| ---------------------- | --------------------------------------------------------------- |
| `npm run dev`          | serwer deweloperski                                             |
| `npm run build`        | build produkcyjny Next.js                                       |
| `npm run lint`         | ESLint                                                          |
| `npm run format`       | Prettier (zapis)                                                |
| `npm run format:check` | Prettier (tylko sprawdzenie, używane w CI)                      |
| `npm run typecheck`    | `tsc --noEmit`                                                  |
| `npm run db:generate`  | generuje migrację SQL ze schematu (bez bazy)                    |
| `npm run db:migrate`   | stosuje migracje na bazie z `DATABASE_URL`                      |
| `npm run db:verify`    | uruchamia migracje na PGlite i sprawdza zapis/odczyt — bez bazy |
| `npm run cf:build`     | buduje bundle Workera (OpenNext)                                |
| `npm run cf:preview`   | lokalny podgląd na środowisku Workers                           |
| `npm run cf:deploy`    | wdrożenie na Cloudflare Workers                                 |

## Struktura katalogów

```
.github/workflows/   CI (lint, format, typecheck, migracje, build) i wdrożenie
drizzle/             wygenerowane migracje SQL — nie edytuj ręcznie
scripts/             skrypty pomocnicze (weryfikacja migracji na PGlite)
src/app/             trasy App Routera
src/app/api/         endpointy serwerowe
src/db/              schemat i połączenie z bazą
src/lib/             konfiguracja środowiska, motywy
src/styles/          tokeny motywu (tokens.css)
```

## Motywy

Komponenty używają wyłącznie nazw semantycznych (`bg-surface`, `text-fg-muted`,
`text-accent`, ...). Wartości dla każdego skinu siedzą w
`src/styles/tokens.css` pod selektorem `[data-theme="..."]`, a
`src/app/globals.css` mapuje je na narzędzia Tailwinda.

Zmiana skinu to zmiana atrybutu `data-theme` na `<html>` — bez dotykania
komponentów. Faza 0 daje tylko strukturę i robocze wartości; docelową paletę
i typografię dla skinów `fantasy` i `neon` dowozi Faza 1.

## Baza danych

Schemat jest źródłem prawdy (`src/db/schema.ts`). Przepływ:

1. zmieniasz `src/db/schema.ts`
2. `npm run db:generate` → nowy plik SQL w `drizzle/`
3. `npm run db:verify` → migracje uruchamiane na PGlite (Postgres w WASM)
4. `npm run db:migrate` → zmiany trafiają na prawdziwą bazę

`npm run db:verify` celowo nie wymaga Supabase: CI sprawdza poprawność migracji
bez sekretów i bez kosztu. Nie sprawdza natomiast samej konfiguracji Supabase.

Każda tabela ma włączone RLS bez polityk (decyzja z SHE-2). Supabase wystawia
bazę publicznym API PostgREST — RLS bez polityk sprawia, że ta droga nic nie
zwraca, a dostęp do danych idzie wyłącznie przez nasz serwer.

Tabela `health_check` jest tabelą kontrolną Fazy 0, nie encją produktową.
Zniknie migracją w Fazie 2, razem z wejściem właściwego schematu.

## Sekrety

**Żaden sekret nie trafia do repozytorium.** `.env.example` ma wyłącznie puste
wartości. Lokalnie używaj `.env` (jest w `.gitignore`).

| Gdzie                    | Co ustawić                                                      |
| ------------------------ | --------------------------------------------------------------- |
| Cloudflare Workers       | `wrangler secret put DATABASE_URL`                              |
| GitHub → Actions secrets | `DATABASE_URL`, `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` |

## Wdrożenie

Push na `main` uruchamia `.github/workflows/deploy.yml`: migracje bazy, a potem
build i wdrożenie na Cloudflare Workers. Wdrożenie wymaga sekretów z tabeli
powyżej, ustawionych w środowisku `production` repozytorium.

## Licencja

[MIT](LICENSE). Licencja obejmuje kod tego repozytorium — zastrzeżenia co do
treści systemów RPG i materiałów użytkowników opisuje `NOTICE.md`.
