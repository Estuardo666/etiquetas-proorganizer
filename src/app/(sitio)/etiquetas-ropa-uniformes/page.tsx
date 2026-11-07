import type { Metadata } from "next";
import { PaginaProducto } from "@/components/sitio/pagina-producto";

export const metadata: Metadata = {
  title: "Etiquetas para ropa y uniformes en Ecuador | Pro Organizer",
  description: "Etiquetas personalizadas que se pegan con plancha y resisten lavadora y secadora. $8 la hoja, con envíos a todo Ecuador.",
  alternates: { canonical: "/etiquetas-ropa-uniformes" },
};

export default function Page() {
  return <PaginaProducto slug="ropa" />;
}
