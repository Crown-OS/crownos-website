import type { Metadata, Viewport } from "next";
import { Fragment_Mono, Instrument_Serif, Inter_Tight } from "next/font/google";
import Script from "next/script";
import type { ReactNode } from "react";
import { Cursor, RevealObserver, SmoothScroll } from "@/components/motion";
import { INTRO_BOOT_SCRIPT } from "@/data/intro";
import "./globals.css";

const sans = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

const serif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const mono = Fragment_Mono({
  variable: "--font-fragment-mono",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CrownOS · An AI-ready Arch Linux distribution",
    template: "%s",
  },
  description:
    "CrownOS is a monochromatic, Arch-based Linux distribution built for performance, open source values and a calm, AI-ready desktop ecosystem.",
};

export const viewport: Viewport = { themeColor: "#111111" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Script id="motion-flag" strategy="beforeInteractive">
          {`document.documentElement.classList.add('js');${INTRO_BOOT_SCRIPT}`}
        </Script>
        <SmoothScroll>
          {children}
          <Cursor />
          <RevealObserver />
        </SmoothScroll>
      </body>
    </html>
  );
}
