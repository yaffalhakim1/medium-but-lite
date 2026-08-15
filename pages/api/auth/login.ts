import { randomUUID } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
import { BASE_URL } from "@/config/api";

const serializeCookie = (
  name: string,
  value: string,
  { httpOnly = false }: { httpOnly?: boolean } = {}
) =>
  `${name}=${encodeURIComponent(value)}; Path=/; SameSite=Lax${
    httpOnly ? "; HttpOnly" : ""
  }`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body || {};
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required" });
  }

  try {
    // Mock auth: verify credentials against JSON Server (server-to-server,
    // so credentials never appear in the browser's URL/history).
    const query = new URLSearchParams({ email, password }).toString();
    const response = await fetch(`${BASE_URL}/profile?${query}`);
    if (!response.ok) {
      return res.status(502).json({ message: "Upstream error" });
    }
    const users = await response.json();
    const user = Array.isArray(users) ? users[0] : null;

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Create a server-side session row — revocable and verifiable.
    const session = {
      token: randomUUID(),
      userId: user.id,
      role: user.role,
      createdAt: new Date().toISOString(),
    };
    const created = await fetch(`${BASE_URL}/sessions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(session),
    });
    const sessionRow = await created.json();

    if (!created.ok || !sessionRow?.token) {
      return res
        .status(502)
        .json({ message: "Failed to create session" });
    }

    // `session` is HttpOnly (not readable by JS). The rest are plain cookies
    // used only for UI cosmetics — the middleware/server never trusts them.
    res.setHeader("Set-Cookie", [
      serializeCookie("session", sessionRow.token, { httpOnly: true }),
      serializeCookie("user_id", String(user.id)),
      serializeCookie("role", user.role),
      serializeCookie("isPremium", String(Boolean(user.isPremiumUser))),
    ]);

    return res.status(200).json({
      id: user.id,
      role: user.role,
      name: user.name,
      isPremiumUser: Boolean(user.isPremiumUser),
    });
  } catch {
    return res.status(500).json({ message: "Login failed" });
  }
}
