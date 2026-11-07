import Image from "next/image";
import Link from "next/link";
import { NAVEGACION, PRODUCTOS } from "@/lib/catalogo";
import { SHOP_URL } from "@/lib/site-config";
import { buildWhatsAppUrl, formatPhoneLocal } from "@/lib/utils";
import type { Settings } from "@/lib/types";

const enlace = "focus-ring inline-flex min-h-[32px] items-center rounded text-white underline-offset-4 hover:underline";

function Columna({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-[15px] font-bold text-white">{titulo}</h2>
      <ul className="mt-2 text-[14.5px]">{children}</ul>
    </div>
  );
}

/** Pie compacto: sin bloques promocionales, todo el texto en blanco. */
export function SiteFooter({ settings }: { settings: Settings }) {
  const { brand, footer } = settings;
  const redes = [
    ["Instagram", brand.instagram],
    ["Facebook", brand.facebook],
    ["TikTok", brand.tiktok],
  ];

  return (
    <footer className="bg-[var(--c-accent)] pt-10 pb-24 text-white md:pb-8">
      <div className="container-page">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr]">
          <div className="col-span-2 lg:col-span-1">
            {brand.footerLogo?.url ? (
              <Image src={brand.footerLogo.url} alt={brand.footerLogo.alt || brand.logoText} width={220} height={80} className="h-auto w-[220px]" />
            ) : null}
            <p className="mt-3 text-[14.5px]">Porque cuando todo tiene un nombre, es más fácil que vuelva a casa.</p>
          </div>

          <Columna titulo="Productos">
            {PRODUCTOS.map((item) => (
              <li key={item.slug}><Link className={enlace} href={item.ruta}>{item.nombre}</Link></li>
            ))}
            <li><Link className={enlace} href="/arme-su-pedido">Arme su pedido</Link></li>
          </Columna>

          <Columna titulo="Ayuda">
            {NAVEGACION.slice(PRODUCTOS.length).map((item) => (
              <li key={item.href}><Link className={enlace} href={item.href}>{item.label}</Link></li>
            ))}
          </Columna>

          <Columna titulo="Contacto">
            <li>
              <a className={enlace} href={buildWhatsAppUrl({ number: brand.whatsappNumber, message: settings.whatsapp.msgFooter })} target="_blank" rel="noopener">
                {formatPhoneLocal(brand.phone1)}
              </a>
            </li>
            <li>{footer.waText}</li>
            <li>{brand.address}</li>
            <li><a className={enlace} href={SHOP_URL} target="_blank" rel="noopener">Comprar en la tienda</a></li>
            <li><a className={enlace} href={brand.webUrl}>Servicios de organización</a></li>
          </Columna>

          <Columna titulo="Síganos">
            {redes.map(([nombre, href]) => (
              <li key={nombre}><a className={enlace} href={href} target="_blank" rel="noopener">{nombre}</a></li>
            ))}
          </Columna>
        </div>

        <div className="mt-8 flex flex-wrap justify-between gap-3 border-t border-white/25 pt-4 text-[13.5px]">
          <p>{footer.copyright.replace("{year}", String(new Date().getFullYear()))}</p>
          <p className="flex gap-4">
            <Link className={enlace} href="/privacidad">Privacidad</Link>
            <Link className={enlace} href="/terminos">Términos</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
