import { NextResponse } from "next/server";
import { readAdminSession } from "@/lib/admin-session";

export const dynamic = "force-dynamic";

const NO_STORE_HEADERS = { "Cache-Control": "private, no-store, max-age=0" };

export async function GET() {
  const session = await readAdminSession();
  if (!session) {
    return NextResponse.json({ authenticated: false }, { headers: NO_STORE_HEADERS });
  }

  return NextResponse.json(
    {
      authenticated: true,
      user: { id: session.id, name: session.name, roles: session.roles },
    },
    { headers: NO_STORE_HEADERS },
  );
}
