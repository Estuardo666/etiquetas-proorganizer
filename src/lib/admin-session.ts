import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "proorg_admin_bar_session";
export const ADMIN_SESSION_TTL_SECONDS = 8 * 60 * 60;
export const ADMIN_EXCHANGE_TTL_SECONDS = 5 * 60;

const ALLOWED_ROLES = new Set(["administrator", "editor", "proadmin"]);

export interface AdminTokenPayload {
  id: number;
  name: string;
  roles: string[];
  exp: number;
}

function getSecret(): string | null {
  const secret = process.env.WP_ADMIN_SECRET?.trim();
  return secret && secret.length >= 32 ? secret : null;
}

function encodeBase64Url(value: string | Buffer): string {
  return Buffer.from(value).toString("base64url");
}

function signSegment(segment: string, secret: string): string {
  return createHmac("sha256", secret).update(segment).digest("base64url");
}

function signaturesMatch(expected: string, received: string): boolean {
  const expectedBuffer = Buffer.from(expected, "utf8");
  const receivedBuffer = Buffer.from(received, "utf8");
  return (
    expectedBuffer.length === receivedBuffer.length &&
    timingSafeEqual(expectedBuffer, receivedBuffer)
  );
}

function isPayload(value: unknown): value is AdminTokenPayload {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;

  const record = value as Record<string, unknown>;
  const keys = Object.keys(record);
  if (keys.some((key) => !["id", "name", "roles", "exp"].includes(key))) return false;

  return (
    Number.isInteger(record.id) &&
    typeof record.id === "number" &&
    record.id > 0 &&
    typeof record.name === "string" &&
    record.name.trim().length > 0 &&
    record.name.length <= 100 &&
    Array.isArray(record.roles) &&
    record.roles.length > 0 &&
    record.roles.length <= 10 &&
    record.roles.every(
      (role) => typeof role === "string" && role.length > 0 && role.length <= 50,
    ) &&
    Number.isInteger(record.exp) &&
    typeof record.exp === "number"
  );
}

export function verifyAdminToken(
  token: string | null | undefined,
  maxFutureSeconds = ADMIN_SESSION_TTL_SECONDS + 60,
): AdminTokenPayload | null {
  const secret = getSecret();
  if (!secret || !token || token.length > 4096) return null;

  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [payloadSegment, signature] = parts;
  if (!/^[A-Za-z0-9_-]+$/.test(payloadSegment) || !/^[A-Za-z0-9_-]+$/.test(signature)) {
    return null;
  }

  const expected = signSegment(payloadSegment, secret);
  if (!signaturesMatch(expected, signature)) return null;

  try {
    const decoded: unknown = JSON.parse(Buffer.from(payloadSegment, "base64url").toString("utf8"));
    if (!isPayload(decoded)) return null;

    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp <= now || decoded.exp > now + maxFutureSeconds) return null;
    if (!decoded.roles.some((role) => ALLOWED_ROLES.has(role))) return null;

    return {
      id: decoded.id,
      name: decoded.name.trim(),
      roles: [...decoded.roles],
      exp: decoded.exp,
    };
  } catch {
    return null;
  }
}

export function createAdminSessionToken(user: AdminTokenPayload): string | null {
  const secret = getSecret();
  if (!secret) return null;

  const payload: AdminTokenPayload = {
    id: user.id,
    name: user.name,
    roles: user.roles,
    exp: Math.floor(Date.now() / 1000) + ADMIN_SESSION_TTL_SECONDS,
  };
  const segment = encodeBase64Url(JSON.stringify(payload));
  return `${segment}.${signSegment(segment, secret)}`;
}

export async function readAdminSession(): Promise<AdminTokenPayload | null> {
  const token = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;
  return verifyAdminToken(token);
}

export function isSafeReturnTo(value: string | null): value is string {
  return Boolean(
    value &&
      value.length <= 2048 &&
      value.startsWith("/") &&
      !value.startsWith("//") &&
      !value.includes("\\") &&
      !/[\u0000-\u001f\u007f]/.test(value),
  );
}

export function getWordPressUrl(): URL | null {
  // La URL pública conserva HTTPS para los enlaces del navegador aunque el
  // endpoint GraphQL local use HTTP para evitar el certificado autofirmado.
  const configured = process.env.NEXT_PUBLIC_WP_URL ?? process.env.WP_GRAPHQL_URL;
  if (!configured) return null;

  try {
    const url = new URL(configured);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    return new URL(url.origin);
  } catch {
    return null;
  }
}

export function wordpressAdminUrl(path: string): string | null {
  const base = getWordPressUrl();
  if (!base || !path.startsWith("/wp-admin/")) return null;
  return new URL(path, base).toString();
}
