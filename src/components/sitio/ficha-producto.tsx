import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { SecondaryButton } from "@/components/ui/secondary-button";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { pipes } from "@/lib/utils";
import type { Producto } from "@/lib/catalogo";
import type { Settings, SizeItem } from "@/lib/types";

/**
 * Tamaño y precio juntos para productos de una sola medida. Las secciones de
 * tamaños y promociones están pensadas para varias tarjetas: con una sola
 * quedaban descentradas y ofrecían comparar tamaños que no existen.
 */
export function FichaProducto({ item, talla, settings }: { item: Producto; talla: SizeItem; settings: Settings }) {
  const envios = pipes(settings.pricing.deliveryOptions);

  return (
    <section id="tamanos" className="section-y bg-white">
      <div className="container-page">
        <div className={`mx-auto grid max-w-[1000px] overflow-hidden rounded-[28px] md:grid-cols-2 ${item.superficie}`}>
          {talla.image?.url ? (
            <Image src={talla.image.url} alt={talla.image.alt} width={700} height={700} sizes="(max-width: 768px) 100vw, 500px" className="aspect-[4/3] h-full w-full object-cover md:aspect-auto" />
          ) : null}
          <div className="p-6 text-[var(--c-ink)] md:p-8">
            <h2 className="h2-display">{item.nombre}</h2>
            <p className="mt-3 text-[34px] font-bold">{item.precio}</p>
            <dl className="mt-4 grid gap-3 text-[16px]">
              <div><dt className="font-bold">Medida</dt><dd>{talla.dims}</dd></div>
              <div><dt className="font-bold">Contenido</dt><dd>{talla.count}{item.slug === "ropa" ? " por hoja" : ""}</dd></div>
              <div><dt className="font-bold">Ideal para</dt><dd>{talla.uses}</dd></div>
              <div>
                <dt className="font-bold">Envío</dt>
                <dd>{envios.map(([zona, precio]) => `${zona}: ${precio}`).join(". ")}.</dd>
              </div>
            </dl>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <WhatsAppButton source="hero" variant="primary" ariaLabel={`${item.cta} por WhatsApp`}>{item.cta}</WhatsAppButton>
              <SecondaryButton href={`/arme-su-pedido?producto=${item.slug}`} ariaLabel="Arme su pedido">Arme su pedido</SecondaryButton>
            </div>
            <p className="mt-3 flex items-center gap-2 text-[14px]"><ShieldCheck className="size-5 shrink-0" strokeWidth={1.75} aria-hidden="true" />{settings.founder.guaranteeText}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
