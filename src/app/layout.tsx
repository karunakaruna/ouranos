import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import SessionProvider from "./providers/session";
import { getSessionFromServer } from "./api/auth/[...nextauth]/route";
import QueryProvider from "./providers/query";
import { ComposerProvider } from "./providers/compoter";
import ToastProvider from "./providers/toast";
import { ScrollProvider } from "./providers/scroll";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Ouranos",
  description: "Your friendly Bluesky client for the web",
  metadataBase: new URL("https://useouranos.app"),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSessionFromServer();

  return (
    <html lang="en">
      <head>
        {/* for making the page fullscreen on iOS when added to home */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className={`${inter.variable}`}>
        <SessionProvider session={session}>
          <ScrollProvider>
            <QueryProvider>
              <ComposerProvider>{children}</ComposerProvider>
            </QueryProvider>
            <ToastProvider />
          </ScrollProvider>
        </SessionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
