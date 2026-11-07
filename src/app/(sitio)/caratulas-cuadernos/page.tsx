import type { Metadata } from "next";
import { PaginaProducto } from "@/components/sitio/pagina-producto";

export const metadata: Metadata = {
  title: "Carátulas personalizadas para cuadernos en Ecuador | Pro Organizer",
  description: "Carátulas personalizadas de 24 x 18 cm para cuadernos de todos los niveles, a $2,50 cada una. Usted aprueba el diseño antes de imprimir.",
  alternates: { canonical: "/caratulas-cuadernos" },
};

export default function Page() {
  return <PaginaProducto slug="caratulas" />;
}
