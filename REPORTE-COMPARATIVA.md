# Comparativa: Canva actual vs. landing nueva

**Fecha:** 2026-08-20
**Método:** Playwright (Chromium), captura desktop 1440×900 y móvil 390×844, extracción de DOM y texto.

- **A — Canva (la que "funciona bien"):** https://etiquetasproorganizer.my.canva.site/etiquetas-tiles-escolares
- **B — Nueva (Next.js):** http://localhost:3000

---

## 1. Datos medidos

| Métrica | A · Canva | B · Nueva | Lectura |
|---|---|---|---|
| Palabras de texto | 293 | 664 | B tiene **2,3× más texto** |
| Imágenes en la página | 66 | **4** | A tiene **16× más producto visible** |
| Alto desktop | 4.639 px | 6.416 px | B es **38 % más larga** |
| Alto móvil | 5.602 px | 8.221 px | B es **47 % más larga** |
| Encabezados (h1–h4) | 0 | 41 | B mejor para SEO, peor para escaneo |
| Elementos clicables | 14 | 44 | B **3× más decisiones** |
| Verbos de CTA distintos | 3 | 12 | ver §2.3 |
| Secciones | 6 | 9 | |
| Tamaños ofrecidos | **4** | **3** | discrepancia de catálogo — ver §3 |

> La queja "hay mucha info y se pierden" está respaldada por los números: **más texto, más largo, más botones y 16 veces menos producto a la vista.**

---

## 2. Causas de la confusión (ordenadas por impacto)

### 2.1 El hero no dice qué se vende — CRÍTICO

**A (Canva):** el titular es literal y enorme: `ETIQUETAS / Útiles Escolares`, seguido de `Cuatro tamaños para cada necesidad` y, de inmediato, fotos reales de las hojas de etiquetas sobre lápices, marcadores, cuadernos y termos. En 2 segundos la mamá sabe exactamente qué está comprando.

**B (Nueva):** el titular es `Todo vuelve a casa cuando lleva su nombre`, con el eyebrow `REGRESO A CLASES 2026`.

- La palabra **"etiquetas" no aparece en el H1, ni en el eyebrow, ni en la subheadline.**
- La subheadline (`Resisten agua, lavavajillas y el uso diario…`) describe atributos de un producto que todavía no se ha nombrado.
- Es una frase de marca, no una promesa de venta. Funciona como cierre (de hecho se repite en el footer), no como apertura.

**En móvil el problema se agrava:** el usuario ve titular + subtítulo + 2 botones + 2 líneas de microcopy y **cero fotos del producto**. La imagen aparece recién a ~640 px de scroll. En Canva, la primera foto de etiquetas reales está sobre el pliegue.

### 2.2 La página promete diseños y no muestra ninguno — CRÍTICO

La sección `Diseños que les encantan` renderiza **íconos de contorno** (un panda, un cohete, una estrella, un dinosaurio), no etiquetas.

Verificado en el DOM: **0 imágenes dentro de la sección `#disenos`. 4 imágenes en toda la página.**

Causa técnica, en tres puntos:

1. `src/lib/fallback.ts:337-350` — 6 de los 7 items de `designs` tienen `image: null`, por lo que caen al ícono por defecto.
2. `src/components/sections/showcase.tsx:50` — el tab **"Muestras reales"** solo se pinta si `settings.gallery.enabled && gallery.length > 0`. En el render actual **ese tab no aparece**: WordPress está devolviendo `gallery.enabled: false` (`src/lib/wp.ts:58`).
3. Existen **8 fotos reales** de etiquetas en `public/etiquetas/` (buzz, dinosaurio, forky, señor patata, etc.) que **no se muestran en ninguna parte de la página**.

Resultado: el argumento más vendedor del negocio —"mira qué lindas quedan"— está apagado. Canva dedica ~30 imágenes a esto.

### 2.3 Doce nombres distintos para la misma acción — ALTO

Todos los CTAs de ambas páginas terminan en el mismo WhatsApp. La diferencia es cuántas formas de decirlo hay.

