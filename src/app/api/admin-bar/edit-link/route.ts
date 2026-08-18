import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { readAdminSession, wordpressAdminUrl } from "@/lib/admin-session";
import { getEditableNodeByUri } from "@/lib/wp";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const OPTIONS_PAGES: Record<string, { slug: string; label: string }> = {
  "/": { slug: "proorg", label: "Editar landing" },
};

const TYPE_LABELS: Record<string, string> = {
  Post: "Editar entrada",
  Page: "Editar página",
  MediaItem: "Editar medio",
  PoSize: "Editar tamaño",
  PoUsage: "Editar uso",
  PoDesign: "Editar diseño",
  PoStep: "Editar paso",
  PoPromo: "Editar promoción",
  PoGalleryItem: "Editar muestra real",
  PoStat: "Editar cifra de confianza",
  PoTestimonial: "Editar testimonio",
  PoFaq: "Editar pregunta frecuente",
};

const NO_STORE_HEADERS = { "Cache-Control": "private, no-store, max-age=0" };
const EMPTY_RESULT = { editUrl: null, editLabel: null };

function normalizePath(value: string | null): string | null {
  if (
    !value ||
    value.length > 2048 ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\") ||
    /[\u0000-\u001f\u007f]/.test(value)
  ) {
    return null;
  }

  const path = value.split(/[?#]/, 1)[0].replace(/\/{2,}/g, "/");
  if (path === "/") return path;
  return path.replace(/\/$/, "");
}

export async function GET(request: NextRequest) {
  const session = await readAdminSession();
  if (!session) {
    return NextResponse.json(EMPTY_RESULT, { status: 401, headers: NO_STORE_HEADERS });
  }

  const path = normalizePath(request.nextUrl.searchParams.get("path"));
  if (!path) {
    return NextResponse.json(EMPTY_RESULT, { headers: NO_STORE_HEADERS });
  }

  const optionsPage = OPTIONS_PAGES[path];
  if (optionsPage) {
    const editUrl = wordpressAdminUrl(
      `/wp-admin/admin.php?page=${encodeURIComponent(optionsPage.slug)}`,
    );
    return NextResponse.json(
      editUrl ? { editUrl, editLabel: optionsPage.label } : EMPTY_RESULT,
      { headers: NO_STORE_HEADERS },
    );
  }

  const node = await getEditableNodeByUri(`${path}/`);
  const editLabel = node ? TYPE_LABELS[node.__typename] : null;
  const editUrl = node
    ? wordpressAdminUrl(`/wp-admin/post.php?post=${node.databaseId}&action=edit`)
    : null;

  return NextResponse.json(
    editUrl && editLabel ? { editUrl, editLabel } : EMPTY_RESULT,
    { headers: NO_STORE_HEADERS },
  );
}
