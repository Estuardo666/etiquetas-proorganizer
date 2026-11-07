# Reestructura del sitio Pro Organizer: de Canva a sitio completo

**Versión:** 2 (2026-11-07)
**Analizado:** las 8 páginas del sitemap de https://etiquetasproorganizer.my.canva.site/, `proorganizer.com.ec`, la tienda Kyte y el contenido actual del proyecto.
**Alcance decidido:** solo productos. El diseño aprobado se extiende, no se rediseña.

**Lectura de diseño:** micrositio comercial para familias ecuatorianas que compran desde el móvil, con lenguaje cálido y confiable, conservando el sistema aprobado.

Los textos marcados **[confirmar]** dependen de un dato de la clienta. No deben publicarse sin validarlos.

---

## 1. Conclusión

Sobra información repetida y falta recorrido. El sitio nuevo debe hacer una sola cosa: **llevar a una familia desde "se le pierden las cosas" hasta un WhatsApp con el pedido casi armado.**

| # | Decisión | Qué resuelve |
|---|---|---|
| 1 | La home reparte: los tres productos a la vista | 8.207 px que repiten todo |
| 2 | Una plantilla de producto a partir de la landing aprobada | Páginas cortas y desiguales |
| 3 | Menú con los productos visibles, sin hamburguesa en escritorio | Oferta escondida |
| 4 | **Nuevo: Arme su pedido.** Producto, tamaño, diseño y nombre, que llegan escritos a WhatsApp | Chats que empiezan en "información por favor" |
| 5 | **Nuevo: calendario de dos temporadas,** Costa y Sierra | Marketing concentrado en un solo pico |

### Cambios frente a la versión 1

- **Menú:** descarto "Productos ▾". Con tres productos, un desplegable esconde lo más importante detrás de un clic.
- **Hero de la home:** las cifras salen del hero y pasan justo debajo, para que producto y acción quepan en la primera pantalla.
- **Tarjetas:** no tres iguales. Útiles lleva más peso, si las ventas lo confirman.
- **Costo de envío:** ya no es un pendiente. Está en el contenido aprobado.
- **Correcciones nuevas:** redes mal enlazadas y afirmaciones sin respaldo (sección 3).

---

## 2. Qué hay hoy

Alturas con viewport de 1024 px. Incluyen un bloque final de 1.301 px que se repite en las subpáginas.

| Página | Alto | Tiene | Le falta |
|---|---|---|---|
| Inicio | 8.207 px | De todo un poco | Foco |
| Útiles | ~5.880 px | 4 tamaños, usos, precio, promos, video | Resuelta con la landing aprobada |
| Ropa | ~4.570 px | 1 tamaño, usos, video, precio, promo | Proceso, garantía, FAQ, durabilidad |
| Carátulas | ~3.510 px (37 % es pie) | Medida, usos, $2,50 | Ejemplos, material, proceso, FAQ |
| Diseños | ~7.280 px | Reglas, más pedidos, archivo 2022-2026 | Filtros y pedido por diseño |
| Cómo funciona | Sin medir | 6 pasos, 4 resistencias, video | Envíos y pagos |
| Preguntas | Sin medir | 5 preguntas | Envíos, tiempos, lavado, garantía |
| Testimonios | ~3.500 px | 3 teléfonos, sin texto | Texto real y atribución |

---

## 3. Hallazgos

### Crítica de diseño: Canva

**Primera impresión.** El titular y las cifras se entienden en 2 segundos, y es lo mejor del sitio. Lo debilita que la foto del producto no aparece en la primera pantalla a 1024 px.

| Hallazgo | Severidad | Recomendación |
|---|---|---|
| Hamburguesa sin logo ni CTA, también en escritorio | Crítica | Barra con logo, 6 enlaces y un CTA |
| WhatsApp y Tienda compiten con igual peso | Crítica | Un botón sólido; la tienda como enlace |
| El bloque final ocupa hasta el 37 % de una página | Alta | Pie compacto |
| Todo se apila en una columna central con el mismo ritmo | Media | Variar la composición, como la landing aprobada |
| Texto dentro de imágenes | Media | Texto real: accesible, indexable, editable |
| PNG pesados y carga diferida con zonas en blanco | Media | WebP/AVIF con espacio reservado |

