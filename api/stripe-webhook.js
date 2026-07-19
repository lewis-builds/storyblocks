// /api/stripe-webhook.js — fulfilment for completed orders.
//
// Stripe calls this endpoint after a successful Checkout. We verify the
// signature, then email the buyer their Parents' Corner access code.
//
// Register it once in Stripe → Developers → Webhooks → "Add endpoint":
//   URL:    https://blockspublishing.com/api/stripe-webhook
//   Event:  checkout.session.completed
// Then copy the "Signing secret" (whsec_…) into Vercel.
//
// Environment variables (Vercel → Settings → Environment Variables):
//   STRIPE_SECRET_KEY       sk_live_… (already set for /api/checkout)
//   STRIPE_WEBHOOK_SECRET   whsec_…   (from the webhook endpoint above)
//   RESEND_API_KEY          re_…      (resend.com → API Keys)
//   PARENTS_ACCESS_CODE     the code parents type on /parents (already set)
//   SITE_URL                https://blockspublishing.com
//   PARENTS_FROM_EMAIL      (optional) e.g. "Story Blocks <hello@blockspublishing.com>"

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

    // Ignore unpaid sessions (e.g. async payment methods not yet settled).
    if (session.payment_status && session.payment_status !== 'paid') {
      return res.status(200).json({ received: true, skipped: 'unpaid' });
    }

    const email = session.customer_details?.email;
    const name = (session.customer_details?.name || '').split(' ')[0] || 'there';

    if (!email) {
      console.error('stripe-webhook: no customer email on session', session.id);
      return res.status(200).json({ received: true, skipped: 'no-email' });
    }

    try {
      await sendCodeEmail({ email, name });
    } catch (err) {
      // Return 500 so Stripe retries the delivery for us.
      console.error('stripe-webhook: failed to send code email —', err?.message || err);
      return res.status(500).json({ error: 'Email send failed' });
    }
  }

  return res.status(200).json({ received: true });
}

/* ---------- the email ---------- */
async function sendCodeEmail({ email, name }) {
  const code = (process.env.PARENTS_ACCESS_CODE || '').trim();
  if (!code) throw new Error('PARENTS_ACCESS_CODE is not set');
  if (!process.env.RESEND_API_KEY) throw new Error('RESEND_API_KEY is not set');

  const resend = new Resend(process.env.RESEND_API_KEY);
  const siteUrl = (process.env.SITE_URL || 'https://blockspublishing.com').replace(/\/$/, '');
  const from = process.env.PARENTS_FROM_EMAIL || 'Story Blocks <hello@blockspublishing.com>';
  const parentsUrl = `${siteUrl}/parents`;

  const subject = 'Your Parents’ Corner access code 🔑';

  const text = [
    `Hi ${name},`,
    '',
    'Thanks for your order! Your free Parents’ Corner is ready — printables, extra',
    'reward charts and short guides for helping a young writer find their feet.',
    '',
    `Your access code: ${code}`,
    '',
    `Unlock it here: ${parentsUrl}`,
    'Enter the code once and the Corner stays open on that device. Free forever.',
    '',
    'Happy writing,',
    'The Story Blocks team',
  ].join('\n');

  const html = `
  <div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:520px;margin:0 auto;color:#231f20;line-height:1.55">
    <p>Hi ${escapeHtml(name)},</p>
    <p>Thanks for your order! Your free <strong>Parents’ Corner</strong> is ready — printables,
       extra reward charts and short guides for helping a young writer find their feet.</p>
    <div style="margin:22px 0;padding:20px 24px;background:#FBF7EC;border:3px solid #231f20;border-radius:16px;text-align:center">
      <div style="font-size:13px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:#6b6b6b">Your access code</div>
      <div style="font-size:30px;font-weight:800;letter-spacing:.06em;margin-top:6px">${escapeHtml(code)}</div>
    </div>
    <p style="text-align:center;margin:24px 0">
      <a href="${parentsUrl}" style="display:inline-block;background:#FDCD2A;color:#231f20;font-weight:800;text-decoration:none;padding:13px 26px;border:3px solid #231f20;border-radius:999px">Unlock the Parents’ Corner →</a>
    </p>
    <p style="font-size:14px;color:#6b6b6b">Enter the code once and the Corner stays open on that device — free forever, no subscription.</p>
    <p style="margin-top:24px">Happy writing,<br>The Story Blocks team</p>
  </div>`;

  const { error } = await resend.emails.send({ from, to: email, subject, text, html });
  if (error) throw new Error(error.message || 'Resend returned an error');
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}
