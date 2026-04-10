import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { RootProvider } from "fumadocs-ui/provider/react-router";
import type { Route } from "./+types/root";
import "./app.css";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <RootProvider>{children}</RootProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "Ein unerwarteter Fehler ist aufgetreten.";

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Fehler";
    details =
      error.status === 404
        ? "Diese Seite wurde nicht gefunden."
        : error.statusText || details;
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">{message}</h1>
        <p className="mt-4 text-fd-muted-foreground">{details}</p>
      </div>
    </main>
  );
}
