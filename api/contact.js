// /api/contact.js — delivers every website form to your inbox via Resend.
//
// Handles the contact, wholesale and school-nomination forms. The visitor's
// address is set as Reply-To, so you can just hit reply.
//
// Env:
//   RESEND_API_KEY       re_…  (already set)
//   CONTACT_TO_EMAIL     where enquiries land (default hello@blockspublishing.com)
//   PARENTS_FROM_EMAIL   verified Resend sender (reused as the From)
//   UPSTASH_REDIS_*      optional — enables simple per-IP rate limiting

import { Resend } from 'resend';
import { getRedis } from '../lib/parents-store.js';

const MAX_LEN = 4000;
const RATE_LIMIT = 5;        // submissions…
const RATE_WINDOW = 60 * 60; // …per hour, per IP

const FORMS = {
  contact: {
    label: 'Website enquiry',
    required: ['name', 'email', 'message'],
    subject: (f) => `Website enquiry from ${f.name}`,
    rows: (f) => [['Name', f.name], ['Email', f.email], ['Message', f.message]],
  },
  wholesale: {
    label: 'Wholesale enquiry',
    required: ['shop', 'name', 'email'],
    subject: (f) => `Wholesale enquiry - ${f.shop}`,
    rows: (f) => [
      ['Business', f.shop], ['Type of business', f.businessType],
      ['Contact', f.name], ['Email', f.email], ['Message', f.message || '(none)'],
    ],
  },
  schools: {
    label: 'School nomination',
    required: ['school', 'town', 'email'],
    subject: (f) => `School nomination - ${f.school}`,
    rows: (f) => [
      ['School', f.school], ['Town or postcode', f.town],
      ['Their connection', f.connection || '(not given)'], ['Nominator email', f.email],
    ],
  },
};

const isEmail = (v) => /^\S+@\S+\.\S+$/.test(String(v || '').trim());

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }

  const form = FORMS[body?.type];
  if (!form) return res.status(400).json({ ok: false, error: 'Unknown form.' });

  // Honeypot: real people never fill this hidden field. Pretend success so bots
  // don't learn they were caught.
  if (String(body.company || '').trim()) return res.status(200).json({ ok: true });

  // Validate
  const fields = {};
  for (const [k, v] of Object.entries(body)) {
    if (k === 'type' || k === 'company') continue;
    fields[k] = String(v == null ? '' : v).slice(0, MAX_LEN).trim();
  }
  const missing = form.required.filter((k) => !fields[k]);
  if (missing.length) return res.status(400).json({ ok: false, error: 'Please fill in all the required fields.' });
  if (!isEmail(fields.email)) return res.status(400).json({ ok: false, error: 'Please enter a valid email address.' });

  if (!process.env.RESEND_API_KEY) {
    console.error('contact: RESEND_API_KEY is not set');
    return res.status(500).json({ ok: false, error: 'The form isn’t set up yet. Please email us directly.' });
  }

  // Light per-IP rate limiting (skipped if Redis isn't configured)
  try {
    const redis = getRedis();
    if (redis) {
      const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
      const key = `rl:contact:${ip}`;
      const hits = await redis.incr(key);
      if (hits === 1) await redis.expire(key, RATE_WINDOW);
      if (hits > RATE_LIMIT) {
        return res.status(429).json({ ok: false, error: 'That’s a lot of messages! Please try again later, or email us directly.' });
      }
    }
  } catch (err) {
    console.error('contact: rate-limit check failed (continuing) —', err?.message || err);
  }

  const to = process.env.CONTACT_TO_EMAIL || 'hello@blockspublishing.com';
  const from = process.env.PARENTS_FROM_EMAIL || 'Story Blocks <hello@blockspublishing.com>';
  const rows = form.rows(fields);

  const text = [`${form.label}`, '', ...rows.map(([k, v]) => `${k}: ${v}`)].join('\n');
  const html = `
  <div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:560px;color:#231f20;line-height:1.55">
    <h2 style="margin:0 0 14px;font-size:18px">${esc(form.label)}</h2>
    <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse">
      ${rows.map(([k, v]) => `
        <tr>
          <td style="padding:8px 12px 8px 0;vertical-align:top;font-weight:700;white-space:nowrap;border-bottom:1px solid #eee">${esc(k)}</td>
          <td style="padding:8px 0;vertical-align:top;border-bottom:1px solid #eee;white-space:pre-wrap">${esc(v)}</td>
        </tr>`).join('')}
    </table>
    <p style="margin-top:16px;font-size:13px;color:#6b6b6b">Reply directly to this email to answer ${esc(fields.email)}.</p>
  </div>`;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from, to, subject: form.subject(fields), text, html,
      replyTo: fields.email,
    });
    if (error) throw new Error(error.message || 'Resend returned an error');
  } catch (err) {
    console.error('contact: send failed —', err?.message || err);
    return res.status(500).json({ ok: false, error: 'We couldn’t send that just now. Please try again, or email us directly.' });
  }

  return res.status(200).json({ ok: true });
}

function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}
