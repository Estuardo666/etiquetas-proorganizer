"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Floating Pill Navigation — reconstrucción del componente de Framer
 * (framer.com/m/FloatingPillNavigation-s92k8M.js).
 *
 * Igual que con los botones, el módulo no se puede importar: el paquete
 * `framer` de npm solo trae tipos. Su animación sí se copia entera, y aquí es
 * literal porque depende de una función que framer-motion sí expone fuera de
 * Framer: la píldora activa es un `motion.div` con `layoutId`, así que al
 * cambiar de pestaña *se desliza* de una a otra en vez de aparecer y
 * desaparecer. Valores del original:
 *
 * - Contenedor `inline-flex`, radio = alto / 2, relleno 6 px, sin hueco.
 * - Cada enlace, 12 px arriba y abajo y 22 px a los lados; radio = alto / 2.
 * - Muelle `stiffness: 800, damping: 60, mass: 1`.
 * - El color de texto cruza en 0,3 s mientras la píldora viaja.
 *
 * Añadido sobre el original: es un `tablist` real (roles ARIA, tabindex
 * rotatorio y flechas ←/→). El componente de Framer usa `div`s con `onClick`,
 * que no se pueden usar con teclado.
 */

export type PillNavItem = {
  id: string;
  label: string;
  tone?: "pink" | "purple" | "blue";
};

const toneClass = {
  pink: "bg-[var(--c-pink)]",
  purple: "bg-[var(--c-purple)]",
  blue: "bg-[var(--c-blue)]",
} as const;

