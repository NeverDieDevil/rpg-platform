import type { NextConfig } from "next";

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  // `cacheComponents` i `partialPrefetching` z szablonu są wyłączone:
  // wymagają cache'u inkrementalnego, którego OpenNext nie ma bez KV
  // (patrz open-next.config.ts). Wracamy do nich, gdy dołożymy KV.
  turbopack: {
    // Jawny katalog główny. Bez tego Turbopack szuka lockfile'a w górę drzewa
    // i potrafi wybrać katalog domowy użytkownika.
    root: import.meta.dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

// Udostępnia bindingi i sekrety Cloudflare w `next dev`,
// żeby lokalny dev działał tak samo jak Worker.
void initOpenNextCloudflareForDev();

export default nextConfig;
