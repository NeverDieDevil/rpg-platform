export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-4 px-6 py-16">
      <h1 className="font-display text-3xl font-semibold">Platforma RPG</h1>
      <p className="text-fg-muted">
        Szkielet aplikacji (Faza 0). Funkcje produktowe dochodzą w kolejnych
        fazach.
      </p>
      <p className="text-fg-muted text-sm">
        Stan połączenia z bazą:{" "}
        <a className="text-accent underline" href="/api/health/db">
          /api/health/db
        </a>
      </p>
    </main>
  );
}
