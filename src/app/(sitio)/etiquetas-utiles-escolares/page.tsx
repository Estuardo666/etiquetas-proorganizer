import type { Metadata } from "next";
import { PaginaProducto } from "@/components/sitio/pagina-producto";

export const metadata: Metadata = {
  title: "Etiquetas para útiles escolares en Ecuador | Pro Organizer",
  description: "Etiquetas personalizadas para lápices, cuadernos, termos y loncheras. Cuatro tamaños desde $8 la hoja. Usted aprueba el diseño antes de imprimir.",
  alternates: { canonical: "/etiquetas-utiles-escolares" },
};

export default function Page() {
  return <PaginaProducto slug="utiles" />;
}
