"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { RevealGroup, RevealItem, Reveal } from "@/components/ui/reveal";
import { DecorativeBackground } from "@/components/ui/decor";
import { DesignArt } from "@/components/ui/illustrations";
import { Media } from "@/components/ui/media";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { useOrder } from "@/components/order-provider";
import { fadeUp } from "@/lib/motion";
import { waMessageForDesign } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import type { DesignItem, Settings } from "@/lib/types";

/** Fondo temático de cada categoría, en el orden del listado. */
const tints = ["#E7F7EC", "#E7E0FF", "#E2F0FF", "#FFF6DA", "#FFEAF3", "#EDE6FF"];
const borders = ["#BFE7CD", "#CFC2FA", "#BEDDF7", "#FFE5A6", "#FFCBE0", "#D5C9FA"];

const ease = [0.22, 1, 0.36, 1] as const;

/** La tarjeta y su ilustración se animan juntas desde un único hover. */
const cardVariants: Variants = {
  rest: { y: 0, scale: 1 },
  hover: { y: -6, scale: 1.015, transition: { duration: 0.25, ease } },
};

const artVariants: Variants = {
  rest: { scale: 1, rotate: 0 },
  hover: { scale: 1.06, rotate: -1, transition: { duration: 0.35, ease } },
};

/** La foto personalizada es el producto más diferenciado: se detecta aquí. */
const isFeatured = (title: string) => /foto/i.test(title);

