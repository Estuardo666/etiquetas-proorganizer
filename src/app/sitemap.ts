import type { MetadataRoute } from "next";
import { PRODUCTOS, SITE_URL } from "@/lib/catalogo";

export default function sitemap(): MetadataRoute.Sitemap {
  const rutas = ["/inicio", ...PRODUCTOS.map((item) => item.ruta), "/disenos", "/arme-su-pedido", "/como-funciona", "/preguntas-frecuentes"];
  return rutas.map((ruta) => ({ url: `${SITE_URL}${ruta}` }));
}
