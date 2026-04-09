import { Link, useLocation } from "react-router";
import {
  SearchProvider,
  useSearchContext,
} from "fumadocs-ui/contexts/search";
import DefaultSearchDialog from "fumadocs-ui/components/dialog/search-default";
import { useCallback } from "react";

interface SidebarItem {
  title: string;
  url: string;
}

interface DocsContentProps {
  title: string;
  description: string;
  html: string;
  sidebar: SidebarItem[];
  section: "eltern" | "verwaltung";
}

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
      className="flex items-center gap-2 rounded-md border border-fd-border bg-fd-secondary/50 px-3 py-1.5 text-sm text-fd-muted-foreground transition-colors hover:bg-fd-secondary"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
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
      Suche...
      <kbd className="ml-2 hidden rounded bg-fd-muted px-1.5 py-0.5 text-xs sm:inline-block">
        ⌘K
      </kbd>
    </button>
  );
}

function DocsContentInner({
  title,
  description,
  html,
  sidebar,
}: Omit<DocsContentProps, "section">) {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col bg-fd-background">
      <header className="sticky top-0 z-10 border-b border-fd-border bg-fd-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <Link to="/" className="text-lg font-semibold text-fd-foreground">
            Elternportal Docs
          </Link>
          <SearchButton />
        </div>
        <div className="mx-auto max-w-7xl px-6">
          <nav className="flex gap-4">
            {tabs.map((tab) => (
              <Link
                key={tab.href}
                to={tab.href}
                className={`border-b-2 px-1 pb-2 text-sm font-medium transition-colors ${
                  location.pathname.startsWith(tab.href)
                    ? "border-fd-primary text-fd-primary"
                    : "border-transparent text-fd-muted-foreground hover:text-fd-foreground"
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-8 px-6 py-8">
        {sidebar.length > 0 && (
          <aside className="hidden w-56 shrink-0 md:block">
            <nav className="sticky top-24 space-y-1">
              {sidebar.map((item) => (
                <Link
                  key={item.url}
                  to={item.url}
                  className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                    location.pathname === item.url
                      ? "bg-fd-primary/10 font-medium text-fd-primary"
                      : "text-fd-muted-foreground hover:text-fd-foreground"
                  }`}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </aside>
        )}

        <article className="prose dark:prose-invert min-w-0 max-w-none flex-1">
          <h1>{title}</h1>
          {description && (
            <p className="text-lg text-fd-muted-foreground">{description}</p>
          )}
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </article>
      </div>
    </div>
  );
}

export function DocsContent({
  section,
  ...rest
}: DocsContentProps) {
  const SearchDialog = useCallback(
    (props: { open: boolean; onOpenChange: (open: boolean) => void }) => (
      <DefaultSearchDialog
        {...props}
        api={`/api/search/${section}`}
        type="fetch"
      />
    ),
    [section],
  );

  return (
    <SearchProvider SearchDialog={SearchDialog}>
      <DocsContentInner {...rest} />
    </SearchProvider>
  );
}
