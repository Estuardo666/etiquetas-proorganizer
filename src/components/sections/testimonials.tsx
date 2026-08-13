"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { DecorativeBackground, DecorativeHeart } from "@/components/ui/decor";
import { Media } from "@/components/ui/media";
import { cn } from "@/lib/utils";
import type { Settings, TestimonialItem } from "@/lib/types";

/** Fondo del avatar cuando todavía no hay foto. */
const avatarTints = ["#FFE1EC", "#E3F1FF", "#E7FBEF", "#EFE8FF"];

function Card({
  testimonial,
  index,
  className,
}: {
  testimonial: TestimonialItem;
  index: number;
  className?: string;
}) {
  return (
    <Reveal
      as="article"
      delay={index * 0.06}
      className={cn(
        "card-base group relative flex w-full min-w-0 flex-col bg-white p-5 hover:-translate-y-1.5",
        className,
      )}
    >
      {/* Pico de bocadillo */}
      <span
        aria-hidden="true"
        className="absolute -bottom-[9px] left-9 size-4 rotate-45 border-r border-b border-[rgb(105_91_220/0.14)] bg-white transition-colors duration-[260ms] group-hover:border-[rgb(124_103_238/0.32)]"
      />
      <Quote
        aria-hidden="true"
        className="absolute top-3 right-3 size-4 text-[var(--c-lilac)]"
        strokeWidth={2.4}
      />

      <div className="flex items-center gap-3">
        <span
          className="card-art grid size-[52px] shrink-0 place-items-center overflow-hidden rounded-full border-2 border-white"
          style={{ background: avatarTints[index % avatarTints.length] }}
        >
          {testimonial.avatar?.url ? (
            <Media
              image={testimonial.avatar}
              alt={testimonial.title}
              className="size-full rounded-full"
              sizes="44px"
            />
          ) : (
            <span className="font-[family-name:var(--font-heading)] text-[17px] font-semibold text-[var(--c-primary)]">
              {testimonial.title.slice(0, 1)}
            </span>
          )}
        </span>
        <div>
          {/* Nombre y ciudad en la misma línea: la ciudad da credibilidad sin
              pedir una foto que no tenemos. */}
          <p className="text-[14px] font-extrabold text-[var(--c-primary)]">
            {testimonial.title}
            {testimonial.city ? (
              <span className="font-semibold text-[var(--c-muted)]"> · {testimonial.city}</span>
            ) : null}
          </p>
          <div className="mt-0.5 flex gap-0.5" aria-label={`${testimonial.rating} de 5 estrellas`}>
            {Array.from({ length: Number(testimonial.rating) || 5 }).map((_, star) => (
              <Star
                key={star}
                className="size-3.5 fill-[var(--c-yellow)] text-[var(--c-yellow)] transition-transform duration-200 group-hover:scale-110"
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      </div>

      <p className="mt-3 text-[14.5px] leading-snug text-pretty text-[var(--c-text)]">
        {testimonial.text}
      </p>

      <DecorativeHeart
        className="absolute right-4 bottom-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        size={16}
      />
    </Reveal>
  );
}

export function Testimonials({
  settings,
  testimonials,
}: {
  settings: Settings;
  testimonials: TestimonialItem[];
}) {
  const copy = settings.testimonials;
  const trackRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);

  // Página activa según la posición del scroll (sin autoplay).
  const onScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const perPage = track.clientWidth || 1;
    setPage(Math.round(track.scrollLeft / perPage));
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const scrollBy = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.6, behavior: "smooth" });
  };

  if (!testimonials.length) return null;
  // Con cuatro reseñas o menos caben todas en desktop: rejilla centrada en
  // lugar de un carrusel que dejaría hueco a la derecha.
  const grid = testimonials.length <= 4;
  const pages = Math.max(1, Math.ceil(testimonials.length / 2));

  return (
    <section
      id="testimonios"
      className="section-y relative overflow-hidden bg-[var(--c-bg-alt)]"
    >
      <DecorativeBackground variant="testimonials" />

      <div className="container-page relative z-10">
        <SectionHeader
          eyebrow={copy.eyebrow}
          eyebrowIcon="heart"
          title={copy.title}
          subtitle={copy.ratingValue ? `${copy.ratingValue} ${copy.ratingLabel}` : undefined}
        />

        {/* Sin badge de cifra: la prueba social numérica vive en la fila de
            stats del hero. Un segundo número aquí decía otra cosa y dos cifras
            que no cuadran destruyen las dos. Queda la nota media. */}
        {grid ? (
          // Tantas columnas como reseñas: con tres tarjetas y cuatro columnas
          // quedaría un hueco muerto a la derecha.
          <div
            className={cn(
              "grid gap-4 sm:grid-cols-2 lg:gap-6",
              testimonials.length >= 4
                ? "lg:grid-cols-4"
                : testimonials.length === 3
                  ? "lg:grid-cols-3"
                  : "lg:grid-cols-2",
            )}
          >
            {testimonials.map((testimonial, index) => (
              <Card key={testimonial.id} testimonial={testimonial} index={index} />
            ))}
          </div>
        ) : (
          <>
            <div className="relative">
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                aria-label="Testimonios anteriores"
                className="focus-ring card-shadow absolute top-1/2 -left-2 z-10 hidden size-10 -translate-y-1/2 place-items-center rounded-full border border-[var(--c-border)] bg-white text-[var(--c-lavender)] transition-transform hover:-translate-y-[calc(50%+2px)] sm:grid"
              >
                <ChevronLeft className="size-5" aria-hidden="true" />
              </button>

              <div
                ref={trackRef}
                className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-1 pb-3 lg:gap-5"
              >
                {testimonials.map((testimonial, index) => (
                  <Card
                    key={testimonial.id}
                    testimonial={testimonial}
                    index={index}
                    className="w-[80%] shrink-0 snap-center sm:w-[calc(50%-8px)] lg:w-[calc(25%-15px)]"
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => scrollBy(1)}
                aria-label="Testimonios siguientes"
                className="focus-ring card-shadow absolute top-1/2 -right-2 z-10 hidden size-10 -translate-y-1/2 place-items-center rounded-full border border-[var(--c-border)] bg-white text-[var(--c-lavender)] transition-transform hover:-translate-y-[calc(50%+2px)] sm:grid"
              >
                <ChevronRight className="size-5" aria-hidden="true" />
              </button>
            </div>

            <ul className="mt-4 flex justify-center gap-2" aria-hidden="true">
              {Array.from({ length: pages }).map((_, index) => (
                <li
                  key={index}
                  className={cn(
                    "size-2 rounded-full transition-colors",
                    index === page ? "bg-[var(--c-lavender)]" : "bg-[var(--c-border)]",
                  )}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
