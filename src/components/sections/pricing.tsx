"use client";

import { motion, type Variants } from "framer-motion";
import { SectionHeader } from "@/components/ui/section-header";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { ArtGift, ArtSheets } from "@/components/ui/illustrations";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { OrderNote } from "@/components/ui/order-note";
import { fadeScaleIn } from "@/lib/motion";
import type { PromoItem, Settings } from "@/lib/types";

const promoArt = [ArtSheets, ArtGift];

/**
 * Cuerpo de la cifra grande, compartido por el precio y por las dos ofertas:
 * "$8", "50 %" y "GRATIS" son el mismo dato para quien compara, y con dos
 * tamaños distintos el precio parecía la letra pequeña de las promociones.
 * Va en `clamp` porque "GRATIS" son seis caracteres en una tarjeta estrecha.
 */
const figureText =
  "font-[family-name:var(--font-heading)] text-[clamp(42px,4.6vw,64px)] leading-none font-bold";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Hover de las tres tarjetas. Los hijos declaran `rest`/`hover` con estos
 * mismos nombres, así que heredan el estado del padre sin escuchar el puntero
 * por su cuenta: un solo gesto mueve la tarjeta, su dibujo y su cifra.
 */
const priceCardHover: Variants = {
  rest: { y: 0, scale: 1, transition: { duration: 0.3, ease } },
  hover: { y: -8, scale: 1.02, transition: { duration: 0.3, ease } },
};

/** La cifra crece un punto más que la tarjeta: es lo que se mira. */
const figurePop: Variants = {
  rest: { scale: 1, transition: { duration: 0.3, ease } },
  hover: { scale: 1.07, transition: { duration: 0.3, ease } },
};

const artWiggle: Variants = {
  rest: { rotate: 0, scale: 1, transition: { duration: 0.3, ease } },
  hover: { rotate: -8, scale: 1.12, transition: { duration: 0.3, ease } },
};

const stickerPop: Variants = {
  rest: { rotate: -8, scale: 1, transition: { duration: 0.3, ease } },
  hover: { rotate: -3, scale: 1.06, transition: { duration: 0.3, ease } },
};

/** Pegatina girada de la esquina: numera la oferta sin gastar una línea. */
function Sticker({ label }: { label: string }) {
  return (
    <motion.span
      variants={stickerPop}
      // 12px es el suelo del texto en mayúsculas: por debajo, el espaciado de
      // letras de la pegatina la vuelve difícil de leer en móvil.
      className="absolute -top-3 -left-2 rounded-full px-3 py-1 text-[12px] leading-tight font-extrabold text-white uppercase"
      style={{ background: "var(--c-highlight)" }}
    >
      {label}
    </motion.span>
  );
}

/**
 * Precio y promociones: tres tarjetas del mismo tamaño en una fila.
 *
 * Las promociones estuvieron dentro de un panel rojo con el rótulo
 * "PROMOCIONES" encima, y ese panel hacía dos cosas malas a la vez: metía una
 * caja de más alrededor de unas tarjetas que ya son cajas, y dejaba el precio
 * fuera, más pequeño y separado, como si fuera de otra sección. Ahora las tres
 * comparten fila, tamaño y tratamiento; lo que las distingue es el color —azul
 * el precio, rojo suave las ofertas— y la pegatina numerada de la esquina.
 *
 * Cada tarjeta lleva su propio botón: desde una promoción concreta el pedido
 * llega con esa promoción escrita en el mensaje, en vez de un único CTA al pie
 * que obliga a repetir de viva voz cuál se quería.
 */
