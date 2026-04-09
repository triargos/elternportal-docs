import path from "node:path";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import fumadocs from "fumadocs-mdx/vite";
import { eltern, verwaltung } from "./source.config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "."),
    },
  },
  plugins: [
    tailwindcss(),
    fumadocs({ eltern, verwaltung }),
    reactRouter(),
  ],
});
