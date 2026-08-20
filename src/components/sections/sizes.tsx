"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { DecorativeBackground } from "@/components/ui/decor";
import { SizeArt } from "@/components/ui/illustrations";
import { Media } from "@/components/ui/media";
import { UsageStrip } from "@/components/sections/usage";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { useOrder } from "@/components/order-provider";
import { cardHover, fadeScaleIn } from "@/lib/motion";
import { fillMessageTemplate, waMessageForSize } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import type { Settings, SizeItem, UsageItem } from "@/lib/types";


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
                  <div className="my-4 w-full">
                    {size.image?.url ? (
                      // Foto de producto sobre fondo claro: `contain` para que
                      // la hoja de etiquetas no se recorte por los bordes.
                      <Media
                        image={size.image}
                        alt={`Etiqueta ${size.title}`}
                        className="aspect-[4/3] w-full rounded-2xl"
                        imgClassName="object-contain transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
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

                {/* El pedido se cierra por chat: cada tamaño necesita su
                    propia puerta, con la cantidad ya escrita en el mensaje. */}
                <span className="mt-2 flex justify-center">
                  <WhatsAppButton
                    source="sizes"
                    variant="link"
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
