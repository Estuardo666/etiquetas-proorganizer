/**
 * Ilustraciones planas del diseño kids premium.
 *
 * Mientras no haya fotos reales en WordPress, estas piezas SVG sustituyen a los
 * marcadores de posición: dan la densidad visual del mockup sin pesar nada.
 * Todas son decorativas (`aria-hidden`) salvo que el contenedor las etiquete.
 */

import { cn, slugify } from "@/lib/utils";

/**
 * Escala de las ilustraciones. No son colores nuevos: son los tonos de la
 * paleta de marca a varias fuerzas. Los personajes necesitan profundidad
 * interna (contorno, relleno, sombra, brillo), y esa profundidad se consigue
 * variando la fuerza de un mismo tono, no sumando tonos.
 *
 * Los cinco iconos de beneficio sí llevan color propio (agua azul, escudo
 * verde, corazón rojo...): son cinco cosas distintas en una fila y el color es
 * lo que las separa de un vistazo. El contorno sigue siendo azul marino en
 * todos, que es lo que los mantiene como una familia.
 */
const C = {
  ink: "var(--c-ink)",
  inkSoft: "var(--c-pastel-ink)",
  inkFaint: "var(--c-tint-ink)",
  accent: "var(--c-accent)",
  accentSoft: "var(--c-pastel-accent)",
  accentFaint: "var(--c-tint-accent)",
  warm: "var(--c-highlight)",
  warmMid: "color-mix(in srgb, var(--c-highlight) 80%, var(--c-ink))",
  warmDeep: "var(--c-highlight-ink)",
  warmSoft: "var(--c-pastel-highlight)",
  warmFaint: "var(--c-tint-highlight)",
  water: "var(--c-blue)",
  waterFaint: "var(--c-tint-positive)",
  /** Verde de marca aclarado: sobre él va un check blanco, no texto. */
  safe: "color-mix(in srgb, var(--c-green) 72%, #ffffff)",
  sun: "var(--c-star)",
} as const;

type ArtProps = { className?: string; size?: number };

/**
 * Elige una ilustración por el texto del elemento, no por su posición: el
 * contenido viene de WordPress y puede reordenarse o renombrarse sin que el
 * icono deje de corresponder.
 */
function matchArt<T>(text: string, rules: Array<[string[], T]>, fallback: T): T {
  const slug = slugify(text);
  for (const [keywords, art] of rules) {
    if (keywords.some((keyword) => slug.includes(keyword))) return art;
  }
  return fallback;
}

const svgBase = "shrink-0";

/* --- Etiqueta con nombre ------------------------------------------------ */

/** Pegatina blanca con nombre; se reutiliza sobre los productos del hero. */
function NameTag({
  x,
  y,
  w = 74,
  h = 26,
  rotate = 0,
  fill = "#fff",
  stroke = C.accentFaint,
  text = "Mateo",
  fontSize = 12,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  rotate?: number;
  fill?: string;
  stroke?: string;
  text?: string;
  fontSize?: number;
}) {
  return (
    <g transform={`rotate(${rotate} ${x + w / 2} ${y + h / 2})`}>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={h / 2}
        fill={fill}
        stroke={stroke}
        strokeWidth="2"
      />
      <text
        x={x + w / 2}
        y={y + h / 2 + fontSize * 0.36}
        textAnchor="middle"
        fontSize={fontSize}
        fontWeight="700"
        fill={C.ink}
        fontFamily="var(--font-heading), system-ui, sans-serif"
      >
        {text}
      </text>
    </g>
  );
}

/* --- Escena del hero ---------------------------------------------------- */

/**
 * Composición editorial de productos etiquetados: los objetos se superponen y
 * se apoyan directamente sobre el fondo, sin caja contenedora.
 */
