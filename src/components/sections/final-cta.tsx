"use client";

import { motion } from "framer-motion";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/reveal";
import {
  DecorativeBackground,
  DecorativeHeart,
  DecorativeStarFace,
} from "@/components/ui/decor";
import { pipes } from "@/lib/utils";
import type { Settings } from "@/lib/types";
import { useHydratedReducedMotion } from "@/lib/use-hydrated-reduced-motion";

export function FinalCta({ settings }: { settings: Settings }) {
  const cta = settings.finalCta;
  const shouldReduceMotion = useHydratedReducedMotion();
  const guarantees = pipes(cta.guarantees);

  return (
    <section id="cta-final" className="pt-4 pb-14 lg:pb-20">
      <div className="container-page">
        <Reveal>
          <div className="surface-warm relative isolate overflow-hidden rounded-[32px] border-2 border-[var(--c-highlight)] px-5 py-7 sm:px-8 sm:py-9 lg:rounded-[40px] lg:px-12 lg:py-12">
            <DecorativeBackground variant="cta" parallax={false} />

            {/* Una sola pieza animada: firma lúdica sin competir con la acción. */}
            <motion.div
              animate={shouldReduceMotion ? undefined : { y: [0, -6, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute -top-5 left-2 hidden lg:block"
              aria-hidden="true"
            >
              <DecorativeStarFace size={136} />
            </motion.div>
            <DecorativeHeart
              className="pointer-events-none absolute top-5 right-7 hidden lg:block"
              size={48}
            />

            <div className="relative z-10">
              <div className="mx-auto max-w-[40rem] text-center">
                <h2 className="max-w-[13ch] font-[family-name:var(--font-heading)] text-[clamp(38px,5.6vw,68px)] leading-[0.94] font-semibold tracking-[-0.035em] text-balance text-[var(--c-ink)]">
                  {cta.title}{" "}
                  {cta.titleHighlight ? (
                    <span style={{ color: cta.highlightColor }}>{cta.titleHighlight}</span>
                  ) : null}
                </h2>
                <p className="mt-4 max-w-[34rem] text-[18px] leading-snug font-semibold text-pretty text-[var(--c-text)] sm:text-[19px]">
                  {cta.text}
                </p>

                {guarantees.length ? (
                  <ul className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[14px] font-bold text-[var(--c-ink)] lg:justify-start">
                    {guarantees.map(([icon, label], index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Icon name={icon} className="size-[18px]" strokeWidth={2.2} />
                        {label}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
