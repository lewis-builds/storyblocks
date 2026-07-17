# Putting the Story Blocks site live with Stripe — step by step

The site is now a proper Vite app: the code lives in `src/`, images and the design
system live in `public/`, and Vercel builds it for you. You'll click around three
websites: GitHub, Vercel, Stripe. Set aside ~45 minutes. Do the steps in order.

> **Working on it locally first?** You need Node installed. Then, in this folder:
> `npm install` once, `npm run dev` to preview at http://localhost:5173,
> and `npm run build` to produce the `dist/` folder Vercel will make in the cloud.
> You do **not** need to run these to deploy — Vercel runs the build itself.

---

## Step 1 — Put the files on GitHub (the file cupboard)

GitHub holds your website's files. Vercel reads them from here.

1. Go to github.com → Sign up (free).
2. Click the green **New** button (or "+ → New repository").
3. Name it `story-blocks-site`, leave everything else, click **Create repository**.
4. Upload the project. **Two important don'ts:** do NOT upload the `node_modules`
   folder or the `dist` folder — they're big, rebuilt automatically, and already
   listed in `.gitignore`. Easiest ways:
   - **GitHub Desktop** (recommended, no typing): install it, "Add existing
     repository", point it at this folder, Commit, Publish. It respects
     `.gitignore` for you.
   - **Drag-and-drop in the browser:** on the repo page click "uploading an
     existing file", then drag in everything EXCEPT `node_modules` and `dist`
     (so: the `src`, `public`, and `api` folders, `index.html`, `schools.html`,
     `resources.html`, `thanks.html`, `package.json`, `vite.config.js`,
     `vercel.json`, `.gitignore`, `DEPLOY.md`).
5. Commit changes.

## Step 2 — Put the site live with Vercel (the shop window)

Vercel turns those files into a live website: it runs the build, hosts the pages,
and runs the little program in `/api` that talks to Stripe.

1. Go to vercel.com → **Sign up** → **Continue with GitHub**.
2. Click **Add New… → Project**.
3. Find `story-blocks-site` → click **Import**.
4. Vercel auto-detects the setup (Framework: **Vite**, Build: `npm run build`,
   Output: `dist` — all from `vercel.json`, no need to change them).
5. BEFORE clicking Deploy, open **Environment Variables** and add:
   - `STRIPE_SECRET_KEY` → from Stripe → Developers → API keys. Start with the
     **TEST** key, it begins `sk_test_…`.
   - `SITE_URL` → leave blank for now; we fill it in a moment.
6. Click **Deploy**. Wait a minute. Vercel gives you an address like
   `https://story-blocks-site.vercel.app` — that's your live site.
7. Go to **Settings → Environment Variables**, edit `SITE_URL`, paste that
   address (no trailing slash), then **Deployments → ⋯ → Redeploy**.

## Step 3 — Make the four products in Stripe

1. Log into stripe.com. Top-right, make sure **Test mode** is ON.
2. **Product catalogue → Add product**, four times:
   - Story Blocks Journal — £19.99
   - Story Blocks Journal — 2-pack — £35.98
   - Gold Edition — £24.99
   - Gold Edition — 2-pack — £44.98
3. Click into each product and copy its **price id** (looks like `price_1Abc…`).
4. On GitHub, open `api/checkout.js`, click the ✏️ pencil, and paste each price id
   over its matching `price_PASTE_ME_…` placeholder:
   - `standard-1` → the single Journal · `standard-2` → the Journal 2-pack
   - `gold-1` → the single Gold · `gold-2` → the Gold 2-pack
5. **Commit changes** — Vercel notices and re-publishes by itself.

## Step 4 — Try it!

1. Open your vercel.app address → add journals to the basket → **Checkout**.
2. You should land on Stripe's payment page. Pay with the test card
   `4242 4242 4242 4242`, any future date, any CVC.
3. You're returned to `/thanks.html` and the payment shows in your Stripe test
   dashboard. 🎉

## Step 5 — Go live (when you're ready)

1. In Stripe, switch Test mode OFF and repeat Step 3 (products exist per mode),
   pasting the **live** price ids into `api/checkout.js`.
2. In Vercel, change `STRIPE_SECRET_KEY` to your live key (`sk_live_…`) → Redeploy.
3. Point your own domain at the site in Vercel → **Settings → Domains**, then
   update `SITE_URL` to that domain and redeploy.
   - **SEO domain:** every page's canonical / Open Graph URLs, plus `sitemap.xml`
     and `robots.txt`, are set to `https://blockspublishing.com`. If your live
     domain differs, do one find-and-replace of `https://blockspublishing.com`
     across the project and redeploy.
   - After launch, submit `https://blockspublishing.com/sitemap.xml` in Google
     Search Console, and check the Product/FAQ markup with Google's Rich Results
     Test (search.google.com/test/rich-results).
4. Optional, recommended later: a Stripe webhook for order records + emailing
   buyers their Parents' Corner access code — the recipe is in
   `api/checkout.example.js`.

---

**If the Checkout button shows a "demo mode" message**, the site couldn't reach
`/api/checkout`. That almost always means Step 2's environment variables or
Step 3's price ids need another look. The server also logs a clear reason
(missing key, missing `SITE_URL`, or placeholder price ids still in place) in
Vercel → your project → **Logs**.

**Swapping in real photos later:** the "coming soon" placeholders live at
`public/assets/placeholders/`. Replace those two files (keep the names) to update
every placeholder at once, or drop real images into `public/assets/` and point the
relevant `<image-slot src="…">` at them in `src/`.
