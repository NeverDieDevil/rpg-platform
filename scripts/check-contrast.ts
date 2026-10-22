/**
 * Kontrola kontrastu WCAG AA dla par tokenów w obu skinach.
 *
 * Czyta src/styles/tokens.css i sprawdza pary zdefiniowane niżej wyłącznie na
 * tokenach zdefiniowanych w bloku danego skinu (brak tokenu = błąd, nie fallback). Kończy się kodem 1, gdy którakolwiek para nie
 * przechodzi albo gdy skin nie definiuje tokenu, którego para wymaga.
 *
 * Progi (WCAG 2.2 AA): 4.5:1 dla tekstu, 3:1 dla elementów interfejsu
 * (krawędzie pól, pierścień fokusu, wskaźniki).
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { THEMES } from "../src/lib/theme";

type Pair = { fg: string; bg: string; min: number; note: string };

const TEXT = 4.5;
const UI = 3;

const pair = (fg: string, bg: string, min: number, note: string): Pair => ({
  fg,
  bg,
  min,
  note,
});

const SURFACES = ["bg", "surface", "surface-raised", "surface-muted"] as const;

const PAIRS: Pair[] = [
  // Tekst na powierzchniach
  ...SURFACES.map((s) => pair("fg", s, TEXT, "tekst podstawowy")),
  ...SURFACES.map((s) => pair("fg-muted", s, TEXT, "tekst drugorzędny")),
  ...SURFACES.map((s) => pair("accent", s, TEXT, "link / tekst akcentu")),
  ...SURFACES.map((s) => pair("highlight", s, TEXT, "tekst wyróżnienia")),
  ...["danger", "success", "warning", "info"].flatMap((c) =>
    SURFACES.map((s) => pair(c, s, TEXT, `tekst statusu ${c}`)),
  ),

  // Tekst na wypełnieniach (przyciski, badge)
  pair("accent-fg", "accent", TEXT, "przycisk główny"),
  pair("accent-fg", "accent-hover", TEXT, "przycisk główny: hover"),
  pair("accent-fg", "accent-active", TEXT, "przycisk główny: active"),
  pair("highlight-fg", "highlight", TEXT, "badge wyróżnienia"),
  pair("danger-fg", "danger", TEXT, "przycisk / badge danger"),
  pair("success-fg", "success", TEXT, "badge success"),
  pair("warning-fg", "warning", TEXT, "badge warning"),
  pair("info-fg", "info", TEXT, "badge info"),

  // Elementy interfejsu i wskaźniki (3:1). Pierścień fokusu ma odstęp (offset)
  // od kontrolki, więc leży zawsze na powierzchni, nie na wypełnieniu akcentu.
  ...["bg", "surface", "surface-raised"].map((s) =>
    pair("border-strong", s, UI, "krawędź kontrolki formularza"),
  ),
  ...SURFACES.map((s) => pair("focus-ring", s, UI, "pierścień fokusu")),
  ...["bg", "surface", "surface-raised"].map((s) =>
    pair("accent", s, UI, "wypełnienie kontrolki (checkbox, aktywna zakładka)"),
  ),

  // Stany nieaktywne: WCAG je wyłącza z wymogu, ale tekst ma być czytelny.
  pair("fg-disabled", "bg-disabled", UI, "kontrolka disabled (informacyjnie)"),
];

function parseBlocks(css: string): Map<string, Map<string, string>> {
  const clean = css.replace(/\/\*[\s\S]*?\*\//g, "");
  const blocks = new Map<string, Map<string, string>>();
  const re = /([^{}]+)\{([^{}]*)\}/g;
  for (const m of clean.matchAll(re)) {
    const vars = new Map<string, string>();
    for (const d of m[2].matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
      vars.set(d[1], d[2].trim());
    }
    for (const sel of m[1].split(",").map((s) => s.trim())) {
      const existing = blocks.get(sel) ?? new Map<string, string>();
      for (const [k, v] of vars) existing.set(k, v);
      blocks.set(sel, existing);
    }
  }
  return blocks;
}

function parseColor(value: string): [number, number, number] | null {
  const hex = value.match(/^#([0-9a-f]{6})$/i);
  if (hex) {
    const n = parseInt(hex[1], 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  return null;
}

function luminance([r, g, b]: [number, number, number]): number {
  const lin = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function ratio(a: [number, number, number], b: [number, number, number]) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const css = readFileSync(resolve("src/styles/tokens.css"), "utf8");
const blocks = parseBlocks(css);

let failures = 0;
let checked = 0;

for (const theme of THEMES) {
  const own = blocks.get(`[data-theme="${theme}"]`);
  if (!own) {
    console.error(`✗ brak bloku [data-theme="${theme}"] w tokens.css`);
    failures++;
    continue;
  }
  console.log(`\nSkin: ${theme}`);

  for (const p of PAIRS) {
    const fgRaw = own.get(`--rpg-color-${p.fg}`);
    const bgRaw = own.get(`--rpg-color-${p.bg}`);
    const fg = fgRaw ? parseColor(fgRaw) : null;
    const bg = bgRaw ? parseColor(bgRaw) : null;
    if (!fg || !bg) {
      console.error(
        `  ✗ ${p.fg} / ${p.bg}: token nie jest zdefiniowany jako #rrggbb (${p.note})`,
      );
      failures++;
      continue;
    }
    checked++;
    const r = ratio(fg, bg);
    if (r + 1e-9 < p.min) {
      console.error(
        `  ✗ ${p.fg} / ${p.bg}: ${r.toFixed(2)}:1, wymagane ${p.min}:1 (${p.note})`,
      );
      failures++;
    }
  }
}

console.log(
  `\nSprawdzono ${checked} par w ${THEMES.length} skinach. ` +
    (failures ? `Błędy: ${failures}.` : "Wszystkie przechodzą WCAG AA."),
);
process.exit(failures ? 1 : 0);
