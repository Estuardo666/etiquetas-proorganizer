import type { Metadata } from "next";
import { PaginaLegal } from "@/components/sitio/pagina-legal";

export const metadata: Metadata = {
  title: "Política de privacidad | Pro Organizer",
  robots: { index: false },
  alternates: { canonical: "/privacidad" },
};

export default function Page() {
  return (
    <PaginaLegal
      titulo="Privacidad"
      bloques={[
        ["Qué datos recibimos", "Los datos que usted comparte para su pedido: nombres para las etiquetas, fotos, contacto y dirección de entrega."],
        ["Para qué los usamos", "Solo para diseñar, producir y entregar su pedido y para responder sus consultas."],
        ["Con quién los compartimos", "Con el servicio de envío, en lo necesario para entregar su pedido."],
        ["Fotos de menores", "Usamos las fotos únicamente para su pedido. No las publicamos sin autorización."],
        ["Sus derechos", "Puede pedir acceso, corrección o eliminación de sus datos escribiéndonos por WhatsApp."],
      ]}
    />
  );
}
