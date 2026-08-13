import type { Variants } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Duraciones cortas a propósito: el reveal por scroll ocurre cuando el ojo ya
 * está sobre el elemento, así que por encima de ~350 ms el contenido se
 * percibe como que "llega tarde" en vez de como una entrada elegante.
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3, ease } },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease } },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.3, ease } },
};

/**
 * `staggerChildren` corto: en rejillas de 5-8 tarjetas, 0,08 s por item hace
 * que la última tarde más de medio segundo en aparecer.
 */
export const stagger = (staggerChildren = 0.05, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

/** Flotación muy suave para 2-3 adornos por sección como máximo. */
export const floating = (distance = 6, duration = 6) =>
  ({
    y: [0, -distance, 0],
    transition: { duration, repeat: Infinity, ease: "easeInOut" },
  }) as const;

export const viewportOnce = { once: true, amount: 0.2 } as const;

/**
 * Hover de tarjeta grande: par `rest`/`hover` en vez de `whileHover` suelto.
 * Un objeto `whileHover` inline en un componente que también recibe
 * `variants` de entrada por scroll puede quedar atado a la transición de esa
 * entrada; con estados nombrados el gesto de hover siempre usa esta
 * transición, sin importar en qué punto vaya la animación de aparición.
 */
export const cardHover: Variants = {
  rest: { y: 0, scale: 1 },
  hover: { y: -6, scale: 1.015, transition: { duration: 0.25, ease } },
};

/** Igual que `cardHover`, para tarjetas pequeñas (usos, chips). */
export const cardHoverSm: Variants = {
  rest: { y: 0, scale: 1 },
  hover: { y: -4, scale: 1.02, transition: { duration: 0.25, ease } },
};
