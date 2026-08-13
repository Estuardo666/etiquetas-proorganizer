/** @type {import('next').NextConfig} */
const wpHost = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_WP_URL ?? "https://etiquetas-escolares.local").hostname;
  } catch {
    return "etiquetas-escolares.local";
  }
})();

const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: wpHost },
      { protocol: "http", hostname: wpHost },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
