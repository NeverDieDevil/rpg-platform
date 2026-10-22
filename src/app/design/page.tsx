import type { Metadata } from "next";
import type { ReactNode } from "react";

import { PageTitle, SiteShell } from "@/components/site-shell";
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardHeader,
  Checkbox,
  EmptyState,
  ErrorState,
  FieldGroup,
  LoadingState,
  Radio,
  SelectField,
  Skeleton,
  SkeletonText,
  Table,
  TBody,
  Td,
  TextField,
  TextareaField,
  Th,
  THead,
  Tr,
} from "@/components/ui";

import {
  LoadingButtonDemo,
  ModalDemo,
  TabsDemo,
  ToastDemo,
  TooltipDemo,
} from "./demos";

export const metadata: Metadata = { title: "Design system — Platforma RPG" };

const COLOR_GROUPS: Array<{
  title: string;
  tokens: Array<{ name: string; role: string }>;
}> = [
  {
    title: "Powierzchnie",
    tokens: [
      { name: "bg", role: "tło strony" },
      { name: "surface", role: "panele, karty" },
      { name: "surface-raised", role: "pola, modale, popovery" },
      { name: "surface-muted", role: "nagłówki tabel, hover, tło badge" },
    ],
  },
  {
    title: "Tekst i krawędzie",
    tokens: [
      { name: "fg", role: "tekst podstawowy" },
      { name: "fg-muted", role: "tekst drugorzędny" },
      { name: "border", role: "dekoracyjne obramowania" },
      { name: "border-strong", role: "krawędź kontrolek (3:1)" },
    ],
  },
  {
    title: "Akcenty",
    tokens: [
      { name: "accent", role: "przycisk główny, linki" },
      { name: "accent-hover", role: "stan hover" },
      { name: "accent-active", role: "stan active" },
      { name: "highlight", role: "wyróżnienie: tura, nowość" },
    ],
  },
  {
    title: "Statusy",
    tokens: [
      { name: "danger", role: "błąd, akcja destrukcyjna" },
      { name: "success", role: "powodzenie" },
      { name: "warning", role: "ostrzeżenie" },
      { name: "info", role: "informacja" },
    ],
  },
];

const TEXT_SCALE = [
  ["4xl", "text-4xl", "Nagłówek strony"],
  ["3xl", "text-3xl", "Nagłówek sekcji"],
  ["2xl", "text-2xl", "Podtytuł"],
  ["xl", "text-xl", "Tytuł karty / modala"],
  ["lg", "text-lg", "Tekst wyróżniony"],
  ["base", "text-base", "Tekst podstawowy — treść, pola formularzy"],
  ["sm", "text-sm", "Tekst pomocniczy, opisy pól, tabele"],
  ["xs", "text-xs", "Etykiety, badge"],
] as const;

const SPACING = [1, 2, 3, 4, 6, 8, 12, 16];