export function HeroScene({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 440"
      className={cn("w-full", className)}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* Cada objeto lleva su propia sombra: es lo que separa las capas y
            evita que la composición se vea plana. */}
        <filter id="hero-drop" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor={C.ink} floodOpacity="0.18" />
        </filter>
        <filter id="hero-drop-soft" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="0" dy="6" stdDeviation="7" floodColor={C.ink} floodOpacity="0.14" />
        </filter>
      </defs>

      {/* Cuaderno (al fondo, ligeramente girado) */}
      <g transform="rotate(4 380 150)" filter="url(#hero-drop-soft)">
        <rect x="312" y="34" width="150" height="212" rx="14" fill={C.accent} />
        <rect x="330" y="34" width="132" height="212" rx="14" fill={C.accentSoft} />
        <rect x="330" y="34" width="10" height="212" fill={C.accentSoft} />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect
            key={i}
            x="306"
            y={58 + i * 32}
            width="34"
            height="8"
            rx="4"
            fill="#fff"
            stroke={C.accent}
            strokeWidth="2"
          />
        ))}
        <NameTag x={352} y={120} w={88} h={28} text="Mateo R." fontSize={13} />
      </g>

      {/* Termo */}
      <g transform="rotate(-2 178 170)" filter="url(#hero-drop)">
        <rect x="150" y="52" width="58" height="20" rx="8" fill={C.inkSoft} />
        <path d="M186 40h10a8 8 0 0 1 8 8v10h-14V52a4 4 0 0 0-4-4Z" fill={C.inkSoft} />
        <rect x="140" y="66" width="78" height="216" rx="34" fill={C.inkSoft} />
        <rect x="140" y="66" width="26" height="216" rx="13" fill={C.inkFaint} />
        <rect x="140" y="248" width="78" height="34" rx="16" fill={C.inkSoft} />
        <NameTag x={146} y={140} w={68} h={26} text="Mateo" />
      </g>

      {/* Cubiertos (detrás de la lonchera) */}
      <g transform="rotate(14 372 330)" filter="url(#hero-drop-soft)">
        <rect x="352" y="276" width="15" height="106" rx="7" fill={C.inkSoft} />
        <path d="M344 276h31v-26a15 15 0 0 0-31 0Z" fill={C.inkSoft} />
        <rect x="384" y="276" width="15" height="106" rx="7" fill={C.inkSoft} />
        <path
          d="M378 248v30h27v-30M386 248v20M396 248v20"
          stroke={C.inkSoft}
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* Lonchera (la pieza más adelantada) */}
      <g transform="rotate(3 250 320) scale(1.06) translate(-14 -18)" filter="url(#hero-drop)">
        <rect x="152" y="252" width="184" height="128" rx="26" fill={C.warm} />
        <rect x="152" y="252" width="184" height="34" rx="17" fill={C.warmSoft} />
        <path
          d="M226 250v-8a18 18 0 0 1 36 0v8"
          stroke={C.warmMid}
          strokeWidth="9"
          fill="none"
          strokeLinecap="round"
        />
        <rect x="220" y="366" width="48" height="16" rx="8" fill={C.warmMid} />
        <NameTag x={186} y={300} w={116} h={32} text="Mateo R." fontSize={14} />
      </g>

      {/* Vaso con lápices, pegado al borde derecho */}
      <g transform="translate(14 0)" filter="url(#hero-drop)">
        <path
          d="M438 232h96l-10 116a16 16 0 0 1-16 14h-44a16 16 0 0 1-16-14Z"
          fill={C.inkFaint}
          stroke={C.inkFaint}
          strokeWidth="3"
        />
        {[
          { x: 452, c: C.accentSoft, r: -9 },
          { x: 470, c: C.inkFaint, r: -3 },
          { x: 488, c: C.inkSoft, r: 4 },
          { x: 506, c: C.warm, r: 10 },
        ].map((p) => (
          <g key={p.x} transform={`rotate(${p.r} ${p.x + 7} 240)`}>
            <rect x={p.x} y="164" width="14" height="80" rx="5" fill={p.c} />
            <path
              d={`M${p.x} 172 l7 -14 l7 14Z`}
              fill={C.warmFaint}
              stroke={C.warmSoft}
              strokeWidth="1.5"
            />
          </g>
        ))}
        <NameTag x={452} y={284} w={70} h={24} text="Mateo" fontSize={11} />
      </g>

      {/* Marcadores, en diagonal */}
      <g transform="rotate(-14 152 402)" filter="url(#hero-drop-soft)">
        <rect x="66" y="392" width="112" height="22" rx="11" fill={C.accent} />
        <rect x="150" y="392" width="28" height="22" rx="11" fill={C.accent} />
        <NameTag x={76} y={394} w={62} h={18} text="Mateo" fontSize={9} />
      </g>
      <g transform="rotate(-8 236 414)" filter="url(#hero-drop-soft)">
        <rect x="186" y="404" width="112" height="22" rx="11" fill={C.inkFaint} />
        <rect x="270" y="404" width="28" height="22" rx="11" fill={C.inkSoft} />
        <NameTag x={196} y={406} w={62} h={18} text="Mateo" fontSize={9} />
      </g>
    </svg>
  );
}

