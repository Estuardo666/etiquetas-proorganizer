import type { SiteContent } from "./types";
import { fallbackContent } from "./fallback";

const ENDPOINT =
  process.env.WP_GRAPHQL_URL ??
  `${process.env.NEXT_PUBLIC_WP_URL ?? "https://etiquetas-escolares.local"}/graphql`;

const IMAGE = `{ url alt width height }`;

const QUERY = /* GraphQL */ `
  query SiteContent {
    proOrganizer {
      brand {
        logo ${IMAGE}
        logoText
        whatsappNumber
        phone1
        phone1Label
        phone2
        phone2Label
        webUrl
        instagram
        facebook
        tiktok
        address
      }
      whatsapp {
        msgNav msgHero msgSizes msgDesigns msgCost msgPromos msgFinalCta msgFooter
        previewNote
      }
      header { ctaText navItems }
      hero {
        badge title titleHighlight subtitle bullets
        priceLabel priceValue priceSuffix ctaPrimary ctaSecondary note
        sheetNote promoNote deliveryNote
        image ${IMAGE}
      }
      trust { eyebrow title items }
      stats { stat1Value stat1Label stat2Value stat2Label }
      sizes { eyebrow title subtitle ctaText usesLabel sampleName }
      usage { title subtitle }
      designs {
        eyebrow title subtitle ctaText featuredSub featuredNote featuredCta
      }
      cost {
        eyebrow title subtitle prices closing pricesNote
        badTitle badItems goodTitle goodItems ctaText
      }
      process { eyebrow title subtitle }
      pricing {
        eyebrow promoTitle priceSticker priceTitle priceValue priceSuffix priceSub
        ctaText note
      }
      gallery { enabled title subtitle }
      testimonials { eyebrow title ratingValue ratingLabel }
      faq { eyebrow title subtitle linkText linkUrl }
      finalCta {
        eyebrow title titleHighlight highlightColor text ctaPrimary guarantees
        seasonNote seasonDeadline
      }
      footer {
        quote col1Title col1Links col2Title col2Links
        waTitle waCta waText closing copyright legalLinks
      }
      floating { enabled label mobileText mobileCta }
      seo { title description ogImage ${IMAGE} canonical }
    }
    poSizes(first: 20, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes { id slug title count dims uses badge accent image ${IMAGE} }
    }
    poUsages(first: 30, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes { id title sizeSlug image ${IMAGE} }
    }
    poDesigns(first: 30, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes { id title badge image ${IMAGE} }
    }
    poSteps(first: 20, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes { id title desc icon }
    }
    poPromos(first: 20, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes { id title pre highlight post featured }
    }
    poGalleryItems(first: 30, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes { id title image ${IMAGE} }
    }
    poTestimonials(first: 20, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes { id title city rating text avatar ${IMAGE} }
    }
    poFaqs(first: 30, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes { id title answer }
    }
  }
`;

type Nodes<T> = { nodes: T[] } | null | undefined;

function list<T>(value: Nodes<T>, fallback: T[]): T[] {
  const nodes = value?.nodes ?? [];
  return nodes.length ? nodes : fallback;
}

/**
 * Combina los ajustes de WordPress sobre los valores por defecto del código.
 * Un campo vacío, nulo o inexistente en WordPress no borra el texto por
 * defecto: así la landing siempre se ve completa y el cliente solo tiene que
 * rellenar lo que quiera cambiar.
 */
function merge<T>(base: T, incoming: unknown): T {
  if (incoming === null || incoming === undefined) return base;
  if (typeof incoming === "string") return (incoming.trim() ? incoming : base) as T;
  if (typeof incoming !== "object" || Array.isArray(incoming)) return incoming as T;

  const source = incoming as Record<string, unknown>;
  const result = { ...(base as Record<string, unknown>) };
  for (const key of Object.keys(source)) {
    result[key] = merge(result[key], source[key]);
  }
  return result as T;
}

/**
 * Fetches everything the landing page needs in a single request.
 * If WordPress is unreachable the bundled defaults are used so the page
 * always renders — useful while the client edits content locally.
 */
export async function getSiteContent(): Promise<SiteContent> {
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: QUERY }),
      next: { revalidate: 60, tags: ["site-content"] },
    });

    if (!res.ok) throw new Error(`WPGraphQL respondió ${res.status}`);

    const json = await res.json();
    const d = json.data ?? {};
    const settings = d.proOrganizer;

    // Un error parcial no debe tirar toda la página: si llegaron los ajustes se
    // usan, y cada listado vacío cae en su contenido por defecto.
    if (json.errors?.length) {
      console.warn(
        "[wp] WPGraphQL devolvió errores parciales:",
        json.errors.map((e: { message: string }) => e.message).join(" | "),
      );
    }
    if (!settings) throw new Error(json.errors?.[0]?.message ?? "Respuesta sin ajustes");

    return {
      settings: merge(fallbackContent.settings, settings),
      sizes: list(d.poSizes, fallbackContent.sizes),
      usages: list(d.poUsages, fallbackContent.usages),
      designs: list(d.poDesigns, fallbackContent.designs),
      steps: list(d.poSteps, fallbackContent.steps),
      promos: list(d.poPromos, fallbackContent.promos),
      gallery: list(d.poGalleryItems, fallbackContent.gallery),
      testimonials: list(d.poTestimonials, fallbackContent.testimonials),
      faqs: list(d.poFaqs, fallbackContent.faqs),
    };
  } catch (error) {
    console.warn(
      `[wp] No se pudo leer WordPress (${ENDPOINT}). Se usan los contenidos por defecto.`,
      error instanceof Error ? error.message : error,
    );
    return fallbackContent;
  }
}
