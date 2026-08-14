"use client";

import Image from "next/image";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "@/components/ui/icon";
import { DecorativeStarFace } from "@/components/ui/decor";
import { brandParts, pipes } from "@/lib/utils";
import type { Settings } from "@/lib/types";

export function Footer({ settings }: { settings: Settings }) {
  const { footer, brand } = settings;

  // Columnas de navegación: cada línea del campo es `Etiqueta|ancla`.
  const navColumns = [
    { title: footer.col1Title, links: pipes(footer.col1Links) },
    { title: footer.col2Title, links: pipes(footer.col2Links) },
  ].filter((column) => column.title && column.links.length);

  const brandWords = brandParts(brand.logoText);

  const socials = [
    { href: brand.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: brand.facebook, label: "Facebook", Icon: FacebookIcon },
    { href: brand.tiktok, label: "TikTok", Icon: TikTokIcon },
  ].filter((social) => Boolean(social.href));

  return (
    <footer className="surface-tint border-t border-[var(--c-border)] pt-10 pb-28 md:pt-14 md:pb-7">
      <div className="container-page">
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.85fr_0.85fr] lg:gap-10">
          {/* Marca */}
          <div>
            {brand.logo?.url ? (
              <Image
                src={brand.logo.url}
                alt={brand.logo.alt || brand.logoText}
                width={150}
                height={44}
                className="h-10 w-auto object-contain"
              />
            ) : (
              <p className="flex items-center gap-1.5 font-[family-name:var(--font-heading)] text-[22px] font-semibold text-[var(--c-ink)]">
                {/* Sin logo subido, el nombre de la marca se escribe a dos
                    tonos: la primera palabra en azul, el resto en lavanda. */}
                {brandWords[0]}{" "}
                {brandWords[1] ? (
                  <span className="text-[var(--c-accent)]">{brandWords[1]}</span>
                ) : null}
                <DecorativeStarFace size={24} />
              </p>
            )}
            {/* Único resto útil de la columna "Compra online": una dirección
                es dato de confianza, no un enlace de navegación. */}
            <p className="mt-1.5 text-[13.5px] font-semibold text-[var(--c-ink)]">
              {brand.address}
            </p>

            {socials.length ? (
              <ul className="mt-4 flex gap-2">
                {socials.map(({ href, label, Icon: Social }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener"
                      aria-label={label}
                      className="focus-ring grid size-11 place-items-center rounded-xl border border-[var(--c-border)] bg-white text-[var(--c-ink)] transition-[translate,color,border-color] duration-200 hover:-translate-y-0.5 hover:border-[var(--c-pastel-accent)] hover:text-[var(--c-accent)]"
                    >
                      <Social className="size-[17px]" />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {/* Columnas de navegación */}
          {navColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="text-[14px] font-extrabold text-[var(--c-ink)]">
                {column.title}
              </h2>
              <ul className="mt-3 space-y-2 text-[14px] text-[var(--c-muted)]">
                {column.links.map(([label, anchor], index) => (
                  <li key={`${label}-${index}`}>
                    <a
                      href={`#${(anchor ?? "").replace(/^#/, "")}`}
                      className="focus-ring rounded-full transition-colors duration-200 hover:text-[var(--c-ink)]"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

        </div>

        {/* Franja de cierre: copyright, sin ruido legal ni frase duplicada. */}
        <div className="mt-8 rounded-[22px] bg-white/70 px-5 py-4 text-center">
          <div className="flex flex-col items-center gap-2 text-[12.5px] text-[var(--c-muted)]">
            <p>{footer.copyright.replace("{year}", String(new Date().getFullYear()))}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
