/** @type {import('next').NextConfig} */
const wpHost = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_WP_URL ?? "https://etiquetas-escolares.local").hostname;
  } catch {
    return "etiquetas-escolares.local";
  }
})();

/**
 * Local (el entorno de WordPress) sirve el sitio en `*.local`, que resuelve a
 * 127.0.0.1. Next 16 se niega a optimizar imágenes de un host que resuelve a
 * una IP privada, y con razón: el optimizador acepta una URL del cliente, así
 * que sin ese cerrojo se convierte en un proxy para alcanzar servicios
 * internos que solo son accesibles desde el servidor (SSRF).
 *
 * Se abre solo en desarrollo. En producción WordPress vive en un dominio
 * público, la regla no estorba, y el cerrojo tiene que seguir puesto: si esto
 * quedara activo en el build, cualquiera podría pedir
 * `/_next/image?url=http://169.254.169.254/...` contra la red del servidor.
 */
const allowLocalUpstream = process.env.NODE_ENV === "development";

const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowLocalIP: allowLocalUpstream,
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
