import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import "../style/fonts.css";
import "../style/global.css";
import { QueryProvider } from "./providers/query-provider";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
];

export const meta: MetaFunction = () => {
  return [
    { property: "og:title", content: "새해맞이 달토끼 구출 대작전" },
    { property: "og:description", content: "틀린 그림찾기로 달토끼를 구해줘!" },
    { property: "og:image", content: "/images/og/og.png" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        <Meta />
        <Links />
      </head>
      <body>
        <QueryProvider>{children}</QueryProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
