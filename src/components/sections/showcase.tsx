import { SectionHeader } from "@/components/ui/section-header";
import { DecorativeBackground } from "@/components/ui/decor";
import { DesignsPanel } from "@/components/sections/designs";
import { GalleryPanel } from "@/components/sections/gallery";
import type { DesignItem, GalleryItem, Settings } from "@/lib/types";

/**
 * Diseños, muestras reales y personalización, uno detrás de otro.
 *
 * Estuvieron detrás de tabs para ahorrar scroll, y el ahorro salió caro: la
 * clienta que entraba veía "Categorías" y "Cómo personalizamos" y no llegaba a
 * las muestras reales, que son la prueba que cierra la venta. Un tab cerrado es
 * contenido que la mayoría no abre.
 *
 * La landing de Canva que sí convierte es scroll lineal puro: nada se descubre,
 * todo se ve bajando. Aquí se hace lo mismo, y cada panel conserva su ancla.
 *
 * La personalización salió de aquí y es sección propia (`design-love.tsx`),
 * justo debajo: ver los diseños y entender cómo se fabrican son dos lecturas
 * distintas, y la segunda cierra con la nota de aprobación que entrega el
 * turno a "Cómo funciona".
 */
export function Showcase({
  settings,
  designs,
  gallery,
}: {
  settings: Settings;
  designs: DesignItem[];
  gallery: GalleryItem[];
}) {
  const { designs: copy } = settings;
  const showGallery = settings.gallery.enabled && gallery.length > 0;

  if (!designs.length && !showGallery) return null;

  /** Compensa el header fijo al saltar por ancla. */
  const anchorOffset = {
    scrollMarginTop: "calc(var(--header-h) + var(--admin-bar-offset) + 24px)",
  } as const;

  return (
    <section id="disenos" className="section-y relative overflow-hidden bg-white">
      <DecorativeBackground variant="designs" />

      <div className="container-page relative z-10">
        <SectionHeader eyebrow={copy.eyebrow} eyebrowIcon="sparkles" title={copy.title} />

        {designs.length ? <DesignsPanel settings={settings} designs={designs} /> : null}

        {showGallery ? (
          <div id="galeria" className="mt-14" style={anchorOffset}>
            <GalleryPanel settings={settings} items={gallery} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
