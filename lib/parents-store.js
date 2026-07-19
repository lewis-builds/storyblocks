// Shared store for Parents' Corner access codes (used by the API functions).
//
// Codes are kept in Upstash Redis (a serverless-friendly Redis over REST).
// Set up: Vercel → Storage → add Upstash Redis (or upstash.com), which provides
//   UPSTASH_REDIS_REST_URL   and   UPSTASH_REDIS_REST_TOKEN
// (the Vercel integration may name them KV_REST_API_URL / KV_REST_API_TOKEN —
// both are read below).
//
// Keys:
//   pc:code:<NORMALISED_CODE>  → JSON { email, sessionId, createdAt }
//   pc:sess:<STRIPE_SESSION>   → the code issued for that order (idempotency)

import { Redis } from '@upstash/redis';
import { randomInt } from 'node:crypto';

let _redis = null;

// Returns a Redis client, or null if storage isn't configured yet (callers
// then fall back to the single shared PARENTS_ACCESS_CODE).
export function getRedis() {
  if (_redis) return _redis;
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  _redis = new Redis({ url, token });
  return _redis;
}

// Human-friendly alphabet: no 0/O/1/I/L to avoid typos.
const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

// A fresh display code like "SB-K7P3QM".
export function makeCode() {
  let s = '';
  for (let i = 0; i < 6; i++) s += ALPHABET[randomInt(ALPHABET.length)];
  return 'SB-' + s;
}

// Strip to A-Z0-9 uppercase so "sb-k7p3qm", "SB K7P3QM" and "SBK7P3QM" all match.
export function normalizeCode(input) {
  return String(input || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
}

const codeKey = (code) => 'pc:code:' + normalizeCode(code);
const sessKey = (sessionId) => 'pc:sess:' + sessionId;

// True if this code has been issued to a real order.
export async function codeIsValid(redis, code) {
  const norm = normalizeCode(code);
  if (!norm) return false;
  const hit = await redis.get(codeKey(norm));
  return !!hit;
}

// Issue (or reuse) a unique code for a Stripe session. Idempotent: a webhook
// retry for the same session returns the same code and won't create a new one.
// Returns { code, isNew }.
export async function issueCodeForSession(redis, { sessionId, email }) {
  const existing = await redis.get(sessKey(sessionId));
  if (existing) return { code: existing, isNew: false };

  // Generate a code that isn't already taken (retry a few times on collision).
  let code = null;
  for (let attempt = 0; attempt < 5; attempt++) {
    const candidate = makeCode();
    const ok = await redis.set(codeKey(candidate), JSON.stringify({ email, sessionId, createdAt: Date.now() }), { nx: true });
    if (ok) { code = candidate; break; }
  }
  if (!code) throw new Error('Could not allocate a unique code');

  // Remember which code this session got, so retries are idempotent.
  await redis.set(sessKey(sessionId), code);
  return { code, isNew: true };
}
