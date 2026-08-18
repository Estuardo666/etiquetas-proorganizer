"use client";

/**
 * Sistema de adornos.
 *
 * Todos los elementos son SVG propios (ligeros, escalables y coloreables),
 * decorativos y por tanto `aria-hidden` + `pointer-events-none`.
 *
 * Dos reglas del sistema visual viven aquí y no en cada sección:
 *
 * 1. **Color pastel desde el token.** Los adornos usan `--c-pastel-*`, que ya
 *    son el acento y el destacado mezclados al 45 % con blanco. Nunca el color
 *    a plena saturación: un adorno tan fuerte como un botón compite con él.
 * 2. **Opacidad 50 % y entrada con pop.** Antes entraban ya visibles, así que
 *    el ojo los registraba como parte del fondo estático. Con el muelle corto
 *    aparecen cuando la sección entra y se leen como acompañamiento del
 *    contenido, no como textura.
 */

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { decorPop } from "@/lib/motion";
import { useHydratedReducedMotion } from "@/lib/use-hydrated-reduced-motion";
import { cn } from "@/lib/utils";

type DecorProps = {
  className?: string;
  color?: string;
  size?: number;
};

const decorBase = "pointer-events-none absolute select-none";

export function DecorativeStar({
  className,
  color = "var(--c-pastel-highlight)",
  size = 44,
}: DecorProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={cn("pointer-events-none", className)}
    >
      {/* Sin contorno blanco: sobre un relleno pastel el trazo grueso lo
          convierte en pegatina y devuelve el peso que acabamos de quitar. */}
      <path
        d="M24 4.5c1.2 0 2.3.7 2.8 1.8l4 8.5 9.2 1.2c1.2.2 2.2 1 2.6 2.2.4 1.1.1 2.4-.8 3.2l-6.8 6.3 1.8 9.2c.2 1.2-.3 2.4-1.3 3.1-1 .7-2.3.8-3.3.2L24 35.8l-8.2 4.4c-1 .6-2.3.5-3.3-.2-1-.7-1.5-1.9-1.3-3.1l1.8-9.2-6.8-6.3c-.9-.8-1.2-2.1-.8-3.2.4-1.2 1.4-2 2.6-2.2l9.2-1.2 4-8.5c.5-1.1 1.6-1.8 2.8-1.8Z"
        fill={color}
      />
    </svg>
  );
}

/**
 * Estrella con carita: usar como mucho una vez por sección.
 *
 * Los ojos y la boca van en tinta plena a propósito: son los únicos trazos del
 * sistema de adornos que no bajan de contraste, porque a 50 % una carita deja
 * de leerse como cara y pasa a ser una mancha.
 */
export function DecorativeStarFace({ className, size = 96 }: DecorProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={cn("pointer-events-none", className)}
    >
      <path
        d="M24 4.5c1.2 0 2.3.7 2.8 1.8l4 8.5 9.2 1.2c1.2.2 2.2 1 2.6 2.2.4 1.1.1 2.4-.8 3.2l-6.8 6.3 1.8 9.2c.2 1.2-.3 2.4-1.3 3.1-1 .7-2.3.8-3.3.2L24 35.8l-8.2 4.4c-1 .6-2.3.5-3.3-.2-1-.7-1.5-1.9-1.3-3.1l1.8-9.2-6.8-6.3c-.9-.8-1.2-2.1-.8-3.2.4-1.2 1.4-2 2.6-2.2l9.2-1.2 4-8.5c.5-1.1 1.6-1.8 2.8-1.8Z"
        fill="var(--c-highlight)"
      />
      <circle cx="20" cy="21" r="1.7" fill="var(--c-ink)" />
      <circle cx="28.4" cy="21" r="1.7" fill="var(--c-ink)" />
      <path
        d="M20.4 25.6c1.9 1.7 5.3 1.7 7.2 0"
        stroke="var(--c-ink)"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      <ellipse cx="17" cy="25" rx="2" ry="1.3" fill="var(--c-pastel-accent)" />
      <ellipse cx="31.6" cy="25" rx="2" ry="1.3" fill="var(--c-pastel-accent)" />
    </svg>
  );
}

export function DecorativeCloud({ className, size = 96 }: DecorProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size * 0.62}
      viewBox="0 0 100 62"
      className={cn("pointer-events-none", className)}
    >
      <path
        d="M25 52c-9.9 0-18-7.4-18-16.5S15.1 19 25 19c1.6 0 3.2.2 4.7.6C33 12 40.6 6.5 49.6 6.5c11.6 0 21.1 9 21.7 20.3 8.2.6 14.7 7.1 14.7 15.1 0 8.4-7.1 15.1-15.9 15.1H25Z"
        fill="#fff"
        stroke="var(--c-pastel-ink)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Nube con carita: como mucho una por sección. */
