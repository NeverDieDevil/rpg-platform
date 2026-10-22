import type { Metadata } from "next";

import { PageTitle } from "@/components/site-shell";
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardHeader,
  Table,
  TBody,
  Td,
  Th,
  THead,
  Tr,
} from "@/components/ui";

export const metadata: Metadata = { title: "Karta postaci — makieta" };

const ABILITIES = [
  ["Siła", 15, "+2"],
  ["Zręczność", 13, "+1"],
  ["Kondycja", 14, "+2"],
  ["Intelekt", 8, "−1"],
  ["Mądrość", 12, "+1"],
  ["Charyzma", 10, "+0"],
] as const;

const SKILLS = [
  ["Atletyka", "Siła", "+4", true],
  ["Percepcja", "Mądrość", "+3", true],
  ["Skradanie", "Zręczność", "+1", false],
  ["Perswazja", "Charyzma", "+0", false],
] as const;

const ITEMS = [
  ["Miecz długi", "1", "1k8 cięte"],
  ["Tarcza", "1", "+2 do obrony"],
  ["Mikstura leczenia", "2", "2k4 + 2"],
] as const;

export default function CharacterSheetMock() {
  return (
    <>
      <PageTitle
        title="Karta postaci"
        actions={
          <div className="flex gap-2">
            <Button variant="secondary">Edytuj</Button>
            <Button>Rzuć inicjatywę</Button>
          </div>
        }
      />

      <Card raised className="mb-6 flex flex-wrap items-center gap-4">
        <Avatar name="Kaelith" size="lg" />
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl">Kaelith</h2>
          <p className="text-fg-muted">
            Wojownik · poziom 1 · gracz: Borys Kowal
          </p>
        </div>
        <dl className="flex gap-6 text-center">
          {[
            ["Punkty życia", "12 / 12"],
            ["Obrona", "16"],
            ["Szybkość", "9 m"],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-fg-muted text-xs">{k}</dt>
              <dd className="font-display text-2xl">{v}</dd>
            </div>
          ))}
        </dl>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader as="h2" title="Atrybuty" />
          <ul className="grid grid-cols-2 gap-3">
            {ABILITIES.map(([name, value, mod]) => (
              <li
                key={name}
                className="border-border-strong bg-surface-raised rounded-md border p-3 text-center"
              >
                <p className="text-fg-muted text-xs">{name}</p>
                <p className="font-display text-2xl">{mod}</p>
                <p className="font-mono text-sm">{value}</p>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <CardHeader as="h2" title="Umiejętności" />
          <ul className="divide-border divide-y">
            {SKILLS.map(([name, ability, bonus, trained]) => (
              <li key={name} className="flex items-center gap-3 py-2">
                <span className="flex-1">
                  {name}{" "}
                  <span className="text-fg-muted text-sm">({ability})</span>
                </span>
                {trained ? <Badge variant="accent">Biegłość</Badge> : null}
                <span className="w-10 text-right font-mono">{bonus}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="lg:row-span-1">
          <CardHeader as="h2" title="Notatki" />
          <p className="text-fg-muted">
            Syn kowala z pogranicza. Szuka brata, który zaginął po upadku młyna.
          </p>
        </Card>
      </div>

      <h2 className="mt-8 mb-3 text-xl">Ekwipunek</h2>
      <Table caption="Ekwipunek postaci">
        <THead>
          <Tr>
            <Th>Przedmiot</Th>
            <Th>Ilość</Th>
            <Th>Działanie</Th>
          </Tr>
        </THead>
        <TBody>
          {ITEMS.map(([n, q, e]) => (
            <Tr key={n}>
              <Td>{n}</Td>
              <Td className="font-mono">{q}</Td>
              <Td>{e}</Td>
            </Tr>
          ))}
        </TBody>
      </Table>
    </>
  );
}
