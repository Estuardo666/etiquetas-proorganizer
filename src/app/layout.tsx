import type { CSSProperties } from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Fredoka } from "next/font/google";
import "./globals.css";
import { getSiteContent } from "@/lib/wp";
import { AdminBar, AdminBarLayout } from "@/components/molecules/AdminBar";

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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { settings } = await getSiteContent();
  const palette = settings.palette;
  /**
   * Los seis campos de WordPress son los tonos base, no los roles: `--c-ink`,
   * `--c-accent` y los tintes se derivan de estos en `globals.css`. Escribir
   * aquí `--c-navy` y no `--c-ink` es lo que hace que cambiar el color de
   * marca en WordPress mueva también la cabecera, el pie y los botones.
   *
   * `pinkColor` es el rojo de marca y `purpleColor` la lavanda de las
   * carátulas: los nombres vienen del esquema de WordPress y se quedan como
   * están hasta que se renombren allí.
   */
  const paletteStyle = {
    "--c-navy": palette.textColor,
    "--c-purple": palette.purpleColor,
    "--c-red": palette.pinkColor,
    "--c-gray": palette.grayColor,
    "--c-green": palette.greenColor,
    "--c-blue": palette.blueColor,
  } as CSSProperties;

  return (
    <html lang="es" className={`${heading.variable} ${body.variable}`} style={paletteStyle}>
      <body>
        <AdminBar />
        <AdminBarLayout>{children}</AdminBarLayout>
      </body>
    </html>
  );
}
