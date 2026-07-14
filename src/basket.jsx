/* Story Blocks - basket drawer + Stripe Checkout handshake (front-end side)
   Four SKUs: single or 2-pack, in Standard or Gold. "Checkout" POSTs the SKU
   lines to /api/checkout, which creates a Stripe Checkout Session server-side
   and returns its URL (see api/checkout.example.js). */
import React from 'react';
import { asset, CHAR_BASE, SKUS, gbp } from './lib/core.js';

const { Button: SBButton } = window.StoryBlocksJournalDesignSystem_239fa7;

function BasketDrawer({ open, onClose, basket, setBasket, onToast }) {
  const [busy, setBusy] = React.useState(false);
  const lines = Object.entries(basket).filter(([, q]) => q > 0);
  const totals = lines.reduce((acc, [sku, q]) => {
    const s = SKUS[sku];
    acc.total += s.price * q;
    acc.saved += (s.fullPrice - s.price) * q;
    acc.books += s.books * q;
    return acc;
  }, { total: 0, saved: 0, books: 0 });

  const setLine = (sku, q) => setBasket((b) => ({ ...b, [sku]: Math.max(0, Math.min(9, q)) }));

  /* two (or more) singles of the same edition → offer the 2-pack */
  const swapForPack = (sku) => {
    const s = SKUS[sku];
    setBasket((b) => {
      const singles = b[sku];
      const packs = Math.floor(singles / 2);
      return {
        ...b,
        [sku]: singles - packs * 2,
        [s.packSku]: Math.min(9, (b[s.packSku] || 0) + packs),
      };
    });
    onToast('Swapped for the 2-pack - saving applied!');
  };

  const checkout = async () => {
    setBusy(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: lines.map(([sku, q]) => ({ sku, quantity: q })),
        }),
      });
      if (!res.ok) throw new Error('checkout endpoint returned ' + res.status);
      const { url } = await res.json();
      window.location.href = url; // → Stripe Checkout page
    } catch (err) {
      // Prototype fallback: no backend behind this page yet.
      onToast('Demo mode - in production this redirects to Stripe Checkout.');
      setBusy(false);
    }
  };

  const stepBtn = {
    width: 34, height: 34, borderRadius: 10, border: '2.5px solid var(--sb-ink)', background: 'var(--sb-paper)',
    fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.15rem', lineHeight: 1, cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, color: 'var(--sb-ink)',
  };

  return (
    <React.Fragment>
      <div className={'sb-basket-veil' + (open ? ' is-on' : '')} onClick={onClose} aria-hidden="true"></div>
      <aside className={'sb-basket' + (open ? ' is-on' : '')} role="dialog" aria-modal="true" aria-label="Your basket">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 20px', borderBottom: '3px solid var(--sb-ink)' }}>
          <h2 className="sb-display" style={{ fontSize: '1.4rem', flex: 1 }}>Your basket</h2>
          <button onClick={onClose} aria-label="Close basket" style={{ ...stepBtn, width: 40, height: 40, borderRadius: 12 }}>✕</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
          {lines.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '36px 10px' }}>
              <img src={asset(CHAR_BASE + '/SB16.png')} alt="" style={{ width: 110 }} />
              <p className="sb-marker" style={{ fontSize: '1.25rem', marginTop: 12 }}>Nothing in here yet…</p>
              <p style={{ marginTop: 8, color: 'var(--sb-muted)', fontWeight: 700, fontSize: '.95rem' }}>Add a journal and it'll appear here.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 14 }}>
              {lines.map(([sku, q]) => {
                const s = SKUS[sku];
                const packSaving = s.packSku && q >= 2 ? (s.price * 2 - SKUS[s.packSku].price) * Math.floor(q / 2) : 0;
                return (
                  <div key={sku} style={{ border: '3px solid var(--sb-ink)', borderRadius: 18, padding: 14, background: 'var(--sb-paper)' }}>
                    <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                      <img src={asset(s.cover)} alt="" style={{ width: 54, borderRadius: 6, border: '2px solid var(--sb-ink)', flexShrink: 0 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 800, lineHeight: 1.15 }}>{s.name}</div>
                        <div style={{ fontSize: '.85rem', fontWeight: 700, color: 'var(--sb-muted)', marginTop: 2 }}>
                          {gbp(s.price * q)}{s.fullPrice > s.price && <span> · saving {gbp((s.fullPrice - s.price) * q)}</span>}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
                          <button style={stepBtn} aria-label={'Fewer ' + s.name} onClick={() => setLine(sku, q - 1)}>−</button>
                          <span className="sb-display" style={{ minWidth: 18, textAlign: 'center' }}>{q}</span>
                          <button style={stepBtn} aria-label={'More ' + s.name} onClick={() => setLine(sku, q + 1)}>＋</button>
                          <button onClick={() => setLine(sku, 0)} style={{ marginLeft: 'auto', background: 'none', border: 0, padding: 0, font: 'inherit', fontWeight: 800, fontSize: '.85rem', color: 'var(--sb-muted)', cursor: 'pointer', textDecoration: 'underline' }}>Remove</button>
                        </div>
                      </div>
                    </div>
                    {packSaving > 0 && (
                      <button onClick={() => swapForPack(sku)}
                        style={{ width: '100%', marginTop: 12, textAlign: 'left', display: 'flex', alignItems: 'center', gap: 8, background: 'var(--sb-wash-lemon)', border: '2.5px dashed var(--sb-ink)', borderRadius: 12, padding: '9px 12px', font: 'inherit', fontWeight: 800, fontSize: '.88rem', color: 'var(--sb-ink)', cursor: 'pointer' }}>
                        <span className="sb-marker" style={{ fontSize: '1.05rem', color: 'var(--sb-blue)' }}>Psst…</span>
                        Save {gbp(packSaving)} by switching to the 2-pack - tap to swap
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {lines.length > 0 && (
          <div style={{ borderTop: '3px solid var(--sb-ink)', padding: 20 }}>
            {totals.saved > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: 'var(--sb-muted)', fontSize: '.95rem' }}>
                <span>2-pack saving</span><span>−{gbp(totals.saved)}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 4 }}>
              <span style={{ fontWeight: 800 }}>Total</span>
              <span className="sb-display" style={{ fontSize: '1.7rem' }}>{gbp(totals.total)}</span>
            </div>
            <div style={{ fontWeight: 700, color: 'var(--sb-muted)', fontSize: '.85rem', marginTop: 2 }}>Free UK mainland postage</div>
            <div style={{ marginTop: 14 }}>
              <SBButton size="lg" block iconRight={busy ? null : '→'} onClick={checkout} disabled={busy}>
                {busy ? 'Opening secure checkout…' : 'Checkout'}
              </SBButton>
            </div>
            <div style={{ textAlign: 'center', marginTop: 10, fontSize: '.82rem', fontWeight: 700, color: 'var(--sb-muted)' }}>
              Secure payment by Stripe · Apple Pay &amp; Google Pay supported
            </div>
          </div>
        )}
      </aside>
    </React.Fragment>
  );
}

export { BasketDrawer };
