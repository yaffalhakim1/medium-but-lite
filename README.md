# Medium Lite

A Medium-style news portal built with Next.js — user portal (news, likes, shares,
subscription/payment demo) + admin CMS (posts, subscriptions, transactions).

This is the implementation of the [Next.js News Portal assignment](./Assignment-Nextjs-News.md).

## Tech Used

- **Next.js 14** (TypeScript, App Router pages, ISR for news details)
- **Tailwind CSS** + daisyUI
- **SWR** for data fetching & caching
- **Zustand** for UI auth state
- **json-server** (mock REST API backend, `db.json`)
- **Cloudinary** (unsigned preset — image uploads for posts)
- **Jest** + React Testing Library

## How to run

You need two processes: the JSON Server mock API and the Next.js app.

### 1. Backend (JSON Server)

```bash
pnpm install
pnpm db        # serves db.json at http://localhost:8080
```

### 2. Frontend (Next.js)

```bash
cp .env.example .env.local   # set NEXT_PUBLIC_API_URL=http://localhost:8080
pnpm dev                     # http://localhost:3000
```

Without a `.env.local`, the app falls back to the hosted mock API
(`https://jsonmedium.vercel.app`).

### Tests

```bash
pnpm test       # unit tests (validators, smoke)
pnpm coverage   # HTML coverage report in /coverage
```

## Mock auth & payments (important)

This project uses **mock authentication** via JSON Server (per the assignment spec):

- `POST /api/auth/login` verifies credentials server-side against JSON Server and
  issues an **HttpOnly session cookie** backed by a `sessions` collection — the
  browser never generates tokens and can never claim a role itself.
- `POST /api/auth/register` validates input and **forces the `user` role**
  (self-registration as admin is not possible).
- Admin routes are protected by `middleware.ts`, which checks the session row
  **and** the `admin` role before serving `/admin/*`.
- Passwords are stored in plain text in `db.json` — this is a mock backend, not
  production auth. Do not use real credentials here.
- **Payments are a demo**: the QR code encodes the invoice URL, and transaction
  status is advanced manually by an admin (process → success/cancelled). No real
  money moves.

## Demo accounts (from db.json)

| Role  | Email             | Password |
| ----- | ----------------- | -------- |
| admin | john@example.com  | admin    |
| user  | alice@example.com | alice    |

## Assignment feature checklist

- [x] Admin: login/logout, manage subscriptions (view/deactivate)
- [x] Admin: manage posts (list, detail, create, edit, delete) with title ≤20,
  description ≤200, max 2 categories, one 1920x1080 image, max 1 premium post
- [x] Admin: manage transactions (list, accept/reject processed, filter by date/status)
- [x] Admin: role-based authorization (server-enforced via session)
- [x] User: login, logout, register (name/email/password/confirm/address/phone/referral)
- [x] User: home — trending (top 5 by likes), search, category + paid/unpaid filters,
      date sorting, pagination, reading history (deduped)
- [x] User: news detail — like/share counters, premium gating for guests,
      recommended news (3 items based on likes)
- [x] User: subscription plans → QR payment (demo) → invoice + success/failure dialog
- [x] User: profile page
- [x] Next.js + TS, responsive, reusable components (Card, Modal, PostForm, Table)
- [x] Tests (validators + smoke), deployed via Vercel
