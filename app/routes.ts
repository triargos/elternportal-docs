import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("eltern", "routes/eltern.landing.tsx"),
  route("eltern/*", "routes/eltern.page.tsx"),
  route("verwaltung", "routes/verwaltung.landing.tsx"),
  route("verwaltung/*", "routes/verwaltung.page.tsx"),
  route("api/search/eltern", "routes/api.search.eltern.ts"),
  route("api/search/verwaltung", "routes/api.search.verwaltung.ts"),
] satisfies RouteConfig;
