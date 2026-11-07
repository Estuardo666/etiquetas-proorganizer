"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { PRODUCTOS, producto, type ProductoSlug } from "@/lib/catalogo";
import { cn } from "@/lib/utils";
import type { DesignItem, SizeItem } from "@/lib/types";

const opcion = "focus-ring min-h-[48px] rounded-[18px] border-2 p-3 text-left text-[var(--c-ink)] transition-colors";
const estado = (activa: boolean) => (activa ? "border-[var(--c-navy)] bg-[var(--c-tint-accent)]" : "border-[var(--c-border)] bg-white");

/** Calcula solo lo publicado; lo demás se confirma en el chat. */
function totalEstimado(slug: ProductoSlug, cantidad: number) {
  const unitario = producto(slug).precioNumero;
  if (slug !== "utiles") return { total: slug === "caratulas" ? unitario * cantidad : null, promo: "" };
  if (cantidad === 3) return { total: 20, promo: "Incluye la 3era hoja al 50 %." };
  if (cantidad === 4) return { total: 24, promo: "Incluye la 4ta hoja gratis." };
  if (cantidad > 4) return { total: null, promo: "" };
  return { total: unitario * cantidad, promo: cantidad === 2 ? "Agregue 1 hoja más y aproveche la promoción." : "" };
}

const dinero = (valor: number) => `$${valor.toFixed(2).replace(".", ",").replace(",00", "")}`;