**A (Canva) — 3 etiquetas, repetidas:**
`COMPRAR POR WHATSAPP` · `VISITAR TIENDA ON LINE` · `QUIERO VER MÁS DISEÑOS`

**B (Nueva) — 12 etiquetas distintas:**
`Pedir por WhatsApp` · `Ver mi vista previa gratis` · `Ver diseños` · `Elegir este tamaño` · `Pedir tamaño Mini/Pequeña/Grande` · `Ver todos los diseños` · `Quiero etiquetar sus cosas` · `Aprovechar promoción` · `Ver todas las preguntas` · `Comencemos su pedido` · `Visitar tienda en línea` · `Escríbenos por WhatsApp`

Cada etiqueta nueva obliga a evaluar: *"¿esto es lo mismo que el botón de arriba o es otra cosa?"* Doce veces. Eso **es** la sensación de perderse.

Además el hero mezcla registros: `Ver mi vista previa gratis` (tú) junto a `Comencemos su pedido` y `Escríbanos por WhatsApp` (usted) más abajo. Canva usa **usted** de forma consistente.

### 2.4 Los tabs esconden contenido — ALTO

`Diseños` usa tabs (`Categorías` / `Cómo personalizamos`). Contenido detrás de un clic = contenido que la mayoría no ve. Canva es **scroll lineal puro**: todo está visible, nada requiere descubrirse. En una landing de compra impulsiva, los tabs cuestan más de lo que ahorran.

### 2.5 El precio no domina — MEDIO

**A:** `$8 / Cada Hoja` en un número gigante sobre bloque azul, con `50%` y `GRATIS` en rojo del mismo tamaño. Se lee de un vistazo desde lejos.

**B:** el `$8` está en una card negra pequeña; `50 % OFF` y `GRATIS` pesan visualmente más que el precio base. Se entiende el descuento antes que el precio, lo que obliga a releer.

### 2.6 Cero prueba social visible — MEDIO

**A:** tiene `Testimonios` en el menú.
**B:** existe `src/components/sections/testimonials.tsx` pero **nunca se importa ni se renderiza** en `src/app/page.tsx`. La única prueba son dos cifras (`+2.500 familias`, `+6 años`) sin nombre, cara ni frase de nadie.

### 2.7 Densidad de la franja de beneficios — MEDIO

Justo después del hero, B presenta 5 tarjetas (`Resistentes al agua`, `Aguantan lavavajillas`, `Ultra duraderas`, `Seguras y no tóxicas`, `Fáciles de aplicar`) + 2 estadísticas = **7 unidades de información antes de haber mostrado el producto**. Cuatro de las cinco ya estaban dichas en la subheadline del hero. Es repetición que ocupa una pantalla completa.

---

## 3. Discrepancia de catálogo (requiere tu confirmación)

| | Canva | Nueva |
|---|---|---|
| Tamaños | **4**: Extra pequeñas, Pequeñas, **Medianas**, Grandes | **3**: Mini, Pequeña, Grande |

La nueva página **no ofrece el tamaño Mediano** y renombra los otros. Si la clienta sigue vendiendo 4 tamaños, esto es una pérdida de venta directa y una contradicción con lo que ella comunica por WhatsApp. **No lo cambio sin tu confirmación de cuál es el catálogo correcto.**

---

## 4. Lo que la página nueva hace mejor (no tirar)

- **SEO y estructura:** 41 encabezados semánticos + JSON-LD (Product, LocalBusiness, FAQPage). Canva tiene **0 encabezados** — es texto sobre imágenes, invisible para Google.
- **FAQ real** con 6 preguntas en acordeón.
- **Comparativa `Con marcador permanente` vs `Con etiquetas Pro Organizer`** — excelente manejo de objeción. No existe en Canva. Conservar.
- **Sección de Daniella + garantía de reimpresión** — confianza real, con firma humana. No existe en Canva.
- **Microcopy de reducción de fricción:** *"Te enviamos la vista previa antes de imprimir — sin compromiso"* y *"Entrega en 3 a 5 días"*. Mucho mejor que Canva. Conservar.
- **Rendimiento y control:** contenido editable desde WordPress, no atado a Canva.

