"use client";

import { SectionHeader } from "@/components/ui/section-header";
import { Icon } from "@/components/ui/icon";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { DecorativeBackground } from "@/components/ui/decor";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { fadeScaleIn } from "@/lib/motion";
import { cn, pipes } from "@/lib/utils";
import type { Settings } from "@/lib/types";

/**
 * Aversión a la pérdida, sin comparar a nadie: antes esta sección enfrentaba
 * "con marcador" contra "con etiquetas" con caritas felices/tristes, un tono
 * que se sentía agresivo hacia quien todavía no compra. La pregunta abierta
 * ("¿por qué se pierden?") deja que la propia clienta complete la respuesta,
 * y los precios de lo que se pierde la sostienen con números, no con burla.
 * Va después de Diseños (el usuario ya lo quiere) y justo antes de Promos
 * (llega el ahorro).
 */
export function Cost({ settings }: { settings: Settings }) {
  const { cost } = settings;

  const items = pipes(cost.prices)
    .map(([icon, price, label, flag]) => ({ icon, price, label, ours: flag === "nuestro" }))
    .filter((item) => item.price && item.label);

  return (
    <section id="costo" className="surface-base section-y relative overflow-hidden">
      <DecorativeBackground variant="testimonials" />

      <div className="container-page relative z-10">
        <SectionHeader eyebrow={cost.eyebrow} title={cost.title} subtitle={cost.subtitle} />

        <RevealGroup
          className="mx-auto mt-8 grid max-w-[920px] gap-3.5 sm:grid-cols-2 lg:grid-cols-4"
          gap={0.06}
        >
          {items.map((item) => (
            <RevealItem key={item.label} variants={fadeScaleIn}>
              <div
                className={cn(
                  "flex h-full flex-col items-center gap-2 rounded-[22px] border-2 px-4 py-6 text-center",
                  item.ours
                    ? "border-[var(--c-highlight)] bg-white"
                    : "border-[var(--c-border)] bg-[var(--c-tint-ink)]",
                )}
              >
                <span
                  className={cn(
                    "grid size-12 place-items-center rounded-full",
                    item.ours ? "bg-[var(--c-tint-accent)] text-[var(--c-accent)]" : "bg-white text-[var(--c-muted)]",
                  )}
                  aria-hidden="true"
                >
                  <Icon name={item.icon} className="size-6" />
                </span>
                <p
                  className={cn(
                    "font-[family-name:var(--font-heading)] text-[28px] leading-none font-bold",
                    item.ours ? "text-[var(--c-accent)]" : "text-[var(--c-ink)]",
                  )}
                >
                  {item.price}
                </p>
                <p className="text-[14px] leading-snug text-pretty text-[var(--c-muted)]">
                  {item.label}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        {cost.pricesNote ? (
          <Reveal className="mt-3 text-center text-[12.5px] text-[var(--c-muted)]">
            {cost.pricesNote}
          </Reveal>
        ) : null}

        {cost.closing ? (
          <Reveal className="mx-auto mt-6 max-w-[42ch] text-center text-[17px] font-semibold text-pretty text-[var(--c-ink)]">
            {cost.closing}
          </Reveal>
        ) : null}

        <Reveal className="mt-6 flex justify-center">
          <WhatsAppButton
            source="cost"
            label={cost.ctaText}
            ariaLabel={cost.ctaText}
          />
        </Reveal>
      </div>
    </section>
  );
}
