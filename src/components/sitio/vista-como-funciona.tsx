"use client";

import { motion } from "framer-motion";
import { Backpack, ClipboardList, CreditCard, Droplets, FileText, Flame, Landmark, MapPin, Package, Palette, Printer, ShieldCheck, Ship, Snowflake, Store, Truck, type LucideIcon } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { fadeScaleIn } from "@/lib/motion";
import { VIDEO_ROPA } from "@/lib/catalogo";
import { cn } from "@/lib/utils";

type Paso = { icono: LucideIcon; titulo: string; texto: string; quien: "Usted" | "Nosotros" };

const PASOS: Paso[] = [
  { icono: ClipboardList, titulo: "Haga su pedido", texto: "Elija tamaño y cantidad de hojas.", quien: "Usted" },
  { icono: FileText, titulo: "Reciba la cotización", texto: "Tomamos su pedido y la preparamos.", quien: "Nosotros" },
  { icono: CreditCard, titulo: "Realice el pago", texto: "Por transferencia o tarjeta de crédito.", quien: "Usted" },
  { icono: Palette, titulo: "Apruebe el diseño", texto: "Le enviamos imágenes y usted da el visto bueno.", quien: "Usted" },
  { icono: Printer, titulo: "Imprimimos", texto: "Comenzamos solo con su aprobación.", quien: "Nosotros" },
  { icono: Package, titulo: "Enviamos", texto: "A su domicilio, trabajo o agencia Servientrega.", quien: "Nosotros" },
];

