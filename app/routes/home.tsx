import { Link } from "react-router";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "../lib/layout.shared";

export default function HomePage() {
  return (
    <HomeLayout
      {...baseOptions}
      searchToggle={{ enabled: false }}
      links={[
        { text: "Eltern", url: "/eltern" },
        { text: "Verwaltung", url: "/verwaltung" },
      ]}
    >
      <main className="flex flex-1 flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-fd-foreground sm:text-5xl">
          Elternportal Docs
        </h1>
        <p className="mt-4 max-w-lg text-lg text-fd-muted-foreground">
          Wählen Sie Ihren Bereich, um die passende Dokumentation zu finden.
        </p>
        <div className="mt-10 grid w-full max-w-2xl gap-6 sm:grid-cols-2">
          <Link
            to="/eltern"
            className="rounded-xl border border-fd-border bg-fd-card p-8 text-left transition-colors hover:border-fd-primary"
          >
            <h2 className="text-2xl font-semibold text-fd-foreground">
              Eltern
            </h2>
            <p className="mt-2 text-fd-muted-foreground">
              Anleitungen und FAQ für Eltern — wie Sie das Elternportal nutzen
              können.
            </p>
          </Link>
          <Link
            to="/verwaltung"
            className="rounded-xl border border-fd-border bg-fd-card p-8 text-left transition-colors hover:border-fd-primary"
          >
            <h2 className="text-2xl font-semibold text-fd-foreground">
              Verwaltung
            </h2>
            <p className="mt-2 text-fd-muted-foreground">
              Dokumentation für die Schulverwaltung — Konfiguration und
              Administration.
            </p>
          </Link>
        </div>
      </main>
    </HomeLayout>
  );
}
