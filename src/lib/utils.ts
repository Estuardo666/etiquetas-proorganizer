import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Convierte un textarea multilínea en una lista limpia. */
export function lines(value?: string | null): string[] {
  return (value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

/** Parsea líneas con el formato `a|b|c` usadas en los campos editables. */
export function pipes(value?: string | null): string[][] {
  return lines(value).map((line) => line.split("|").map((part) => part.trim()));
}

/**
 * Parte el nombre de la marca en dos tonos para el logotipo escrito: primera
 * palabra y resto. El cliente lo escribe como quiera ("PRO ORGANIZER") y aquí
 * se normaliza a capitalización de título, que es como está dibujado el diseño.
 */
export function brandParts(logoText: string): [string, string] {
  const words = (logoText ?? "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase());

  return [words[0] ?? "", words.slice(1).join(" ")];
}

/**
 * Único constructor de enlaces de WhatsApp de la página. Ningún componente
 * arma la URL a mano: si el número cambia, cambia en un sitio.
 */
export function buildWhatsAppUrl({ number, message }: { number: string; message: string }) {
  return `https://wa.me/${(number ?? "").replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}

/** Formatea un número ecuatoriano para leerlo de un vistazo. */
export function formatPhone(raw: string) {
  const digits = (raw ?? "").replace(/\D/g, "").replace(/^593/, "");
  if (digits.length !== 9) return raw;
  return `+593 ${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 9)}`;
}

/**
 * Formato local: sin prefijo internacional y con el 0 de marcación nacional,
 * que es como el cliente marca desde Ecuador. El `+593` solo hace falta si
 * llamas desde fuera, y quien llama desde fuera no lee el número: pulsa.
 */
export function formatPhoneLocal(raw: string) {
  const digits = (raw ?? "").replace(/\D/g, "").replace(/^593/, "");
  if (digits.length !== 9) return raw;
  return `0${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 9)}`;
}

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
