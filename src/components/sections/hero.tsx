"use client";

import { motion } from "framer-motion";
import { Sparkles, Truck } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { Media } from "@/components/ui/media";
import { OrderNote } from "@/components/ui/order-note";
import { HeroScene } from "@/components/ui/illustrations";
import { DecorativeCloud, DecorativeHeart, DecorativeStarFace } from "@/components/ui/decor";
import { fadeUp, slideLeft, stagger } from "@/lib/motion";
import type { Settings } from "@/lib/types";

export function Hero({ settings }: { settings: Settings }) {
  const { hero, brand } = settings;
  // El título se parte en tramos con "|" para controlar sus saltos de línea.
  const configuredHighlights = hero.titleHighlight
    .split("|")
    .map((part) => part.trim())
    .filter(Boolean);
  const configuredHeadline = `${hero.title} ${configuredHighlights.join(" ")}`.toLocaleLowerCase("es");
  // Si WordPress conserva un titular antiguo o demasiado largo, usamos una
  // versión breve y natural en lugar de añadir la keyword como línea aislada.
  const hasProductName =
    configuredHeadline.includes("etiquetas escolares") && configuredHeadline.split(/\s+/).length <= 9;
  const title = hasProductName ? hero.title : "Etiquetas escolares";
  const highlights = hasProductName
    ? configuredHighlights
    : ["para que todo vuelva a casa"];

  return (
    <section id="inicio" className="relative">
      <div className="grad-hero relative overflow-hidden">
        <div className="container-page relative z-10">
          <div className="grid items-center gap-6 pt-10 pb-14 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)] lg:gap-4 lg:pt-14 lg:pb-20">
            {/* Columna de texto ------------------------------------------ */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={stagger(0.05)}
              className="text-center lg:text-left"
            >
              {hero.badge ? (
                <motion.p
                  variants={fadeUp}
                  className="mb-3 text-[12px] font-extrabold tracking-[0.2em] text-[var(--c-lavender)] uppercase"
                >
                  {hero.badge}
                </motion.p>
              ) : null}

              <h1 className="h1-display text-center text-[var(--c-primary)] lg:text-left">
                <motion.span variants={fadeUp} className="block">
                  {title}
                </motion.span>
                {highlights.map((part, index) => (
                  <motion.span
                    key={part}
                    variants={fadeUp}
                    className={index === highlights.length - 1 ? "block" : ""}
                  >
                    {part}
                    {index === highlights.length - 1 ? null : " "}
                  </motion.span>
                ))}
              </h1>

              <motion.p
                variants={fadeUp}
                className="mt-4 max-w-[26rem] text-[17px] leading-relaxed text-pretty text-[var(--c-text)]"
              >
                {hero.subtitle}
              </motion.p>

              {/* El bloque de acción queda compacto y alineado con el texto. */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3.5 lg:justify-start">
                <motion.div variants={fadeUp} className="flex flex-col items-center gap-3 sm:flex-row">
                  <WhatsAppButton
                    source="hero"
                    variant="hero"
                    label={hero.ctaPrimary}
                    // El texto del botón lo edita el cliente y puede ya decir
                    // "por WhatsApp": el aria no lo repite.
                    ariaLabel={`${hero.ctaPrimary}: abrir WhatsApp con tu pedido`}
                  />
                  <LinkButton href="#disenos" variant="outline" className="px-5">
                    <Sparkles className="size-5 text-[var(--c-lavender)]" />
                    {hero.ctaSecondary}
                  </LinkButton>
                </motion.div>

              </div>

              <motion.div variants={fadeUp} className="mt-4 flex flex-col gap-2">
                <OrderNote
                  text={settings.whatsapp.previewNote}
                  className="justify-center text-center lg:justify-start lg:text-left"
                />
                {hero.deliveryNote ? (
                  <p className="flex items-center justify-center gap-1.5 text-center text-[13px] font-semibold text-[var(--c-muted)] lg:justify-start lg:text-left">
                    <Truck
                      className="size-4 shrink-0 text-[var(--c-lavender)]"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    {hero.deliveryNote}
                  </p>
                ) : null}
              </motion.div>

              {hero.note ? (
                <motion.p
                  variants={fadeUp}
                  className="mt-3 text-[14px] font-semibold text-[var(--c-muted)]"
                >
                  {hero.note}
                </motion.p>
              ) : null}
            </motion.div>

            {/* Composición de productos ---------------------------------- */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={slideLeft}
              className="hero-products relative -mx-2 lg:mx-0"
            >
              <div className="hero-products-gradient" aria-hidden="true" />
              <DecorativeCloud className="hero-decor-cloud" size={104} />
              <DecorativeStarFace className="hero-decor-star" size={70} />
              <DecorativeHeart className="hero-decor-heart" color="var(--c-sky)" size={26} />
              {hero.image?.url ? (
                <Media
                  image={hero.image}
                  alt={`Útiles escolares etiquetados con ${brand.logoText}`}
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="aspect-[3/2] w-full rounded-[32px]"
                />
              ) : (
                // Sin foto en WordPress, los productos se dibujan recortados
                // sobre el fondo, sin caja contenedora.
                <div className="relative mx-auto max-w-[600px]">
                  {/* Sombra de piso: sin ella la composición se ve plana. */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-[12%] bottom-[6%] h-[70px]"
                    style={{
                      background:
                        "radial-gradient(ellipse at center, rgba(47,65,128,0.15) 0%, rgba(47,65,128,0.05) 42%, transparent 72%)",
                      filter: "blur(14px)",
                    }}
                  />
                  <HeroScene className="relative" />
                </div>
              )}
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