/* --- Iconos de beneficios ---------------------------------------------- */

export function ArtWater({ className, size = 40 }: ArtProps) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={cn(svgBase, className)} aria-hidden="true">
      <path
        d="M24 5c8 10 13 16 13 22.5A13 13 0 0 1 11 27.5C11 21 16 15 24 5Z"
        fill={C.water}
        stroke={C.ink}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M18 28a6 6 0 0 0 5 5.6" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function ArtWasher({ className, size = 40 }: ArtProps) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={cn(svgBase, className)} aria-hidden="true">
      <rect x="8" y="6" width="32" height="36" rx="8" fill={C.waterFaint} stroke={C.ink} strokeWidth="1.8" />
      <circle cx="24" cy="27" r="10" fill="#fff" />
      <circle cx="24" cy="27" r="6" fill={C.water} />
      <circle cx="14" cy="13" r="2.2" fill="#fff" />
      <circle cx="21" cy="13" r="2.2" fill="#fff" />
    </svg>
  );
}

export function ArtShield({ className, size = 40 }: ArtProps) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={cn(svgBase, className)} aria-hidden="true">
      <path
        d="M24 4 40 10v13c0 10-7 18-16 21-9-3-16-11-16-21V10Z"
        fill={C.safe}
        stroke={C.ink}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="m16 24 6 6 11-12" stroke="#fff" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export function ArtHeart({ className, size = 40 }: ArtProps) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={cn(svgBase, className)} aria-hidden="true">
      <path
        d="M24 42S5 30.5 5 18.5C5 11.6 10.4 6 17.2 6c3.7 0 6.4 1.7 6.8 3.8.4-2.1 3.1-3.8 6.8-3.8C37.6 6 43 11.6 43 18.5 43 30.5 24 42 24 42Z"
        fill={C.warm}
        stroke={C.ink}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArtSmile({ className, size = 40 }: ArtProps) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={cn(svgBase, className)} aria-hidden="true">
      <circle cx="24" cy="24" r="19" fill={C.sun} stroke={C.ink} strokeWidth="1.8" />
      <circle cx="18" cy="20" r="2.6" fill={C.ink} />
      <circle cx="30" cy="20" r="2.6" fill={C.ink} />
      <path d="M16 28c3.4 4.6 12.6 4.6 16 0" stroke={C.ink} strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function ArtTruck({ className, size = 40 }: ArtProps) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={cn(svgBase, className)} aria-hidden="true">
      <rect x="4" y="14" width="24" height="18" rx="4" fill={C.accentSoft} stroke="#fff" strokeWidth="2.4" />
      <path d="M28 20h7l6 7v5H28Z" fill={C.accent} stroke="#fff" strokeWidth="2.4" strokeLinejoin="round" />
      <circle cx="14" cy="35" r="4.5" fill={C.ink} stroke="#fff" strokeWidth="2.2" />
      <circle cx="33" cy="35" r="4.5" fill={C.ink} stroke="#fff" strokeWidth="2.2" />
    </svg>
  );
}

export function ArtEye({ className, size = 40 }: ArtProps) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={cn(svgBase, className)} aria-hidden="true">
      <path d="M4 24c5-8 12-12 20-12s15 4 20 12c-5 8-12 12-20 12S9 32 4 24Z" fill={C.inkSoft} stroke="#fff" strokeWidth="2.4" strokeLinejoin="round" />
      <circle cx="24" cy="24" r="8" fill="#fff" />
      <circle cx="24" cy="24" r="4.6" fill={C.ink} />
    </svg>
  );
}

export function ArtLeaf({ className, size = 40 }: ArtProps) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={cn(svgBase, className)} aria-hidden="true">
      <path d="M40 7C22 8 10 17 10 30c0 7 5 11 11 11 13 0 20-14 19-34Z" fill={C.accentSoft} stroke={C.ink} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M13 37c7-9 14-15 23-23M22 28l-1-9M28 22l8 1" fill="none" stroke={C.ink} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArtBolt({ className, size = 40 }: ArtProps) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={cn(svgBase, className)} aria-hidden="true">
      <path d="M27 4 10 27h12l-2 17 18-25H26Z" fill={C.warm} stroke={C.ink} strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

