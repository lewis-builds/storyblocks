/* Shared UK-primary-school type-ahead, backed by the static client-side index
   at /schools-index.json (built by scripts/build-schools-index.mjs from the DfE
   GIAS open data). Used by the sponsorship flow and the school-registration
   form. No backend: the index is fetched once on first focus. */
import React from 'react';
import { Icon } from '../sections.jsx';

const INPUT_STYLE = {
  width: '100%', padding: '13px 15px', fontSize: '1rem', fontWeight: 600, fontFamily: 'inherit',
  color: 'var(--sb-ink)', background: 'var(--sb-paper)', border: '1px solid var(--sb-line)',
  borderRadius: 18, boxShadow: 'none', outline: 'none',
};

export function SchoolSearch({ value, onPick, placeholder }) {
  const [q, setQ] = React.useState('');
  const [index, setIndex] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const boxRef = React.useRef(null);

  const load = React.useCallback(() => {
    if (index || loading) return;
    setLoading(true);
    fetch('/schools-index.json')
      .then((r) => r.json())
      .then((data) => setIndex(Array.isArray(data) ? data : []))
      .catch(() => setIndex([]))
      .finally(() => setLoading(false));
  }, [index, loading]);

  React.useEffect(() => {
    const onDoc = (e) => { if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const results = React.useMemo(() => {
    if (!index || q.trim().length < 2) return [];
    const needle = q.trim().toLowerCase();
    const flat = needle.replace(/\s+/g, '');
    const out = [];
    for (const s of index) {
      if ((s.n && s.n.toLowerCase().includes(needle)) ||
          (s.t && s.t.toLowerCase().includes(needle)) ||
          (s.p && s.p.toLowerCase().replace(/\s+/g, '').includes(flat))) {
        out.push(s);
        if (out.length >= 8) break;
      }
    }
    return out;
  }, [index, q]);

  if (value) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: 'var(--sb-wash-green)', border: 'none', borderRadius: 18, boxShadow: 'none' }}>
        <Icon name="check" size={20} sw={3.4} stroke="var(--sb-ink)" />
        <span style={{ flex: 1, minWidth: 0 }}>
          <strong style={{ fontWeight: 800, display: 'block' }}>{value.n}</strong>
          <span style={{ fontSize: '.9rem', color: 'var(--sb-muted)', fontWeight: 700 }}>{[value.t, value.p].filter(Boolean).join(' · ')}</span>
        </span>
        <button type="button" onClick={() => { onPick(null); setQ(''); }} style={{ background: 'none', border: 0, padding: 6, font: 'inherit', fontWeight: 800, color: 'var(--sb-blue)', cursor: 'pointer', textDecoration: 'underline', flexShrink: 0 }}>Change</button>
      </div>
    );
  }

  return (
    <div ref={boxRef} style={{ position: 'relative' }}>
      <input
        type="text" value={q} autoComplete="off" aria-label="Search for a primary school by name, town or postcode"
        placeholder={placeholder || 'Start typing a school name, town or postcode…'}
        onFocus={() => { load(); setOpen(true); }}
        onChange={(e) => { setQ(e.target.value); setOpen(true); }}
        style={INPUT_STYLE}
      />
      {open && q.trim().length >= 2 && (
        <div style={{ position: 'absolute', zIndex: 20, left: 0, right: 0, top: 'calc(100% + 8px)', background: 'var(--sb-paper)', border: '1px solid var(--sb-line)', borderRadius: 18, boxShadow: 'var(--shadow-float)', overflow: 'hidden', maxHeight: 320, overflowY: 'auto' }}>
          {loading && <div style={{ padding: '14px 15px', fontWeight: 700, color: 'var(--sb-muted)' }}>Loading schools…</div>}
          {!loading && results.length === 0 && (
            <div style={{ padding: '14px 15px', fontWeight: 700, color: 'var(--sb-muted)' }}>No match yet - try the town or postcode.</div>
          )}
          {results.map((s) => (
            <button key={s.u} type="button" onClick={() => { onPick(s); setOpen(false); }}
              style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 15px', background: 'none', border: 0, borderBottom: '2px solid rgba(35,31,32,.08)', cursor: 'pointer', font: 'inherit' }}>
              <strong style={{ fontWeight: 800, display: 'block' }}>{s.n}</strong>
              <span style={{ fontSize: '.88rem', color: 'var(--sb-muted)', fontWeight: 700 }}>{[s.t, s.p].filter(Boolean).join(' · ')}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export { INPUT_STYLE };
