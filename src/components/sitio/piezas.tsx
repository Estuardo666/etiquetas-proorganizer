"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { SecondaryButton } from "@/components/ui/secondary-button";
import { PRODUCTOS, type Producto, type ProductoSlug } from "@/lib/catalogo";
import { cn } from "@/lib/utils";

/** Encabezado de las páginas de soporte. */
export function PageIntro({
  titulo,
  acento,
  texto,
  children,
}: {
  titulo: string;
  acento?: string;
  texto: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="surface-base">
      <div className="container-page pt-10 pb-10 text-center md:pt-14">
        <h1 className="h1-display text-[var(--c-ink)]">
          <span className="block uppercase">{titulo}</span>
          {acento ? <span className="h1-script block text-[var(--c-red)]">{acento}</span> : null}
        </h1>
        <p className="mx-auto mt-4 max-w-[38rem] text-[17px] leading-relaxed text-pretty text-[var(--c-text)]">{texto}</p>
        {children ? <div className="mt-6 flex flex-wrap justify-center gap-3">{children}</div> : null}
      </div>
    </section>
  );
}

export function Migas({ actual }: { actual: string }) {
  return (
    <nav aria-label="Migas de pan" className="container-page relative z-20 pt-1 pb-2">
      <ol className="flex items-center gap-1 text-[14px] text-[var(--c-muted)]">
        <li><Link href="/inicio" className="focus-ring inline-flex min-h-[32px] items-center rounded underline-offset-4 hover:underline">Inicio</Link></li>
        <li aria-hidden="true"><ChevronRight className="size-4" /></li>
        <li aria-current="page" className="font-medium text-[var(--c-ink)]">{actual}</li>
      </ol>
    </nav>
  );
}

export function TarjetaProducto({ item, destacada, titulo = "h3" }: { item: Producto; destacada?: boolean; titulo?: "h2" | "h3" }) {
  const Titulo = titulo;
  return (
    <Link
      href={item.ruta}
      className={cn(
        "focus-ring group flex h-full flex-col overflow-hidden rounded-[26px] text-[var(--c-ink)] transition-transform hover:-translate-y-1 motion-reduce:transform-none",
        item.superficie,
        destacada && "md:col-span-2 md:flex-row",
      )}
    >
      <Image
        src={item.imagen.url}
        alt={item.imagen.alt}
        width={700}
        height={525}
        sizes={destacada ? "(max-width: 768px) 100vw, 40vw" : "(max-width: 768px) 100vw, 25vw"}
        className={cn("aspect-[16/9] w-full object-cover md:aspect-[4/3]", destacada && "md:w-1/2")}
      />
      <span className="flex flex-1 flex-col justify-center p-5">
        <Titulo className="font-[family-name:var(--font-heading)] text-[22px] font-bold">{item.nombre}</Titulo>
        <span className="mt-1 block text-[15.5px] leading-snug">{item.resumen}</span>
        <span className="mt-3 block text-[20px] font-bold">{item.precio}</span>
      </span>
    </Link>
  );
}

export function CompleteSuPedido({ actual }: { actual: ProductoSlug }) {
  const otros = PRODUCTOS.filter((item) => item.slug !== actual);
  return (
    <section className="section-y bg-white">
      <div className="container-page">
        <h2 className="h2-display text-center text-[var(--c-ink)]">Complete su pedido</h2>
        <div className="mx-auto mt-7 grid max-w-[860px] gap-4 md:grid-cols-2">
          {otros.map((item) => <TarjetaProducto key={item.slug} item={item} />)}
        </div>
      </div>
    </section>
  );
}

/** Barra fija móvil. Se aparta al llegar al pie para no tapar los enlaces. */
export function BarraProducto({ item, mensaje }: { item: Producto; mensaje: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--c-border)] bg-white/95 backdrop-blur-md md:hidden" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      <div className="container-page flex items-center justify-between gap-2 py-2">
        <p className="text-[14px] leading-tight text-[var(--c-ink)]">
          <span className="block font-bold">{item.nombre}</span>
          {item.precio}
        </p>
        <WhatsAppButton source="hero" message={mensaje} variant="inline" ariaLabel={`${item.cta} por WhatsApp`}>
          {item.cta}
        </WhatsAppButton>
      </div>
    </div>
  );
}

export function CierreCta({ titulo = "¿Listo para empezar?", texto = "Escríbanos por WhatsApp y le ayudamos." }: { titulo?: string; texto?: string }) {
  return (
    <section className="section-y surface-tint">
      <div className="container-page text-center">
        <h2 className="h2-display text-[var(--c-ink)]">{titulo}</h2>
        <p className="mt-3 text-[16px] text-[var(--c-text)]">{texto}</p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <SecondaryButton href="/arme-su-pedido" ariaLabel="Arme su pedido">Arme su pedido</SecondaryButton>
          <WhatsAppButton source="finalCta" variant="primary" ariaLabel="Pedir por WhatsApp">Pedir por WhatsApp</WhatsAppButton>
        </div>
      </div>
    </section>
  );
}

/**
 * Medición sin dependencias: empuja a `dataLayer` cada clic de venta. Un
 * gestor de etiquetas puede leerlo cuando la clienta lo configure.
 */
export function Medicion() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest?.("a");
      if (!link) return;
      const canal = link.href.includes("wa.me") ? "whatsapp" : link.href.includes("kyte.site") ? "tienda" : null;
      if (!canal) return;
      const capa = ((window as unknown as { dataLayer?: unknown[] }).dataLayer ??= []);
      capa.push({ event: "clic_pedido", canal, pagina: location.pathname, origen: link.dataset.waSource ?? "" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
