"use client";

import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { BenefitArt } from "@/components/ui/illustrations";
import { fadeScaleIn } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { StatItem } from "@/lib/types";

/**
 * Un ícono SVG plano por estadística.
 *
 * Cada pieza lleva su propio color —tejado azul, muros crema, puerta naranja,
 * corazón rojo— y no un solo relleno por figura: con un color plano el dibujo
 * se lee como una silueta y pierde el aire de ilustración infantil que tiene el
 * resto de la página. El contorno azul marino es lo único común, y es lo que
 * mantiene a los cinco iconos de la franja como una familia.
 */
function FamilyHouseIcon({ style }: { style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 64 64" style={style} aria-hidden="true">
      {/* Muros */}
      <path
        d="M12 27h40v30H12Z"
        fill="color-mix(in srgb, var(--c-star) 32%, #ffffff)"
        stroke="var(--c-ink)"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
      {/* Tejado */}
      <path
        d="M32 6 59 29H5Z"
        fill="var(--c-blue)"
        stroke="var(--c-ink)"
        strokeWidth="2.0"
        strokeLinejoin="round"
      />
      <path d="M32 11.5 50 27H14Z" fill="color-mix(in srgb, var(--c-blue) 55%, #ffffff)" />
      {/* Corazón del alero */}
      <path
        d="M32 25c-4-2.6-6.4-4.6-6.4-7a3.3 3.3 0 0 1 6.4-1.2 3.3 3.3 0 0 1 6.4 1.2c0 2.4-2.4 4.4-6.4 7Z"
        fill="var(--c-highlight)"
        stroke="var(--c-ink)"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      {/* Ventanal con la familia */}
      <rect
        x="17"
        y="33"
        width="30"
        height="17"
        rx="3"
        fill="var(--c-tint-positive)"
        stroke="var(--c-ink)"
        strokeWidth="1.7"
      />
      <path d="M24 50v-6a3.6 3.6 0 0 1 7.2 0v6Z" fill="var(--c-purple)" />
      <circle cx="27.6" cy="39.5" r="3.1" fill="var(--c-purple)" stroke="var(--c-ink)" strokeWidth="1.2" />
      <path d="M33.6 50v-5a3.2 3.2 0 0 1 6.4 0v5Z" fill="var(--c-orange)" />
      <circle cx="36.8" cy="40.8" r="2.8" fill="var(--c-orange)" stroke="var(--c-ink)" strokeWidth="1.2" />
      {/* Puerta */}
      <rect
        x="27"
        y="50"
        width="10"
        height="7"
        rx="1.6"
        fill="var(--c-orange)"
        stroke="var(--c-ink)"
        strokeWidth="1.6"
      />
      <circle cx="34.6" cy="53.8" r="1.1" fill="var(--c-ink)" />
    </svg>
  );
}

function RibbonBadgeIcon({ style }: { style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 64 64" style={style} aria-hidden="true">
      <path
        d="M20 34 12 56l10-3 6 9 8-24"
        fill="var(--c-blue)"
        stroke="var(--c-ink)"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M44 34 52 56l-10-3-6 9-8-24"
        fill="color-mix(in srgb, var(--c-blue) 72%, var(--c-ink))"
        stroke="var(--c-ink)"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle
        cx="32"
        cy="24"
        r="18"
        fill="color-mix(in srgb, var(--c-blue) 42%, #ffffff)"
        stroke="var(--c-ink)"
        strokeWidth="1.8"
      />
      <circle
        cx="32"
        cy="24"
        r="12.5"
        fill="color-mix(in srgb, var(--c-star) 26%, #ffffff)"
        stroke="var(--c-ink)"
        strokeWidth="1.4"
        strokeDasharray="2.5 3.5"
      />
      <path
        d="M32 16.5 34.5 21.8 40.3 22.6 36.1 26.7 37.1 32.5 32 29.8 26.9 32.5 27.9 26.7 23.7 22.6 29.5 21.8Z"
        fill="var(--c-star)"
        stroke="var(--c-ink)"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Dibujo de una cifra. Lo usa `TrustBar`, que las pinta en la misma fila que
 * los beneficios: por eso acepta tamaño en vez de fijarlo.
 */
export function StatArt({ name, size = 56 }: { name: string; size?: number }) {
  const style = { width: size, height: size } as const;
  if (name === "house") return <FamilyHouseIcon style={style} />;
  if (name === "badge") return <RibbonBadgeIcon style={style} />;
  return <BenefitArt name={name} size={size} />;
}

/**
 * Fila de cifras. No es una sección propia: vive dentro de la franja de
 * beneficios (`TrustBar`). Antes iban separadas y el usuario recorría catorce
 * micro-argumentos de confianza seguidos antes de ver un solo producto.
 *
 * WordPress controla cuántas cifras hay, su orden y su icono. La rejilla usa
 * auto-fit para crecer sin dejar huecos si la clienta añade o quita fichas.
 */
export function StatsRow({
  items,
  className,
}: {
  items: StatItem[];
  className?: string;
}) {
  const visible = items.filter((item) => Boolean(item.value));

  if (!visible.length) return null;

  return (
    <RevealGroup
      className={cn(
        "mx-auto mt-10 grid max-w-[1100px] gap-x-6 gap-y-8 border-t border-[var(--c-border)] pt-8 [grid-template-columns:repeat(auto-fit,minmax(180px,1fr))]",
        className,
      )}
      gap={0.05}
    >
      {visible.map((item) => (
        <RevealItem
          key={item.id}
          variants={fadeScaleIn}
          className="flex flex-col items-center gap-2 text-center"
        >
          <StatArt name={item.icon} />
          <p className="font-[family-name:var(--font-heading)] text-[clamp(28px,4vw,36px)] leading-none font-semibold text-[var(--c-ink)]">
            {item.value}
          </p>
          <p className="max-w-[12rem] text-[14px] leading-tight font-semibold text-balance text-[var(--c-muted)]">
            {item.title}
          </p>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
