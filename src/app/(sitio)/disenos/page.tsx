import type { Metadata } from "next";
import Image from "next/image";
import { BadgeCheck, ImageIcon, Square, Type } from "lucide-react";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { CierreCta, PageIntro } from "@/components/sitio/piezas";
import { ajustesSitio } from "@/lib/catalogo";
import { getSiteContent } from "@/lib/wp";

export const metadata: Metadata = {
  title: "Diseños de etiquetas personalizadas | Pro Organizer",
  description: "Elija un tema o use la foto de su hijo. Vea diseños de etiquetas y pida el suyo por WhatsApp.",
  alternates: { canonical: "/disenos" },
};

const REGLAS = [
  { icono: Square, texto: "Etiqueta adhesiva con fondo blanco." },
  { icono: ImageIcon, texto: "Incluya personajes favoritos, el logo de la escuela o la foto de sus hijos." },
  { icono: Type, texto: "Va junto a su nombre en letras negras." },
  { icono: BadgeCheck, texto: "Imprimimos sus etiquetas con su aprobación." },
];

export default async function Page() {
  const content = await getSiteContent();
  const settings = ajustesSitio(content.settings);
  return (
    <>
      <PageIntro titulo="Diseños" acento="personalizados" texto="Elija un tema o use la foto de su hijo. Si tiene otra idea, cuéntenosla por WhatsApp." />
      <section className="section-y bg-white">
        <div className="container-page">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {content.designs.map((design) => (
              <li key={design.id} className="flex flex-col overflow-hidden rounded-[26px] border border-[var(--c-border)] bg-white">
                {design.image?.url ? <Image src={design.image.url} alt={design.image.alt || `Etiquetas de ${design.title}`} width={600} height={450} sizes="(max-width: 640px) 100vw, 33vw" className="aspect-[4/3] w-full object-cover" /> : null}
                <div className="flex items-center justify-between gap-3 p-4">
                  <h2 className="text-[18px] font-bold text-[var(--c-ink)]">{design.title}</h2>
                  <WhatsAppButton source="designs" message={settings.whatsapp.msgDesignTemplate.replace("{title}", design.title)} variant="link" ariaLabel={`Pedir el diseño ${design.title}`}>Pedir este diseño</WhatsAppButton>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section-y surface-base">
        <div className="container-page mx-auto max-w-[760px]">
          <h2 className="h2-display text-center text-[var(--c-ink)]">Así son nuestros diseños</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {REGLAS.map(({ icono: Icono, texto }) => (
              <li key={texto} className="flex items-start gap-3 rounded-[18px] bg-white p-4 text-[16px] text-[var(--c-ink)]">
                <Icono className="mt-0.5 size-6 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                {texto}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center">
            <a href={settings.brand.instagram} target="_blank" rel="noopener" className="focus-ring inline-flex min-h-[44px] items-center rounded font-bold text-[var(--c-ink)] underline underline-offset-4">Ver más trabajos reales en Instagram</a>
          </p>
        </div>
      </section>
      <CierreCta />
    </>
  );
}
