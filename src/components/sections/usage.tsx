"use client";

import { motion } from "framer-motion";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { UsageArt } from "@/components/ui/illustrations";
import { Media } from "@/components/ui/media";
import { cardHoverSm, fadeScaleIn } from "@/lib/motion";
import type { Settings, UsageItem } from "@/lib/types";


/**
 * Franja de usos. No es una sección propia: vive al pie de `Sizes`.
 *
 * Cada tarjeta de tamaño ya lista sus objetos en "Ideal para", así que una
 * sección entera repitiendo los mismos ocho objetos era scroll duplicado. Aquí
 * funciona como remate visual de la decisión de tamaño, no como argumento
 * nuevo.
 *
 * Los usos con foto se muestran como tarjeta —imagen arriba, nombre debajo—
 * porque la foto es el argumento: enseña la etiqueta puesta sobre el objeto.
 * El cierre "¡Y mucho más!" no tiene foto y se queda como pastilla: es un
 * "etcétera", no un uso concreto, y darle el mismo peso visual sería mentir
 * sobre su importancia.
 */
export function UsageStrip({ settings, usages }: { settings: Settings; usages: UsageItem[] }) {
  if (!usages.length) return null;

  const cards = usages.filter((usage) => usage.image?.url);
  const pills = usages.filter((usage) => !usage.image?.url);

  return (
    <div id="usos" className="mt-12 border-t border-[var(--c-border)] pt-8">
      <p className="mb-5 text-center text-[15px] font-extrabold text-[var(--c-ink)]">
        {settings.usage.title}
      </p>

      {/* Movil: fila deslizable. Siete tarjetas apiladas serian media pantalla
          de scroll para un remate que no exige decision alguna. */}
      <RevealGroup className="snap-row snap-row-sm sm:grid sm:grid-cols-4 sm:gap-3 sm:overflow-visible sm:p-0 lg:grid-cols-7" gap={0.04}>
        {cards.map((usage) => (
          <RevealItem key={usage.id} variants={fadeScaleIn}>
            <motion.figure
              initial="rest"
              whileHover="hover"
              variants={cardHoverSm}
              className="group flex h-full w-[116px] flex-col items-center gap-2 rounded-2xl border border-[var(--c-border)] bg-white p-2.5 sm:w-full"
            >
              <Media
                image={usage.image!}
                alt={usage.title}
                className="aspect-square w-full rounded-xl"
                imgClassName="object-contain transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                sizes="(max-width: 640px) 116px, (max-width: 1024px) 22vw, 150px"
              />
              <figcaption className="text-center text-[13px] leading-tight font-bold text-balance text-[var(--c-text)]">
                {usage.title}
              </figcaption>
            </motion.figure>
          </RevealItem>
        ))}
      </RevealGroup>

      {pills.length > 0 && (
        <RevealGroup className="mt-4 flex flex-wrap justify-center gap-2.5" gap={0.04}>
          {pills.map((usage) => (
            <RevealItem key={usage.id} variants={fadeScaleIn}>
              <motion.span
                initial="rest"
                whileHover="hover"
                variants={cardHoverSm}
                className="group flex items-center gap-2 rounded-full border border-[var(--c-border)] bg-white py-1.5 pr-4 pl-1.5"
              >
                <span
                  className="grid size-8 shrink-0 place-items-center rounded-full"
                  style={{ background: "var(--c-tint-accent)" }}
                >
                  <UsageArt title={usage.title} size={20} />
                </span>

                <span className="text-[13px] leading-none font-bold text-[var(--c-text)]">
                  {usage.title}
                </span>
              </motion.span>
            </RevealItem>
          ))}
        </RevealGroup>
      )}
    </div>
  );
}
