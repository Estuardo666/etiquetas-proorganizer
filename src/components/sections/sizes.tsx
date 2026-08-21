"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Ruler } from "lucide-react";
import { useState } from "react";
import { SectionHeader } from "@/components/ui/section-header";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { DecorativeBackground } from "@/components/ui/decor";
import { SizeArt } from "@/components/ui/illustrations";
import { Media } from "@/components/ui/media";
import { UsageStrip } from "@/components/sections/usage";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { useOrder } from "@/components/order-provider";
import { cardHover, decorPop, fadeScaleIn } from "@/lib/motion";
import { fillMessageTemplate, waMessageForSize } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import type { Settings, SizeItem, UsageItem, WpImage } from "@/lib/types";


/**
 * Un color de la paleta por tarjeta, en el orden del listado. Aqui el color no
 * es decoracion: son cuatro opciones entre las que hay que elegir una, y darle
 * a cada una su propia superficie las hace distinguibles de un vistazo y
 * faciles de senalar ("la azul").
 *
 * Son los tintes y no los tonos plenos: sobre el azul, el durazno y la lavanda
 * a plena saturacion el texto en azul marino se queda en 1,9:1. Los mismos
 * tres colores diluidos —los de las tarjetas de categoria del material
 * impreso— dan 7:1 largos y siguen distinguiendose entre si.
 */
const cardTints = [
  "var(--c-tint-positive)",
  "var(--c-tint-warm)",
  "var(--c-tint-purple)",
  "var(--c-tint-ink)",
];

/**
 * El mismo color de cada tarjeta, pero pleno: el CTA de la elegida se pinta
 * con él. Los tintes son 12-20 % de tono sobre blanco — sobre ellos, un
 * rótulo blanco no llega ni a 2:1. Mezclados con la tinta conservan el matiz
 * de la tarjeta ("el botón azul es el de la tarjeta azul") y suben el
 * contraste del blanco por encima de 4,5:1.
 */
const cardSolids = [
  "color-mix(in srgb, var(--c-positive) 55%, var(--c-ink))",
  // La naranja mezclada con la tinta da barro: pierde el matiz y deja de
  // parecerse a su tarjeta. El rojo de marca es el tono cálido saturado que
  // ya existe en la paleta y llega a 4,7:1 con rótulo blanco.
  "var(--c-highlight)",
  "color-mix(in srgb, var(--c-purple) 70%, var(--c-ink))",
  "var(--c-ink)",
];

/**
 * Diagrama a escala de cada tamaño, en `public/tamanos/comparativas`. Sirve
 * para lo que la foto de producto no puede: poner los cuatro rectángulos uno
 * al lado del otro y que la diferencia de tamaño se vea sin leer las medidas.
 */
const compareImage = (slug: string, title: string): WpImage => ({
  url: `/tamanos/comparativas/${slug}.webp`,
  alt: `Diagrama a escala del tamaño ${title}`,
  width: 920,
  height: 920,
});

/** Los usos llegan como frase suelta; se leen mejor separados por puntos. */
const useList = (uses: string) =>
  uses
    .split(/[\n,.·]+/)
    .map((use) => use.trim())
    .filter(Boolean)
    .join(" · ");

