import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Splitzy",
    short_name: "Splitzy",
    description: "A PWA-first money management platform.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7FAFF",
    theme_color: "#1677FF",
    icons: [
      { src: "/brand/splitzy-app-icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/icon-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
