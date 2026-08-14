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
 * Todas las variantes salvo `link` son `FluidButton`: el relleno verde sube
 * desde abajo al hacer hover, de verde oscuro a verde WhatsApp. Se queda verde
 * en los dos estados a propósito — el color es la señal de "esto abre el
 * chat", y una inversión a blanco la borraría justo en el momento de decidir.
 *
 * `link` es `TextArrowCta`: dentro de una rejilla de tarjetas, tres botones
 * verdes seguidos compiten entre sí y con el CTA principal de la sección.
 */
type Variant = "primary" | "hero" | "nav" | "float" | "footer" | "inline" | "link";

const sizeFor: Record<Exclude<Variant, "link">, "sm" | "md" | "lg"> = {
  primary: "md",
  hero: "lg",
  nav: "sm",
  float: "md",
  footer: "sm",
  inline: "md",
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
        color="var(--c-whatsapp-ink)"
        lineColor="var(--c-whatsapp-ink)"
        className={cn("text-[13px]", className)}
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
      background="var(--c-whatsapp-ink)"
      overlayColor="var(--c-whatsapp)"
      textColor="#ffffff"
      secondTextColor="var(--c-ink)"
      className={className}
    >
      <WhatsAppIcon className="size-[19px] shrink-0" />
      {content}
    </FluidButton>
  );
}
