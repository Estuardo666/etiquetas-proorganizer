"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Media } from "@/components/ui/media";
import { fadeScaleIn } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { GalleryItem, Settings } from "@/lib/types";

/**
 * La primera muestra abre la fila a doble ancho: da un punto de entrada a la
 * retícula sin romper el cuadrado de las etiquetas.
 */
const spans = ["sm:col-span-2 sm:row-span-2", "", "", "", "", "", ""];

/**
 * Panel de muestras reales. Estaba apagado (`gallery.enabled: false`) porque
 * como sección propia costaba una pantalla entera de scroll para repetir lo
 * que ya decían las categorías. Dentro de un tab no cuesta nada, y las fotos
 * de producto real son la prueba que ninguna ilustración da.
 */
export function GalleryPanel({ settings, items }: { settings: Settings; items: GalleryItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  if (!items.length) return null;

  return (
    <>
      {settings.gallery.subtitle ? (
        <Reveal className="mx-auto mb-6 max-w-2xl text-center text-[16px] leading-relaxed text-pretty text-[var(--c-muted)]">
          {settings.gallery.subtitle}
        </Reveal>
      ) : null}

        <RevealGroup
          className="grid auto-rows-[180px] grid-cols-2 gap-4 sm:grid-cols-4 sm:auto-rows-[200px] lg:gap-6"
          gap={0.05}
        >
          {items.map((item, index) => (
            <RevealItem
              key={item.id}
              variants={fadeScaleIn}
              className={cn("h-full", spans[index % spans.length])}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                className="card-shadow focus-ring group relative block h-full w-full overflow-hidden rounded-[26px] border-2 border-white bg-white"
                aria-label={`Ampliar: ${item.title}`}
              >
                <Media
                  image={item.image}
                  alt={`Etiqueta ${item.title}`}
                  label={item.title}
                  className="h-full w-full"
                  imgClassName="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.06]"
                  sizes="(max-width: 640px) 50vw, 30vw"
                />
                <span className="absolute inset-x-0 bottom-0 bg-[rgb(24_51_107/0.78)] p-4 text-left text-[14px] font-bold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {item.title}
                </span>
              </button>
            </RevealItem>
          ))}
      </RevealGroup>

      <Lightbox
        items={items}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onChange={setOpenIndex}
      />
    </>
  );
}

function Lightbox({
  items,
  index,
  onClose,
  onChange,
}: {
  items: GalleryItem[];
  index: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const open = index !== null;

  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      onChange((index + delta + items.length) % items.length);
    },
    [index, items.length, onChange],
  );

  useEffect(() => {
    if (!open) return;

    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
      if (event.key !== "Tab") return;

      // Focus trap dentro del diálogo.
      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>("button");
      if (!focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previous?.focus();
    };
  }, [open, onClose, go]);

  const current = index === null ? null : items[index];

  return (
    <AnimatePresence>
      {current ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] grid place-items-center bg-[rgba(15,36,84,0.82)] p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            ref={dialogRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={current.title}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-3xl outline-none"
          >
            <Media
              image={current.image}
              alt={`Etiqueta ${current.title}`}
              label={current.title}
              imgClassName="object-contain p-4"
              className="aspect-[4/3] w-full rounded-[28px] bg-white"
              sizes="90vw"
            />
            <p className="mt-3 text-center text-[15px] font-bold text-white">{current.title}</p>

            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="focus-ring absolute -top-3 -right-3 grid size-11 place-items-center rounded-full bg-white text-[var(--c-ink)]"
            >
              <X className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Anterior"
              className="focus-ring absolute top-1/2 -left-4 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white text-[var(--c-ink)] sm:-left-14"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Siguiente"
              className="focus-ring absolute top-1/2 -right-4 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white text-[var(--c-ink)] sm:-right-14"
            >
              <ChevronRight className="size-5" />
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
