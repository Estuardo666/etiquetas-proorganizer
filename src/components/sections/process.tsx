"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { DecorativeBackground, DecorativeSparkle } from "@/components/ui/decor";
import { Icon } from "@/components/ui/icon";
import { fadeScaleIn, viewportOnce } from "@/lib/motion";
import type { Settings, StepItem } from "@/lib/types";

/** Los circulos alternan acento y destacado: cuatro pasos, dos tonos. */
const tints = ["var(--c-pastel-accent)", "var(--c-pastel-highlight)"];

/**
 * Pasos flotantes, sin panel contenedor: la línea pasa por el centro de los
 * círculos en escritorio y se convierte en una guía vertical en móvil.
 */
export function Process({ settings, steps }: { settings: Settings; steps: StepItem[] }) {
  if (!steps.length) return null;

  return (
    <section id="como-funciona" className="surface-base process-section section-y relative overflow-hidden">
      <DecorativeBackground variant="process" />

      <div className="container-page relative z-10">
        <SectionHeader
          eyebrow={settings.process.eyebrow}
          eyebrowIcon="pencil"
          title={settings.process.title}
          subtitle={settings.process.subtitle}
        />

        <div className="relative mx-auto max-w-[1020px]">
          {/* Curva punteada que une los pasos (solo desktop). */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1000 96"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-0 top-0 hidden h-[96px] w-full lg:block"
          >
            <motion.path
              d="M120 48C270 4 350 92 500 48s240-44 380 0"
              fill="none"
              stroke="var(--c-pastel-accent)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="2 12"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 1.4, ease: "easeInOut" }}
            />
          </svg>
          <DecorativeSparkle
            className="absolute top-[18px] left-[31%] hidden lg:block"
            size={16}
            color="var(--c-highlight)"
          />
          <DecorativeSparkle
            className="absolute top-[78px] right-[30%] hidden lg:block"
            size={14}
            color="var(--c-pastel-accent)"
          />

          <div
            aria-hidden="true"
            className="absolute top-[40px] bottom-[40px] left-[40px] w-[2px] bg-[var(--c-pastel-accent)]/75 lg:hidden"
          />

          <RevealGroup
            className="relative grid gap-5 lg:grid-cols-4 lg:gap-5"
            gap={0.06}
          >
            {steps.map((step, index) => (
              <RevealItem
                key={step.id}
                variants={fadeScaleIn}
                className="group flex items-start gap-4 text-left lg:flex-col lg:items-center lg:gap-0 lg:text-center"
              >
                <span className="relative">
                  <motion.span
                    initial={{ scale: 0.8 }}
                    whileInView={{ scale: 1 }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.45, delay: index * 0.12 }}
                    className="card-shadow grid size-[80px] place-items-center rounded-full border-4 border-white transition-transform duration-300 group-hover:rotate-[4deg] lg:size-[92px]"
                    style={{ background: tints[index % tints.length] }}
                  >
                    <Icon
                      name={step.icon}
                      className="size-7 text-[var(--c-ink)] lg:size-8"
                      strokeWidth={1.9}
                    />
                  </motion.span>
                  <span className="card-shadow absolute -top-1 -right-1 grid size-7 place-items-center rounded-full bg-white font-[family-name:var(--font-heading)] text-[14px] font-semibold text-[var(--c-ink)]">
                    {index + 1}
                  </span>
                </span>

                <div className="min-w-0 lg:contents">
                  <h3 className="mt-0 font-[family-name:var(--font-heading)] text-[17px] font-semibold text-balance text-[var(--c-ink)] lg:mt-2.5">
                    {step.title}
                  </h3>
                  <p className="mt-0.5 max-w-[15rem] text-[14px] leading-snug text-pretty text-[var(--c-muted)] lg:mt-0">
                    {step.desc}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* Sin CTA propio: el flujo termina en el contacto global. */}
      </div>
    </section>
  );
}
