import type { Metadata } from "next";
import { PaginaLegal } from "@/components/sitio/pagina-legal";

export const metadata: Metadata = {
  title: "Términos | Pro Organizer",
  robots: { index: false },
  alternates: { canonical: "/terminos" },
};

export default function Page() {
  return (
    <PaginaLegal
      titulo="Términos"
      bloques={[
        ["Pedidos", "Cada pedido se confirma por WhatsApp o en la tienda en línea."],
        ["Pago", "Al ser productos personalizados, trabajamos con pago previo."],
        ["Aprobación del diseño", "Enviamos el diseño para su aprobación e imprimimos solo con ella."],
        ["Garantía", "Si existe un error en el diseño aprobado por nosotros, reimprimimos sin costo."],
        ["Entrega", "2 a 3 días laborables después de aprobar el diseño, más 1 día de entrega."],
      ]}
    />
  );
}