**Funciona bien:** logotipo de doble tipografía, fotos reales, cifras y la cara de Daniella.

### Errores a corregir ya

| # | Dónde | Hallazgo | Acción |
|---|---|---|---|
| 1 | Canva | Se muestra `+593999294821`, pero abre `59397352021` | Confirmar el número correcto |
| 2 | Canva | `www.proorganizer.com.ec` lleva a `/faq/` | Apuntar a la home |
| 3 | Canva | "Terms" y "Privacy" son de Canva, en inglés | Publicar políticas propias |
| 4 | Canva | WhatsApp sin mensaje precargado | Agregar mensaje |
| 5 | Canva | "Whastapp" mal escrito | Corregir |
| 6 | Canva | Redes con `utm_source=chatgpt.com` | Limpiar enlaces |
| 7 | **Proyecto** | `fallback.ts` usa `/proorganizer`; Canva usa `proorganizerec` | Verificar y corregir |
| 8 | **Proyecto** | Badge "Regreso a clases 2026" caducará | Texto editable por temporada |
| 9 | **Proyecto** | "Llevas 4 y pagas 3" y "confirma" rompen el trato de usted | "Lleve 4 y pague 3", "confirme" |
| 10 | **Proyecto** | `canonical` apunta al dominio principal | Una URL propia por página |

### Afirmaciones que necesitan respaldo

No conviene publicarlas en más páginas sin confirmarlas.

| Afirmación | Dónde | Problema |
|---|---|---|
| "Resisten lavavajillas" | Proyecto | Canva solo dice agua, frío, calor y uso diario |
| "100 % seguras para niños" | Proyecto | Promesa absoluta; pide respaldo del material |
| "Material premium" | Proyecto | Vago; mejor decir qué material es |
| "Soy mamá de dos…" | Proyecto | No aparece en Canva, que la presenta como organizadora certificada |
| Reseñas y "4,9/5" | Proyecto, oculto | Son de ejemplo; deben seguir ocultos |
| Precios del termo, chompa y lonchera | Proyecto | Son referenciales; hay que revisarlos |

### Copy y consistencia

- **Trato mezclado:** "Pégalas", "puedes poner" y "Mira cómo las probamos" frente a "usted".
- **Al menos 7 nombres para pedir.** La landing aprobada ya unificó "Pedir por WhatsApp".
- **El proceso difiere:** Canva tiene 6 pasos y la landing habla de cuatro. Su contenido lista 5 títulos, así que hay que revisarlo.
- **"Compre 2… lleve la 2da al 50 %"** en Ropa no tiene sentido literal. **[confirmar]**

### Riesgo: personajes con licencia

Spiderman, Mario Bros, Minecraft o Toy Story ganan exposición con SEO y anuncios. Esto puede traer anuncios rechazados o reclamos.

**Recomendación:** nombrar categorías ("Superhéroes", "Videojuegos") y no usar personajes protegidos en títulos, URL, anuncios ni imágenes promocionales. Es decisión de la clienta; conviene consulta legal.

---

## 4. Posicionamiento

Base provisional, sin entrevistas ni datos de clientas. Tampoco analicé competidores concretos.

**Una frase:** etiquetas personalizadas para que las cosas de sus hijos vuelvan a casa, diseñadas por una organizadora profesional y aprobadas por usted antes de imprimir.

| Elemento | Definición |
|---|---|
| Cliente | Madres y padres en Ecuador, sobre todo antes del inicio de clases |
| Trabajo que contrata | Identificar todo rápido, sin escribirlo a mano ni reponer lo perdido |
| Empuje | Cosas que se pierden o se confunden; la escuela lo pide |
| Atracción | Personajes favoritos, foto, resultado bonito |
| Hábito | Marcador, cinta o masking |
| Ansiedad | ¿Quedará bien? ¿Durará? ¿Es seguro pagar antes? ¿Llega a tiempo? |
| Alternativas | Marcador, cinta, etiquetas genéricas |

**Pilares**
1. **Vuelve a casa:** el beneficio emocional y práctico.
2. **Usted aprueba antes de imprimir:** elimina el miedo a pagar por adelantado.
3. **Hecho por una experta:** Daniella, organizadora profesional certificada.

**Voz:** cercana, clara y de usted. Sin exclamaciones vacías ni presión.

### Psicología aplicada con ética

