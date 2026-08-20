# Cambios aplicados — textos, secciones, cards, CTAs y estructura

**Fecha:** 2026-08-20
**Alcance acordado:** solo copy, secciones, tarjetas, CTAs y botones. Las imágenes quedan como están (placeholders / íconos) hasta que se generen.
**Verificación:** `npx tsc --noEmit` ✓ · `npm run build` ✓ · `npm run check:contract` → "Contrato alineado" ✓

---

## 0. Hallazgo que condicionó todo el trabajo

El copy de la página **no vive en este repositorio**. Vive en el plugin de WordPress `proorg`:

```
C:\Users\Stuart\Local Sites\etiquetas-escolares\app\public\wp-content\mu-plugins\proorg\
├── schema.php   ← valores por defecto de TODOS los textos (fuente de verdad)
└── seed.php     ← contenido de FAQ, promos, pasos, tamaños
```

`src/lib/fallback.ts` es solo su **espejo**, y estaba desincronizado: tenía una versión más antigua del hero y cuatro tamaños, mientras WordPress servía otra cosa. Por eso la página mostraba `"Todo vuelve a casa cuando lleva su nombre"` aunque en el repo pusiera `"Etiquetas escolares"`.

**Consecuencia práctica:** todos los cambios de texto se aplicaron **en las dos capas**. Si solo se hubiera tocado el repo, la página no habría cambiado.

Se comprobó que la base de datos de WordPress **no tiene opciones guardadas**, así que los defaults de `schema.php` son los que se sirven. Si la clienta guarda el formulario del plugin, sus valores pasarán a mandar sobre estos defaults.

---

## 1. Estructura: el orden ahora replica el de Canva

| # | Antes | Ahora |
|---|---|---|
| 1 | Hero | Hero |
| 2 | Beneficios (5 tarjetas) | Beneficios (**3 tarjetas**) |
| 3 | Tamaños + usos | Tamaños + usos |
| 4 | Diseños (con tabs) | **Precios y promos** ⬆ |
| 5 | Costo (marcador) | Diseños (**sin tabs**) |
| 6 | Precios y promos | Cómo funciona |
| 7 | Cómo funciona | **Testimonios** ⬆ (antes no se renderizaba) |
| 8 | FAQ | Costo (marcador) |
| 9 | Daniella | FAQ |
| 10 | — | Daniella |

**Por qué:** en Canva el `$8 la hoja` aparece antes de cualquier argumento, porque es el dato que la clienta busca al entrar. Ahora el precio va inmediatamente después del tamaño: son la misma decisión, no dos.

Archivo: [src/app/page.tsx](src/app/page.tsx)

---

## 2. Hero: ahora nombra el producto

| | Antes | Ahora |
|---|---|---|
| Eyebrow | `REGRESO A CLASES 2026` | igual |
| H1 | `Todo vuelve a casa cuando lleva su nombre` | **`Etiquetas escolares personalizadas`** |
| Subtítulo | `Resisten agua, lavavajillas y el uso diario. Listas para loncheras...` | `Para que todo vuelva a casa con su nombre. Resisten agua, lavavajillas y el uso diario.` |
| Nota | *(vacía)* | **`Tres tamaños · desde $8 la hoja · 4ta hoja gratis`** |
| CTA | `Ver mi vista previa gratis` | **`Pedir por WhatsApp`** |

La promesa emocional no se perdió: bajó al subtítulo, que es su sitio. El H1 dice qué se vende, como el `ETIQUETAS / Útiles Escolares` de Canva.

**El precio y la promo ahora se ven sobre el pliegue**, también en móvil. Antes no aparecían hasta la sexta pantalla.

---

## 3. CTAs: de 12 nombres a 4

Todos los botones principales dicen ahora lo mismo que el botón del menú.

**Antes (12 etiquetas distintas, todas al mismo WhatsApp):**
`Ver mi vista previa gratis` · `Quiero etiquetar sus cosas` · `Aprovechar promoción` · `Comencemos su pedido` · `Comprar por WhatsApp` · `Pedir con su foto` · `Escríbenos por WhatsApp` · `Ver todos los diseños` · `Ver todas las preguntas` · `Ver el paso a paso` · `Visitar tienda en línea` · `Pedir por WhatsApp`

**Ahora (4):**

