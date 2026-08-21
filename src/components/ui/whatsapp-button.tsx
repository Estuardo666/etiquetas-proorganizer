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
 * rotulo oscuro en reposo (6,5:1) y relleno verde muy claro al hacer hover
 * (10,5:1), sobre un extruido verde azulado oscuro.
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
  /**
   * Cuando la sección pinta el CTA con el color de su tarjeta, la paleta de
   * WhatsApp deja de aplicar: son rellenos oscuros y saturados, así que el
   * rótulo va en blanco y el hover sube el azul marino. El verde claro
   * (`--c-whatsapp-ink`) es solo del botón verde de WhatsApp.
   */
  const custom = Boolean(background);
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
      overlayColor={overlayColor ?? (custom ? "var(--c-navy)" : "var(--c-whatsapp-ink)")}
      extrudeColor={custom ? undefined : "var(--c-whatsapp-extrude)"}
      textColor={textColor ?? (custom ? "#ffffff" : "var(--c-whatsapp-text)")}
      secondTextColor={custom ? "#ffffff" : "var(--c-whatsapp-text)"}
      className={className}
    >
      <WhatsAppIcon className="size-[17px] shrink-0" />
      {content}
    </FluidButton>
  );
}
