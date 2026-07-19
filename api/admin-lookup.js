// /api/admin-lookup.js — support tool: find the Parents' Corner code for a
// buyer (by email) or see who a code belongs to (by code).
//
// PROTECTED. Send a bearer token that matches ADMIN_API_TOKEN:
//   curl -s https://blockspublishing.com/api/admin-lookup \
//     -H "authorization: Bearer $ADMIN_API_TOKEN" \
//     -H "content-type: application/json" \
//     -d '{"email":"buyer@example.com"}'
//   # or: -d '{"code":"SB-K7P3QM"}'
//
// Env: ADMIN_API_TOKEN (a long random string you keep private) plus the same
// Upstash Redis vars used elsewhere. POST-only so the email stays out of URLs.

import crypto from 'node:crypto';
import { getRedis, lookupCode, codesForEmail } from '../lib/parents-store.js';

function tokenOk(provided, expected) {
  if (!provided || !expected) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const expected = process.env.ADMIN_API_TOKEN;
  if (!expected) {
    console.error('admin-lookup: ADMIN_API_TOKEN is not set');
    return res.status(500).json({ error: 'Admin lookup not configured' });
  }

  const auth = req.headers['authorization'] || '';
  const provided = auth.startsWith('Bearer ') ? auth.slice(7) : (req.headers['x-admin-token'] || '');
  if (!tokenOk(provided, expected)) return res.status(401).json({ error: 'Unauthorized' });

  const redis = getRedis();
  if (!redis) return res.status(500).json({ error: 'Storage (Upstash Redis) is not configured' });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }

  try {
    if (body?.email) {
      const codes = await codesForEmail(redis, body.email);
      return res.status(200).json({ email: String(body.email), count: codes.length, codes });
    }
    if (body?.code) {
      const record = await lookupCode(redis, body.code);
      if (!record) return res.status(404).json({ found: false, code: String(body.code) });
      return res.status(200).json({ found: true, code: String(body.code), ...record });
    }
    return res.status(400).json({ error: 'Provide an "email" or a "code".' });
  } catch (err) {
    console.error('admin-lookup: failed —', err?.message || err);
    return res.status(500).json({ error: 'Lookup failed' });
  }
}
