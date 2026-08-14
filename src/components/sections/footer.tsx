"use client";

import Image from "next/image";
import { FluidButton } from "@/components/ui/fluid-button";
import { FacebookIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from "@/components/ui/icon";
import { SHOP_URL } from "@/lib/site-config";
import { buildWhatsAppUrl, formatPhoneLocal, pipes } from "@/lib/utils";
import logoFooter from "../../../public/logo-footer.png";
import type { Settings } from "@/lib/types";

/**
 * Pie sobre morado de la paleta.
 *
 * Regla de color de esta sección: **todo el texto va en `--c-ink` al 100 %**.
 * Sobre el morado, el gris oscuro da 5,6:1, pero el gris secundario (76 %) se
 * queda en 2,4:1 — el truco de "el texto de apoyo se aclara un poco" que
 * funciona sobre crema aquí es ilegible. La jerarquía la marcan el tamaño y el
 * peso, no la opacidad.
 *
 * Orden: primero los datos y la navegación, y al final el bloque de cierre —
 * las dos formas de comprar y la frase de marca. Las dos llamadas comparten
 * fondo con el pie y se separan solo por el aire y por la línea divisoria: dos
 * tarjetas blancas ahí dentro pesaban más que el CTA real de la página.
 */
export function Footer({ settings }: { settings: Settings }) {
  const { footer, brand } = settings;

  // Columnas de navegación: cada línea del campo es `Etiqueta|ancla`.
  const navColumns = [
    { title: footer.col1Title, links: pipes(footer.col1Links) },
    { title: footer.col2Title, links: pipes(footer.col2Links) },
  ].filter((column) => column.title && column.links.length);

  const phones = [brand.phone1, brand.phone2].filter(Boolean);

  const socials = [
    { href: brand.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: brand.facebook, label: "Facebook", Icon: FacebookIcon },
    { href: brand.tiktok, label: "TikTok", Icon: TikTokIcon },
  ].filter((social) => Boolean(social.href));

  const webLabel = brand.webUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <footer className="bg-[var(--c-accent)] pt-10 pb-7 md:pt-14">
      <div className="container-page">
        {/* Marca, navegación y datos ------------------------------------ */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-[1.25fr_0.8fr_0.8fr_1fr] lg:gap-10">
          <div className="col-span-2 lg:col-span-1">
            <Image
              src={logoFooter}
              alt={brand.logoText}
              placeholder="blur"
              sizes="300px"
              className="h-auto w-[300px] max-w-full"
            />

            {phones.length ? (
              /* Los teléfonos son botones de chat, no texto de contacto: en
                 pastilla, con el número en formato local (el 0 nacional, sin
                 +593) y el mismo enlace de WhatsApp que usa toda la página. */
              <ul className="mt-4 flex w-fit flex-col gap-2">
                {phones.map((phone) => (
                  <li key={phone}>
                    <a
                      href={buildWhatsAppUrl({
                        number: phone,
                        message: settings.whatsapp.msgFooter,
                      })}
                      target="_blank"
                      rel="noopener"
                      aria-label={`Escribir por WhatsApp al ${formatPhoneLocal(phone)}`}
                      data-wa-source="footer"
                      className="footer-pill focus-ring inline-flex w-full items-center gap-2 rounded-full bg-white/85 px-3 py-2 text-[19px] leading-none font-extrabold text-[var(--c-ink)]"
                    >
                      <WhatsAppIcon className="size-[18px] shrink-0" />
                      {formatPhoneLocal(phone)}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {navColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="footer-pill-title">{column.title}</h2>
              <ul className="mt-3.5 space-y-2.5 text-[15.5px] font-semibold text-[var(--c-ink)]">
                {column.links.map(([label, anchor], index) => (
                  <li key={`${label}-${index}`}>
                    <a
                      href={`#${(anchor ?? "").replace(/^#/, "")}`}
                      // 40 px de alto pulsable en móvil: la lista de anclas es
                      // el único sitio del pie donde el texto es el botón.
                      className="footer-link focus-ring inline-flex min-h-[40px] items-center rounded-full sm:min-h-0"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="col-span-2 lg:col-span-1">
            <h2 className="footer-pill-title">Síganos</h2>
            {socials.length ? (
              <ul className="mt-3.5 flex gap-2">
                {socials.map(({ href, label, Icon: Social }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener"
                      aria-label={label}
                      className="footer-social-link focus-ring grid size-[38px] place-items-center rounded-full bg-white/90 text-[var(--c-ink)]"
                    >
                      <Social className="size-[15px]" />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}

            <p className="mt-5 text-[15.5px] leading-snug font-semibold text-[var(--c-ink)]">
              {brand.address}
            </p>
            <a
              href={brand.webUrl}
              target="_blank"
              rel="noopener"
              className="footer-link focus-ring mt-1 inline-flex min-h-[40px] items-center rounded-full text-[15.5px] font-bold text-[var(--c-ink)] sm:min-h-0"
            >
              {webLabel}
            </a>
          </div>
        </div>

        {/* Las dos formas de comprar ------------------------------------ */}
        <div className="mt-9 grid gap-8 border-t border-[color-mix(in_srgb,var(--c-ink)_22%,transparent)] pt-8 sm:grid-cols-2 sm:gap-10">
          <div className="text-center">
            <h2 className="font-[family-name:var(--font-heading)] text-[22px] leading-tight font-semibold text-[var(--c-ink)] sm:text-[25px]">
              {/* Dos líneas fijas: el corte lo decide el diseño, no el ancho
                  que le toque a la columna. */}
              <span className="block">Compre en nuestra</span>
              <span className="block">tienda en línea</span>
            </h2>
            <p className="mt-1.5 text-[15.5px] leading-snug text-[var(--c-ink)]">
              Rápido, fácil y seguro.
            </p>
            <div className="mt-4 flex justify-center">
              {/* Botones blancos: sobre el morado del pie un botón morado deja
                  de leerse como botón, y el verde de WhatsApp aquí competiría
                  con el CTA flotante. Los dos caminos pesan lo mismo. */}
              <FluidButton
                href={SHOP_URL}
                target="_blank"
                rel="noopener"
                ariaLabel="Visitar la tienda en línea de Pro Organizer"
                size="sm"
                background="#ffffff"
                overlayColor="var(--c-ink)"
                textColor="var(--c-ink)"
                secondTextColor="#ffffff"
                pulse={false}
                className="font-bold"
              >
                Visitar tienda en línea
              </FluidButton>
            </div>
          </div>

          <div className="text-center">
            <h2 className="mx-auto max-w-[11ch] font-[family-name:var(--font-heading)] text-[22px] leading-tight font-semibold text-balance text-[var(--c-ink)] sm:text-[25px]">
              {footer.waTitle}
            </h2>
            <p className="mt-1.5 text-[15.5px] leading-snug text-[var(--c-ink)]">{footer.waText}</p>
            <div className="mt-4 flex justify-center">
              <FluidButton
                href={buildWhatsAppUrl({
                  number: brand.whatsappNumber,
                  message: settings.whatsapp.msgFooter,
                })}
                target="_blank"
                rel="noopener"
                ariaLabel="Escribir por WhatsApp para hacer un pedido"
                dataWaSource="footer"
                size="sm"
                background="#ffffff"
                overlayColor="var(--c-ink)"
                textColor="var(--c-ink)"
                secondTextColor="#ffffff"
                pulse={false}
                className="font-bold"
              >
                {footer.waCta}
              </FluidButton>
            </div>
          </div>
        </div>

        {/* Cierre de marca ---------------------------------------------- */}
        <div className="mt-9 text-center">
          {footer.quote ? (
            <p className="mx-auto max-w-[46ch] font-[family-name:var(--font-heading)] text-[19px] leading-snug font-semibold text-balance text-[var(--c-ink)] sm:text-[22px]">
              {footer.quote}
            </p>
          ) : null}
          <p className="mt-2 text-[14.5px] font-bold text-[var(--c-ink)]">{footer.closing}</p>
          <p className="mt-3 text-[13.5px] text-[var(--c-ink)]">
            {footer.copyright.replace("{year}", String(new Date().getFullYear()))}
          </p>
        </div>
      </div>
    </footer>
  );
}
