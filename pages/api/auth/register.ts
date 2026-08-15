import { NextApiRequest, NextApiResponse } from "next";
import { BASE_URL } from "@/config/api";
import {
  validateAddress,
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
} from "@/lib/helper/validators";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const {
    name,
    email,
    password,
    confirm_password,
    phone,
    address,
    referral,
  } = req.body || {};

  // Server-side validation (mirrors the client form).
  const errors: string[] = [];
  if (validateName(name ?? "")) errors.push(validateName(name ?? "")!);
  if (validateEmail(email ?? "")) errors.push(validateEmail(email ?? "")!);
  if (validatePassword(password ?? ""))
    errors.push(validatePassword(password ?? "")!);
  if (password !== confirm_password)
    errors.push("Confirmation password didn't match");
  if (validatePhone(phone ?? "")) errors.push(validatePhone(phone ?? "")!);
  if (validateAddress(address ?? ""))
    errors.push(validateAddress(address ?? "")!);

  if (errors.length > 0) {
    return res.status(400).json({ message: errors.join(", ") });
  }

  try {
    // Duplicate-email check BEFORE creating the account.
    const existing = await fetch(
      `${BASE_URL}/profile?email=${encodeURIComponent(email)}`
    );
    const existingUsers = await existing.json();
    if (Array.isArray(existingUsers) && existingUsers.length > 0) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // Role is enforced server-side — clients cannot self-assign "admin".
    const created = await fetch(`${BASE_URL}/profile`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
        phone,
        address,
        referral: referral || "",
        role: "user",
        isPremiumUser: false,
        news: [],
        likes: [],
        subscriptionPlan: { type: "", expired_date: "" },
      }),
    });

    if (!created.ok) {
      return res.status(502).json({ message: "Failed to create account" });
    }

    return res.status(201).json({ message: "Account created" });
  } catch {
    return res.status(500).json({ message: "Register failed" });
  }
}
