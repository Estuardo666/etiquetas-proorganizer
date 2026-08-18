"use client";

import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { BenefitArt } from "@/components/ui/illustrations";
import { fadeScaleIn } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { StatItem } from "@/lib/types";

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

function StatArt({ name }: { name: string }) {
  if (name === "house") return <FamilyHouseIcon className="size-14" />;
  if (name === "badge") return <RibbonBadgeIcon className="size-14" />;
  return <BenefitArt name={name} size={54} />;
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