| Botón | Función |
|---|---|
| **`Pedir por WhatsApp`** | Acción principal. Menú, hero, promos, costo, cierre y Daniella. |
| `Ver diseños` | Único secundario del hero. |
| `Pedir tamaño {X}` | Arrastra el tamaño elegido al mensaje. No es la misma acción. |
| `Escríbanos por WhatsApp` | Solo la columna de ayuda del pie, bajo el horario de atención: es soporte, no un pedido. |

---

## 4. Tuteo → usted, en toda la página

La página mezclaba los dos tratos en la misma pantalla (`Ver mi vista previa gratis` junto a `Escríbanos por WhatsApp`). Se unificó a **usted**, que es el trato de Canva y el que ya usaban el pie y la sección de Daniella.

Cambios en las tres capas (`schema.php`, `seed.php`, `fallback.ts`). Ejemplos:

- `Elige el tamaño ideal` → `Elija el tamaño ideal`
- `¿Dónde las puedes usar?` → `¿Dónde las puede usar?`
- `Promos que te encantarán` → `Promos que le encantarán`
- `Llevas 4 hojas y pagas 3` → `Lleva 4 hojas y paga 3`
- `Te enviamos la vista previa...` → `Le enviamos la vista previa...`
- `Todo lo que necesitas saber` → `Todo lo que necesita saber`
- `¿Necesitas ayuda?` → `¿Necesita ayuda?`
- FAQ: `Limpia y seca... despega... presiona` → `Limpie y seque... despegue... presione`

---

## 5. Secciones y tarjetas

**Beneficios: 5 tarjetas → 3.** Eran siete bloques de información (5 tarjetas + 2 cifras) antes de que se viera un solo producto, y cuatro repetían lo que ya decía el subtítulo del hero.

```
Resisten agua y lavavajillas · Loncheras, termos y cubiertos.
Duran todo el año           · No se despegan ni se borran.
Seguras para niños          · Material certificado y no tóxico.
```

**Diseños: se quitaron los tabs.** Eran `Categorías` / `Muestras reales` / `Cómo personalizamos`, y las muestras reales ni siquiera aparecían. Ahora es scroll lineal como Canva: nada se descubre, todo se ve bajando.

**Se retiró el panel de personalización** de la sección de diseños: ocupaba **1.474 px en móvil** —el bloque más alto de la página— para explicar lo mismo que "Cómo funciona", y su botón `Ver el paso a paso` llevaba justo allí. Su contenido útil pasó al subtítulo de esa sección:

> *Cada etiqueta lleva fondo blanco y su nombre en letras oscuras, con el personaje favorito, el logo del colegio o una foto. Imprimimos solo cuando usted aprueba el diseño.*

**Testimonios: ahora se renderizan.** El componente existía pero `page.tsx` nunca lo importaba. Van antes de la sección de objeciones: primero que otras familias ya lo hicieron, después por qué no basta un marcador.

**Menú:** `Promociones` pasó a llamarse **`Precios`** y subió al tercer puesto, reflejando el orden nuevo.

**SEO:** la meta description decía "cuatro tamaños" y el catálogo real son tres. Corregido y se le añadió el precio.

---

## 6. Resultado medido (móvil, 390 px)

| Métrica | Canva | Antes | Ahora |
|---|---|---|---|
| Verbos de CTA distintos | 3 | 12 | **4** |
| Producto sobre el pliegue | Sí | **No** | **Sí** |
| Precio sobre el pliegue | No | No | **Sí** |
| Contenido oculto tras tabs | 0 | 2 paneles | **0** |
| Alto total | 5.602 px | 8.221 px | 8.682 px |

### Sobre el alto: dato honesto

**La página no se acortó, creció un 5,6 %.** No es un descuido, es el resultado de dos decisiones:

- sacar dos paneles de detrás de los tabs los hace visibles, y visible ocupa espacio;
- se añadió la sección de testimonios, que antes no se pintaba.

A cambio se eliminaron 1.474 px de contenido duplicado. **El contenido visible subió bastante más de lo que subió el alto.**

Lo que causaba el "se pierden" —no saber qué se vende, no ver el precio, doce botones distintos, contenido escondido— está corregido. La longitud es un problema distinto.

### Para bajar de verdad a la altura de Canva

Habría que **eliminar secciones enteras que Canva simplemente no tiene**. Estas cuatro suman 2.419 px:

