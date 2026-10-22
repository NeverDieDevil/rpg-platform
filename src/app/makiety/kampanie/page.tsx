import type { Metadata } from "next";
import Link from "next/link";

import { PageTitle } from "@/components/site-shell";
import {
  Avatar,
  Badge,
  Button,
  Card,
  SelectField,
  buttonClasses,
} from "@/components/ui";

export const metadata: Metadata = { title: "Lista kampanii — makieta" };

const CAMPAIGNS = [
  {
    name: "Popioły Wschodniej Marchii",
    system: "Fantasy",
    role: "Mistrz gry",
    next: "Pt 24.10, 19:00",
    players: ["Borys Kowal", "Cela Dorn", "Ewa Lis", "Fil Rau"],
    live: true,
  },
  {
    name: "Neonowe Dzielnice",
    system: "Cyberpunk",
    role: "Gracz",
    next: "So 25.10, 20:30",
    players: ["Aria Wen", "Kuba Nord", "Mia Sol"],
    live: false,
  },
  {
    name: "Cienie nad Jeziorem",
    system: "Fantasy",
    role: "Gracz",
    next: "Brak terminu",
    players: ["Aria Wen", "Ola Brzoza"],
    live: false,
  },
];

export default function CampaignListMock() {
  return (
    <>
      <PageTitle
        title="Twoje kampanie"
        lead="Skin aplikacji w widoku kampanii zależy od jej systemu."
        actions={<Button size="lg">Nowa kampania</Button>}
      />
      <div className="mb-6 max-w-xs">
        <SelectField label="Pokaż" defaultValue="all">
          <option value="all">Wszystkie</option>
          <option value="gm">Prowadzone przeze mnie</option>
          <option value="player">Gram</option>
        </SelectField>
      </div>
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {CAMPAIGNS.map((c) => (
          <li key={c.name}>
            <Card raised className="flex h-full flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={c.system === "Fantasy" ? "neutral" : "accent"}>
                  {c.system}
                </Badge>
                <Badge
                  variant={c.role === "Mistrz gry" ? "highlight" : "neutral"}
                >
                  {c.role}
                </Badge>
                {c.live ? <Badge variant="success">Sesja trwa</Badge> : null}
              </div>
              <h2 className="text-xl">{c.name}</h2>
              <p className="text-fg-muted text-sm">
                Najbliższa sesja: {c.next}
              </p>
              <div className="mt-auto flex items-center justify-between gap-3">
                <div className="flex -space-x-1">
                  {c.players.map((p) => (
                    <Avatar key={p} name={p} size="sm" />
                  ))}
                </div>
                <Link
                  href="/makiety/kampania"
                  className={buttonClasses("secondary", "sm")}
                >
                  Otwórz
                  <span className="sr-only"> kampanię {c.name}</span>
                </Link>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
}
