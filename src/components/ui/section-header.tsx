import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

/**
 * Cabecera común: pretítulo, título y subtítulo opcional. Todas las secciones
 * la usan para que la jerarquía y los márgenes sean idénticos.
 */
export function SectionHeader({
  title,
  subtitle,
  align = "center",
  className,
  eyebrow,
  eyebrowIcon = "sparkles",
  titleClassName,
}: {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
  eyebrow?: string;
  eyebrowIcon?: string;
  titleClassName?: string;
}) {
  const centered = align === "center";

  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        centered ? "mx-auto text-center" : "text-left",
        subtitle ? "mb-7 lg:mb-10" : "mb-6 lg:mb-9",
        className,
      )}
    >
      {eyebrow ? (
        <p className={cn("mb-4", centered && "flex justify-center")}>
          <span className="section-eyebrow">
            {eyebrow}
          </span>
        </p>
      ) : null}

      <div className={cn("flex items-center", centered && "justify-center")}>
        <h2 className={cn("h2-display text-balance text-[var(--c-primary)]", titleClassName)}>
          {title}
        </h2>
      </div>

      {subtitle ? (
        <p className="mt-3 text-[16px] leading-relaxed text-pretty text-[var(--c-muted)]">
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}
