# Implementation Plan — medium-but-lite fix

**Repo:** `C:\Users\yafit\Documents\Learn\frontend\medium-but-lite`
**Context:** Assignment-Nextjs-News.md — Next.js + TS frontend, JSON Server mock backend,
mock auth (REQUIRED by spec lines 111-112, 122). Fix = correct + clean implementation
of the assignment, not a backend rewrite.
**Branch:** `fix/cleanup` (main untouched; Yafi reviews & merges)

## A. Auth hardening (within mock-auth constraint)

- **A1** `pages/api/auth/login.ts` (POST) — server-side credential check against JSON
  Server; on match create session row `POST {BASE_URL}/sessions` with
  `crypto.randomUUID()` token; set HttpOnly+SameSite=Lax cookie `session=<token>`;
  response returns `{id, role, name}`. No more password in browser-visible query string,
  no more client-generated `Math.random()` token.
- **A2** `pages/api/auth/register.ts` (POST) — server-side validation (email, password ≥8,
  confirm match, name ≥2, phone 10-12, address ≥10), duplicate-email check BEFORE
  create, **strip `role` from payload (always "user")**. Client register page drops
  role/isPremiumUser/news from the body.
- **A3** `pages/api/auth/logout.ts` (POST) — delete session row + clear cookie.
- **A4** `middleware.ts` — protect `/admin` prefix (not exact match) by verifying
  `session` cookie → session row → role==="admin"; add `config.matcher`; fix cookie
  delete semantics. Auth guard on login page too.
- **A5** `pages/auth/login.tsx` / `Header.tsx` — call new API routes; client never
  writes role/token cookies; `user_id` cookie set by server only.

## B. Critical bug fixes

- **B1** `pages/admin/transactions.tsx` — Reject must NOT grant premium (currently
  `handleAcceptOrReject` always sets `isPremiumUser: true`). Split accept/reject.
  Fix `{status === "success" && "cancelled"}` → `||`. Unify `"canceled"` → `"cancelled"`.
- **B2** `pages/plans/payment/[id].tsx` — use transaction from URL id + ownership check
  (`profileId === current user`), not "last element of global list". Wire success/failed
  dialogs per assignment (spec line 95-96).
- **B3** `pages/plans/index.tsx` — after POST transaction, navigate to
  `/plans/payment/<txId>`; QR value becomes transaction-specific mock payload; fix
  stale `transactionMutate(transactionDetail)` → refetch.
- **B4** `pages/auth/register.tsx` — `Number(pass) < 8` → real length check; confirm
  password compares actual values (currently compares booleans); referral field
  `type="email"` → text; phone/address sanity.
- **B5** `pages/news/[id].tsx` — like-button initial state from `news.likes` (currently
  `undefined` → always renders red heart); recommendation N+1 → single `GET /news` +
  in-memory filter; `fallback: "blocking"` so new posts aren't 404.
- **B6** `pages/index.tsx` — reading-history dedupe (Set + functional update), no
  duplicate IDs.

## C. Data layer & correctness

- **C1** `config/fetcher.ts` — rethrow errors so SWR error state works (currently
  swallows → silent blank pages).
- **C2** `config/api.ts` — `BASE_URL` from `NEXT_PUBLIC_API_URL` env with fallback;
  remove commented LAN IP.
- **C3** `package.json` — next 14.0.3 → **14.2.25** (CVE-2025-29927); drop vitest
  (keep jest); ts-node/vite-tsconfig-paths → devDeps; remove LAN IP from `db` script.

## D. Cleanup (verified dead code)

- **D1** Delete: `components/NewsCard.tsx`, `components/NewsFilter.tsx`,
  `lib/hooks/useFormValidation.ts` (0 import sites), `pages/api/news.ts` stub,
  `pages/api/hello.ts`, dead `useSWRInfinite` import. Keep + wire success/failed pages.
- **D2** `layout.tsx` — unused font imports, `taviraj` var actually Plus_Jakarta_Sans.
- **D3** `admin/index.tsx` — `{"userName"}`/`{"email"}` placeholders → real session user.
- **D4** `.gitattributes` (`* text=auto`) + `git add --renormalize` — kill CRLF noise
  (whole tree shows modified; includes Yafi's 2 lint fixes).

## E. Tests (assignment requires coverage screenshot, spec line 22)

- **E1** Unit tests for `lib/helper/validators.ts` (all 7 validators).
- **E2** Keep + repair existing jest/RTL smoke test.

## F. Docs

- **F1** README — run instructions (pnpm install, `pnpm db`, `pnpm dev`), env var,
  feature checklist mapped to assignment.

## Execution order

1. D4 (normalize) → 2. A1-A5 + B (core fixes) → 3. C → 4. D1-D3 → 5. E → 6. F1

## Risks

- jsonmedium.vercel.app availability → dev uses local `db.json` (`pnpm db`); BASE_URL
  overridable via env.
- Middleware→json-server fetch adds latency to admin nav → acceptable for mock; client
  fallback guard on admin pages.
- pnpm-lock churn from local pnpm version → minimize by not re-installing unless needed.
