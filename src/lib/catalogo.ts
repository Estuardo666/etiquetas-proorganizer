/**
 * Contenido del sitio completo (rutas de `src/app/(sitio)`).
 *
 * La página aprobada de `/` no lee nada de este archivo. Aquí viven los datos
 * por producto, y cada sección aprobada los recibe como `settings` parcheados,
 * así el diseño es el mismo sin tocar sus componentes.
 *
 * Solo se publican datos con fuente: el sitio de Canva o el contenido
 * aprobado. Lo que depende de la clienta se queda fuera hasta confirmarlo; ver
 * la sección 11 de `REPORTE-ARQUITECTURA-SITIO.md`.
 */

import type { FaqItem, PromoItem, Settings, SiteContent, SizeItem, UsageItem } from "./types";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://etiquetas.proorganizer.com.ec").replace(/\/$/, "");

/** Enlaces oficiales tomados del sitio de Canva. */
export const REDES = {
  instagram: "https://www.instagram.com/proorganizerec/",
  facebook: "https://www.facebook.com/proorganizerec",
  tiktok: "https://www.tiktok.com/@proorganizerec",
};

export const VIDEO_ROPA = "https://www.instagram.com/reel/DHhH9KFRoCf/";

export type ProductoSlug = "utiles" | "ropa" | "caratulas";

export type Producto = {
  slug: ProductoSlug;
  ruta: string;
  menu: string;
  nombre: string;
  resumen: string;
  precio: string;
  precioNumero: number;
  unidad: string;
  imagen: { url: string; alt: string };
  /** Clase de superficie aprobada para cada categoría en `globals.css`. */
  superficie: string;
  mensaje: string;
  cta: string;
};

export const PRODUCTOS: Producto[] = [
  {
    slug: "utiles",
    ruta: "/etiquetas-utiles-escolares",
    menu: "Útiles",
    nombre: "Útiles escolares",
    resumen: "Cuatro tamaños para lápices, cuadernos, termos y loncheras.",
    precio: "$8 la hoja",
    precioNumero: 8,
    unidad: "hojas",
    imagen: { url: "/usos/utiles-escolares-v2.webp", alt: "Útiles escolares con etiquetas personalizadas" },
    superficie: "surface-tint",
    mensaje: "Hola, quiero pedir etiquetas para útiles escolares.",
    cta: "Pedir etiquetas escolares",
  },
  {
    slug: "ropa",
    ruta: "/etiquetas-ropa-uniformes",
    menu: "Ropa",
    nombre: "Ropa y uniformes",
    resumen: "Se pegan con plancha y resisten lavadora y secadora.",
    precio: "$8 la hoja",
    precioNumero: 8,
    unidad: "hojas",
    imagen: { url: "/usos/ropa-uniformes-v2.webp", alt: "Ropa escolar con etiquetas personalizadas" },
    superficie: "surface-peach",
    mensaje: "Hola, quiero pedir etiquetas para ropa y uniformes.",
    cta: "Pedir etiquetas de ropa",
  },
  {
    slug: "caratulas",
    ruta: "/caratulas-cuadernos",
    menu: "Carátulas",
    nombre: "Carátulas",
    resumen: "Para cuadernos de todos los niveles.",
    precio: "$2,50 cada una",
    precioNumero: 2.5,
    unidad: "carátulas",
    imagen: { url: "/usos/cuadernos-libros-v2.webp", alt: "Cuadernos personalizados" },
    superficie: "surface-lavender",
    mensaje: "Hola, quiero pedir carátulas para cuadernos.",
    cta: "Pedir carátulas",
  },
];

export const producto = (slug: ProductoSlug) => PRODUCTOS.find((item) => item.slug === slug)!;

export const NAVEGACION = [
  ...PRODUCTOS.map(({ menu, ruta }) => ({ label: menu, href: ruta })),
  { label: "Diseños", href: "/disenos" },
  { label: "Cómo funciona", href: "/como-funciona" },
  { label: "Preguntas", href: "/preguntas-frecuentes" },
];

const FAQ_ENTREGA: FaqItem = {
  id: "c-entrega",
  title: "¿En cuánto tiempo llega mi pedido?",
  answer: "Las elaboramos en 2 a 3 días laborables después de aprobar el diseño, más 1 día de entrega. Fines de semana y feriados no cuentan.",
};
const FAQ_ENVIO: FaqItem = {
  id: "c-envio",
  title: "¿Cuánto cuesta el envío?",
  answer: "Retiro gratis, dentro de Machala $2, resto de Ecuador $3 y Galápagos $7.",
};
const FAQ_PAGO: FaqItem = {
  id: "c-pago",
  title: "¿Por qué el pago es antes de imprimir?",
  answer: "Son productos personalizados, por eso no hay pago contra entrega. Antes de imprimir le enviamos el diseño para su aprobación.",
};
const FAQ_GARANTIA: FaqItem = {
  id: "c-garantia",
  title: "¿Y si el diseño tiene un error?",
  answer: "Si existe un error en el diseño aprobado por nosotros, reimprimimos sin costo.",
};

