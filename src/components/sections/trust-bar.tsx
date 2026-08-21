"use client";

import { BenefitArt } from "@/components/ui/illustrations";
import { SectionHeader } from "@/components/ui/section-header";
import { StatArt } from "@/components/sections/stats";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { fadeScaleIn } from "@/lib/motion";
import { cn, pipes } from "@/lib/utils";
import type { Settings, StatItem } from "@/lib/types";

/**
 * Franja de confianza: beneficios y cifras en una sola fila.
 *
 * Iban en dos bloques —tres tarjetas blancas arriba, dos cifras bajo una línea
 * divisoria— y eran dos paradas de lectura para decir lo mismo: "esto funciona
 * y hay gente que ya lo compró". En una fila se leen de un barrido.
 *
 * Sin caja blanca. La tarjeta encerraba cada beneficio y los separaba entre sí,
 * justo lo contrario de lo que hace falta aquí: son cinco apoyos de un mismo
 * argumento, no cinco cosas distintas. Sueltos sobre el fondo pesan menos y
 * dejan la sección de tamaños más arriba.
 *
 * Las cinco celdas comparten formato —dibujo grande, titular en el mismo cuerpo
 * y pie corto— porque son la misma clase de dato. Antes las cifras iban con
 * número grande y los beneficios con título pequeño, y eso las leía como dos
 * bloques distintos dentro de una misma fila. Tampoco llevan disco de color
 * detrás: los dibujos ya traen el suyo.
 */
export function TrustBar({
  settings,
  stats,
}: {
  settings: Settings;
  stats: StatItem[];
}) {
  const { trust } = settings;
  const benefits = pipes(trust.items).slice(0, 3);
  const figures = stats.filter((item) => Boolean(item.value));

  type Cell = {
    key: string;
    art: React.ReactNode;
    headline: string;
    detail?: string;
  };

  const benefitCells = benefits.map(([icon, title, desc], index) => ({
    key: `b-${index}`,
    art: <BenefitArt name={icon} size={62} />,
    headline: title ?? "",
    detail: desc,
  }));
  const figureCells = figures.map((item) => ({
    key: item.id,
    art: <StatArt name={item.icon} size={62} />,
    headline: item.value,
    detail: item.title,
  }));

  /*
    La primera cifra abre y la segunda cierra, con los tres beneficios en medio:
    así la fila entra y sale con un dato duro —cuánta gente ya compró, cuántos
    años llevamos— y los argumentos de producto quedan arropados entre los dos.
  */
  const cells: Cell[] = [
    ...figureCells.slice(0, 1),
    ...benefitCells,
    ...figureCells.slice(1),
  ];

  if (!cells.length) return null;

  return (
    <section className="section-y-sm">
      <div className="container-page">
        <SectionHeader
          eyebrow={trust.eyebrow}
          eyebrowIcon="shield"
          title={trust.title}
        />

        {/*
          Móvil: fila deslizable. Cinco columnas en 375 px dejarían cada texto
          en una tira de 60 px.
        */}
        {/*
          Seis columnas en tablet: cada celda ocupa dos, así que salen tres
          arriba y dos abajo, y la fila de abajo va centrada. Desde `lg` los
          cinco entran de una.
        */}
        <RevealGroup
          className="snap-row snap-row-sm sm:grid sm:gap-x-3 sm:gap-y-8 sm:overflow-visible sm:p-0 sm:[margin-inline:0] sm:[grid-template-columns:repeat(6,minmax(0,1fr))] lg:gap-x-2 lg:[grid-template-columns:repeat(5,minmax(0,1fr))]"
          gap={0.05}
        >
          {cells.map((cell, index) => (
            <RevealItem
              key={cell.key}
              variants={fadeScaleIn}
              className={cn(
                "trust-cell flex w-[58%] shrink-0 flex-col items-center gap-2 px-1 text-center sm:w-auto sm:col-span-2 lg:col-span-1",
                /* Cuarta celda: arranca en la segunda columna para que la fila
                   de dos quede centrada bajo la de tres. */
                index === 3 ? "sm:col-start-2 lg:col-start-auto" : "",
              )}
            >
              <span
                aria-hidden="true"
                className="trust-art grid h-16 place-items-center"
              >
                {cell.art}
              </span>

              <p className="trust-headline font-[family-name:var(--font-heading)] text-[clamp(19px,1.6vw,23px)] leading-[1.15] font-semibold text-balance text-[var(--c-ink)] max-w-[12ch]">
                {cell.headline}
              </p>

              {cell.detail ? (
                <p className="max-w-[14rem] text-[13.5px] leading-snug text-pretty text-[var(--c-muted)]">
                  {cell.detail}
                </p>
              ) : null}
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
