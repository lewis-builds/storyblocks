// /api/unlock.js — checks a Parents' Corner access code.
//
// Two sources, checked in order:
//   1. Unique per-order codes issued by the Stripe webhook and stored in
//      Upstash Redis (set UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN).
//   2. An optional shared master code in PARENTS_ACCESS_CODE — handy for
//      testing or support. Leave it unset in production if you only want
//      per-order codes to work.
//
// Neither the codes nor the master code ship in the client bundle.

import { getRedis, codeIsValid, normalizeCode } from '../lib/parents-store.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Vercel's Node runtime parses a JSON body automatically, but be defensive.
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  const code = String(body?.code || '').trim();
  if (!code) return res.status(400).json({ ok: false, error: 'Please enter your access code.' });

  const redis = getRedis();
  const master = (process.env.PARENTS_ACCESS_CODE || '').trim();

  if (!redis && !master) {
    console.error('unlock: no code source configured (Upstash Redis or PARENTS_ACCESS_CODE)');
    return res.status(500).json({ ok: false, error: 'The Parents’ Corner is not set up yet. Please try again later.' });
  }

  try {
    // 1. Unique per-order code from the store.
    if (redis && await codeIsValid(redis, code)) {
      return res.status(200).json({ ok: true });
    }
    // 2. Shared master code (case/spacing-insensitive).
    if (master && normalizeCode(code) === normalizeCode(master)) {
      return res.status(200).json({ ok: true });
    }
  } catch (err) {
    console.error('unlock: store check failed —', err?.message || err);
    return res.status(500).json({ ok: false, error: 'We couldn’t check that code just now. Please try again in a moment.' });
  }

  return res.status(401).json({ ok: false, error: 'That code doesn’t look right - check your order confirmation email.' });
}
