-- Jeden wiersz w tabeli kontrolnej, żeby `GET /api/health/db` dowodził
-- przejścia całego łańcucha: połączenie -> migracja -> zapis -> odczyt.
-- Bez niego endpoint zwraca `latest: null`, co nie odróżnia pustej tabeli
-- od tabeli, z której nie umiemy czytać.
--
-- Warunek `where not exists` jest po to, żeby migracja była bezpieczna przy
-- powtórnym uruchomieniu na bazie, która ten wiersz już ma.
INSERT INTO "health_check" ("label")
SELECT 'faza-0b'
WHERE NOT EXISTS (
  SELECT 1 FROM "health_check" WHERE "label" = 'faza-0b'
);
