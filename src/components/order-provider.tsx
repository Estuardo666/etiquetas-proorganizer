"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { MotionConfig } from "framer-motion";
import { buildWhatsAppUrl } from "@/lib/utils";
import { waMessageKeys, waSourcesWithSelection, type WaSource } from "@/lib/site-config";
import type { Settings } from "@/lib/types";

/** Tamaño elegido: el nombre solo no basta, el mensaje necesita la cantidad. */
export type SelectedSize = { title: string; count: string };

type OrderContextValue = {
  selectedSize: SelectedSize | null;
  selectSize: (size: SelectedSize) => void;
  selectedDesign: string | null;
  selectDesign: (title: string) => void;
  /**
   * Enlace de WhatsApp de un CTA. `source` decide el mensaje base; en las
   * secciones de cierre (hero y CTA final) lo elegido en la página manda.
   * `carrySelection` fuerza ese comportamiento en el botón flotante, que
   * acompaña al usuario después de elegir.
   */
  wa: (source: WaSource, carrySelection?: boolean) => string;
  /** Enlace con un mensaje propio: tarjetas de tamaño y de diseño. */
  waWith: (message: string) => string;
};

const OrderContext = createContext<OrderContextValue | null>(null);

export function OrderProvider({
  number,
  messages,
  children,
}: {
  number: string;
  /** Mensajes precargados, editables desde WordPress. */
  messages: Settings["whatsapp"];
  children: React.ReactNode;
}) {
  const [selectedSize, setSelectedSize] = useState<SelectedSize | null>(null);
  const [selectedDesign, setSelectedDesign] = useState<string | null>(null);

  // Selección única y reversible: volver a tocar la misma tarjeta deselecciona.
  const selectSize = useCallback((size: SelectedSize) => {
    setSelectedSize((current) => (current?.title === size.title ? null : size));
  }, []);

  const selectDesign = useCallback((title: string) => {
    setSelectedDesign((current) => (current === title ? null : title));
  }, []);

  const waWith = useCallback(
    (message: string) => buildWhatsAppUrl({ number, message }),
    [number],
  );

  const wa = useCallback(
    (source: WaSource, carrySelection?: boolean) => {
      // Cada dato que el usuario ya eligió viaja en el mensaje: si el chat
      // abre vacío tiene que volver a explicar lo que acaba de seleccionar, y
      // ahí es donde se pierden los pedidos.
      const carries = carrySelection ?? waSourcesWithSelection.includes(source);
      let message: string = messages[waMessageKeys[source]];

      if (carries && selectedSize) {
        message = `Hola, quiero etiquetas tamaño ${selectedSize.title} — ${selectedSize.count} por hoja`;
        message += selectedDesign ? `, diseño ${selectedDesign}.` : ".";
      } else if (carries && selectedDesign) {
        message = `Hola, quiero etiquetas con diseño de ${selectedDesign}.`;
      }

      return buildWhatsAppUrl({ number, message });
    },
    [messages, number, selectedDesign, selectedSize],
  );

  const value = useMemo(
    () => ({ selectedSize, selectSize, selectedDesign, selectDesign, wa, waWith }),
    [selectDesign, selectSize, selectedDesign, selectedSize, wa, waWith],
  );

  return (
    <OrderContext.Provider value={value}>
      {/* reducedMotion="user" desactiva los desplazamientos cuando el sistema lo pide. */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrder debe usarse dentro de OrderProvider");
  return ctx;
}
