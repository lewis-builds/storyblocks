# Go-live checklist — Story Blocks

Work top to bottom. Anything marked **[you]** is a dashboard/DNS/secret task only
you can do. Secrets go **only** into Vercel → never into the repo or chat.

---

## 1. Deploy the latest code  **[done once pushed]**
Push `main` (GitHub Desktop or `git push`). Vercel auto-builds every push.
Confirm the build goes green in the Vercel dashboard.

## 2. Point the domain at Vercel  **[you]**
1. Vercel → Project → **Settings → Domains** → add `blockspublishing.com` and
   `www.blockspublishing.com`. Vercel shows the exact DNS records to use.
2. GoDaddy → DNS for blockspublishing.com, set what Vercel shows (typically):
   - `A`  `@`  → `216.198.79.1`
   - `CNAME` `www` → `1338b65ec8235e59.vercel-dns-017.com` *(use Vercel's exact target)*
   - **Leave MX / TXT / SPF / DMARC alone** — those are your email records.
3. Wait for Vercel to show the domain as **Valid** (usually minutes).

## 3. Storage for unique codes — Upstash Redis  **[you]**
Vercel → **Storage** tab → **Create Database → Upstash Redis** (free tier) →
connect it to this project. Vercel injects the connection env vars automatically
(`UPSTASH_REDIS_REST_URL`/`_TOKEN` or `KV_REST_API_URL`/`_TOKEN` — both are read).
*Skip and the site still works, just with one shared code instead of per-order.*

## 4. Email — Resend  **[you]**
1. resend.com → add domain `blockspublishing.com` → add the DNS records it shows
   at GoDaddy (a sending subdomain + DKIM; **doesn't touch your existing MX**).
2. Wait for **Verified**.
3. Create an API key (`re_…`).

## 5. Stripe — go live  **[you]**
1. Toggle Stripe to **Live mode** (top of dashboard).
2. Recreate the 4 products/prices in live mode — the fastest way is, in **Test
   mode**, open each product → ••• → **Copy to live mode**. Prices:
   - Standard single **£19.99**, Standard 2-pack **£35.98**
   - Gold single **£24.99**, Gold 2-pack **£44.98**
3. Copy the 4 **live** `price_…` IDs (you'll paste them as env vars in step 6).
4. Get your **live secret key** (`sk_live_…`).
5. Developers → **Webhooks** → Add endpoint (in **Live mode**):
   - URL `https://blockspublishing.com/api/stripe-webhook`
   - Event `checkout.session.completed`
   - Copy the **Signing secret** (`whsec_…`).

## 6. Set env vars in Vercel  **[you]** → then redeploy
Settings → Environment Variables (Production):

| Name | Value |
|---|---|
| `STRIPE_SECRET_KEY` | `sk_live_…` |
| `STRIPE_PRICE_STANDARD_1` | live single price id |
| `STRIPE_PRICE_STANDARD_2` | live 2-pack price id |
| `STRIPE_PRICE_GOLD_1` | live gold single price id |
| `STRIPE_PRICE_GOLD_2` | live gold 2-pack price id |
| `STRIPE_WEBHOOK_SECRET` | `whsec_…` (live, from step 5) |
| `SITE_URL` | `https://blockspublishing.com` |
| `RESEND_API_KEY` | `re_…` |
| `PARENTS_FROM_EMAIL` | `Story Blocks <hello@blockspublishing.com>` *(optional)* |
| `ADMIN_API_TOKEN` | long random string — `openssl rand -hex 24` |
| `PARENTS_ACCESS_CODE` | *(optional)* a master/test code for /parents |

`UPSTASH_*` come from step 3 automatically. **Redeploy** after saving so the new
values take effect.

## 7. Content — the Parents' Corner / resources PDFs  **[you]**
The download buttons are currently shown as **"Coming soon"** (disabled), so
nothing 404s. When ready: drop these into `/public` and flip `DOWNLOADS_READY`
to `true` in `src/parents.jsx` and `src/resources.jsx`:
`Story-Blocks-Story-Starters.pdf`, `Story-Blocks-Reward-Chart.pdf`,
`Story-Blocks-Parent-Guides.pdf`.

## 8. Test the live flow  **[you]**
1. On `blockspublishing.com`, buy one Standard with a **real card** (£19.99).
2. Confirm: order completes → you receive the code email → the code unlocks
   `/parents`.
3. Refund yourself in Stripe (Payments → the payment → Refund).
4. Spot-check `/api/admin-lookup` with your `ADMIN_API_TOKEN` (see api/admin-lookup.js).

---

### Env var reference (what reads what)
- **checkout**: `STRIPE_SECRET_KEY`, `STRIPE_PRICE_*`, `SITE_URL`
- **stripe-webhook**: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY`,
  `UPSTASH_*` (or `PARENTS_ACCESS_CODE` fallback), `SITE_URL`, `PARENTS_FROM_EMAIL`
- **unlock**: `UPSTASH_*` and/or `PARENTS_ACCESS_CODE`
- **admin-lookup**: `ADMIN_API_TOKEN`, `UPSTASH_*`
