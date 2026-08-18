"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import type { WaSource } from "@/lib/site-config";
import type { Settings } from "@/lib/types";

/**
 * Sección visible → mensaje del CTA flotante. El botón que acompaña todo el
 * scroll no puede abrir siempre la misma conversación genérica: si el usuario
 * lo pulsa leyendo promociones, el chat tiene que hablar de la promoción.
 */
const SECTION_SOURCE: Array<[string, WaSource]> = [
  ["inicio", "hero"],
  ["tamanos", "sizes"],
  ["disenos", "designs"],
  ["costo", "cost"],
  ["promociones", "promos"],
  ["como-funciona", "finalCta"],
  ["preguntas-frecuentes", "finalCta"],
];

/**
 * Móvil: barra fija inferior con el precio y el CTA (respeta el safe area).
 *
 * Desaparece al llegar al CTA final y al footer: ahí ya hay un botón de
 * WhatsApp y, si se queda, tapa los enlaces legales.
 */
export function FloatingCta({ settings }: { settings: Settings }) {
  const { floating } = settings;
  const [atEnd, setAtEnd] = useState(false);
  const [source, setSource] = useState<WaSource>("hero");

  useEffect(() => {
    const targets = [document.getElementById("cta-final"), document.querySelector("footer")].filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!targets.length) return;

    const visible = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        });
        setAtEnd(visible.size > 0);
      },
      { threshold: 0.05 },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  // Mensaje según la sección que ocupa el centro de la pantalla.
  useEffect(() => {
    const entries = SECTION_SOURCE.map(([id, key]) => [document.getElementById(id), key] as const)
      .filter((pair): pair is readonly [HTMLElement, WaSource] => Boolean(pair[0]));
    if (!entries.length) return;

    const byElement = new Map(entries);
    const observer = new IntersectionObserver(
      (records) => {
        const top = records
          .filter((record) => record.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const next = top && byElement.get(top.target as HTMLElement);
        if (next) setSource(next);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0.01, 0.25, 0.5] },
    );
    entries.forEach(([element]) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  if (!floating.enabled) return null;
  const ariaLabel = `${floating.label}: abrir conversación con Pro Organizer`;

  return (
    <>
      <motion.div
        animate={{ y: atEnd ? 90 : 0, opacity: atEnd ? 0 : 1 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-x-0 bottom-0 z-40 hidden border-t border-[var(--c-border)] bg-white/95 backdrop-blur-md md:block"
        style={{
          paddingBottom: "env(safe-area-inset-bottom)",
          pointerEvents: atEnd ? "none" : "auto",
        }}
      >
        <div className="container-page flex items-center gap-2 py-2">
          <p className="text-[13px] leading-tight font-medium text-[var(--c-ink)]">
            {floating.mobileText}
          </p>
          {/* Solo icono en pantallas estrechas: el botón con texto completo se
              comía el ancho y empujaba el precio fuera de la barra. */}
          <WhatsAppButton
            source={source}
            carrySelection
            variant="inline"
            ariaLabel={ariaLabel}
            className="ml-auto min-h-[44px] aspect-square px-0 sm:aspect-auto sm:px-4"
          >
            <span className="hidden sm:inline">{floating.mobileCta}</span>
          </WhatsAppButton>
        </div>
      </motion.div>
    </>
  );
}
