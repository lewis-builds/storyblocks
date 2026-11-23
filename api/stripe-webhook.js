// /api/stripe-webhook.js — notifies the team of a completed sponsorship so we
// can confirm with the nominated school before dispatch.
//
// Stripe calls this endpoint after a successful Checkout. We verify the
// signature, then email ourselves the sponsorship details (tier, sponsor name,
// nominated school + URN) pulled from the session metadata. Stripe's own
// receipt to the buyer is sufficient; we don't email the buyer here.
//
// Register it once in Stripe → Developers → Webhooks → "Add endpoint":
//   URL:    https://blockspublishing.com/api/stripe-webhook
//   Event:  checkout.session.completed
// Then copy the "Signing secret" (whsec_…) into Vercel.
//
// Environment variables (Vercel → Settings → Environment Variables):
//   STRIPE_SECRET_KEY        sk_live_… (already set for /api/checkout)
//   STRIPE_WEBHOOK_SECRET    whsec_…   (from the webhook endpoint above)
//   RESEND_API_KEY           re_…      (optional — enables the team email)
//   CONTACT_TO_EMAIL         where notifications land (default hello@blockspublishing.com)
//   PARENTS_FROM_EMAIL       (optional) verified Resend sender, reused as From

import Stripe from 'stripe';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Stripe needs the RAW request body to verify the signature, so turn off
// Vercel's automatic JSON body parsing for this route.
export const config = { api: { bodyParser: false } };

async function readRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.error('stripe-webhook: STRIPE_WEBHOOK_SECRET is not set');
    return res.status(500).json({ error: 'Webhook not configured' });
  }

  // 1. Verify the event really came from Stripe.
  let event;
  try {
    const raw = await readRawBody(req);
    event = stripe.webhooks.constructEvent(raw, req.headers['stripe-signature'], secret);
  } catch (err) {
    console.error('stripe-webhook: signature verification failed —', err.message);
    return res.status(400).send(`Webhook signature failed: ${err.message}`);
  }

  // 2. Only act on a completed, paid checkout.
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    if (session.payment_status && session.payment_status !== 'paid') {
      return res.status(200).json({ received: true, skipped: 'unpaid' });
    }

    const m = session.metadata || {};
    const details = {
      email: session.customer_details?.email || '(none)',
      amount: session.amount_total != null ? `£${(session.amount_total / 100).toFixed(2)}` : '(unknown)',
      tier: m.tier_label || m.tier || '(unknown tier)',
      sponsor: m.sponsor_name || '(not given)',
      school: m.school_name || '(not given)',
      urn: m.school_urn || '(none)',
      sessionId: session.id,
    };

    // Email ourselves so we can confirm with the school. Best-effort: if email
    // isn't configured we still 200 so Stripe doesn't retry (the order is in
    // the Stripe dashboard regardless).
    try {
      await notifyTeam(details);
    } catch (err) {
      console.error('stripe-webhook: team notification failed (continuing) —', err?.message || err);
    }
  }

  return res.status(200).json({ received: true });
}

async function notifyTeam(d) {
  if (!process.env.RESEND_API_KEY) {
    console.log('stripe-webhook: new sponsorship', d);
    return;
  }
  const resend = new Resend(process.env.RESEND_API_KEY);
  const to = process.env.CONTACT_TO_EMAIL || 'hello@blockspublishing.com';
  const from = process.env.PARENTS_FROM_EMAIL || 'Story Blocks <hello@blockspublishing.com>';

  const rows = [
    ['Tier', d.tier], ['Amount', d.amount], ['Sponsor (bookplate)', d.sponsor],
    ['Nominated school', d.school], ['URN', d.urn], ['Buyer email', d.email],
    ['Stripe session', d.sessionId],
  ];
  const subject = `New sponsorship - ${d.sponsor} -> ${d.school}`;
  const text = ['New sponsorship received', '', ...rows.map(([k, v]) => `${k}: ${v}`),
    '', 'Next step: confirm with the school before dispatch.'].join('\n');
  const html = `
  <div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:560px;color:#231f20;line-height:1.55">
    <h2 style="margin:0 0 14px;font-size:18px">New sponsorship received</h2>
    <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse">
      ${rows.map(([k, v]) => `<tr><td style="padding:8px 12px 8px 0;font-weight:700;white-space:nowrap;border-bottom:1px solid #eee">${esc(k)}</td><td style="padding:8px 0;border-bottom:1px solid #eee">${esc(v)}</td></tr>`).join('')}
    </table>
    <p style="margin-top:16px;font-weight:700">Next step: confirm with the school before dispatch.</p>
  </div>`;

  const { error } = await resend.emails.send({ from, to, subject, text, html });
  if (error) throw new Error(error.message || 'Resend returned an error');
}

function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}
