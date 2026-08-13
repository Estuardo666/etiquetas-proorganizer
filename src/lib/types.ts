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
    previewNote: string;
  };
  header: { ctaText: string; navItems: string };
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
  stats: { stat1Value: string; stat1Label: string; stat2Value: string; stat2Label: string };
  sizes: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaText: string;
    usesLabel: string;
    sampleName: string;
  };
  usage: { title: string; subtitle: string };
  designs: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaText: string;
    featuredSub: string;
    featuredNote: string;
    featuredCta: string;
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
    ctaText: string;
  };
  process: { eyebrow: string; title: string; subtitle: string };
  pricing: {
    eyebrow: string;
    promoTitle: string;
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
    col1Title: string;
    col1Links: string;
    col2Title: string;
    col2Links: string;
    waTitle: string;
    waCta: string;
    waText: string;
    closing: string;
    copyright: string;
    legalLinks: string;
  };
  floating: { enabled: boolean; label: string; mobileText: string; mobileCta: string };
  seo: { title: string; description: string; ogImage: WpImage; canonical: string };
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
  testimonials: TestimonialItem[];
  faqs: FaqItem[];
};
