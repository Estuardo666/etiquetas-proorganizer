"use client";

import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { fadeScaleIn } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Settings } from "@/lib/types";

/** Un ícono SVG plano por estadística, en el mismo orden que `items`. */
function FamilyHouseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path
        d="M7 29 32 7l25 22"
        fill="none"
        stroke="var(--c-ink)"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 25v32h38V25"
        fill="var(--c-pastel-accent)"
        stroke="var(--c-ink)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <rect
        x="26"
        y="38"
        width="12"
        height="19"
        rx="2"
        fill="var(--c-highlight)"
        stroke="var(--c-ink)"
        strokeWidth="2.4"
      />
      <rect x="18" y="32" width="7" height="8" rx="1.5" fill="#fff" stroke="var(--c-ink)" strokeWidth="2" />
      <rect x="39" y="32" width="7" height="8" rx="1.5" fill="#fff" stroke="var(--c-ink)" strokeWidth="2" />
      <circle cx="34.5" cy="48" r="1.2" fill="var(--c-ink)" />
    </svg>
  );
}

function RibbonBadgeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path
        d="M20 34 12 56l10-3 6 9 8-24"
        fill="var(--c-pastel-ink)"
        stroke="var(--c-ink)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M44 34 52 56l-10-3-6 9-8-24"
        fill="var(--c-pastel-ink)"
        stroke="var(--c-ink)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="24" r="18" fill="var(--c-pastel-ink)" stroke="var(--c-ink)" strokeWidth="2.5" />
      <circle cx="32" cy="24" r="12.5" fill="#fff" stroke="var(--c-ink)" strokeWidth="2" strokeDasharray="2.5 3.5" />
      <path
        d="M32 16.5 34.5 21.8 40.3 22.6 36.1 26.7 37.1 32.5 32 29.8 26.9 32.5 27.9 26.7 23.7 22.6 29.5 21.8Z"
        fill="var(--c-highlight)"
        stroke="var(--c-ink)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Un ícono por cifra, en el orden en que las guarda WordPress. */
const icons = [FamilyHouseIcon, RibbonBadgeIcon];

/**
 * Fila de cifras. No es una sección propia: vive dentro de la franja de
 * beneficios (`TrustBar`). Antes iban separadas y el usuario recorría catorce
 * micro-argumentos de confianza seguidos antes de ver un solo producto.
 *
 * Solo dos cifras, y las dos verificables. "Envíos a todo Ecuador" y "compra
 * segura" no son cifras: son promesas, ya viven en el footer y aquí solo
 * desinflaban la fila. Con dos items la fila se centra y sube de tamaño: dos
 * columnas de cinco se leen como una tabla a la que le faltan datos.
 */
export function StatsRow({
  stats,
  className,
}: {
  stats: Settings["stats"];
  className?: string;
}) {
  // Una cifra sin número no es una cifra: si el cliente vacía el valor, esa
  // columna desaparece en vez de dejar un hueco con solo la etiqueta.
  const items = [
    { Icon: icons[0], value: stats.stat1Value, label: stats.stat1Label },
    { Icon: icons[1], value: stats.stat2Value, label: stats.stat2Label },
  ].filter((item) => Boolean(item.value));

  if (!items.length) return null;

  return (
    <RevealGroup
      className={cn(
        "mx-auto mt-10 grid max-w-[560px] gap-x-6 gap-y-8 border-t border-[var(--c-border)] pt-8",
        items.length === 1 ? "grid-cols-1" : "grid-cols-2",
        className,
      )}
      gap={0.05}
    >
      {items.map(({ Icon, value, label }) => (
        <RevealItem
          key={label}
          variants={fadeScaleIn}
          className="flex flex-col items-center gap-2 text-center"
        >
          <Icon className="size-14" />
          <p className="font-[family-name:var(--font-heading)] text-[clamp(28px,4vw,36px)] leading-none font-semibold text-[var(--c-ink)]">
            {value}
          </p>
          <p className="max-w-[12rem] text-[14px] leading-tight font-semibold text-balance text-[var(--c-muted)]">
            {label}
          </p>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