export function ArtChat({ className, size = 40 }: ArtProps) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={cn(svgBase, className)} aria-hidden="true">
      <path d="M7 9h34v25H23l-10 8v-8H7Z" fill={C.accentSoft} stroke={C.ink} strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="17" cy="22" r="2.3" fill={C.ink} />
      <circle cx="24" cy="22" r="2.3" fill={C.ink} />
      <circle cx="31" cy="22" r="2.3" fill={C.ink} />
    </svg>
  );
}

const benefitArt: Record<string, (props: ArtProps) => React.ReactElement> = {
  drop: ArtWater,
  washer: ArtWasher,
  shield: ArtShield,
  heart: ArtHeart,
  smile: ArtSmile,
  truck: ArtTruck,
  eye: ArtEye,
  leaf: ArtLeaf,
  bolt: ArtBolt,
  chat: ArtChat,
  badge: ArtShield,
  sparkles: ArtSmile,
  star: ArtSmile,
};

/** Icono ilustrado de la franja de beneficios; cae al genérico si no existe. */
export function BenefitArt({ name, size = 40, className }: ArtProps & { name: string }) {
  const Art = benefitArt[name] ?? ArtSmile;
  return <Art size={size} className={className} />;
}

/* --- Objetos de "¿Dónde las puedes usar?" ------------------------------ */

function Lunchbox({ size = 48 }: ArtProps) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={svgBase} aria-hidden="true">
      <path d="M18 13v-2a6 6 0 0 1 12 0v2" stroke={C.warmMid} strokeWidth="3.4" fill="none" strokeLinecap="round" />
      <rect x="6" y="13" width="36" height="26" rx="7" fill={C.warm} stroke="#fff" strokeWidth="2.4" />
      <rect x="6" y="13" width="36" height="9" rx="4.5" fill={C.warmSoft} />
      <rect x="14" y="26" width="20" height="7" rx="3.5" fill="#fff" />
    </svg>
  );
}

function Bottle({ size = 48 }: ArtProps) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={svgBase} aria-hidden="true">
      <rect x="19" y="4" width="11" height="7" rx="3" fill={C.inkSoft} />
      <rect x="14" y="10" width="20" height="34" rx="9" fill={C.inkSoft} stroke="#fff" strokeWidth="2.4" />
      <rect x="14" y="21" width="20" height="9" fill="#fff" />
      <rect x="17" y="23" width="14" height="5" rx="2.5" fill={C.accentFaint} />
    </svg>
  );
}

function Books({ size = 48 }: ArtProps) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={svgBase} aria-hidden="true">
      <rect x="7" y="30" width="34" height="11" rx="4" fill={C.inkFaint} stroke="#fff" strokeWidth="2.2" />
      <rect x="10" y="19" width="30" height="11" rx="4" fill={C.accent} stroke="#fff" strokeWidth="2.2" />
      <rect x="13" y="8" width="26" height="11" rx="4" fill={C.accentSoft} stroke="#fff" strokeWidth="2.2" />
      <rect x="17" y="11" width="14" height="4" rx="2" fill="#fff" />
    </svg>
  );
}

function Pencils({ size = 48 }: ArtProps) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={svgBase} aria-hidden="true">
      <g transform="rotate(-16 17 24)">
        <rect x="11" y="10" width="12" height="30" rx="4" fill={C.accent} />
        <path d="M11 16 17 6l6 10Z" fill={C.warmFaint} />
        <rect x="11" y="34" width="12" height="6" fill={C.accent} />
      </g>
      <g transform="rotate(14 32 26)">
        <rect x="26" y="12" width="12" height="30" rx="4" fill={C.inkSoft} />
        <path d="M26 18 32 8l6 10Z" fill={C.warmFaint} />
        <rect x="26" y="36" width="12" height="6" fill={C.inkSoft} />
      </g>
    </svg>
  );
}

