/* Story Blocks - Contact us. No backend: the form composes an email in the
   visitor's own mail app, and the address is shown plainly as a fallback. */
import './lib/react-global.js';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { asset, CHAR_BASE } from './lib/core.js';
import { PageShell } from './lib/page-shell.jsx';

const { Button, Input, Textarea } = window.StoryBlocksJournalDesignSystem_239fa7;
const EMAIL = 'hello@blockspublishing.com';

function ContactForm() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [errors, setErrors] = React.useState({});

  const submit = () => {
    const e = {};
    if (!name.trim()) e.name = 'Please add your name';
    if (!/^\S+@\S+\.\S+$/.test(email)) e.email = 'Please enter a valid email address';
    if (!message.trim()) e.message = 'Please add a short message';
    setErrors(e);
    if (Object.keys(e).length) return;
    const subject = encodeURIComponent(`Website enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="panel">
      <div style={{ display: 'grid', gap: 16 }}>
        <Input label="Your name" placeholder="e.g. Jo Bloggs" value={name}
          onChange={(e) => setName(e.target.value)} error={errors.name} />
        <Input label="Your email" type="email" placeholder="e.g. jo@example.co.uk" value={email}
          onChange={(e) => setEmail(e.target.value)} error={errors.email} />
        <Textarea label="Message" placeholder="How can we help?" rows={5} value={message}
          onChange={(e) => setMessage(e.target.value)} error={errors.message} />
        <Button size="lg" block iconRight="→" onClick={submit}>Send message</Button>
        <p className="muted" style={{ fontSize: '.88rem', textAlign: 'center', margin: 0 }}>
          This opens your email app with the message ready to send.
        </p>
      </div>
    </div>
  );
}

function Contact() {
  return (
    <PageShell active={null} wash="peach" kicker="Contact us"
      title="Say hello - we read everything"
      intro="A question about an order, an idea, or a story your child wrote that made you laugh? We'd love to hear from you.">

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.1fr)', gap: 40, alignItems: 'start' }} className="contact-grid">
        <div>
          <h2>The quick ways</h2>
          <p>Email us directly at <a href={`mailto:${EMAIL}`}>{EMAIL}</a> - we usually reply within
            <strong> two working days</strong>.</p>
          <ul>
            <li><strong>Orders & delivery:</strong> have your order number handy and see the
              <a href="/delivery"> delivery & returns</a> page.</li>
            <li><strong>Common questions</strong> are answered on the <a href="/faqs">FAQs</a>.</li>
            <li><strong>Schools:</strong> nominate a school on the <a href="/schools">schools page</a>.</li>
          </ul>
          <img src={asset(CHAR_BASE + '/SB50.png')} alt="" className="sb-float"
            style={{ width: 120, marginTop: 12 }} />
        </div>
        <ContactForm />
      </div>

      <p className="muted" style={{ marginTop: 32 }}>Blocks Publishing Ltd · blockspublishing.com</p>
    </PageShell>
  );
}

createRoot(document.getElementById('root')).render(<Contact />);
