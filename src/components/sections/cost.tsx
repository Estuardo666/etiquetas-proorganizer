"use client";

import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { DecorativeBackground } from "@/components/ui/decor";
import { ArtSheets, UsageArt } from "@/components/ui/illustrations";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { fadeScaleIn } from "@/lib/motion";
import { cn, lines, pipes } from "@/lib/utils";
import type { Settings } from "@/lib/types";

/**
 * El circulo de las tres perdidas va en neutro y solo el nuestro se colorea:
 * el contraste *es* el argumento de la seccion, y cuatro pasteles distintos lo
 * borraban.
 */
const lossTint = "var(--c-tint-ink)";
const oursTint = "var(--c-tint-accent)";

/** Objeto ilustrado de cada cifra. Reusa las piezas de la fila de usos. */
function PriceArt({ art }: { art: string }) {
  if (art === "sheet") return <ArtSheets size={38} />;
  return <UsageArt title={art === "bottle" ? "Termo" : art === "shirt" ? "Ropa" : "Lonchera"} size={38} />;
}

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
  const title = cost.title.includes("Un termo perdido")
    ? cost.title.replace(" cuesta más que ", " cuesta\nmás que ")
    : cost.title;

  // Formato del campo: dibujo|precio|texto y, en la nuestra, |nuestro al final.
  const prices = pipes(cost.prices)
    .filter(([, value]) => Boolean(value))
    .map(([art, value, label, flag], index) => ({
      id: `${art}-${index}`,
      art,
      value,
      label: label ?? "",
      ours: (flag ?? "").toLowerCase() === "nuestro",
    }));

  const columns = [
    { title: cost.badTitle, items: lines(cost.badItems), good: false },
    { title: cost.goodTitle, items: lines(cost.goodItems), good: true },
  ].filter((column) => column.title && column.items.length);

  return (
    <section id="costo" className="surface-base section-y relative overflow-hidden">
      <DecorativeBackground variant="testimonials" />

      <div className="container-page relative z-10">
        <SectionHeader
          eyebrow={cost.eyebrow}
          eyebrowIcon="shield"
          title={title}
          titleClassName="whitespace-pre-line"
          subtitle={cost.subtitle}
        />

        {/* Bloque A — lo que cuesta reponer ---------------------------- */}
        <RevealGroup className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5" gap={0.05}>
          {prices.map((price, index) => (
            <RevealItem key={price.id} variants={fadeScaleIn}>
              <div
                className={cn(
                  "card-base flex h-full flex-col items-center px-4 pt-6 pb-5 text-center",
                  price.ours && "border-[var(--c-accent)] bg-white",
                )}
                style={{ boxShadow: "none" }}
              >
                <span
                  className="card-art mb-3 grid size-[58px] place-items-center rounded-full"
                  style={{ background: price.ours ? oursTint : lossTint }}
                >
                  <PriceArt art={price.art} />
                </span>
                <p
                  className={cn(
                    "font-[family-name:var(--font-heading)] text-[30px] leading-none font-semibold",
                    price.ours ? "text-[var(--c-accent-ink)]" : "text-[var(--c-muted)]",
                  )}
                >
                  {price.value}
                </p>
                <p
                  className={cn(
                    "mt-1.5 text-[13.5px] leading-snug text-balance",
                    price.ours
                      ? "font-extrabold text-[var(--c-ink)]"
                      : "font-semibold text-[var(--c-muted)]",
                  )}
                >
                  {price.label}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-5 text-center">
          {cost.closing ? (
            <p className="font-[family-name:var(--font-heading)] text-[19px] leading-snug font-semibold text-balance text-[var(--c-ink)]">
              {cost.closing}
            </p>
          ) : null}
          {cost.pricesNote ? (
            <p className="mt-1 text-[12.5px] text-[var(--c-muted)]">{cost.pricesNote} 🇪🇨</p>
          ) : null}
        </Reveal>

        {/* Bloque B — contra el marcador permanente -------------------- */}
        {/*
          Movil: un panel a la vez con un switch. La comparacion necesita verse
          junta, pero apilada deja de ser comparacion: son dos listas separadas
          por media pantalla de scroll. Desde `md` vuelven lado a lado.
        */}
        <div className="mt-10 flex justify-center md:hidden">
          <div
            role="group"
            aria-label="Comparar marcador y etiquetas"
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
                {column.good ? "Con etiquetas" : "Con marcador"}
              </button>
            ))}
          </div>
        </div>

        <RevealGroup
          className="comparison-pair mx-auto mt-5 grid max-w-[844px] gap-4 md:mt-10 md:grid-cols-2 lg:gap-5"
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
                    ? "comparison-card--good border-[var(--c-highlight)] bg-[var(--c-highlight)]"
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
            ariaLabel="Escribir por WhatsApp para etiquetar las cosas del colegio"
          />
        </Reveal>
      </div>
    </section>
  );
}
