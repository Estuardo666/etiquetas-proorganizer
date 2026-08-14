import { FluidButton } from "@/components/ui/fluid-button";
import { cn } from "@/lib/utils";

/**
 * Botón secundario: mismo componente y misma animación que el principal, un
 * escalón por debajo en tamaño y en el morado de la paleta en vez del verde.
 *
 * La jerarquía la marcan el tamaño y el color, no la forma. Dos formas
 * distintas (una píldora sólida y un enlace subrayado, por ejemplo) obligan a
 * leer para saber cuál es la acción importante; dos píldoras del mismo estilo
 * con distinto peso se ordenan de un vistazo.
 *
 * Texto en gris oscuro sobre morado (5,6:1) y blanco sobre gris oscuro al
 * hacer hover (14,8:1).
 */
export function SecondaryButton({
  children,
  ariaLabel,
  href,
  target,
  rel,
  onClick,
  className,
}: {
  children: React.ReactNode;
  ariaLabel: string;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <FluidButton
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      ariaLabel={ariaLabel}
      size="xs"
      background="var(--c-accent)"
      overlayColor="var(--c-ink)"
      textColor="var(--c-ink)"
      secondTextColor="#ffffff"
      // Sin pulso: el rebote es el gesto del CTA principal y repetirlo en el
      // secundario iguala dos cosas que no tienen el mismo peso.
      pulse={false}
      className={cn("font-bold", className)}
    >
      {children}
    </FluidButton>
  );
}