function Markers({ size = 48 }: ArtProps) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={svgBase} aria-hidden="true">
      <g transform="rotate(-10 16 24)">
        <rect x="10" y="12" width="13" height="28" rx="5" fill={C.inkFaint} />
        <rect x="10" y="12" width="13" height="7" rx="3.5" fill={C.inkSoft} />
        <path d="M12.5 40h8l-2 5h-4Z" fill={C.inkSoft} />
      </g>
      <g transform="rotate(10 32 24)">
        <rect x="26" y="12" width="13" height="28" rx="5" fill={C.accentSoft} />
        <rect x="26" y="12" width="13" height="7" rx="3.5" fill={C.accent} />
        <path d="M28.5 40h8l-2 5h-4Z" fill={C.accent} />
      </g>
    </svg>
  );
}

function Cutlery({ size = 48 }: ArtProps) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={svgBase} aria-hidden="true">
      <g transform="rotate(-8 16 24)">
        <rect x="12" y="20" width="7" height="24" rx="3.5" fill={C.inkSoft} />
        <ellipse cx="15.5" cy="14" rx="7" ry="9" fill={C.inkSoft} stroke="#fff" strokeWidth="2" />
      </g>
      <g transform="rotate(8 32 24)">
        <rect x="28" y="20" width="7" height="24" rx="3.5" fill={C.inkSoft} />
        <path
          d="M27 4v14h9V4M31.5 4v12"
          stroke={C.inkSoft}
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
      </g>
    </svg>
  );
}

function Backpack({ size = 48 }: ArtProps) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={svgBase} aria-hidden="true">
      <path d="M16 16c0-6 3.6-10 8-10s8 4 8 10" stroke={C.accentSoft} strokeWidth="3.4" fill="none" />
      <rect x="8" y="14" width="32" height="28" rx="10" fill={C.accentSoft} stroke="#fff" strokeWidth="2.4" />
      <path d="M8 28h32" stroke="#fff" strokeWidth="2.6" />
      <rect x="18" y="30" width="12" height="8" rx="3" fill="#fff" />
    </svg>
  );
}

function Shirt({ size = 48 }: ArtProps) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={svgBase} aria-hidden="true">
      <path
        d="M18 8 8 13l3 9 4-1.4V40h18V20.6L37 22l3-9-10-5-6 4Z"
        fill={C.inkSoft}
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Teddy({ size = 48 }: ArtProps) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={svgBase} aria-hidden="true">
      <circle cx="13" cy="14" r="6" fill={C.warmSoft} />
      <circle cx="35" cy="14" r="6" fill={C.warmSoft} />
      <circle cx="24" cy="26" r="16" fill={C.warmSoft} stroke="#fff" strokeWidth="2.4" />
      <ellipse cx="24" cy="31" rx="8" ry="6" fill={C.warmFaint} />
      <circle cx="18.5" cy="22" r="2.2" fill={C.ink} />
      <circle cx="29.5" cy="22" r="2.2" fill={C.ink} />
      <circle cx="24" cy="29" r="2.4" fill={C.ink} />
    </svg>
  );
}

function MoreStars({ size = 48 }: ArtProps) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={svgBase} aria-hidden="true">
      <path
        d="M24 8c.7 6.4 3 9.6 9.6 11-6.6 1.4-8.9 4.6-9.6 11-.7-6.4-3-9.6-9.6-11 6.6-1.4 8.9-4.6 9.6-11Z"
        fill={C.warm}
      />
      <path d="M11 30c.4 3.2 1.6 4.8 4.8 5.5-3.2.7-4.4 2.3-4.8 5.5-.4-3.2-1.6-4.8-4.8-5.5 3.2-.7 4.4-2.3 4.8-5.5Z" fill={C.accent} />
      <path d="M38 26c.3 2.5 1.2 3.7 3.7 4.3-2.5.6-3.4 1.8-3.7 4.3-.3-2.5-1.2-3.7-3.7-4.3 2.5-.6 3.4-1.8 3.7-4.3Z" fill={C.accentSoft} />
    </svg>
  );
}

const usageRules: Array<[string[], (props: ArtProps) => React.ReactElement]> = [
  [["lonchera", "lunch"], Lunchbox],
  [["termo", "botella"], Bottle],
  [["cuaderno", "libro", "carpeta"], Books],
  [["marcador", "resaltador", "plumon"], Markers],
  [["cubierto", "cuchara", "tenedor"], Cutlery],
  [["lapic", "lapiz", "color", "util", "escolar"], Pencils],
  [["mochila", "bolsa"], Backpack],
  [["ropa", "uniforme", "camiseta"], Shirt],
  [["juguete", "peluche"], Teddy],
];

