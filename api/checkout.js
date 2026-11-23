// /api/checkout.js — creates a Stripe Checkout session for a school-sponsorship
// tier. Deployed automatically by Vercel as POST /api/checkout.
//
// The sponsor has already chosen a tier and nominated a school on the site; we
// create a hosted Stripe Checkout for that tier's one-off price and carry the
// sponsor name + nominated school through as metadata so they land on the
// payment and in the Stripe dashboard. The journals ship to the school we
// confirm separately — so we do NOT collect a shipping address from the buyer.
//
// Env (set in Vercel — never commit live keys):
//   STRIPE_SECRET_KEY        sk_live_… (or sk_test_… for testing)
//   SITE_URL                 https://blockspublishing.com
//   STRIPE_PRICE_CLASS       price_… for the £249 / 30-book tier
//   STRIPE_PRICE_YEARGROUP   price_… for the £475 / 60-book tier
//   STRIPE_PRICE_WHOLESCHOOL price_… for the £675 / 90-book tier
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// One Stripe price per tier, keyed by the tier key the site sends.
const CATALOGUE = {
  class:       { price: process.env.STRIPE_PRICE_CLASS,       label: 'Class · 30 journals' },
  yeargroup:   { price: process.env.STRIPE_PRICE_YEARGROUP,   label: 'Year Group · 60 journals' },
  wholeschool: { price: process.env.STRIPE_PRICE_WHOLESCHOOL, label: 'Whole School · 90 journals' },
};

const clean = (v, max = 200) => String(v == null ? '' : v).replace(/[\r\n]+/g, ' ').trim().slice(0, max);
const isEmail = (v) => /^\S+@\S+\.\S+$/.test(String(v || '').trim());

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('checkout: STRIPE_SECRET_KEY is not set');
    return res.status(500).json({ error: 'Payment is not configured yet.' });
  }
  if (!process.env.SITE_URL) {
    console.error('checkout: SITE_URL is not set');
    return res.status(500).json({ error: 'Payment is not configured yet.' });
  }

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }

  const tierKey = clean(body?.tier, 40);
  const tier = CATALOGUE[tierKey];
  if (!tier) return res.status(400).json({ error: 'Please choose a sponsorship tier.' });

  if (!tier.price) {
    console.error(`checkout: STRIPE_PRICE_${tierKey.toUpperCase()} is not set`);
    return res.status(500).json({ error: 'Payment is not configured yet.' });
  }

  // Sponsor + nominated school, captured on the site. School may be "allocate"
  // (the buyer asked us to choose one from our registered-schools list).
  const sponsorName = clean(body?.sponsorName, 120);
  const email = clean(body?.email, 160);
  const allocate = body?.allocate === true || clean(body?.schoolUrn) === 'ALLOCATE';
  const schoolName = allocate ? 'Allocate from registered schools' : clean(body?.schoolName, 160);
  const schoolUrn = allocate ? 'ALLOCATE' : clean(body?.schoolUrn, 40);

  if (!sponsorName) return res.status(400).json({ error: 'Please add the sponsor name for the bookplate.' });
  if (!isEmail(email)) return res.status(400).json({ error: 'Please enter a valid contact email.' });
  if (!allocate && !schoolName) return res.status(400).json({ error: 'Please nominate a school, or ask us to choose one.' });

  const siteUrl = process.env.SITE_URL.replace(/\/$/, '');

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: tier.price, quantity: 1 }],
      customer_email: email,
      // No shipping address: we deliver to the nominated school, not the buyer.
      billing_address_collection: 'auto',
      allow_promotion_codes: true,
      custom_text: {
        submit: {
          message:
            'We’ll confirm with the school before dispatch - we never send unannounced. ' +
            'If they can’t accept, we’ll arrange your second choice with you.',
        },
      },
      metadata: {
        tier: tierKey,
        tier_label: tier.label,
        sponsor_name: sponsorName,
        school_name: schoolName,
        school_urn: schoolUrn,
      },
      payment_intent_data: {
        metadata: {
          tier: tierKey,
          sponsor_name: sponsorName,
          school_name: schoolName,
          school_urn: schoolUrn,
        },
      },
      success_url: `${siteUrl}/thanks?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('checkout: Stripe session creation failed', err);
    return res.status(500).json({ error: 'Could not start checkout. Please try again.' });
  }
}
