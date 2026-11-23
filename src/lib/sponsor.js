/* Story Blocks - school-sponsorship model.
   The site's one job: a business (or individual) sponsors a batch of journals
   for a UK primary school they nominate. Three one-off tiers, no accounts,
   no basket. Prices are whole-pound one-off charges in Stripe. */

/* Money - always GBP. Whole pounds for tier prices, two decimals for per-book. */
export function gbp(n) { return '£' + (Number.isInteger(n) ? n : n.toFixed(2)); }

/* The three sponsorship tiers. `key` must match the Stripe price env var
   (STRIPE_PRICE_<KEY>) and the catalogue in /api/checkout.js. */
export const SPONSOR_TIERS = [
  {
    key: 'class',
    name: 'Class',
    books: 30,
    price: 249,
    tint: 'sky',
    tilt: -2,
    blurb: 'Enough for a whole class to each get their own journal.',
    gold: false,
  },
  {
    key: 'yeargroup',
    name: 'Year Group',
    books: 60,
    price: 475,
    tint: 'green',
    tilt: 1.5,
    blurb: 'Covers a full year group - the most popular choice for local businesses.',
    gold: true,
    popular: true,
  },
  {
    key: 'wholeschool',
    name: 'Whole School',
    books: 90,
    price: 675,
    tint: 'pink',
    tilt: -1.5,
    blurb: 'A journal in every child’s hands, and your name across the whole school.',
    gold: true,
  },
];

export const TIER_BY_KEY = Object.fromEntries(SPONSOR_TIERS.map((t) => [t.key, t]));

/* Per-book figure for a tier, e.g. "£8.30". Used for the "under £8.50" framing. */
export function perBook(tier) { return tier.price / tier.books; }

/* Every tier includes the recognition pack - the thing the sponsor is really
   buying: visible, local goodwill. */
export const RECOGNITION_PACK = [
  { b: 'A named bookplate in every copy', t: '“Donated to [school] by [sponsor]”', icon: 'book', tint: 'sky' },
  { b: 'A certificate for your business', t: 'to frame, post or show off', icon: 'award', tint: 'green' },
  { b: 'A ready-made social post pack', t: 'images and words, ready to share', icon: 'heart', tint: 'pink' },
];

/* The non-negotiable nomination promise - shown at the nominate step and at
   checkout. Never imply a school has already agreed. */
export const NOMINATION_PROMISE =
  'We’ll confirm with the school before dispatch - we never send unannounced. ' +
  'If they can’t accept, we’ll arrange your second choice with you.';
