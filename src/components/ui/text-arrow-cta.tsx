import { cn } from "@/lib/utils";

/**
 * Text Arrow CTA — reconstrucción del componente de Framer
 * (framer.com/m/Text-Arrow-CTA-qdMepe.js). Mismo motivo que en
 * `fluid-button.tsx`: el paquete `framer` de npm solo trae tipos, y el efecto
 * depende de un estado de hover que comparten tres elementos, así que va en
 * CSS.
 *
 * Animación copiada del módulo:
 * - En reposo la flecha vive fuera, a la izquierda (`left: -20px`, absoluta);
 *   en hover entra al flujo y empuja el texto a la derecha.
 * - El subrayado son dos trazos de 1 px: el de la derecha se encoge hacia
 *   fuera (100 % → 1 %) mientras el de la izquierda crece (1 % → 100 %), así
 *   que la línea barre en vez de aparecer.
 * - Flecha original: `viewBox 0 0 20 15`, trazo de 1,5 px con extremos
 *   redondeados.
 */

type TextArrowCtaProps = {
  children: React.ReactNode;
  ariaLabel: string;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  color?: string;
  lineColor?: string;
  iconColor?: string;
  iconWidth?: number;
  className?: string;
  dataWaSource?: string;
};

export function TextArrowCta({
  children,
  ariaLabel,
  href,
  target,
  rel,
  onClick,
  color = "var(--c-ink)",
  lineColor = "var(--c-accent)",
  iconColor,
  iconWidth = 1.5,
  className,
  dataWaSource,
}: TextArrowCtaProps) {
  const Comp = href ? "a" : "button";

  return (
    <Comp
      {...(href ? { href, target, rel } : { type: "button" as const })}
      onClick={onClick}
      aria-label={ariaLabel}
      data-wa-source={dataWaSource}
      style={{ color }}
      className={cn(
        "focus-ring tac inline-flex min-h-[44px] items-center rounded-full font-[family-name:var(--font-body)] text-[15px] font-bold",
        className,
      )}
    >
      <span className="relative inline-flex items-center pb-[3px]">
        {/* La flecha entra abriendo hueco: el texto se desplaza, no salta. */}
        <span aria-hidden="true" className="tac__arrow">
          <svg
            viewBox="0 0 20 15"
            className="block h-[15px] w-[20px] shrink-0"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M 0 6.5 L 18 6.5 M 11.7 0 L 18 6.5 L 11.7 13"
              transform="translate(1 1)"
              fill="transparent"
              stroke={iconColor ?? color}
              strokeWidth={iconWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        <span className="whitespace-nowrap">{children}</span>

        {/* Trazo de reposo: se va por la derecha. */}
        <span
          aria-hidden="true"
          style={{ background: lineColor }}
          className="tac__line tac__line--out"
        />
        {/* Trazo de hover: entra por la izquierda. */}
        <span
          aria-hidden="true"
          style={{ background: lineColor }}
          className="tac__line tac__line--in"
        />
      </span>
    </Comp>
  );
}
