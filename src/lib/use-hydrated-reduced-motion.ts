"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Mantiene estable el HTML de servidor y el primer render del navegador.
 * Framer conoce la preferencia solo en cliente; aplicarla antes de hidratar
 * cambia los estilos inline de las variantes y provoca un mismatch.
 */
export function useHydratedReducedMotion(): boolean {
  const preference = useReducedMotion();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);
  return hydrated && Boolean(preference);
}