| Principio | Barrera | Aplicación |
|---|---|---|
| Aversión al arrepentimiento | Pagar por algo personalizado | Vista previa y garantía junto a cada CTA |
| Efecto IKEA y compromiso | Escribir por WhatsApp da pereza | Ver el nombre en Arme su pedido |
| Ley de Hick | Demasiadas opciones | Una acción por bloque; tamaño recomendado según el uso |
| Encuadre del precio | $8 parece caro sin contexto | "Cada hoja trae de 9 a 60 etiquetas" |
| Aversión a la pérdida | "Después lo hago" | Termo perdido frente a una hoja, sin culpar |
| Gradiente de meta | Comprar una sola hoja | "Le falta 1 hoja para la gratis" |
| Prueba social | Desconfianza | +2.500 familias, fotos y capturas reales |
| Pico y final | Compra olvidable | Nota firmada al entregar **[idea a validar]** |

**Límites:** nada de cuentas regresivas falsas, escasez inventada ni reseñas de ejemplo. La urgencia será real: fechas de producción por temporada.

---

## 5. Arquitectura

```
Inicio  /
├─ /etiquetas-utiles-escolares     (landing aprobada)
├─ /etiquetas-ropa-uniformes
├─ /caratulas-cuadernos
├─ /packs-regreso-a-clases         NUEVA, si se aprueba
├─ /disenos
├─ /arme-su-pedido                 NUEVA
├─ /como-funciona
├─ /preguntas-frecuentes
├─ /testimonios                    solo en el pie y con reseñas reales
└─ /privacidad  /terminos          NUEVAS
```

| Acción | Elemento |
|---|---|
| Quitar | Testimonios del menú, archivo por año y bloque final repetido |
| Fusionar | Envío y tiempos en Cómo funciona, con resumen en cada producto |
| Corregir | URL `/cartulas`, `/diseos`, `/cmo-funciona` |
| Agregar | Garantía, proceso y FAQ en cada producto; Arme su pedido; políticas |
| Fase 2 | Pedidos para colegios |

### Navegación

**Escritorio**, una línea y 64-72 px de alto:

```
[Logo]  Útiles  Ropa  Carátulas  Diseños  Cómo funciona  Preguntas  [Pedir por WhatsApp]
```

**Móvil:** logo, botón "WhatsApp" y menú. Dentro, primero los productos con foto y precio. En productos, barra inferior fija:

```
Ropa y uniformes · $8 la hoja   [Pedir por WhatsApp]
```

**Color como orientación:** ya existen azul para útiles, durazno para ropa y lavanda para carátulas. Se usan en tarjetas, menú activo y detalles de cada página. Sin colores nuevos.

**Migas de pan:** Inicio > Ropa y uniformes.

**Antes del pie:** bloque "Complete su pedido" con los otros productos.

**Pie:** Productos, Ayuda, Contacto y Legal. Los teléfonos llevan etiqueta, como ya hace la landing.

### Regla de CTA

| Nivel | Texto | Uso |
|---|---|---|
| Principal | **Pedir por WhatsApp** | Un botón sólido por bloque |
| Con selección | **Pedir este diseño** / **Pedir este tamaño** | Tarjetas, con mensaje específico |
| Guiado | **Arme su pedido** | Home y productos |
| Secundario | Comprar en la tienda | Enlace discreto |

Esta jerarquía asume que WhatsApp vende más. Hay que confirmarlo con datos.

### Arme su pedido

Es la mejor oportunidad nueva: mejora la conversión sin carrito ni pagos, y `OrderProvider` ya guarda selecciones.

```
1. ¿Qué necesita?     Útiles / Ropa / Carátulas
2. Tamaño             Recomendado según el uso
3. Diseño             Categorías + "Tengo una foto"
4. Nombre             Vista en vivo sobre la etiqueta
5. Resumen            Total estimado + promo + [Enviar pedido por WhatsApp]
```

- Una decisión por pantalla, con botones de al menos 44 px.
- Sin datos sensibles: el nombre se queda en el navegador y se envía solo si la persona pulsa el botón.
- La vista es orientativa; Daniella envía el diseño real para aprobar.
- Si la foto hace falta, se manda después por el chat.

---

## 6. Estructura y copy

### Inicio

