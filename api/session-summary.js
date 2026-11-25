// /api/session-summary.js — read-only lookup of a Checkout Session's total so
// the /thanks page can fire a GA4 `purchase` event with real revenue. Returns
// only the amount/kind — no personal data. Env: STRIPE_SECRET_KEY (already set).
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const id = String((req.query && req.query.session_id) || '');
  if (!process.env.STRIPE_SECRET_KEY || !/^cs_[A-Za-z0-9_]+$/.test(id)) {
    return res.status(400).json({ error: 'Invalid session id' });
  }
  try {
    const s = await stripe.checkout.sessions.retrieve(id);
    const m = s.metadata || {};
    return res.status(200).json({
      paid: s.payment_status === 'paid',
      amount: s.amount_total != null ? s.amount_total / 100 : null,
      currency: (s.currency || 'gbp').toUpperCase(),
      kind: m.kind === 'gift' ? 'gift' : 'sponsorship',
      tier: m.tier || '',
      quantity: m.quantity || '',
    });
  } catch (err) {
    console.error('session-summary:', (err && err.message) || err);
    return res.status(200).json({ paid: false, amount: null });
  }
}
