"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, LayoutDashboard, LogOut, Pencil, Plus } from "lucide-react";
import { setVisible } from "@/lib/admin-bar-store";
import { cn } from "@/lib/utils";
import { useHydratedReducedMotion } from "@/lib/use-hydrated-reduced-motion";

interface AdminUser {
  id: number;
  name: string;
  roles: string[];
}

interface AdminBarItem {
  label: string;
  href: string;
}

interface AdminLinks {
  dashboardUrl: string;
  addItems: AdminBarItem[];
}

interface EditLink {
  editUrl: string | null;
  editLabel: string | null;
}

type AuthState =
  | { status: "pending"; user: null }
  | { status: "anonymous"; user: null }
  | { status: "authenticated"; user: AdminUser };

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function parseAuth(value: unknown): AuthState {
  if (!isRecord(value) || value.authenticated !== true || !isRecord(value.user)) {
    return { status: "anonymous", user: null };
  }

  const { id, name, roles } = value.user;
  if (
    typeof id !== "number" ||
    !Number.isInteger(id) ||
    typeof name !== "string" ||
    !Array.isArray(roles) ||
    !roles.every((role) => typeof role === "string")
  ) {
    return { status: "anonymous", user: null };
  }

  return { status: "authenticated", user: { id, name, roles } };
}

function parseLinks(value: unknown): AdminLinks | null {
  if (!isRecord(value) || typeof value.dashboardUrl !== "string" || !Array.isArray(value.addItems)) {
    return null;
  }

  const items: AdminBarItem[] = [];
  for (const item of value.addItems) {
    if (!isRecord(item) || typeof item.label !== "string" || typeof item.href !== "string") {
      return null;
    }
    items.push({ label: item.label, href: item.href });
  }
  return { dashboardUrl: value.dashboardUrl, addItems: items };
}

function parseEditLink(value: unknown): EditLink {
  if (!isRecord(value)) return { editUrl: null, editLabel: null };

  return {
    editUrl: typeof value.editUrl === "string" ? value.editUrl : null,
    editLabel: typeof value.editLabel === "string" ? value.editLabel : null,
  };
}

