import type { SiteContent, WpImage } from "./types";

/** Muestra de etiqueta servida desde `public/etiquetas` (siempre cuadrada). */
const labelImage = (slug: string, alt = "Etiqueta escolar personalizada"): WpImage => ({
  url: `/etiquetas/${slug}.webp`,
  alt,
  width: 900,
  height: 900,
});

/** Foto de producto por tamaño, en `public/tamanos` (proporción 4:3). */
const sizeImage = (slug: string, title: string): WpImage => ({
  url: `/tamanos/${slug}.webp`,
  alt: `Etiquetas ${title} aplicadas sobre útiles escolares`,
  width: 900,
  height: 675,
});

/** Foto de uso, en `public/usos` (cuadrada, fondo recortado). */
const usageImage = (slug: string, title: string): WpImage => ({
  url: `/usos/${slug}.webp`,
  alt: `Etiquetas personalizadas en ${title.toLowerCase()}`,
  width: 600,
  height: 600,
});

/**
 * Espejo de los valores por defecto definidos en el plugin de WordPress
 * (wp-content/mu-plugins/proorg). Mantener ambos lados sincronizados.
 */
export const fallbackContent: SiteContent = {
  settings: {
    brand: {
      logo: null,
      footerLogo: {
        url: "/logo-footer.png",
        alt: "Pro Organizer",
        width: 1024,
        height: 376,
      },
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
      msgSizeTemplate: "Hola, quiero etiquetas tamaño {title} ({count} por hoja).",
      msgDesignTemplate: "Hola, me interesan las etiquetas con diseño de {title}.",
      previewNote: "Le enviamos la vista previa antes de imprimir — sin compromiso.",
    },
    palette: {
      textColor: "#0b4a75",
      purpleColor: "#7b3fa6",
      pinkColor: "#de2b22",
      grayColor: "#c4cfd8",
      greenColor: "#17803a",
      blueColor: "#2e8fd0",
    },
    header: {
      ctaText: "Pedir por WhatsApp",
      shortCtaText: "WhatsApp",
    },
    hero: {
      // La categoría principal aparece integrada en una promesa concreta:
      // personalizar para que las cosas vuelvan a casa. El H1 se mantiene
      // breve para conservar fuerza visual y lectura rápida.
      badge: "Regreso a clases 2026",
      title: "Etiquetas escolares",
      // Cada tramo separado por "|" mantiene el mismo azul oscuro del titular.
      titleHighlight: "personalizadas",
      // Amplía la promesa con el beneficio funcional, sin inflar el H1.
      subtitle:
        "Para que todo vuelva a casa con su nombre. Resisten agua, lavavajillas y el uso diario.",
      // Se muestran como franja de confianza al pie del hero.
      bullets:
        "Material premium\nImpresas en alta calidad\nFáciles de aplicar\n100 % seguras para niños",
      priceLabel: "desde",
      priceValue: "$8",
      priceSuffix: "por hoja",
      // El CTA del hero vende el paso sin riesgo (ver la vista previa), no el
      // canal. "Pedir por WhatsApp" se reserva para el CTA de cierre, donde el
      // usuario ya decidió.
      ctaPrimary: "Pedir por WhatsApp",
      ctaSecondary: "Ver diseños",
      note: "Cuatro tamaños · desde $8 la hoja · 4ta hoja gratis",
      // "$8 por hoja" no se puede evaluar sin saber qué trae una hoja.
      sheetNote: "Cada hoja trae de 9 a 60 etiquetas según el tamaño.",
      promoNote: "4ta hoja gratis · Llevas 4 y pagas 3",
      deliveryNote: "Entrega en 3 a 5 días tras aprobar su diseño.",
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
        "drop|Resisten agua y lavavajillas|Loncheras, termos y cubiertos.\nshield|Duran todo el año|No se despegan ni se borran.\nheart|Seguras para niños|Material certificado y no tóxico.",
    },
    sizes: {
      eyebrow: "Una para cada necesidad",
      title: "Elija el tamaño ideal",
      subtitle: "",
      ctaText: "Elegir este tamaño",
      selectedLabel: "Seleccionado",
      orderCtaTemplate: "Pedir tamaño {title}",
      usesLabel: "Ideal para:",
      sampleName: "Sofía R.",
    },
    usage: {
      title: "¿Dónde las puede usar?",
      subtitle: "",
    },
    designs: {
      eyebrow: "Su estilo, su etiqueta",
      title: "Diseños que les encantan",
      subtitle: "",
      ctaText: "Ver todos los diseños",
      selectedCtaTemplate: "Pedir diseño {title}",
      featuredSub: "Hágalo único con su mejor sonrisa.",
      featuredNote: "Mismo precio, $8 por hoja.",
      featuredCta: "Pedir por WhatsApp",
    },
    personalization: {
      title: "Diseñamos sus etiquetas",
      titleHighlight: "con amor",
      subtitle:
        "Cada detalle se adapta para que sus cosas sean fáciles de reconocer y difíciles de perder.",
      image: {
        url: "/hoja de etiquetas.png",
        alt: "Hoja de etiquetas personalizadas con nueve diseños y el nombre Sofía R.",
        width: 1024,
        height: 1280,
      },
      featureItems:
        "image|Imágenes que les encantan|Incluimos su personaje favorito, el logo de la escuela o una foto.\nsticker|Fondo blanco y adhesivo resistente|Cada diseño se lee con claridad y está hecho para acompañar el uso diario.\ntype|Su nombre, siempre visible|Usamos letras oscuras y legibles para encontrar todo de un vistazo.",
      guideBadge: "Guía rápida",
      guideTitle: "Mira cómo personalizamos tus etiquetas",
      guideText: "Del nombre elegido al diseño listo para imprimir.",
      guideCta: "Ver el paso a paso",
      guideUrl: "https://etiquetasescolares.proorganizer.com.ec/#como-funciona",
      approvalText: "Imprimimos tus etiquetas solo cuando apruebas el diseño.",
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
        "Aguantan agua y lavavajillas\nSe ven prolijas y ordenadas\nLas pone una vez y listo\nSe adhieren a plástico, metal y tela",
      badTabLabel: "Con marcador",
      goodTabLabel: "Con etiquetas",
      ctaText: "Pedir por WhatsApp",
    },
    process: {
      eyebrow: "Personalizar es muy fácil",
      title: "Así de fácil es personalizar",
      // Absorbe lo que explicaba el panel de personalización retirado de la
      // sección de diseños: qué lleva la etiqueta y quién da el visto bueno.
      subtitle:
        "Cada etiqueta lleva fondo blanco y su nombre en letras oscuras, con el personaje favorito, el logo del colegio o una foto. Imprimimos solo cuando usted aprueba el diseño.",
    },
    pricing: {
      eyebrow: "Más etiquetas, mejor precio",
      promoTitle: "Promos que le encantarán",
      priceSticker: "Precio simple",
      priceTitle: "Precios simples y justos",
      priceValue: "$8",
      priceSuffix: "por hoja",
      priceSub: "Cualquier tamaño",
      ctaText: "Pedir por WhatsApp",
      note: "Las promociones aplican a hojas de igual o menor valor. Confirme las condiciones al realizar su pedido.",
    },
    // Encendida: como sección propia costaba una pantalla entera de scroll
    // para repetir lo que ya decían las categorías, así que estaba apagada.
    // Ahora es un tab dentro de Diseños y no cuesta scroll, y las fotos de
    // producto real son la prueba que ninguna ilustración da.
    gallery: {
      enabled: true,
      title: "Etiquetas reales, tal como se imprimen",
      subtitle: "Muestras de la colección de personajes. Toque una para verla en grande.",
    },
    testimonials: {
      eyebrow: "Experiencias reales",
      title: "Lo que dicen otras familias",
      ratingValue: "4,9/5",
      ratingLabel: "según las reseñas que nos comparten.",
    },
    faq: {
      eyebrow: "Todo lo que necesita saber",
      title: "Preguntas frecuentes",
      subtitle: "",
      linkText: "Ver todas las preguntas",
      linkUrl: "#preguntas-frecuentes",
    },
    finalCta: {
      eyebrow: "Listos para empezar",
      title: "Haga que todo vuelva a casa",
      titleHighlight: "",
      highlightColor: "#a81a13",
      text: "Personalice ahora y olvídese de las pérdidas.",
      ctaPrimary: "Pedir por WhatsApp",
      guarantees: "",
      // Único punto de presión temporal de la página. Sin fecha dura: una
      // cuenta atrás inventada se nota y quema la credibilidad del resto.
      seasonNote:
        "Pedidos para el inicio de clases: confirma con anticipación. En temporada alta la producción puede tomar unos días más.",
      seasonDeadline: "",
    },
    footer: {
      quote: "Etiquetas que organizan y acompañan cada aventura.",
      socialTitle: "Síganos",
      storeTitle: "Compre en nuestra tienda en línea",
      storeText: "Rápido, fácil y seguro.",
      storeCta: "Visitar tienda en línea",
      // La columna de ayuda conserva su propio verbo: va al mismo WhatsApp,
      // pero bajo un horario de atención es soporte, no un pedido, y llamarla
      // "Pedir por WhatsApp" haría que el pie prometiera dos cosas distintas.
      waTitle: "¿Necesita ayuda?",
      waCta: "Escríbanos por WhatsApp",
      waText: "Lun a Vie de 9 a 18 h",
      closing: "Porque cuando todo tiene un nombre, es más fácil que vuelva a casa.",
      copyright: "© {year} Pro Organizer. Todos los derechos reservados.",
      legalLinks: "",
    },
    founder: {
      photo: {
        url: "/daniella.png",
        alt: "Daniella Silva, organizadora profesional de espacios certificada",
        width: 1024,
        height: 1536,
      },
      photoAlt: "Daniella Silva, organizadora profesional de espacios certificada",
      signature: {
        url: "/firma.png",
        alt: "Firma de Daniella Silva",
        width: 800,
        height: 300,
      },
      title: "Hola, soy Daniella",
      bio:
        "Organizadora Profesional de Espacios Certificada. Diseñamos personalmente cada hoja para que llegue perfecta para sus hijos.",
      guaranteeTitle: "Su tranquilidad es nuestra garantía",
      guaranteeText:
        "Si existe un error en el diseño aprobado por nosotros, reimprimimos sin costo.",
      ctaTitle: "¿Listo para empezar?",
      ctaText: "Escríbanos por WhatsApp y le ayudamos.",
      ctaButton: "Pedir por WhatsApp",
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
        "Etiquetas adhesivas personalizadas para lápices, cuadernos, termos y loncheras. Cuatro tamaños desde $8 la hoja, vista previa antes de imprimir y pedido por WhatsApp.",
      productName: "Etiquetas escolares personalizadas",
      ogImage: null,
      canonical: "https://www.proorganizer.com.ec",
    },
  },
  /** Cuatro tamaños alineados con la oferta impresa y sus usos principales. */
  sizes: [
    {
      id: "size-1",
      slug: "extra-pequenas",
      title: "Extra pequeñas",
      count: "60 etiquetas",
      dims: "0,8 cm alto x 5 cm ancho",
      uses: "Lápices de colores, cubiertos, marcadores delgados, crayones.",
      badge: "",
      accent: "#de2b22",
      image: sizeImage("extra-pequenas", "Extra pequeñas"),
    },
    {
      id: "size-2",
      slug: "pequena",
      title: "Pequeña",
      count: "48 etiquetas",
      dims: "1,5 cm alto x 4,5 cm ancho",
      uses: "Lápices jumbo, resaltadores, reglas, gomas, sacapuntas, estuches.",
      badge: "",
      accent: "#f0913c",
      image: sizeImage("pequena", "Pequeña"),
    },
    {
      id: "size-3",
      slug: "medianas",
      title: "Medianas",
      count: "24 etiquetas",
      dims: "2,5 cm alto x 5 cm ancho",
      uses: "Estuches, vasos, cajas de colores y objetos de uso diario.",
      badge: "",
      accent: "#2e8fd0",
      image: sizeImage("medianas", "Medianas"),
    },
    {
      id: "size-4",
      slug: "grande",
      title: "Grande",
      count: "9 etiquetas",
      dims: "5 cm alto x 6,5 cm ancho",
      uses: "Cuadernos, libros, carpetas, termos, loncheras, mochilas.",
      badge: "",
      accent: "#7b3fa6",
      image: sizeImage("grande", "Grande"),
    },
  ],
  usages: [
    { id: "u1", title: "Loncheras", image: usageImage("loncheras", "Loncheras"), sizeSlug: "grande" },
    { id: "u2", title: "Termos y botellas", image: usageImage("termos-botellas", "Termos y botellas"), sizeSlug: "grande" },
    { id: "u3", title: "Cuadernos y libros", image: usageImage("cuadernos-libros", "Cuadernos y libros"), sizeSlug: "grande" },
    { id: "u4", title: "Útiles escolares", image: usageImage("utiles-escolares", "Útiles escolares"), sizeSlug: "pequena" },
    { id: "u5", title: "Mochilas y bolsas", image: usageImage("mochilas-bolsas", "Mochilas y bolsas"), sizeSlug: "grande" },
    { id: "u6", title: "Ropa y uniformes", image: usageImage("ropa-uniformes", "Ropa y uniformes"), sizeSlug: "pequena" },
    { id: "u7", title: "Juguetes", image: usageImage("juguetes", "Juguetes"), sizeSlug: "pequena" },
    { id: "u8", title: "¡Y mucho más!", image: null, sizeSlug: "extra-pequenas" },
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
      title: "Escriba el nombre",
      desc: "y elija su diseño favorito.",
      icon: "pencil",
    },
    {
      id: "s2",
      title: "Elija el tamaño",
      desc: "y confirme su pedido.",
      icon: "bag",
    },
    {
      id: "s3",
      title: "Reciba en casa",
      desc: "en pocos días.",
      icon: "package",
    },
    {
      id: "s4",
      title: "Aplique y listo",
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
      pre: "Ahorre más en su compra",
      highlight: "50 % OFF",
      post: "3ra hoja",
      featured: false,
    },
    {
      id: "p2",
      title: "Mejor precio",
      pre: "Lleva 4 hojas y paga 3",
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
  stats: [
    { id: "stat-1", title: "Familias atendidas", value: "+2.500", icon: "house" },
    { id: "stat-2", title: "de experiencia en Ecuador", value: "+6 años", icon: "badge" },
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
        "Limpie y seque la superficie, despegue la etiqueta y presione firmemente unos segundos. Listo.",
    },
    {
      // Objeción de fricción número uno de un pedido que se cierra por chat y
      // no por carrito. Va dentro de las seis visibles a propósito.
      id: "f10",
      title: "¿Es seguro pedir por WhatsApp?",
      answer:
        "Sí. Llevamos más de 6 años y más de 2.500 familias atendidas en todo Ecuador. Antes de imprimir le enviamos la vista previa para que la apruebe, y solo entonces se produce su pedido.",
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
        "Entre 24 y 48 horas hábiles después de aprobar el diseño, más el tiempo de envío a su ciudad.",
    },
    {
      id: "f9",
      title: "¿Puedo pedir con foto personalizada?",
      answer:
        "Sí. Envíenos la foto por WhatsApp con buena iluminación y la integramos al diseño de la etiqueta.",
    },
    {
      id: "f6",
      title: "¿Realizan envíos a otras ciudades?",
      answer:
        "Enviamos a todo Ecuador mediante courier. El costo depende de su ciudad y se lo confirmamos al hacer su pedido.",
    },
    {
      id: "f7",
      title: "¿Cómo se colocan las etiquetas?",
      answer:
        "Limpie y seque la superficie, despegue la etiqueta y presione firmemente por unos segundos. Listo.",
    },
    {
      id: "f8",
      title: "¿Qué métodos de pago aceptan?",
      answer:
        "Transferencia bancaria, depósito y pagos por la tienda en línea. Le compartimos los datos al confirmar su pedido.",
    },
  ],
};
