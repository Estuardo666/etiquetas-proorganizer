import { NextResponse } from "next/server";
import { readAdminSession, wordpressAdminUrl } from "@/lib/admin-session";

export const dynamic = "force-dynamic";

const ADD_ITEMS = [
  { label: "Medio", path: "/wp-admin/media-new.php" },
  { label: "Tamaño", path: "/wp-admin/post-new.php?post_type=po_size" },
  { label: "Uso", path: "/wp-admin/post-new.php?post_type=po_usage" },
  { label: "Diseño", path: "/wp-admin/post-new.php?post_type=po_design" },
  { label: "Paso", path: "/wp-admin/post-new.php?post_type=po_step" },
  { label: "Promoción", path: "/wp-admin/post-new.php?post_type=po_promo" },
  { label: "Muestra real", path: "/wp-admin/post-new.php?post_type=po_gallery" },
  { label: "Cifra de confianza", path: "/wp-admin/post-new.php?post_type=po_stat" },
  { label: "Testimonio", path: "/wp-admin/post-new.php?post_type=po_testimonial" },
  { label: "Pregunta frecuente", path: "/wp-admin/post-new.php?post_type=po_faq" },
] as const;

const NO_STORE_HEADERS = { "Cache-Control": "private, no-store, max-age=0" };

export async function GET() {
  const session = await readAdminSession();
  if (!session) {
    return NextResponse.json({ dashboardUrl: null, addItems: [] }, { status: 401, headers: NO_STORE_HEADERS });
  }

  const dashboardUrl = wordpressAdminUrl("/wp-admin/");
  if (!dashboardUrl) {
    return NextResponse.json({ dashboardUrl: null, addItems: [] }, { headers: NO_STORE_HEADERS });
  }

  const addItems = ADD_ITEMS.flatMap((item) => {
    const href = wordpressAdminUrl(item.path);
    return href ? [{ label: item.label, href }] : [];
  });

  return NextResponse.json({ dashboardUrl, addItems }, { headers: NO_STORE_HEADERS });
}
