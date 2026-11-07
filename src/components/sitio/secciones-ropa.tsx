"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Backpack, Droplets, Flame, Layers, PlayCircle, Shirt, Sparkles, Wind } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { fadeScaleIn } from "@/lib/motion";
import { VIDEO_ROPA } from "@/lib/catalogo";

const PRENDAS = [
  { icono: Shirt, titulo: "Camisetas y camisas" },
  { icono: Layers, titulo: "Chompas" },
  { icono: Wind, titulo: "Calentadores" },
  { icono: Backpack, titulo: "Ropa deportiva" },
];

/** Bento: la foto manda y cada prenda lleva su icono. */
export function PrendasRopa() {
  return (
    <section className="section-y bg-white">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="h2-display text-[var(--c-ink)]">Cada prenda, con su dueño</h2>
          <p className="mt-3 text-[16px] text-[var(--c-text)]">En un salón todos los uniformes son iguales. La etiqueta es lo que los distingue.</p>
        </Reveal>
        <RevealGroup className="mx-auto mt-8 grid max-w-[1040px] gap-4 md:grid-cols-4 md:grid-rows-2">
          <RevealItem variants={fadeScaleIn} className="overflow-hidden rounded-[26px] md:col-span-2 md:row-span-2">
            <Image src="/usos/ropa-uniformes-v2.webp" alt="Uniforme escolar con etiquetas personalizadas" width={760} height={640} sizes="(max-width: 768px) 100vw, 520px" className="aspect-[4/3] h-full w-full object-cover md:aspect-auto" />
          </RevealItem>
          {PRENDAS.map(({ icono: Icono, titulo }) => (
            <RevealItem key={titulo} variants={fadeScaleIn} className="surface-peach flex flex-col justify-between gap-5 rounded-[22px] p-5 text-[var(--c-ink)]">
              <Icono className="size-8" strokeWidth={1.75} aria-hidden="true" />
              <h3 className="text-[17px] leading-tight font-bold">{titulo}</h3>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

const PASOS = [
  { icono: Shirt, titulo: "Ubique la etiqueta", texto: "Elija el lugar de la prenda donde quiere el nombre." },
  { icono: Flame, titulo: "Pase la plancha", texto: "Se pega con la plancha doméstica de su casa." },
  { icono: Sparkles, titulo: "Lista para usar", texto: "Resiste lavadora y secadora." },
];

/** La línea crece de paso en paso: cuenta que es una secuencia, no tres datos. */
export function PegadoRopa() {
  return (
    <section className="section-y surface-peach">
      <div className="container-page">
        <Reveal className="text-center">
          <h2 className="h2-display text-[var(--c-ink)]">Se pegan en tres pasos</h2>
        </Reveal>
        <div className="relative mx-auto mt-9 max-w-[920px]">
          <motion.div
            aria-hidden="true"
            className="absolute top-8 right-[16%] left-[16%] hidden h-1 origin-left rounded-full bg-[var(--c-navy)] md:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
          />
          <RevealGroup gap={0.12} className="relative grid gap-7 md:grid-cols-3">
            {PASOS.map(({ icono: Icono, titulo, texto }) => (
              <RevealItem key={titulo} variants={fadeScaleIn} className="grid grid-cols-[64px_1fr] gap-4 text-[var(--c-ink)] md:block md:text-center">
                <span className="grid size-16 place-items-center rounded-full bg-[var(--c-navy)] text-white md:mx-auto">
                  <Icono className="size-7" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span>
                  <h3 className="text-[19px] font-bold md:mt-3">{titulo}</h3>
                  <p className="mt-1 text-[16px]">{texto}</p>
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
        <p className="mt-8 text-center">
          <a href={VIDEO_ROPA} target="_blank" rel="noopener" className="focus-ring inline-flex min-h-[44px] items-center gap-2 rounded font-bold text-[var(--c-ink)] underline underline-offset-4">
            <PlayCircle className="size-5" aria-hidden="true" />
            Ver el video paso a paso
          </a>
        </p>
      </div>
    </section>
  );
}

export function FranjaLavado() {
  const items = [
    { icono: Droplets, titulo: "Lavadora" },
    { icono: Wind, titulo: "Secadora" },
    { icono: Backpack, titulo: "Uso diario" },
  ];
  return (
    <section className="bg-[var(--c-navy)] py-8 text-white">
      <ul className="container-page mx-auto flex max-w-[820px] flex-wrap items-center justify-around gap-5">
        {items.map(({ icono: Icono, titulo }) => (
          <li key={titulo} className="flex items-center gap-2.5 text-[18px] font-bold">
            <Icono className="size-6" strokeWidth={1.75} aria-hidden="true" />
            Resiste: {titulo.toLowerCase()}
          </li>
        ))}
      </ul>
    </section>
  );
}
