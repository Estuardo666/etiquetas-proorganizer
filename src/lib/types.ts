export type WpImage = {
  url: string;
  alt: string;
  width: number;
  height: number;
} | null;

/**
 * Espejo exacto del esquema del plugin (`proorg/schema.php`). Aquí solo hay
 * campos que algún componente pinta: un campo que nadie usa es un campo que el
 * cliente edita sin ver el cambio. Lo vigila `npm run check:contract`.
 */
export type Settings = {
  brand: {
    logo: WpImage;
    footerLogo: WpImage;
    logoText: string;
    whatsappNumber: string;
    phone1: string;
    phone1Label: string;
    phone2: string;
    phone2Label: string;
    webUrl: string;
    instagram: string;
    facebook: string;
    tiktok: string;
    address: string;
  };
  whatsapp: {
    msgNav: string;
    msgHero: string;
    msgSizes: string;
    msgDesigns: string;
    msgCost: string;
    msgPromos: string;
    msgFinalCta: string;
    msgFooter: string;
    msgSizeTemplate: string;
    msgDesignTemplate: string;
    previewNote: string;
  };
  palette: {
    textColor: string;
    purpleColor: string;
    pinkColor: string;
    grayColor: string;
    greenColor: string;
    blueColor: string;
  };
  header: { ctaText: string; shortCtaText: string };
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    bullets: string;
    priceLabel: string;
    priceValue: string;
    priceSuffix: string;
    ctaPrimary: string;
    ctaSecondary: string;
    note: string;
    sheetNote: string;
    promoNote: string;
    deliveryNote: string;
    image: WpImage;
  };
  trust: { eyebrow: string; title: string; items: string };
  sizes: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaText: string;
    selectedLabel: string;
    orderCtaTemplate: string;
    usesLabel: string;
    sampleName: string;
  };
  usage: { title: string; subtitle: string };
  designs: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaText: string;
    selectedCtaTemplate: string;
    featuredSub: string;
    featuredNote: string;
    featuredCta: string;
  };
  personalization: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    image: WpImage;
    featureItems: string;
    guideBadge: string;
    guideTitle: string;
    guideText: string;
    guideCta: string;
    guideUrl: string;
    approvalText: string;
  };
  cost: {
    eyebrow: string;
    title: string;
    subtitle: string;
    prices: string;
    closing: string;
    pricesNote: string;
    badTitle: string;
    badItems: string;
    goodTitle: string;
    goodItems: string;
    badTabLabel: string;
    goodTabLabel: string;
    ctaText: string;
  };
  process: { eyebrow: string; title: string; subtitle: string };
  pricing: {
    eyebrow: string;
    promoTitle: string;
    /** Rótulo del panel rojo de promociones. */
    promosLabel: string;
    priceSticker: string;
    priceTitle: string;
    priceValue: string;
    priceSuffix: string;
    priceSub: string;
    ctaText: string;
    note: string;
  };
  gallery: { enabled: boolean; title: string; subtitle: string };
  testimonials: { eyebrow: string; title: string; ratingValue: string; ratingLabel: string };
  faq: { eyebrow: string; title: string; subtitle: string; linkText: string; linkUrl: string };
  finalCta: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    highlightColor: string;
    text: string;
    ctaPrimary: string;
    guarantees: string;
    seasonNote: string;
    seasonDeadline: string;
  };
  footer: {
    quote: string;
    socialTitle: string;
    storeTitle: string;
    storeText: string;
    storeCta: string;
    waTitle: string;
    waCta: string;
    waText: string;
    closing: string;
    copyright: string;
    legalLinks: string;
  };
  founder: {
    photo: WpImage;
    photoAlt: string;
    signature: WpImage;
    title: string;
    bio: string;
    guaranteeTitle: string;
    guaranteeText: string;
    ctaTitle: string;
    ctaText: string;
    ctaButton: string;
  };
  floating: { enabled: boolean; label: string; mobileText: string; mobileCta: string };
  seo: {
    title: string;
    description: string;
    productName: string;
    ogImage: WpImage;
    canonical: string;
  };
};

export type SizeItem = {
  id: string;
  slug: string;
  title: string;
  count: string;
  dims: string;
  uses: string;
  badge: string;
  accent: string;
  image: WpImage;
};

export type UsageItem = { id: string; title: string; image: WpImage; sizeSlug: string };
export type DesignItem = { id: string; title: string; image: WpImage; badge: string };
export type StepItem = { id: string; title: string; desc: string; icon: string };
export type PromoItem = {
  id: string;
  title: string;
  pre: string;
  highlight: string;
  post: string;
  featured: boolean;
};
export type GalleryItem = { id: string; title: string; image: WpImage };
export type StatItem = { id: string; title: string; value: string; icon: string };
export type TestimonialItem = {
  id: string;
  title: string;
  city: string;
  rating: string;
  text: string;
  avatar: WpImage;
};
export type FaqItem = { id: string; title: string; answer: string };

export type SiteContent = {
  settings: Settings;
  sizes: SizeItem[];
  usages: UsageItem[];
  designs: DesignItem[];
  steps: StepItem[];
  promos: PromoItem[];
  gallery: GalleryItem[];
  stats: StatItem[];
  testimonials: TestimonialItem[];
  faqs: FaqItem[];
};
