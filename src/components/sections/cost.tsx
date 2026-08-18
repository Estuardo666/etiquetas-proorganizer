"use client";

import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { DecorativeBackground } from "@/components/ui/decor";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { fadeScaleIn } from "@/lib/motion";
import { cn, lines } from "@/lib/utils";
import type { Settings } from "@/lib/types";

function ComparisonFace({ happy }: { happy: boolean }) {
  return (
    <span
      className="inline-grid size-12 place-items-center text-[38px] leading-none drop-shadow-[0_3px_4px_rgb(38_38_38/0.16)]"
      role="img"
      aria-label={happy ? "Muy feliz" : "Muy triste"}
    >
      {happy ? "😁" : "😭"}
    </span>
  );
}

/**
 * Aversión a la pérdida + el competidor real, que no es otra marca de
 * etiquetas sino el marcador permanente. Va después de Diseños (el usuario ya
 * lo quiere) y justo antes de Promos (llega el ahorro).
 */
export function Cost({ settings }: { settings: Settings }) {
  const [compare, setCompare] = useState(0);
  const { cost } = settings;

  const columns = [
    { title: cost.badTitle, items: lines(cost.badItems), good: false },
    { title: cost.goodTitle, items: lines(cost.goodItems), good: true },
  ].filter((column) => column.title && column.items.length);

  return (
    <section id="costo" className="surface-base section-y relative overflow-hidden">
      <DecorativeBackground variant="testimonials" />

      <div className="container-page relative z-10">
        {/*
          Movil: un panel a la vez con un switch. La comparacion necesita verse
          junta, pero apilada deja de ser comparacion: son dos listas separadas
          por media pantalla de scroll. Desde `md` vuelven lado a lado.
        */}
        <div className="flex justify-center md:hidden">
          <div
            role="group"
            aria-label={`${cost.badTabLabel} / ${cost.goodTabLabel}`}
            className="inline-flex rounded-full border border-[var(--c-border)] bg-white p-1"
          >
            {columns.map((column, index) => (
              <button
                key={column.title}
                type="button"
                onClick={() => setCompare(index)}
                aria-pressed={compare === index}
                className={cn(
                  "min-h-[40px] rounded-full px-4 text-[13.5px] font-bold",
                  compare === index
                    ? "bg-[var(--c-accent)] text-white"
                    : "text-[var(--c-muted)]",
                )}
              >
                {column.good ? cost.goodTabLabel : cost.badTabLabel}
              </button>
            ))}
          </div>
        </div>

        <RevealGroup
          className="comparison-pair mx-auto mt-5 grid max-w-[844px] gap-4 md:mt-0 md:grid-cols-2 lg:gap-5"
          gap={0.06}
        >
          {columns.map((column, index) => (
            <RevealItem
              key={column.title}
              variants={fadeScaleIn}
              className={cn(compare === index ? "block" : "hidden", "md:block")}
            >
              <div
                className={cn(
                  "comparison-card relative h-full rounded-[24px] border-2 px-5 py-6",
                  column.good
                    ? "comparison-card--good border-[var(--c-highlight)] bg-white"
                    : "comparison-card--bad border-[var(--c-border)] bg-[var(--c-tint-ink)]",
                )}
              >
                <h3
                  className="font-[family-name:var(--font-heading)] text-[32px] leading-[1.05] font-bold tracking-[-0.025em] text-[var(--c-ink)]"
                >
                  <span className="mb-2 block" aria-hidden="true">
                    <ComparisonFace happy={column.good} />
                  </span>
                  {column.title}
                </h3>
                <ul className="mt-5 space-y-2.5">
                  {column.items.map((item) => (
                    <li
                      key={item}
                      className={cn(
                        "flex items-start gap-2.5 text-[14.5px] leading-snug",
                        column.good
                          ? "font-medium text-[var(--c-text)]"
                          : "text-[var(--c-muted)]",
                      )}
                    >
                      {column.good ? (
                        <CheckCircle2
                          className="mt-px size-[18px] shrink-0 text-[var(--c-accent)]"
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      ) : (
                        <XCircle
                          className="mt-px size-[18px] shrink-0 text-[var(--c-muted)]"
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      )}
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-8 flex justify-center">
          <WhatsAppButton
            source="cost"
            label={cost.ctaText}
            ariaLabel={cost.ctaText}
          />
        </Reveal>
      </div>
    </section>
  );
}
