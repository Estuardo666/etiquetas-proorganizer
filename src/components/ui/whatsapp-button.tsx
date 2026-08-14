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
 * Todas las variantes salvo `link` son `FluidButton`. El relleno gris oscuro
 * sube sobre el verde de la paleta: verde con texto en gris oscuro en reposo
 * (13,9:1) y gris oscuro con texto blanco al hacer hover (14,8:1). El icono
 * sigue identificando el canal aunque el verde ya no sea el de la marca de
 * WhatsApp — la pagina tiene un solo sistema de color y el icono basta para
 * saber que esto abre un chat.
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
      background="var(--c-whatsapp)"
      overlayColor="var(--c-whatsapp-ink)"
      textColor="var(--c-ink)"
      secondTextColor="#ffffff"
      className={className}
    >
      <WhatsAppIcon className="size-[17px] shrink-0" />
      {content}
    </FluidButton>
  );
}