| Sección | Alto | ¿Está en Canva? |
|---|---|---|
| Testimonios | 455 px | Sí, en el menú |
| Costo (marcador vs etiquetas) | 515 px | No |
| Preguntas frecuentes | 593 px | Sí, en el menú |
| Daniella + garantía | 856 px | No |
| *(Pie de página)* | *1.301 px* | *más corto en Canva* |

**Es una decisión de negocio, no técnica, y por eso no la tomé.** Las cuatro aportan valor real (prueba social, manejo de objeción, SEO y confianza). Dime cuáles se recortan y las ajusto.

---

## 7. Lo que NO se tocó

- **Imágenes**, según lo acordado. Los diseños siguen siendo íconos de contorno y la galería de muestras reales sigue apagada (`gallery.enabled`). Las 8 fotos de `public/etiquetas/` siguen sin mostrarse.
- **Los tres tamaños.** `seed.php:16` documenta que "Mediana" y "Grande" listaban los mismos usos, así que la reducción a tres fue deliberada. Canva ofrece cuatro. **Sigue pendiente tu confirmación de cuál es el catálogo correcto.**
- **Los testimonios son los de ejemplo** que ya traía el código (Mariana G., Carla P., Lucía F., Diego T.). Hay que reemplazarlos por reseñas reales antes de publicar — no se pueden inventar.
- El comparador de `Costo` sigue usando tabs en móvil (`Con marcador` / `Con etiquetas`). Es un comparador de dos columnas, no contenido escondido, y en escritorio se ven las dos a la vez.

## 8. Archivos modificados

**Repositorio**
- `src/app/page.tsx` — orden de secciones + render de testimonios
- `src/components/sections/showcase.tsx` — tabs fuera, scroll lineal
- `src/components/sections/trust-bar.tsx` — 5 → 3 tarjetas
- `src/lib/site-config.ts` — menú reordenado, "Precios"
- `src/lib/fallback.ts` — copy espejo sincronizado

**Plugin de WordPress** *(fuera del repositorio, con copia `.bak` al lado)*
- `mu-plugins/proorg/schema.php` — copy de todas las secciones
- `mu-plugins/proorg/seed.php` — copy de FAQ, promos y pasos

## 9. Pendiente

- [ ] Confirmar catálogo: ¿tres tamaños o cuatro?
- [ ] Testimonios reales (nombre, ciudad, frase)
- [ ] Decidir qué secciones se recortan para bajar el alto
- [ ] Fotos de etiquetas sobre objetos reales, y encender `gallery.enabled`
- [ ] `PillNav` y `design-love.tsx` quedaron sin uso: borrar o documentar

---

# Anexo — Paleta, testimonios y resincronización de WordPress

## 10. Paleta: WordPress ahora usa los colores de marca del código

**No se puede entrar al panel de WordPress** (pide credenciales y no manejo contraseñas), pero no hacía falta: los colores salían de los valores por defecto del plugin, y la base de datos no tiene ajustes guardados.

Había dos paletas peleándose:

| Campo | WordPress (pastel, la que se veía) | Código (`globals.css` + `fallback.ts`) |
|---|---|---|
| Texto y contornos | `#262626` gris carbón | **`#0b4a75`** azul marino |
| Morado | `#A78BFA` lavanda | **`#7b3fa6`** |
| Rosa / Rojo | `#FF9FE0` rosa chicle | **`#de2b22`** rojo de marca |
| Gris | `#CBC6C1` cálido | **`#c4cfd8`** frío |
| Verde | `#90EE8F` lima | **`#17803a`** |
| Celeste / Azul | `#8FD4EE` | **`#2e8fd0`** |

WordPress ganaba porque `src/app/layout.tsx:65` inyecta la paleta como variables CSS en `<html>`, pisando a `globals.css`.

**Se pasó el plugin a los colores de marca.** Efecto lateral bueno: son los mismos azul marino + rojo de la landing de Canva, así que la página ya no le cambia los colores a la clienta respecto de lo que sus compradoras conocen.

También se corrigieron las etiquetas del panel de WordPress, que mentían: el campo llamado "Rosa" contiene el rojo, y "Celeste" el azul. Ahora se llaman **"Rojo de marca"** y **"Azul"**, con una nota explicando que el nombre interno `pinkColor` se conserva por compatibilidad con GraphQL.

