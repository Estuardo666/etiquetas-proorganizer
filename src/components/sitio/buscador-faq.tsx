"use client";

import { useState } from "react";
import { CreditCard, Palette, Sparkles, Truck, type LucideIcon } from "lucide-react";
import { FAQ_GRUPOS } from "@/lib/catalogo";

const ICONOS: Record<string, LucideIcon> = { Diseño: Palette, Pago: CreditCard, Envío: Truck, Cuidado: Sparkles };

function IconoGrupo({ titulo }: { titulo: string }) {
  const Icono = ICONOS[titulo] ?? Sparkles;
  return <span className="surface-tint grid size-11 place-items-center rounded-full"><Icono className="size-5" strokeWidth={1.75} aria-hidden="true" /></span>;
}

const normalizar = (texto: string) => texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export function BuscadorFaq() {
  const [consulta, setConsulta] = useState("");
  const termino = normalizar(consulta.trim());
  const grupos = FAQ_GRUPOS.map((grupo) => ({
    ...grupo,
    preguntas: grupo.preguntas.filter((faq) => normalizar(`${faq.title} ${faq.answer}`).includes(termino)),
  })).filter((grupo) => grupo.preguntas.length);

  return (
    <section className="section-y bg-white">
      <div className="container-page mx-auto max-w-[780px]">
        <label htmlFor="buscar" className="block font-bold text-[var(--c-ink)]">Buscar una pregunta</label>
        <input id="buscar" type="search" value={consulta} onChange={(event) => setConsulta(event.target.value)} className="focus-ring mt-2 min-h-[48px] w-full rounded-[14px] border-2 border-[var(--c-border)] bg-white px-3 text-[16px] text-[var(--c-ink)]" />

        {grupos.map((grupo) => (
          <div key={grupo.titulo} className="mt-8">
            <h2 className="flex items-center gap-3 font-[family-name:var(--font-heading)] text-[24px] font-bold text-[var(--c-ink)]"><IconoGrupo titulo={grupo.titulo} />{grupo.titulo}</h2>
            <div className="mt-3 grid gap-2">
              {grupo.preguntas.map((faq) => (
                <details key={faq.id} className="rounded-[17px] border border-[var(--c-border)] bg-white">
                  <summary className="focus-ring flex min-h-[48px] cursor-pointer items-center rounded-[17px] px-4 py-2 font-bold text-[var(--c-ink)]">{faq.title}</summary>
                  <p className="px-4 pb-4 text-[15px] leading-relaxed text-[var(--c-muted)]">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        ))}

        {!grupos.length ? (
          <p role="status" className="mt-8 text-[var(--c-ink)]">No encontramos esa pregunta. Escríbanos por WhatsApp y le ayudamos.</p>
        ) : null}
      </div>
    </section>
  );
}
