"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
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
  tone?: "pink" | "purple" | "green";
};

const toneClass = {
  pink: "bg-[var(--c-pink)]",
  purple: "bg-[var(--c-purple)]",
  green: "bg-[var(--c-green)]",
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
    const delta = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const next = (index + delta + items.length) % items.length;
    onChange(items[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div
      ref={navRef}
      role="tablist"
      aria-label={label}
      style={{ borderRadius: navRadius }}
      className={cn(
        // `max-w-full` + scroll: en móvil tres pestañas no caben en 375 px y
        // sin esto la barra empuja el ancho de la página.
        "no-scrollbar inline-flex max-w-full snap-x gap-2 overflow-x-auto p-1.5",
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
              "focus-ring relative z-[1] min-h-[44px] w-[210px] shrink-0 snap-start rounded-full px-[22px] text-[14.5px] font-bold whitespace-nowrap text-[var(--c-ink)] transition-[transform,filter] duration-200 active:scale-[0.97]",
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
  );
}
