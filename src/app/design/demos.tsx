"use client";

import { Info } from "lucide-react";
import { useState } from "react";

import { Button, Modal, Tabs, Tooltip, useToast } from "@/components/ui";

export function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Otwórz modal
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Usunąć kampanię?"
        description="Tej operacji nie można cofnąć. Sesje i notatki zostaną usunięte."
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Anuluj
            </Button>
            <Button variant="danger" onClick={() => setOpen(false)}>
              Usuń
            </Button>
          </>
        }
      >
        <p>
          Focus jest uwięziony w oknie, Esc zamyka, a po zamknięciu focus wraca
          na przycisk, który je otworzył.
        </p>
      </Modal>
    </>
  );
}

export function ToastDemo() {
  const { toast } = useToast();
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="secondary"
        onClick={() => toast({ variant: "success", title: "Zapisano zmiany" })}
      >
        Sukces
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast({
            variant: "info",
            title: "Nowa sesja",
            description:
              "Piątek, 19:00 — pokój otwiera się 15 minut wcześniej.",
          })
        }
      >
        Info
      </Button>
      <Button
        variant="secondary"
        onClick={() => toast({ variant: "warning", title: "Wolne połączenie" })}
      >
        Ostrzeżenie
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast({
            variant: "danger",
            title: "Nie udało się wysłać wiadomości",
            description: "Spróbuj ponownie za chwilę.",
          })
        }
      >
        Błąd
      </Button>
    </div>
  );
}

export function TooltipDemo() {
  return (
    <Tooltip text="Rzut k20 z modyfikatorem +5">
      <Button variant="secondary" aria-label="Informacje o rzucie">
        <Info aria-hidden="true" className="size-4" />
        Najedź lub zfokusuj
      </Button>
    </Tooltip>
  );
}

export function TabsDemo() {
  return (
    <Tabs
      label="Przykładowe zakładki"
      tabs={[
        { id: "a", label: "Sesje", content: <p>Lista sesji kampanii.</p> },
        {
          id: "b",
          label: "Postacie",
          content: <p>Drużyna i postacie niezależne.</p>,
        },
        {
          id: "c",
          label: "Notatki MG",
          content: <p>Widoczne tylko dla mistrza gry.</p>,
        },
      ]}
    />
  );
}

export function LoadingButtonDemo() {
  return (
    <Button loading variant="primary">
      Zapisywanie
    </Button>
  );
}
