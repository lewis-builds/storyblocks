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

      <p className="muted">Last updated: 27 September 2026</p>

      <h2>Who we are</h2>
      <p>Blocks Publishing Ltd ("we", "us") is the data controller for the personal data described
        here. You can reach us any time at <a href="mailto:hello@blockspublishing.com">hello@blockspublishing.com</a>.</p>

      <h2>What we collect</h2>
      <ul>
        <li><strong>Order details</strong> - your name, delivery address, email and order contents when
          you buy a journal.</li>
        <li><strong>Payment details</strong> - card payments are processed securely by Stripe. We never
          see or store your full card number.</li>
        <li><strong>Email sign-ups</strong> - the email address you give us for the free resources
          pack or general updates.</li>
        <li><strong>Messages</strong> - anything you send us via email or a form.</li>
      </ul>

      <h2>How we use it, and our legal basis</h2>
      <ul>
        <li>To <strong>fulfil your order</strong> and provide customer support - on the basis of
          performing our contract with you.</li>
        <li>To <strong>send the resources and updates</strong> you asked for - on the basis of
          your consent, which you can withdraw at any time.</li>
        <li>To <strong>run and improve our shop</strong> and keep it secure - on the basis of our
          legitimate interests.</li>
        <li>To <strong>meet legal obligations</strong>, such as keeping records for tax.</li>
      </ul>

      <h2>Who we share it with</h2>
      <p>We only share what's necessary, with providers who help us run the shop: our payment processor
        (Stripe), our hosting, our email provider, and - if you accept analytics cookies - Google
        Analytics. We do <strong>not</strong> sell your data, ever. Some providers, including Google,
        may process data outside the UK under appropriate safeguards.</p>

      <h2>Cookies and analytics</h2>
      <p>We keep cookies to a minimum and ask before setting any that aren't essential. When you first
        visit, a banner lets you accept or decline analytics. You can change your choice any time using
        the <strong>"Cookie settings"</strong> link in the footer.</p>
      <ul>
        <li><strong>Essential storage</strong> - small bits of data your browser needs for the site to
          work, like remembering your basket and your cookie choice. These don't track you and are
          always on. Our legal basis is our legitimate interest in a working site.</li>
        <li><strong>Analytics (Google Analytics 4)</strong> - only if you accept. It then sets cookies
          (for example, one named <em>_ga</em>) to give us anonymous, aggregated statistics on how the
          site is used - which pages are popular, roughly where visitors come from - so we can improve
          it. We use Google Consent Mode, so nothing analytics-related runs until you opt in, and if you
          decline, no analytics cookies are set. We don't use it for advertising and don't try to
          identify you. Our legal basis is your consent, which you can withdraw at any time.</li>
        <li><strong>Payment security (Stripe)</strong> - the checkout pages hosted by Stripe use their
          own cookies for security and fraud prevention.</li>
      </ul>
      <p>Google Analytics is provided by Google, which may process data outside the UK under appropriate
        safeguards. For more, see <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google's
        privacy policy</a> and their <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener">opt-out
        browser add-on</a>.</p>

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
        personal data from children, and the Parents' Corner is written for the adult in charge.</p>

      <h2>Changes</h2>
      <p>We may update this policy from time to time; the date at the top shows the latest version.</p>
    </PageShell>
  );
}

createRoot(document.getElementById('root')).render(<Privacy />);
