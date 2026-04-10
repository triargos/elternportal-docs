import { SectionLanding } from "../components/section-landing";
import { verwaltungSource, getSidebar } from "../lib/source.server";
import type { Route } from "./+types/verwaltung.landing";

const cards = [
  {
    title: "Änderungsanträge",
    description: "Stammdatenänderungen von Eltern prüfen und bearbeiten",
    href: "/verwaltung/aenderungsantraege",
  },
  {
    title: "Organisation",
    description: "Mitglieder, Branding und Datenquelle verwalten",
    href: "/verwaltung/organisation",
  },
  {
    title: "Online-Anmeldung",
    description: "Anmeldeformulare erstellen und konfigurieren",
    href: "/verwaltung/online-anmeldung",
  },
  {
    title: "Einsendungen",
    description: "Eingegangene Anmeldungen bearbeiten und verwalten",
    href: "/verwaltung/einsendungen",
  },
  {
    title: "Dokumente",
    description: "Uploads prüfen und Dateien synchronisieren",
    href: "/verwaltung/dokumente",
  },
  {
    title: "Einstellungen",
    description:
      "Benachrichtigungen, Abwesenheiten, Rollen und mehr konfigurieren",
    href: "/verwaltung/einstellungen",
  },
];

export async function loader(_: Route.LoaderArgs) {
  return { sidebar: getSidebar(verwaltungSource) };
}

export default function VerwaltungLanding({
  loaderData,
}: Route.ComponentProps) {
  return (
    <SectionLanding
      section="verwaltung"
      title="Für die Verwaltung"
      subtitle="Dokumentation für die Schulverwaltung — Konfiguration und Administration des Elternportals."
      cards={cards}
      sidebar={loaderData.sidebar}
    />
  );
}