export function PillNav({
  items,
  active,
  onChange,
  label,
  idPrefix,
  className,
}: {
  items: PillNavItem[];
  active: string;
  onChange: (id: string) => void;
  /** Nombre accesible de la barra. */
  label: string;
  /** Prefijo de `id` para enlazar cada pestaña con su panel. */
  idPrefix: string;
  className?: string;
}) {
  const navRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLButtonElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const reduced = useReducedMotion();

  // Radios calculados a partir del alto real, como en el original: así la
  // píldora sigue siendo un óvalo perfecto aunque cambie el tamaño de letra.
  const [navRadius, setNavRadius] = useState(50);
  const [itemRadius, setItemRadius] = useState(25);

  // En móvil las pestañas no caben y el desbordamiento es invisible: sin una
  // señal el usuario no sabe que hay una tercera. `overflow` marca si queda
  // algo por la derecha para pintar la flecha y el degradado.
  const [overflowRight, setOverflowRight] = useState(false);

  const syncOverflow = useCallback(() => {
    const node = navRef.current;
    if (!node) return;
    setOverflowRight(node.scrollLeft + node.clientWidth < node.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const node = navRef.current;
    if (!node) return;
    syncOverflow();
    node.addEventListener("scroll", syncOverflow, { passive: true });
    const observer = new ResizeObserver(syncOverflow);
    observer.observe(node);
    return () => {
      node.removeEventListener("scroll", syncOverflow);
      observer.disconnect();
    };
  }, [items, syncOverflow]);

  /**
   * Al cambiar de pestaña el carril se recoloca para que *asome* la siguiente.
   * Sin esto, tocar la segunda pestaña no movía nada y la tercera seguía
   * invisible: el usuario solo la descubría si se le ocurría deslizar, y no a
   * todos se les ocurre. Ahora cada selección deja un trozo de la siguiente a
   * la vista, que es la pista de que la lista continúa.
   *
   * Solo al *cambiar*: `items` es un array nuevo en cada render del padre, y
   * reaccionar a él devolvía el scroll a la pestaña activa cada vez que el
   * usuario deslizaba.
   */
  const previousActive = useRef(active);
  useEffect(() => {
    if (previousActive.current === active) return;
    previousActive.current = active;

    const node = navRef.current;
    const index = items.findIndex((item) => item.id === active);
    const activeTab = tabRefs.current[index];
    if (!node || !activeTab) return;

    // Cuánto de la siguiente pestaña queremos ver. Suficiente para leer que
    // hay algo más, poco para no comerse la activa.
    const PEEK = 76;
    const next = tabRefs.current[index + 1];
    const target = next
      ? Math.max(0, next.offsetLeft + PEEK - node.clientWidth)
      : node.scrollWidth;

    // La activa manda: si asomar la siguiente la dejaría fuera por la
    // izquierda, se prioriza verla entera.
    const left = Math.min(target, activeTab.offsetLeft - 6);

    node.scrollTo({ left, behavior: reduced ? "auto" : "smooth" });
    // `scrollTo` suave no siempre llega dentro de este carril; el valor
    // directo garantiza la posición y `syncOverflow` actualiza la flecha.
    node.scrollLeft = left;
    syncOverflow();
  }, [active, items, reduced, syncOverflow]);

  useEffect(() => {
    const update = () => {
      if (navRef.current) setNavRadius(navRef.current.offsetHeight / 2);
      if (itemRef.current) setItemRadius(itemRef.current.offsetHeight / 2);
    };
    update();

    const observer = new ResizeObserver(update);
    if (navRef.current) observer.observe(navRef.current);
    if (itemRef.current) observer.observe(itemRef.current);
    return () => observer.disconnect();
  }, [items]);

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const delta =
      event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const next = (index + delta + items.length) % items.length;
    onChange(items[next].id);
    tabRefs.current[next]?.focus();
  };

  const scrollRight = () => {
    const node = navRef.current;
    if (!node) return;
    // Asignación directa y no `scrollBy({ behavior: "smooth" })`: el
    // desplazamiento suave no llega a aplicarse dentro de este carril.
    node.scrollLeft += node.clientWidth * 0.7;
    syncOverflow();
  };

  return (
    <div className="relative max-w-full">
      <div
        ref={navRef}
        role="tablist"
        aria-label={label}
        style={{ borderRadius: navRadius }}
        className={cn(
          // `max-w-full` + scroll: en móvil tres pestañas no caben en 375 px y
          // sin esto la barra empuja el ancho de la página.
          "no-scrollbar inline-flex max-w-full gap-2 overflow-x-auto p-1.5",
          className,
        )}
      >
        {items.map((item, index) => {
          const selected = item.id === active;

          return (
            <button
              key={item.id}
              ref={(node) => {
                tabRefs.current[index] = node;
                if (index === 0) itemRef.current = node;
              }}
              type="button"
              role="tab"
              id={`${idPrefix}-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`${idPrefix}-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => onChange(item.id)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={cn(
                "focus-ring relative z-[1] min-h-[44px] w-[210px] shrink-0 rounded-full px-[22px] text-[14.5px] font-bold whitespace-nowrap text-[var(--c-ink)] transition-[transform,filter] duration-200 active:scale-[0.97]",
                toneClass[item.tone ?? "pink"],
                !selected && "hover:brightness-[0.96]",
              )}
            >
              {selected ? (
                <motion.span
                  // `layoutId`: al cambiar de pestaña la píldora viaja de una a
                  // otra. Es lo único que hace especial a este componente — sin
                  // esto es un botón que cambia de color.
                  layoutId={`${idPrefix}-pill`}
                  aria-hidden="true"
                  style={{ borderRadius: itemRadius }}
                  className="absolute inset-0 -z-10 border-2 border-[var(--c-ink)]"
                  transition={
                    reduced
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 800, damping: 60, mass: 1 }
                  }
                />
              ) : null}
              {item.label}
            </button>
          );
        })}
      </div>

      {/*
        Degradado + flecha: la única pista de que la barra sigue. Se pinta solo
        mientras quede algo a la derecha, así que en escritorio (donde caben
        las tres) no aparece nunca.
      */}
      {overflowRight ? (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex w-16 items-center justify-end bg-gradient-to-l from-white via-white/85 to-transparent pr-0.5">
          <motion.button
            type="button"
            // `tabIndex={-1}`: el teclado ya recorre las pestañas con ←/→,
            // un tab más solo sería ruido para lectores de pantalla.
            tabIndex={-1}
            aria-hidden="true"
            onClick={scrollRight}
            className="pointer-events-auto grid size-9 place-items-center rounded-full border-2 border-[var(--c-ink)] bg-white text-[var(--c-ink)] shadow-[0_2px_0_var(--c-ink)] active:translate-y-[1px] active:shadow-none"
            animate={reduced ? undefined : { x: [0, 3, 0] }}
            transition={
              reduced
                ? undefined
                : {
                    duration: 1.4,
                    repeat: Infinity,
                    repeatDelay: 1.2,
                    ease: "easeInOut",
                  }
            }
          >
            <ChevronRight className="size-5" strokeWidth={2.5} />
          </motion.button>
        </div>
      ) : null}
    </div>
  );
}