Verificado en el navegador: `--c-navy: #0b4a75` · `--c-red: #de2b22` · `--c-whatsapp: #17803a`, y los tokens derivados (`--c-ink`, `--c-highlight`) siguen correctamente.

## 11. Testimonios: sección oculta

Se comentó `<Testimonials />` en `src/app/page.tsx`, junto con su `import`. Los testimonios que traía el contenido por defecto son de ejemplo (Mariana G., Carla P., Lucía F., Diego T.) y publicar reseñas inventadas quema la credibilidad del resto de la página.

El comentario deja escrito dónde va la sección y qué hace falta: **descomentar dos líneas cuando haya reseñas reales.**

## 12. Resincronización de WordPress (seed v3 → v5)

El copy de promos, pasos y preguntas frecuentes **no está en los archivos: está en la base de datos**, sembrado una sola vez. Editar `seed.php` no bastaba.

Se usó el mecanismo que el propio plugin documenta: subir `PROORG_SEED_VERSION` hace que la landing vuelva sola al contenido del archivo en la siguiente carga.

- **v4** — promos, descripciones de los pasos y respuestas de FAQ pasan a usted.
- **v5** — también los títulos de los pasos: `Escribe → Escriba`, `Elige → Elija`, `Recibe → Reciba`, `Aplica → Aplique`.

Antes de ejecutarlo se comparó la base de datos contra `seed.php`: contenía **exactamente la salida del seed original**, sin ediciones de la clienta, así que no se perdió nada. Lo que la migración manda a la papelera es recuperable desde WordPress.

**Barrido final sobre la página real: cero tuteo.** Toda la landing habla de usted.

## 13. Estado final medido (móvil, 390 px)

| Sección | Alto |
|---|---|
| Hero | 796 px |
| Beneficios | 694 px |
| Tamaños | 833 px |
| Precios y promos | 639 px |
| Diseños | 1.143 px |
| Cómo funciona | 768 px |
| Costo | 515 px |
| Preguntas frecuentes | 593 px |
| Daniella | 856 px |
| Pie | 1.301 px |
| **Total** | **8.226 px** |

Palabras: 649 (antes de empezar: 664, con dos paneles escondidos tras tabs).

`npx tsc --noEmit` ✓ · `npm run check:contract` → "Contrato alineado" ✓ · sin errores de consola ni de servidor.

## 14. Pendiente (actualizado)

- [ ] Confirmar catálogo: ¿tres tamaños o cuatro? Canva vende cuatro; WordPress tiene tres.
- [ ] Reseñas reales para reactivar Testimonios (dos líneas en `page.tsx`).
- [ ] Decidir si se recortan secciones para bajar el alto.
- [ ] Fotos de etiquetas sobre objetos reales, y encender `gallery.enabled`.
- [ ] `PillNav` y `design-love.tsx` quedaron sin uso: borrar o documentar.

---

# Anexo 2 — Cuatro tamaños y fondo animado del hero

## 15. Vuelve el tamaño Mediano (seed v6)

Confirmado contra Canva: **son cuatro tamaños.** WordPress tenía tres.

| | Antes (WP) | Ahora |
|---|---|---|
| 1 | Mini · 60 etiquetas | **Extra pequeñas** · 60 etiquetas |
| 2 | Pequeña · 48 | Pequeña · 48 |
| 3 | — | **Medianas · 24 etiquetas · 2,5 × 5 cm** |
| 4 | Grande · 9 | Grande · 9 |

`seed.php` justificaba los tres porque "Mediana" y "Grande" listaban usos idénticos. El problema real no era el tamaño de más, sino la descripción duplicada, así que Mediana vuelve **con usos propios**: *estuches, vasos, cajas de colores y objetos de uso diario* — sin pisar a Grande (cuadernos, libros, termos, loncheras, mochilas).

También se sincronizaron los acentos de las fichas, que seguían en los pastel antiguos (`#FF6B6B`, `#F5A524`, `#8B7CF6`) → paleta de marca (`#de2b22`, `#f0913c`, `#2e8fd0`, `#7b3fa6`).

Copy actualizado en las dos capas: la nota del hero y la meta description dicen ahora **"Cuatro tamaños"**.

