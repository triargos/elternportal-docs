import { Link, useLocation } from "react-router";
import { SearchProvider } from "fumadocs-ui/contexts/search";
import DefaultSearchDialog from "fumadocs-ui/components/dialog/search-default";
import { useCallback } from "react";
import { DocsHeader } from "./docs-header";

export interface SectionLandingCard {
  title: string;
  description: string;
  href: string;
}

interface SidebarItem {
  title: string;
  url: string;
}

interface SectionLandingProps {
  section: "eltern" | "verwaltung";
  title: string;
  subtitle: string;
  cards: SectionLandingCard[];
  sidebar: SidebarItem[];
}

function SectionLandingInner({
  title,
  subtitle,
  cards,
  sidebar,
}: Omit<SectionLandingProps, "section">) {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col bg-fd-background text-[15px] leading-relaxed text-fd-foreground">
      <DocsHeader />

      <div className="flex w-full flex-1">
        {sidebar.length > 0 && (
          <aside className="hidden w-[280px] shrink-0 border-r border-fd-border/60 px-5 py-10 md:block">
            <nav className="sticky top-24 flex flex-col gap-0.5">
              {sidebar.map((item) => {
                const active = location.pathname === item.url;
                return (
                  <Link
                    key={item.url}
                    to={item.url}
                    className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                      active
                        ? "bg-fd-muted font-medium text-fd-foreground"
                        : "text-fd-muted-foreground hover:bg-fd-muted/50 hover:text-fd-foreground"
                    }`}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </nav>
          </aside>
        )}

        <main className="min-w-0 flex-1 px-10 pt-20 pb-24 sm:pt-28">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <h1 className="text-4xl font-semibold tracking-tight text-fd-foreground sm:text-5xl">
                {title}
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-fd-muted-foreground">
                {subtitle}
              </p>
            </div>

            <div className="mt-16 grid gap-3 sm:grid-cols-2">
              {cards.map((card) => (
                <Link
                  key={card.href}
                  to={card.href}
                  className="group rounded-lg border border-fd-border bg-fd-card p-5 text-left transition-all hover:border-fd-primary/50 hover:shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <h2 className="text-[15px] font-semibold text-fd-foreground">
                      {card.title}
                    </h2>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="13"
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
                    {card.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export function SectionLanding({ section, ...rest }: SectionLandingProps) {
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
      <SectionLandingInner {...rest} />
    </SearchProvider>
  );
}
