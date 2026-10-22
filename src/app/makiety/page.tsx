import type { Metadata } from "next";
import Link from "next/link";

import { PageTitle } from "@/components/site-shell";
import { Card } from "@/components/ui";

export const metadata: Metadata = { title: "Makiety — Platforma RPG" };

const SCREENS = [
  ["/makiety/logowanie", "Ekran logowania", "Wejście przez konto zewnętrzne."],
  [
    "/makiety/kampanie",
    "Lista kampanii",
    "Kampanie użytkownika, rola i system.",
  ],
  [
    "/makiety/kampania",
    "Widok kampanii",
    "Sesje, gracze i prywatne notatki mistrza gry.",
  ],
  [
    "/makiety/kreator-postaci",
    "Kreator postaci",
    "Jeden krok kreatora z podsumowaniem.",
  ],
  [
    "/makiety/karta-postaci",
    "Karta postaci",
    "Statystyki, umiejętności, ekwipunek.",
  ],
  [
    "/makiety/sesja",
    "Pokój sesji",
    "Mapa z tokenami, czat, log rzutów, kolejka inicjatywy.",
  ],
  ["/makiety/newsy", "Newsy RPG", "Nagłówki ze źródeł z filtrem po systemie."],
] as const;

export default function MakietyIndex() {
  return (
    <>
      <PageTitle
        title="Makiety ekranów"
        lead="Statyczne ekrany na danych zaślepkowych. Przełącz motyw w nagłówku, żeby zobaczyć każdy w obu skinach."
      />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SCREENS.map(([href, title, desc]) => (
          <li key={href}>
            <Link
              href={href}
              className="block h-full rounded-lg transition-transform hover:-translate-y-0.5"
            >
              <Card raised className="hover:border-accent h-full">
                <h2 className="text-xl">{title}</h2>
                <p className="text-fg-muted mt-1">{desc}</p>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
