import { FluidButton } from "@/components/ui/fluid-button";
import { cn } from "@/lib/utils";

/**
 * Botón secundario: mismo componente y misma animación que el principal, un
 * escalón por debajo en tamaño y en pastilla blanca con contorno azul marino
 * en vez del verde — el segundo botón del par que usa el material impreso.
 *
 * La jerarquía la marcan el tamaño y el color, no la forma. Dos formas
 * distintas (una píldora sólida y un enlace subrayado, por ejemplo) obligan a
 * leer para saber cuál es la acción importante; dos píldoras del mismo estilo
 * con distinto peso se ordenan de un vistazo.
 *
 * Texto azul marino sobre blanco (9,0:1) y blanco sobre azul marino al hacer
 * hover (9,0:1).
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
      background="#ffffff"
      overlayColor="var(--c-navy)"
      borderColor="var(--c-navy)"
      textColor="var(--c-navy)"
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
