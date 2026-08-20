/**
 * Lo poco que sigue siendo propiedad del código.
 *
 * Todos los textos, imágenes y botones de la página se editan en WordPress
 * (plugin `proorg`) y se reflejan en `fallback.ts`. Aquí solo queda lo que no
 * es contenido sino comportamiento: qué botones arrastran la selección del
 * usuario y cómo se arma un mensaje a partir de una tarjeta concreta.
 *
 * Si vas a añadir un texto aquí, para: su sitio es `schema.php` del plugin.
 */

import type { Settings } from "./types";

/**
 * La navegación describe la estructura de la landing, no su contenido.
 * Se mantiene en código para que el cliente no pueda apuntar a anclas que no
 * existen ni desordenar el recorrido de compra desde WordPress.
 */
export const sectionNavigation = [
  { label: "Inicio", anchor: "inicio" },
  { label: "Tamaños", anchor: "tamanos" },
  { label: "Precios", anchor: "promociones" },
  { label: "Diseños", anchor: "disenos" },
  { label: "Cómo funciona", anchor: "como-funciona" },
  { label: "Preguntas frecuentes", anchor: "preguntas-frecuentes" },
] as const;

export const footerNavigation = [
  { title: "Productos", links: sectionNavigation.slice(1, 4) },
  { title: "Ayuda", links: sectionNavigation.slice(4) },
] as const;

/** Nombre del mensaje de WhatsApp de cada sección, tal como lo guarda el CMS. */
export type WaSource = "nav" | "hero" | "sizes" | "designs" | "cost" | "promos" | "finalCta" | "footer";

/** Traducción de sección → campo del grupo "Mensajes de WhatsApp". */
export const waMessageKeys: Record<WaSource, keyof Settings["whatsapp"]> = {
  nav: "msgNav",
  hero: "msgHero",
  sizes: "msgSizes",
  designs: "msgDesigns",
  cost: "msgCost",
  promos: "msgPromos",
  finalCta: "msgFinalCta",
  footer: "msgFooter",
};

/** Secciones cuyo CTA arrastra el tamaño y el diseño ya elegidos. */
export const waSourcesWithSelection: readonly WaSource[] = ["hero", "finalCta"];

export const fillMessageTemplate = (
  template: string,
  values: Record<string, string>,
) =>
  Object.entries(values).reduce(
    (message, [key, value]) => message.replaceAll(`{${key}}`, value),
    template,
  );

export const waMessageForSize = (template: string, title: string, count: string) =>
  fillMessageTemplate(template, { title, count });

export const waMessageForDesign = (template: string, title: string) =>
  fillMessageTemplate(template, { title });

/**
 * Tienda online (Kyte). No vive en WordPress porque no es contenido editable
 * sino el destino fijo del canal de venta alternativo al chat: si la tienda
 * cambia de proveedor, cambia el flujo entero, no una etiqueta.
 */
export const SHOP_URL = "https://pro-organizer-shop.kyte.site/es";