**Hero**
- **H1:** Etiquetas *personalizadas* para útiles, uniformes y cuadernos
- **Subtítulo:** Para que todo vuelva a casa con su nombre. Usted aprueba el diseño antes de imprimir.
- **CTA:** Arme su pedido
- **Secundario:** Pedir por WhatsApp

**Elija qué quiere etiquetar**

| Tarjeta | Texto | Precio |
|---|---|---|
| Útiles escolares (mayor) | Cuatro tamaños para lápices, cuadernos, termos y loncheras | $8 la hoja |
| Ropa y uniformes | Se pegan con plancha y resisten lavadora y secadora | $8 la hoja |
| Carátulas | Para cuadernos de todos los niveles | $2,50 cada una |

**Orden:** hero, tarjetas, cifras, promos, diseños más pedidos, problema, cómo funciona, Daniella y garantía, 4 preguntas.

- **Promos:** Más hojas, mejor precio
- **Diseños:** Elija un personaje, un tema o la foto de su hijo
- **Problema:** ¿Por qué tantos objetos se pierden cada año? / Porque se parecen y nada dice de quién son.
- **Proceso:** Usted elige, nosotros diseñamos, usted aprueba
- **Cierre:** Su nombre en cada cosa. Lo demás corre por nuestra cuenta.

**Meta:** Etiquetas personalizadas para útiles y uniformes en Ecuador | Pro Organizer

**Descripción:** Etiquetas y carátulas personalizadas con envíos a todo Ecuador. Usted aprueba el diseño antes de imprimir. Pida por WhatsApp desde $8 la hoja.

### Plantilla de producto

| Sección | Útiles | Ropa | Carátulas |
|---|---|---|---|
| Hero con precio y CTA | ✓ | ✓ | ✓ |
| Diseños reales | ✓ | ✓ | ✓ |
| Beneficios | ✓ | Lavado | Según material |
| Tamaños y usos | 4 tamaños | 1,5 × 4,5 cm, 24 por hoja | 24 × 18 cm |
| Precios y promos | ✓ | ✓ | Promo a definir |
| Personalización | ✓ | ✓ | ✓ |
| Cómo se aplican | Opcional | Plancha + video | Según producto |
| Proceso y tiempos | ✓ | ✓ | ✓ |
| Costo del problema | ✓ | Adaptar | No |
| FAQ propia | ✓ | ✓ | ✓ |
| Daniella + garantía | ✓ | ✓ | ✓ |
| Complete su pedido | ✓ | ✓ | ✓ |

Se conserva la secuencia de la landing. Cada producto cambia datos e imágenes, no el diseño.

### Ropa y uniformes

- **H1:** Etiquetas para ropa *y uniformes*
- **Subtítulo:** Para que chompas y calentadores vuelvan a casa. Se pegan con plancha y resisten lavadora y secadora.
- **CTA:** Pedir por WhatsApp
- **Tamaño:** 24 etiquetas por hoja de 1,5 × 4,5 cm
- **Usos:** Calentadores, chompas, camisetas, camisas y ropa deportiva
- **Aplicación:** Pegarlas toma minutos. Mire cómo hacerlo. **[confirmar temperatura y tiempo]**
- **Mensaje:** Hola, quiero pedir etiquetas para ropa y uniformes.
- **Meta:** Etiquetas para ropa y uniformes en Ecuador | Pro Organizer

### Carátulas

- **H1:** Carátulas personalizadas *para cuadernos*
- **Subtítulo:** Cada materia, fácil de encontrar. Con su nombre, grado y el diseño que elija.
- **Precio:** $2,50 cada una
- **Tamaño:** 24 × 18 cm, para cuadernos parvularios o universitarios
- **Beneficios:** **[confirmar material, acabado y si se envían impresas o digitales]**
- **Mensaje:** Hola, quiero pedir carátulas para cuadernos.
- **Meta:** Carátulas personalizadas para cuadernos en Ecuador | Pro Organizer

### Packs **[validar con la clienta]**

Combinar productos sube el pedido promedio sin bajar el precio base.

| Pack | Incluye | Precio |
|---|---|---|
| Primeros pasos | Útiles + Ropa | **[definir]** |
| Año completo | Útiles + Ropa + Carátulas | **[definir]** |

Conviene mantener solo dos opciones y marcar una como recomendada.

