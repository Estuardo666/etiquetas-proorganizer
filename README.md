# Pro Organizer — Etiquetas escolares (MVP)

Landing page headless: **Next.js 16 + Tailwind 4 + Framer Motion** en el frontend y
**WordPress + WPGraphQL** como CMS. Todo el contenido (textos, botones, imágenes y
**colores de cada sección**) se edita desde WordPress.

## Arrancar

```bash
npm run dev
```

- Frontend: http://localhost:3000
- WordPress: https://etiquetas-escolares.local
- Guía de edición: https://etiquetas-escolares.local/wp-admin/admin.php?page=proorg-guia
- Textos y ajustes: https://etiquetas-escolares.local/wp-admin/admin.php?page=proorg
- GraphQL: https://etiquetas-escolares.local/graphql
- Adminer (BD): http://localhost:10036/?username=root&db=local

Si WordPress no responde, la landing sigue renderizando con los contenidos por
defecto de `src/lib/fallback.ts` (mismos valores que el plugin).

## Dirección visual (v3 — kids premium)

- Tipografías: **Fredoka** (títulos) + **Nunito Sans** (cuerpo y UI).
- Paleta pastel con azul marino `#18336B`, lavanda `#8B7CF6`, coral `#FF6B6B`,
  fondo cálido `#FFFCF8` y acentos cielo / menta / rosa / amarillo.
  Los tokens fijos (`--c-lavender`, `--c-sky`, `--c-mint`, …) viven en
  `globals.css`; los editables desde WordPress se inyectan en `layout.tsx`.
- Adornos (estrellas, nubes, sparkles, doodles, líneas punteadas, halos) son SVG
  propios en `src/components/ui/decor.tsx`. `DecorativeBackground` los coloca por
  sección con parallax máximo de 12 px, `aria-hidden` y `pointer-events-none`.
- Animaciones con Framer Motion (`src/lib/motion.ts`), siempre `whileInView` con
  `once: true` y respetando `prefers-reduced-motion` (`MotionConfig reducedMotion="user"`).

### Convenciones del segundo check (`DISEÑO SEGUNDO.png`)

- **Título del hero**: el campo *Título destacado* admite tramos separados por `|`.
  Se pintan en coral, azul marino y lavanda, en ese orden
  (`a casa|cuando|lleva su nombre`).
- **Viñetas del hero**: ya no se listan junto al precio; se muestran como la
  franja blanca de confianza al pie del hero (4 items).
- **Promociones**: `Título` = etiqueta de esquina, `Texto previo` = línea de
  apoyo, `Destacado` = cifra grande, `Texto posterior` = línea superior.
- **Galería**: desactivada por defecto (el diseño aprobado no la incluye). Se
  reactiva desde *Ajustes → Galería*.
- Las columnas *Productos* y *Ayuda* del footer se editan desde WordPress
  (*Ajustes → Pie de página*), con el formato `Etiqueta|ancla`.
- **Barra superior y "Compra online" del footer**: eliminadas, y con ellas sus
  campos del admin. Repetían lo que ya dicen la franja de confianza del hero y
  el pie, y el enlace apuntaba a una tienda que no existe. La dirección se movió
  bajo el lema de marca.

### Orden de las secciones

`Hero → Confianza + cifras → Tamaños → Diseños → Galería → El costo de no
etiquetar → Promos → Cómo funciona → Testimonios → FAQ → CTA final → Footer`

Sigue la decisión de compra: utilidad antes que deseo (por eso Tamaños va
delante de Diseños, igual que el paso 1 → 2 de "Cómo funciona"), y el ahorro
antes que la operativa. **Si cambias el orden en `page.tsx`, actualiza
`header.navItems`** en `fallback.ts` y en `proorg/schema.php`: el menú no se
genera solo.

### Quién manda sobre qué

| | Fuente de verdad | Dónde se cambia |
| --- | --- | --- |
| Paleta, degradados, fondos de sección, radios | **Código** | `src/app/globals.css` |
| **Todo** el texto, los enlaces, las imágenes y los listados | **WordPress** | Admin de Pro Organizer |
| Valores por defecto de esos textos | Código y plugin (espejo) | `src/lib/fallback.ts` y `proorg/schema.php` |
| Qué botones arrastran el tamaño/diseño elegido | **Código** | `src/lib/site-config.ts` |

No queda copy en el código. Cifras de prueba social, mensajes precargados de
WhatsApp, aviso de temporada, plazo de entrega y la sección "El costo de no
etiquetar" son campos del plugin (pestañas *Cifras de confianza*, *Mensajes de
WhatsApp*, *Cierre de la página* y *Sección El costo de no etiquetar*).
`site-config.ts` solo conserva comportamiento: el mapa sección → campo del CMS
y qué CTA arrastran la selección del usuario.

**Regla:** el admin solo enseña campos que la landing pinta. Por eso ya no
existen la pestaña de colores, la barra informativa ni los `bgColor` de cada
sección: la paleta es parte del sistema de diseño y no debe poder romperse desde
el CMS. Un campo que se edita y no cambia nada es peor que no tenerlo. Si algún
día se quiere un tema de temporada, se cambia en `globals.css`.

Además, un campo vacío en WordPress **no borra** el texto: `wp.ts` combina la
respuesta sobre los valores por defecto, así que la landing siempre se ve
completa.

### Volver al contenido del diseño aprobado

