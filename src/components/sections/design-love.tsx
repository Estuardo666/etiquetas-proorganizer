import Image from "next/image";
import { CirclePlay, ImageIcon, Sticker, Type, Video } from "lucide-react";
import labelSheet from "../../../public/hoja de etiquetas.png";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import {
  DecorativeHeart,
  DecorativeSparkle,
  DecorativeStarFace,
} from "@/components/ui/decor";
import { fadeUp } from "@/lib/motion";

const features = [
  {
    icon: ImageIcon,
    title: "Imágenes que les encantan",
    description: "Incluimos su personaje favorito, el logo de la escuela o una foto.",
    tone: "bg-[var(--c-pink)]",
  },
  {
    icon: Sticker,
    title: "Fondo blanco y adhesivo resistente",
    description: "Cada diseño se lee con claridad y está hecho para acompañar el uso diario.",
    tone: "bg-[var(--c-yellow)]",
  },
  {
    icon: Type,
    title: "Su nombre, siempre visible",
    description: "Usamos letras oscuras y legibles para encontrar todo de un vistazo.",
    tone: "bg-[var(--c-lilac)]",
  },
] as const;

/**
 * Explica la anatomía del producto entre la elección del diseño y las
 * fotografías reales: elección → comprensión → prueba.
 */
export function DesignLove() {
  return (
    <section
      id="personalizacion"
      aria-labelledby="personalizacion-title"
      className="grad-love section-y relative overflow-hidden"
    >
      <DecorativeSparkle
        className="absolute top-[12%] right-[7%] hidden md:block"
        color="var(--c-sky)"
        size={34}
      />
      <DecorativeHeart
        className="absolute bottom-[14%] left-[5%] hidden lg:block"
        color="var(--c-pink)"
        size={30}
      />

      <div className="container-page relative z-10">
        <Reveal className="mx-auto mb-8 max-w-4xl text-center lg:mb-11">
          <h2
            id="personalizacion-title"
            className="h2-display text-balance text-[var(--c-primary)]"
          >
            Diseñamos sus etiquetas <span className="text-[var(--c-lavender-ink)]">con amor</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[16px] leading-relaxed text-pretty text-[var(--c-muted)]">
            Cada detalle se adapta para que sus cosas sean fáciles de reconocer y difíciles de
            perder.
          </p>
        </Reveal>

        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-x-8 gap-y-7 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.9fr)_minmax(250px,0.58fr)] lg:grid-rows-[auto_auto] xl:gap-x-12">
          <Reveal className="order-1 lg:col-start-1 lg:row-span-2 lg:row-start-1">
            <figure className="design-sheet-frame relative mx-auto aspect-[4/5] w-full max-w-[460px] overflow-hidden lg:max-w-none">
              <Image
                src={labelSheet}
                alt="Hoja de etiquetas personalizadas con nueve diseños y el nombre Sofía R."
                fill
                placeholder="blur"
                sizes="(max-width: 768px) calc(100vw - 48px), (max-width: 1200px) 42vw, 440px"
                className="design-sheet-image object-cover object-center"
              />
            </figure>
          </Reveal>

          <RevealGroup
            className="order-2 space-y-6 lg:col-start-2 lg:row-start-1 lg:space-y-7"
            gap={0.08}
          >
            {features.map((feature) => {
              const FeatureIcon = feature.icon;

              return (
                <RevealItem
                  key={feature.title}
                  variants={fadeUp}
                  className="design-feature relative flex items-start gap-4"
                >
                  <span
                    className={`relative z-10 grid size-14 shrink-0 place-items-center rounded-full border-[3px] border-white text-[var(--c-primary)] sm:size-16 ${feature.tone}`}
                    aria-hidden="true"
                  >
                    <FeatureIcon className="size-6 sm:size-7" strokeWidth={2} />
                  </span>
                  <span className="pt-0.5">
                    <strong className="block font-[family-name:var(--font-heading)] text-[19px] leading-tight font-semibold text-[var(--c-primary)] sm:text-[21px]">
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
            className="order-4 mx-auto w-full max-w-[380px] lg:col-start-3 lg:row-span-2 lg:row-start-1 lg:max-w-none"
          >
            <div className="tutorial-ticket relative overflow-hidden rounded-[28px] px-5 py-7 text-center sm:px-7 lg:px-5">
              <span
                aria-hidden="true"
                className="absolute top-0 left-1/2 h-8 w-24 -translate-x-1/2 -translate-y-3 rotate-2 bg-[rgb(139_124_246/0.28)]"
              />

              <span className="mx-auto grid size-24 place-items-center text-[var(--c-primary)]" aria-hidden="true">
                <Video className="size-20" strokeWidth={1.5} />
              </span>

              <p className="mx-auto mt-1 w-fit rounded-full bg-[var(--c-lavender)] px-4 py-1 text-[12px] font-bold tracking-[0.06em] text-white uppercase">
                Guía rápida
              </p>
              <h3 className="mx-auto mt-4 max-w-[12ch] font-[family-name:var(--font-heading)] text-[25px] leading-[1.08] font-semibold text-balance text-[var(--c-primary)] lg:text-[28px]">
                Mira cómo personalizamos tus etiquetas
              </h3>
              <p className="mx-auto mt-3 max-w-[24ch] text-[14px] leading-relaxed text-pretty text-[var(--c-muted)]">
                Del nombre elegido al diseño listo para imprimir.
              </p>

              <a
                href="#como-funciona"
                className="focus-ring group mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-5 text-[14px] font-bold text-[var(--c-lavender-ink)] transition-transform duration-200 hover:-translate-y-0.5"
                aria-label="Ver el paso a paso para personalizar las etiquetas"
              >
                <CirclePlay className="size-5" strokeWidth={2.2} aria-hidden="true" />
                Ver el paso a paso
              </a>
            </div>
          </Reveal>

          <Reveal className="order-3 lg:col-start-2 lg:row-start-2">
            <div className="approval-note relative mx-auto flex max-w-[430px] items-center gap-3 px-5 py-5 sm:px-6">
              <DecorativeStarFace className="shrink-0" size={58} />
              <p className="font-[family-name:var(--font-heading)] text-[18px] leading-snug font-semibold text-balance text-[var(--c-primary)] sm:text-[20px]">
                Imprimimos tus etiquetas solo cuando apruebas el diseño.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
