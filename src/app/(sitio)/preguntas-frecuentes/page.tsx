import type { Metadata } from "next";
import { BuscadorFaq } from "@/components/sitio/buscador-faq";
import { CierreCta, PageIntro } from "@/components/sitio/piezas";
import { FAQ_TODAS } from "@/lib/catalogo";

export const metadata: Metadata = {
  title: "Preguntas frecuentes sobre etiquetas | Pro Organizer",
  description: "Respuestas sobre diseño, pago, envío y cuidado de las etiquetas personalizadas Pro Organizer.",
  alternates: { canonical: "/preguntas-frecuentes" },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_TODAS.map((faq) => ({ "@type": "Question", name: faq.title, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageIntro titulo="Preguntas" acento="frecuentes" texto="Diseño, pago, envío y cuidado de sus etiquetas." />
      <BuscadorFaq />
      <CierreCta titulo="¿No encontró su respuesta?" />
    </>
  );
}