### Diseños

- **H1:** Diseños que les encantarán
- **Filtros:** Producto; categorías como Niñas, Niños, Animales, Superhéroes, Videojuegos, Mi foto
- **Tarjeta:** "Pedir este diseño"
- **Sin resultados:** Aún no tenemos este tema aquí. Cuéntenos su idea por WhatsApp y lo diseñamos.
- **Mensaje:** Hola, me interesa el diseño {nombre} para {producto}.

### Cómo funciona

- **H1:** Usted elige, nosotros diseñamos, usted aprueba
- **Pasos:** Pida, reciba su cotización, pague, apruebe el diseño, imprimimos, enviamos. **[confirmar orden]**
- **Tiempos:** 2 a 3 días laborables después de aprobar, más 1 día de entrega.
- **Envíos:** Retiro gratis, Machala $2, resto de Ecuador $3, Galápagos $7.
- **Pagos:** Transferencia o tarjeta. No hay pago contra entrega por ser productos personalizados.
- **Garantía:** Si hay un error en el diseño aprobado, reimprimimos sin costo.

### Preguntas frecuentes

Unas 20 preguntas agrupadas, con buscador y salida a WhatsApp:

- **Pedido:** cantidades, combinaciones, pedido mínimo
- **Diseño:** dos nombres, foto, materias y grado
- **Pago:** tarjeta, transferencia, por qué es previo
- **Envío:** tiempo, costos, ciudades, temporada alta
- **Cuidado:** agua, calor, lavadora, cómo aplicarlas

### Microcopy

| Elemento | Texto |
|---|---|
| Junto al CTA | Le enviamos el diseño para aprobar antes de imprimir. |
| Campo nombre | Nombre en la etiqueta / Escríbalo como quiere que salga. |
| Nombre vacío | Escriba el nombre para ver cómo queda. |
| Resumen | El total final se confirma por WhatsApp. |
| Promo cercana | Agregue 1 hoja más y aproveche la promoción. |
| WhatsApp no abre | No pudimos abrir WhatsApp. Escríbanos al {número}. |
| Página 404 | Esta página no existe. Elija qué quiere etiquetar. |
| Alt de foto | Hoja de etiquetas con el nombre {nombre} sobre útiles escolares |

**Glosario:** "hoja" y "etiquetas", "en línea" (no "on line"), "pedir" para WhatsApp y "comprar" para la tienda.

---

## 7. Criterios de diseño

- Tocar el diseño aprobado solo para adaptarlo a varias páginas.
- Mobile first, sobre todo a 375 px. Áreas táctiles de 44 px mínimo.
- La primera pantalla debe mostrar producto, precio y acción.
- Sin menús que dependan de hover. Foco visible y navegación con teclado.
- Contraste AA. El rojo sigue fuera del texto pequeño.
- Imágenes WebP con medidas reservadas; `prefers-reduced-motion` respetado.
- Un solo marquee por página. Evitar la misma composición en secciones seguidas.
- **Modo oscuro:** no se agrega, porque el diseño aprobado es claro. La decisión es deliberada.

---

## 8. Plan de marketing

Versión operativa, no el plan completo de 12 meses. Para hacerlo falta conocer presupuesto, equipo, costo por cliente, repetición de compra y canales que funcionan.

### Dos temporadas

Las clases en Costa y Galápagos empiezan antes que en Sierra y Amazonía. **Machala está en la Costa,** y los envíos llegan a todo el país, así que hay dos picos al año. Las fechas exactas deben tomarse del calendario oficial del Ministerio de Educación.

| Periodo | Foco |
|---|---|
| Nov-Dic 2026 | Sitio, medición, reseñas y fotos |
| Ene-Feb 2027 | Contenido, SEO, alianzas, lista de útiles |
| Mar-May 2027 | Pico Costa: anuncios, packs, fecha límite real |
| Jun-Ago 2027 | Sierra: mismo plan con piezas adaptadas |
| Sep-Oct 2027 | Recompra, reseñas y pedidos para colegios |

### Embudo

