"use client";

import { motion } from "framer-motion";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { UsageArt } from "@/components/ui/illustrations";
import { Media } from "@/components/ui/media";
import { cardHoverSm, fadeUp } from "@/lib/motion";
import type { Settings, UsageItem } from "@/lib/types";

/** Fondo pastel del círculo del objeto, uno por tarjeta. */
const tints = [
  "#FFF4D6",
  "#DFF2FF",
  "#E9FBEF",
  "#FFE8F1",
  "#EFEAFF",
  "#E4F1FF",
  "#FFF0E0",
  "#F3EEFF",
];

/**
 * Franja de usos. No es una sección propia: vive al pie de `Sizes`.
 *
 * Cada tarjeta de tamaño ya lista sus objetos en "Ideal para", así que una
 * sección entera repitiendo los mismos ocho objetos era scroll duplicado. Aquí
 * funciona como remate visual de la decisión de tamaño, no como argumento
 * nuevo: por eso son chips de una línea y no tarjetas de 122 px.
 */
export function UsageStrip({ settings, usages }: { settings: Settings; usages: UsageItem[] }) {
  if (!usages.length) return null;

  return (
    <div id="usos" className="mt-12 border-t border-[var(--c-border)] pt-8">
      <p className="mb-5 text-center text-[15px] font-extrabold text-[var(--c-primary)]">
        {settings.usage.title}
      </p>

      <RevealGroup
        className="flex flex-wrap justify-center gap-2.5 lg:gap-3"
        gap={0.04}
      >
        {usages.map((usage, index) => (
          <RevealItem key={usage.id} variants={fadeUp}>
            <motion.span
              initial="rest"
              whileHover="hover"
              variants={cardHoverSm}
              className="group flex items-center gap-2 rounded-full border border-[var(--c-border)] bg-white py-1.5 pr-4 pl-1.5"
            >
              {usage.image?.url ? (
                <Media
                  image={usage.image}
                  alt=""
                  className="size-8 shrink-0 rounded-full"
                  sizes="32px"
                />
              ) : (
                <span
                  className="grid size-8 shrink-0 place-items-center rounded-full"
                  style={{ background: tints[index % tints.length] }}
                >
                  <UsageArt title={usage.title} size={20} />
                </span>
              )}

              <span className="text-[13px] leading-none font-bold text-[var(--c-text)]">
                {usage.title}
              </span>
            </motion.span>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
