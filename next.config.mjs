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
    // `pathname` y `port` explícitos: sin ellos el optimizador rechazaba las
    // fotos servidas desde `wp-content/uploads` con "url parameter is not
    // allowed", que es el error que da un patrón que no llega a casar.
    remotePatterns: [
      { protocol: "https", hostname: wpHost, port: "", pathname: "/**" },
      { protocol: "http", hostname: wpHost, port: "", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", port: "", pathname: "/**" },
    ],
  },
};

export default nextConfig;
