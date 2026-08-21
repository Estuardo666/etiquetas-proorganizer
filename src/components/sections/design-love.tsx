import Image from "next/image";
import { ImageIcon, Sticker, Type, Video } from "lucide-react";
import { SecondaryButton } from "@/components/ui/secondary-button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import {
  DecorPop,
  DecorativeHeart,
  DecorativeSparkle,
  DecorativeStarFace,
} from "@/components/ui/decor";
import { fadeScaleIn } from "@/lib/motion";
import { pipes } from "@/lib/utils";
import type { Settings } from "@/lib/types";

const featureIcons = { image: ImageIcon, sticker: Sticker, type: Type } as const;
const featureTones = [
  "bg-[var(--c-pastel-accent)]",
  "bg-[var(--c-pastel-highlight)]",
  "bg-[var(--c-pastel-positive)]",
] as const;

/**
 * Anatomía del producto: qué lleva la etiqueta, la guía en vídeo y la promesa
 * de que nada se imprime sin visto bueno.
 *
 * Va entre los diseños y los pasos, y ese sitio es el argumento de la sección:
 * el usuario acaba de ver muestras y lo que le frena es "¿y si sale feo?". La
 * nota de aprobación responde justo a eso y entrega el turno a "Cómo funciona",
 * donde aprobar es uno de los cuatro pasos. Promesa primero, mecánica después.
 *
 * Estuvo retirada porque decía lo mismo que el subtítulo de "Cómo funciona".
 * Se dice una sola vez y se dice aquí: ese subtítulo volvió a ser corto.
 */
