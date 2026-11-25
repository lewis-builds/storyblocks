/* Story Blocks - School registration page.
   Schools join the receiving list so that when a sponsor asks us to choose a
   school ("choose one for me"), we can match them. Free, no commitment. */
import './lib/react-global.js';
import './lib/image-slot.js';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { asset, CHAR_BASE, washGrad } from './lib/core.js';
import { SiteHeader, SiteFooter, SectionHead, Reveal } from './sections.jsx';
import { SchoolSearch, INPUT_STYLE } from './lib/school-search.jsx';
import { sendForm, Honeypot, FormError } from './lib/form-submit.jsx';

const SchoolsDS = window.StoryBlocksJournalDesignSystem_239fa7;
const { Button: SchButton, Select: SchSelect } = SchoolsDS;

/* ---------------- Hero ---------------- */
function SchoolsHero() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: washGrad('green'), borderBottom: 'none' }}>
      <div className="sb-wrap" style={{ maxWidth: 760, textAlign: 'center', padding: '60px 24px 68px' }}>
        <div className="sb-marker" style={{ fontSize: '1.5rem', color: 'var(--sb-blue)' }}>For teachers &amp; schools</div>
        <h1 className="sb-display" style={{ fontSize: 'clamp(2.3rem, 5vw, 3.5rem)', lineHeight: 1.04, marginTop: 8 }}>Register your school for sponsored journals.</h1>
        <p style={{ marginTop: 18, fontSize: '1.18rem', lineHeight: 1.55, maxWidth: 580, marginLeft: 'auto', marginRight: 'auto' }}>
          Local businesses sponsor batches of Story Blocks journals for primary schools. Join our
          receiving list and when a sponsor asks us to choose a school, we match them with schools like
          yours. It’s free, and there’s no commitment.
        </p>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 26, justifyContent: 'center' }}>
          <SchButton as="a" href="#register" size="lg" iconRight="→">Register your school</SchButton>
          <SchButton as="a" href="#how" size="lg" variant="white">How it works</SchButton>
        </div>
      </div>
    </section>
  );
}

