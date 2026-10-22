import type { Metadata } from "next";

import { Button, Card } from "@/components/ui";

export const metadata: Metadata = { title: "Logowanie — makieta" };

export default function LoginMock() {
  return (
    <div className="mx-auto max-w-md py-8">
      <Card raised className="space-y-6 p-8 text-center">
        <div>
          <h1 className="text-3xl">Zaloguj się</h1>
          <p className="text-fg-muted mt-2">
            Wejdź do swoich kampanii i postaci. Nie ma osobnego hasła do
            platformy — logujesz się kontem zewnętrznym.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Button variant="primary" size="lg">
            Kontynuuj przez Google
          </Button>
          <Button variant="secondary" size="lg">
            Kontynuuj przez Discord
          </Button>
        </div>
        <p className="text-fg-muted text-sm">
          Logując się, akceptujesz zasady korzystania z platformy.
        </p>
      </Card>
    </div>
  );
}
