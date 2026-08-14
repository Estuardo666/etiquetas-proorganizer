import type { Variants } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Entrada por defecto de todo el contenido: opacidad + escala + un
 * desplazamiento corto, con la curva del sistema.
 *
 * La escala arranca en 0,94 y no más abajo: por debajo de ~0,9 el texto
 * reescala lo suficiente para verse borroso mientras entra, y una tarjeta que
 * "crece" demasiado parece un modal abriéndose en vez de contenido que ya
 * estaba ahí.
 */
export const fadeScaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 18 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.55, ease } },
};

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
 * Secuencia de los hijos de un grupo. 0,08 s es el punto donde la cascada se
 * percibe como orden de lectura; por debajo entran a la vez y por encima la
 * última tarjeta de una rejilla de ocho llega con casi un segundo de retraso.
 */
export const stagger = (staggerChildren = 0.08, delayChildren = 0.05): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

/** Flotación muy suave para 2-3 adornos por sección como máximo. */
export const floating = (distance = 6, duration = 6) =>
  ({
    y: [0, -distance, 0],
    transition: { duration, repeat: Infinity, ease: "easeInOut" },
  }) as const;

/**
 * `margin` negativo abajo: el revelado arranca cuando al elemento le falta un
 * 10 % de pantalla para entrar, así que termina de animar justo cuando el ojo
 * llega. Disparar al 20 % de visibilidad, como antes, hacía que el contenido
 * se viera aparecer *después* de estar en pantalla.
 */
export const viewportOnce = {
  once: true,
  amount: 0.15,
  margin: "0px 0px -10% 0px",
} as const;

/** Pop de entrada de los adornos: muelle corto con rebote, no un fundido. */
export const decorPop = {
  type: "spring",
  stiffness: 320,
  damping: 18,
  mass: 0.6,
} as const;

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
