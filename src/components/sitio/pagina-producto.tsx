import { OrderProvider } from "@/components/order-provider";
import { Hero } from "@/components/sections/hero";
import { Showcase } from "@/components/sections/showcase";
import { TrustBar } from "@/components/sections/trust-bar";
import { Sizes } from "@/components/sections/sizes";
import { Pricing } from "@/components/sections/pricing";
import { Personalization } from "@/components/sections/design-love";
import { Process } from "@/components/sections/process";
import { Cost } from "@/components/sections/cost";
import { Faq } from "@/components/sections/faq";
import { FichaProducto } from "@/components/sitio/ficha-producto";
import { BarraProducto, CompleteSuPedido, Migas } from "@/components/sitio/piezas";
import { FranjaLavado, PegadoRopa, PrendasRopa } from "@/components/sitio/secciones-ropa";
import { CalculadoraCaratulas, ContenidoCaratula, MateriasCaratulas } from "@/components/sitio/secciones-caratulas";
import { contenidoProducto, producto, SITE_URL, type ProductoSlug } from "@/lib/catalogo";
import { getSiteContent } from "@/lib/wp";

/**
 * Solo el hero es común. Después de él cada producto cuenta su propia historia:
 * Útiles elige tamaño, Ropa explica el pegado y Carátulas calcula por cuaderno.
 * Daniella queda en Inicio para no repetirse.
 */
export async function PaginaProducto({ slug }: { slug: ProductoSlug }) {
  const content = await getSiteContent();
  const item = producto(slug);
  const datos = contenidoProducto(content, slug);
  const { settings } = datos;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: item.nombre,
      description: item.resumen,
      brand: { "@type": "Brand", name: settings.brand.logoText },
      offers: {
        "@type": "Offer",
        price: item.precioNumero.toFixed(2),
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}${item.ruta}`,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_URL}/inicio` },
        { "@type": "ListItem", position: 2, name: item.nombre, item: `${SITE_URL}${item.ruta}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: datos.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.title,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];

  return (
    <OrderProvider number={settings.brand.whatsappNumber} messages={settings.whatsapp}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero settings={settings} />
      <Migas actual={item.nombre} />

      {slug === "utiles" ? (
        <>
          <Showcase settings={settings} designs={content.designs} />
          <TrustBar settings={settings} stats={content.stats} />
          <Sizes settings={settings} sizes={datos.sizes} usages={datos.usages} />
          <Pricing settings={settings} promos={datos.promos} />
          <Personalization settings={settings} />
          <Process settings={settings} steps={content.steps} />
          <Cost settings={settings} />
        </>
      ) : null}

      {slug === "ropa" ? (
        <>
          <PrendasRopa />
          <FranjaLavado />
          <FichaProducto item={item} talla={datos.sizes[0]} settings={settings} />
          <PegadoRopa />
          <Showcase settings={settings} designs={content.designs} />
        </>
      ) : null}

      {slug === "caratulas" ? (
        <>
          <MateriasCaratulas />
          <CalculadoraCaratulas />
          <ContenidoCaratula />
        </>
      ) : null}

      <Faq settings={settings} faqs={datos.faqs} />
      <CompleteSuPedido actual={slug} />
      <BarraProducto item={item} mensaje={item.mensaje} />
    </OrderProvider>
  );
}
