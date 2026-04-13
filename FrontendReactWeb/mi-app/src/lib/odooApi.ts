"use client";

export const ODOO_URL = process.env.NEXT_PUBLIC_ODOO_URL ?? "http://localhost:8079";
const AUTH_API_BASE = "/api/auth";

export function authPath(path: string): string {
  if (!path.startsWith("/")) {
    throw new Error(`Invalid auth path: ${path}`);
  }
  return `${AUTH_API_BASE}${path}`;
}

interface RequestOptions {
  sessionToken?: string;
  allowedStatuses?: number[];
}

export async function odooPost<TRes>(
  path: string,
  body: unknown,
  options: RequestOptions = {},
): Promise<TRes> {
  const response = await fetch(`${ODOO_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(options.sessionToken ? { "X-Auth-Session": options.sessionToken } : {}),
    },
    body: JSON.stringify(body),
    credentials: "include",
  });

  const allowed = options.allowedStatuses ?? [];
  if (!response.ok && !allowed.includes(response.status)) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json() as Promise<TRes>;
}

export async function odooGet<TRes>(path: string, options: RequestOptions = {}): Promise<TRes> {
  const response = await fetch(`${ODOO_URL}${path}`, {
    method: "GET",
    headers: options.sessionToken ? { "X-Auth-Session": options.sessionToken } : undefined,
    credentials: "include",
  });

  const allowed = options.allowedStatuses ?? [];
  if (!response.ok && !allowed.includes(response.status)) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json() as Promise<TRes>;
}