export function DecorativeCloudFace({ className, size = 120 }: DecorProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size * 0.62}
      viewBox="0 0 100 62"
      className={cn("pointer-events-none", className)}
    >
      <path
        d="M25 52c-9.9 0-18-7.4-18-16.5S15.1 19 25 19c1.6 0 3.2.2 4.7.6C33 12 40.6 6.5 49.6 6.5c11.6 0 21.1 9 21.7 20.3 8.2.6 14.7 7.1 14.7 15.1 0 8.4-7.1 15.1-15.9 15.1H25Z"
        fill="#fff"
        stroke="var(--c-pastel-ink)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <circle cx="41" cy="35" r="2.2" fill="var(--c-ink)" />
      <circle cx="55" cy="35" r="2.2" fill="var(--c-ink)" />
      <path
        d="M41.5 41c2.6 2.6 10.4 2.6 13 0"
        stroke="var(--c-ink)"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      <ellipse cx="35" cy="40" rx="3" ry="2" fill="var(--c-pastel-accent)" />
      <ellipse cx="61" cy="40" rx="3" ry="2" fill="var(--c-pastel-accent)" />
    </svg>
  );
}

export function DecorativeSparkle({
  className,
  color = "var(--c-pastel-accent)",
  size = 22,
}: DecorProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={cn("pointer-events-none", className)}
    >
      <path
        d="M12 1.5c.5 4.6 1.9 7 5.6 8.2 1.4.5 3 .8 4.9 1-4.9.5-7.4 1.9-8.6 5.6-.5 1.4-.7 3-.9 4.9-.5-4.9-1.9-7.4-5.6-8.6-1.4-.5-3-.7-4.9-.9 4.6-.5 7-1.9 8.2-5.6.5-1.4.8-3 1-4.9Z"
        fill={color}
      />
    </svg>
  );
}

export function DecorativeHeart({
  className,
  color = "var(--c-pastel-accent)",
  size = 30,
}: DecorProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={cn("pointer-events-none", className)}
    >
      <path
        d="M16 27.5S3.5 20.3 3.5 12.4C3.5 8 7 4.9 11 4.9c2.4 0 4.2 1.1 5 2.5.8-1.4 2.6-2.5 5-2.5 4 0 7.5 3.1 7.5 7.5 0 7.9-12.5 15.1-12.5 15.1Z"
        fill={color}
      />
    </svg>
  );
}

export function DecorativeCurvedArrow({
  className,
  color = "var(--c-pastel-accent)",
  size = 72,
}: DecorProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size * 0.72}
      viewBox="0 0 72 52"
      fill="none"
      className={cn("pointer-events-none", className)}
    >
      <path
        d="M4 8c14 26 36 36 62 34"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="1 8"
      />
      <path
        d="M56 34.5 66.5 42 58 48.5"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DoodleLine({
  className,
  color = "var(--c-pastel-accent)",
  size = 90,
}: DecorProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size * 0.28}
      viewBox="0 0 90 26"
      fill="none"
      className={cn("pointer-events-none", className)}
    >
      <path
        d="M2 18C10 6 18 6 26 18s16 12 24 0 16-12 24 0"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DottedPath({
  className,
  color = "var(--c-pastel-ink)",
  size = 120,
}: DecorProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size * 0.5}
      viewBox="0 0 120 60"
      fill="none"
      className={cn("pointer-events-none", className)}
    >
      <path
        d="M2 52C22 52 26 8 60 8s38 44 58 44"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="2 10"
      />
    </svg>
  );
}

export function DecorativeDots({ className, color = "var(--c-pastel-accent)" }: DecorProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="60"
      height="60"
      viewBox="0 0 60 60"
      className={cn("pointer-events-none", className)}
    >
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2, 3].map((col) => (
          <circle key={`${row}-${col}`} cx={6 + col * 16} cy={6 + row * 16} r="3" fill={color} />
        )),
      )}
    </svg>
  );
}

/**
 * Pop de entrada para los adornos sueltos, los que una sección coloca a mano
 * en vez de recibirlos de `DecorativeBackground`. Sin esto la mitad de los
 * adornos de la página entraría con muelle y la otra mitad ya visible.
 */