/** Objeto ilustrado de la fila de usos, elegido por el título del elemento. */
export function UsageArt({ title, size = 48 }: { title: string; size?: number }) {
  const Art = matchArt(title, usageRules, MoreStars);
  return <Art size={size} />;
}

/* --- Escenas de la sección de diseños ---------------------------------- */

function Panda({ size = 96 }: ArtProps) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={svgBase} aria-hidden="true">
      <circle cx="27" cy="26" r="12" fill={C.ink} />
      <circle cx="73" cy="26" r="12" fill={C.ink} />
      <circle cx="50" cy="54" r="32" fill="#fff" stroke={C.inkFaint} strokeWidth="2" />
      <ellipse cx="37" cy="50" rx="9" ry="11" fill={C.ink} />
      <ellipse cx="63" cy="50" rx="9" ry="11" fill={C.ink} />
      <circle cx="37" cy="51" r="3.4" fill="#fff" />
      <circle cx="63" cy="51" r="3.4" fill="#fff" />
      <ellipse cx="50" cy="65" rx="5" ry="4" fill={C.ink} />
      <path d="M41 72c4.6 4.4 13.4 4.4 18 0" stroke={C.ink} strokeWidth="2.6" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function Rocket({ size = 96 }: ArtProps) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={svgBase} aria-hidden="true">
      <path d="M50 8c11 10 17 24 17 40v14H33V48c0-16 6-30 17-40Z" fill="#fff" stroke={C.accentFaint} strokeWidth="2.5" />
      <circle cx="50" cy="42" r="9" fill={C.inkSoft} stroke={C.accentFaint} strokeWidth="2.5" />
      <path d="M33 50 20 66l13 2Z" fill={C.accentSoft} />
      <path d="M67 50 80 66l-13 2Z" fill={C.accentSoft} />
      <path d="M42 62h16l-4 12h-8Z" fill={C.warm} />
      <path d="M46 74h8l-4 12Z" fill={C.accentSoft} />
      <circle cx="18" cy="24" r="3" fill={C.warm} />
      <circle cx="84" cy="34" r="2.4" fill={C.warm} />
      <circle cx="76" cy="16" r="2" fill="#fff" />
    </svg>
  );
}

function Soccer({ size = 96 }: ArtProps) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={svgBase} aria-hidden="true">
      <circle cx="50" cy="50" r="34" fill="#fff" stroke={C.inkFaint} strokeWidth="2.5" />
      <path d="M50 30 63 39l-5 15H42l-5-15Z" fill={C.ink} />
      <path d="M50 16v14M28 42l-11-4M72 42l11-4M38 68l-6 12M62 68l6 12" stroke={C.ink} strokeWidth="3" strokeLinecap="round" />
      <path d="M34 62h32l-6 14H40Z" fill={C.ink} opacity="0.12" />
    </svg>
  );
}

function Dino({ size = 96 }: ArtProps) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={svgBase} aria-hidden="true">
      <path d="M18 74c0-20 12-34 30-34s28 12 28 26c0 6-2 10-2 10H18Z" fill={C.inkFaint} stroke="#fff" strokeWidth="2.5" />
      <path d="M30 44l6-12 6 12 7-14 6 14" fill={C.inkSoft} />
      <path d="M76 66c8 2 12 6 12 10H68Z" fill={C.inkFaint} />
      <circle cx="62" cy="54" r="4" fill={C.ink} />
      <path d="M56 66c4 3 10 3 14 0" stroke={C.ink} strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <circle cx="34" cy="62" r="4" fill={C.accentSoft} opacity="0.8" />
    </svg>
  );
}

