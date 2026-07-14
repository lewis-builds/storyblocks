/* =============================================================================
   Story Blocks — Stripe Checkout reference implementation (Option B)
   =============================================================================
   Two serverless endpoints. Deploy on Vercel / Netlify / Cloudflare Workers —
   shown here in Vercel (Node) style. `npm i stripe`.

   Environment variables (never in the front-end):
     STRIPE_SECRET_KEY      sk_live_…
     STRIPE_WEBHOOK_SECRET  whsec_…  (from the webhook endpoint you create)
     SITE_URL               https://blockspublishingltd.com
============================================================================= */

import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/* -----------------------------------------------------------------------------
   Server-side catalogue — the four SKUs. The browser only ever sends
   { sku, quantity }; prices live HERE (create the four Products/Prices once in
   the Stripe dashboard and paste their price IDs). The 2-pack saving is baked
   into the 2-pack price — no coupon needed.
----------------------------------------------------------------------------- */
const CATALOGUE = {
  'standard-1': { price: 'price_XXXX_standard_single_1999', name: 'Story Blocks Journal' },
  'standard-2': { price: 'price_XXXX_standard_2pack_3598', name: 'Story Blocks Journal — 2-pack' },
  'gold-1':     { price: 'price_XXXX_gold_single_2999',     name: 'Gold Edition' },
  'gold-2':     { price: 'price_XXXX_gold_2pack_5398',      name: 'Gold Edition — 2-pack' },
};

/* -----------------------------------------------------------------------------
   POST /api/checkout   body: { items: [{ sku: 'standard-1'|'standard-2'|'gold-1'|'gold-2', quantity: 1-9 }] }
   Returns: { url } — the Stripe Checkout page to redirect to.
----------------------------------------------------------------------------- */
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const items = (req.body?.items || [])
    .filter((i) => CATALOGUE[i.sku] && Number.isInteger(i.quantity) && i.quantity > 0 && i.quantity <= 9);
  if (items.length === 0) return res.status(400).json({ error: 'Empty basket' });

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: items.map((i) => ({
      price: CATALOGUE[i.sku].price,
      quantity: i.quantity,
    })),

    // Free UK mainland postage.
    shipping_address_collection: { allowed_countries: ['GB'] },
    shipping_options: [{ shipping_rate_data: {
      display_name: 'Free UK mainland postage',
      type: 'fixed_amount',
      fixed_amount: { amount: 0, currency: 'gbp' },
      delivery_estimate: {
        minimum: { unit: 'business_day', value: 2 },
        maximum: { unit: 'business_day', value: 4 },
      },
    }}],

    // Parent Companion opt-in — shown as a consent checkbox on the Stripe page.
    consent_collection: { promotions: 'auto' },

    allow_promotion_codes: true,
    success_url: `${process.env.SITE_URL}/thanks?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.SITE_URL}/index.html`,
  });

  return res.status(200).json({ url: session.url });
}

/* =============================================================================
   POST /api/stripe-webhook  — fulfilment. Create this as a SECOND endpoint.
   Dashboard → Developers → Webhooks → add endpoint, event:
   `checkout.session.completed`. Verify the signature — never skip this.
=============================================================================

export async function webhookHandler(req, res) {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook signature failed: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    // 1. Record the order (session.id, session.amount_total, line items via
    //    stripe.checkout.sessions.listLineItems(session.id)).
    // 2. Email the confirmation / dispatch note.
    // 3. Add to the Parent Companion list IF they consented:
    //    session.consent?.promotions === 'opt_in'
    //    → session.customer_details.email
  }

  return res.status(200).json({ received: true });
}
============================================================================= */