/** El color dice de quién es cada turno: se entiende el reparto sin leer. */
export function LineaPasos() {
  return (
    <section className="section-y bg-white">
      <div className="container-page">
        <div className="flex justify-center gap-5 text-[15px] font-bold text-[var(--c-ink)]">
          <span className="flex items-center gap-2"><span className="size-4 rounded-full bg-[var(--c-navy)]" aria-hidden="true" />Usted</span>
          <span className="flex items-center gap-2"><span className="size-4 rounded-full bg-[var(--c-orange)]" aria-hidden="true" />Nosotros</span>
        </div>
        <div className="relative mx-auto mt-8 max-w-[760px]">
          <motion.div
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[27px] w-1 origin-top rounded-full bg-[var(--c-tint-ink)] md:left-1/2 md:-ml-0.5"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.1, ease: [0.2, 0, 0, 1] }}
          />
          <ol className="relative grid gap-6">
            {PASOS.map(({ icono: Icono, titulo, texto, quien }, index) => {
              const usted = quien === "Usted";
              return (
                <Reveal as="li" key={titulo} className="relative grid grid-cols-[56px_1fr] items-center gap-4 md:grid-cols-[1fr_56px_1fr]">
                  <span className={cn("relative z-10 grid size-14 place-items-center rounded-full text-[var(--c-ink)] md:col-start-2 md:row-start-1", usted ? "bg-[var(--c-navy)] text-white" : "bg-[var(--c-orange)]")}>
                    <Icono className="size-6" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <div className={cn("md:row-start-1", index % 2 ? "md:col-start-3" : "md:col-start-1 md:text-right")}>
                    <h2 className="text-[19px] font-bold text-[var(--c-ink)]">{index + 1}. {titulo}</h2>
                    <p className="text-[16px] text-[var(--c-text)]">{texto}</p>
                    <span className="sr-only">Lo hace: {quien}</span>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

const TRAMOS = [
  { titulo: "Usted aprueba", texto: "Punto de partida", ancho: "md:col-span-1", clase: "bg-[var(--c-navy)] text-white" },
  { titulo: "2 a 3 días laborables", texto: "Elaboración", ancho: "md:col-span-3", clase: "surface-tint text-[var(--c-ink)]" },
  { titulo: "1 día", texto: "Entrega", ancho: "md:col-span-1", clase: "surface-peach text-[var(--c-ink)]" },
];

export function TiemposVisual() {
  return (
    <section className="section-y surface-base">
      <div className="container-page">
        <Reveal className="text-center"><h2 className="h2-display text-[var(--c-ink)]">Cuánto tarda</h2></Reveal>
        <RevealGroup gap={0.1} className="mx-auto mt-7 grid max-w-[920px] gap-2 md:grid-cols-5">
          {TRAMOS.map((tramo) => (
            <RevealItem key={tramo.titulo} variants={fadeScaleIn} className={cn("rounded-[18px] p-4", tramo.ancho, tramo.clase)}>
              <p className="text-[18px] font-bold">{tramo.titulo}</p>
              <p className="text-[15px]">{tramo.texto}</p>
            </RevealItem>
          ))}
        </RevealGroup>
        <p className="mt-3 text-center text-[15px] text-[var(--c-text)]">Fines de semana y feriados no cuentan.</p>
      </div>
    </section>
  );
}

const ICONOS_ENVIO: LucideIcon[] = [Store, MapPin, Truck, Ship];

export function EnviosPagos({ envios }: { envios: string[][] }) {
  return (
    <section className="section-y bg-white">
      <div className="container-page mx-auto grid max-w-[1000px] gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <h2 className="h2-display text-[var(--c-ink)]">Costo de envío</h2>
          <dl className="mt-5 grid grid-cols-2 gap-3">
            {envios.map(([zona, precio], index) => {
              const Icono = ICONOS_ENVIO[index] ?? Truck;
              return (
                <div key={zona} className="surface-tint rounded-[20px] p-4 text-[var(--c-ink)]">
                  <Icono className="size-6" strokeWidth={1.75} aria-hidden="true" />
                  <dd className="mt-2 text-[26px] leading-none font-bold">{precio}</dd>
                  <dt className="mt-1 text-[15px]">{zona}</dt>
                </div>
              );
            })}
          </dl>
        </Reveal>
        <Reveal delay={0.08} className="rounded-[24px] bg-[var(--c-navy)] p-6 text-white">
          <h2 className="font-[family-name:var(--font-heading)] text-[24px] font-bold">Formas de pago</h2>
          <ul className="mt-4 grid gap-3 text-[16px]">
            <li className="flex items-center gap-3"><Landmark className="size-6 shrink-0" strokeWidth={1.75} aria-hidden="true" />Transferencia bancaria</li>
            <li className="flex items-center gap-3"><CreditCard className="size-6 shrink-0" strokeWidth={1.75} aria-hidden="true" />Tarjeta de crédito</li>
          </ul>
          <p className="mt-4 text-[15px]">No hay pago contra entrega por ser productos personalizados.</p>
        </Reveal>
      </div>
    </section>
  );
}

const RESISTENCIAS = [
  { icono: Droplets, titulo: "Agua" },
  { icono: Flame, titulo: "Calor" },
  { icono: Snowflake, titulo: "Frío" },
  { icono: Backpack, titulo: "Uso diario" },
];

export function ResistenciaGarantia({ garantia }: { garantia: string }) {
  return (
    <section className="section-y surface-tint">
      <div className="container-page text-center">
        <Reveal><h2 className="h2-display text-[var(--c-ink)]">Hechas para durar</h2></Reveal>
        <RevealGroup className="mx-auto mt-6 flex max-w-[760px] flex-wrap justify-center gap-7">
          {RESISTENCIAS.map(({ icono: Icono, titulo }) => (
            <RevealItem key={titulo} variants={fadeScaleIn} className="text-[var(--c-ink)]">
              <span className="mx-auto grid size-16 place-items-center rounded-full bg-white"><Icono className="size-7" strokeWidth={1.75} aria-hidden="true" /></span>
              <p className="mt-2 font-bold">{titulo}</p>
            </RevealItem>
          ))}
        </RevealGroup>
        <p className="mx-auto mt-7 flex max-w-[620px] items-start justify-center gap-2 text-left text-[16px] text-[var(--c-ink)]">
          <ShieldCheck className="size-6 shrink-0" strokeWidth={1.75} aria-hidden="true" />
          {garantia}
        </p>
        <a href={VIDEO_ROPA} target="_blank" rel="noopener" className="focus-ring mt-2 inline-flex min-h-[44px] items-center rounded font-bold text-[var(--c-ink)] underline underline-offset-4">Ver cómo pegar una etiqueta de ropa</a>
      </div>
    </section>
  );
}
