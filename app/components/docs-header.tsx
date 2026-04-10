import { Link, useLocation } from "react-router";
import { useSearchContext } from "fumadocs-ui/contexts/search";

const tabs = [
  { label: "Eltern", href: "/eltern" },
  { label: "Verwaltung", href: "/verwaltung" },
];

function SearchButton() {
  const { setOpenSearch } = useSearchContext();

  return (
    <button
      type="button"
      onClick={() => setOpenSearch(true)}
      className="flex h-8 items-center gap-2 rounded-md border border-fd-border bg-fd-background px-2.5 text-[13px] text-fd-muted-foreground transition-colors hover:bg-fd-muted/50"
    >
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
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <span>Suche</span>
      <kbd className="ml-6 hidden rounded border border-fd-border bg-fd-muted/50 px-1.5 font-mono text-[11px] text-fd-muted-foreground sm:inline-block">
        ⌘K
      </kbd>
    </button>
  );
}

export function DocsHeader() {
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
        <SearchButton />
      </div>
    </header>
  );
}
