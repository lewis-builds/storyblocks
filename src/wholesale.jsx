/* Story Blocks - Wholesale / trade. The enquiry form posts to /api/contact,
   which emails it to us with Reply-To set to the retailer. */
import './lib/react-global.js';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { asset, CHAR_BASE } from './lib/core.js';
import { PageShell } from './lib/page-shell.jsx';
import { sendForm, Honeypot, FormError } from './lib/form-submit.jsx';

const { Button, Input, Textarea, Select } = window.StoryBlocksJournalDesignSystem_239fa7;
const EMAIL = 'hello@blockspublishing.com';
const BUSINESS_TYPES = ['Bookshop', 'Gift shop', 'Toy shop', 'Educational supplier', 'Online retailer', 'Other'];

function EnquiryForm() {
  const [shop, setShop] = React.useState('');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [type, setType] = React.useState(BUSINESS_TYPES[0]);
  const [message, setMessage] = React.useState('');
  const [company, setCompany] = React.useState(''); // honeypot
  const [errors, setErrors] = React.useState({});
  const [busy, setBusy] = React.useState(false);
  const [sendError, setSendError] = React.useState('');
  const [sent, setSent] = React.useState(false);

  const submit = async () => {
    const e = {};
    if (!shop.trim()) e.shop = 'Please add your business name';
    if (!name.trim()) e.name = 'Please add your name';
    if (!/^\S+@\S+\.\S+$/.test(email)) e.email = 'Please enter a valid email address';
    setErrors(e);
    if (Object.keys(e).length) return;

    setBusy(true);
    setSendError('');
    const result = await sendForm('wholesale', { shop, name, email, businessType: type, message, company });
    setBusy(false);
    if (result.ok) setSent(true);
    else setSendError(result.error);
  };

  if (sent) {
    return (
      <div className="panel" id="enquire" style={{ textAlign: 'center' }}>
        <img src={asset(CHAR_BASE + '/SB44.png')} alt="" style={{ width: 120 }} />
        <h2 style={{ marginTop: 12 }}>Enquiry sent! 🎉</h2>
        <p className="muted" style={{ marginTop: 10, lineHeight: 1.55 }}>
          Thanks {name.split(' ')[0]} - we've got your details for <strong>{shop}</strong> and
          we'll send the trade price list and terms shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="panel" id="enquire">
      <h2 style={{ marginTop: 0 }}>Trade enquiry</h2>
      <p className="muted" style={{ marginTop: 0, marginBottom: 18 }}>Tell us a little about your shop and
        we'll send our trade price list and set you up.</p>
      <div style={{ display: 'grid', gap: 16, position: 'relative' }}>
        <Input label="Business name" placeholder="e.g. The Corner Bookshop" value={shop}
          onChange={(e) => setShop(e.target.value)} error={errors.shop} />
        <Input label="Your name" placeholder="e.g. Jo Bloggs" value={name}
          onChange={(e) => setName(e.target.value)} error={errors.name} />
        <Input label="Your email" type="email" placeholder="e.g. jo@thecornerbookshop.co.uk" value={email}
          onChange={(e) => setEmail(e.target.value)} error={errors.email} />
        <Select label="Type of business" options={BUSINESS_TYPES} value={type}
          onChange={(e) => setType(e.target.value)} />
        <Textarea label="Anything else? (optional)" placeholder="Quantities you're thinking of, questions about terms…"
          rows={4} value={message} onChange={(e) => setMessage(e.target.value)} />
        <Honeypot value={company} onChange={(e) => setCompany(e.target.value)} />
        <Button size="lg" block iconRight={busy ? null : '→'} onClick={submit} disabled={busy}>
          {busy ? 'Sending…' : 'Send trade enquiry'}
        </Button>
        <FormError>{sendError}</FormError>
        <p className="muted" style={{ fontSize: '.88rem', textAlign: 'center', margin: 0 }}>
          Or email us directly at <a href={`mailto:${EMAIL}?subject=Wholesale%20enquiry`}>{EMAIL}</a>.
        </p>
      </div>
    </div>
  );
}

function Wholesale() {
  const steps = [
    { char: 'SB10', tint: 'var(--sb-wash-lemon)', title: 'Send an enquiry', body: 'Fill in the form or email us. Tell us your shop and roughly what you’re after.' },
    { char: 'SB33', tint: 'var(--sb-wash-sky)', title: 'We set you up', body: 'We send our trade price list and terms, and open a trade account for you.' },
    { char: 'SB44', tint: 'var(--sb-wash-pink)', title: 'Order & restock', body: 'Place your first order and reorder any time - restocking is quick and easy.' },
  ];
  return (
    <PageShell active={null} wash="green" kicker="Wholesale & trade"
      title="Stock Story Blocks in your shop"
      intro="Bookshops, gift shops, toy shops and educational suppliers - bring the daily writing journal that gets kids off screens to your shelves. Made in Britain, wrapped and ready to sell.">

      <h2>Why stock Story Blocks</h2>
      <ul>
        <li><strong>A screen-free bestseller.</strong> Parents are actively looking for it - loved by families and rated 4.9/5.</li>
        <li><strong>Made in Britain.</strong> A quality hardback with strong shelf appeal and perceived value.</li>
        <li><strong>A giftable single edition.</strong> One cheerful hardback, wrapped and ready to sell - simple to stock, no complicated range to manage.</li>
        <li><strong>Extra value in every box.</strong> Free sticker sheet and reward chart included - it sells itself at the till.</li>
        <li><strong>Point-of-sale support.</strong> Display materials and shelf-talkers available on request.</li>
      </ul>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,1fr)', gap: 40, alignItems: 'center', margin: '8px 0 8px' }} className="wholesale-grid">
        <div>
          <h2 style={{ marginTop: 0 }}>Trade terms</h2>
          <ul>
            <li><strong>Edition:</strong> the Standard Story Blocks Journal (the Gold Edition is not sold to trade).</li>
            <li><strong>Trade discount:</strong> competitive standard trade terms - rate confirmed with your price list.</li>
            <li><strong>Minimum opening order:</strong> just 10 units.</li>
            <li><strong>Lead time:</strong> orders usually dispatched within 5-7 working days.</li>
            <li><strong>Payment:</strong> pro-forma for a first order, account terms available after that.</li>
          </ul>
          <p className="muted" style={{ fontSize: '.92rem' }}>Terms are indicative - we'll confirm trade pricing,
            discount and carriage on your price list.</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
          <img src={asset('assets/storyblocks-book.png')} alt="The Story Blocks Journal - trade edition"
            style={{ width: 'min(280px, 80%)', borderRadius: 10, border: '3px solid var(--sb-ink)', boxShadow: 'var(--shadow-pop-lg)', transform: 'rotate(-2deg)' }} />
          <img className="sb-float" src={asset(CHAR_BASE + '/SB16.png')} alt="" style={{ position: 'absolute', width: 96, right: '4%', bottom: -26, pointerEvents: 'none' }} />
        </div>
      </div>

      <h2>How it works</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 20 }} className="wholesale-steps">
        {steps.map((s) => (
          <div key={s.title} style={{ background: s.tint, border: '3px solid var(--sb-ink)', borderRadius: 20, boxShadow: 'var(--shadow-pop)', padding: '22px 20px' }}>
            <img src={asset(CHAR_BASE + '/' + s.char + '.png')} alt="" style={{ width: 64 }} />
            <h3 style={{ marginTop: 8 }}>{s.title}</h3>
            <p style={{ marginBottom: 0 }}>{s.body}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 40 }}>
        <EnquiryForm />
      </div>

      <div className="callout" style={{ marginTop: 28 }}>
        <p><strong>Prefer email?</strong> Write to <a href={`mailto:${EMAIL}?subject=Wholesale%20enquiry`}>{EMAIL}</a> with
          the subject "Wholesale enquiry" and we'll send your trade price list.</p>
      </div>
    </PageShell>
  );
}

createRoot(document.getElementById('root')).render(<Wholesale />);
