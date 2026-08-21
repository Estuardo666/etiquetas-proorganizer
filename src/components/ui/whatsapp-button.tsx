"use client";

import { FluidButton } from "@/components/ui/fluid-button";
import { TextArrowCta } from "@/components/ui/text-arrow-cta";
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
 *
 * Todas las variantes salvo `link` son `FluidButton`. Verde de marca con
 * rotulo blanco en reposo (5,0:1) y relleno azul marino al hacer hover
 * (9,0:1): el mismo boton verde del material impreso.
 *
 * `link` es `TextArrowCta`: dentro de una rejilla de tarjetas, un boton solido
 * por tarjeta compite con el CTA principal de la seccion.
 */
type Variant = "primary" | "hero" | "nav" | "float" | "footer" | "inline" | "link";

const sizeFor: Record<Exclude<Variant, "link">, "xs" | "sm" | "md" | "lg"> = {
  primary: "md",
  hero: "lg",
  nav: "sm",
  float: "sm",
  footer: "xs",
  inline: "sm",
};

export function WhatsAppButton({
  source,
  message,
  carrySelection,
  label,
  ariaLabel,
  variant = "primary",
  background,
  overlayColor,
  textColor,
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
  /** Relleno del CTA: la tarjeta elegida lo pinta con su propio color. */
  background?: string;
  /** Color que sube en hover; por defecto el azul marino de marca. */
  overlayColor?: string;
  textColor?: string;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}) {
  const { wa, waWith } = useOrder();
  const href = message ? waWith(message) : wa(source, carrySelection);
  const content = children ?? label;

  if (variant === "link") {
    return (
      <TextArrowCta
        href={href}
        target="_blank"
        rel="noopener"
        ariaLabel={ariaLabel}
        dataWaSource={source}
        onClick={onClick}
        color="var(--c-ink)"
        background={background}
        lineColor="var(--c-accent)"
        className={cn("text-[13.5px]", className)}
      >
        {content}
      </TextArrowCta>
    );
  }

  return (
    <FluidButton
      href={href}
      target="_blank"
      rel="noopener"
      ariaLabel={ariaLabel}
      dataWaSource={source}
      onClick={onClick}
      size={sizeFor[variant]}
      background={background ?? "var(--c-whatsapp)"}
      overlayColor={overlayColor ?? "var(--c-whatsapp-ink)"}
      textColor={textColor ?? "#ffffff"}
      secondTextColor="#ffffff"
      className={className}
    >
      <WhatsAppIcon className="size-[17px] shrink-0" />
      {content}
    </FluidButton>
  );
}