export function DecorPop({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useHydratedReducedMotion();

  return (
    <motion.span
      aria-hidden="true"
      className={cn("pointer-events-none block opacity-50", className)}
      initial={reduced ? false : { opacity: 0, scale: 0.4 }}
      whileInView={{ opacity: 0.5, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ ...decorPop, delay }}
    >
      {children}
    </motion.span>
  );
}

/* ---------------------------------------------------------------------- */

type Variant =
  | "hero"
  | "soft"
  | "sizes"
  | "usage"
  | "designs"
  | "faq"
  | "cta"
  | "process"
  | "promo"
  | "testimonials";

type Item = {
  node: React.ReactNode;
  /** Clases de posición. */
  at: string;
  /** Velocidad de parallax relativa (0 = fijo). */
  speed?: number;
  float?: boolean;
  hideOnMobile?: boolean;
};

/**
 * Cada sección lleva entre tres y seis adornos pequeños y uno mediano, y
 * siempre acompañando al contenido (títulos, tarjetas, composición del hero):
 * nunca un único adorno suelto en una zona vacía.
 *
 * Los halos difusos (`Glow`) que había aquí se retiraron con el resto de
 * degradados: eran doce manchas de color de 300-400 px sobre fondos que ahora
 * son planos, y se leían como suciedad en el borde de las secciones.
 */
const variants: Record<Variant, Item[]> = {
  hero: [
    { node: <DecorativeStar size={34} />, at: "left-[2%] top-[26%]", speed: 24, float: true },
    { node: <DecorativeSparkle size={18} />, at: "left-[7%] top-[14%]" },
    {
      node: <DecorativeCloud size={104} />,
      at: "right-[30%] top-[4%]",
      speed: -18,
      hideOnMobile: true,
    },
    {
      node: <DecorativeStarFace size={70} />,
      at: "right-[4%] top-[12%]",
      float: true,
      hideOnMobile: true,
    },
    {
      node: <DecorativeHeart size={26} color="var(--c-pastel-ink)" />,
      at: "right-[2%] top-[42%]",
      speed: 12,
      hideOnMobile: true,
    },
    {
      node: <DecorativeSparkle size={22} />,
      at: "right-[46%] top-[10%]",
      speed: 14,
      hideOnMobile: true,
    },
    {
      node: <DecorativeSparkle size={18} color="var(--c-pastel-highlight)" />,
      at: "right-[16%] bottom-[26%]",
      float: true,
      hideOnMobile: true,
    },
    { node: <DottedPath size={130} />, at: "left-[4%] bottom-[18%]", speed: 10, hideOnMobile: true },
    { node: <DecorativeDots />, at: "right-[1%] bottom-[16%]", hideOnMobile: true },
    {
      node: <DecorativeStar size={20} color="var(--c-pastel-accent)" />,
      at: "left-[38%] bottom-[12%]",
      hideOnMobile: true,
    },
  ],
  soft: [
    { node: <DecorativeStar size={26} />, at: "left-[4%] top-[10%]", speed: 16 },
    {
      node: <DecorativeSparkle size={20} />,
      at: "right-[5%] top-[18%]",
      float: true,
      hideOnMobile: true,
    },
    { node: <DoodleLine size={96} />, at: "right-[12%] bottom-[8%]", hideOnMobile: true },
  ],
  sizes: [
    {
      node: <DecorativeStar size={22} />,
      at: "left-[30%] top-[4%]",
      float: true,
      hideOnMobile: true,
    },
    { node: <DecorativeSparkle size={20} />, at: "right-[30%] top-[5%]", hideOnMobile: true },
    { node: <DecorativeStar size={28} />, at: "left-[3%] top-[24%]", speed: 14 },
    { node: <DecorativeDots />, at: "right-[2%] bottom-[10%]", hideOnMobile: true },
    {
      node: <DoodleLine size={90} color="var(--c-pastel-ink)" />,
      at: "left-[6%] bottom-[8%]",
      hideOnMobile: true,
    },
  ],
  usage: [
    {
      node: <DecorativeSparkle size={20} />,
      at: "left-[26%] top-[8%]",
      float: true,
      hideOnMobile: true,
    },
    { node: <DecorativeStar size={24} />, at: "right-[6%] top-[16%]", speed: 12 },
    {
      node: <DecorativeDots color="var(--c-pastel-ink)" />,
      at: "left-[2%] bottom-[12%]",
      hideOnMobile: true,
    },
  ],
  designs: [
    {
      node: <DecorativeCloud size={104} />,
      at: "left-[2%] top-[10%]",
      speed: -14,
      hideOnMobile: true,
    },
    { node: <DecorativeStar size={30} />, at: "right-[4%] top-[14%]", float: true },
    {
      node: <DecorativeSparkle size={22} color="var(--c-pastel-highlight)" />,
      at: "left-[12%] bottom-[12%]",
      speed: 12,
    },
    { node: <DecorativeSparkle size={16} />, at: "right-[34%] top-[6%]", hideOnMobile: true },
    {
      node: <DecorativeDots color="var(--c-pastel-ink)" />,
      at: "right-[8%] bottom-[10%]",
      hideOnMobile: true,
    },
  ],
  process: [
    { node: <DecorativeSparkle size={20} />, at: "left-[6%] top-[14%]", float: true },
    {
      node: <DecorativeStar size={24} />,
      at: "right-[6%] bottom-[16%]",
      speed: 14,
      hideOnMobile: true,
    },
    { node: <DecorativeSparkle size={16} />, at: "right-[22%] top-[10%]", hideOnMobile: true },
    {
      node: <DottedPath size={110} color="var(--c-pastel-accent)" />,
      at: "left-[2%] bottom-[10%]",
      hideOnMobile: true,
    },
  ],
  promo: [
    { node: <DecorativeStar size={30} />, at: "right-[6%] top-[8%]", float: true },
    {
      node: <DecorativeSparkle size={20} color="var(--c-pastel-highlight)" />,
      at: "left-[4%] bottom-[14%]",
    },
    { node: <DecorativeSparkle size={16} />, at: "right-[16%] bottom-[10%]", hideOnMobile: true },
    {
      node: <DecorativeDots color="var(--c-pastel-highlight)" />,
      at: "left-[42%] top-[6%]",
      hideOnMobile: true,
    },
  ],
  testimonials: [
    {
      node: <DecorativeHeart size={26} />,
      at: "left-[4%] top-[16%]",
      float: true,
      hideOnMobile: true,
    },
    { node: <DecorativeStar size={22} />, at: "right-[5%] top-[12%]", speed: 12, hideOnMobile: true },
    { node: <DecorativeSparkle size={18} />, at: "left-[30%] bottom-[8%]", hideOnMobile: true },
  ],
  faq: [
    {
      node: <DecorativeCloudFace size={116} />,
      at: "right-[3%] top-[8%]",
      speed: -12,
      hideOnMobile: true,
    },
    { node: <DecorativeStar size={24} />, at: "left-[5%] top-[22%]", float: true },
    {
      node: <DottedPath size={130} color="var(--c-pastel-accent)" />,
      at: "left-[2%] bottom-[10%]",
      hideOnMobile: true,
    },
    { node: <DecorativeSparkle size={18} />, at: "right-[14%] bottom-[18%]" },
    {
      node: <DecorativeSparkle size={16} color="var(--c-pastel-highlight)" />,
      at: "left-[28%] top-[6%]",
      hideOnMobile: true,
    },
  ],
  cta: [
    { node: <DecorativeHeart size={34} />, at: "right-[8%] top-[14%]", float: true },
    {
      node: <DecorativeHeart size={22} color="#fff" />,
      at: "right-[22%] top-[8%]",
      hideOnMobile: true,
    },
    { node: <DecorativeSparkle size={20} color="#fff" />, at: "left-[40%] top-[14%]" },
    {
      node: <DecorativeSparkle size={16} color="#fff" />,
      at: "left-[52%] bottom-[18%]",
      hideOnMobile: true,
    },
    {
      node: <DecorativeStar size={22} color="#fff" />,
      at: "right-[34%] bottom-[16%]",
      hideOnMobile: true,
    },
  ],
};

/**
 * Fondo decorativo de una sección. El contenedor padre necesita
 * `relative overflow-hidden` y el contenido debe ir en un `z-10`.
 */
export function DecorativeBackground({
  variant = "soft",
  parallax = true,
  className,
}: {
  variant?: Variant;
  parallax?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useHydratedReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const shift = useTransform(scrollYProgress, [0, 1], [-1, 1]);
  const enableParallax = parallax && !reduced;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {variants[variant].map((item, index) => (
        <DecorItem
          key={index}
          item={item}
          index={index}
          shift={shift}
          parallax={enableParallax}
          reduced={Boolean(reduced)}
        />
      ))}
    </div>
  );
}

function DecorItem({
  item,
  index,
  shift,
  parallax,
  reduced,
}: {
  item: Item;
  index: number;
  shift: MotionValue<number>;
  parallax: boolean;
  reduced: boolean;
}) {
  // Movimiento máximo de 12 px, con velocidad distinta por elemento.
  const speed = Math.max(-12, Math.min(12, item.speed ?? 0));
  const y = useTransform(shift, (value) => (parallax ? value * speed : 0));
  const float = item.float && !reduced;

  return (
    <motion.div
      className={cn(decorBase, item.at, "opacity-50", item.hideOnMobile && "hidden md:block")}
      style={{ y }}
    >
      {/*
        Tres capas anidadas y no una: el padre lleva el parallax en `y`, así que
        el pop y la flotación tienen que vivir en hijos o se pisan entre ellos
        escribiendo la misma propiedad.
      */}
      <motion.div
        initial={reduced ? false : { opacity: 0, scale: 0.4 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ ...decorPop, delay: index * 0.06 }}
      >
        {float ? (
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
          >
            {item.node}
          </motion.div>
        ) : (
          item.node
        )}
      </motion.div>
    </motion.div>
  );
}
