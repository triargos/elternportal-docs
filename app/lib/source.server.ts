import { renderToString } from "react-dom/server";
import { createElement } from "react";
import { loader } from "fumadocs-core/source";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { eltern, verwaltung } from "@/.source/server";

export const elternSource = loader({
  source: eltern.toFumadocsSource(),
  baseUrl: "/eltern",
});

export const verwaltungSource = loader({
  source: verwaltung.toFumadocsSource(),
  baseUrl: "/verwaltung",
});

interface SidebarItem {
  title: string;
  url: string;
}

function extractSidebarItems(
  nodes: Array<{
    type: string;
    name: unknown;
    url?: string;
    children?: unknown[];
  }>,
): SidebarItem[] {
  const items: SidebarItem[] = [];
  for (const node of nodes) {
    if (node.type === "page" && node.url) {
      items.push({ title: String(node.name), url: node.url });
    }
    if (node.type === "folder" && Array.isArray(node.children)) {
      items.push(
        ...extractSidebarItems(
          node.children as Array<{
            type: string;
            name: unknown;
            url?: string;
            children?: unknown[];
          }>,
        ),
      );
    }
  }
  return items;
}

export async function loadDocsPage(
  source: ReturnType<typeof loader>,
  slugs: string[],
) {
  const page = source.getPage(slugs);
  if (!page) return null;

  const loaded = await page.data.load();
  const MDX = loaded.body;
  const html = renderToString(
    createElement(MDX, { components: { ...defaultMdxComponents } }),
  );

  const sidebar = extractSidebarItems(
    source.pageTree.children as Array<{
      type: string;
      name: unknown;
      url?: string;
      children?: unknown[];
    }>,
  );

  return {
    title: page.data.title,
    description: page.data.description ?? "",
    html,
    sidebar,
  };
}
