"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { NAVEGACION, PRODUCTOS } from "@/lib/catalogo";
import { cn } from "@/lib/utils";
import type { Settings } from "@/lib/types";

/** Misma píldora marina de la landing, con rutas en vez de anclas. */
export function SiteHeader({ settings }: { settings: Settings }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const logo = settings.brand.logo;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="relative py-3">
      <div className="mx-auto w-[min(100%-32px,1260px)]">
        <div className="flex h-[64px] items-center justify-between gap-3 rounded-full border border-white/10 bg-[var(--c-navy)] pr-2.5 pl-5 text-white shadow-[0_14px_36px_-20px_rgba(11,74,117,0.72)]">
          <Link href="/inicio" aria-label={settings.brand.logoText} className="focus-ring shrink-0 rounded-full">
            {logo?.url ? (
              <Image src={logo.url} alt={logo.alt || settings.brand.logoText} width={150} height={44} priority className="h-10 w-auto object-contain" />
            ) : (
              <span className="font-[family-name:var(--font-heading)] text-[20px] font-semibold">{settings.brand.logoText}</span>
            )}
          </Link>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {NAVEGACION.map((item) => {
                const activo = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={activo ? "page" : undefined}
                      className={cn(
                        "focus-ring flex min-h-[44px] items-center rounded-full px-3 text-[14.5px] font-medium whitespace-nowrap transition-colors hover:bg-white/10",
                        activo && "bg-white/15",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5">
            <WhatsAppButton source="nav" variant="nav" ariaLabel="Pedir por WhatsApp" className="hidden sm:inline-flex">
              {settings.header.ctaText}
            </WhatsAppButton>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="menu-movil"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              className="focus-ring grid size-11 place-items-center rounded-full lg:hidden"
            >
              {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {open ? (
          <div id="menu-movil" className="card-shadow mt-2 max-h-[calc(100dvh-104px)] overflow-y-auto rounded-[26px] bg-white p-3 text-[var(--c-ink)] lg:hidden">
            <ul className="grid gap-2">
              {PRODUCTOS.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={item.ruta}
                    onClick={() => setOpen(false)}
                    className={cn("focus-ring flex min-h-[64px] items-center gap-3 rounded-[18px] p-2", item.superficie)}
                  >
                    <Image src={item.imagen.url} alt="" width={56} height={56} className="size-14 rounded-[14px] object-cover" />
                    <span>
                      <span className="block font-bold">{item.nombre}</span>
                      <span className="block text-[14px]">{item.precio}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-2">
              {NAVEGACION.slice(PRODUCTOS.length).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={() => setOpen(false)} className="focus-ring flex min-h-[48px] items-center rounded-[14px] px-3 font-medium">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <WhatsAppButton source="nav" variant="primary" ariaLabel="Pedir por WhatsApp" className="mt-2 w-full">
              {settings.header.ctaText}
            </WhatsAppButton>
          </div>
        ) : null}
      </div>
    </header>
  );
}
