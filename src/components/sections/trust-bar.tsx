"use client";

import { useEffect, useRef } from "react";

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
/**
 * Ancho de celda en móvil: 42vw deja ver dos y media, así que la siguiente
 * asoma cortada. A 58% quedaban muy separadas entre sí.
 */
/**
 * Avance automático de la cinta, moviendo `scrollLeft`.
 *
 * No es una animación CSS a propósito: el contenedor tiene que seguir siendo
 * un scroll nativo para poder arrastrarlo con el dedo. Mientras el usuario
 * toca —o durante el segundo y medio siguiente a soltar— el avance se detiene,
 * así se puede leer una celda sin perseguirla.
 *
 * El bucle se cierra restando un periodo al pasar de él. El periodo se mide
 * entre una celda y su copia, no como `scrollWidth / 2`: la pista lleva
 * relleno lateral y ese medio relleno bastaba para que el salto no cayera en
 * el mismo punto y se viera un tirón cada vuelta.
 */
function useMarquee<T extends HTMLElement>(speed = 0.35) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(min-width: 640px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let pausedUntil = 0;

    const hold = () => {
      pausedUntil = performance.now() + 1500;
    };

    /** Distancia entre una celda y su copia; es lo que dura una vuelta. */
    const periodOf = () => {
      const cells = node.querySelectorAll<HTMLElement>(".trust-cell");
      if (cells.length < 2) return 0;
      const copy = cells[cells.length / 2];
      return copy ? copy.offsetLeft - cells[0].offsetLeft : 0;
    };

    const step = (now: number) => {
      frame = requestAnimationFrame(step);
      if (now < pausedUntil) return;

      const period = periodOf();
      const next = node.scrollLeft + speed;
      node.scrollLeft = period > 0 && next >= period ? next - period : next;
    };

    frame = requestAnimationFrame(step);
    node.addEventListener("pointerdown", hold);
    node.addEventListener("touchstart", hold, { passive: true });
    node.addEventListener("wheel", hold, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      node.removeEventListener("pointerdown", hold);
      node.removeEventListener("touchstart", hold);
      node.removeEventListener("wheel", hold);
    };
  }, [speed]);

  return ref;
}

type Cell = {
  key: string;
  art: React.ReactNode;
  headline: string;
  detail?: string;
};

const cellClass =
  "trust-cell flex w-[42vw] shrink-0 flex-col items-center gap-2 px-1 text-center sm:w-auto sm:col-span-2 lg:col-span-1";

function CellBody({ cell }: { cell: Cell }) {
  return (
    <>
      <span
        aria-hidden="true"
        className="trust-art grid h-16 place-items-center"
      >
        {cell.art}
      </span>

      <p className="trust-headline max-w-[12ch] font-[family-name:var(--font-heading)] text-[clamp(19px,1.6vw,23px)] leading-[1.15] font-semibold text-balance text-[var(--c-ink)]">
        {cell.headline}
      </p>

      {cell.detail ? (
        <p className="max-w-[14rem] text-[13.5px] leading-snug text-pretty text-[var(--c-muted)]">
          {cell.detail}
        </p>
      ) : null}
    </>
  );
}

export function TrustBar({
  settings,
  stats,
}: {
  settings: Settings;
  stats: StatItem[];
}) {
  const track = useMarquee<HTMLDivElement>();
  const { trust } = settings;
  const benefits = pipes(trust.items).slice(0, 3);
  const figures = stats.filter((item) => Boolean(item.value));

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
          Móvil: cinta que avanza sola y también se arrastra (`useMarquee`).
          Cinco columnas en 375 px dejarían cada texto en una tira de 60 px, y
          una fila quieta no se lee como deslizable: la mitad quedaba fuera de
          pantalla sin avisar. El contenido va duplicado para que el bucle no
          corte al reiniciar.
        */}
        {/*
          Seis columnas en tablet: cada celda ocupa dos, así que salen tres
          arriba y dos abajo, y la fila de abajo va centrada. Desde `lg` los
          cinco entran de una.
        */}
        <div ref={track} className="trust-marquee-mask sm:overflow-visible">
          <RevealGroup
            className="trust-marquee sm:grid sm:gap-x-3 sm:gap-y-8 sm:[grid-template-columns:repeat(6,minmax(0,1fr))] lg:gap-x-2 lg:[grid-template-columns:repeat(5,minmax(0,1fr))]"
            gap={0.05}
          >
            {cells.map((cell, index) => (
              <RevealItem
                key={cell.key}
                variants={fadeScaleIn}
                className={cn(
                  cellClass,
                  index === 3 ? "sm:col-start-2 lg:col-start-auto" : "",
                )}
              >
                <CellBody cell={cell} />
              </RevealItem>
            ))}

            {/*
              Segunda vuelta de la cinta. Va fuera del árbol de accesibilidad
              —es la misma información— y desaparece desde `sm`, donde la
              rejilla ya enseña las cinco celdas a la vez.
            */}
            <div className="contents sm:hidden" aria-hidden="true">
              {cells.map((cell) => (
                <div key={`dup-${cell.key}`} className={cellClass}>
                  <CellBody cell={cell} />
                </div>
              ))}
            </div>
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
