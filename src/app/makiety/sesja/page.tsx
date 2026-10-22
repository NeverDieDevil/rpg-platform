import { Dices, Send } from "lucide-react";
import type { Metadata } from "next";

import {
  Avatar,
  Badge,
  Button,
  Card,
  CardHeader,
  TextField,
} from "@/components/ui";

export const metadata: Metadata = { title: "Pokój sesji — makieta" };

// Pozycje tokenów w procentach planszy.
const TOKENS = [
  { name: "Kaelith", x: 22, y: 30, kind: "pc" },
  { name: "Ewka Cień", x: 34, y: 52, kind: "pc" },
  { name: "Cela z Wrzosowisk", x: 18, y: 66, kind: "pc" },
  { name: "Strażnik Brodu", x: 70, y: 40, kind: "npc" },
  { name: "Najemnik", x: 78, y: 62, kind: "npc" },
] as const;

const CHAT = [
  ["Aria Wen", "Mgła gęstnieje. Z drugiej strony mostu słychać kroki."],
  ["Borys Kowal", "Kaelith unosi tarczę i staje na przedzie."],
  ["Ewa Lis", "Ja sprawdzam, czy na mostku są pułapki."],
] as const;

const ROLLS = [
  ["Ewa Lis", "Percepcja", "1k20 + 3", "17"],
  ["Borys Kowal", "Atak mieczem", "1k20 + 4", "12"],
  ["Aria Wen", "Obrażenia Najemnika", "1k8 + 2", "7"],
] as const;

const INITIATIVE = [
  ["Ewka Cień", 19, false],
  ["Kaelith", 15, true],
  ["Najemnik", 12, false],
  ["Cela z Wrzosowisk", 8, false],
] as const;

export default function SessionRoomMock() {
  return (
    <>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl md:text-3xl">Sesja 7 — Most w Dolinie Mgieł</h1>
        <Badge variant="success">Na żywo</Badge>
        <div className="flex -space-x-1" aria-label="Obecni uczestnicy">
          {["Aria Wen", "Borys Kowal", "Cela Dorn", "Ewa Lis"].map((n) => (
            <Avatar key={n} name={n} size="sm" online />
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_20rem]">
        <section aria-label="Mapa sceny" className="min-w-0">
          <div
            role="img"
            aria-label="Mapa sceny z tokenami postaci: Kaelith, Ewka Cień, Cela z Wrzosowisk oraz przeciwnicy Strażnik Brodu i Najemnik"
            className="border-border-strong bg-surface-muted relative aspect-[4/3] w-full overflow-hidden rounded-lg border shadow-md"
            style={{
              backgroundImage:
                "linear-gradient(var(--rpg-color-border) 1px, transparent 1px), linear-gradient(90deg, var(--rpg-color-border) 1px, transparent 1px)",
              backgroundSize: "10% 10%",
            }}
          >
            {/* Most — prosty pas pośrodku */}
            <div
              aria-hidden="true"
              className="border-border-strong bg-surface absolute inset-y-0 left-[44%] w-[12%] border-x-2"
            />
            {TOKENS.map((t) => (
              <div
                key={t.name}
                aria-hidden="true"
                title={t.name}
                className={
                  "absolute flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 text-xs font-bold shadow-md sm:size-12 " +
                  (t.kind === "pc"
                    ? "border-accent-fg bg-accent text-accent-fg"
                    : "border-danger-fg bg-danger text-danger-fg")
                }
                style={{ left: `${t.x}%`, top: `${t.y}%` }}
              >
                {t.name
                  .split(" ")
                  .map((p) => p[0])
                  .slice(0, 2)
                  .join("")}
              </div>
            ))}
          </div>
          <p className="text-fg-muted mt-2 text-sm">
            Przeciąganie tokenów dochodzi w Fazie 4 — tu tylko układ.
          </p>
        </section>

        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader as="h2" title="Inicjatywa" description="Runda 2" />
            <ol className="space-y-2">
              {INITIATIVE.map(([name, value, current]) => (
                <li
                  key={name}
                  aria-current={current ? "true" : undefined}
                  className={
                    "flex items-center gap-3 rounded-md border px-3 py-2 " +
                    (current
                      ? "border-highlight bg-surface-raised"
                      : "border-border")
                  }
                >
                  <span className="w-7 font-mono">{value}</span>
                  <span className="flex-1">{name}</span>
                  {current ? <Badge variant="highlight">Tura</Badge> : null}
                </li>
              ))}
            </ol>
            <Button className="mt-3 w-full" variant="secondary">
              Następna tura
            </Button>
          </Card>

          <Card>
            <CardHeader as="h2" title="Log rzutów" />
            <ul className="space-y-2 text-sm">
              {ROLLS.map(([who, what, formula, result]) => (
                <li key={what} className="flex items-center gap-2">
                  <Dices
                    aria-hidden="true"
                    className="text-accent size-4 shrink-0"
                  />
                  <span className="flex-1">
                    <strong>{who}</strong> · {what}
                    <span className="text-fg-muted block font-mono">
                      {formula}
                    </span>
                  </span>
                  <span className="font-display text-xl">{result}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      <Card className="mt-4">
        <CardHeader as="h2" title="Czat" />
        <ul
          aria-label="Wiadomości"
          aria-live="polite"
          className="mb-4 max-h-48 space-y-2 overflow-y-auto"
        >
          {CHAT.map(([who, text]) => (
            <li key={text}>
              <strong>{who}:</strong> {text}
            </li>
          ))}
        </ul>
        <form className="flex items-end gap-2" action="#">
          <TextField
            label="Wiadomość"
            placeholder="Napisz coś lub /r 1k20+3"
            className="flex-1"
          />
          <Button type="button">
            <Send aria-hidden="true" className="size-4" />
            Wyślij
          </Button>
        </form>
      </Card>
    </>
  );
}
