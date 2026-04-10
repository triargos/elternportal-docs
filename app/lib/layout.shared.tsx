import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import type { LayoutTab } from "fumadocs-ui/layouts/shared";

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: "Elternportal Docs",
    url: "/",
  },
};

export const tabs: LayoutTab[] = [
  {
    title: "Eltern",
    url: "/eltern",
    urls: new Set(["/eltern"]),
  },
  {
    title: "Verwaltung",
    url: "/verwaltung",
    urls: new Set(["/verwaltung"]),
  },
];
