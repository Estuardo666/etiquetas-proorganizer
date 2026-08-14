"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { fadeScaleIn, stagger, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * El bloque `prefers-reduced-motion` de `globals.css` neutraliza las
 * transiciones CSS, pero no las variantes de Framer: se ejecutan en JS y
 * `transition-duration: 0.001ms !important` no las ve. Sin esto, quien pide
 * menos movimiento seguía recibiendo todos los revelados por scroll.
 */
function useRevealState() {
  const reduced = useReducedMotion();
  return reduced
    ? ({ initial: "show", animate: "show" } as const)
    : ({ initial: "hidden", whileInView: "show", viewport: viewportOnce } as const);
}

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "header" | "span";
};

export function Reveal({
  children,
  className,
  variants = fadeScaleIn,
  delay = 0,
  as = "div",
}: RevealProps) {
  const Comp = motion[as];
  const state = useRevealState();

  return (
    <Comp className={className} {...state} variants={variants} transition={{ delay }}>
      {children}
    </Comp>
  );
}

export function RevealGroup({
  children,
  className,
  gap = 0.08,
  delay = 0.05,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  gap?: number;
  delay?: number;
  as?: "div" | "ul" | "section";
}) {
  const Comp = motion[as];
  const state = useRevealState();

  return (
    <Comp className={cn(className)} {...state} variants={stagger(gap, delay)}>
      {children}
    </Comp>
  );
}

export const RevealItem = motion.div;
