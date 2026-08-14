import type { SiteContent, WpImage } from "./types";

/** Muestra de etiqueta servida desde `public/etiquetas` (siempre cuadrada). */
const labelImage = (slug: string, alt = "Etiqueta escolar personalizada"): WpImage => ({
  url: `/etiquetas/${slug}.webp`,
  alt,
  width: 900,
  height: 900,
});

/**
 * Espejo de los valores por defecto definidos en el plugin de WordPress
 * (wp-content/mu-plugins/proorg). Mantener ambos lados sincronizados.
 */
export const fallbackContent: SiteContent = {
  settings: {
    brand: {
      logo: null,
      logoText: "PRO ORGANIZER",
      whatsappNumber: "593992787945",
      phone1: "+593992787945",
      // Dos números sin etiquetar hacían dudar a cuál escribir, y la duda en
      // un footer se resuelve cerrando la pestaña.
      phone1Label: "Ventas y pedidos",
      phone2: "+593999294821",
      phone2Label: "Soporte y seguimiento",
      webUrl: "https://www.proorganizer.com.ec",
      instagram: "https://instagram.com/proorganizer",
      facebook: "https://facebook.com/proorganizer",
      tiktok: "https://tiktok.com/@proorganizer",
      address: "Machala - El Oro, Ecuador",
    },
    /**
     * Un mensaje distinto por sección: el chat abre con el contexto que el
     * usuario ya dio en la página, y de paso se sabe qué sección cerró la venta.
     */
    whatsapp: {
      msgNav: "Hola Pro Organizer, quiero información sobre las etiquetas escolares.",
      msgHero: "Hola, quiero pedir etiquetas escolares personalizadas.",
      msgSizes: "Hola, quiero elegir el tamaño de mis etiquetas escolares.",
      msgDesigns: "Hola, quiero ver los diseños de etiquetas escolares.",
      msgCost: "Hola, quiero etiquetar las cosas del cole de mi peque.",
      msgPromos: "Hola, quiero aprovechar la promo de 4ta hoja gratis.",
      msgFinalCta: "Hola, quiero personalizar mis etiquetas escolares.",
      msgFooter: "Hola, necesito ayuda con un pedido de etiquetas.",
      previewNote: "Te enviamos la vista previa antes de imprimir — sin compromiso.",
    },
    header: {
      ctaText: "Pedir por WhatsApp",
      // El orden espeja el orden físico de las secciones. Si cambias uno,
      // cambia el otro o el menú miente.
      navItems:
        "Inicio|inicio\nTamaños|tamanos\nDiseños|disenos\nPromociones|promociones\nCómo funciona|como-funciona\nPreguntas frecuentes|preguntas-frecuentes",
    },
    hero: {
      // La categoría principal aparece integrada en una promesa concreta:
      // personalizar para que las cosas vuelvan a casa. El H1 se mantiene
      // breve para conservar fuerza visual y lectura rápida.
      badge: "Regreso a clases 2026",
      title: "Etiquetas escolares",
      // Cada tramo separado por "|" mantiene el mismo azul oscuro del titular.
      titleHighlight: "para que todo vuelva a casa",
      // Amplía la promesa con el beneficio funcional, sin inflar el H1.
      subtitle: "Personalizadas con su nombre, resistentes al agua, al lavavajillas y al uso diario.",
      // Se muestran como franja de confianza al pie del hero.
      bullets:
        "Material premium\nImpresas en alta calidad\nFáciles de aplicar\n100 % seguras para niños",
      priceLabel: "desde",
      priceValue: "$8",
      priceSuffix: "por hoja",
      // El CTA del hero vende el paso sin riesgo (ver la vista previa), no el
      // canal. "Pedir por WhatsApp" se reserva para el CTA de cierre, donde el
      // usuario ya decidió.
      ctaPrimary: "Ver mi vista previa gratis",
      ctaSecondary: "Ver diseños",
      note: "",
      // "$8 por hoja" no se puede evaluar sin saber qué trae una hoja.
      sheetNote: "Cada hoja trae de 9 a 60 etiquetas según el tamaño.",
      promoNote: "4ta hoja gratis · Llevas 4 y pagas 3",
      deliveryNote: "Entrega en 3 a 5 días tras aprobar tu diseño.",
      image: {
        url: "/hero imagen 2.png",
        alt: "Útiles escolares personalizados con etiquetas con el nombre de Camila López",
        width: 1536,
        height: 1024,
      },
    },
    trust: {
      eyebrow: "Calidad que acompaña",
      title: "Hechas para seguirles el ritmo",
      // Cinco beneficios cortos: la franja del diseño es compacta.
      items:
        "drop|Resistentes al agua|No se despegan ni se borran.\nwasher|Aguantan lavavajillas|Perfectas para lunch y termos.\nshield|Ultra duraderas|Soportan el uso diario.\nheart|Seguras y no tóxicas|Material certificado.\nsmile|Fáciles de aplicar|Listas en segundos.",
    },
    /**
     * Fuente única de verdad de la prueba social numérica. La página llegó a
     * decir +6000 hojas, +2500 familias y +8.500 pedidos a la vez: tres cifras
     * que se contradicen leen peor que ninguna.
     */
    stats: {
      stat1Value: "+2.500",
      stat1Label: "Familias atendidas",
      stat2Value: "+6 años",
      stat2Label: "de experiencia en Ecuador",
    },
    sizes: {
      eyebrow: "Una para cada necesidad",
      title: "Elige el tamaño ideal",
      subtitle: "",
      ctaText: "Elegir este tamaño",
      usesLabel: "Ideal para:",
      sampleName: "Sofía R.",
    },
    usage: {
      title: "¿Dónde las puedes usar?",
      subtitle: "",
    },
    designs: {
      eyebrow: "Su estilo, su etiqueta",
      title: "Diseños que les encantan",
      subtitle: "",
      ctaText: "Ver todos los diseños",
      featuredSub: "Hazlo único con su mejor sonrisa.",
      featuredNote: "Mismo precio, $8 por hoja.",
      featuredCta: "Pedir con su foto",
    },
    /**
     * El competidor real no es otra marca de etiquetas: es el marcador
     * permanente. Esta sección compara contra eso y contra el precio de lo que
     * se pierde. Los tres primeros precios son de mercado; el de la hoja es
     * nuestro y por eso lleva el sufijo `|nuestro`.
     */
    cost: {
      eyebrow: "LO QUE SE PIERDE, SE PAGA",
      title: "Un termo perdido cuesta más que un año de etiquetas",
      subtitle: "Cada cosa sin nombre es una que probablemente no vuelva.",
      prices:
        "bottle|$12|Un termo perdido\nshirt|$25|Una chompa del uniforme\nlunchbox|$18|Una lonchera\nsheet|$8|Una hoja de etiquetas|nuestro",
      closing: "Con una sola cosa que no se pierda, las etiquetas ya se pagaron.",
      pricesNote: "Precios referenciales del mercado ecuatoriano.",
      badTitle: "Con marcador permanente",
      badItems:
        "Se borra al segundo lavado\nSe ve desprolijo en cosas nuevas\nHay que rehacerlo cada mes\nNo funciona en plástico ni en tela",
      goodTitle: "Con etiquetas Pro Organizer",
      goodItems:
        "Aguantan agua y lavavajillas\nSe ven prolijas y ordenadas\nLas pones una vez y listo\nSe adhieren a plástico, metal y tela",
      ctaText: "Quiero etiquetar sus cosas",
    },
    process: {
      eyebrow: "Personalizar es muy fácil",
      title: "Así de fácil es personalizar",
      subtitle: "",
    },
    pricing: {
      eyebrow: "Más etiquetas, mejor precio",
      promoTitle: "Promos que te encantarán",
      priceSticker: "Precio simple",
      priceTitle: "Precios simples y justos",
      priceValue: "$8",
      priceSuffix: "por hoja",
      priceSub: "Cualquier tamaño",
      ctaText: "Aprovechar promoción",
      note: "Las promociones aplican a hojas de igual o menor valor. Confirma las condiciones al realizar tu pedido.",
    },
    // Encendida: como sección propia costaba una pantalla entera de scroll
    // para repetir lo que ya decían las categorías, así que estaba apagada.
    // Ahora es un tab dentro de Diseños y no cuesta scroll, y las fotos de
    // producto real son la prueba que ninguna ilustración da.
    gallery: {
      enabled: true,
      title: "Etiquetas reales, tal como se imprimen",
      subtitle: "Muestras de la colección de personajes. Toca una para verla en grande.",
    },
    testimonials: {
      eyebrow: "Experiencias reales",
      title: "Lo que dicen otras familias",
      ratingValue: "4,9/5",
      ratingLabel: "según las reseñas que nos comparten.",
    },
    faq: {
      eyebrow: "Todo lo que necesitas saber",
      title: "Preguntas frecuentes",
      subtitle: "",
      linkText: "Ver todas las preguntas",
      linkUrl: "#preguntas-frecuentes",
    },
    finalCta: {
      eyebrow: "Listos para empezar",
      title: "Haz que todo vuelva a casa",
      titleHighlight: "",
      highlightColor: "#FF6B6B",
      text: "Personaliza ahora y olvídate de las pérdidas.",
      ctaPrimary: "Pedir por WhatsApp",
      guarantees: "",
      // Único punto de presión temporal de la página. Sin fecha dura: una
      // cuenta atrás inventada se nota y quema la credibilidad del resto.
      seasonNote:
        "Pedidos para el inicio de clases: confirma con anticipación. En temporada alta la producción puede tomar unos días más.",
      seasonDeadline: "",
    },
    footer: {
      quote: "",
      col1Title: "Productos",
      // `galeria` y `personalizacion` ya no son secciones: son tabs dentro de
      // Diseños. El ancla sigue funcionando y abre su panel.
      col1Links:
        "Tamaños|tamanos\nDiseños|disenos\nMuestras reales|galeria\nPromociones|promociones",
      col2Title: "Ayuda",
      col2Links:
        "Preguntas frecuentes|preguntas-frecuentes\nCómo funciona|como-funciona\nPolíticas de envío|preguntas-frecuentes",
      waTitle: "",
      waCta: "",
      waText: "",
      closing: "",
      copyright: "© {year} Pro Organizer. Todos los derechos reservados.",
      legalLinks: "",
    },
    floating: {
      enabled: true,
      label: "Pedir por WhatsApp",
      mobileText: "Desde $8 por hoja",
      mobileCta: "Pedir por WhatsApp",
    },
    seo: {
      title: "Etiquetas escolares personalizadas en Ecuador | Pro Organizer",
      description:
        "Personaliza etiquetas para lápices, cuadernos, termos y loncheras. Elige entre cuatro tamaños, aprueba el diseño antes de imprimir y realiza tu pedido por WhatsApp.",
      ogImage: null,
      canonical: "https://www.proorganizer.com.ec",
    },
  },
  /** Cuatro tamaños alineados con la oferta impresa y sus usos principales. */
  sizes: [
    {
      id: "size-1",
      slug: "mini",
      title: "Extra pequeñas",
      count: "60 etiquetas",
      dims: "0,8 cm alto x 5 cm ancho",
      uses: "Lápices de colores, cubiertos, marcadores delgados, crayones.",
      badge: "",
      accent: "#FF6B6B",
      image: null,
    },
    {
      id: "size-2",
      slug: "pequena",
      title: "Pequeña",
      count: "48 etiquetas",
      dims: "1,5 cm alto x 4,5 cm ancho",
      uses: "Lápices jumbo, resaltadores, reglas, gomas, sacapuntas, estuches.",
      badge: "",
      accent: "#F5A524",
      image: null,
    },
    {
      id: "size-3",
      slug: "mediana",
      title: "Medianas",
      count: "24 etiquetas",
      dims: "2,5 cm alto x 5 cm ancho",
      uses: "Cuadernos, estuches, carpetas, vasos y objetos de uso diario.",
      badge: "",
      accent: "#36B8A4",
      image: null,
    },
    {
      id: "size-4",
      slug: "grande",
      title: "Grande",
      count: "9 etiquetas",
      dims: "5 cm alto x 6,5 cm ancho",
      uses: "Cuadernos, libros, carpetas, termos, loncheras, mochilas.",
      badge: "",
      accent: "#8B7CF6",
      image: null,
    },
  ],
  usages: [
    { id: "u1", title: "Loncheras", image: null, sizeSlug: "grande" },
    { id: "u2", title: "Termos y botellas", image: null, sizeSlug: "grande" },
    { id: "u3", title: "Cuadernos y libros", image: null, sizeSlug: "grande" },
    { id: "u4", title: "Útiles escolares", image: null, sizeSlug: "pequena" },
    { id: "u5", title: "Mochilas y bolsas", image: null, sizeSlug: "grande" },
    { id: "u6", title: "Ropa y uniformes", image: null, sizeSlug: "pequena" },
    { id: "u7", title: "Juguetes", image: null, sizeSlug: "pequena" },
    { id: "u8", title: "¡Y mucho más!", image: null, sizeSlug: "mini" },
  ],
  designs: [
    { id: "d1", title: "Animales", image: null, badge: "" },
    { id: "d2", title: "Espacio", image: null, badge: "" },
    { id: "d3", title: "Deportes", image: null, badge: "" },
    { id: "d4", title: "Dinosaurios", image: null, badge: "" },
    { id: "d5", title: "Unicornios", image: null, badge: "" },
    {
      id: "d7",
      title: "Personajes",
      image: labelImage("buzz", "Etiqueta con personaje y el nombre del niño"),
      badge: "Nuevo",
    },
    { id: "d6", title: "Foto personalizada", image: null, badge: "100 % único" },
  ],
  steps: [
    {
      id: "s1",
      title: "Escribe el nombre",
      desc: "y elige tu diseño favorito.",
      icon: "pencil",
    },
    {
      id: "s2",
      title: "Elige el tamaño",
      desc: "y confirma tu pedido.",
      icon: "bag",
    },
    {
      id: "s3",
      title: "Recibe en casa",
      desc: "en pocos días.",
      icon: "package",
    },
    {
      id: "s4",
      title: "Aplica y listo",
      desc: "¡nada se pierde!",
      icon: "star",
    },
  ],
  // title = etiqueta de esquina · post = línea superior · highlight = cifra
  // grande · pre = texto de apoyo.
  promos: [
    {
      id: "p1",
      title: "Más elegida",
      pre: "Ahorra más en tu compra",
      highlight: "50 % OFF",
      post: "3ra hoja",
      featured: false,
    },
    {
      id: "p2",
      title: "Mejor precio",
      pre: "Llevas 4 hojas y pagas 3",
      highlight: "GRATIS",
      post: "4ta hoja",
      featured: true,
    },
  ],
  // Muestras impresas: archivos cuadrados en `public/etiquetas`, ya recortados
  // al contenido de la etiqueta. El nombre del niño va sobre el dibujo, así que
  // el título describe el personaje, no el nombre de ejemplo.
  gallery: [
    { id: "g1", title: "Guardián espacial", image: labelImage("buzz") },
    { id: "g2", title: "Dinosaurio", image: labelImage("dinosaurio") },
    { id: "g3", title: "Vaquero a caballo", image: labelImage("tiro-al-blanco") },
    { id: "g4", title: "Perrito resorte", image: labelImage("perrito-resorte") },
    { id: "g5", title: "Señor patata", image: labelImage("senor-papa") },
    { id: "g6", title: "Cerdito hucha", image: labelImage("doctor-tocino") },
    { id: "g7", title: "Muñeco de manualidades", image: labelImage("forky") },
  ],
  /**
   * Una objeción distinta por reseña: lavado, pérdidas, entrega y gusto del
   * niño. Cuatro veces "son resistentes y de buena calidad" no resuelve nada y
   * lee como relleno. Reemplázalas por reseñas reales en el admin.
   */
  testimonials: [
    {
      id: "t1",
      title: "Mariana G.",
      city: "Machala",
      rating: "5",
      text: "Llevan todo el año en el termo y la lonchera, con lavavajillas incluido, y siguen igual de nítidas.",
      avatar: null,
    },
    {
      id: "t2",
      title: "Carla P.",
      city: "Guayaquil",
      rating: "5",
      text: "Desde que etiquetamos todo no hemos vuelto a reponer una sola chompa ni un solo tomatodo.",
      avatar: null,
    },
    {
      id: "t3",
      title: "Lucía F.",
      city: "Cuenca",
      rating: "5",
      text: "Aprobé la vista previa un lunes y las tuve en casa esa misma semana, justo antes de que empezaran las clases.",
      avatar: null,
    },
    {
      id: "t4",
      title: "Diego T.",
      city: "Quito",
      rating: "5",
      text: "Mi hijo eligió los dinosaurios y se puso a pegarlas él solo. Reconoce sus cosas sin saber leer todavía.",
      avatar: null,
    },
  ],
  faqs: [
    {
      id: "f1",
      title: "¿Son realmente resistentes al agua?",
      answer:
        "Sí. Usamos material adhesivo laminado, resistente al agua, la fricción y los lavados normales de loncheras y termos.",
    },
    {
      id: "f2",
      title: "¿Cómo aplico las etiquetas?",
      answer:
        "Limpia y seca la superficie, despega la etiqueta y presiona firmemente unos segundos. Listo.",
    },
    {
      // Objeción de fricción número uno de un pedido que se cierra por chat y
      // no por carrito. Va dentro de las seis visibles a propósito.
      id: "f10",
      title: "¿Es seguro pedir por WhatsApp?",
      answer:
        "Sí. Llevamos más de 6 años y más de 2.500 familias atendidas en todo Ecuador. Antes de imprimir te enviamos la vista previa para que la apruebes, y solo entonces se produce tu pedido.",
    },
    {
      id: "f3",
      title: "¿Se pueden lavar en lavavajillas?",
      answer:
        "Sí. Aguantan los lavados habituales de loncheras, termos y cubiertos sin despegarse.",
    },
    {
      id: "f4",
      title: "¿Son seguras para la piel y los niños?",
      answer:
        "Sí. Usamos material certificado, no tóxico y sin bordes cortantes, pensado para uso escolar.",
    },
    {
      id: "f5",
      title: "¿En cuánto tiempo llega mi pedido?",
      answer:
        "Entre 24 y 48 horas hábiles después de aprobar el diseño, más el tiempo de envío a tu ciudad.",
    },
    {
      id: "f9",
      title: "¿Puedo pedir con foto personalizada?",
      answer:
        "Sí. Envíanos la foto por WhatsApp con buena iluminación y la integramos al diseño de la etiqueta.",
    },
    {
      id: "f6",
      title: "¿Realizan envíos a otras ciudades?",
      answer:
        "Enviamos a todo Ecuador mediante courier. El costo depende de tu ciudad y te lo confirmamos al hacer el pedido.",
    },
    {
      id: "f7",
      title: "¿Cómo se colocan las etiquetas?",
      answer:
        "Limpia y seca la superficie, despega la etiqueta y presiona firmemente por unos segundos. Listo.",
    },
    {
      id: "f8",
      title: "¿Qué métodos de pago aceptan?",
      answer:
        "Transferencia bancaria, depósito y pagos por la tienda en línea. Te compartimos los datos al confirmar tu pedido.",
    },
  ],
};
