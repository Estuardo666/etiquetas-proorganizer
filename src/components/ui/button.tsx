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
  "focus-ring group/btn inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-full font-[family-name:var(--font-body)] text-[16px] font-medium transition-[translate,scale,box-shadow,background-color,color,border-color] duration-[180ms] active:translate-y-0 active:scale-[0.98] [&_svg]:size-[19px] [&_svg]:shrink-0 [&_.icon-shift]:transition-transform [&_.icon-shift]:duration-[180ms] hover:[&_.icon-shift]:translate-x-[3px]",
  {
    variants: {
      variant: {
        // Verde de marca con rótulo blanco (5,0:1), como en el material impreso.
        whatsapp:
          "bg-[var(--c-whatsapp)] text-white shadow-none hover:-translate-y-0.5 hover:bg-[var(--c-whatsapp-ink)] active:shadow-none",
        primary:
          "bg-[var(--c-navy)] text-white shadow-[0_10px_24px_-14px_rgba(11,74,117,0.9)] hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_16px_32px_-14px_rgba(11,74,117,0.95)]",
        // Segundo botón del par impreso: pastilla blanca con contorno marino.
        lavender:
          "border-2 border-[var(--c-navy)] bg-white text-[var(--c-navy)] hover:-translate-y-0.5 hover:bg-[var(--c-navy)] hover:text-white",
        accent:
          "bg-[var(--c-highlight)] text-white shadow-[0_10px_24px_-14px_rgba(222,43,34,0.95)] hover:-translate-y-0.5 hover:brightness-105",
        outline:
          "border-2 border-[var(--c-navy)] bg-white text-[var(--c-navy)] hover:-translate-y-0.5 hover:bg-[var(--c-navy)] hover:text-white",
        ghost: "text-[var(--c-ink)] hover:bg-[var(--c-tint-accent)]",
        light:
          "bg-white text-[var(--c-ink)] shadow-[0_10px_24px_-16px_rgba(11,74,117,0.8)] hover:-translate-y-0.5 hover:bg-[var(--c-tint-accent)]",
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
