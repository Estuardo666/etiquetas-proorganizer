import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { WhatsAppIcon } from "@/components/ui/icon";
import { DecorativeHeart } from "@/components/ui/decor";
import type { Settings } from "@/lib/types";

/**
 * Cierre humano justo antes del pie: quién hace las etiquetas, qué pasa si algo
 * sale mal y por dónde se empieza. Es la última objeción de la página —
 * "¿quién está detrás de esto?" — y por eso va después de la FAQ.
 *
 * Dos columnas asimétricas: la persona pesa más que las dos tarjetas de
 * servicio, así que ocupa más ancho y es la única con foto. Las tarjetas de la
 * derecha van en gris y morado de la paleta, nunca en un gris nuevo.
 */
export function Founder({ settings }: { settings: Settings }) {
  const { founder } = settings;

  return (
    <section id="daniella" className="surface-base section-y">
      <div className="container-page">
        <div className="mx-auto grid max-w-[1120px] grid-cols-1 items-stretch gap-4 pt-12 sm:pt-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-5">
          {/* Persona -------------------------------------------------- */}
          <Reveal as="article" className="h-full">
            <div className="relative flex h-full flex-col items-start gap-3 rounded-[28px] sm:flex-row sm:items-end sm:gap-6 border border-[var(--c-border)] bg-white/85 p-4 sm:gap-6 sm:p-5">
              <DecorativeHeart
                className="pointer-events-none absolute -top-2 right-4 hidden lg:block"
                color="var(--c-pastel-highlight)"
                size={34}
              />

              {/* El recorte se sale de la tarjeta por arriba: es la persona, no
                  una foto de catálogo, y el borde recto la devolvía al catálogo.
                  El hueco lo abre el `pt` de la rejilla, no un margen negativo
                  suelto: así la sección de arriba nunca se solapa. */}
              <div className="relative -mt-16 h-[228px] w-[168px] shrink-0 self-start sm:mt-0 sm:h-auto sm:w-[47%] sm:max-w-[272px] sm:self-stretch">
                {/* Absoluta y no en el flujo: un margen negativo sobre un item
                    alineado abajo no levanta nada, solo le quita altura. Anclada
                    al suelo de la tarjeta y estirada hacia arriba, el recorte
                    sobresale siempre lo mismo mida lo que mida el texto. */}
                <div className="absolute inset-0 sm:-top-20 sm:inset-x-0 sm:bottom-0">
                  {founder.photo?.url ? (
                    <Image
                      src={founder.photo.url}
                      alt={founder.photoAlt || founder.photo.alt}
                      fill
                      sizes="(max-width: 640px) 168px, 272px"
                      className="object-contain object-bottom drop-shadow-[0_10px_18px_rgb(38_38_38/0.14)]"
                    />
                  ) : null}
                </div>
              </div>

              <div className="relative z-10 min-w-0 sm:self-center sm:pb-1">
                <h2 className="font-[family-name:var(--font-heading)] text-[24px] leading-tight font-semibold text-[var(--c-ink)] sm:text-[27px]">
                  {founder.title}
                </h2>
                <p className="mt-2 max-w-[32ch] text-[15.5px] leading-relaxed text-pretty text-[var(--c-muted)]">
                  {founder.bio}
                </p>
                {/* Firma escaneada, no tipografía manuscrita: la firma real es
                    la prueba de que detrás hay una persona. Decorativa — el
                    nombre ya está en el título, así que no repite texto. */}
                {founder.signature?.url ? (
                  <Image
                    src={founder.signature.url}
                    alt=""
                    aria-hidden="true"
                    width={founder.signature.width || 200}
                    height={founder.signature.height || 75}
                    sizes="(max-width: 640px) 160px, 200px"
                    className="mt-3 h-auto w-[160px] max-w-full sm:w-[200px]"
                  />
                ) : null}
              </div>
            </div>
          </Reveal>

          {/* Garantía y arranque -------------------------------------- */}
          <div className="grid h-full grid-rows-1 gap-4 sm:grid-rows-2 lg:gap-5">
            <Reveal as="article" delay={0.06} className="h-full">
              <div className="flex h-full items-center gap-4 rounded-[28px] bg-[var(--c-tint-ink)] p-5 sm:gap-5 sm:p-6">
                <span
                  className="grid size-14 shrink-0 place-items-center rounded-full bg-white/70 text-[var(--c-ink)] sm:size-16"
                  aria-hidden="true"
                >
                  <ShieldCheck className="size-8 sm:size-9" strokeWidth={2} />
                </span>
                <div className="min-w-0">
                  <h3 className="text-[17px] leading-tight font-extrabold text-[var(--c-ink)] sm:text-[19px]">
                    {founder.guaranteeTitle}
                  </h3>
                  <p className="mt-1.5 max-w-[40ch] text-[15px] leading-snug text-pretty text-[var(--c-muted)]">
                    {founder.guaranteeText}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal as="article" delay={0.12} className="h-full">
              <div className="flex h-full items-center gap-4 rounded-[28px] bg-[var(--c-tint-accent)] p-5 sm:gap-5 sm:p-6">
                <span
                  className="grid size-14 shrink-0 place-items-center rounded-full bg-white/70 text-[var(--c-ink)] sm:size-16"
                  aria-hidden="true"
                >
                  <WhatsAppIcon className="size-8 sm:size-9" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-[17px] leading-tight font-extrabold text-[var(--c-ink)] sm:text-[19px]">
                    {founder.ctaTitle}
                  </h3>
                  <p className="mt-1.5 max-w-[38ch] text-[15px] leading-snug text-pretty text-[var(--c-muted)]">
                    {founder.ctaText}
                  </p>
                  <div className="mt-3.5">
                    <WhatsAppButton
                      source="finalCta"
                      carrySelection
                      variant="inline"
                      ariaLabel={founder.ctaButton}
                      label={founder.ctaButton}
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