export type GrupoFaq = { titulo: string; preguntas: FaqItem[] };

export const FAQ_GRUPOS: GrupoFaq[] = [
  {
    titulo: "Diseño",
    preguntas: [
      { id: "d1", title: "¿Puedo poner dos nombres en una etiqueta?", answer: "Sí, lo puede hacer." },
      { id: "d2", title: "¿Puedo poner materias y grado?", answer: "Sí, las etiquetas son personalizables." },
      { id: "d3", title: "¿Puedo poner la foto de mi hijo o hija?", answer: "Sí. También puede incluir personajes favoritos o el logo de la escuela." },
      { id: "d4", title: "¿Veré el diseño antes de imprimir?", answer: "Sí. Le enviamos imágenes del diseño e imprimimos solo con su aprobación." },
      FAQ_GARANTIA,
    ],
  },
  {
    titulo: "Pago",
    preguntas: [
      { id: "p1", title: "¿Qué formas de pago aceptan?", answer: "Transferencia bancaria o tarjeta de crédito." },
      { id: "p2", title: "¿Aceptan pago contra entrega?", answer: "No. Al ser productos personalizados, trabajamos con pago previo." },
      FAQ_PAGO,
    ],
  },
  {
    titulo: "Envío",
    preguntas: [
      FAQ_ENTREGA,
      FAQ_ENVIO,
      { id: "e1", title: "¿Con quién envían?", answer: "Enviamos con Servientrega a todo el Ecuador. Puede recibir en su domicilio, en su trabajo o retirar en agencia." },
    ],
  },
  {
    titulo: "Cuidado",
    preguntas: [
      { id: "u1", title: "¿Resisten el agua?", answer: "Sí. Son resistentes al agua, al frío, al calor y al uso diario." },
      { id: "u2", title: "¿Cómo se pegan las etiquetas de ropa?", answer: "Con la plancha doméstica. Tenemos un video que muestra el proceso." },
      { id: "u3", title: "¿Las de ropa resisten el lavado?", answer: "Sí, resisten lavadora y secadora." },
    ],
  },
];

export const FAQ_TODAS = FAQ_GRUPOS.flatMap((grupo) => grupo.preguntas);

const FAQ_PRODUCTO: Record<ProductoSlug, FaqItem[]> = {
  utiles: [FAQ_GRUPOS[3].preguntas[0], FAQ_GRUPOS[0].preguntas[3], FAQ_ENTREGA, FAQ_ENVIO, FAQ_PAGO, FAQ_GARANTIA],
  ropa: [FAQ_GRUPOS[3].preguntas[1], FAQ_GRUPOS[3].preguntas[2], FAQ_GRUPOS[0].preguntas[3], FAQ_ENTREGA, FAQ_ENVIO, FAQ_GARANTIA],
  caratulas: [
    { id: "ca1", title: "¿Qué medida tienen?", answer: "24 cm de alto por 18 cm de ancho, para cuadernos parvularios o universitarios." },
    FAQ_GRUPOS[0].preguntas[3],
    FAQ_ENTREGA,
    FAQ_ENVIO,
    FAQ_PAGO,
    FAQ_GARANTIA,
  ],
};

const TALLA_ROPA: SizeItem = {
  id: "ropa-1",
  slug: "ropa",
  title: "Para ropa",
  count: "24 etiquetas",
  dims: "1,5 cm alto x 4,5 cm ancho",
  uses: "Calentadores, chompas, camisetas, camisas, ropa deportiva.",
  badge: "",
  accent: "#f0913c",
  image: { url: "/usos/ropa-uniformes-v2.webp", alt: "Etiquetas para ropa", width: 1200, height: 1200 },
};

const TALLA_CARATULA: SizeItem = {
  id: "caratula-1",
  slug: "caratula",
  title: "Carátula",
  count: "1 carátula",
  dims: "24 cm alto x 18 cm ancho",
  uses: "Cuadernos de materias, parvularios o universitarios.",
  badge: "",
  accent: "#7b3fa6",
  image: { url: "/usos/cuadernos-libros-v2.webp", alt: "Carátulas para cuadernos", width: 1200, height: 1200 },
};

const BIO_CONFIRMADA =
  "Organizadora Profesional de Espacios Certificada. Diseñamos personalmente cada hoja para que llegue perfecta para sus hijos.";

/** Aplica cambios por grupo sin mutar el contenido compartido. */
function parchar(settings: Settings, cambios: { [K in keyof Settings]?: Partial<Settings[K]> }): Settings {
  const salida = { ...settings } as Record<string, unknown>;
  for (const [grupo, valores] of Object.entries(cambios)) {
    salida[grupo] = { ...(settings as unknown as Record<string, object>)[grupo], ...valores };
  }
  return salida as unknown as Settings;
}

