import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Nadpisuje domyślne ignores z eslint-config-next.
  globalIgnores([
    // Domyślne ignores eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Wyniki budowania i generowane pliki — nie nasz kod.
    ".open-next/**",
    ".wrangler/**",
    "drizzle/**",
  ]),
]);

export default eslintConfig;
