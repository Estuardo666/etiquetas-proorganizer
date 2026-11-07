import { OrderProvider } from "@/components/order-provider";
import { NavbarWrapper } from "@/components/organisms/Navbar/NavbarWrapper";
import { SiteFooter } from "@/components/sitio/site-footer";
import { SiteHeader } from "@/components/sitio/site-header";
import { Medicion } from "@/components/sitio/piezas";
import { ajustesSitio } from "@/lib/catalogo";
import { getSiteContent } from "@/lib/wp";

/** Layout del sitio nuevo. La página aprobada de `/` queda fuera de este grupo. */
export default async function SitioLayout({ children }: { children: React.ReactNode }) {
  const content = await getSiteContent();
  const settings = ajustesSitio(content.settings);

  return (
    <OrderProvider number={settings.brand.whatsappNumber} messages={settings.whatsapp}>
      <Medicion />
      <NavbarWrapper>
        <SiteHeader settings={settings} />
      </NavbarWrapper>
      <main>{children}</main>
      <SiteFooter settings={settings} />
    </OrderProvider>
  );
}