En *Pro Organizer → Ajustes del sitio*, al final de la página, hay un botón
**Restaurar contenido del diseño**: olvida los ajustes guardados, envía los
listados actuales a la papelera (recuperables) y vuelve a sembrar tamaños,
usos, diseños, pasos, promociones, testimonios y preguntas con los textos del
diseño. Es la forma de alinear WordPress con el diseño sin copiar nada a mano.

## Backend (WordPress)

Todo vive en `C:\Users\Stuart\Local Sites\etiquetas-escolares\app\public\wp-content\mu-plugins`
(carpeta *must-use*: se activa sola, no hace falta activar plugins):

| Archivo | Qué hace |
| --- | --- |
| `loader.php` | Carga WPGraphQL y el plugin propio |
| `wp-graphql/` | Plugin WPGraphQL |
| `proorg/schema.php` | Esquema de **Textos y ajustes**: grupos, campos, valores por defecto y textos de ayuda |
| `proorg/proorg.php` | CPTs, metaboxes, guía de edición, página de opciones y tipos GraphQL |
| `proorg/seed.php` | Contenido inicial y migración de ajustes al cambiar el esquema |

### Qué se puede editar

El menú *Pro Organizer* abre en **Cómo editar**: una guía en lenguaje llano
(`proorg_render_guide_page`) con los tres formatos de campo, los anclas válidos,
una tabla de "dónde se cambia cada cosa" y qué NO se edita desde el CMS. Es la
primera pantalla que ve el cliente.

**Textos y ajustes** (*Pro Organizer → Textos y ajustes*), una pestaña por
sección y en el mismo orden en que se recorre la página: marca y contacto,
mensajes de WhatsApp, menú, primera pantalla, franja de beneficios, cifras de
confianza, tamaños, usos, diseños, el costo de no etiquetar, cómo funciona,
precio y promociones, galería, testimonios, preguntas frecuentes, cierre, pie de
página, botón flotante y SEO.

Cada campo lleva **texto de ayuda debajo** (4.º elemento de la tupla en
`schema.php`) y cada pestaña una introducción (`intro`). Al añadir un campo,
escribir la ayuda no es opcional: dice qué formato espera y dónde se verá.

**Listados** (equivalen a repeaters, cada elemento es una entrada):
Tamaños, Usos, Diseños, Pasos, Promociones, Galería, Testimonios y Preguntas
frecuentes. El orden se controla con el campo *Orden* (Atributos de página).

### Volver a sembrar el contenido inicial

Borra la opción `proorg_seeded` en la tabla `wp_options` (Adminer) y recarga el sitio.

### Al cambiar el esquema de ajustes

Un ajuste guardado gana sobre el valor por defecto del plugin, incluso si nadie
lo escribió a mano: si cambias un `default` en `schema.php`, la landing puede
seguir mostrando el texto viejo para siempre. Por eso `seed.php` tiene
`proorg_migrate_settings()`, que se ejecuta una vez al subir
`PROORG_SETTINGS_VERSION`: borra los campos que ya no existen en el esquema y los
que siguen guardados con el valor por defecto anterior (`proorg_stale_defaults`).
Lo que el cliente sí escribió no se toca.

## Frontend

```
src/
  app/            layout (metadatos desde WP), página, /api/revalidate
  components/
    sections/     Header, Hero, TrustBar (+ StatsRow), Sizes, Usage, Designs,
                  Cost, Pricing, Gallery, Testimonials, Faq, FinalCta,
                  Footer, FloatingCta
    ui/           Button, Media, SectionHeader, Reveal, Icon, OrderNote
    order-provider.tsx  guarda el tamaño elegido y arma el enlace de WhatsApp
                        con los mensajes que vienen de WordPress
  lib/            wp.ts (consulta GraphQL), fallback.ts, types.ts, motion.ts,
                  utils.ts, site-config.ts (solo comportamiento, ya no copy)
```

- El tamaño seleccionado en la sección *Tamaños* se inyecta en el mensaje
  prellenado de todos los CTA de WhatsApp.
- Caché ISR de 60 s con tag `site-content`. Para refrescar al instante:
  `POST /api/revalidate?secret=...` (define `REVALIDATE_SECRET` en `.env.local`).

## Verificar el contrato

```bash
npm run check:contract
```

Compara el esquema real de WordPress con la consulta de `src/lib/wp.ts`, `types.ts`
y `fallback.ts`, ejecuta la consulta completa y avisa de listados vacíos.
Necesita introspección pública, que el plugin activa solo cuando
`WP_ENVIRONMENT_TYPE` es `local`.

## Refresco automático de caché

Al guardar contenido o ajustes, WordPress llama al endpoint de revalidación de Next
(`proorg/revalidate.php`). Por defecto apunta a `http://localhost:3000/api/revalidate`.
Para producción, en `wp-config.php`:

```php
define( 'PROORG_REVALIDATE_URL', 'https://tu-dominio.com/api/revalidate' );
define( 'PROORG_REVALIDATE_SECRET', 'un-secreto-largo' );
```

y el mismo valor como `REVALIDATE_SECRET` en el `.env` del frontend.

## Pendiente después del MVP

1. **Imágenes**: todas las tarjetas muestran un marcador de posición hasta que se
   suban las fotos reales desde WordPress (hero, tamaños, usos, diseños, galería,
   CTA final, logo y avatares de testimonios).
2. Sustituir los testimonios de ejemplo por reseñas reales.
3. Páginas legales (privacidad y términos) — hoy los enlaces apuntan a `#`.
4. Revisar textos definitivos y ejecutar Lighthouse con las imágenes reales.