export function Designs({ settings, designs }: { settings: Settings; designs: DesignItem[] }) {
  const { selectedDesign, selectDesign } = useOrder();
  const { designs: copy } = settings;
  if (!designs.length) return null;

  // La destacada cierra la rejilla a ancho completo: así ninguna fila queda
  // con huecos y la carta más cara es la última que se ve antes del CTA.
  const ordered = [...designs.filter((d) => !isFeatured(d.title)), ...designs.filter((d) => isFeatured(d.title))];

  return (
    <section id="disenos" className="grad-designs section-y relative overflow-hidden">
      <DecorativeBackground variant="designs" />

      <div className="container-page relative z-10">
        <SectionHeader
          eyebrow={copy.eyebrow}
          eyebrowIcon="sparkles"
          title={copy.title}
          subtitle={copy.subtitle}
        />

        {/* 3 columnas: con 7 diseños la última fila queda con una sola
            tarjeta, centrada por el propio grid. `max-w` evita que, al ser
            solo 3, cada tarjeta se estire al ancho completo de sección y el
            ícono quede perdido en una caja enorme. */}
        {/* Flex y no grid: el número de categorías lo decide el cliente desde
            WordPress, y con una rejilla fija la última fila queda con huecos
            muertos en cuanto no es múltiplo de tres. Así siempre se centra. */}
        <RevealGroup
          className="mx-auto flex max-w-[820px] flex-wrap justify-center gap-4 lg:gap-5"
          gap={0.05}
        >
          {ordered.map((design, index) => {
            const selected = selectedDesign === design.title;
            const featured = isFeatured(design.title);

            return (
            <RevealItem
              key={design.id}
              variants={fadeUp}
              className={
                featured
                  ? // `flex-col`: sin esto el botón se estira a toda la altura
                    // del item y empuja su CTA fuera, encima del de la sección.
                    "flex w-full flex-col"
                  : "w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.667rem)] lg:w-[calc(33.333%-0.834rem)]"
              }
            >
              {/* Botón, no `article`: la flecha del hover prometía una acción
                  que la tarjeta no tenía. Ahora elegir el diseño es la acción,
                  y viaja en el mensaje de WhatsApp junto al tamaño. */}
              <motion.button
                type="button"
                onClick={() => selectDesign(design.title)}
                aria-pressed={selected}
                initial="rest"
                whileHover="hover"
                animate="rest"
                variants={cardVariants}
                aria-label={`Elegir el diseño ${design.title}`}
                className={cn(
                  "focus-ring group h-full w-full overflow-hidden rounded-[24px] border-2 p-1.5 text-left transition-[border-color,box-shadow] duration-[260ms]",
                  featured && "sm:flex sm:items-center sm:gap-7 sm:p-3",
                )}
                style={{
                  background: tints[index % tints.length],
                  borderColor: selected
                    ? "#7C6CF2"
                    : featured
                      ? "var(--c-lavender)"
                      : borders[index % borders.length],
                  boxShadow: "none",
                }}
              >
                <div
                  className={cn(
                    "relative overflow-hidden rounded-[18px]",
                    featured && "sm:w-[210px] sm:shrink-0",
                  )}
                >
                  {design.image?.url ? (
                    <motion.div variants={artVariants}>
                      {/* Las muestras son etiquetas cuadradas sobre blanco:
                          `contain` las enseña enteras, `cover` les cortaría el
                          nombre. */}
                      <Media
                        image={design.image}
                        alt={`Diseño ${design.title}`}
                        className="aspect-[4/3] w-full rounded-[18px] bg-white"
                        imgClassName="object-contain p-1"
                        sizes="(max-width: 640px) 45vw, 16vw"
                      />
                    </motion.div>
                  ) : (
                    <div
                      className="grid aspect-[4/3] w-full place-items-center rounded-[18px] bg-white/45"
                      role="img"
                      aria-label={`Diseño ${design.title}`}
                    >
                      {/* La ilustración ocupa ~70 % de la tarjeta: el marco
                          blanco interior es solo un respiro. */}
                      <motion.span variants={artVariants} className="block">
                        <DesignArt title={design.title} size={92} />
                      </motion.span>
                    </div>
                  )}

                  {design.badge ? (
                    <span className="absolute top-1.5 left-1.5 rounded-full bg-white/90 px-2 py-0.5 text-[12px] font-extrabold text-[var(--c-accent-ink)]">
                      {design.badge}
                    </span>
                  ) : null}
                </div>

                <div className={cn(featured && "sm:min-w-0 sm:flex-1 sm:pr-2")}>
                  <h3
                    className={cn(
                      "flex items-center justify-center gap-1 pt-2 pb-0.5 text-center font-extrabold text-[var(--c-primary)] transition-transform duration-[260ms] group-hover:-translate-y-0.5",
                      featured
                        ? "font-[family-name:var(--font-heading)] text-[22px] font-semibold sm:justify-start sm:pt-0 sm:text-left"
                        : "text-[12.5px]",
                    )}
                  >
                    {design.title}
                    {selected ? (
                      <Check
                        className="size-3.5 text-[var(--c-lavender)]"
                        strokeWidth={3}
                        aria-hidden="true"
                      />
                    ) : (
                      <ArrowRight
                        className="size-3.5 -translate-x-1 text-[var(--c-lavender)] opacity-0 transition-[translate,opacity] duration-[260ms] group-hover:translate-x-0 group-hover:opacity-100"
                        strokeWidth={2.6}
                        aria-hidden="true"
                      />
                    )}
                  </h3>

                  {featured ? (
                    <p className="pb-1 text-center text-[13.5px] leading-snug text-pretty text-[var(--c-muted)] sm:text-left">
                      {copy.featuredSub} {copy.featuredNote}
                    </p>
                  ) : null}
                </div>
              </motion.button>

            </RevealItem>
            );
          })}
        </RevealGroup>

        {/* Un solo CTA para toda la sección, pero con el mensaje de la
            categoría elegida: siete botones verdes en la rejilla competirían
            entre sí y con el flotante. */}
        <Reveal className="mt-7 flex justify-center">
          <WhatsAppButton
            source="designs"
            variant="inline"
            message={selectedDesign ? waMessageForDesign(selectedDesign) : undefined}
            label={selectedDesign ? `Pedir diseño ${selectedDesign}` : copy.ctaText}
            ariaLabel={
              selectedDesign
                ? `Pedir por WhatsApp etiquetas con diseño de ${selectedDesign}`
                : "Escribir por WhatsApp para ver todos los diseños"
            }
          />
        </Reveal>
      </div>
    </section>
  );
}
