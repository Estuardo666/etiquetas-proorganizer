import { cn } from "@/lib/utils";

/**
 * Fluid Button — reconstrucción del componente de Framer
 * (framer.com/m/Fluid-Button-TYcP.js).
 *
 * El módulo original no se puede importar: el paquete `framer` de npm es
 * *types-only* ("This types-only package provides the types used by Framer's
 * built-in code editor"), así que `Link`, `RichText`, `withCSS` y
 * `useVariantState` no existen en tiempo de ejecución. Lo que sí se puede
 * copiar es la animación, y está replicada valor por valor a partir del CSS y
 * las variantes del módulo:
 *
 * - Píldora con `overflow: hidden` y borde de 2 px.
 * - Un óvalo de color espera justo debajo del botón (`top: 100%`,
 *   `height: 110%`, `border-radius: 50%`) y en hover sube a `top: 0`
 *   aplanándose a `border-radius: 0`: el relleno líquido.
 * - La pila de etiquetas lleva dos copias del contenido y se desplaza
 *   `translateY(-100%)`, así que la de arriba sale y entra la de abajo.
 * - Pulso de escala `1 → 1,05 (al 65 %) → 1`, no un escalado sostenido.
 * - Todo con `500 ms cubic-bezier(0.4, 0, 0, 1)`.
 *
 * En CSS plano y no en framer-motion: el efecto entero depende de un unico
 * estado de hover que comparten tres elementos a la vez. Con variantes de
 * Motion eso obliga a propagar la etiqueta del gesto del padre a los hijos, y
 * basta con que el gesto de puntero no llegue para que el boton se quede a
 * medias — el ovalo quieto y el texto sin cambiar. Las reglas viven en
 * `globals.css` (`.fluid-btn__fill`, `.fluid-btn__stack`, `@keyframes
 * fluid-pulse`): no pueden desincronizarse, no necesitan hidratacion y el
 * bloque de `prefers-reduced-motion` ya las neutraliza.
 */

/**
 * Escala reducida ~15 % respecto a la anterior (52 → 44, 58 → 49) y con menos
 * relleno lateral (px-7 → px-5, px-9 → px-6).
 *
 * El alto se queda en 44 px como suelo y no baja mas, ni siquiera en la
 * variante pequena: 44 px es el objetivo tactil minimo recomendado, y un CTA
 * que se falla al pulsar en movil no es un CTA. Lo que encoge en `xs` es el
 * texto y el relleno, no la zona pulsable.
 */
const sizes = {
  xs: "min-h-[44px] px-4 text-[14px]",
  sm: "min-h-[44px] px-4 text-[14.5px]",
  md: "min-h-[44px] px-5 text-[15px]",
  lg: "min-h-[49px] px-6 text-[16px]",
} as const;

type FluidButtonProps = {
  children: React.ReactNode;
  /** Obligatorio: el contenido va duplicado, los lectores solo deben oírlo una vez. */
  ariaLabel: string;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  size?: keyof typeof sizes;
  /** Color de reposo de la píldora. */
  background?: string;
  /** Color que sube al hacer hover. */
  overlayColor?: string;
  textColor?: string;
  /** Color del texto una vez el relleno ha subido. */
  secondTextColor?: string;
  borderColor?: string;
  pulse?: boolean;
  className?: string;
  /** Atribución de la conversión; lo usa `WhatsAppButton`. */
  dataWaSource?: string;
};

export function FluidButton({
  children,
  ariaLabel,
  href,
  target,
  rel,
  onClick,
  size = "md",
  background = "var(--c-accent)",
  overlayColor = "var(--c-ink)",
  textColor = "var(--c-ink)",
  secondTextColor = "#ffffff",
  borderColor = "transparent",
  pulse = true,
  className,
  dataWaSource,
}: FluidButtonProps) {
  const Comp = href ? "a" : "button";

  return (
    <Comp
      {...(href ? { href, target, rel } : { type: "button" as const })}
      onClick={onClick}
      aria-label={ariaLabel}
      data-wa-source={dataWaSource}
      style={{ background, borderColor }}
      className={cn(
        "focus-ring fluid-btn relative isolate inline-flex items-center justify-center overflow-hidden rounded-full border-2 font-[family-name:var(--font-body)] font-medium active:scale-[0.98]",
        pulse && "fluid-pulse",
        sizes[size],
        className,
      )}
    >
      {/* Óvalo de relleno: espera bajo el botón y sube al hacer hover. */}
      <span aria-hidden="true" style={{ background: overlayColor }} className="fluid-btn__fill" />

      {/* Ventana de una línea: recorta la pila para que solo se vea una copia. */}
      <span className="relative block h-[1.25rem] overflow-hidden">
        <span className="fluid-btn__stack">
          <span
            className="flex h-[1.25rem] items-center justify-center gap-2.5 leading-none whitespace-nowrap"
            style={{ color: textColor }}
          >
            {children}
          </span>
          <span
            aria-hidden="true"
            className="flex h-[1.25rem] items-center justify-center gap-2.5 leading-none whitespace-nowrap"
            style={{ color: secondTextColor }}
          >
            {children}
          </span>
        </span>
      </span>
    </Comp>
  );
}
