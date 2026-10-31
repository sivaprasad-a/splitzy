import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

import { Providers } from "./providers";

// The approved reference design uses Manrope across every weight, not a
// separate UI font — match that rather than the brand PDF's Manrope/Inter split.
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
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
    <html lang="en" className={manrope.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
