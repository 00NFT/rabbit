import type { LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { json, Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from "@remix-run/react";
import "../style/fonts.css";
import "../style/global.css";
import { QueryProvider } from "./providers/query-provider";
import { PreventExternalBrowser } from "./components/common/prevent-external-browser";
import { useEffect } from "react";

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

export const loader: LoaderFunction = ({ request }) => {
  const userAgent = request.headers.get("user-agent");
  const isKakao = userAgent?.includes("KAKAO");
  const isInstagram = userAgent?.includes("Instagram");
  const isRestrictedBrowser = isKakao || isInstagram;

  return json({ isRestrictedBrowser, platform: { isKakao, isInstagram } });
};

export function Layout({ children }: { children: React.ReactNode }) {
  const { isRestrictedBrowser, platform } = useLoaderData<typeof loader>();

  useEffect(() => {
    if (platform.isKakao) {
      const URL = window.location.href;
      window.open(`kakaotalk://web/openExternal?url=${encodeURIComponent(URL)}`);
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        <link rel="icon" href="/favicon.svg" type="image/x-icon" />
        <Meta />
        <Links />
      </head>
      <body>
        <QueryProvider>{isRestrictedBrowser ? <PreventExternalBrowser /> : children}</QueryProvider>
        <ScrollRestoration />
        <Scripts />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7338574251336623" crossOrigin="anonymous" />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