export function AdminBar() {
  const pathname = usePathname();
  const reducedMotion = useHydratedReducedMotion();
  const [auth, setAuth] = useState<AuthState>({ status: "pending", user: null });
  const [links, setLinks] = useState<AdminLinks | null>(null);
  const [editLink, setEditLink] = useState<EditLink>({ editUrl: null, editLabel: null });
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setMenuOpen(false), 150);
  }, [clearCloseTimer]);

  const closeMenu = useCallback((restoreFocus = false) => {
    clearCloseTimer();
    setMenuOpen(false);
    if (restoreFocus) triggerRef.current?.focus();
  }, [clearCloseTimer]);

  useEffect(() => {
    const controller = new AbortController();
    let secondFrame = 0;
    // La barra es una isla temprana del layout. Esperar dos frames impide que
    // una respuesta local muy rápida actualice el store mientras otras islas
    // de la landing todavía están hidratándose.
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => {
        void fetch("/api/admin-bar/auth", {
          cache: "no-store",
          credentials: "same-origin",
          signal: controller.signal,
        })
          .then((response) => response.json() as Promise<unknown>)
          .then((value) => setAuth(parseAuth(value)))
          .catch(() => {
            if (!controller.signal.aborted) setAuth({ status: "anonymous", user: null });
          });
      });
    });

    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
      controller.abort();
    };
  }, []);

  useLayoutEffect(() => {
    const authenticated = auth.status === "authenticated";
    setVisible(authenticated);
    return () => setVisible(false);
  }, [auth.status]);

  useEffect(() => {
    if (auth.status !== "authenticated") return;
    const controller = new AbortController();

    void fetch("/api/admin-bar/links", {
      cache: "no-store",
      credentials: "same-origin",
      signal: controller.signal,
    })
      .then((response) => response.json() as Promise<unknown>)
      .then((value) => setLinks(parseLinks(value)))
      .catch(() => {
        if (!controller.signal.aborted) setLinks(null);
      });

    return () => controller.abort();
  }, [auth.status]);

  useEffect(() => {
    closeMenu();
    setEditLink({ editUrl: null, editLabel: null });
    if (auth.status !== "authenticated") return;

    const controller = new AbortController();
    const params = new URLSearchParams({ path: pathname });
    void fetch(`/api/admin-bar/edit-link?${params.toString()}`, {
      cache: "no-store",
      credentials: "same-origin",
      signal: controller.signal,
    })
      .then((response) => response.json() as Promise<unknown>)
      .then((value) => setEditLink(parseEditLink(value)))
      .catch(() => {
        if (!controller.signal.aborted) setEditLink({ editUrl: null, editLabel: null });
      });

    return () => controller.abort();
  }, [auth.status, closeMenu, pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) closeMenu();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu(true);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [closeMenu, menuOpen]);

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await fetch("/api/admin-bar/session", {
        method: "DELETE",
        cache: "no-store",
        credentials: "same-origin",
      });
    } finally {
      closeMenu();
      setLinks(null);
      setEditLink({ editUrl: null, editLabel: null });
      setAuth({ status: "anonymous", user: null });
      setVisible(false);
      setLoggingOut(false);
    }
  };

  if (auth.status !== "authenticated") return null;

  const userInitial = Array.from(auth.user.name.trim())[0]?.toUpperCase() ?? "P";
  const motionProps = reducedMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -6 },
      };

  return (
    <motion.aside
      {...motionProps}
      transition={{ duration: reducedMotion ? 0 : 0.18, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Barra administrativa"
      className="fixed inset-x-0 top-0 z-[100] h-[var(--admin-bar-height)] w-[100vw] max-w-[100vw] bg-[var(--c-ink)] font-[family-name:var(--font-body)] text-white shadow-[0_4px_14px_rgba(11,74,117,0.28)]"
    >
      <div className="flex h-full w-full min-w-0 items-center gap-1 px-3 text-xs md:gap-1.5 md:px-4 md:text-sm">
        {links?.dashboardUrl ? (
          <a
            href={links.dashboardUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring inline-flex h-7 shrink-0 items-center gap-1.5 rounded px-2 font-medium hover:bg-white/10"
          >
            <LayoutDashboard className="size-4 text-[var(--c-star)]" aria-hidden="true" />
            <span className="hidden sm:inline">Escritorio</span>
            <span className="sr-only"> (se abre en una pestaña nueva)</span>
          </a>
        ) : null}

        {links?.addItems.length ? (
          <>
            <span className="mx-0.5 h-4 w-px shrink-0 bg-white/20" aria-hidden="true" />
            <div
              ref={menuRef}
              className="relative h-full"
              onMouseEnter={() => {
                if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
                clearCloseTimer();
                setMenuOpen(true);
              }}
              onMouseLeave={() => {
                if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
                  scheduleClose();
                }
              }}
            >
              <button
                ref={triggerRef}
                type="button"
                aria-expanded={menuOpen}
                aria-haspopup="menu"
                aria-controls="admin-bar-add-menu"
                onClick={() => setMenuOpen((value) => !value)}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown") {
                    event.preventDefault();
                    setMenuOpen(true);
                    requestAnimationFrame(() => {
                      menuRef.current?.querySelector<HTMLAnchorElement>("[role='menuitem']")?.focus();
                    });
                  }
                }}
                className="focus-ring inline-flex h-full items-center gap-1.5 rounded px-2 font-medium hover:bg-white/10"
              >
                <Plus className="size-4 text-[var(--c-star)]" aria-hidden="true" />
                <span>Añadir</span>
                <ChevronDown
                  className={cn("size-3 transition-transform", menuOpen && "rotate-180")}
                  aria-hidden="true"
                />
              </button>

              <AnimatePresence>
                {menuOpen ? (
                  <motion.div
                    id="admin-bar-add-menu"
                    role="menu"
                    aria-label="Añadir contenido"
                    initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -4, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -3, scale: 0.98 }}
                    transition={{ duration: reducedMotion ? 0 : 0.16, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute top-[calc(100%+6px)] left-0 max-h-[min(70vh,32rem)] w-[min(15rem,calc(100vw-1.5rem))] overflow-y-auto rounded-lg border border-[var(--c-border)] bg-white p-1.5 text-[13px] text-[var(--c-ink)] shadow-[0_16px_38px_rgba(11,74,117,0.22)]"
                  >
                    {links.addItems.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        role="menuitem"
                        onClick={() => closeMenu()}
                        className="focus-ring flex min-h-9 items-center rounded-md px-3 py-2 font-medium hover:bg-[color-mix(in_srgb,var(--c-accent)_18%,white)]"
                      >
                        {item.label}
                        <span className="sr-only"> (se abre en una pestaña nueva)</span>
                      </a>
                    ))}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </>
        ) : null}

        {editLink.editUrl && editLink.editLabel ? (
          <>
            <span className="mx-0.5 hidden h-4 w-px shrink-0 bg-white/20 sm:block" aria-hidden="true" />
            <a
              href={editLink.editUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex h-7 shrink-0 items-center gap-1.5 rounded px-2 font-medium hover:bg-white/10"
            >
              <Pencil className="size-3.5 text-[var(--c-star)]" aria-hidden="true" />
              <span className="sm:hidden">Editar</span>
              <span className="hidden sm:inline">{editLink.editLabel}</span>
              <span className="sr-only"> (se abre en una pestaña nueva)</span>
            </a>
          </>
        ) : null}

        <div className="min-w-0 flex-1" />

        <div
          className="pointer-events-none hidden size-6 shrink-0 place-items-center rounded-full bg-[var(--c-highlight)] text-[11px] font-bold text-white min-[360px]:grid"
          aria-hidden="true"
        >
          {userInitial}
        </div>
        <span className="hidden max-w-40 truncate font-medium md:block">{auth.user.name}</span>
        <button
          type="button"
          onClick={() => void handleLogout()}
          disabled={loggingOut}
          aria-label="Cerrar sesión de la barra administrativa"
          className="focus-ring grid size-7 shrink-0 place-items-center rounded text-white/90 hover:bg-white/10 hover:text-white disabled:cursor-wait disabled:opacity-50"
        >
          <LogOut className="size-4" aria-hidden="true" />
        </button>
      </div>
    </motion.aside>
  );
}
