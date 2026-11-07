import type { Metadata } from "next";
import { ArmeSuPedido } from "@/components/sitio/arme-su-pedido";
import { PageIntro } from "@/components/sitio/piezas";
import { PRODUCTOS } from "@/lib/catalogo";
import { getSiteContent } from "@/lib/wp";

export const metadata: Metadata = {
  title: "Arme su pedido de etiquetas | Pro Organizer",
  description: "Elija producto, tamaño, diseño y nombre. Su pedido llega escrito a WhatsApp.",
  alternates: { canonical: "/arme-su-pedido" },
};

export default async function Page({ searchParams }: { searchParams: Promise<{ producto?: string }> }) {
  const [content, query] = await Promise.all([getSiteContent(), searchParams]);
  const inicial = PRODUCTOS.find((item) => item.slug === query.producto)?.slug;
  return (
    <>
      <PageIntro titulo="Arme" acento="su pedido" texto="Elija lo que necesita y envíelo a WhatsApp. Le respondemos con el diseño para aprobar." />
      <ArmeSuPedido inicial={inicial} sizes={content.sizes} designs={content.designs} />
    </>
  );
}
