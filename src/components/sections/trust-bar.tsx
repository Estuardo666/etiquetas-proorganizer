"use client";

import { motion } from "framer-motion";
import { BenefitArt } from "@/components/ui/illustrations";
import { SectionHeader } from "@/components/ui/section-header";
import { StatsRow } from "@/components/sections/stats";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { cardHover, fadeScaleIn } from "@/lib/motion";
import { cn, pipes } from "@/lib/utils";
import type { Settings } from "@/lib/types";

/** El circulo del icono alterna los dos tintes de la paleta, nada mas. */
const tints = ["var(--c-tint-accent)", "var(--c-tint-highlight)"];

/**
 * Franja de beneficios: cinco tarjetas bajas con icono ilustrado y texto muy
 * breve. Los envíos no van aquí: ya están en la barra superior.
 */
export function TrustBar({ settings }: { settings: Settings }) {
  const { trust } = settings;
  const items = pipes(trust.items).slice(0, 5);
  if (!items.length) return null;

  return (
    <section className="section-y-sm">
      <div className="container-page">
        <SectionHeader eyebrow={trust.eyebrow} eyebrowIcon="shield" title={trust.title} />

        {/* Tantas columnas como beneficios: cinco columnas con cuatro
            tarjetas dejarían un hueco a la derecha. */}
        <RevealGroup
          className={cn(
            // Movil: fila deslizable. Cinco tarjetas en rejilla de dos columnas
            // eran tres filas de confianza antes de ver un solo producto.
            "snap-row snap-row-sm sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:p-0 sm:[margin-inline:0]",
            items.length >= 5 ? "lg:grid-cols-5" : items.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
          )}
          gap={0.05}
        >
          {items.map(([icon, title, desc], index) => (
            <RevealItem
              key={index}
              variants={fadeScaleIn}
              className={cn(
                "w-[62%] shrink-0 sm:w-auto",
                index === items.length - 1 && items.length % 2 === 1
                  ? "sm:col-span-1"
                  : undefined,
              )}
            >
              {/* Hover en su propio motion.div: separado de la animación de
                  entrada, para que el gesto de hover siempre tenga su propia
                  transición sin depender de en qué punto va el fadeScaleIn. */}
              <motion.div
                initial="rest"
                animate="rest"
                whileHover="hover"
                variants={cardHover}
                className="card-base flex min-h-[158px] flex-col items-center px-4 pt-6 pb-5 text-center"
              >
                <span
                  className="card-art mb-3 grid size-[58px] place-items-center rounded-full"
                  style={{ background: tints[index % tints.length] }}
                >
                  <BenefitArt name={icon} size={34} />
                </span>
                <h3 className="text-[14.5px] leading-tight font-extrabold text-balance text-[var(--c-ink)]">
                  {title}
                </h3>
                {desc ? (
                  <p className="mt-1.5 text-[12.5px] leading-snug text-pretty text-[var(--c-muted)]">
                    {desc}
                  </p>
                ) : null}
              </motion.div>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Las cifras cierran la misma sección: beneficio arriba, prueba
            abajo, un solo bloque de confianza en toda la página. */}
        <StatsRow stats={settings.stats} />
      </div>
    </section>
  );
}
