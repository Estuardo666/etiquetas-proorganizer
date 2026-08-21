import { SectionHeader } from "@/components/ui/section-header";
import { DecorativeBackground } from "@/components/ui/decor";
import { DesignsPanel } from "@/components/sections/designs";
import type { DesignItem, Settings } from "@/lib/types";

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
 * La galería de muestras se retiró: repetía los mismos personajes que ya
 * enseña la franja "Personalice a su gusto", con un nombre de ejemplo ("Juan
 * López") en cada pieza y una rejilla que se descolocaba. El componente sigue
 * en `gallery.tsx` por si vuelve con fotos de producto real.
 *
 * La personalización salió de aquí y es sección propia (`design-love.tsx`),
 * justo debajo: ver los diseños y entender cómo se fabrican son dos lecturas
 * distintas, y la segunda cierra con la nota de aprobación que entrega el
 * turno a "Cómo funciona".
 */
export function Showcase({ settings, designs }: { settings: Settings; designs: DesignItem[] }) {
  const { designs: copy } = settings;

  if (!designs.length) return null;

  return (
    <section id="disenos" className="section-y relative overflow-hidden bg-white">
      <DecorativeBackground variant="designs" />

      <div className="container-page relative z-10">
        <SectionHeader eyebrow={copy.eyebrow} eyebrowIcon="sparkles" title={copy.title} />

        <DesignsPanel settings={settings} designs={designs} />
      </div>
    </section>
  );
}
