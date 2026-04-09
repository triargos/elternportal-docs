import { elternSource, loadDocsPage } from "../lib/source.server";
import { DocsContent } from "../components/docs-content";
import type { Route } from "./+types/eltern.page";

export async function loader({ params }: Route.LoaderArgs) {
  const slug = params["*"] ?? "";
  const slugs = slug ? slug.split("/") : [];

  const page = await loadDocsPage(elternSource, slugs);
  if (!page) throw new Response("Not Found", { status: 404 });

  return { ...page, section: "eltern" as const };
}

export default function ElternDocsPage({ loaderData }: Route.ComponentProps) {
  return <DocsContent {...loaderData} />;
}
