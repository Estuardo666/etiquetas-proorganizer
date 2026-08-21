import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  // Tailwind compila hover:-translate-y-* como la propiedad CSS `translate`,
  // no `transform`: sin listarla aquí, el hover salta sin transición.
  // El desplazamiento del icono en hover solo tiene sentido en iconos de
  // avance (flechas, chevrons): un logo de marca que se mueve es ruido. Se
  // aplica con `.icon-shift`, no a todos los svg.
  // Todo el hover va tras `hover:hover`: en táctil el estado se queda pegado
  // tras el tap y el botón parece trabado.
  "focus-ring btn-3d group/btn inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-full font-[family-name:var(--font-body)] text-[16px] font-medium transition-[translate,box-shadow,background-color,color,border-color] duration-[110ms] [&_svg]:size-[19px] [&_svg]:shrink-0 [&_.icon-shift]:transition-transform [&_.icon-shift]:duration-[180ms] hover:[&_.icon-shift]:translate-x-[3px]",
  {
    variants: {
      variant: {
        // Verde de marca con rótulo oscuro (6,5:1); en hover el verde muy
        // claro (10,5:1). El extruido es el verde azulado oscuro.
        whatsapp:
          "bg-[var(--c-whatsapp)] text-[var(--c-whatsapp-text)] [--btn-extrude:var(--c-whatsapp-extrude)] hover:bg-[var(--c-whatsapp-ink)]",
        primary:
          "bg-[var(--c-navy)] text-white [--btn-extrude:#052c47] hover:brightness-110",
        // Segundo botón del par impreso: pastilla blanca con contorno marino.
        lavender:
          "border-2 border-[var(--c-navy)] bg-white text-[var(--c-navy)] [--btn-extrude:var(--c-navy)] hover:bg-[var(--c-navy)] hover:text-white",
        accent:
          "bg-[var(--c-highlight)] text-white [--btn-extrude:#7d130e] hover:brightness-105",
        outline:
          "border-2 border-[var(--c-navy)] bg-white text-[var(--c-navy)] [--btn-extrude:var(--c-navy)] hover:bg-[var(--c-navy)] hover:text-white",
        // Fantasma: sin relleno, sin extruido — no hay pastilla que hundir.
        ghost: "text-[var(--c-ink)] shadow-none hover:bg-[var(--c-tint-accent)] active:shadow-none",
        light:
          "bg-white text-[var(--c-ink)] [--btn-extrude:var(--c-navy)] hover:bg-[var(--c-tint-accent)]",
      },
      size: {
        sm: "min-h-[44px] px-5 py-2 text-[15px]",
        md: "px-6 py-3",
        lg: "px-8 py-4 text-[17px]",
        full: "w-full px-6 py-3.5",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

type LinkButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof buttonVariants>;

export function LinkButton({ className, variant, size, ...props }: LinkButtonProps) {
  return <a className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