function Unicorn({ size = 96 }: ArtProps) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={svgBase} aria-hidden="true">
      <path d="M50 14 58 34H42Z" fill={C.warm} stroke="#fff" strokeWidth="2" />
      <path d="M26 40c0-10 10-14 24-14s24 4 24 14v18c0 12-10 22-24 22S26 70 26 58Z" fill="#fff" stroke={C.accentFaint} strokeWidth="2.5" />
      <path d="M26 40c-8 4-10 16-6 26 3-8 6-12 10-14Z" fill={C.accent} />
      <path d="M74 40c8 4 10 16 6 26-3-8-6-12-10-14Z" fill={C.accentSoft} />
      <circle cx="40" cy="54" r="3.6" fill={C.ink} />
      <circle cx="60" cy="54" r="3.6" fill={C.ink} />
      <ellipse cx="35" cy="62" rx="4" ry="2.6" fill={C.accentSoft} />
      <ellipse cx="65" cy="62" rx="4" ry="2.6" fill={C.accentSoft} />
      <path d="M44 66c3.6 3.4 8.4 3.4 12 0" stroke={C.ink} strokeWidth="2.4" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function PhotoKid({ size = 96 }: ArtProps) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={svgBase} aria-hidden="true">
      <rect x="14" y="18" width="72" height="64" rx="14" fill="#fff" stroke={C.accentFaint} strokeWidth="2.5" />
      <circle cx="50" cy="44" r="14" fill={C.warmFaint} />
      <path d="M36 42c0-10 6-14 14-14s14 4 14 14c-4-4-8-6-14-6s-10 2-14 6Z" fill={C.warmDeep} />
      <circle cx="45" cy="45" r="2.4" fill={C.ink} />
      <circle cx="55" cy="45" r="2.4" fill={C.ink} />
      <path d="M45 51c3 2.6 7 2.6 10 0" stroke={C.ink} strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M28 82c3-12 11-18 22-18s19 6 22 18Z" fill={C.inkSoft} />
    </svg>
  );
}

const designRules: Array<[string[], (props: ArtProps) => React.ReactElement]> = [
  [["animal", "panda", "gato", "leon"], Panda],
  [["espacio", "cohete", "galax", "astro", "aventura"], Rocket],
  [["deporte", "balon", "futbol", "pelota"], Soccer],
  [["dino", "dragon"], Dino],
  [["unicornio", "fantas", "magia", "princesa"], Unicorn],
  [["foto", "personalizada", "escolar", "retrato"], PhotoKid],
];

/** Escena ilustrada de la tarjeta de diseños, elegida por el nombre. */
export function DesignArt({ title, size = 96 }: { title: string; size?: number }) {
  const Art = matchArt(title, designRules, Panda);
  return <Art size={size} />;
}

/* --- Personajes de las muestras de etiqueta ---------------------------- */

function TinyCat({ size = 26 }: ArtProps) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} className={svgBase} aria-hidden="true">
      <path d="M8 12 6 4l8 4h4l8-4-2 8Z" fill={C.warmSoft} />
      <circle cx="16" cy="19" r="11" fill="#fff" stroke={C.accentFaint} strokeWidth="1.6" />
      <circle cx="12" cy="18" r="1.8" fill={C.ink} />
      <circle cx="20" cy="18" r="1.8" fill={C.ink} />
      <path d="M13 23c1.8 1.8 4.2 1.8 6 0" stroke={C.ink} strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <ellipse cx="9" cy="22" rx="2" ry="1.4" fill={C.accentSoft} />
      <ellipse cx="23" cy="22" rx="2" ry="1.4" fill={C.accentSoft} />
    </svg>
  );
}

/**
 * Cohete: la muestra de "Pequeña". Antes había un arcoíris, que no existe como
 * categoría en la sección de diseños; la muestra prometía un dibujo que luego
 * no se podía pedir.
 */
function TinyRocket({ size = 26 }: ArtProps) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} className={svgBase} aria-hidden="true">
      <path d="M16 2c4 4 6 9 6 15l-6 4-6-4c0-6 2-11 6-15Z" fill="#fff" stroke={C.accentSoft} strokeWidth="1.6" />
      <circle cx="16" cy="13" r="3.2" fill={C.inkSoft} stroke={C.ink} strokeWidth="1.4" />
      <path d="M10 17 5 22l5 1Z" fill={C.accent} />
      <path d="M22 17l5 5-5 1Z" fill={C.accent} />
      <path d="M13.5 22c1 3 4 3 5 0Z" fill={C.warm} />
    </svg>
  );
}

