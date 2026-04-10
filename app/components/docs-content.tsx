import { Link, useLocation } from "react-router";
import { SearchProvider } from "fumadocs-ui/contexts/search";
import DefaultSearchDialog from "fumadocs-ui/components/dialog/search-default";
import { useCallback } from "react";
import { DocsHeader } from "./docs-header";

interface SidebarItem {
  title: string;
  url: string;
}

interface DocsContentProps {
  html: string;
  sidebar: SidebarItem[];
  section: "eltern" | "verwaltung";
}

function DocsContentInner({
  html,
  sidebar,
}: Omit<DocsContentProps, "section">) {
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

        <article className="prose prose-neutral dark:prose-invert mx-auto min-w-0 max-w-[760px] flex-1 px-10 py-12 prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-fd-foreground prose-h1:text-3xl prose-h1:mb-2 prose-h1:text-center prose-h2:text-xl prose-h2:mt-12 prose-h2:mb-3 prose-h3:text-base prose-h3:mt-8 prose-p:text-fd-muted-foreground prose-p:leading-7 prose-li:text-fd-muted-foreground prose-li:leading-7 prose-strong:text-fd-foreground prose-strong:font-medium prose-a:text-fd-foreground prose-a:no-underline hover:prose-a:underline prose-code:text-fd-foreground prose-code:font-normal prose-code:before:content-none prose-code:after:content-none [&_h1_a]:text-fd-foreground [&_h2_a]:text-fd-foreground [&_h3_a]:text-fd-foreground [&_h4_a]:text-fd-foreground [&_h5_a]:text-fd-foreground [&_h6_a]:text-fd-foreground [&_h1_a]:no-underline [&_h2_a]:no-underline [&_h3_a]:no-underline [&_h4_a]:no-underline">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </article>
      </div>
    </div>
  );
}

export function DocsContent({ section, ...rest }: DocsContentProps) {
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
