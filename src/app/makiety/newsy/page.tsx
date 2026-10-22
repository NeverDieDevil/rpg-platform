import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";

import { PageTitle } from "@/components/site-shell";
import { Badge, Card, SelectField } from "@/components/ui";

export const metadata: Metadata = { title: "Newsy RPG — makieta" };

const NEWS = [
  {
    title: "Nowy zestaw map podziemi do pobrania za darmo",
    excerpt:
      "Wydawca udostępnił dwadzieścia map w wysokiej rozdzielczości na licencji pozwalającej na użytek własny.",
    source: "Przykładowy Blog RPG",
    date: "21.10.2026",
    tag: "Fantasy",
  },
  {
    title: "Wywiad: jak prowadzić klimat neonowego miasta",
    excerpt:
      "Autor scenariuszy opowiada o tempie sesji, tle miasta i tym, jak nie przytłoczyć graczy detalami.",
    source: "Magazyn Stołowy",
    date: "20.10.2026",
    tag: "Cyberpunk",
  },
  {
    title: "Konwent planszówek i RPG — zapisy ruszyły",
    excerpt:
      "Organizatorzy zapowiadają ponad sto sesji prowadzonych przez gości.",
    source: "Portal Konwentowy",
    date: "18.10.2026",
    tag: "Ogólne",
  },
];

export default function NewsMock() {
  return (
    <>
      <PageTitle
        title="Newsy RPG"
        lead="Tytuł, krótki fragment i link do źródła — pełne artykuły czytasz u wydawcy."
      />
      <div className="mb-6 max-w-xs">
        <SelectField label="System" defaultValue="all">
          <option value="all">Wszystkie</option>
          <option value="fantasy">Fantasy</option>
          <option value="cyber">Cyberpunk</option>
        </SelectField>
      </div>
      <ul className="space-y-4">
        {NEWS.map((n) => (
          <li key={n.title}>
            <Card raised>
              <article className="space-y-2">
                <div className="text-fg-muted flex flex-wrap items-center gap-2 text-sm">
                  <Badge variant={n.tag === "Ogólne" ? "neutral" : "accent"}>
                    {n.tag}
                  </Badge>
                  <span>
                    {n.source} · {n.date}
                  </span>
                </div>
                <h2 className="text-xl">{n.title}</h2>
                <p>{n.excerpt}</p>
                <a
                  href="#"
                  className="text-accent hover:text-accent-hover inline-flex items-center gap-1 underline underline-offset-4"
                >
                  Czytaj u źródła
                  <ExternalLink aria-hidden="true" className="size-4" />
                  <span className="sr-only"> — {n.title}</span>
                </a>
              </article>
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
}
