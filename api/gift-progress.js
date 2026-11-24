// /api/gift-progress.js — the LIVE classroom tracker.
// Counts paid gift purchases from Stripe (metadata.kind === 'gift'), adds the
// head start, and returns how full the current classroom is plus the first
// names for its books. Read-only. Cached at the edge so it isn't recomputed on
// every visit. Falls back to the head start if Stripe can't be reached.
//
// Env: STRIPE_SECRET_KEY (already set for checkout).
import Stripe from 'stripe';
import { CLASSROOM_SIZE, GIFT_SEED, cleanWallName } from '../lib/gift-config.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const target = CLASSROOM_SIZE;

  // Head-start-only fallback (Stripe unreachable / not configured).
  const seedNames = Array(GIFT_SEED.count).fill(GIFT_SEED.name);
  const fallback = progressFrom(seedNames, target);

  if (!process.env.STRIPE_SECRET_KEY) return respond(res, fallback);

  try {
    const gifts = []; // { created, quantity, name }
    let startingAfter = null;
    let pages = 0;

    do {
      const page = await stripe.checkout.sessions.list({
        limit: 100,
        ...(startingAfter ? { starting_after: startingAfter } : {}),
      });
      for (const s of page.data) {
        if (s.payment_status !== 'paid') continue;
        if (!s.metadata || s.metadata.kind !== 'gift') continue;
        const quantity = Math.max(0, Math.floor(Number(s.metadata.quantity) || 0));
        if (!quantity) continue;
        const field = (s.custom_fields || []).find((f) => f.key === 'wall_name');
        const name = cleanWallName(field && field.text && field.text.value);
        gifts.push({ created: s.created, quantity, name });
      }
      startingAfter = page.has_more && page.data.length ? page.data[page.data.length - 1].id : null;
      pages += 1;
    } while (startingAfter && pages < 30);

    // Oldest first, so book #1 is the earliest gift.
    gifts.sort((a, b) => a.created - b.created);

    const names = Array(GIFT_SEED.count).fill(GIFT_SEED.name);
    for (const g of gifts) {
      for (let i = 0; i < g.quantity; i++) names.push(g.name || null); // null = anonymous gift
    }

    return respond(res, progressFrom(names, target));
  } catch (err) {
    console.error('gift-progress:', (err && err.message) || err);
    return respond(res, fallback);
  }
}

// Turn an ordered list of book names into the current classroom's state.
function progressFrom(names, target) {
  const total = names.length;
  const delivered = Math.floor(total / target);
  const current = total % target;
  const gifters = names.slice(total - current); // just the in-progress classroom
  return { current, target, total, delivered, gifters };
}

function respond(res, data) {
  // Cache ~2 min at the edge; serve stale while refreshing so it's always fast.
  res.setHeader('Cache-Control', 's-maxage=120, stale-while-revalidate=600');
  return res.status(200).json(data);
}
