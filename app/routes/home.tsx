import { Link, useLocation } from "react-router";

const tabs = [
  { label: "Eltern", href: "/eltern" },
  { label: "Verwaltung", href: "/verwaltung" },
];

function Header() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-10 border-b border-fd-border/60 bg-fd-background/85 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="text-[15px] font-semibold tracking-tight text-fd-foreground"
          >
            Elternportal Docs
          </Link>
          <nav className="flex items-center gap-1">
            {tabs.map((tab) => {
              const active = location.pathname.startsWith(tab.href);
              return (
                <Link
                  key={tab.href}
                  to={tab.href}
                  className={`rounded-md px-2.5 py-1 text-[13px] font-medium transition-colors ${
                    active
                      ? "bg-fd-muted text-fd-foreground"
                      : "text-fd-muted-foreground hover:bg-fd-muted/50 hover:text-fd-foreground"
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-fd-background text-[15px] leading-relaxed text-fd-foreground">
      <Header />
      <main className="flex flex-1 flex-col items-center px-6 pt-28 sm:pt-40">
        <div className="mx-auto w-full max-w-2xl text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-fd-foreground sm:text-5xl">
            Elternportal Docs
          </h1>
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-fd-muted-foreground">
            Wählen Sie Ihren Bereich, um die passende Dokumentation zu finden.
          </p>
        </div>

        <div className="mt-14 grid w-full max-w-3xl gap-3 sm:grid-cols-2">
          <Link
            to="/eltern"
            className="group rounded-lg border border-fd-border bg-fd-card p-6 text-left transition-all hover:border-fd-primary/50 hover:shadow-sm"
          >
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-fd-foreground">
                Für Eltern
              </h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-fd-muted-foreground transition-transform group-hover:translate-x-0.5"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-fd-muted-foreground">
              Anleitungen und FAQ für Eltern — wie Sie das Elternportal nutzen
              können.
            </p>
          </Link>
          <Link
            to="/verwaltung"
            className="group rounded-lg border border-fd-border bg-fd-card p-6 text-left transition-all hover:border-fd-primary/50 hover:shadow-sm"
          >
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-fd-foreground">
                Für die Verwaltung
              </h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-fd-muted-foreground transition-transform group-hover:translate-x-0.5"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-fd-muted-foreground">
              Dokumentation für die Schulverwaltung — Konfiguration und
              Administration.
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
}
