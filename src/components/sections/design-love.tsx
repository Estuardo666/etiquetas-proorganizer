import Image from "next/image";
import { ImageIcon, Sticker, Type, Video } from "lucide-react";
import { TextArrowCta } from "@/components/ui/text-arrow-cta";
import labelSheet from "../../../public/hoja de etiquetas.png";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import {
  DecorPop,
  DecorativeHeart,
  DecorativeSparkle,
  DecorativeStarFace,
} from "@/components/ui/decor";
import { fadeScaleIn } from "@/lib/motion";

const features = [
  {
    icon: ImageIcon,
    title: "Imágenes que les encantan",
    description: "Incluimos su personaje favorito, el logo de la escuela o una foto.",
    tone: "bg-[var(--c-pastel-accent)]",
  },
  {
    icon: Sticker,
    title: "Fondo blanco y adhesivo resistente",
    description: "Cada diseño se lee con claridad y está hecho para acompañar el uso diario.",
    tone: "bg-[var(--c-highlight)]",
  },
  {
    icon: Type,
    title: "Su nombre, siempre visible",
    description: "Usamos letras oscuras y legibles para encontrar todo de un vistazo.",
    tone: "bg-[var(--c-pastel-accent)]",
  },
] as const;

/**
 * Panel "Cómo personalizamos": la anatomía del producto. Vive en el tercer tab
 * de `Showcase`, después de elegir categoría y de ver muestras reales —
 * elección → prueba → comprensión.
 */
export function PersonalizationPanel() {
  return (
    <>
      <DecorPop className="absolute top-[12%] right-[7%] hidden md:block">
        <DecorativeSparkle color="var(--c-pastel-ink)" size={34} />
      </DecorPop>
      <DecorPop className="absolute bottom-[14%] left-[5%] hidden lg:block" delay={0.1}>
        <DecorativeHeart color="var(--c-pastel-accent)" size={30} />
      </DecorPop>

      <Reveal className="mx-auto mb-8 max-w-4xl text-center lg:mb-11">
          <h3
            id="personalizacion-title"
            className="h3-display text-balance text-[var(--c-ink)]"
          >
            Diseñamos sus etiquetas <span className="text-[var(--c-accent-ink)]">con amor</span>
          </h3>
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
            className="order-4 mx-auto w-full max-w-[380px] lg:col-start-3 lg:row-span-2 lg:row-start-1 lg:max-w-none"
          >
            <div className="tutorial-ticket relative overflow-hidden rounded-[28px] px-5 py-7 text-center sm:px-7 lg:px-5">
              <span
                aria-hidden="true"
                className="absolute top-0 left-1/2 h-8 w-24 -translate-x-1/2 -translate-y-3 rotate-2 bg-[rgb(139_124_246/0.28)]"
              />

              <span className="mx-auto grid size-24 place-items-center text-[var(--c-ink)]" aria-hidden="true">
                <Video className="size-20" strokeWidth={1.5} />
              </span>

              <p className="mx-auto mt-1 w-fit rounded-full bg-[var(--c-accent)] px-4 py-1 text-[12px] font-bold tracking-[0.06em] text-white uppercase">
                Guía rápida
              </p>
              <h3 className="mx-auto mt-4 max-w-[12ch] font-[family-name:var(--font-heading)] text-[25px] leading-[1.08] font-semibold text-balance text-[var(--c-ink)] lg:text-[28px]">
                Mira cómo personalizamos tus etiquetas
              </h3>
              <p className="mx-auto mt-3 max-w-[24ch] text-[14px] leading-relaxed text-pretty text-[var(--c-muted)]">
                Del nombre elegido al diseño listo para imprimir.
              </p>

              <span className="mt-6 flex justify-center">
                <TextArrowCta
                  href="#como-funciona"
                  ariaLabel="Ver el paso a paso para personalizar las etiquetas"
                  color="var(--c-accent-ink)"
                  lineColor="var(--c-accent)"
                >
                  Ver el paso a paso
                </TextArrowCta>
              </span>
            </div>
          </Reveal>

          <Reveal className="order-3 lg:col-start-2 lg:row-start-2">
            <div className="approval-note relative mx-auto flex max-w-[430px] items-center gap-3 px-5 py-5 sm:px-6">
              <DecorativeStarFace className="shrink-0" size={58} />
              <p className="font-[family-name:var(--font-heading)] text-[18px] leading-snug font-semibold text-balance text-[var(--c-ink)] sm:text-[20px]">
                Imprimimos tus etiquetas solo cuando apruebas el diseño.
              </p>
            </div>
          </Reveal>
        </div>
    </>
  );
}
