import { defineDocs, defineConfig } from "fumadocs-mdx/config";

export const eltern = defineDocs({
  dir: "content/eltern",
  docs: {
    async: true,
  },
});

export const verwaltung = defineDocs({
  dir: "content/verwaltung",
  docs: {
    async: true,
  },
});

export default defineConfig();
