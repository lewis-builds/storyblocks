/* Story Blocks - shared model + helpers used across the site's pages. */

/* Where the block-character PNGs live (served from /public). */
export const CHAR_BASE = 'assets/characters';

/* In the design tool, asset() resolved a path to an inlined blob URL. In the
   built site every image is served straight from /public, so the path IS the
   URL. Kept as a function so call sites don't all have to change. */
export const asset = (p) => p;

/* Soft "corner glow" gradient for the big colour-block sections: a lighter
   shade (the cream base) pooling in the top-right corner and spreading across
   into the fuller wash colour. */
export const washGrad = (tint) => `radial-gradient(135% 120% at 100% 0%, var(--sb-cream) 0%, var(--sb-wash-${tint}) 66%)`;
export const cornerGrad = (base, light = '--sb-cream') => `radial-gradient(135% 120% at 100% 0%, var(${light}) 0%, var(${base}) 66%)`;

/* Money - always GBP, two decimals. (Sponsorship tier prices use the whole-
   pound formatter in lib/sponsor.js.) */
export function gbp(n) { return '£' + n.toFixed(2); }
