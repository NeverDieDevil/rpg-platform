import { Lock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

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
  Tabs,
  TextareaField,
  Th,
  THead,
  Tr,
  buttonClasses,
} from "@/components/ui";

export const metadata: Metadata = { title: "Widok kampanii — makieta" };

const SESSIONS = [
  ["Sesja 7 — Most w Dolinie Mgieł", "Pt 24.10, 19:00", "Zaplanowana"],
  ["Sesja 6 — Oblężenie młyna", "Pt 17.10, 19:00", "Odbyta"],
  ["Sesja 5 — Targ w Karczmie", "Pt 10.10, 19:00", "Odbyta"],
] as const;

const PLAYERS = [
  ["Aria Wen", "Mistrz gry", "—", true],
  ["Borys Kowal", "Gracz", "Brunhilda", false],
  ["Cela Dorn", "Gracz", "Cela z Wrzosowisk", true],
  ["Ewa Lis", "Gracz", "Ewka Cień", true],
] as const;

export default function CampaignMock() {
  return (
    <>
      <PageTitle
        title="Popioły Wschodniej Marchii"
        lead="Kampania w klimacie mrocznego fantasy. Prowadzi Aria Wen."
        actions={
          <div className="flex gap-2">
            <Button variant="secondary">Zaproś graczy</Button>
            <Link href="/makiety/sesja" className={buttonClasses("primary")}>
              Wejdź do pokoju sesji
            </Link>
          </div>
        }
      />
      <Tabs
        label="Sekcje kampanii"
        tabs={[
          {
            id: "sesje",
            label: "Sesje",
            content: (
              <Table caption="Sesje kampanii">
                <THead>
                  <Tr>
                    <Th>Sesja</Th>
                    <Th>Termin</Th>
                    <Th>Status</Th>
                  </Tr>
                </THead>
                <TBody>
                  {SESSIONS.map(([name, date, status]) => (
                    <Tr key={name}>
                      <Td>{name}</Td>
                      <Td>{date}</Td>
                      <Td>
                        <Badge
                          variant={
                            status === "Zaplanowana" ? "highlight" : "neutral"
                          }
                        >
                          {status}
                        </Badge>
                      </Td>
                    </Tr>
                  ))}
                </TBody>
              </Table>
            ),
          },
          {
            id: "gracze",
            label: "Gracze",
            content: (
              <ul className="grid gap-3 sm:grid-cols-2">
                {PLAYERS.map(([name, role, character, online]) => (
                  <li key={name}>
                    <Card className="flex items-center gap-3 p-4">
                      <Avatar name={name} online={online} />
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold">{name}</p>
                        <p className="text-fg-muted text-sm">
                          {role} · {character}
                        </p>
                      </div>
                    </Card>
                  </li>
                ))}
              </ul>
            ),
          },
          {
            id: "notatki",
            label: "Notatki MG",
            content: (
              <Card className="space-y-4">
                <CardHeader
                  title="Prywatne notatki mistrza gry"
                  description="Widoczne wyłącznie dla Ciebie. Gracze ich nie zobaczą ani nie pobiorą."
                  actions={
                    <Badge variant="warning">
                      <Lock aria-hidden="true" className="size-3" />
                      Prywatne
                    </Badge>
                  }
                />
                <TextareaField
                  label="Notatki do sesji 7"
                  rows={6}
                  defaultValue={
                    "Most pilnuje Strażnik Brodu — przekupny, ale dumny.\nHak fabularny: list od zaginionego kupca w płaszczu Cieni."
                  }
                />
                <Button>Zapisz notatki</Button>
              </Card>
            ),
          },
        ]}
      />
    </>
  );
}
