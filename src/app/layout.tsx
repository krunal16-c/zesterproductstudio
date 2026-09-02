import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { SITE } from "@/lib/site";
import "./globals.css";

/* Display: a grotesk with a real width axis, pulled condensed for headlines.
   Body and metadata: Plex Sans and Plex Mono, which were drawn for technical
   documentation and carry the engineering register the brand needs. */
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Zester Product Studio - Intelligent Software & Hardware for Better Operations",
    template: "%s - Zester Product Studio",
  },
  description:
    "Zester Product Studio builds intelligent software, edge AI, computer vision, industrial IoT, and hardware products that improve how organizations operate.",
  keywords: [
    "industrial AI",
    "edge AI",
    "computer vision",
    "industrial IoT",
    "factory automation",
    "workflow automation",
    "operations intelligence",
    "product studio",
  ],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: SITE.url,
    title: "Zester Product Studio - Intelligent Software & Hardware for Better Operations",
    description: SITE.positioning,
  },
  twitter: {
    card: "summary_large_image",
    title: "Zester Product Studio",
    description: SITE.positioning,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0c" },
    { media: "(prefers-color-scheme: light)", color: "#f4f1ec" },
  ],
};

/* Applies the stored theme before first paint so the page never flashes the
   wrong ground colour on load. */
const THEME_BOOT = `(function(){try{var t=localStorage.getItem('zester-theme');if(t){document.documentElement.setAttribute('data-theme',t)}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
      </head>
      <body className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable} antialiased`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[80] focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:tracking-widest focus:text-accent-ink focus:uppercase"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
