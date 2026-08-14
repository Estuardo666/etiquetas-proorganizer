"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import { DecorativeBackground } from "@/components/ui/decor";
import { PillNav } from "@/components/ui/pill-nav";
import { DesignsPanel } from "@/components/sections/designs";
import { GalleryPanel } from "@/components/sections/gallery";
import { PersonalizationPanel } from "@/components/sections/design-love";
import type { DesignItem, GalleryItem, Settings } from "@/lib/types";

/**
 * Diseños, muestras reales y personalización en una sola sección con tabs.
 *
 * Las tres respondían a la misma pregunta del usuario —"¿cómo se ve esto?"— y
 * en móvil sumaban 3,3 pantallas seguidas de scroll. No sobra ninguna: sobra
 * el orden lineal. Con tabs el usuario elige qué profundidad quiere y la
 * sección ocupa lo que ocupa el panel más alto.
 *
 * Cada panel conserva su ancla (`#disenos`, `#galeria`, `#personalizacion`)
 * porque el menú y el footer enlazan a las tres: entrar por un ancla abre su
 * tab.
 */
type TabId = "disenos" | "galeria" | "personalizacion";

const TABS: Array<{ id: TabId; label: string; tone: "pink" | "purple" | "blue" }> = [
  { id: "disenos", label: "Categorías", tone: "pink" },
  { id: "galeria", label: "Muestras reales", tone: "purple" },
  { id: "personalizacion", label: "Cómo personalizamos", tone: "blue" },
];

export function Showcase({
  settings,
  designs,
  gallery,
}: {
  settings: Settings;
  designs: DesignItem[];
  gallery: GalleryItem[];
}) {
  const { designs: copy } = settings;
  const [active, setActive] = useState<TabId>("disenos");
  const reduced = useReducedMotion();

  // Los tabs sin contenido no se pintan: el cliente puede vaciar la galería
  // desde WordPress y un tab vacío es peor que ningún tab.
  const available = TABS.filter((tab) => {
    if (tab.id === "galeria") return settings.gallery.enabled && gallery.length > 0;
    if (tab.id === "disenos") return designs.length > 0;
    return true;
  });

  /** Entrar por `#galeria` o `#personalizacion` abre su panel, no solo lo desplaza. */
  const syncFromHash = useCallback(() => {
    const hash = window.location.hash.replace("#", "");
    if (available.some((tab) => tab.id === hash)) setActive(hash as TabId);
  }, [available]);

  useEffect(() => {
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [syncFromHash]);

  if (!available.length) return null;
  const current = available.some((tab) => tab.id === active) ? active : available[0].id;

  return (
    <section id="disenos" className="section-y relative overflow-hidden bg-white">
      <DecorativeBackground variant="designs" />

      {/*
        Anclas de los paneles que ya no son sección propia. Van aquí y no
        dentro del panel activo: el menú y el footer siguen enlazando a las
        tres, y el navegador tiene que encontrar el destino aunque su tab esté
        cerrado. Abrirlo es trabajo de `hashchange`.
      */}
      <span
        id="galeria"
        aria-hidden="true"
        className="absolute top-0"
        style={{ scrollMarginTop: "calc(var(--header-h) + 24px)" }}
      />
      <span
        id="personalizacion"
        aria-hidden="true"
        className="absolute top-0"
        style={{ scrollMarginTop: "calc(var(--header-h) + 24px)" }}
      />

      <div className="container-page relative z-10">
        <SectionHeader eyebrow={copy.eyebrow} eyebrowIcon="sparkles" title={copy.title} />

        <div className="mb-7 flex justify-center">
          <PillNav
            items={available.map((tab) => ({ id: tab.id, label: tab.label, tone: tab.tone }))}
            active={current}
            onChange={(id) => setActive(id as TabId)}
            label="Ver los diseños"
            idPrefix="showcase"
          />
        </div>

        {/*
          `mode="wait"`: sin él los dos paneles coexisten un instante y la
          sección da un salto de alto igual a la suma de ambos.
        */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current}
            id={`showcase-panel-${current}`}
            role="tabpanel"
            aria-labelledby={`showcase-tab-${current}`}
            tabIndex={-1}
            initial={reduced ? false : { opacity: 0, scale: 0.98, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, scale: 0.98, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {current === "disenos" ? (
              <DesignsPanel settings={settings} designs={designs} />
            ) : current === "galeria" ? (
              <GalleryPanel settings={settings} items={gallery} />
            ) : (
              <PersonalizationPanel />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
