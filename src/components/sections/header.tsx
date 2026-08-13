"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUp, Menu, X } from "lucide-react";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { brandParts, cn, pipes } from "@/lib/utils";
import type { Settings } from "@/lib/types";

/**
 * Barra de progreso de lectura, fija en la parte superior.
 *
 * El progreso se calcula a mano por el mismo motivo que en `BackToTop`:
 * `useScroll` no ve este scroller y la barra se quedaba a cero toda la página.
 */
export function ScrollProgress() {
  const progress = useMotionValue(0);
  const scaleX = useSpring(progress, { stiffness: 120, damping: 26, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.set(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [progress]);

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, var(--c-lavender), var(--c-accent))",
      }}
    />
  );
}

/**
 * Botón para volver arriba; aparece a partir del 45 % del scroll.
 *
 * Con listener nativo, no con `useScroll`: `body { overflow-x: hidden }` deja
 * el scroll en `documentElement` y el progreso de Framer se quedaba clavado en
 * 0, así que el botón no llegaba a aparecer nunca.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(max > 0 && window.scrollY / max > 0.45);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          className="focus-ring card-shadow fixed bottom-[104px] left-5 z-40 grid size-11 place-items-center rounded-full border border-[var(--c-border)] bg-white text-[var(--c-primary)] transition-transform hover:-translate-y-0.5 md:bottom-8"
          aria-label="Volver arriba"
        >
          <ArrowUp className="size-5" aria-hidden="true" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}

export function Header({ settings }: { settings: Settings }) {
  const nav = useMemo(
    () => pipes(settings.header.navItems).map(([label, anchor]) => ({ label, anchor })),
    [settings.header.navItems],
  );
  const brandWords = brandParts(settings.brand.logoText);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(nav[0]?.anchor ?? "");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Enlace activo según la sección visible.
  useEffect(() => {
    const sections = nav
      .map(({ anchor }) => document.getElementById(anchor))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0.01, 0.25, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [nav]);

  // Bloquea el scroll del body mientras el menú móvil está abierto.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      className={cn(
        "sticky top-0 z-50 transition-[padding] duration-300",
        scrolled ? "py-1.5" : "py-2",
      )}
    >
      <div className="container-page">
        <motion.div
          layout
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "flex items-center justify-between gap-3 rounded-[28px] border px-4 transition-[height,background-color,box-shadow] duration-300 sm:px-5",
            scrolled
              ? "card-shadow h-[58px] border-[var(--c-border)] bg-white/90 backdrop-blur-md"
              : "h-[64px] border-white/60 bg-white/75 shadow-[0_10px_30px_-24px_rgba(24,51,107,0.6)] backdrop-blur-md",
          )}
        >
          <a
            href="#inicio"
            className="focus-ring flex items-center gap-1.5 rounded-full pr-2"
            aria-label={settings.brand.logoText}
          >
            {settings.brand.logo?.url ? (
              <Image
                src={settings.brand.logo.url}
                alt={settings.brand.logo.alt || settings.brand.logoText}
                width={150}
                height={44}
                className={cn(
                  "w-auto object-contain transition-all duration-300",
                  scrolled ? "h-9" : "h-10",
                )}
                priority
              />
            ) : (
              <>
                <span
                  className={cn(
                    "font-[family-name:var(--font-heading)] leading-none font-medium text-[var(--c-primary)] transition-all duration-300",
                    scrolled ? "text-[21px]" : "text-[23px]",
                  )}
                >
                  {brandWords[0]}{" "}
                  {brandWords[1] ? (
                    <span className="text-[var(--c-lavender)]">{brandWords[1]}</span>
                  ) : null}
                </span>
              </>
            )}
          </a>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center">
              {nav.map(({ label, anchor }) => (
                <li key={anchor}>
                  <a
                    href={`#${anchor}`}
                    aria-current={active === anchor ? "true" : undefined}
                    className={cn(
                      "nav-link focus-ring relative inline-flex h-11 items-center rounded-full px-3 text-[14.5px] font-medium",
                      active === anchor
                        ? "bg-[var(--c-lilac)]/60 text-[var(--c-primary)]"
                        : "text-[var(--c-muted)] hover:text-[var(--c-primary)]",
                    )}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {/* Nunca se colapsa dentro del menú: el CTA es el único objetivo
                de la página y en móvil el menú está cerrado el 100 % del
                tiempo. En pantallas estrechas se queda en icono. */}
            <WhatsAppButton
              source="nav"
              variant="nav"
              ariaLabel={`${settings.header.ctaText}: escribir a ${brandWords.join(" ")}`}
              className="px-3 sm:px-4"
            >
              <span className="hidden md:inline">{settings.header.ctaText}</span>
              <span className="hidden sm:inline md:hidden">WhatsApp</span>
            </WhatsAppButton>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="menu-movil"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              className="focus-ring grid size-11 place-items-center rounded-full border border-[var(--c-border)] bg-white text-[var(--c-primary)] lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="menu-movil"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="container-page lg:hidden"
          >
            <nav
              aria-label="Menú móvil"
              className="card-shadow-lg mt-2 rounded-[28px] border border-[var(--c-border)] bg-white p-4"
            >
              <ul className="flex flex-col">
                {nav.map(({ label, anchor }) => (
                  <li key={anchor}>
                    <a
                      href={`#${anchor}`}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "focus-ring flex min-h-[48px] items-center rounded-2xl px-4 text-[17px] font-medium",
                        active === anchor
                          ? "bg-[var(--c-lilac)]/50 text-[var(--c-primary)]"
                          : "text-[var(--c-muted)]",
                      )}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
              {/* Sin CTA aquí: el de la barra no se colapsa nunca, así que
                  repetirlo dentro del menú solo duplicaba el mismo enlace. */}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