export function Sizes({
  settings,
  sizes,
  usages,
}: {
  settings: Settings;
  sizes: SizeItem[];
  usages: UsageItem[];
}) {
  const { selectedSize, selectSize } = useOrder();
  /**
   * Las fotos y los diagramas ocupan el mismo hueco de cada tarjeta: no es una
   * vista aparte sino el mismo contenido visto de otra manera, así que la
   * comparación no obliga a salir de la decisión que se está tomando.
   */
  const [comparing, setComparing] = useState(false);
  if (!sizes.length) return null;

  return (
    // `pb-fab`: sin ese respiro la fila de usos queda debajo del botón flotante.
    <section id="tamanos" className="surface-base section-y pb-fab relative overflow-hidden">
      <DecorativeBackground variant="sizes" />

      <div className="container-page relative z-10">
        <SectionHeader
          eyebrow={settings.sizes.eyebrow}
          eyebrowIcon="ruler"
          title={settings.sizes.title}
          subtitle={settings.sizes.subtitle}
        />

        {/*
          Botón terciario: sin relleno ni contorno pesado, un escalón por
          debajo del secundario. Cambia cómo se ve la sección, no la lleva a
          ninguna parte, y no debe competir con "Elegir este tamaño".
        */}
        <div className="-mt-2 mb-6 flex justify-center">
          <button
            type="button"
            onClick={() => setComparing((on) => !on)}
            aria-pressed={comparing}
            className={cn(
              "focus-ring inline-flex items-center gap-2 rounded-full px-4 py-2 text-[14px] font-bold transition-colors duration-200",
              comparing
                ? "bg-[var(--c-ink)]/10 text-[var(--c-ink)]"
                : "text-[var(--c-ink)]/70 hover:bg-[var(--c-ink)]/8 hover:text-[var(--c-ink)]",
            )}
          >
            <Ruler className="size-4" strokeWidth={2.5} aria-hidden="true" />
            {comparing ? "Ver fotos" : "Comparar tamaños"}
          </button>
        </div>

        {/* Cuatro tamaños: la muestra se ve a tamaño real y cada opción
            conserva espacio suficiente para sus usos. */}
        <RevealGroup
          // Movil: fila deslizable. Cuatro tarjetas altas apiladas convertian
          // la seccion en 2,2 pantallas de scroll para una sola decision.
          className="snap-row sm:mx-auto sm:grid sm:max-w-[1180px] sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:p-0 sm:[margin-inline:auto] lg:grid-cols-4 lg:gap-5"
          gap={0.05}
        >
          {sizes.map((size, index) => {
            const selected = selectedSize?.title === size.title;

            return (
              <RevealItem key={size.id} variants={fadeScaleIn} className="flex flex-col">
                <motion.button
                  type="button"
                  onClick={() => selectSize({ title: size.title, count: size.count })}
                  aria-pressed={selected}
                  aria-label={`Elegir tamaño ${size.title}, ${size.count} por hoja`}
                  initial="rest"
                  animate="rest"
                  whileHover="hover"
                  variants={cardHover}
                  className="focus-ring group flex h-full w-full flex-col items-center rounded-[24px] border-2 px-4 py-5 text-center"
                  // Seleccionada: borde de gris oscuro grueso sobre su propio
                  // color. El estado no cambia el fondo — si lo cambiara, la
                  // tarjeta elegida dejaria de ser reconocible como la que el
                  // usuario acaba de mirar.
                  style={{
                    background: cardTints[index % cardTints.length],
                    borderColor: selected ? "var(--c-ink)" : "transparent",
                  }}
                >
                  <h3
                    className="font-[family-name:var(--font-heading)] text-[22px] leading-tight font-semibold"
                    style={{ color: "var(--c-ink)" }}
                  >
                    {size.title}
                  </h3>
                  <p className="mt-1 text-[13px] font-bold text-[var(--c-text)]">{size.count}</p>
                  <p className="text-[13px] text-[var(--c-ink)]/75">{size.dims}</p>

                  {/* Muestra de etiqueta: nombre + personaje, con borde blanco
                      interior y sombra para que tenga profundidad. */}
                  {/*
                      Foto y diagrama comparten hueco, apilados: la que sale
                      encoge hasta desaparecer y la que entra crece un pelo
                      después, así el cambio se lee como un "pop out / pop in"
                      y no como un parpadeo. El retraso por tarjeta hace que la
                      fila cambie en cascada de izquierda a derecha.

                      La animación es CSS y no framer-motion a propósito: la
                      tarjeta es un `motion.button` con árbol de variantes, y
                      dentro de él las variantes del padre mandan sobre las de
                      los hijos — un `AnimatePresence` anidado aquí se queda
                      congelado a medio camino.
                  */}
                  <div className="relative my-4 aspect-[4/3] w-full">
                    {[false, true].map((isCompare) => {
                      const on = isCompare === comparing;
                      const image = isCompare ? compareImage(size.slug, size.title) : size.image;

                      return (
                        <div
                          key={isCompare ? "compare" : "photo"}
                          aria-hidden={!on}
                          className={cn(
                            "absolute inset-0 flex items-center justify-center transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                            on ? "scale-100 opacity-100" : "pointer-events-none scale-[0.6] opacity-0",
                          )}
                          // Solo la que entra espera; la que sale se va enseguida.
                          style={{ transitionDelay: on ? `${140 + index * 50}ms` : "0ms" }}
                        >
                          {image?.url ? (
                            // Foto de producto sobre fondo claro: `contain` para que
                            // la hoja de etiquetas no se recorte por los bordes.
                            <Media
                              image={image}
                              alt={
                                isCompare
                                  ? `Diagrama a escala del tamaño ${size.title}`
                                  : `Etiqueta ${size.title}`
                              }
                              className="aspect-[4/3] w-full rounded-2xl"
                              imgClassName={cn(
                                "object-contain",
                                // El diagrama viene con fondo blanco de lienzo:
                                // `multiply` lo funde con el tinte de la
                                // tarjeta (blanco x color = color) y deja solo
                                // el rectángulo a escala y sus cotas, sin el
                                // recuadro pálido que lo hacía parecer una
                                // captura pegada encima.
                                isCompare
                                  ? "mix-blend-multiply"
                                  : "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]",
                              )}
                              sizes="(max-width: 640px) 78vw, (max-width: 1024px) 44vw, 22vw"
                            />
                          ) : (
                            <span
                              className="card-shadow mx-auto flex w-full max-w-[230px] items-center justify-center gap-2 rounded-[18px] border-[3px] border-white px-3 py-2.5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:scale-[1.04]"
                              style={{ background: "#fff" }}
                            >
                              <span className="font-[family-name:var(--font-heading)] text-[17px] font-semibold text-[var(--c-ink)]">
                                {settings.sizes.sampleName}
                              </span>
                              <SizeArt title={size.title} index={index} size={24} />
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <p className="text-[12px] font-bold text-[var(--c-ink)]/75">
                    {settings.sizes.usesLabel}
                  </p>
                  <p className="mt-0.5 text-[13px] leading-snug text-pretty text-[var(--c-ink)]/85">
                    {useList(size.uses)}
                  </p>

                  <span
                    className={cn(
                      "mt-3 inline-flex min-h-[26px] items-center gap-1.5 rounded-full px-3 text-[12px] font-extrabold transition-opacity duration-200",
                      selected
                        ? "bg-[var(--c-ink)] text-white"
                        // En táctil no hay hover: la llamada a la acción se ve
                        // siempre y solo se esconde donde sí hay puntero.
                        : "text-[var(--c-ink)]/80 sm:opacity-0 sm:group-hover:opacity-100",
                    )}
                  >
                    {selected ? (
                      <>
                        <Check className="size-4" strokeWidth={3} aria-hidden="true" />
                        {settings.sizes.selectedLabel}
                      </>
                    ) : (
                      settings.sizes.ctaText
                    )}
                  </span>
                </motion.button>

                {/*
                  El pedido se cierra por chat: cada tamaño necesita su propia
                  puerta, con la cantidad ya escrita en el mensaje.

                  Solo aparece en la tarjeta elegida. Cuatro botones sólidos a
                  la vez compiten entre sí y con el CTA de la sección; uno
                  solo, en el color saturado de su tarjeta, es la consecuencia
                  visible de haber elegido. El hueco se reserva siempre para
                  que la rejilla no salte al cambiar de tarjeta.
                */}
                <span className="mt-2 flex min-h-[44px] justify-center">
                  <AnimatePresence initial={false}>
                    {selected && (
                      <motion.span
                        key="cta"
                        initial={{ opacity: 0, scale: 0.72, y: 6 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.86, y: 2, transition: { duration: 0.14 } }}
                        transition={decorPop}
                        className="inline-flex"
                      >
                        <WhatsAppButton
                          source="sizes"
                          variant="inline"
                          background={cardSolids[index % cardSolids.length]}
                          message={waMessageForSize(
                            settings.whatsapp.msgSizeTemplate,
                            size.title,
                            size.count,
                          )}
                          label={fillMessageTemplate(settings.sizes.orderCtaTemplate, {
                            title: size.title,
                          })}
                          ariaLabel={`Pedir por WhatsApp el tamaño ${size.title}, ${size.count} por hoja`}
                        />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* Los usos cierran la misma sección: el usuario elige tamaño y ve
            enseguida sobre qué objetos aplica, sin cambiar de bloque. */}
        <UsageStrip settings={settings} usages={usages} />
      </div>
    </section>
  );
}
