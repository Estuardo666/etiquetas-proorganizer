import type { Metadata } from "next";
import { CierreCta, PageIntro } from "@/components/sitio/piezas";
import { EnviosPagos, LineaPasos, ResistenciaGarantia, TiemposVisual } from "@/components/sitio/vista-como-funciona";
import { ajustesSitio } from "@/lib/catalogo";
import { pipes } from "@/lib/utils";
import { getSiteContent } from "@/lib/wp";

export const metadata: Metadata = {
  title: "Cómo funciona el pedido | Pro Organizer",
  description: "Pasos del pedido, tiempos, costos de envío y formas de pago de las etiquetas personalizadas Pro Organizer.",
  alternates: { canonical: "/como-funciona" },
};

export default async function Page() {
  const { settings: original } = await getSiteContent();
  const settings = ajustesSitio(original);
  return (
    <>
      <PageIntro titulo="Cómo" acento="funciona" texto="Usted elige, nosotros diseñamos, usted aprueba." />
      <LineaPasos />
      <TiemposVisual />
      <EnviosPagos envios={pipes(settings.pricing.deliveryOptions)} />
      <ResistenciaGarantia garantia={settings.founder.guaranteeText} />
      <CierreCta />
    </>
  );
}
