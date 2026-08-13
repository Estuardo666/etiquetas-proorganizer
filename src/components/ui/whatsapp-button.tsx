"use client";

import { LinkButton } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/icon";
import { useOrder } from "@/components/order-provider";
import { cn } from "@/lib/utils";
import type { WaSource } from "@/lib/site-config";

/**
 * Único botón de WhatsApp de la página. Antes cada sección repetía el mismo
 * ancla con sus propias clases y su propio mensaje: seis copias que se
 * desincronizaban en cuanto cambiaba una.
 *
 * `source` decide el mensaje precargado; `message` lo sobrescribe cuando el
 * CTA es de una tarjeta concreta (un tamaño, un diseño).
 */
type Variant = "primary" | "hero" | "nav" | "float" | "footer" | "inline" | "link";

const styles: Record<
  Variant,
  { size: "sm" | "md" | "lg" | "full"; className?: string; icon: string }
> = {
  primary: { size: "md", icon: "size-5" },
  hero: { size: "md", icon: "size-5" },
  nav: {
    size: "sm",
    className: "px-4 text-[14.5px] shadow-none hover:shadow-none active:shadow-none",
    icon: "size-[19px]",
  },
  float: {
    size: "lg",
    className: "shadow-none hover:shadow-none active:shadow-none hover:-translate-y-[3px]",
    icon: "size-5",
  },
  footer: { size: "sm", className: "px-4 text-[14px]", icon: "size-[17px]" },
  inline: { size: "sm", icon: "size-[18px]" },
  // Tres botones verdes seguidos en una rejilla de tarjetas compiten entre sí
  // y con el CTA principal: dentro de una tarjeta el enlace va en texto.
  link: { size: "sm", className: "min-h-[40px] gap-1.5 px-3 text-[13px]", icon: "size-[16px]" },
};

export function WhatsAppButton({
  source,
  message,
  carrySelection,
  label,
  ariaLabel,
  variant = "primary",
  size,
  className,
  children,
  onClick,
}: {
  /** Sección de origen: define el mensaje y la atribución del clic. */
  source: WaSource;
  /** Mensaje propio; ignora el de la sección. */
  message?: string;
  /** Arrastra el tamaño y el diseño elegidos aunque la sección no lo haga. */
  carrySelection?: boolean;
  label?: string;
  /** Obligatorio cuando el texto visible no describe la acción por sí solo. */
  ariaLabel: string;
  variant?: Variant;
  size?: "sm" | "md" | "lg" | "full";
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}) {
  const { wa, waWith } = useOrder();
  const style = styles[variant];

  return (
    <LinkButton
      href={message ? waWith(message) : wa(source, carrySelection)}
      target="_blank"
      rel="noopener"
      variant={variant === "link" ? "ghost" : "whatsapp"}
      size={size ?? style.size}
      aria-label={ariaLabel}
      data-wa-source={source}
      className={cn(
        style.className,
        variant === "link" && "text-[var(--c-whatsapp-ink)] hover:bg-[var(--c-bg-light)]",
        className,
      )}
      onClick={onClick}
    >
      <WhatsAppIcon className={style.icon} />
      {children ?? label}
    </LinkButton>
  );
}
