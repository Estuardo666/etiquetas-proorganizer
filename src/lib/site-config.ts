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

export const waMessageForSize = (title: string, count: string) =>
  `Hola, quiero etiquetas tamaño ${title} (${count} por hoja).`;

export const waMessageForDesign = (title: string) =>
  `Hola, me interesan las etiquetas con diseño de ${title}.`;
