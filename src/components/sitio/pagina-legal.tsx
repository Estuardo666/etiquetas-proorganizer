import { PageIntro } from "@/components/sitio/piezas";

/** Borradores sin indexar: requieren revisión legal antes de publicarse. */
export function PaginaLegal({ titulo, bloques }: { titulo: string; bloques: string[][] }) {
  return (
    <>
      <PageIntro titulo={titulo} texto="Borrador pendiente de revisión legal." />
      <section className="section-y bg-white">
        <div className="container-page mx-auto grid max-w-[760px] gap-6">
          {bloques.map(([subtitulo, texto]) => (
            <div key={subtitulo}>
              <h2 className="text-[20px] font-bold text-[var(--c-ink)]">{subtitulo}</h2>
              <p className="mt-1 text-[16px] leading-relaxed text-[var(--c-text)]">{texto}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
