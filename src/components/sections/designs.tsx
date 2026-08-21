"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { RevealGroup, RevealItem, Reveal } from "@/components/ui/reveal";
import { DesignArt } from "@/components/ui/illustrations";
import { Media } from "@/components/ui/media";
import { CharacterMarquee } from "@/components/ui/character-marquee";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { useOrder } from "@/components/order-provider";
import { fadeScaleIn } from "@/lib/motion";
import { fillMessageTemplate, waMessageForDesign } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import type { DesignItem, Settings } from "@/lib/types";


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

/**
 * Un pastel por tarjeta, rotando. Estuvieron todas en blanco para que el color
 * significara solo "esta es la elegida", y una rejilla de seis cuadros blancos
 * se lee como una lista de casillas, no como un muestrario de diseños. La
 * selección la marcan ahora el borde azul, el anillo y el check, que son más
 * explícitos que un fondo un punto más saturado.
 */
const cardTints = [
  "var(--c-tint-positive)",
  "var(--c-tint-warm)",
  "var(--c-tint-purple)",
  "var(--c-tint-highlight)",
  "var(--c-tint-ink)",
  // Verde y no otro azul: la quinta y la sexta tarjeta caen juntas en la
  // segunda fila y dos grises azulados seguidos se leían como la misma.
  "color-mix(in srgb, var(--c-green) 14%, #ffffff)",
] as const;

/**
 * Panel de categorías. Ya no es una sección propia: vive dentro del primer tab
 * de `Showcase`, junto a las muestras reales y a la explicación de cómo se
 * personaliza. Los tres bloques respondían a la misma pregunta ("¿cómo se ve
 * esto?") y ocupaban 3,3 pantallas de móvil seguidas.
 */
export function DesignsPanel({ settings, designs }: { settings: Settings; designs: DesignItem[] }) {
  const { selectedDesign, selectDesign } = useOrder();
  const { designs: copy } = settings;
  if (!designs.length) return null;

  // La destacada cierra la rejilla a ancho completo: así ninguna fila queda
  // con huecos y la carta más cara es la última que se ve antes del CTA.
  const ordered = [...designs.filter((d) => !isFeatured(d.title)), ...designs.filter((d) => isFeatured(d.title))];

  return (
    <>
      {copy.subtitle ? (
        <Reveal className="mx-auto mb-6 max-w-2xl text-center text-[16px] leading-relaxed text-pretty text-[var(--c-muted)]">
          {copy.subtitle}
        </Reveal>
      ) : null}

        {/* Tres columnas, y la foto personalizada es un cuadro más: a ancho
            completo bajo las demás parecía otra sección y dejaba la fila
            anterior coja, con dos tarjetas sueltas centradas.
            Flex y no grid porque el número de categorías lo decide el cliente
            desde WordPress: con una rejilla fija la última fila queda con
            huecos muertos en cuanto no es múltiplo de tres. */}
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
              variants={fadeScaleIn}
              className="flex w-[calc(50%-0.5rem)] flex-col sm:w-[calc(33.333%-0.667rem)] lg:w-[calc(33.333%-0.834rem)]"
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
                )}
                style={{
                  background: cardTints[index % cardTints.length],
                  borderColor: selected
                    ? "var(--c-accent)"
                    : "color-mix(in srgb, var(--c-ink) 12%, transparent)",
                  boxShadow: selected
                    ? "0 0 0 3px color-mix(in srgb, var(--c-accent) 26%, transparent)"
                    : "none",
                }}
              >
                <div
                  className={cn(
                    "relative overflow-hidden rounded-[18px]",
                  )}
                >
                  {design.image?.url ? (
                    <motion.div variants={artVariants}>
                      {/* Las muestras son fotos cuadradas del conjunto —lonchera,
                          termo, cartuchera y cuaderno rotulados—, así que van a
                          sangre: `contain` dejaba dos bandas de fondo a los lados
                          dentro de una tarjeta que ya tiene su propio color. */}
                      <Media
                        image={design.image}
                        alt={`Diseño ${design.title}`}
                        className="aspect-[4/3] w-full rounded-[18px]"
                        imgClassName="object-cover"
                        sizes="(max-width: 640px) 45vw, 250px"
                      />
                    </motion.div>
                  ) : (
                    <div
                      className="grid aspect-[4/3] w-full place-items-center rounded-[18px] bg-white/55"
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

                <div>
                  {/* 19px: un 20 % más que los 16 de antes. El nombre es lo que
                      se busca al barrer la rejilla, y a 16 pesaba menos que el
                      pie de la tarjeta destacada. */}
                  <h3 className="flex items-center justify-center gap-1 pt-2 pb-0.5 text-center text-[19px] font-extrabold text-[var(--c-ink)] transition-transform duration-[260ms] group-hover:-translate-y-0.5">
                    {design.title}
                    {selected ? (
                      <Check
                        className="size-3.5 text-[var(--c-accent)]"
                        strokeWidth={3}
                        aria-hidden="true"
                      />
                    ) : (
                      <ArrowRight
                        className="size-3.5 -translate-x-1 text-[var(--c-accent)] opacity-0 transition-[translate,opacity] duration-[260ms] group-hover:translate-x-0 group-hover:opacity-100"
                        strokeWidth={2.6}
                        aria-hidden="true"
                      />
                    )}
                  </h3>

                  {featured ? (
                    <p className="px-1 pb-1 text-center text-[13px] leading-snug text-pretty text-[var(--c-muted)]">
                      {copy.featuredSub} {copy.featuredNote}
                    </p>
                  ) : null}
                </div>
              </motion.button>

            </RevealItem>
            );
          })}
        </RevealGroup>

        {/* Sub-bloque de personajes: la rejilla de arriba enseña categorías
            ("Foto personalizada", "Animales"...) y la pregunta que queda es
            "¿tienen el personaje de mi hijo?". La franja la responde sin
            añadir otra rejilla de tarjetas. */}
        <Reveal className="mt-10 lg:mt-12">
          <h3 className="mb-5 text-center font-[family-name:var(--font-heading)] text-[22px] leading-tight font-extrabold text-[var(--c-ink)] sm:text-[26px]">
            Personalice a su <span className="text-[var(--c-highlight-ink)]">gusto</span>
          </h3>
          <CharacterMarquee />
        </Reveal>

        {/* Un solo CTA para toda la sección, pero con el mensaje de la
            categoría elegida: siete botones verdes en la rejilla competirían
            entre sí y con el flotante. */}
        <Reveal className="mt-7 flex justify-center">
          <WhatsAppButton
            source="designs"
            variant="inline"
            message={
              selectedDesign
                ? waMessageForDesign(settings.whatsapp.msgDesignTemplate, selectedDesign)
                : undefined
            }
            label={
              selectedDesign
                ? fillMessageTemplate(copy.selectedCtaTemplate, { title: selectedDesign })
                : copy.ctaText
            }
            ariaLabel={
              selectedDesign
                ? `Pedir por WhatsApp etiquetas con diseño de ${selectedDesign}`
                : "Escribir por WhatsApp para ver más diseños"
            }
          />
        </Reveal>
    </>
  );
}
