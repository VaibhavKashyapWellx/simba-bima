import type { Metadata } from "next";
import "./globals.css";
import { AppStateProvider } from "@/lib/AppState";
import { Tweaks } from "@/components/Tweaks";

export const metadata: Metadata = {
  title: "Simba Bima — Nguvu Moja. Kinga Moja.",
  description:
    "Bima rasmi ya Simba Sports Club. Weekly micro-insurance for Tanzanian fans. Underwritten by MO Assurance, regulated by TIRA.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Fraunces:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AppStateProvider>
          {children}
          <Tweaks />
        </AppStateProvider>
      </body>
    </html>
  );
}
