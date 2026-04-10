import { createFromSource } from "fumadocs-core/search/server";
import { verwaltungSource } from "../lib/source.server";

const searchAPI = createFromSource(verwaltungSource);

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const query = url.searchParams.get("query") ?? "";

  const results = await searchAPI.search(query);
  return Response.json(results);
}
