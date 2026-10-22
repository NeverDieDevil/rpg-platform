import type { Metadata } from "next";

import { PageTitle } from "@/components/site-shell";
import {
  Badge,
  Button,
  Card,
  CardHeader,
  FieldGroup,
  Radio,
  SelectField,
  TextField,
} from "@/components/ui";

export const metadata: Metadata = { title: "Kreator postaci — makieta" };

const STEPS = [
  "Podstawy",
  "Atrybuty",
  "Umiejętności",
  "Ekwipunek",
  "Podsumowanie",
];

const ABILITIES = [
  ["Siła", 15],
  ["Zręczność", 13],
  ["Kondycja", 14],
  ["Intelekt", 8],
  ["Mądrość", 12],
  ["Charyzma", 10],
] as const;

export default function CharacterCreatorMock() {
  return (
    <>
      <PageTitle
        title="Nowa postać"
        lead="Krok 2 z 5. Kreator zapisuje szkic po każdym kroku."
      />

      <ol
        aria-label="Kroki kreatora"
        className="mb-8 flex flex-wrap gap-2 text-sm"
      >
        {STEPS.map((s, i) => (
          <li
            key={s}
            aria-current={i === 1 ? "step" : undefined}
            className={
              i === 1
                ? "bg-accent text-accent-fg rounded-md px-3 py-1.5"
                : "border-border-strong rounded-md border px-3 py-1.5 " +
                  (i < 1 ? "text-fg" : "text-fg-muted")
            }
          >
            {i + 1}. {s}
          </li>
        ))}
      </ol>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card className="space-y-6">
          <CardHeader
            as="h2"
            title="Atrybuty"
            description="Rozdziel pulę wartości. Pozostało: 0."
          />
          <TextField label="Imię postaci" defaultValue="Kaelith" required />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ABILITIES.map(([name, value]) => (
              <TextField
                key={name}
                label={name}
                type="number"
                min={3}
                max={18}
                defaultValue={value}
                className="[&_input]:font-mono"
              />
            ))}
          </div>
          <SelectField label="Archetyp" defaultValue="wojownik">
            <option value="wojownik">Wojownik</option>
            <option value="mag">Mag</option>
            <option value="lotr">Łotrzyk</option>
          </SelectField>
          <FieldGroup legend="Metoda rozdzielania">
            <Radio name="m" label="Pula punktów" defaultChecked />
            <Radio
              name="m"
              label="Rzuty kośćmi"
              hint="Wynik zapisze się w logu."
            />
          </FieldGroup>
          <div className="border-border flex flex-wrap justify-between gap-3 border-t pt-4">
            <Button variant="ghost">Wstecz</Button>
            <div className="flex gap-2">
              <Button variant="secondary">Zapisz szkic</Button>
              <Button>Dalej</Button>
            </div>
          </div>
        </Card>

        <Card raised className="h-fit space-y-3">
          <CardHeader as="h2" title="Podgląd" />
          <p className="font-display text-xl">Kaelith</p>
          <Badge variant="accent">Wojownik · poz. 1</Badge>
          <dl className="grid grid-cols-2 gap-x-3 gap-y-1 text-sm">
            {ABILITIES.map(([n, v]) => (
              <div key={n} className="contents">
                <dt className="text-fg-muted">{n}</dt>
                <dd className="font-mono">{v}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </div>
    </>
  );
}
