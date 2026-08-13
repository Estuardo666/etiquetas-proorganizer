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
import { cardHover, fadeUp } from "@/lib/motion";
import { waMessageForSize } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import type { Settings, SizeItem, UsageItem } from "@/lib/types";

/**
 * Tono pastel por tarjeta, en el orden del listado.
 *
 * `title` es una versión oscurecida del color de la tarjeta, no el color
 * pastel: el pastel sobre su propio fondo se queda en 2-3:1 y el nombre del
 * tamaño es justo el dato que hay que poder leer. El pastel sigue mandando en
 * fondo, borde y etiqueta.
 */
const palette = [
  { card: "#FFF1F5", border: "#FFD3E2", label: "#EBD9FB", title: "#C33C6D" },
  { card: "#FFFBEF", border: "#FFE6A8", label: "#FFD9E4", title: "#965D00" },
  { card: "#F7F4FF", border: "#DCD7FF", label: "#E3D5FA", title: "#5A48C7" },
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
    <section id="tamanos" className="section-y pb-fab relative overflow-hidden bg-[var(--c-bg)]">
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
          className="mx-auto grid max-w-[1180px] gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
          gap={0.05}
        >
          {sizes.map((size, index) => {
            const tone = palette[index % palette.length];
            const selected = selectedSize?.title === size.title;

            return (
              <RevealItem key={size.id} variants={fadeUp} className="flex flex-col">
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
                  style={{
                    background: tone.card,
                    // Seleccionado: borde lavanda fino, sin halo ni sombra.
                    borderColor: selected ? "#7C6CF2" : tone.border,
                  }}
                >
                  <h3
                    className="font-[family-name:var(--font-heading)] text-[22px] leading-tight font-semibold"
                    style={{ color: selected ? "var(--c-primary)" : tone.title }}
                  >
                    {size.title}
                  </h3>
                  <p className="mt-1 text-[13px] font-bold text-[var(--c-text)]">{size.count}</p>
                  <p className="text-[13px] text-[var(--c-muted)]">{size.dims}</p>

                  {/* Muestra de etiqueta: nombre + personaje, con borde blanco
                      interior y sombra para que tenga profundidad. */}
                  <div className="my-4 w-full">
                    {size.image?.url ? (
                      <Media
                        image={size.image}
                        alt={`Etiqueta ${size.title}`}
                        className="aspect-[5/2] w-full rounded-2xl border-2 border-white"
                        sizes="(max-width: 1024px) 50vw, 22vw"
                      />
                    ) : (
                      <span
                        className="card-shadow mx-auto flex w-full max-w-[230px] items-center justify-center gap-2 rounded-[18px] border-[3px] border-white px-3 py-2.5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:scale-[1.04]"
                        style={{ background: tone.label }}
                      >
                        <span className="font-[family-name:var(--font-heading)] text-[17px] font-semibold text-[var(--c-primary)]">
                          {settings.sizes.sampleName}
                        </span>
                        <SizeArt title={size.title} index={index} size={24} />
                      </span>
                    )}
                  </div>

                  <p className="text-[12px] font-bold text-[var(--c-muted)]">
                    {settings.sizes.usesLabel}
                  </p>
                  <p className="mt-0.5 text-[13px] leading-snug text-pretty text-[var(--c-muted)]">
                    {useList(size.uses)}
                  </p>

                  <span
                    className={cn(
                      "mt-3 inline-flex min-h-[26px] items-center gap-1.5 rounded-full px-3 text-[12px] font-extrabold transition-opacity duration-200",
                      selected
                        ? "bg-[var(--c-lavender)] text-white"
                        // En táctil no hay hover: la llamada a la acción se ve
                        // siempre y solo se esconde donde sí hay puntero.
                        : "text-[var(--c-muted)] sm:opacity-0 sm:group-hover:opacity-100",
                    )}
                  >
                    {selected ? (
                      <>
                        <Check className="size-4" strokeWidth={3} aria-hidden="true" />
                        Seleccionado
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
                    message={waMessageForSize(size.title, size.count)}
                    label={`Pedir tamaño ${size.title}`}
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