| Etapa | Acción | Métrica |
|---|---|---|
| Adquisición | SEO por producto, Google Business en Machala, Reels, anuncios de temporada | Visitas por página |
| Activación | Arme su pedido, mensajes por producto, vista previa | Clics a WhatsApp |
| Conversión | Respuestas rápidas, seguimiento, cotización clara | Chats que terminan en pedido |
| Retención | Aviso de recompra con permiso, nuevos diseños | Clientas que repiten |
| Referidos | Beneficio por recomendar | Pedidos referidos |
| Ingresos | Packs y venta cruzada | Pedido promedio |

**Métrica principal:** pedidos pagados por temporada. El sitio mide clics; la clienta debe registrar en WhatsApp cuáles se convierten.

### Ideas priorizadas

| Prioridad | Idea | Por qué encaja | Primer paso |
|---|---|---|---|
| 1 | Arme su pedido | Aprovecha el canal actual | Construirlo con el sitio |
| 2 | Recolección de reseñas | Es la prueba que falta | Pedir foto y permiso tras entregar |
| 3 | Lista de qué etiquetar | Gancho útil y compartible | Publicar página y PDF |
| 4 | Google Business y SEO local | Búsqueda con intención | Crear o revisar el perfil |
| 5 | Alianzas con colegios y papelerías | Llega a las familias correctas | Piloto con 3 en Machala |
| 6 | Reels de prueba | Muestra durabilidad y personajes | Termo, lavadora, antes y después |
| 7 | Referidos entre familias | Las recomendaciones circulan en grupos | Código simple por WhatsApp |

**Por ahora no:** blog extenso, app, descuentos permanentes, programa de afiliados complejo. El volumen de búsqueda aún no está validado.

---

## 9. Impacto técnico

- **Rutas:** mover la landing y crear home, con layout compartido.
- **Secciones:** recibir datos por producto y no asumir "útiles".
- **WordPress:** modelar productos, FAQ por categoría, diseños por producto y temporada.
- **WhatsApp:** mensajes por sección y producto.
- **Arme su pedido:** extender `OrderProvider` con estado por pasos.
- **SEO:** metadatos, `Product`, `BreadcrumbList`, `FAQPage`, `sitemap` y `robots`.
- **Medición:** eventos de WhatsApp, tienda y pasos del armador.
- **Canva no permite 301:** actualizar enlaces en redes y anuncios, y mantener una página puente.

Antes de programar hay que leer `node_modules/next/dist/docs/`.

---

## 10. Fases

1. **Ya:** corregir errores de Canva y cerrar la sección 11.
2. **Base:** rutas, layout, navegación, pie y modelo de contenido.
3. **Inicio y producto:** home, Útiles, Ropa y Carátulas.
4. **Conversión:** Diseños, Arme su pedido, Cómo funciona y Preguntas.
5. **Lanzamiento:** legales, SEO, medición, QA móvil, dominio y cambio de enlaces.
6. **Temporada:** reseñas, contenido, alianzas y anuncios.

**Prioridad de calendario:** tener el sitio listo antes de enero para llegar con margen a la temporada Costa.

---

## 11. Pendientes de la clienta

**Decisiones**
1. Dominio. Recomiendo `etiquetas.proorganizer.com.ec`.
2. Canal principal: WhatsApp o Kyte, según ventas.
3. Packs y precios.
4. Personajes con licencia.
5. Aprobar Arme su pedido.

**Información**
- Segundo teléfono correcto y redes oficiales.
- Promos exactas de Ropa y Carátulas.
- Material y resistencia real, incluido lavavajillas.
- Respaldo de seguridad para niños.
- Historia de Daniella.
- Material y formato de carátulas.
- Pasos oficiales del proceso.
- Instrucciones de planchado.
- Pedido mínimo.
- Respuestas para la FAQ.
- Reseñas reales con autorización.
- Fotos de ropa y carátulas en uso.
- Ventas por producto y canal.
- Presupuesto de marketing.

---

## 12. Límites de este análisis

- Sin datos de tráfico, ventas, entrevistas ni competidores: las prioridades y el posicionamiento son hipótesis.
- Los impactos esperados no están cuantificados, para no inventar cifras.
- Algunas zonas de Testimonios y Carátulas salieron en blanco en la revisión automatizada. No está confirmado si fallan en un navegador normal.
- La crítica visual de Canva es parcial; no probé todos los enlaces de Diseños.
- La crítica del proyecto se basa en su contenido y no en una revisión visual de esta versión.
- Las fechas de temporada deben validarse con el calendario oficial.
