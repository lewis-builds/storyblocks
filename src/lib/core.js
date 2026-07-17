/* Story Blocks - shared model + helpers used across the site's pages. */

/* Where the block-character PNGs live (served from /public). */
export const CHAR_BASE = 'assets/characters';

/* In the design tool, asset() resolved a path to an inlined blob URL. In the
   built site every image is served straight from /public, so the path IS the
   URL. Kept as a function so call sites don't all have to change. */
export const asset = (p) => p;

/* Money - always GBP, two decimals. */
export function gbp(n) { return '£' + n.toFixed(2); }

/* The two editions shown by the buy page's tabs. */
export const EDITIONS = {
  standard: {
    key: 'standard',
    name: 'Standard Edition',
    priceNum: 19.99,
    cover: 'assets/storyblocks-book.png',
    ribbon: 'Most loved',
    ribbonTint: 'green',
    tagline: 'The everyday journal that gets kids writing - and keeps you in the loop.',
    includes: [
      '70+ daily story starters + writing tips',
      'Free sticker sheet & reward chart',
      'Free Parents’ Corner access - guides & printables',
    ],
  },
  gold: {
    key: 'gold',
    name: 'Gold Edition',
    priceNum: 24.99,
    cover: 'assets/storyblocks-gold-book.png',
    ribbon: 'The gift edition',
    ribbonTint: 'yellow',
    tagline: 'Everything in Standard, dressed up in gold foil - plus milestone coins to award.',
    includes: [
      'Everything in the Standard Edition',
      'Gold-foil cover',
      'Wooden collector milestone coins',
    ],
  },
};

/* Tiered multi-buy pricing: 2 copies −10%, 3+ copies −15%. */
export const TIERS = [
  { min: 3, rate: 0.15, label: 'Save 15%' },
  { min: 2, rate: 0.10, label: 'Save 10%' },
  { min: 1, rate: 0,    label: '' },
];

/* The four SKUs: single or 2-pack, Standard or Gold. Must match the price IDs
   configured in api/checkout.js. */
export const SKUS = {
  'standard-1': { name: 'Story Blocks Journal', books: 1, price: 19.99, fullPrice: 19.99, cover: 'assets/storyblocks-book.png', packSku: 'standard-2' },
  'standard-2': { name: 'Story Blocks Journal - 2-pack', books: 2, price: 35.98, fullPrice: 39.98, cover: 'assets/storyblocks-book.png' },
  'gold-1': { name: 'Gold Edition', books: 1, price: 24.99, fullPrice: 24.99, cover: 'assets/storyblocks-gold-book.png', packSku: 'gold-2' },
  'gold-2': { name: 'Gold Edition - 2-pack', books: 2, price: 44.98, fullPrice: 49.98, cover: 'assets/storyblocks-gold-book.png' },
};

export function priceFor(unit, qty) {
  const tier = TIERS.find((t) => qty >= t.min);
  const per = unit * (1 - tier.rate);
  const total = per * qty;
  const saved = unit * qty - total;
  return { rate: tier.rate, per, total, saved, full: unit * qty };
}
