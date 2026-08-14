import { getSiteContent } from "@/lib/wp";
import { OrderProvider } from "@/components/order-provider";
import { BackToTop, Header, ScrollProgress } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { Sizes } from "@/components/sections/sizes";
import { Showcase } from "@/components/sections/showcase";
import { Cost } from "@/components/sections/cost";
import { Process } from "@/components/sections/process";
import { Pricing } from "@/components/sections/pricing";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { FloatingCta } from "@/components/sections/floating-cta";

export default async function Page() {
  const content = await getSiteContent();
  const { settings } = content;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Etiquetas escolares personalizadas",
      description: settings.seo.description,
      brand: { "@type": "Brand", name: settings.brand.logoText },
      offers: {
        "@type": "Offer",
        price: settings.pricing.priceValue.replace(/[^0-9.]/g, ""),
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: settings.seo.canonical,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: settings.brand.logoText,
      url: settings.brand.webUrl,
      telephone: settings.brand.phone1,
      address: { "@type": "PostalAddress", addressLocality: settings.brand.address },
      sameAs: [settings.brand.instagram, settings.brand.facebook, settings.brand.tiktok].filter(
        Boolean,
      ),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: content.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.title,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];

  return (
    <OrderProvider number={settings.brand.whatsappNumber} messages={settings.whatsapp}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollProgress />
      <Header settings={settings} />

      {/*
        El orden sigue la decisión de compra, no el catálogo: utilidad
        (tamaños) → deseo (diseños y muestras) → pérdida (costo) → ahorro
        (promos) → operativa (cómo funciona) → prueba → objeciones → cierre.
        Si cambias este orden, actualiza `header.navItems` en fallback.ts.
      */}
      <main>
        <Hero settings={settings} />
        {/* La franja de beneficios ya incluye las cifras (StatsRow). */}
        <TrustBar settings={settings} />
        {/* La sección de tamaños incluye la franja de usos (UsageStrip). */}
        <Sizes settings={settings} sizes={content.sizes} usages={content.usages} />
        {/* Diseños, muestras reales y personalización comparten sección: son
            tres respuestas a "¿cómo se ve esto?", no tres argumentos. */}
        <Showcase settings={settings} designs={content.designs} gallery={content.gallery} />
        <Cost settings={settings} />
        <Pricing settings={settings} promos={content.promos} />
        <Process settings={settings} steps={content.steps} />
        <Testimonials settings={settings} testimonials={content.testimonials} />
        <Faq settings={settings} faqs={content.faqs} />
        {/* El cierre existía como componente pero no estaba montado: el CTA
            flotante ya observaba `#cta-final` para apartarse de él. */}
        <FinalCta settings={settings} />
      </main>

      <Footer settings={settings} />
      <FloatingCta settings={settings} />
      <BackToTop />
    </OrderProvider>
  );
}