export function Personalization({ settings }: { settings: Settings }) {
  const copy = settings.personalization;
  const features = pipes(copy.featureItems).map(([icon, title, description], index) => ({
    icon: featureIcons[icon as keyof typeof featureIcons] ?? ImageIcon,
    title: title ?? "",
    description: description ?? "",
    tone: featureTones[index % featureTones.length],
  }));

  return (
    <section
      id="personalizacion"
      aria-labelledby="personalizacion-title"
      className="section-y-tight relative overflow-hidden bg-white"
    >
      <DecorPop className="absolute top-[12%] right-[7%] hidden md:block">
        <DecorativeSparkle color="var(--c-pastel-ink)" size={34} />
      </DecorPop>
      <DecorPop className="absolute bottom-[14%] left-[5%] hidden lg:block" delay={0.1}>
        <DecorativeHeart color="var(--c-pastel-accent)" size={30} />
      </DecorPop>

      <div className="container-page relative z-10">
        <Reveal className="mx-auto mb-6 max-w-2xl text-center lg:mb-8">
          <h2 id="personalizacion-title" className="h2-display text-balance text-[var(--c-ink)]">
            {copy.title} <span className="text-[var(--c-highlight-ink)]">{copy.titleHighlight}</span>
          </h2>
          <p className="mx-auto mt-3 text-[16px] leading-relaxed text-pretty text-[var(--c-muted)]">
            {copy.subtitle}
          </p>
        </Reveal>

        <div className="mx-auto grid max-w-[1140px] grid-cols-1 items-center gap-x-8 gap-y-6 lg:gap-y-7 lg:grid-cols-[minmax(0,0.7fr)_minmax(300px,0.98fr)_minmax(230px,0.6fr)] lg:grid-rows-[auto_auto] xl:gap-x-10">
          <Reveal className="order-1 lg:col-start-1 lg:row-span-2 lg:row-start-1">
            {/*
              La hoja se estrecha en móvil: a 4/5 y ancho completo pasaba de
              470 px de alto ella sola, y es el bloque de apoyo de la sección,
              no su portada.
            */}
            <figure className="design-sheet-frame relative mx-auto aspect-[871/1058] w-full max-w-[300px] overflow-hidden sm:max-w-[420px] lg:max-w-none">
              {copy.image?.url ? (
                <Image
                  src={copy.image.url}
                  alt={copy.image.alt}
                  fill
                  sizes="(max-width: 640px) 300px, (max-width: 1200px) 42vw, 440px"
                  className="design-sheet-image object-contain object-center"
                />
              ) : null}
            </figure>
          </Reveal>

          <RevealGroup
            className="order-2 space-y-5 lg:col-start-2 lg:row-start-1 lg:flex lg:h-full lg:flex-col lg:justify-between lg:space-y-0 lg:self-stretch"
            gap={0.08}
          >
            {features.map((feature) => {
              const FeatureIcon = feature.icon;

              return (
                <RevealItem
                  key={feature.title}
                  variants={fadeScaleIn}
                  className="design-feature relative flex items-start gap-4"
                >
                  <span
                    className={`relative z-10 grid size-14 shrink-0 place-items-center rounded-full border-[3px] border-white text-[var(--c-ink)] sm:size-16 ${feature.tone}`}
                    aria-hidden="true"
                  >
                    <FeatureIcon className="size-6 sm:size-7" strokeWidth={2} />
                  </span>
                  <span className="pt-0.5">
                    <strong className="block font-[family-name:var(--font-heading)] text-[19px] leading-tight font-semibold text-[var(--c-ink)] sm:text-[21px]">
                      {feature.title}
                    </strong>
                    <span className="mt-1.5 block max-w-[34ch] text-[15px] leading-relaxed text-pretty text-[var(--c-muted)] sm:text-[16px]">
                      {feature.description}
                    </span>
                  </span>
                </RevealItem>
              );
            })}
          </RevealGroup>

          <Reveal
            as="article"
            delay={0.08}
            className="order-4 mx-auto w-full max-w-[430px] lg:col-start-3 lg:row-span-2 lg:row-start-1 lg:max-w-none"
          >
            {/*
              En móvil el ticket es una fila —icono a la izquierda, texto a la
              derecha— y solo se apila desde `lg`, donde tiene una columna
              propia. Centrado y en vertical costaba 380 px para tres líneas.
            */}
            <div className="tutorial-ticket relative flex items-center gap-4 overflow-hidden rounded-[28px] px-5 py-5 text-left sm:px-6 lg:flex-col lg:px-5 lg:py-6 lg:text-center">
              <span
                aria-hidden="true"
                className="absolute top-0 left-1/2 hidden h-8 w-24 -translate-x-1/2 -translate-y-3 rotate-2 bg-[color-mix(in_srgb,var(--c-accent)_24%,transparent)] lg:block"
              />

              <span
                className="grid size-14 shrink-0 place-items-center text-[var(--c-ink)] sm:size-16 lg:size-20"
                aria-hidden="true"
              >
                <Video className="size-11 sm:size-12 lg:size-16" strokeWidth={1.5} />
              </span>

              <div className="min-w-0 lg:contents">
                <p className="w-fit rounded-full bg-[var(--c-accent)] px-3 py-1 text-[11px] font-bold tracking-[0.06em] text-white uppercase lg:mx-auto lg:mt-1 lg:px-4 lg:text-[12px]">
                  {copy.guideBadge}
                </p>
                <h3 className="mt-2 font-[family-name:var(--font-heading)] text-[19px] leading-[1.12] font-semibold text-balance text-[var(--c-ink)] lg:mx-auto lg:mt-3 lg:max-w-[13ch] lg:text-[24px]">
                  {copy.guideTitle}
                </h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-pretty text-[var(--c-muted)] lg:mx-auto lg:mt-2 lg:max-w-[26ch]">
                  {copy.guideText}
                </p>

                <span className="mt-4 flex lg:mt-5 lg:justify-center">
                  <SecondaryButton href={copy.guideUrl} ariaLabel={copy.guideCta}>
                    {copy.guideCta}
                  </SecondaryButton>
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal className="order-3 lg:col-start-2 lg:row-start-2">
            <div className="approval-note relative mx-auto flex max-w-[430px] items-center gap-3 px-5 py-4 sm:px-6">
              <DecorativeStarFace className="shrink-0" size={58} />
              <p className="font-[family-name:var(--font-body)] text-[18px] leading-snug font-bold text-balance text-[var(--c-ink)] sm:text-[20px]">
                {copy.approvalText}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
