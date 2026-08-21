"use client";

import Image from "next/image";
import { FluidButton } from "@/components/ui/fluid-button";
import { FacebookIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from "@/components/ui/icon";
import { footerNavigation, SHOP_URL } from "@/lib/site-config";
import { buildWhatsAppUrl, formatPhoneLocal, pipes } from "@/lib/utils";
import type { Settings } from "@/lib/types";

/**
 * Pie sobre el azul marino de la marca.
 *
 * Regla de color de esta sección: **todo el texto va en blanco al 100 %**.
 * Sobre el azul marino el blanco da 9,0:1, pero blanco al 70 % ya baja a
 * 4,3:1 — el truco de "el texto de apoyo se aclara un poco" que funciona
 * sobre fondo claro aquí lo apaga. La jerarquía la marcan el tamaño y el peso,
 * no la opacidad. El rojo de marca entra solo en las pastillas de rótulo y en
 * el botón de WhatsApp.
 *
 * Orden: primero los datos y la navegación, y al final el bloque de cierre —
 * las dos formas de comprar y la frase de marca. Las dos llamadas comparten
 * fondo con el pie y se separan solo por el aire y por la línea divisoria: dos
 * tarjetas blancas ahí dentro pesaban más que el CTA real de la página.
 */
export function Footer({ settings }: { settings: Settings }) {
  const { footer, brand } = settings;

  const phones = [
    { number: brand.phone1, label: brand.phone1Label },
    { number: brand.phone2, label: brand.phone2Label },
  ].filter((phone) => Boolean(phone.number));
  const legalLinks = pipes(footer.legalLinks);

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
            {brand.footerLogo?.url ? (
              <Image
                src={brand.footerLogo.url}
                alt={brand.footerLogo.alt || brand.logoText}
                width={brand.footerLogo.width || 300}
                height={brand.footerLogo.height || 110}
                sizes="300px"
                className="h-auto w-[300px] max-w-full"
              />
            ) : (
              <p className="font-[family-name:var(--font-heading)] text-[28px] font-semibold text-white">
                {brand.logoText}
              </p>
            )}

            {phones.length ? (
              /* Los teléfonos son botones de chat, no texto de contacto: en
                 pastilla, con el número en formato local (el 0 nacional, sin
                 +593) y el mismo enlace de WhatsApp que usa toda la página. */
              <ul className="mt-4 flex w-fit flex-col gap-2">
                {phones.map((phone) => (
                  <li key={phone.number}>
                    {phone.label ? (
                      <span className="mb-1 block text-[12px] font-bold text-white">
                        {phone.label}
                      </span>
                    ) : null}
                    <a
                      href={buildWhatsAppUrl({
                        number: phone.number,
                        message: settings.whatsapp.msgFooter,
                      })}
                      target="_blank"
                      rel="noopener"
                      aria-label={`Escribir por WhatsApp al ${formatPhoneLocal(phone.number)}`}
                      data-wa-source="footer"
                      className="footer-pill focus-ring inline-flex w-full items-center gap-2 rounded-full bg-white/85 px-3 py-2 text-[19px] leading-none font-extrabold text-[var(--c-navy)]"
                    >
                      <WhatsAppIcon className="size-[18px] shrink-0" />
                      {formatPhoneLocal(phone.number)}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {footerNavigation.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="footer-pill-title">{column.title}</h2>
              <ul className="mt-3.5 space-y-2.5 text-[15.5px] font-semibold text-white">
                {column.links.map(({ label, anchor }) => (
                  <li key={anchor}>
                    <a
                      href={`#${anchor}`}
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
            <h2 className="footer-pill-title">{footer.socialTitle}</h2>
            {socials.length ? (
              <ul className="mt-3.5 flex gap-2">
                {socials.map(({ href, label, Icon: Social }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener"
                      aria-label={label}
                      className="footer-social-link focus-ring grid size-[38px] place-items-center rounded-full bg-white/90 text-[var(--c-navy)]"
                    >
                      <Social className="size-[15px]" />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}

            <p className="mt-5 text-[15.5px] leading-snug font-semibold text-white">
              {brand.address}
            </p>
            <a
              href={brand.webUrl}
              target="_blank"
              rel="noopener"
              className="footer-link focus-ring mt-1 inline-flex min-h-[40px] items-center rounded-full text-[15.5px] font-bold text-white sm:min-h-0"
            >
              {webLabel}
            </a>
          </div>
        </div>

        {/* Las dos formas de comprar ------------------------------------ */}
        <div className="mt-9 grid gap-8 border-t border-white/25 pt-8 sm:grid-cols-2 sm:gap-10">
          <div className="text-center">
            <h2 className="font-[family-name:var(--font-heading)] text-[22px] leading-tight font-semibold text-white sm:text-[25px]">
              {footer.storeTitle}
            </h2>
            <p className="mt-1.5 text-[15.5px] leading-snug text-white">
              {footer.storeText}
            </p>
            <div className="mt-4 flex justify-center">
              {/* Tienda en pastilla blanca y chat en rojo de marca, igual que
                  en el pie impreso: sobre el azul marino los dos caminos se
                  leen como botón y el rojo marca cuál cierra la venta. */}
              <FluidButton
                href={SHOP_URL}
                target="_blank"
                rel="noopener"
                ariaLabel="Visitar la tienda en línea de Pro Organizer"
                size="sm"
                background="#ffffff"
                overlayColor="var(--c-navy)"
                textColor="var(--c-navy)"
                secondTextColor="#ffffff"
                pulse={false}
                className="font-bold"
              >
                {footer.storeCta}
              </FluidButton>
            </div>
          </div>

          <div className="text-center">
            <h2 className="mx-auto max-w-[11ch] font-[family-name:var(--font-heading)] text-[22px] leading-tight font-semibold text-balance text-white sm:text-[25px]">
              {footer.waTitle}
            </h2>
            <p className="mt-1.5 text-[15.5px] leading-snug text-white">{footer.waText}</p>
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
                background="var(--c-highlight)"
                overlayColor="#ffffff"
                textColor="#ffffff"
                secondTextColor="var(--c-navy)"
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
          {/*
            La cobertura de envío cierra el pie, justo encima del copyright:
            es la última objeción que queda viva cuando alguien de fuera de
            Guayaquil llega al final de la página, y aquí no compite con
            ninguna de las tres columnas de contacto.
          */}
          {footer.shippingNote ? (
            <p className="mx-auto mb-4 w-fit rounded-full border border-white/35 px-4 py-1.5 text-[14.5px] font-bold text-white">
              {footer.shippingNote}
            </p>
          ) : null}
          {/*
            El lema y la frase de cierre salieron del pie: decían lo mismo que
            el hero y que la sección de costo, y eran las dos últimas líneas
            antes del copyright. `quote` y `closing` siguen en el contrato de
            WordPress, pero ya no se pintan aquí.
          */}
          <p className="mt-3 text-[13.5px] text-white">
            {footer.copyright.replace("{year}", String(new Date().getFullYear()))}
          </p>
          {legalLinks.length ? (
            <ul className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-2 text-[13px] font-semibold text-white">
              {legalLinks.map(([label, href]) => (
                <li key={`${label}-${href}`}>
                  <a className="footer-link focus-ring rounded-full" href={href || "#"}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
