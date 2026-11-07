"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Calculator, FlaskConical, Globe, GraduationCap, ImageIcon, Languages, Minus, Music, Paintbrush, Plus, Sigma, Type, UserRound } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { fadeScaleIn } from "@/lib/motion";

const MATERIAS = [
  { icono: Sigma, nombre: "Matemáticas" },
  { icono: BookOpen, nombre: "Lengua" },
  { icono: FlaskConical, nombre: "Ciencias" },
  { icono: Globe, nombre: "Sociales" },
  { icono: Languages, nombre: "Inglés" },
  { icono: Paintbrush, nombre: "Arte" },
  { icono: Music, nombre: "Música" },
];

export function MateriasCaratulas() {
  return (
    <section className="section-y surface-lavender">
      <div className="container-page grid items-center gap-8 lg:grid-cols-2">
        <Reveal>
          <Image src="/usos/cuadernos-libros-v2.webp" alt="Cuadernos con carátulas personalizadas" width={700} height={525} sizes="(max-width: 1024px) 100vw, 50vw" className="aspect-[4/3] w-full rounded-[26px] object-cover" />
        </Reveal>
        <div>
          <Reveal>
            <h2 className="h2-display text-[var(--c-ink)]">Una carátula para cada materia</h2>
            <p className="mt-3 text-[16px] text-[var(--c-text)]">Se identifica el cuaderno de un vistazo, sin abrir la mochila entera.</p>
          </Reveal>
          <RevealGroup gap={0.05} as="ul" className="mt-6 flex flex-wrap gap-2.5">
            {MATERIAS.map(({ icono: Icono, nombre }) => (
              <RevealItem key={nombre} variants={fadeScaleIn} className="flex min-h-[44px] items-center gap-2 rounded-full bg-white px-4 font-bold text-[var(--c-ink)]">
                <Icono className="size-5" strokeWidth={1.75} aria-hidden="true" />
                {nombre}
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}

const PRECIO = 2.5;
const dinero = (valor: number) => `$${valor.toFixed(2).replace(".", ",")}`;

/** Propio de Carátulas: se compra por cuaderno, así que se calcula por cuaderno. */
export function CalculadoraCaratulas() {
  const [cantidad, setCantidad] = useState(6);
  const cambiar = (delta: number) => setCantidad((actual) => Math.min(30, Math.max(1, actual + delta)));
  const total = dinero(cantidad * PRECIO);
  const boton = "focus-ring grid size-12 place-items-center rounded-full bg-white text-[var(--c-navy)] transition-transform active:scale-95 disabled:opacity-40";

  return (
    <section id="disenos" className="section-y bg-white">
      <div className="container-page">
        <Reveal className="mx-auto max-w-[620px] rounded-[28px] bg-[var(--c-navy)] p-6 text-center text-white md:p-9">
          <Calculator className="mx-auto size-9" strokeWidth={1.75} aria-hidden="true" />
          <h2 className="mt-2 font-[family-name:var(--font-heading)] text-[28px] font-bold">¿Cuántos cuadernos tiene?</h2>
          <div className="mt-5 flex items-center justify-center gap-6">
            <button type="button" className={boton} onClick={() => cambiar(-1)} disabled={cantidad === 1} aria-label="Quitar un cuaderno"><Minus className="size-5" aria-hidden="true" /></button>
            <span className="grid h-16 w-20 place-items-center overflow-hidden text-[52px] leading-none font-bold" aria-live="polite">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span key={cantidad} initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -14, opacity: 0 }} transition={{ duration: 0.16 }}>{cantidad}</motion.span>
              </AnimatePresence>
            </span>
            <button type="button" className={boton} onClick={() => cambiar(1)} disabled={cantidad === 30} aria-label="Agregar un cuaderno"><Plus className="size-5" aria-hidden="true" /></button>
          </div>
          <p className="mt-4 text-[18px]">{cantidad} {cantidad === 1 ? "carátula" : "carátulas"} a $2,50 cada una: <strong className="text-[24px]">{total}</strong></p>
          <p className="mt-1 text-[14px]">Más envío. El total final se confirma por WhatsApp.</p>
          <WhatsAppButton
            source="hero"
            message={`Hola, quiero pedir ${cantidad} ${cantidad === 1 ? "carátula" : "carátulas"} para cuadernos.`}
            variant="primary"
            ariaLabel={`Pedir ${cantidad} carátulas por WhatsApp`}
            className="mt-5"
          >
            Pedir {cantidad} {cantidad === 1 ? "carátula" : "carátulas"}
          </WhatsAppButton>
        </Reveal>
      </div>
    </section>
  );
}

const CONTENIDO = [
  { icono: UserRound, titulo: "Nombre", texto: "El del estudiante, bien visible." },
  { icono: GraduationCap, titulo: "Grado", texto: "Junto a la materia, si lo necesita." },
  { icono: ImageIcon, titulo: "Imagen", texto: "Personaje, logo de la escuela o foto." },
  { icono: Type, titulo: "Texto libre", texto: "Cualquier imagen y texto." },
];

export function ContenidoCaratula() {
  return (
    <section className="section-y surface-base">
      <div className="container-page">
        <Reveal className="text-center">
          <h2 className="h2-display text-[var(--c-ink)]">Qué puede llevar su carátula</h2>
          <p className="mt-3 text-[16px] text-[var(--c-text)]">Medida de 24 x 18 cm, para cuadernos parvularios o universitarios.</p>
        </Reveal>
        <RevealGroup className="mx-auto mt-8 grid max-w-[1000px] grid-cols-2 gap-x-5 gap-y-7 md:grid-cols-4">
          {CONTENIDO.map(({ icono: Icono, titulo, texto }) => (
            <RevealItem key={titulo} variants={fadeScaleIn} className="text-[var(--c-ink)]">
              <span className="surface-lavender grid size-14 place-items-center rounded-[18px]"><Icono className="size-7" strokeWidth={1.75} aria-hidden="true" /></span>
              <h3 className="mt-3 text-[18px] font-bold">{titulo}</h3>
              <p className="mt-0.5 text-[15.5px]">{texto}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
