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
2. Create **3 products**, each with a single **one-off** price (GBP):
   - **Class** — 30 journals — **£249**
   - **Year Group** — 60 journals — **£475**
   - **Whole School** — 90 journals — **£675**
3. Copy the 3 **live** `price_…` IDs (you'll paste them as env vars in step 6).
4. Get your **live secret key** (`sk_live_…`).
5. Developers → **Webhooks** → Add endpoint (in **Live mode**):
   - URL `https://blockspublishing.com/api/stripe-webhook`
   - Event `checkout.session.completed`
   - Copy the **Signing secret** (`whsec_…`).
   (The webhook emails your team the sponsorship + nominated school so you can
   confirm with the school before dispatch.)

## 6. Set env vars in Vercel  **[you]** → then redeploy
Settings → Environment Variables (Production):

| Name | Value |
|---|---|
| `STRIPE_SECRET_KEY` | `sk_live_…` |
| `STRIPE_PRICE_CLASS` | live price id for the £249 / 30-book tier |
| `STRIPE_PRICE_YEARGROUP` | live price id for the £475 / 60-book tier |
| `STRIPE_PRICE_WHOLESCHOOL` | live price id for the £675 / 90-book tier |
| `STRIPE_WEBHOOK_SECRET` | `whsec_…` (live, from step 5) |
| `SITE_URL` | `https://blockspublishing.com` |
| `RESEND_API_KEY` | `re_…` (for the form + sponsorship-notification emails) |
| `CONTACT_TO_EMAIL` | where enquiries + sponsorship alerts land *(optional)* |
| `PARENTS_FROM_EMAIL` | `Story Blocks <hello@blockspublishing.com>` *(optional)* |

**Redeploy** after saving so the new values take effect. (There is no basket,
no per-journal SKU, and no Parents' Corner access code any more — the old
`STRIPE_PRICE_STANDARD_*` / `_GOLD_*`, `PARENTS_ACCESS_CODE`, `ADMIN_API_TOKEN`
and `UPSTASH_*` vars are no longer read by the sponsorship flow.)

## 7. Content — the Parents' Corner / resources PDFs  **[you]**
The download buttons are currently shown as **"Coming soon"** (disabled), so
nothing 404s. When ready: drop these into `/public` and flip `DOWNLOADS_READY`
to `true` in `src/parents.jsx` and `src/resources.jsx`:
`Story-Blocks-Story-Starters.pdf`, `Story-Blocks-Reward-Chart.pdf`,
`Story-Blocks-Parent-Guides.pdf`.

## 8. Build the school index  **[you]**
The school type-ahead ships with a small **seed** of real primary schools so it
works out of the box. For the full UK register, download the DfE GIAS
"All establishment data" CSV from
<https://get-information-schools.service.gov.uk/Downloads> and run:
`node scripts/build-schools-index.mjs path/to/edubasealldata.csv`
That overwrites `public/schools-index.json` with every open primary school
(name, town, postcode, URN). Commit + redeploy.

## 9. Test the live flow  **[you]**
1. On `blockspublishing.com`, choose a tier → nominate a school → pay with a
   **real card** (then refund yourself in Stripe).
2. Confirm: checkout completes → you land on `/thanks` → you receive the
   sponsorship-notification email (tier, sponsor, nominated school + URN).
3. Submit the **register-your-school** form and confirm it emails your inbox.

---

### Env var reference (what reads what)
- **checkout**: `STRIPE_SECRET_KEY`, `STRIPE_PRICE_CLASS|YEARGROUP|WHOLESCHOOL`, `SITE_URL`
- **stripe-webhook**: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY`,
  `CONTACT_TO_EMAIL`, `PARENTS_FROM_EMAIL`
- **contact** (contact / wholesale / school registration forms): `RESEND_API_KEY`,
  `CONTACT_TO_EMAIL`, `PARENTS_FROM_EMAIL`, `UPSTASH_*` *(optional rate limiting)*
