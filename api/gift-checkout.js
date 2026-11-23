// /api/gift-checkout.js — Stripe Checkout for individual journal gifts.
// Individuals gift journals at £8.50 each; we deliver them to UK primary
// schools in classroom batches of 30 (open pool — no named school at purchase).
// Deployed by Vercel as POST /api/gift-checkout.
//
// Env (Vercel):
//   STRIPE_SECRET_KEY   sk_live_… (shared with /api/checkout)
//   SITE_URL            https://blockspublishing.com
//   STRIPE_PRICE_GIFT   price_… for a single £8.50 journal gift (quantity varies)
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const MAX_QTY = 300; // sanity cap (10 classrooms)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (!process.env.STRIPE_SECRET_KEY || !process.env.SITE_URL) {
    console.error('gift-checkout: STRIPE_SECRET_KEY or SITE_URL not set');
    return res.status(500).json({ error: 'Payment is not configured yet.' });
  }
  const price = process.env.STRIPE_PRICE_GIFT;
  if (!price) {
    console.error('gift-checkout: STRIPE_PRICE_GIFT is not set');
    return res.status(500).json({ error: 'Payment is not configured yet.' });
  }

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }

  const quantity = Math.floor(Number(body?.quantity));
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QTY) {
    return res.status(400).json({ error: 'Please choose how many journals to gift.' });
  }

  const siteUrl = process.env.SITE_URL.replace(/\/$/, '');

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price, quantity }],
      billing_address_collection: 'auto',
      allow_promotion_codes: true,
      // Optional display name for the (manually curated) classroom wall.
      custom_fields: [{
        key: 'wall_name',
        label: { type: 'custom', custom: 'First name for the classroom wall' },
        type: 'text',
        optional: true,
      }],
      custom_text: {
        submit: {
          message:
            'Every journal you gift reaches a school - guaranteed. We match completed ' +
            'classrooms of 30 to a primary school and always confirm before delivery.',
        },
      },
      metadata: { kind: 'gift', quantity: String(quantity) },
      payment_intent_data: { metadata: { kind: 'gift', quantity: String(quantity) } },
      success_url: `${siteUrl}/thanks?session_id={CHECKOUT_SESSION_ID}&kind=gift`,
      cancel_url: `${siteUrl}/gift`,
    });
    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('gift-checkout: Stripe session creation failed', err);
    return res.status(500).json({ error: 'Could not start checkout. Please try again.' });
  }
}