function TinyUnicorn({ size = 26 }: ArtProps) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} className={svgBase} aria-hidden="true">
      <path d="M16 3 20 12h-8Z" fill={C.warm} />
      <circle cx="16" cy="19" r="11" fill="#fff" stroke={C.accentFaint} strokeWidth="1.6" />
      <path d="M6 15c-2 4-2 8 0 11 1-4 2-6 4-7Z" fill={C.accent} />
      <path d="M26 15c2 4 2 8 0 11-1-4-2-6-4-7Z" fill={C.accentSoft} />
      <circle cx="12.5" cy="18" r="1.8" fill={C.ink} />
      <circle cx="19.5" cy="18" r="1.8" fill={C.ink} />
      <path d="M13.5 23c1.6 1.5 3.4 1.5 5 0" stroke={C.ink} strokeWidth="1.6" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/**
 * Cada muestra usa un personaje que existe como categoría real en la sección
 * de diseños: gato → Animales, cohete → Espacio, unicornio → Unicornios.
 */
const sizeRules: Array<[string[], (props: ArtProps) => React.ReactElement]> = [
  [["mini", "extra"], TinyCat],
  [["pequen"], TinyRocket],
  [["grande"], TinyUnicorn],
];

/** Personaje pequeño de la muestra de etiqueta, elegido por el nombre. */
export function SizeArt({
  title,
  index = 0,
  size = 26,
}: {
  title: string;
  index?: number;
  size?: number;
}) {
  const fallback = [TinyCat, TinyRocket, TinyUnicorn][index % 3];
  // "Extra pequeñas" contiene "pequen": el orden de las reglas resuelve el empate.
  const Art = matchArt(title, sizeRules, fallback);
  return <Art size={size} />;
}

/* --- Mascota y adornos de promociones ---------------------------------- */

/** Personaje rosa que acompaña al bloque de precio. */
export function Mascot({ className, size = 120 }: ArtProps) {
  return (
    <svg viewBox="0 0 100 110" width={size} height={size * 1.1} className={cn(svgBase, className)} aria-hidden="true">
      <path
        d="M50 8c22 0 34 16 34 38 0 10-2 18-2 26 0 6-4 10-10 10-4 0-6-2-8-4-4 3-9 4-14 4s-10-1-14-4c-2 2-4 4-8 4-6 0-10-4-10-10 0-8-2-16-2-26C16 24 28 8 50 8Z"
        fill={C.accent}
        stroke="#fff"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <circle cx="38" cy="46" r="4.5" fill={C.ink} />
      <circle cx="62" cy="46" r="4.5" fill={C.ink} />
      <path d="M40 58c5 5 15 5 20 0" stroke={C.ink} strokeWidth="3.2" strokeLinecap="round" fill="none" />
      <ellipse cx="30" cy="56" rx="5" ry="3.4" fill={C.accent} opacity="0.6" />
      <ellipse cx="70" cy="56" rx="5" ry="3.4" fill={C.accent} opacity="0.6" />
    </svg>
  );
}

/** Hojas de etiquetas apiladas, para la promoción de la 3.ª hoja. */
export function ArtSheets({ className, size = 64 }: ArtProps) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={cn(svgBase, className)} aria-hidden="true">
      <rect x="8" y="12" width="34" height="44" rx="6" fill="#fff" stroke={C.accentFaint} strokeWidth="2.4" transform="rotate(-8 25 34)" />
      <rect x="18" y="8" width="34" height="44" rx="6" fill="#fff" stroke={C.accentSoft} strokeWidth="2.4" transform="rotate(7 35 30)" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x="24" y={18 + i * 10} width="22" height="6" rx="3" fill={C.accentSoft} transform="rotate(7 35 30)" />
      ))}
    </svg>
  );
}

/** Regalo, para la promoción de la 4.ª hoja gratis. */
export function ArtGift({ className, size = 64 }: ArtProps) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={cn(svgBase, className)} aria-hidden="true">
      <rect x="10" y="26" width="44" height="28" rx="6" fill={C.accentSoft} stroke="#fff" strokeWidth="2.4" />
      <rect x="7" y="18" width="50" height="12" rx="5" fill={C.accent} stroke="#fff" strokeWidth="2.4" />
      <rect x="28" y="18" width="8" height="36" fill={C.warm} />
      <path d="M32 18c-6-2-12-4-12-8s6-4 8-1 4 6 4 9Zm0 0c6-2 12-4 12-8s-6-4-8-1-4 6-4 9Z" fill={C.warm} stroke="#fff" strokeWidth="2" />
    </svg>
  );
}
