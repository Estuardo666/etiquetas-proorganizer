"use client";

import { motion } from "framer-motion";
import { Truck } from "lucide-react";
import { SecondaryButton } from "@/components/ui/secondary-button";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { Media } from "@/components/ui/media";
import { OrderNote } from "@/components/ui/order-note";
import { HeroScene } from "@/components/ui/illustrations";
import { InfiniteGrid } from "@/components/ui/infinite-grid";
import { DecorPop, DecorativeCloud, DecorativeHeart, DecorativeStarFace } from "@/components/ui/decor";
import { fadeScaleIn, slideLeft, stagger } from "@/lib/motion";
import type { Settings } from "@/lib/types";

export function Hero({ settings }: { settings: Settings }) {
  const { hero, brand } = settings;
  // El título se parte en tramos con "|" para controlar sus saltos de línea.
  const configuredHighlights = hero.titleHighlight
    .split("|")
    .map((part) => part.trim())
    .filter(Boolean);
  const title = hero.title;
  const highlights = configuredHighlights;

  return (
    <section id="inicio" className="relative">
      {/* El hero empieza donde empieza la página, no debajo del menú: sube la
          banda del menú con un margen negativo para que la rejilla y los
          degradados se vean por detrás de la píldora, que flota encima con su
          propio `z-50`. El relleno equivalente va en el contenido, más abajo. */}
      <div
        className="surface-base relative overflow-hidden"
        style={{ marginTop: "calc(-1 * var(--header-band))" }}
      >
        {/* Fondo animado. Va aquí y no en `section` para que quede recortado
            por el `overflow-hidden` de la superficie del hero, y por debajo del
            `z-10` del contenido. Los colores salen de la paleta editable. */}
        <InfiniteGrid
          gridColor="#0b4a75"
          gridOpacity={0.07}
          revealOpacity={0.28}
          revealRadius={260}
          direction="down-right"
          speedX={0.3}
          speedY={0.3}
          gradient1="#de2b22"
          gradient2="#f0913c"
          gradient3="#2e8fd0"
          gradientOpacity={0.4}
        />

        <div className="container-page relative z-10">
          <div
            className="grid items-center gap-6 pb-14 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)] lg:gap-4 lg:pb-20"
            style={{ paddingTop: "calc(var(--header-band) + 2.5rem)" }}
          >
            {/* Columna de texto ------------------------------------------ */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={stagger(0.05)}
              className="text-center lg:text-left"
            >
              {hero.badge ? (
                <motion.p
                  variants={fadeScaleIn}
                  className="mb-3 text-[12px] font-extrabold tracking-[0.2em] text-[var(--c-accent)] uppercase"
                >
                  {hero.badge}
                </motion.p>
              ) : null}

              <h1 className="h1-display text-center text-[var(--c-ink)] lg:text-left">
                {/* Primera línea en rojo de marca, como en el logotipo: la
                    palabra que nombra el producto se separa de la promesa que
                    la sigue. A 38 px o más el rojo cumple 3:1 sobre el crema;
                    en cuerpo pequeño no se usa. */}
                <motion.span variants={fadeScaleIn} className="block text-[var(--c-red)]">
                  {title}
                </motion.span>
                {highlights.map((part, index) => (
                  <motion.span
                    key={part}
                    variants={fadeScaleIn}
                    className={index === highlights.length - 1 ? "block" : ""}
                  >
                    {part}
                    {index === highlights.length - 1 ? null : " "}
                  </motion.span>
                ))}
              </h1>

              <motion.p
                variants={fadeScaleIn}
                className="mt-4 max-w-[26rem] text-[17px] leading-relaxed text-pretty text-[var(--c-text)]"
              >
                {hero.subtitle}
              </motion.p>

              {/* El bloque de acción queda compacto y alineado con el texto. */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3.5 lg:justify-start">
                <motion.div variants={fadeScaleIn} className="flex flex-col items-center gap-3 sm:flex-row">
                  <WhatsAppButton
                    source="hero"
                    variant="hero"
                    label={hero.ctaPrimary}
                    // El texto del botón lo edita el cliente y puede ya decir
                    // "por WhatsApp": el aria no lo repite.
                    ariaLabel={`${hero.ctaPrimary}: abrir WhatsApp con tu pedido`}
                  />
                  {/* Misma píldora que el principal, un escalón mas pequeña y
                      en morado: la jerarquia la marcan tamaño y color. */}
                  <SecondaryButton
                    href="#disenos"
                    ariaLabel={`${hero.ctaSecondary}: ir a la sección de diseños`}
                  >
                    {hero.ctaSecondary}
                  </SecondaryButton>
                </motion.div>

              </div>

              <motion.div variants={fadeScaleIn} className="mt-4 flex flex-col gap-2">
                <OrderNote
                  text={settings.whatsapp.previewNote}
                  className="justify-center text-center lg:justify-start lg:text-left"
                />
                {hero.deliveryNote ? (
                  <p className="flex items-center justify-center gap-1.5 text-center text-[13px] font-semibold text-[var(--c-muted)] lg:justify-start lg:text-left">
                    <Truck
                      className="size-4 shrink-0 text-[var(--c-accent)]"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    {hero.deliveryNote}
                  </p>
                ) : null}
              </motion.div>

              {hero.note ? (
                <motion.p
                  variants={fadeScaleIn}
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
              {/* Los tres adornos que acompañan a la composición de producto.
                  Solo desde `md`: en móvil la foto ya ocupa el ancho completo y
                  cualquier adorno cae encima del producto. */}
              <DecorPop className="absolute top-[3%] right-[30%] z-[2] hidden md:block">
                <DecorativeCloud size={104} />
              </DecorPop>
              <DecorPop className="absolute top-[8%] right-[3%] z-[2] hidden md:block" delay={0.08}>
                <DecorativeStarFace size={70} />
              </DecorPop>
              <DecorPop className="absolute top-[42%] right-[1%] z-[2] hidden md:block" delay={0.16}>
                <DecorativeHeart color="var(--c-pastel-ink)" size={26} />
              </DecorPop>
              {hero.image?.url ? (
                <Media
                  image={hero.image}
                  alt={hero.image.alt || `Útiles escolares etiquetados con ${brand.logoText}`}
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
                        "radial-gradient(ellipse at center, color-mix(in srgb, var(--c-ink) 15%, transparent) 0%, color-mix(in srgb, var(--c-ink) 5%, transparent) 42%, transparent 72%)",
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
