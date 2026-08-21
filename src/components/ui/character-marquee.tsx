"use client";

import Image from "next/image";

/**
 * Franja de personajes: círculo pastel detrás, la cabeza sobresale por arriba
 * y el cuerpo se recorta abajo contra el borde del círculo. Debajo, el nombre.
 *
 * El bucle es CSS puro (dos copias de la lista desplazándose -50%) y no un
 * carrusel con estado: la franja es decorativa, no navegable, y así no cuesta
 * hidratación ni se rompe si el cliente añade personajes desde WordPress.
 */
type Character = { file: string; name: string; w: number; h: number };

const characters: Character[] = [
  { w: 504, h: 481, file: "toystory.png", name: "Toy Story" },
  { w: 564, h: 564, file: "spiderman.png", name: "Spiderman" },
  { w: 515, h: 515, file: "mario.png", name: "Mario Bros" },
  { w: 626, h: 626, file: "roblox.png", name: "Roblox" },
  { w: 542, h: 494, file: "stitch.png", name: "Stitch" },
  { w: 779, h: 755, file: "minecraft.png", name: "Minecraft" },
  { w: 674, h: 674, file: "gabby.png", name: "Gabby" },
  { w: 472, h: 472, file: "jessie.png", name: "Jessie" },
  { w: 180, h: 168, file: "kuromi.png", name: "Kuromi" },
  { w: 736, h: 726, file: "princesas.png", name: "Princesas" },
  { w: 423, h: 423, file: "kpop-demon-hunters.png", name: "KPop Demon Hunters" },
];

const tints = [
  "var(--c-tint-warm)",
  "var(--c-tint-highlight)",
  "var(--c-tint-purple)",
  "var(--c-tint-positive)",
  "var(--c-tint-ink)",
  "color-mix(in srgb, var(--c-green) 16%, #ffffff)",
] as const;

function CharacterItem({ item, index }: { item: Character; index: number }) {
  return (
    <figure className="character-item">
      <span className="character-disc" style={{ background: tints[index % tints.length] }}>
        <span className="character-clip">
          <Image
            src={`/personajes/${item.file}`}
            alt={`Etiquetas con diseño de ${item.name}`}
            width={item.w}
            height={item.h}
            className="character-img"
          />
        </span>
      </span>
      <figcaption className="character-name">{item.name}</figcaption>
    </figure>
  );
}

export function CharacterMarquee() {
  return (
    <div className="character-marquee-mask" aria-label="Personajes disponibles" role="group">
      <div className="character-marquee">
        {[0, 1].map((copy) => (
          <div className="character-track" key={copy} aria-hidden={copy === 1}>
            {characters.map((item, index) => (
              <CharacterItem key={`${copy}-${item.file}`} item={item} index={index} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
