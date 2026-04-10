import { SectionLanding } from "../components/section-landing";
import { elternSource, getSidebar } from "../lib/source.server";
import type { Route } from "./+types/eltern.landing";

const cards = [
  {
    title: "Anmeldung & Sicherheit",
    description: "Login, Passwort, 2FA und Profileinstellungen",
    href: "/eltern/anmeldung",
  },
  {
    title: "Meine Familie",
    description: "Stammdaten Ihrer Familie einsehen und Änderungen beantragen",
    href: "/eltern/familie",
  },
  {
    title: "Meine Adresse",
    description: "Adresse verwalten und Umzüge melden",
    href: "/eltern/adresse",
  },
  {
    title: "Dokumente & Uploads",
    description: "Dokumente einsehen und an die Schule übermitteln",
    href: "/eltern/dokumente",
  },
  {
    title: "Online-Anmeldung",
    description: "Ihr Kind für Angebote oder an der Schule anmelden",
    href: "/eltern/online-anmeldung",
  },
  {
    title: "Häufige Fragen",
    description: "Antworten auf die häufigsten Fragen zum Elternportal",
    href: "/eltern/faq",
  },
];

export async function loader(_: Route.LoaderArgs) {
  return { sidebar: getSidebar(elternSource) };
}

export default function ElternLanding({ loaderData }: Route.ComponentProps) {
  return (
    <SectionLanding
      section="eltern"
      title="Für Eltern"
      subtitle="Anleitungen und FAQ für Eltern — alles was Sie über das Elternportal wissen müssen."
      cards={cards}
      sidebar={loaderData.sidebar}
    />
  );
}