function Section({
  id,
  title,
  lead,
  children,
}: {
  id: string;
  title: string;
  lead?: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="mb-12">
      <h2 id={id} className="mb-1 text-2xl">
        {title}
      </h2>
      {lead ? <p className="text-fg-muted mb-4 max-w-prose">{lead}</p> : null}
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Swatch({ name, role }: { name: string; role: string }) {
  return (
    <li className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className="border-border-strong size-12 shrink-0 rounded-md border"
        style={{ backgroundColor: `var(--rpg-color-${name})` }}
      />
      <span className="min-w-0">
        <code className="block text-sm break-all">--rpg-color-{name}</code>
        <span className="text-fg-muted text-sm">{role}</span>
      </span>
    </li>
  );
}

function Demo({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card>
      <CardHeader title={title} />
      {children}
    </Card>
  );
}

export default function DesignPage() {
  return (
    <SiteShell>
      <PageTitle
        title="Design system"
        lead="Tokeny i komponenty obu motywów na jednej stronie. Przełącznik w nagłówku zmienia skin całej aplikacji — komponenty zostają te same, zmieniają się tylko wartości tokenów."
      />

      <Section
        id="kolory"
        title="Kolory"
        lead="Tokeny mają nazwy ról, nie kolorów. Skin podmienia wartości. Każda para tekst/tło jest sprawdzana pod WCAG AA przez npm run check:contrast."
      >
        <div className="grid gap-6 sm:grid-cols-2">
          {COLOR_GROUPS.map((g) => (
            <Card key={g.title}>
              <CardHeader title={g.title} />
              <ul className="space-y-3">
                {g.tokens.map((t) => (
                  <Swatch key={t.name} {...t} />
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        id="typografia"
        title="Typografia"
        lead="Nagłówki: czcionka display skinu (Cinzel / Chakra Petch). Treść: Crimson Pro / Space Grotesk. Mono: JetBrains Mono (rzuty, wartości)."
      >
        <Card>
          <ul className="space-y-3">
            {TEXT_SCALE.map(([name, cls, sample]) => (
              <li
                key={name}
                className="border-border flex flex-wrap items-baseline gap-x-4 border-b pb-3 last:border-0 last:pb-0"
              >
                <code className="text-fg-muted w-14 shrink-0 text-sm">
                  {name}
                </code>
                <span
                  className={`${cls} ${name === "base" || name === "sm" || name === "xs" ? "" : "font-display"}`}
                >
                  {sample}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-mono text-sm">
            2k20 + 5 = <strong>23</strong> · żółwik zażółć gęślą jaźń
          </p>
        </Card>
      </Section>

      <Section
        id="ksztalt"
        title="Odstępy, promienie, cienie"
        lead="Odstępy: skala Tailwinda w kroku 4 px (spacing × 4 px). Promienie i cienie zmienia skin."
      >
        <div className="grid gap-6 md:grid-cols-3">
          <Demo title="Odstępy">
            <ul className="space-y-1.5">
              {SPACING.map((n) => (
                <li key={n} className="flex items-center gap-3 text-sm">
                  <code className="text-fg-muted w-16">
                    {n} · {n * 4}px
                  </code>
                  <span
                    aria-hidden="true"
                    className="bg-accent h-3"
                    style={{ width: `calc(var(--spacing) * ${n})` }}
                  />
                </li>
              ))}
            </ul>
          </Demo>
          <Demo title="Promienie">
            <div className="flex gap-3">
              {(["sm", "md", "lg"] as const).map((r) => (
                <div key={r} className="text-center text-sm">
                  <div
                    className="border-border-strong bg-surface-muted size-16 border"
                    style={{ borderRadius: `var(--rpg-radius-${r})` }}
                  />
                  <code>{r}</code>
                </div>
              ))}
            </div>
          </Demo>
          <Demo title="Cienie">
            <div className="flex gap-4">
              {(["sm", "md", "lg"] as const).map((s) => (
                <div key={s} className="text-center text-sm">
                  <div
                    className="bg-surface-raised size-16 rounded-md"
                    style={{ boxShadow: `var(--rpg-shadow-${s})` }}
                  />
                  <code>{s}</code>
                </div>
              ))}
            </div>
          </Demo>
        </div>
      </Section>

      <Section
        id="przyciski"
        title="Przyciski"
        lead="Stany: domyślny, hover, active (naciśnięty), focus (klawiatura), disabled, loading."
      >
        <Card className="space-y-6">
          {(["primary", "secondary", "ghost", "danger"] as const).map((v) => (
            <div key={v} className="flex flex-wrap items-center gap-3">
              <code className="text-fg-muted w-24 text-sm">{v}</code>
              <Button variant={v}>Zapisz</Button>
              <Button variant={v} disabled>
                Nieaktywny
              </Button>
              <Button variant={v} size="sm">
                Mały
              </Button>
              <Button variant={v} size="lg">
                Duży
              </Button>
            </div>
          ))}
          <div className="flex flex-wrap items-center gap-3">
            <code className="text-fg-muted w-24 text-sm">loading</code>
            <LoadingButtonDemo />
          </div>
        </Card>
      </Section>

      <Section
        id="formularze"
        title="Formularze"
        lead="Etykieta zawsze widoczna i powiązana z polem; błąd opisany tekstem (nie tylko kolorem) i ustawia aria-invalid."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="space-y-4">
            <TextField
              label="Nazwa kampanii"
              placeholder="np. Popioły Marchii"
              hint="Widoczna dla wszystkich graczy."
            />
            <TextField
              label="Adres e-mail"
              type="email"
              defaultValue="gracz@"
              error="Podaj poprawny adres e-mail."
            />
            <TextField
              label="Kod zaproszenia"
              disabled
              defaultValue="ABCD-1234"
            />
            <SelectField label="System" defaultValue="fantasy">
              <option value="fantasy">Fantasy (skin fantasy)</option>
              <option value="cyber">Cyberpunk (skin neon)</option>
            </SelectField>
            <TextareaField
              label="Opis"
              placeholder="Krótko o kampanii…"
              hint="Do 500 znaków."
            />
          </Card>
          <Card className="space-y-6">
            <FieldGroup legend="Widoczność kampanii">
              <Radio
                name="vis"
                label="Prywatna"
                hint="Tylko zaproszeni."
                defaultChecked
              />
              <Radio
                name="vis"
                label="Z linkiem"
                hint="Każdy z linkiem może dołączyć."
              />
              <Radio name="vis" label="Niedostępna" disabled />
            </FieldGroup>
            <FieldGroup legend="Powiadomienia">
              <Checkbox label="Przypomnij o sesji" defaultChecked />
              <Checkbox label="Wiadomości na czacie" />
              <Checkbox label="Newsy RPG" disabled />
            </FieldGroup>
          </Card>
        </div>
      </Section>

      <Section id="dane" title="Dane: badge, awatar, tabela">
        <div className="grid gap-6">
          <Card className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge>Neutralny</Badge>
              <Badge variant="accent">Akcent</Badge>
              <Badge variant="highlight">Twoja tura</Badge>
              <Badge variant="success">Aktywna</Badge>
              <Badge variant="warning">Wstrzymana</Badge>
              <Badge variant="danger">Błąd</Badge>
              <Badge variant="info">Info</Badge>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Avatar name="Aria Wen" size="sm" online />
              <Avatar name="Borys Kowal" online={false} />
              <Avatar name="Cela" size="lg" online />
            </div>
          </Card>
          <Table caption="Przykładowa tabela uczestników">
            <THead>
              <Tr>
                <Th>Gracz</Th>
                <Th>Postać</Th>
                <Th>Rola</Th>
                <Th>Status</Th>
              </Tr>
            </THead>
            <TBody>
              <Tr>
                <Td>Aria Wen</Td>
                <Td>Kaelith</Td>
                <Td>Mistrz gry</Td>
                <Td>
                  <Badge variant="success">Online</Badge>
                </Td>
              </Tr>
              <Tr>
                <Td>Borys Kowal</Td>
                <Td>Brunhilda</Td>
                <Td>Gracz</Td>
                <Td>
                  <Badge>Offline</Badge>
                </Td>
              </Tr>
            </TBody>
          </Table>
        </div>
      </Section>

      <Section
        id="interakcje"
        title="Interakcje: zakładki, modal, tooltip, toast"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Demo title="Zakładki (strzałki, Home/End)">
            <TabsDemo />
          </Demo>
          <Demo title="Modal (Esc, trap focusu)">
            <ModalDemo />
          </Demo>
          <Demo title="Tooltip (hover, focus, Esc)">
            <TooltipDemo />
          </Demo>
          <Demo title="Toast (aria-live)">
            <ToastDemo />
          </Demo>
        </div>
      </Section>

      <Section
        id="stany"
        title="Stany: ładowanie, pusty, błąd"
        lead="Każdy ekran danych ma trzy stany poza „happy path”."
      >
        <div className="grid gap-6 md:grid-cols-3">
          <Demo title="Ładowanie (skeleton)">
            <LoadingState label="Ładowanie listy kampanii…">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="size-10 rounded-full" />
                  <Skeleton className="h-5 w-1/2" />
                </div>
                <SkeletonText lines={3} />
              </div>
            </LoadingState>
          </Demo>
          <EmptyState
            title="Brak kampanii"
            description="Załóż pierwszą kampanię albo poproś mistrza gry o link z zaproszeniem."
            action={<Button>Utwórz kampanię</Button>}
          />
          <ErrorState
            title="Nie udało się wczytać"
            description="Sprawdź połączenie i spróbuj ponownie."
            action={<Button variant="secondary">Spróbuj ponownie</Button>}
          />
        </div>
      </Section>
    </SiteShell>
  );
}
