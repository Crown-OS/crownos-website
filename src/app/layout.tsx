import type { Metadata, Viewport } from "next";
import { Fragment_Mono, Instrument_Serif, Inter } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import type { ReactNode } from "react";
import {
  Cursor,
  IntroLoader,
  RevealObserver,
  SmoothScroll,
} from "@/components/motion";
import "./globals.css";

const sans = localFont({
  src: "../fonts/ClashDisplay-Variable.woff2",
  variable: "--font-clash-display",
  weight: "200 700",
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter-variable",
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

export const viewport: Viewport = { themeColor: "#040404" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${inter.variable} ${serif.variable} ${mono.variable}`}
      data-intro="pending"
      suppressHydrationWarning
    >
      <body>
        <Script id="motion-flag" strategy="beforeInteractive">
          {"document.documentElement.classList.add('js')"}
        </Script>
        <noscript>
          <style>
            {":root{overflow:visible!important}.intro{display:none!important}"}
          </style>
        </noscript>
        <IntroLoader />
        <SmoothScroll>
          {children}
          <Cursor />
          <RevealObserver />
        </SmoothScroll>
      </body>
    </html>
  );
}