export function Pricing({ settings, promos }: { settings: Settings; promos: PromoItem[] }) {
  const { pricing } = settings;

  return (
    // `pb-fab`: el aviso de condiciones cerraba justo bajo el botón flotante.
    <section id="promociones" className="surface-base section-y pb-fab relative overflow-hidden">
      <div className="container-page relative z-10">
        <SectionHeader eyebrow={pricing.eyebrow} eyebrowIcon="badge" title={pricing.promoTitle} />

        {/*
          Móvil: las tres tarjetas se deslizan. Apiladas eran más de una
          pantalla para tres cifras que se leen de un vistazo.
        */}
        <RevealGroup
          className="snap-row items-stretch md:mx-auto md:grid md:max-w-[980px] md:grid-cols-3 md:gap-4 md:overflow-visible md:p-0 md:[margin-inline:0]"
          gap={0.08}
        >
          {/* Precio ---------------------------------------------------- */}
          <RevealItem variants={fadeScaleIn} className="flex w-[82%] shrink-0 md:w-auto">
            <motion.article
              initial="rest"
              animate="rest"
              whileHover="hover"
              variants={priceCardHover}
              className="flex w-full flex-col items-center rounded-[26px] px-5 py-8 text-center"
              style={{ background: "var(--c-navy)" }}
            >
              <p className="font-[family-name:var(--font-heading)] text-[32px] leading-none font-bold tracking-[0.02em] text-white uppercase sm:text-[38px]">
                {pricing.priceSticker}
              </p>
              <p className="mt-2 max-w-[14ch] text-[16px] leading-snug text-balance text-white/90">
                {pricing.priceTitle}
              </p>

              <motion.p
                variants={figurePop}
                className={`mt-4 flex items-end justify-center gap-2 text-white ${figureText}`}
              >
                {pricing.priceValue}
                {pricing.priceSuffix ? (
                  <span className="pb-3 text-[15px] font-bold">{pricing.priceSuffix}</span>
                ) : null}
              </motion.p>

              <p className="mt-3 font-[family-name:var(--font-heading)] text-[20px] leading-none font-semibold text-white">
                {pricing.priceSub}
              </p>

              {/* `mt-auto`: el botón cae al fondo de la tarjeta, así que las
                  tres tarjetas —que la rejilla ya iguala en alto— lo tienen a
                  la misma altura aunque el texto de arriba mida distinto. */}
              <span className="mt-auto pt-6">
                <WhatsAppButton
                  source="promos"
                  variant="inline"
                  label={pricing.ctaText}
                  ariaLabel={`${pricing.ctaText}: ${pricing.priceValue} ${pricing.priceSub}`}
                />
              </span>
            </motion.article>
          </RevealItem>

          {/* Promociones ------------------------------------------------ */}
          {promos.map((promo, index) => {
            const Art = promoArt[index % promoArt.length];
            const message = `Hola, quiero la promo de ${promo.post} ${promo.highlight}.`;

            return (
              <RevealItem
                key={promo.id}
                variants={fadeScaleIn}
                className="flex w-[82%] shrink-0 md:w-auto"
              >
                <motion.article
                  initial="rest"
                  animate="rest"
                  whileHover="hover"
                  variants={priceCardHover}
                  className="relative flex w-full flex-col items-center rounded-[26px] border-2 px-4 py-8 text-center"
                  style={{
                    // Rojo translúcido, no un relleno plano: la sección se ve
                    // por debajo y las tarjetas pesan menos que el azul, que es
                    // el que tiene que ganar la fila.
                    background: "color-mix(in srgb, var(--c-highlight) 12%, transparent)",
                    borderColor: "color-mix(in srgb, var(--c-highlight) 35%, transparent)",
                  }}
                >
                  <Sticker label={`${pricing.promosLabel} ${index + 1}`} />

                  {/* Centrado y sobre el texto: en la esquina competía con la
                      pegatina y desequilibraba la tarjeta hacia la derecha. */}
                  <motion.span variants={artWiggle} aria-hidden="true" className="mb-3">
                    <Art size={44} />
                  </motion.span>

                  <p className="max-w-[22ch] text-[14.5px] leading-snug text-pretty text-[var(--c-ink)]">
                    {promo.pre}
                  </p>

                  {promo.post ? (
                    <p className="mt-2 font-[family-name:var(--font-heading)] text-[26px] leading-none font-bold text-[var(--c-ink)]">
                      {promo.post}
                    </p>
                  ) : null}

                  <motion.p
                    variants={figurePop}
                    className={`mt-1 text-[var(--c-highlight-ink)] ${figureText}`}
                  >
                    {promo.highlight}
                  </motion.p>

                  <span className="mt-auto pt-6">
                    <WhatsAppButton
                      source="promos"
                      variant="inline"
                      message={message}
                      label={pricing.ctaText}
                      ariaLabel={`${pricing.ctaText}: ${promo.post} ${promo.highlight}`}
                    />
                  </span>
                </motion.article>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <div className="mt-6 flex flex-col items-center gap-3">
          <OrderNote text={settings.whatsapp.previewNote} />
          {pricing.note ? (
            <p className="max-w-[46rem] text-center text-[12.5px] leading-snug text-[var(--c-muted)]">
              {pricing.note}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
