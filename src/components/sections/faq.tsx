"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { DecorativeBackground } from "@/components/ui/decor";
import { LinkButton } from "@/components/ui/button";
import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { FaqItem, Settings } from "@/lib/types";

export function Faq({ settings, faqs }: { settings: Settings; faqs: FaqItem[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const baseId = useId();
  if (!faqs.length) return null;

  // Dos columnas reales en desktop: cada una con su propio flujo, para que
  // abrir una pregunta no empuje a las de al lado.
  // Seis preguntas como máximo: el resto vive tras "Ver todas". Una FAQ larga
  // en la landing invita a leer objeciones en vez de a pedir; las de envío y
  // pago, que sí son objeción de compra, se responden antes de llegar aquí.
  const shown = faqs.slice(0, 6);
  const half = Math.ceil(shown.length / 2);
  const columns = [shown.slice(0, half), shown.slice(half)];

  const renderItem = (faq: FaqItem) => {
    const expanded = open === faq.id;
    const panelId = `${baseId}-${faq.id}`;

    return (
      <RevealItem
        key={faq.id}
        variants={fadeUp}
        className={cn(
          "h-fit rounded-[18px] border bg-white/80 transition-[border-color,box-shadow,background-color] duration-[260ms] hover:border-[rgb(139_124_246/0.28)] hover:bg-white",
          expanded
            ? "border-[var(--c-lilac)] bg-white"
            : "border-[#DCE7F5]",
        )}
      >
        <h3>
          <button
            type="button"
            onClick={() => setOpen(expanded ? null : faq.id)}
            aria-expanded={expanded}
            aria-controls={panelId}
            className="focus-ring flex min-h-[48px] w-full items-center justify-between gap-3 rounded-[17px] bg-transparent px-4 py-2.5 text-left text-[14.5px] font-extrabold text-[var(--c-primary)]"
          >
            {faq.title}
            <ChevronDown
              className={cn(
                "size-[18px] shrink-0 text-[var(--c-lavender)] transition-transform duration-300",
                expanded && "rotate-180",
              )}
              aria-hidden="true"
            />
          </button>
        </h3>

        <AnimatePresence initial={false}>
          {expanded ? (
            <motion.div
              id={panelId}
              role="region"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="px-4 pb-4 text-[14px] leading-relaxed text-[var(--c-muted)]">
                {faq.answer}
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </RevealItem>
    );
  };

  return (
    <section id="preguntas-frecuentes" className="grad-faq section-y relative overflow-hidden">
      <DecorativeBackground variant="faq" />

      <div className="container-page relative z-10">
        <SectionHeader
          eyebrow={settings.faq.eyebrow}
          eyebrowIcon="whatsapp"
          title={settings.faq.title}
          subtitle={settings.faq.subtitle}
        />

        <RevealGroup
          className="mx-auto grid max-w-[960px] gap-3 md:grid-cols-2 md:gap-x-5"
          gap={0.05}
        >
          {/* Motion necesita componentes motion para propagar el stagger, por
              eso las columnas también son RevealItem. */}
          {columns.map((column, index) => (
            <RevealItem key={index} className="flex flex-col gap-3">
              {column.map(renderItem)}
            </RevealItem>
          ))}
        </RevealGroup>

        {settings.faq.linkText ? (
          <div className="mt-7 flex justify-center">
            {/* Mismo sistema visual que el resto de botones secundarios. */}
            <LinkButton
              href={settings.faq.linkUrl || "#preguntas-frecuentes"}
              variant="outline"
              size="sm"
              className="border-[var(--c-lilac)]"
            >
              {settings.faq.linkText}
              <ChevronDown className="size-[17px] text-[var(--c-lavender)]" aria-hidden="true" />
            </LinkButton>
          </div>
        ) : null}
      </div>
    </section>
  );
}
