"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import { RevealGroup, RevealItem, Reveal } from "@/components/ui/reveal";
import { DecorativeBackground } from "@/components/ui/decor";
import { ArtGift, ArtSheets, Mascot } from "@/components/ui/illustrations";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { OrderNote } from "@/components/ui/order-note";
import { cardHover, fadeUp, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { PromoItem, Settings } from "@/lib/types";

const promoArt = [ArtSheets, ArtGift];

/** Sticker girado de la esquina; mismo componente para las tres tarjetas. */
function Sticker({ label, color }: { label: string; color: string }) {
  return (
    <motion.span
      initial={{ rotate: -14, opacity: 0 }}
      whileInView={{ rotate: -8, opacity: 1 }}
      viewport={viewportOnce}
      transition={{ duration: 0.4 }}
      // 12px es el suelo del texto en mayúsculas: por debajo, el espaciado de
      // letras del sticker lo vuelve difícil de leer en móvil.
      className="absolute -top-3 -left-2 rounded-full px-3 py-1 text-[12px] leading-tight font-extrabold text-white uppercase"
      style={{ background: color }}
    >
      {label}
    </motion.span>
  );
}

/**
 * Precio y promociones: una sola cabecera y tres tarjetas del mismo tamaño y
 * tratamiento. La mascota vive en el fondo del panel, no encima de una tarjeta.
 */
export function Pricing({ settings, promos }: { settings: Settings; promos: PromoItem[] }) {
  const { pricing } = settings;

  return (
    // `pb-fab`: el aviso de condiciones cerraba justo bajo el botón flotante.
    <section
      id="promociones"
      className="section-y pb-fab relative overflow-hidden bg-[var(--c-bg)]"
    >
      <div className="container-page relative z-10">
        <SectionHeader
          eyebrow={pricing.eyebrow}
          eyebrowIcon="badge"
          title={pricing.promoTitle}
        />

        <Reveal>
          <div className="grad-promo relative overflow-hidden rounded-[30px] border-2 border-[#FFE6A8] px-5 py-7 sm:px-8 lg:px-10">
            <DecorativeBackground variant="promo" parallax={false} />
            <Mascot
              className="pointer-events-none absolute bottom-0 left-2 hidden opacity-90 lg:block"
              size={96}
            />

            <RevealGroup
              className="relative z-10 grid gap-5 md:grid-cols-3"
              gap={0.06}
            >
              {/* Precio base ------------------------------------------- */}
              <RevealItem variants={fadeUp} className="relative flex">
                <div className="card-base relative flex h-full w-full flex-col items-center justify-center border-white bg-white px-5 py-6 text-center">
                  <Sticker label={pricing.priceSticker} color="var(--c-primary)" />
                  <p className="font-[family-name:var(--font-heading)] text-[19px] leading-none font-medium text-[var(--c-primary)]">
                    {pricing.priceTitle}
                  </p>
                  <p className="mt-2 flex items-end justify-center gap-2">
                    <span className="font-[family-name:var(--font-heading)] text-[52px] leading-none font-semibold text-[var(--c-primary)]">
                      {pricing.priceValue}
                    </span>
                    <span className="pb-1.5 text-[15px] font-bold text-[var(--c-muted)]">
                      {pricing.priceSuffix}
                    </span>
                  </p>
                  <p className="mt-2 text-[13px] text-[var(--c-muted)]">{pricing.priceSub}</p>
                </div>
              </RevealItem>

              {/* Promociones ------------------------------------------- */}
              {promos.map((promo, index) => {
                const Art = promoArt[index % promoArt.length];

                return (
                  <RevealItem key={promo.id} variants={fadeUp} className="relative flex">
                    <motion.article
                      initial="rest"
                      animate="rest"
                      whileHover="hover"
                      variants={cardHover}
                      className="card-base relative flex h-full w-full flex-col items-center justify-center border-white bg-white px-5 py-6 text-center"
                    >
                      <Sticker
                        label={promo.title}
                        color={promo.featured ? "var(--c-lavender-ink)" : "var(--c-accent-ink)"}
                      />

                      <span className="card-art absolute top-3 right-3 opacity-90">
                        <Art size={44} />
                      </span>

                      {promo.post ? (
                        <p className="font-[family-name:var(--font-heading)] text-[19px] leading-none font-medium text-[var(--c-primary)]">
                          {promo.post}
                        </p>
                      ) : null}

                      <p
                        className={cn(
                          "mt-2 font-[family-name:var(--font-heading)] text-[38px] leading-none font-semibold",
                          promo.featured
                            ? "text-[var(--c-lavender-ink)]"
                            : "text-[var(--c-accent-ink)]",
                        )}
                      >
                        {promo.highlight}
                      </p>

                      <p className="mt-2 max-w-[15rem] text-[13px] leading-snug text-[var(--c-muted)]">
                        {promo.pre}
                      </p>
                    </motion.article>
                  </RevealItem>
                );
              })}
            </RevealGroup>

            <div className="relative z-10 mt-6 flex flex-col items-center gap-3">
              <WhatsAppButton
                source="promos"
                label={pricing.ctaText}
                ariaLabel="Escribir por WhatsApp para aprovechar la promo de 4ta hoja gratis"
              />
              <OrderNote text={settings.whatsapp.previewNote} />
              {pricing.note ? (
                <p className="max-w-[46rem] text-center text-[12.5px] leading-snug text-[var(--c-muted)]">
                  {pricing.note}
                </p>
              ) : null}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
