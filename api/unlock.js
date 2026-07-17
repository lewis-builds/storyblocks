// /api/unlock.js — checks a Parents' Corner access code.
// The code lives in the PARENTS_ACCESS_CODE environment variable so it never
// ships inside the client bundle. Deployed by Vercel as POST /api/unlock.
//
// Set it in Vercel → Settings → Environment Variables, e.g.
//   PARENTS_ACCESS_CODE = the code printed inside the journal
// Comparison is case-insensitive and ignores surrounding spaces, so parents
// typing "storyblocks" vs "STORYBLOCKS " both work.

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const expected = (process.env.PARENTS_ACCESS_CODE || '').trim();
  if (!expected) {
    console.error('unlock: PARENTS_ACCESS_CODE is not set');
    return res.status(500).json({ ok: false, error: 'The Parents’ Corner is not set up yet. Please try again later.' });
  }

  // Vercel's Node runtime parses a JSON body automatically, but be defensive.
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }

  const code = String(body?.code || '').trim();
  if (!code) return res.status(400).json({ ok: false, error: 'Please enter your access code.' });

  if (code.toLowerCase() !== expected.toLowerCase()) {
    return res.status(401).json({ ok: false, error: 'That code doesn’t look right - check the card inside your journal.' });
  }

  return res.status(200).json({ ok: true });
}
