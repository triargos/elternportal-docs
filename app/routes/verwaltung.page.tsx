import { verwaltungSource, loadDocsPage } from "../lib/source.server";
import { DocsContent } from "../components/docs-content";
import type { Route } from "./+types/verwaltung.page";

export async function loader({ params }: Route.LoaderArgs) {
  const slug = params["*"] ?? "";
  const slugs = slug ? slug.split("/") : [];

  const page = await loadDocsPage(verwaltungSource, slugs);
  if (!page) throw new Response("Not Found", { status: 404 });

  return { ...page, section: "verwaltung" as const };
}

export default function VerwaltungDocsPage({
  loaderData,
}: Route.ComponentProps) {
  return <DocsContent {...loaderData} />;
}
