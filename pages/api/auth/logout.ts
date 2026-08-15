import { NextApiRequest, NextApiResponse } from "next";
import { BASE_URL } from "@/config/api";

const clearCookie = (name: string) =>
  `${name}=; Path=/; Max-Age=0; SameSite=Lax`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const token = req.cookies.session;
  if (token) {
    try {
      // Revoke the server-side session so the token can't be reused.
      const found = await fetch(
        `${BASE_URL}/sessions?token=${encodeURIComponent(token)}`
      );
      const rows = await found.json();
      const row = Array.isArray(rows) ? rows[0] : null;
      if (row?.id) {
        await fetch(`${BASE_URL}/sessions/${row.id}`, { method: "DELETE" });
      }
    } catch {
      // Logout should never fail hard — cookies are cleared regardless.
    }
  }

  res.setHeader("Set-Cookie", [
    clearCookie("session"),
    clearCookie("user_id"),
    clearCookie("role"),
    clearCookie("isPremium"),
  ]);

  return res.status(200).json({ ok: true });
}