Nota técnica: WordPress regeneró los slugs (`mini` → `extra-pequenas`, `mediana` → `medianas`). Se sincronizó el espejo. El campo `sizeSlug` de los "usos" apuntaba al slug viejo, pero **está declarado en `types.ts` y ningún componente lo lee**, así que no rompe nada — es un campo muerto que conviene borrar algún día.

## 16. Fondo animado del hero — `InfiniteGrid`

El componente de Framer es de pago y su código es propietario, así que **no se copió**: se implementó desde cero en [src/components/ui/infinite-grid.tsx](src/components/ui/infinite-grid.tsx) siguiendo la especificación, con `framer-motion`, que ya era dependencia del proyecto.

**Funciones implementadas**

- Dos capas de rejilla: base tenue + capa marcada revelada por el cursor
- Foco radial que sigue al puntero, radio configurable
- 8 direcciones, velocidad X e Y independientes (el signo invierte el eje)
- Bucle infinito sin costura por módulo de 40 px
- Tres manchas de gradiente con color propio, activables
- Colores de fondo y de línea, opacidad de cada capa por separado
- Rejilla en SVG embebido: nítida a cualquier escala
- `useAnimationFrame` escribiendo directo sobre el nodo

**Decisiones propias, no en la especificación original**

1. **El puntero se escucha en el elemento padre.** La rejilla es `pointer-events-none` para no robar clics, y un elemento así tampoco recibe eventos. La primera versión no revelaba nada por eso. Escuchando en el padre funciona el foco **y** el botón de WhatsApp sigue siendo clicable (verificado con `elementFromPoint`).
2. **Un solo escrito por fotograma** en el manejador de `pointermove`, que se dispara muchas más veces de las que la pantalla puede pintar.
3. **Respeta `prefers-reduced-motion`**: la capa de revelado no se monta y la animación se detiene.
4. **En pantallas táctiles no se registran los escuchadores**: sin puntero que seguir, el foco solo gastaría batería.
5. **Valores por defecto contenidos** (`gridOpacity` 0.07, `revealOpacity` 0.28): es un fondo, y el hero ya tiene que competir con la foto de producto.

**Verificado en navegador:** la rejilla anima (`backgroundPosition` avanza entre fotogramas), el foco aparece al mover el cursor (`opacity 0 → 0.28` con máscara radial siguiendo la posición), el CTA sigue recibiendo el clic, y **cero errores de página**.

`npx tsc --noEmit` ✓ · `npm run build` ✓ · `npm run check:contract` ✓

---

# Anexo 3 — Ajustes del fondo animado

## 17. El fondo ahora pasa por detrás del menú

El menú ya era transparente: la banda blanca era el fondo del `body`, porque el menú es un elemento *sticky* que **ocupa su propio espacio en el flujo**, encima del hero. La rejilla empezaba donde empezaba el hero, es decir 88 px más abajo.

**Solución:** el hero sube esa banda con un margen negativo y devuelve la misma distancia como relleno del contenido. El fondo y los degradados llegan hasta `y = 0`; la píldora del menú flota encima con su `z-50`.

Se añadió `--header-band: 88px` en `globals.css`. No se reutilizó `--header-h` porque son cosas distintas: esa vale 80 px y sirve como margen al saltar por un ancla. Los 88 px son `py-3` (24) + la píldora (64), medidos en el navegador.

Verificado: `gridTop = 0`, `headerBottom = 88`, el titular arranca en 194 px — sin solaparse — y el menú sigue *sticky* en toda la página.

## 18. Degradados más notorios

- Opacidad base **0.16 → 0.40**, y expuesta como prop `gradientOpacity`.
- Manchas más grandes: 520 → 680 px, 260 → 380 px, 480 → 620 px.
- El degradado se apaga al **85 %** en vez del 70 %: la mancha se ve más grande sin subir la opacidad, que es lo que ensucia el texto.

### Ajuste para móvil

A tamaño completo, en una pantalla de 390 px un blob de 680 px deja de ser un acento y pasa a ser un fondo de color: el titular rojo quedaba sobre su propio color aguado. En pantallas menores de `sm` las manchas van **más pequeñas y a poco más de la mitad de intensidad** (0.22 / 0.18 / 0.20 frente a 0.40 / 0.34 / 0.36 en escritorio).

`npx tsc --noEmit` ✓ · `npm run build` ✓ · `npm run check:contract` ✓ · sin errores de página
