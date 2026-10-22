import Link from "next/link";

import { PageTitle, SiteShell } from "@/components/site-shell";
import { buttonClasses } from "@/components/ui";

export default function HomePage() {
  return (
    <SiteShell>
      <PageTitle
        title="Platforma RPG"
        lead="Narzędzie do prowadzenia sesji RPG: kampanie, postacie i pokój sesji na żywo. Poniżej wejścia do widoków poglądowych Fazy 1."
      />
      <div className="flex flex-wrap gap-3">
        <Link href="/design" className={buttonClasses("primary", "lg")}>
          Design system
        </Link>
        <Link href="/makiety" className={buttonClasses("secondary", "lg")}>
          Makiety ekranów
        </Link>
      </div>
      <p className="text-fg-muted mt-8 text-sm">
        Stan połączenia z bazą:{" "}
        <a className="text-accent underline" href="/api/health/db">
          /api/health/db
        </a>
      </p>
    </SiteShell>
  );
}
