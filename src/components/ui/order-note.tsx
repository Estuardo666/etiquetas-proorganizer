import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Reaseguro que acompaña a cada CTA de WhatsApp.
 *
 * La promesa de "vista previa antes de imprimir" ya vive arriba de la página,
 * pero el usuario decide abajo, junto al botón: repetirla ahí convierte
 * "escribirle a un vendedor" en "ver antes de pagar", que es la objeción real
 * de un pedido que se cierra por chat y no por carrito.
 */
export function OrderNote({ text, className }: { text: string; className?: string }) {
  if (!text) return null;

  return (
    <p
      className={cn(
        "flex items-center justify-center gap-1.5 text-[13px] font-semibold text-[var(--c-muted)]",
        className,
      )}
    >
      <Eye className="size-4 shrink-0 text-[var(--c-lavender)]" aria-hidden="true" />
      {text}
    </p>
  );
}
