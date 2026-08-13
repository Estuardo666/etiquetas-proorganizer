"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { DecorativeBackground } from "@/components/ui/decor";
import { ArtSheets, UsageArt } from "@/components/ui/illustrations";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { fadeUp } from "@/lib/motion";
import { cn, lines, pipes } from "@/lib/utils";
import type { Settings } from "@/lib/types";

/** Fondo del círculo de cada cifra; la nuestra rompe la serie fría a propósito. */
const tints = ["var(--c-sky)", "var(--c-lilac)", "var(--c-peach)", "var(--c-mint)"];

/** Objeto ilustrado de cada cifra. Reusa las piezas de la fila de usos. */
function PriceArt({ art }: { art: string }) {
  if (art === "sheet") return <ArtSheets size={38} />;
  return <UsageArt title={art === "bottle" ? "Termo" : art === "shirt" ? "Ropa" : "Lonchera"} size={38} />;
}

function ComparisonFace({ happy }: { happy: boolean }) {
  return (
    <svg viewBox="0 0 56 56" className="size-12" role="img" aria-label={happy ? "Carita feliz" : "Carita triste"}>
      <circle cx="28" cy="28" r="24" fill={happy ? "#FFE27A" : "#D9DDE8"} />
      {happy ? (
        <>
          <path d="m18 20 2-3 2 3-2 3-2-3Zm16 0 2-3 2 3-2 3-2-3Z" fill="#6F5BE8" />
          <path d="M18 35c3 5 17 5 20 0" fill="none" stroke="#173A7A" strokeWidth="3" strokeLinecap="round" />
          <circle cx="14" cy="29" r="3" fill="#FF9DB5" opacity=".8" /><circle cx="42" cy="29" r="3" fill="#FF9DB5" opacity=".8" />
        </>
      ) : (
        <>
          <path d="m17 20 5 3m0-3-5 3m12-3 5 3m0-3-5 3" stroke="#68738A" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M18 39c3-5 17-5 20 0" fill="none" stroke="#173A7A" strokeWidth="3" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

/**
 * Aversión a la pérdida + el competidor real, que no es otra marca de
 * etiquetas sino el marcador permanente. Va después de Diseños (el usuario ya
 * lo quiere) y justo antes de Promos (llega el ahorro).
 */
export function Cost({ settings }: { settings: Settings }) {
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
    <section id="costo" className="section-y relative overflow-hidden bg-[var(--c-bg-alt)]">
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
            <RevealItem key={price.id} variants={fadeUp}>
              <div
                className={cn(
                  "card-base flex h-full flex-col items-center px-4 pt-6 pb-5 text-center",
                  price.ours && "border-[var(--c-lavender)] bg-white",
                )}
                style={{ boxShadow: "none" }}
              >
                <span
                  className="card-art mb-3 grid size-[58px] place-items-center rounded-full"
                  style={{ background: tints[index % tints.length] }}
                >
                  <PriceArt art={price.art} />
                </span>
                <p
                  className={cn(
                    "font-[family-name:var(--font-heading)] text-[30px] leading-none font-semibold",
                    price.ours ? "text-[var(--c-lavender-ink)]" : "text-[var(--c-muted)]",
                  )}
                >
                  {price.value}
                </p>
                <p
                  className={cn(
                    "mt-1.5 text-[13.5px] leading-snug text-balance",
                    price.ours
                      ? "font-extrabold text-[var(--c-primary)]"
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
            <p className="font-[family-name:var(--font-heading)] text-[19px] leading-snug font-semibold text-balance text-[var(--c-primary)]">
              {cost.closing}
            </p>
          ) : null}
          {cost.pricesNote ? (
            <p className="mt-1 text-[12.5px] text-[var(--c-muted)]">{cost.pricesNote} 🇪🇨</p>
          ) : null}
        </Reveal>

        {/* Bloque B — contra el marcador permanente -------------------- */}
        <RevealGroup className="mt-10 grid gap-4 md:grid-cols-2 lg:gap-5" gap={0.06}>
          {columns.map((column) => (
            <RevealItem key={column.title} variants={fadeUp}>
              <div
                className={cn(
                  "h-full rounded-[24px] border-2 px-5 py-6",
                  column.good
                    ? "border-[var(--c-lilac)] bg-white"
                    : "border-[var(--c-border)] bg-[#F4F5F8]",
                )}
              >
                <h3
                  className={cn(
                    "font-[family-name:var(--font-heading)] text-[20px] leading-tight font-semibold",
                    column.good ? "text-[var(--c-primary)]" : "text-[var(--c-muted)]",
                  )}
                >
                  <span className="mb-2 block" aria-hidden="true">
                    <ComparisonFace happy={column.good} />
                  </span>
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {column.items.map((item) => (
                    <li
                      key={item}
                      className={cn(
                        "flex items-start gap-2.5 text-[14.5px] leading-snug",
                        column.good
                          ? "font-semibold text-[var(--c-text)]"
                          : "text-[var(--c-muted)]",
                      )}
                    >
                      {column.good ? (
                        <CheckCircle2
                          className="mt-px size-[18px] shrink-0 text-[var(--c-lavender)]"
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      ) : (
                        <XCircle
                          className="mt-px size-[18px] shrink-0 text-[#A3AAB8]"
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