/* ---------------- What's in every box ---------------- */
function BoxContents() {
  const items = [
    { img: 'assets/storyblocks-book.png', tint: 'var(--sb-wash-lemon)', tilt: -2, title: 'Hardback journals', body: 'The daily-writing journals from this site - one for every child in the class to keep.' },
    { img: 'assets/sticker-sheet-full.jpg', tint: 'var(--sb-wash-pink)', tilt: 1.5, title: 'Sticker sheets', body: 'Full peel-off sticker sheets to celebrate finished stories and keep the daily streak going.' },
    { img: 'assets/wall-charts.jpg', tint: 'var(--sb-wash-purple)', tilt: -1, title: 'Wall reward charts', body: 'A big classroom wall chart to tick off reading and writing days the whole class can cheer on.' },
  ];
  return (
    <section style={{ background: washGrad('sky'), borderTop: 'none', borderBottom: 'none', padding: 'var(--sec-pad, 72px) 0' }}>
      <div className="sb-wrap">
        <SectionHead kicker="What arrives" title="What’s in every box"
          sub="Enough real journals, stickers and reward charts for a whole class to get scribbling. Bigger sponsorships cover a year group or the whole school." />
        <div className="sb-snaps" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 28, marginTop: 44 }}>
          {items.map((it) => (
            <Reveal key={it.title}>
              <div style={{ background: it.tint, border: 'none', borderRadius: 22, boxShadow: 'var(--shadow-pop)', padding: 22, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: 190, background: 'var(--sb-paper)', border: 'none', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  <img src={asset(it.img)} alt={it.title} style={{ maxWidth: '82%', maxHeight: '84%', objectFit: 'contain', transform: `rotate(${it.tilt}deg)` }} />
                </div>
                <h3 className="sb-display" style={{ fontSize: '1.3rem', marginTop: 16 }}>{it.title}</h3>
                <p style={{ marginTop: 8, lineHeight: 1.55 }}>{it.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- How registering works ---------------- */
function HowItWorks() {
  const steps = [
    { n: '01', char: 'SB10', tint: 'var(--sb-wash-lemon)', title: 'Register in a minute', body: 'Tell us your school and who to contact. There’s no application to fill in, no cost, and no commitment to anything.' },
    { n: '02', char: 'SB33', tint: 'var(--sb-wash-pink)', title: 'We match you with a sponsor', body: 'When a local business sponsors a batch and asks us to choose a school, we pick from our list - spreading boxes fairly around the country.' },
    { n: '03', char: 'SB44', tint: 'var(--sb-wash-green)', title: 'A box arrives at reception', body: 'Journals, sticker sheets and a wall chart - enough for a class, a year group or the whole school. We confirm with you before anything ships.' },
  ];
  return (
    <section id="how" style={{ padding: 'var(--sec-pad, 72px) 0' }}>
      <div className="sb-wrap">
        <SectionHead kicker="How it works" title="Registering takes a minute"
          sub="You join the list; we do the rest. We always confirm with you before a box is sent - never unannounced." />
        <div className="sb-steps" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 24, marginTop: 44 }}>
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 120}>
              <div style={{ background: s.tint, border: 'none', borderRadius: 22, boxShadow: 'var(--shadow-pop)', padding: '26px 24px', height: '100%', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span className="sb-display" style={{ fontSize: '2rem', opacity: .35 }}>{s.n}</span>
                  <img src={asset(CHAR_BASE + '/' + s.char + '.png')} alt="" style={{ width: 72 }} />
                </div>
                <h3 className="sb-display" style={{ fontSize: '1.35rem', marginTop: 10 }}>{s.title}</h3>
                <p style={{ marginTop: 10, lineHeight: 1.55 }}>{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Registration form ---------------- */
const ROLES = ['Headteacher', 'Deputy / senior leader', 'Teacher', 'Teaching assistant', 'Office / admin', 'Governor', 'PTA / parent', 'Other'];

function RegisterForm() {
  const [sent, setSent] = React.useState(false);
  const [school, setSchool] = React.useState(null);     // {u,n,t,p} from type-ahead
  const [name, setName] = React.useState('');
  const [role, setRole] = React.useState(ROLES[0]);
  const [email, setEmail] = React.useState('');
  const [company, setCompany] = React.useState('');     // honeypot
  const [errors, setErrors] = React.useState({});
  const [busy, setBusy] = React.useState(false);
  const [sendError, setSendError] = React.useState('');

  const submit = async () => {
    const e = {};
    if (!school) e.school = 'Please find and select your school';
    if (!name.trim()) e.name = 'Please add your name';
    if (!/^\S+@\S+\.\S+$/.test(email)) e.email = 'Please add a valid email';
    setErrors(e);
    if (Object.keys(e).length) return;

    setBusy(true);
    setSendError('');
    const result = await sendForm('register', {
      school: school.n, town: [school.t, school.p].filter(Boolean).join(', '), urn: school.u,
      name, role, email, company,
    });
    setBusy(false);
    if (result.ok) setSent(true);
    else setSendError(result.error);
  };

  return (
    <section id="register" style={{ background: washGrad('lemon'), borderTop: 'none', padding: 'var(--sec-pad, 72px) 0 84px' }}>
      <div className="sb-wrap sb-nominate" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.1fr)', gap: 56, alignItems: 'center' }}>
        <div>
          <SectionHead align="left" kicker="Join the list" title="Register your school" sub="" />
          <p style={{ marginTop: 16, fontSize: '1.1rem', lineHeight: 1.6, maxWidth: 460 }}>
            It takes a minute. We’ll only be in touch if we can match you with a sponsor - and we’ll
            always confirm with you before any books are sent.
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 0, marginTop: 26 }}>
            <img className="sb-float" src={asset(CHAR_BASE + '/SB50.png')} alt="" style={{ width: 130, ['--r']: '-3deg' }} />
            <span className="sb-marker" style={{ background: 'var(--sb-paper)', border: 'none', borderRadius: 999, padding: '8px 18px', fontSize: '1.15rem', transform: 'rotate(-2deg)', boxShadow: 'var(--shadow-pop-sm)', marginBottom: 26 }}>Free - and no catch!</span>
          </div>
        </div>

        <div style={{ background: 'var(--sb-paper)', border: 'none', borderRadius: 26, boxShadow: 'var(--shadow-pop-lg)', padding: 28 }}>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '26px 10px' }}>
              <img src={asset(CHAR_BASE + '/SB44.png')} alt="" style={{ width: 130 }} />
              <h3 className="sb-display" style={{ fontSize: '1.7rem', marginTop: 14 }}>You’re on the list!</h3>
              <p style={{ marginTop: 10, lineHeight: 1.55 }}>
                Thank you - <strong>{school && school.n}</strong> is registered. We’ll be in touch if we can match you with a sponsor.
              </p>
              <div style={{ marginTop: 20 }}>
                <SchButton variant="cream" size="sm" onClick={() => { setSent(false); setSchool(null); setName(''); setEmail(''); }}>Register another school</SchButton>
              </div>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontWeight: 800, marginBottom: 7 }}>Your school</label>
                <SchoolSearch value={school} onPick={setSchool} placeholder="Search your school name, town or postcode…" />
                {errors.school && <p style={{ color: '#c2185b', fontWeight: 700, fontSize: '.9rem', marginTop: 6 }}>{errors.school}</p>}
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 800, marginBottom: 7 }}>Your name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Janeen Patel" style={INPUT_STYLE} />
                {errors.name && <p style={{ color: '#c2185b', fontWeight: 700, fontSize: '.9rem', marginTop: 6 }}>{errors.name}</p>}
              </div>
              <SchSelect label="Your role" options={ROLES} value={role} onChange={(e) => setRole(e.target.value)} />
              <div>
                <label style={{ display: 'block', fontWeight: 800, marginBottom: 7 }}>Your email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@school.sch.uk" style={INPUT_STYLE} />
                {errors.email && <p style={{ color: '#c2185b', fontWeight: 700, fontSize: '.9rem', marginTop: 6 }}>{errors.email}</p>}
              </div>
              <Honeypot value={company} onChange={(e) => setCompany(e.target.value)} />
              <SchButton size="lg" block iconRight={busy ? null : '→'} onClick={submit} disabled={busy}>
                {busy ? 'Sending…' : 'Register our school'}
              </SchButton>
              <FormError>{sendError}</FormError>
              <p style={{ fontSize: '.88rem', color: 'var(--sb-muted)', fontWeight: 600, textAlign: 'center' }}>
                We only use your details to contact you about sponsored journals for your school.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------------- App ---------------- */
function SchoolsApp() {
  return (
    <React.Fragment>
      <SiteHeader active="schools" />
      <main>
        <SchoolsHero />
        <BoxContents />
        <HowItWorks />
        <RegisterForm />
      </main>
      <SiteFooter />
    </React.Fragment>
  );
}

createRoot(document.getElementById('root')).render(<SchoolsApp />);
