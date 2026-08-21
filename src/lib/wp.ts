import type { SiteContent, WpImage } from "./types";
import { fallbackContent } from "./fallback";

const ENDPOINT =
  process.env.WP_GRAPHQL_URL ??
  `${process.env.NEXT_PUBLIC_WP_URL ?? "https://etiquetas-escolares.local"}/graphql`;

const IMAGE = `{ url alt width height }`;

const QUERY = /* GraphQL */ `
  query SiteContent {
    proOrganizer {
      brand {
        logo ${IMAGE} footerLogo ${IMAGE}
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
        msgSizeTemplate msgDesignTemplate previewNote
      }
      palette { textColor purpleColor pinkColor grayColor greenColor blueColor }
      header { ctaText shortCtaText }
      hero {
        badge title titleHighlight subtitle bullets
        priceLabel priceValue priceSuffix ctaPrimary ctaSecondary note
        sheetNote promoNote deliveryNote
        image ${IMAGE}
      }
      trust { eyebrow title items }
      sizes { eyebrow title subtitle ctaText selectedLabel orderCtaTemplate usesLabel sampleName }
      usage { title subtitle }
      designs {
        eyebrow title subtitle ctaText selectedCtaTemplate featuredSub featuredNote featuredCta
      }
      personalization {
        title titleHighlight subtitle image ${IMAGE} featureItems
        guideBadge guideTitle guideText guideCta guideUrl approvalText
      }
      cost {
        eyebrow title subtitle prices closing pricesNote
        badTitle badItems goodTitle goodItems badTabLabel goodTabLabel ctaText
      }
      process { eyebrow title subtitle }
      pricing {
        eyebrow promoTitle promosLabel priceSticker priceTitle priceValue priceSuffix priceSub
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
        quote shippingNote socialTitle storeTitle storeText storeCta
        waTitle waCta waText closing copyright legalLinks
      }
      founder {
        photo ${IMAGE} photoAlt signature ${IMAGE} title bio
        guaranteeTitle guaranteeText ctaTitle ctaText ctaButton
      }
      floating { enabled label mobileText mobileCta }
      seo { title description productName ogImage ${IMAGE} canonical }
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
      nodes { id title pre highlight post saving featured }
    }
    poGalleryItems(first: 30, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes { id title image ${IMAGE} }
    }
    poStats(first: 20, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes { id title value icon }
    }
    poTestimonials(first: 20, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes { id title city rating text avatar ${IMAGE} }
    }
    poFaqs(first: 30, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes { id title answer }
    }
  }
`;

const EDITABLE_NODE_QUERY = /* GraphQL */ `
  query EditableNodeByUri($uri: String!) {
    nodeByUri(uri: $uri) {
      __typename
      ... on ContentNode {
        databaseId
        uri
      }
    }
  }
`;

export type EditableNode = {
  __typename: string;
  databaseId: number;
  uri: string;
};

type Nodes<T> = { nodes: T[] } | null | undefined;

function list<T>(value: Nodes<T>, fallback: T[]): T[] {
  const nodes = value?.nodes ?? [];
  return nodes.length ? nodes : fallback;
}

/**
 * Igual que `list`, pero rellena la foto que WordPress aún no tiene.
 *
 * Las fotos de tamaños y usos viven en `public/` y son parte del diseño, no
 * contenido que el cliente vaya a cambiar cada temporada. Sin esto, en cuanto
 * WordPress devuelve un solo nodo la lista entera pierde las fotos por
 * defecto y la sección vuelve a los iconos. El emparejamiento es por `slug` y,
 * si no hay, por título normalizado: los `id` de WordPress no coinciden con
 * los del código.
 */
type Imageable = { id?: string; slug?: string; title?: string; image?: WpImage | null };

const matchKey = (item: Imageable) =>
  (item.slug || item.title || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();

function listWithImages<T extends Imageable>(value: Nodes<T>, fallback: T[]): T[] {
  const nodes = value?.nodes ?? [];
  if (!nodes.length) return fallback;

  const byKey = new Map(fallback.map((item) => [matchKey(item), item.image]));
  return nodes.map((node) =>
    node.image?.url ? node : { ...node, image: byKey.get(matchKey(node)) ?? node.image },
  );
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
      sizes: listWithImages(d.poSizes, fallbackContent.sizes),
      usages: listWithImages(d.poUsages, fallbackContent.usages),
      designs: list(d.poDesigns, fallbackContent.designs),
      steps: list(d.poSteps, fallbackContent.steps),
      promos: list(d.poPromos, fallbackContent.promos),
      gallery: list(d.poGalleryItems, fallbackContent.gallery),
      stats: list(d.poStats, fallbackContent.stats),
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

/** Resolución sin caché para el enlace administrativo contextual. */
export async function getEditableNodeByUri(uri: string): Promise<EditableNode | null> {
  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: EDITABLE_NODE_QUERY, variables: { uri } }),
      cache: "no-store",
    });
    if (!response.ok) return null;

    const body: unknown = await response.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) return null;

    const data = (body as Record<string, unknown>).data;
    if (!data || typeof data !== "object" || Array.isArray(data)) return null;

    const node = (data as Record<string, unknown>).nodeByUri;
    if (!node || typeof node !== "object" || Array.isArray(node)) return null;

    const record = node as Record<string, unknown>;
    if (
      typeof record.__typename !== "string" ||
      typeof record.databaseId !== "number" ||
      !Number.isInteger(record.databaseId) ||
      record.databaseId <= 0 ||
      typeof record.uri !== "string"
    ) {
      return null;
    }

    return {
      __typename: record.__typename,
      databaseId: record.databaseId,
      uri: record.uri,
    };
  } catch {
    return null;
  }
}
