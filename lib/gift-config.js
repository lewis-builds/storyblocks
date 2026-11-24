/* Shared config for the automatic gift tracker.
   The tracker ( /api/gift-progress ) counts real PAID gift purchases from Stripe
   and adds the head start below. You normally never touch this file — the only
   reason to edit it is to hide a name (see BLOCKED_WALL_NAMES) or change the
   head start. */

export const CLASSROOM_SIZE = 30;

/* The head start shown before real sales — Blocks Publishing kicked it off.
   These books appear first and are labelled with `name`. */
export const GIFT_SEED = { count: 4, name: 'Blocks Publishing' };

/* Names you never want shown on the public wall. Add a first name here
   (case doesn't matter) and redeploy — that book then shows no name. */
export const BLOCKED_WALL_NAMES = [];

/* A basic safety net for buyer-typed names shown publicly on a kids' site.
   Whole-word match (so "Cassandra" is fine). Anything caught here, or in
   BLOCKED_WALL_NAMES, shows as an anonymous gift instead of the typed text. */
const BANNED = [
  'fuck', 'fucker', 'fucking', 'shit', 'cunt', 'bitch', 'bastard', 'dick',
  'cock', 'pussy', 'nigger', 'nigga', 'faggot', 'fag', 'whore', 'slut', 'wank',
  'wanker', 'piss', 'prick', 'twat', 'retard', 'rape', 'rapist', 'nazi',
  'hitler', 'porn', 'penis', 'vagina', 'bollocks', 'arsehole', 'asshole',
];

/* Clean a raw "classroom wall" name: strip anything but letters/spaces/hyphens/
   apostrophes, cap the length, block banned/blocked words, title-case it.
   Returns a tidy first name, or null when nothing usable / blocked. */
export function cleanWallName(raw) {
  if (!raw) return null;
  let s = String(raw).replace(/[^\p{L}\p{M}\s'’-]/gu, '').replace(/\s+/g, ' ').trim();
  if (!s) return null;
  if (s.length > 22) s = s.slice(0, 22).trim();

  const blocked = BLOCKED_WALL_NAMES.map((b) => String(b).toLowerCase());
  const tokens = s.toLowerCase().split(/[\s'’-]+/).filter(Boolean);
  if (tokens.some((t) => BANNED.includes(t) || blocked.includes(t))) return null;
  if (blocked.includes(s.toLowerCase())) return null;

  return s.replace(/\b\p{L}/gu, (c) => c.toUpperCase());
}
