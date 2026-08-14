"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
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
  const scaleX = useSpring(progress, {
    stiffness: 120,
    damping: 26,
    mass: 0.3,
  });

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
      style={{ scaleX, background: "var(--c-accent)" }}
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
          className="focus-ring card-shadow fixed bottom-5 left-5 z-40 grid size-11 place-items-center rounded-full border border-[var(--c-border)] bg-white text-[var(--c-ink)] transition-transform hover:-translate-y-0.5 md:bottom-8"
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
    () =>
      pipes(settings.header.navItems).map(([label, anchor]) => ({
        label,
        anchor,
      })),
    [settings.header.navItems],
  );
  const brandWords = brandParts(settings.brand.logoText);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(nav[0]?.anchor ?? "");
  // Al hacer scroll la barra se contrae a la seccion activa; el puntero o el
  // foco de teclado la vuelven a abrir. El componente de Framer solo tiene las
  // variantes, pero sin esto la navegacion queda inaccesible una vez colapsada.
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();

  const collapsed = scrolled && !hovered;
  // Muelles del original: contenedor bounce .2 / .4 s, texto bounce 0 / .4 s.
  const shellSpring = reduced
    ? { duration: 0 }
    : ({ type: "spring", bounce: 0.2, duration: 0.4 } as const);
  const itemSpring = reduced
    ? { duration: 0 }
    : ({ type: "spring", bounce: 0, duration: 0.4, delay: 0.05 } as const);

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
        scrolled ? "py-2" : "py-3",
      )}
    >
      <div className="mx-auto w-[min(100%-48px,1260px)]">
        <motion.div
          layout
          transition={shellSpring}
          className={cn(
            "mx-auto flex w-full items-center justify-between gap-3 overflow-hidden rounded-full border border-white/10 bg-[var(--c-ink)] pl-4 text-white shadow-[0_14px_36px_-20px_rgba(38,38,38,0.72)] transition-[height,box-shadow] duration-300 sm:pl-5 lg:w-fit",
            scrolled
              ? "h-[56px] pr-1.5 shadow-[0_16px_40px_-18px_rgba(38,38,38,0.82)] sm:pr-2"
              : "h-[64px] pr-2.5 sm:pr-3",
          )}
        >
          {/* El hover/foco que expande la barra colapsada vive solo aqui:
              logo + nav. El boton de WhatsApp y el de menu quedan fuera para
              que pasar el mouse por el CTA no dispare la expansion. */}
          <div
            className="flex items-center gap-3"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocusCapture={() => setHovered(true)}
            onBlurCapture={(event) => {
              if (
                !event.currentTarget.contains(
                  event.relatedTarget as Node | null,
                )
              ) {
                setHovered(false);
              }
            }}
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
                      "font-[family-name:var(--font-heading)] leading-none font-medium text-white transition-all duration-300",
                      scrolled ? "text-[21px]" : "text-[23px]",
                    )}
                  >
                    {brandWords[0]}{" "}
                    {brandWords[1] ? (
                      <span className="text-[var(--c-highlight)]">
                        {brandWords[1]}
                      </span>
                    ) : null}
                  </span>
                </>
              )}
            </a>

            <nav aria-label="Principal" className="hidden lg:block">
              <LayoutGroup id="nav-dinamica">
                {/* `layout="position"` y no `layout`: al encoger la barra, el
                    layout animation escala la caja y el texto de los enlaces salia
                    aplastado en horizontal. Solo animamos la posicion. */}
                <motion.ul
                  layout="position"
                  transition={shellSpring}
                  className="flex items-center"
                >
                  <AnimatePresence initial={false} mode="popLayout">
                    {nav
                      .filter(({ anchor }) => !collapsed || active === anchor)
                      .map(({ label, anchor }) => (
                        <motion.li
                          key={anchor}
                          layout="position"
                          transition={{ layout: shellSpring, ...itemSpring }}
                          initial={{
                            opacity: 0.001,
                            filter: "blur(10px)",
                            y: 10,
                          }}
                          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                          exit={{ opacity: 0.001, filter: "blur(10px)", y: 10 }}
                        >
                          <a
                            href={`#${anchor}`}
                            aria-current={
                              active === anchor ? "true" : undefined
                            }
                            className={cn(
                              "focus-ring relative inline-flex h-10 items-center rounded-full px-3 text-[14.5px] font-medium transition-colors duration-200",
                              active === anchor
                                ? "bg-white/10 text-[var(--c-highlight)]"
                                : "text-white/82 hover:text-[var(--c-highlight)]",
                            )}
                          >
                            {label}
                          </a>
                        </motion.li>
                      ))}
                  </AnimatePresence>
                </motion.ul>
              </LayoutGroup>
            </nav>
          </div>

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
              <span className="hidden md:inline">
                {settings.header.ctaText}
              </span>
              <span className="hidden sm:inline md:hidden">WhatsApp</span>
            </WhatsAppButton>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="menu-movil"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              className="focus-ring grid size-11 place-items-center rounded-full border border-white/20 bg-white/10 text-white active:scale-[0.97] lg:hidden"
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
            /*
              `absolute`: dentro del flujo el panel crecía dentro del header
              sticky y empujaba toda la página hacia abajo al abrirlo. Como
              capa sobre el contenido, abrir el menú no mueve nada.
            */
            initial={{ opacity: 0, y: -14, scaleY: 0.82 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{
              opacity: 0,
              y: -10,
              scaleY: 0.9,
              transition: { duration: 0.2, ease: [0.36, 0, 0.66, -0.2] },
            }}
            transition={{
              // Rebote al abrir (back-out) y salida rápida al cerrar.
              duration: 0.34,
              ease: [0.34, 1.56, 0.64, 1],
              opacity: { duration: 0.18, ease: "linear" },
            }}
            style={{ transformOrigin: "top center" }}
            className="absolute inset-x-0 top-full mx-auto w-[min(100%-48px,1260px)] lg:hidden"
          >
            <nav
              aria-label="Menú móvil"
              className="card-shadow-lg mt-2 rounded-[28px] border border-white/10 bg-[var(--c-ink)] p-4 text-white"
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
                          ? "bg-white/10 text-[var(--c-highlight)]"
                          : "text-white/82 hover:text-[var(--c-highlight)]",
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
