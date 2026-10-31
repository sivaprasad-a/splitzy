import type { Metadata, Viewport } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";

import { Providers } from "./providers";

// Per the brand system: Manrope 700/800 for brand & headings, Inter for UI & data.
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Splitzy",
  description: "A PWA-first money management platform.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/brand/splitzy-favicon.svg",
    apple: "/brand/splitzy-app-icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#1677FF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