/** Ajustes comunes: redes reales, trato de usted y solo afirmaciones confirmadas. */
export function ajustesSitio(settings: Settings): Settings {
  return parchar(settings, {
    brand: { ...REDES, phone2: "", phone2Label: "" },
    founder: { bio: BIO_CONFIRMADA },
    trust: {
      items:
        "drop|Resisten agua, frío y calor|Hechas para el uso diario.\nshield|Duran todo el año escolar|Y siguen firmes después.\nheart|Personalizadas a su gusto|Cualquier imagen y texto.",
    },
    hero: { badge: "", promoNote: "Lleve 4 y pague 3" },
    process: { eyebrow: "" },
    faq: { linkUrl: "/preguntas-frecuentes" },
    whatsapp: { previewNote: "Le enviamos el diseño para aprobar antes de imprimir." },
  });
}

export type ContenidoProducto = {
  settings: Settings;
  sizes: SizeItem[];
  usages: UsageItem[];
  promos: PromoItem[];
  faqs: FaqItem[];
  mostrarDisenos: boolean;
  mostrarCosto: boolean;
};

export function contenidoProducto(content: SiteContent, slug: ProductoSlug): ContenidoProducto {
  const base = ajustesSitio(content.settings);
  const item = producto(slug);
  const mensajes = {
    msgNav: item.mensaje,
    msgHero: item.mensaje,
    msgFinalCta: item.mensaje,
    msgPromos: item.mensaje,
  };

  if (slug === "ropa") {
    return {
      settings: parchar(base, {
        whatsapp: { ...base.whatsapp, ...mensajes },
        hero: {
          ...base.hero,
          ctaPrimary: item.cta,
          title: "Etiquetas para ropa",
          titleHighlight: "y uniformes",
          subtitle: "Para que chompas y calentadores vuelvan a casa. Se pegan con plancha y resisten lavadora y secadora.",
          image: { url: item.imagen.url, alt: item.imagen.alt, width: 1200, height: 800 },
        },
        trust: {
          eyebrow: "",
          title: "Hechas para la lavadora",
          items:
            "drop|Resisten lavadora y secadora|Para el lavado de cada semana.\nshield|Se pegan con plancha|Con la plancha de su casa.\nheart|Personalizadas a su gusto|Nombre, personaje o logo.",
        },
        sizes: { ...base.sizes, title: "Una medida para toda la ropa", subtitle: "" },
        pricing: { ...base.pricing, promoTitle: "Un precio simple", note: "Consulte las promociones vigentes al realizar su pedido." },
      }),
      sizes: [TALLA_ROPA],
      usages: [],
      promos: [],
      faqs: FAQ_PRODUCTO.ropa,
      mostrarDisenos: true,
      mostrarCosto: false,
    };
  }

  if (slug === "caratulas") {
    return {
      settings: parchar(base, {
        whatsapp: { ...base.whatsapp, ...mensajes },
        hero: {
          ...base.hero,
          ctaPrimary: item.cta,
          title: "Carátulas",
          titleHighlight: "para cuadernos",
          subtitle: "Cada materia, fácil de encontrar. Con su nombre, grado y el diseño que elija.",
          priceValue: "$2,50",
          priceSuffix: "cada una",
          ctaSecondary: "Calcular mi pedido",
          sheetNote: "",
          promoNote: "",
          image: { url: item.imagen.url, alt: item.imagen.alt, width: 1200, height: 800 },
        },
        trust: {
          items:
            "heart|Personalizadas a su gusto|Cualquier imagen y texto.\nshield|Para todos los niveles|De parvularios a universitarios.\ndrop|Usted aprueba primero|Imprimimos con su aprobación.",
        },
        sizes: { ...base.sizes, title: "Una medida para sus cuadernos", subtitle: "" },
        pricing: {
          ...base.pricing,
          promoTitle: "Un precio simple",
          priceValue: "$2,50",
          priceTitle: "cada carátula",
          priceSub: "Cada carátula",
          note: "",
        },
      }),
      sizes: [TALLA_CARATULA],
      usages: [],
      promos: [],
      faqs: FAQ_PRODUCTO.caratulas,
      mostrarDisenos: false,
      mostrarCosto: false,
    };
  }

  return {
    settings: parchar(base, {
      whatsapp: { ...base.whatsapp, ...mensajes },
      hero: {
        ...base.hero,
        ctaPrimary: item.cta,
        subtitle: "Para que todo vuelva a casa con su nombre. Resisten agua, frío, calor y el uso diario.",
      },
      process: { ...base.process, title: "Del nombre a la mochila", subtitle: "Cuatro pasos para tener todo listo." },
    }),
    sizes: content.sizes,
    usages: content.usages,
    promos: content.promos,
    faqs: FAQ_PRODUCTO.utiles,
    mostrarDisenos: true,
    mostrarCosto: true,
  };
}
