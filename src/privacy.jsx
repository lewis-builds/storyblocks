/* Story Blocks - Privacy policy */
import './lib/react-global.js';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { PageShell } from './lib/page-shell.jsx';

function Privacy() {
  return (
    <PageShell active={null} wash="purple" kicker="Privacy policy"
      title="Your details, treated with care"
      intro="How Blocks Publishing Ltd collects and uses your personal data, in line with UK GDPR and the Data Protection Act 2018.">

      <p className="muted">Last updated: July 2026</p>

      <h2>Who we are</h2>
      <p>Blocks Publishing Ltd ("we", "us") is the data controller for the personal data described
        here. You can reach us any time at <a href="mailto:hello@blockspublishing.com">hello@blockspublishing.com</a>.</p>

      <h2>What we collect</h2>
      <ul>
        <li><strong>Order details</strong> - your name, delivery address, email and order contents when
          you buy a journal.</li>
        <li><strong>Payment details</strong> - card payments are processed securely by Stripe. We never
          see or store your full card number.</li>
        <li><strong>Email sign-ups</strong> - the email address you give us for the Parent Companion,
          the free resources pack, or general updates.</li>
        <li><strong>Messages</strong> - anything you send us via email or a form.</li>
      </ul>

      <h2>How we use it, and our legal basis</h2>
      <ul>
        <li>To <strong>fulfil your order</strong> and provide customer support - on the basis of
          performing our contract with you.</li>
        <li>To <strong>send the Parent Companion and updates</strong> you asked for - on the basis of
          your consent, which you can withdraw at any time.</li>
        <li>To <strong>run and improve our shop</strong> and keep it secure - on the basis of our
          legitimate interests.</li>
        <li>To <strong>meet legal obligations</strong>, such as keeping records for tax.</li>
      </ul>

      <h2>Who we share it with</h2>
      <p>We only share what's necessary, with providers who help us run the shop: our payment processor
        (Stripe), our hosting and our email provider. We do <strong>not</strong> sell your data, ever.
        Some providers may process data outside the UK under appropriate safeguards.</p>

      <h2>Cookies</h2>
      <p>The site uses only the storage needed to make it work - for example, remembering the contents
        of your basket in your browser. Payment pages hosted by Stripe use their own cookies for
        security and fraud prevention.</p>

      <h2>How long we keep it</h2>
      <p>Order and transaction records are kept as long as required for accounting and legal reasons
        (typically six years). Marketing contacts are kept until you unsubscribe.</p>

      <h2>Your rights</h2>
      <p>Under UK GDPR you can ask to access, correct, delete or port your data, object to certain
        processing, or withdraw consent. Every marketing email includes a one-click unsubscribe. To
        make a request, email <a href="mailto:hello@blockspublishing.com">hello@blockspublishing.com</a>.
        You also have the right to complain to the Information Commissioner's Office (ico.org.uk).</p>

      <h2>Children's privacy</h2>
      <p>The Story Blocks Journal is bought and managed by grown-ups. We don't knowingly collect
        personal data from children, and the Parent Companion is written for the adult in charge.</p>

      <h2>Changes</h2>
      <p>We may update this policy from time to time; the date at the top shows the latest version.</p>

      <div className="callout">
        <p className="muted">This policy is a clear starting point for a small shop. Before you go
          live, it's worth having it checked against your final setup - your registered company
          details, chosen email provider and any analytics you add.</p>
      </div>
    </PageShell>
  );
}

createRoot(document.getElementById('root')).render(<Privacy />);