export function ArmeSuPedido({ inicial, sizes, designs }: { inicial?: ProductoSlug; sizes: SizeItem[]; designs: DesignItem[] }) {
  const [slug, setSlug] = useState<ProductoSlug | null>(inicial ?? null);
  const [tamano, setTamano] = useState<SizeItem | null>(null);
  const [diseno, setDiseno] = useState("");
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState(1);

  const elegir = (valor: ProductoSlug) => {
    setSlug(valor);
    setTamano(null);
  };

  const item = slug ? producto(slug) : null;
  const pideTamano = slug === "utiles";
  const pideDiseno = slug !== null && slug !== "caratulas";
  const listo = Boolean(item && nombre.trim() && (!pideTamano || tamano) && (!pideDiseno || diseno));
  const calculo = slug ? totalEstimado(slug, cantidad) : null;

  const mensaje = useMemo(() => {
    if (!item) return "";
    const partes = [item.mensaje, `Cantidad: ${cantidad} ${item.unidad}.`];
    if (tamano) partes.push(`Tamaño: ${tamano.title} (${tamano.count} por hoja).`);
    if (diseno) partes.push(`Diseño: ${diseno}.`);
    partes.push(`Nombre: ${nombre.trim()}.`);
    return partes.join(" ");
  }, [cantidad, diseno, item, nombre, tamano]);

  return (
    <section className="section-y bg-white">
      <div className="container-page grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="grid gap-8">
          <fieldset>
            <legend className="text-[20px] font-bold text-[var(--c-ink)]">1. ¿Qué necesita?</legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {PRODUCTOS.map((opt) => (
                <button key={opt.slug} type="button" aria-pressed={slug === opt.slug} onClick={() => elegir(opt.slug)} className={cn(opcion, estado(slug === opt.slug))}>
                  <span className="block font-bold">{opt.nombre}</span>
                  <span className="block text-[14px]">{opt.precio}</span>
                </button>
              ))}
            </div>
          </fieldset>

          {pideTamano ? (
            <fieldset>
              <legend className="text-[20px] font-bold text-[var(--c-ink)]">2. Elija el tamaño</legend>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {sizes.map((size) => (
                  <button key={size.id} type="button" aria-pressed={tamano?.id === size.id} onClick={() => setTamano(size)} className={cn(opcion, estado(tamano?.id === size.id))}>
                    <span className="block font-bold">{size.title}, {size.count}</span>
                    <span className="block text-[14px]">{size.uses}</span>
                  </button>
                ))}
              </div>
            </fieldset>
          ) : null}

          {pideDiseno ? (
            <fieldset>
              <legend className="text-[20px] font-bold text-[var(--c-ink)]">{pideTamano ? "3." : "2."} Elija un diseño</legend>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {designs.map((design) => (
                  <button key={design.id} type="button" aria-pressed={diseno === design.title} onClick={() => setDiseno(design.title)} className={cn(opcion, "p-2", estado(diseno === design.title))}>
                    {design.image?.url ? <Image src={design.image.url} alt="" width={240} height={180} className="aspect-[4/3] w-full rounded-[12px] object-cover" /> : null}
                    <span className="mt-1 block text-center font-bold">{design.title}</span>
                  </button>
                ))}
              </div>
            </fieldset>
          ) : null}

          {item ? (
            <div className="grid gap-4 sm:grid-cols-[1fr_160px]">
              <div>
                <label htmlFor="nombre" className="block text-[20px] font-bold text-[var(--c-ink)]">Nombre en la etiqueta</label>
                <input id="nombre" value={nombre} maxLength={40} onChange={(event) => setNombre(event.target.value)} aria-describedby="nombre-ayuda" className="focus-ring mt-2 min-h-[48px] w-full rounded-[14px] border-2 border-[var(--c-border)] bg-white px-3 text-[16px] text-[var(--c-ink)]" />
                <p id="nombre-ayuda" className="mt-1 text-[14px] text-[var(--c-muted)]">Escríbalo como quiere que salga.</p>
              </div>
              <div>
                <label htmlFor="cantidad" className="block text-[20px] font-bold text-[var(--c-ink)]">Cantidad</label>
                <select id="cantidad" value={cantidad} onChange={(event) => setCantidad(Number(event.target.value))} className="focus-ring mt-2 min-h-[48px] w-full rounded-[14px] border-2 border-[var(--c-border)] bg-white px-3 text-[16px] text-[var(--c-ink)]">
                  {[1, 2, 3, 4, 5, 6, 8, 10].map((valor) => <option key={valor} value={valor}>{valor}</option>)}
                </select>
              </div>
            </div>
          ) : null}
        </div>

        <aside className="lg:sticky lg:top-[96px] lg:self-start">
          <div className={cn("rounded-[26px] p-5 text-[var(--c-ink)]", item?.superficie ?? "surface-tint")}>
            <h2 className="text-[20px] font-bold">Su pedido</h2>
            {item ? (
              <>
                <div aria-label="Vista orientativa de la etiqueta" className="mt-3 rounded-[12px] bg-white px-4 py-5 text-center font-[family-name:var(--font-heading)] text-[20px] font-bold break-words">
                  {nombre.trim() || "Escriba el nombre para ver cómo queda."}
                </div>
                <p className="mt-2 text-[13.5px]">Vista orientativa. Le enviamos el diseño real para aprobar.</p>
                <dl className="mt-4 grid gap-1 text-[15px]">
                  <div className="flex justify-between gap-3"><dt>Producto</dt><dd className="font-bold">{item.nombre}</dd></div>
                  {tamano ? <div className="flex justify-between gap-3"><dt>Tamaño</dt><dd className="font-bold">{tamano.title}</dd></div> : null}
                  {diseno ? <div className="flex justify-between gap-3"><dt>Diseño</dt><dd className="font-bold">{diseno}</dd></div> : null}
                  <div className="flex justify-between gap-3"><dt>Cantidad</dt><dd className="font-bold">{cantidad}</dd></div>
                  {calculo?.total != null ? <div className="flex justify-between gap-3"><dt>Total estimado</dt><dd className="font-bold">{dinero(calculo.total)}</dd></div> : null}
                </dl>
                {calculo?.promo ? <p className="mt-2 text-[14px] font-medium">{calculo.promo}</p> : null}
                <p className="mt-2 text-[13.5px]">El total final y el envío se confirman por WhatsApp.</p>
                {listo ? (
                  <WhatsAppButton source="finalCta" message={mensaje} variant="primary" ariaLabel="Enviar pedido por WhatsApp" className="mt-4 w-full">
                    Enviar pedido por WhatsApp
                  </WhatsAppButton>
                ) : (
                  <p role="status" className="mt-4 font-bold">Complete los pasos para enviar su pedido.</p>
                )}
              </>
            ) : (
              <p className="mt-2">Elija un producto para empezar.</p>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}