**Conclusión:** el problema no es la página nueva. Es que **puso la marca delante del producto**. La estructura es superior; le falta mostrar lo que vende.

---

## 5. Plan de corrección

### Prioridad 1 — Arreglar el hero (mayor impacto, menor esfuerzo)

Nombrar el producto en la primera línea y meter producto real sobre el pliegue.

- **Eyebrow:** `REGRESO A CLASES 2026` → **`ETIQUETAS ESCOLARES PERSONALIZADAS · ECUADOR`**
- **H1:** `Etiquetas para que todo vuelva a casa` *(mantiene la emoción, nombra el producto)*
- **Subheadline:** `Resisten agua, lavavajillas y el uso diario. Para loncheras, termos, cuadernos y uniformes. Desde $8 la hoja.` *(el precio sube al hero)*
- **CTA único:** `Pedir por WhatsApp` — mismo texto que la barra de navegación.
- **Móvil:** subir la foto del producto por encima de los botones, o reducir el titular a 2 líneas para que la foto entre en el pliegue.

**Variantes para probar (A/B):**
1. `Etiquetas escolares que resisten todo el año`
2. `Ponle su nombre a todo. En 3 días lo tienes en casa.`
3. `Etiquetas personalizadas desde $8 la hoja`

### Prioridad 2 — Encender las fotos

1. Poner `gallery.enabled = true` en WordPress → reaparece el tab `Muestras reales`.
2. Asignar `image` a los 6 items de `designs` en `src/lib/fallback.ts` usando `public/etiquetas/`.
3. Mejor aún: **eliminar los tabs** y mostrar una grilla única de fotos reales, como Canva.
4. Fotografiar las hojas sobre objetos reales (lápices, termo, cuaderno) en vez de mostrar la etiqueta aislada. Es exactamente lo que hace que Canva convierta.
5. Reemplazar los íconos de `¿Dónde las puedes usar?` por fotos.

### Prioridad 3 — Unificar CTAs

Un solo verbo, repetido: **`Pedir por WhatsApp`** en todos los botones primarios. Secundarios permitidos, máximo dos: `Ver diseños` y `Visitar tienda en línea`. Elegir **usted** o **tú** y aplicarlo a toda la página.

### Prioridad 4 — Acortar

- Reducir la franja de beneficios de 5 tarjetas a 3 (`Resiste agua y lavavajillas`, `No se despega`, `Segura para niños`) y fusionarla con las estadísticas en una sola fila.
- Objetivo de alto en móvil: **de 8.221 px a ~6.000 px**.

### Prioridad 5 — Prueba social y precio

- Renderizar `<Testimonials />` en `src/app/page.tsx` con 3 testimonios con nombre, ciudad y resultado concreto. *(Requiere que la clienta aporte testimonios reales — no se deben inventar.)*
- Agrandar el `$8` para que domine sobre `50 % OFF` y `GRATIS`.

---

## 6. Lo que necesito de ti / la clienta

1. **Catálogo de tamaños:** ¿3 o 4? ¿Se descontinuó el mediano?
2. **Testimonios reales:** nombre, ciudad y frase. No se pueden fabricar.
3. **Fotos de producto:** hojas de etiquetas aplicadas sobre objetos reales. Es el único insumo que no puedo generar y es el de mayor impacto.
4. **Tratamiento:** ¿tú o usted? Canva usa usted.

---

## Checklist post-implementación

- [ ] Revisión ortográfica del copy nuevo
- [ ] Todas las URLs de destino resuelven (WhatsApp, tienda Kyte, redes)
- [ ] Vista previa móvil a 375 px con la foto del producto sobre el pliegue
- [ ] Un solo verbo de CTA primario en toda la página
- [ ] Meta title y description reflejan el H1 nuevo
- [ ] JSON-LD sigue validando tras los cambios de copy
