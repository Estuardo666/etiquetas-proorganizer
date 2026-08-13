import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

/**
 * Permite que WordPress refresque la caché tras guardar contenido:
 * POST /api/revalidate?secret=...
 */
export async function POST(request: Request) {
  const secret = new URL(request.url).searchParams.get("secret");
  const expected = process.env.REVALIDATE_SECRET;

  if (expected && secret !== expected) {
    return NextResponse.json({ revalidated: false, message: "Secreto inválido" }, { status: 401 });
  }

  revalidateTag("site-content", "max");
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
