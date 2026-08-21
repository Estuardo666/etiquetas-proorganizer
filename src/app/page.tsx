import { getSiteContent } from "@/lib/wp";
import { OrderProvider } from "@/components/order-provider";
import { BackToTop, Header, ScrollProgress } from "@/components/sections/header";
import { NavbarWrapper } from "@/components/organisms/Navbar/NavbarWrapper";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { Sizes } from "@/components/sections/sizes";
import { Showcase } from "@/components/sections/showcase";
import { Cost } from "@/components/sections/cost";
import { Personalization } from "@/components/sections/design-love";
import { Process } from "@/components/sections/process";
import { Pricing } from "@/components/sections/pricing";
// Se reactiva junto con la sección de testimonios, más abajo en este archivo.
// import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { Founder } from "@/components/sections/founder";
import { Footer } from "@/components/sections/footer";

export default async function Page() {
  const content = await getSiteContent();
  const { settings } = content;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: settings.seo.productName,
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
      <NavbarWrapper>
        <Header settings={settings} />
      </NavbarWrapper>

      {/*
        El orden replica el de la landing de Canva que ya convierte, porque su
        secuencia responde las preguntas en el orden en que la clienta las hace:
        qué es (hero) → cuál me sirve (tamaños) → cuánto cuesta (promos) →
        cómo se ve (diseños) → cómo lo pido (proceso) → quién lo ha probado
        (testimonios) → por qué no un marcador (costo) → dudas sueltas (FAQ) →
        quién responde si algo sale mal (Daniella).

        El cambio frente a la versión anterior es que el precio sube justo
        detrás de los tamaños en vez de quedar en la sexta pantalla: en Canva
        el "$8 la hoja" aparece antes de cualquier argumento y ese es el dato
        que la clienta está buscando cuando entra.

        La navegación que refleja este orden vive en `site-config.ts` y no se
        expone al cliente en WordPress.
      */}
      <main>
        <Hero settings={settings} />
        {/* La franja de beneficios ya incluye las cifras (StatsRow). */}
        <TrustBar settings={settings} stats={content.stats} />
        {/* La sección de tamaños incluye la franja de usos (UsageStrip). */}
        <Sizes settings={settings} sizes={content.sizes} usages={content.usages} />
        {/* El precio va inmediatamente después del tamaño: son la misma
            decisión ("cuál pido y cuánto me cuesta"), no dos. */}
        <Pricing settings={settings} promos={content.promos} />
        {/* Diseños, muestras reales y personalización comparten sección: son
            tres respuestas a "¿cómo se ve esto?", no tres argumentos. */}
        <Showcase settings={settings} designs={content.designs} gallery={content.gallery} />
        {/* Entre ver los diseños y ver los pasos: aquí se responde "¿y si sale
            feo?" con la nota de aprobación, y el turno pasa a los pasos. */}
        <Personalization settings={settings} />
        <Process settings={settings} steps={content.steps} />
        {/* Testimonios oculto a propósito: los que trae el contenido por
            defecto son de ejemplo (Mariana G., Carla P., Lucía F., Diego T.) y
            publicar reseñas inventadas quema la credibilidad del resto de la
            página. Su sitio es aquí —prueba antes de objeciones— y basta con
            descomentar la línea cuando haya reseñas reales de clientas. */}
        {/* <Testimonials settings={settings} testimonials={content.testimonials} /> */}
        <Cost settings={settings} />
        <Faq settings={settings} faqs={content.faqs} />
        {/* Cierre humano: quién firma el trabajo, garantía y arranque por chat. */}
        <Founder settings={settings} />
      </main>

      <Footer settings={settings} />
      <BackToTop />
    </OrderProvider>
  );
}
