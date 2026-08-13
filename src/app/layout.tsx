import type { Metadata } from "next";
import localFont from "next/font/local";
import { Fredoka } from "next/font/google";
import "./globals.css";
import { getSiteContent } from "@/lib/wp";

const heading = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});
const body = localFont({
  src: [
    { path: "../../public/fonts/GoogleSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/GoogleSans-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/GoogleSans-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getSiteContent();
  const { seo } = settings;

  return {
    title: seo.title,
    description: seo.description,
    metadataBase: new URL(seo.canonical || "https://www.proorganizer.com.ec"),
    alternates: { canonical: seo.canonical || "/" },
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: "website",
      locale: "es_EC",
      siteName: settings.brand.logoText,
      images: seo.ogImage?.url ? [{ url: seo.ogImage.url }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: seo.ogImage?.url ? [seo.ogImage.url] : undefined,
    },
  };
}

/**
 * La paleta es parte del sistema de diseño y vive en `globals.css`, no en
 * WordPress: así la landing siempre se ve como el diseño aprobado y no puede
 * romperse desde el admin. WordPress sigue mandando en textos e imágenes.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${heading.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
