// /api/checkout.js — creates a Stripe Checkout session for the basket.
// Deployed automatically by Vercel as POST /api/checkout. Do not rename the folder.
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// STEP 3 of DEPLOY.md: replace these four placeholders with YOUR price IDs
// (Stripe dashboard → Product catalogue → click a product → copy the "price_…" id)
const CATALOGUE = {
  'standard-1': { price: 'price_PASTE_ME_standard_single' },
  'standard-2': { price: 'price_PASTE_ME_standard_2pack' },
  'gold-1':     { price: 'price_PASTE_ME_gold_single' },
  'gold-2':     { price: 'price_PASTE_ME_gold_2pack' },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Config sanity — surfaces the most common setup mistakes as clear errors
  // instead of an opaque 500 (the front-end then shows its "demo mode" message).
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('checkout: STRIPE_SECRET_KEY is not set');
    return res.status(500).json({ error: 'Payment is not configured yet.' });
  }
  if (!process.env.SITE_URL) {
    console.error('checkout: SITE_URL is not set');
    return res.status(500).json({ error: 'Payment is not configured yet.' });
  }

  // Vercel's Node runtime parses a JSON body automatically, but be defensive in
  // case it arrives as a raw string.
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }

  const items = (body?.items || [])
    .filter((i) => i && CATALOGUE[i.sku] && Number.isInteger(i.quantity) && i.quantity > 0 && i.quantity <= 9);
  if (items.length === 0) return res.status(400).json({ error: 'Empty basket' });

  // Guard against deploying with the placeholder price IDs still in place.
  if (items.some((i) => CATALOGUE[i.sku].price.startsWith('price_PASTE_ME'))) {
    console.error('checkout: CATALOGUE still contains placeholder price IDs — see DEPLOY.md step 3');
    return res.status(500).json({ error: 'Payment is not configured yet.' });
  }

  const siteUrl = process.env.SITE_URL.replace(/\/$/, ''); // tolerate a trailing slash

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: items.map((i) => ({ price: CATALOGUE[i.sku].price, quantity: i.quantity })),

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

      consent_collection: { promotions: 'auto' }, // Parent Companion opt-in checkbox
      allow_promotion_codes: true,
      success_url: `${siteUrl}/thanks.html`,
      cancel_url: `${siteUrl}/index.html`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('checkout: Stripe session creation failed', err);
    return res.status(500).json({ error: 'Could not start checkout. Please try again.' });
  }
}
