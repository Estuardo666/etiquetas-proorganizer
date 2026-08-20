"use client";

import { useEffect, useRef } from "react";
import { useAnimationFrame } from "framer-motion";
import { useHydratedReducedMotion } from "@/lib/use-hydrated-reduced-motion";

/**
 * Rejilla infinita animada con foco que sigue al cursor.
 *
 * Dos capas de la misma rejilla: una base tenue siempre visible y otra más
 * marcada recortada por una máscara radial bajo el puntero. Al moverse, ambas
 * desplazan su `background-position` y vuelven a empezar cada 40 px —el lado de
 * la celda—, así que el bucle no tiene costura.
 *
 * El desplazamiento se escribe directamente sobre el nodo desde
 * `useAnimationFrame`. Pasarlo por estado de React re-renderizaría el árbol
 * sesenta veces por segundo para mover un fondo.
 *
 * Se apaga sola cuando el sistema pide menos movimiento, y la capa del cursor
 * no se monta en pantallas táctiles: sin puntero que seguir, es una máscara
 * que solo cuesta batería.
 */

/** Lado de la celda. El bucle usa este mismo valor como módulo. */
const CELL = 40;

const DIRECTIONS = {
  right: [1, 0],
  left: [-1, 0],
  down: [0, 1],
  up: [0, -1],
  "down-right": [1, 1],
  "down-left": [-1, 1],
  "up-right": [1, -1],
  "up-left": [-1, -1],
} as const;

export type GridDirection = keyof typeof DIRECTIONS;

/** La rejilla es un SVG embebido: se mantiene nítida a cualquier escala. */
function gridUrl(color: string, width: number) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${CELL}' height='${CELL}'><path d='M ${CELL} 0 L 0 0 0 ${CELL}' fill='none' stroke='${color}' stroke-width='${width}'/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

