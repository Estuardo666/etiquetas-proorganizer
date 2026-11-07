import type { Metadata } from "next";
import Image from "next/image";
import { Copy, SearchX, Shuffle } from "lucide-react";
import { InfiniteGrid } from "@/components/ui/infinite-grid";
import { SecondaryButton } from "@/components/ui/secondary-button";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { TrustBar } from "@/components/sections/trust-bar";
import { Pricing } from "@/components/sections/pricing";
import { Showcase } from "@/components/sections/showcase";
import { Process } from "@/components/sections/process";
import { Faq } from "@/components/sections/faq";
import { Founder } from "@/components/sections/founder";
import { TarjetaProducto } from "@/components/sitio/piezas";
import { ajustesSitio, FAQ_GRUPOS, PRODUCTOS } from "@/lib/catalogo";
import { getSiteContent } from "@/lib/wp";

/**
 * Home del sitio nuevo. Vive en `/inicio` porque `/` sigue siendo la página
 * aprobada; al publicar el sitio se decide cuál ocupa la raíz.
 */
export const metadata: Metadata = {
  title: "Etiquetas personalizadas para útiles y uniformes en Ecuador | Pro Organizer",
  description: "Etiquetas y carátulas personalizadas con envíos a todo Ecuador. Usted aprueba el diseño antes de imprimir. Pida por WhatsApp desde $8 la hoja.",
  alternates: { canonical: "/inicio" },
};

const RAZONES = [
  { icono: Copy, titulo: "Todos tienen útiles parecidos", texto: "Termos, loncheras, cuadernos y lápices suelen verse muy similares." },
  { icono: Shuffle, titulo: "Se intercambian sin darse cuenta", texto: "En clases y recreos, un objeto se confunde con otro." },
  { icono: SearchX, titulo: "Sin nombre, cuesta recuperarlos", texto: "Un objeto sin identificar difícilmente encuentra a su dueño." },
];

export default async function Page() {
  const content = await getSiteContent();
  const settings = ajustesSitio(content.settings);
  const faqs = [FAQ_GRUPOS[2].preguntas[0], FAQ_GRUPOS[2].preguntas[1], FAQ_GRUPOS[1].preguntas[2], FAQ_GRUPOS[0].preguntas[3]];

  return (
    <>
      <section id="inicio" className="surface-base relative overflow-hidden" style={{ marginTop: "calc(-1 * var(--header-band))" }}>
        <InfiniteGrid gridColor="#0b4a75" gridOpacity={0.07} revealOpacity={0.28} revealRadius={260} direction="down-right" speedX={0.3} speedY={0.3} gradientOpacity={0} />
        <div className="container-page relative z-10 pb-10 text-center lg:pb-14" style={{ paddingTop: "calc(var(--header-band) + 2rem)" }}>
          <h1 className="h1-display text-[var(--c-ink)]">
            <span className="block uppercase">Etiquetas</span>
            <span className="h1-script block text-[var(--c-red)]">personalizadas</span>
          </h1>
          <p className="mx-auto mt-3 max-w-[34rem] text-[17px] leading-relaxed text-pretty text-[var(--c-text)]">
            Para útiles, uniformes y cuadernos. Todo vuelve a casa con su nombre, y usted aprueba el diseño antes de imprimir.
          </p>
          <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <WhatsAppButton source="hero" variant="hero" ariaLabel="Pedir por WhatsApp">Pedir por WhatsApp</WhatsAppButton>
            <SecondaryButton href="/arme-su-pedido" ariaLabel="Arme su pedido">Arme su pedido</SecondaryButton>
          </div>
          <h2 className="mt-9 text-[20px] font-bold text-[var(--c-ink)]">Elija qué quiere etiquetar</h2>
          <div className="mx-auto mt-4 grid max-w-[1100px] gap-4 text-left md:grid-cols-4">
            {PRODUCTOS.map((item, index) => <TarjetaProducto key={item.slug} item={item} destacada={index === 0} />)}
          </div>
        </div>
      </section>
      <TrustBar settings={settings} stats={content.stats} />
      <Pricing settings={settings} promos={content.promos} />
      <Showcase settings={settings} designs={content.designs} />
      <section className="section-y surface-tint">
        <div className="container-page grid items-center gap-8 lg:grid-cols-2">
          <Image src="/hero imagen 2.png" alt="Útiles escolares con etiquetas personalizadas" width={768} height={512} sizes="(max-width: 1024px) 100vw, 50vw" className="aspect-[3/2] w-full rounded-[26px] object-cover" />
          <div>
            <h2 className="h2-display text-[var(--c-ink)]">¿Por qué tantos objetos se pierden cada año?</h2>
            <ul className="mt-6 grid gap-5">
              {RAZONES.map(({ icono: Icono, titulo, texto }) => (
                <li key={titulo} className="grid grid-cols-[48px_1fr] gap-3">
                  <span className="grid size-12 place-items-center rounded-full bg-[var(--c-navy)] text-white"><Icono className="size-6" strokeWidth={1.75} aria-hidden="true" /></span>
                  <span>
                    <h3 className="text-[18px] font-bold text-[var(--c-ink)]">{titulo}</h3>
                    <p className="text-[16px] text-[var(--c-text)]">{texto}</p>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <Process settings={settings} steps={content.steps} />
      <Founder settings={settings} />
      <Faq settings={settings} faqs={faqs} />
    </>
  );
}
