/* Shared helpers for the website forms - they all POST to /api/contact, which
   emails the submission to us with Reply-To set to the visitor. */
import React from 'react';

export async function sendForm(type, fields) {
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, ...fields }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.ok) return { ok: true };
    return { ok: false, error: data.error || 'Something went wrong. Please try again.' };
  } catch (err) {
    return { ok: false, error: 'We couldn’t reach the server. Please check your connection and try again.' };
  }
}

/* Hidden field that only bots fill in - the server silently drops those. */
export function Honeypot({ value, onChange }) {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
      <label>
        Company
        <input type="text" tabIndex={-1} autoComplete="off" value={value} onChange={onChange} />
      </label>
    </div>
  );
}

/* Small red note under a form when the send fails. */
export function FormError({ children }) {
  if (!children) return null;
  return (
    <p role="alert" style={{ margin: 0, color: 'var(--sb-blue)', fontWeight: 700, fontSize: '.9rem', lineHeight: 1.5 }}>
      {children}
    </p>
  );
}