export function InfiniteGrid({
  background = "transparent",
  gridColor = "#0b4a75",
  gridOpacity = 0.08,
  revealOpacity = 0.35,
  revealRadius = 260,
  direction = "down-right",
  speedX = 0.35,
  speedY = 0.35,
  showGradients = true,
  gradient1 = "#de2b22",
  gradient2 = "#f0913c",
  gradient3 = "#2e8fd0",
  gradientOpacity = 0.38,
  className = "",
}: {
  background?: string;
  gridColor?: string;
  gridOpacity?: number;
  revealOpacity?: number;
  /** Radio del foco, en píxeles. El componente de origen admite 100–800. */
  revealRadius?: number;
  direction?: GridDirection;
  /** Velocidad por eje, −5 a 5. El signo invierte la dirección de ese eje. */
  speedX?: number;
  speedY?: number;
  showGradients?: boolean;
  gradient1?: string;
  gradient2?: string;
  gradient3?: string;
  /** Intensidad de las tres manchas. La mayor de ellas usa este valor. */
  gradientOpacity?: number;
  className?: string;
}) {
  const baseRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const offset = useRef({ x: 0, y: 0 });
  /** Fuera de la caja hasta el primer movimiento: evita un foco en la esquina. */
  const pointer = useRef({ x: -9999, y: -9999 });

  const reduced = useHydratedReducedMotion();
  const hasPointer = useRef(true);

  useEffect(() => {
    hasPointer.current =
      typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;
  }, []);

  const [dirX, dirY] = DIRECTIONS[direction] ?? DIRECTIONS["down-right"];

  useAnimationFrame((_time, delta) => {
    // `delta` en milisegundos: el avance no depende de los fps de la pantalla.
    const step = Math.min(delta, 64) / 16.667;
    const next = offset.current;

    // El módulo mantiene el valor pequeño para siempre; sin él, tras unos
    // minutos el desplazamiento sería un número lo bastante grande como para
    // que el redondeo del navegador se note como un temblor.
    next.x = (next.x + dirX * speedX * step) % CELL;
    next.y = (next.y + dirY * speedY * step) % CELL;

    const position = `${next.x}px ${next.y}px`;
    if (baseRef.current) baseRef.current.style.backgroundPosition = position;
    if (revealRef.current) revealRef.current.style.backgroundPosition = position;
  });

  /**
   * El puntero se escucha en el elemento padre, no en la rejilla.
   *
   * La rejilla es `pointer-events-none` a propósito —está por encima de nada,
   * pero por debajo de los botones del hero, y no debe interceptar un clic—, y
   * un elemento sin eventos de puntero tampoco los recibe. Escuchando en el
   * padre el foco funciona sin que la rejilla robe un solo clic.
   */
  useEffect(() => {
    if (reduced || !hasPointer.current) return;

    const host = rootRef.current?.parentElement;
    if (!host) return;

    let frame = 0;

    const move = (event: PointerEvent) => {
      const node = revealRef.current;
      const box = rootRef.current?.getBoundingClientRect();
      if (!node || !box) return;

      pointer.current = { x: event.clientX - box.left, y: event.clientY - box.top };

      // Un solo escrito por fotograma: `pointermove` puede dispararse muchas
      // más veces que las que la pantalla puede pintar.
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const { x, y } = pointer.current;
        const mask = `radial-gradient(circle ${revealRadius}px at ${x}px ${y}px, #000 0%, transparent 100%)`;
        node.style.maskImage = mask;
        node.style.setProperty("-webkit-mask-image", mask);
        node.style.opacity = String(revealOpacity);
      });
    };

    const leave = () => {
      const node = revealRef.current;
      if (node) node.style.opacity = "0";
    };

    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
    };
  }, [reduced, revealRadius, revealOpacity]);

  const layer = gridUrl(gridColor, 1);
  const layerStrong = gridUrl(gridColor, 1.4);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ background }}
    >
      {/* Capa base: siempre visible, muy tenue. */}
      <div
        ref={baseRef}
        className="absolute inset-0"
        style={{ backgroundImage: layer, opacity: gridOpacity }}
      />

      {/* Capa de revelado: la misma rejilla, más marcada, recortada al foco. */}
      {reduced ? null : (
        <div
          ref={revealRef}
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            backgroundImage: layerStrong,
            opacity: 0,
            maskImage: "none",
            WebkitMaskImage: "none",
          }}
        />
      )}

      {/* Tres manchas de color muy difusas: rompen la regularidad de la rejilla
          para que no parezca papel milimetrado. El corte del degradado va al
          85 % y no al 70 %: cuanto más tarde se apaga, más grande se ve la
          mancha sin tener que subir la opacidad y ensuciar el texto. */}
      {showGradients ? (
        // En móvil las manchas van más pequeñas y a poco más de la mitad de
        // intensidad: un blob de 680 px sobre una pantalla de 390 no es un
        // acento, es un fondo de color, y el titular rojo se queda sin
        // contraste contra su propio color aguado.
        <div style={{ "--g-op": gradientOpacity } as React.CSSProperties}>
          <div
            className="absolute -top-[24%] right-[-14%] size-[380px] rounded-full opacity-[calc(var(--g-op)*0.55)] sm:size-[680px] sm:opacity-[var(--g-op)]"
            style={{
              background: `radial-gradient(circle, ${gradient1} 0%, transparent 85%)`,
              filter: "blur(52px)",
            }}
          />
          <div
            className="absolute top-[2%] right-[14%] size-[220px] rounded-full opacity-[calc(var(--g-op)*0.45)] sm:size-[380px] sm:opacity-[calc(var(--g-op)*0.85)]"
            style={{
              background: `radial-gradient(circle, ${gradient2} 0%, transparent 85%)`,
              filter: "blur(44px)",
            }}
          />
          <div
            className="absolute bottom-[-22%] left-[-12%] size-[340px] rounded-full opacity-[calc(var(--g-op)*0.5)] sm:size-[620px] sm:opacity-[calc(var(--g-op)*0.9)]"
            style={{
              background: `radial-gradient(circle, ${gradient3} 0%, transparent 85%)`,
              filter: "blur(56px)",
            }}
          />
        </div>
      ) : null}
    </div>
  );
}
