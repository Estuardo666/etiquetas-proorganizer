import Image from "next/image";
import type { WpImage } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Muestra una imagen de WordPress. Si aún no se ha cargado ninguna,
 * dibuja un marcador de posición limpio y fácil de reconocer en el admin.
 */
export function Media({
  image,
  alt,
  className,
  imgClassName,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  label,
}: {
  image: WpImage;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  label?: string;
}) {
  if (!image?.url) {
    return (
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden bg-[var(--c-tint-accent)]",
          className,
        )}
        role="img"
        aria-label={alt}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 20%, color-mix(in srgb, var(--c-ink) 12%, transparent) 0, transparent 45%), radial-gradient(circle at 80% 75%, color-mix(in srgb, var(--c-accent) 12%, transparent) 0, transparent 45%)",
          }}
        />
        <span className="relative z-10 px-4 text-center text-xs font-semibold tracking-wide text-[var(--c-muted)] uppercase">
          {label ?? alt}
        </span>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={image.url}
        alt={image.alt || alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", imgClassName)}
      />
    </div>
  );
}
