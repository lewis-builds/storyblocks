/* Story Blocks - machine-readable page content (Markdown).
   Shared by the Edge middleware (Accept: text/markdown content negotiation and
   agent-friendly 404s) and the verification script. Pure data + helpers so it
   runs in the Edge runtime (no Node APIs). */

export const SITE = 'https://blockspublishing.com';

/* Markdown body per clean-URL path (no leading/trailing slash; '' = homepage). */
export const PAGES = {
  '': `# Sponsor Story Blocks journals for a UK primary school

Story Blocks lets a business - or an individual - **sponsor a batch of daily creative-writing journals for a UK primary school they nominate**. The buyer is doing a genuinely good local thing, and gets the recognition for it. Under £8.50 puts a journal in a child's hands.

## Sponsorship tiers (one-off)
- **Class** - 30 journals - **£249**
- **Year Group** - 60 journals - **£475** - includes a Gold Edition award copy for the school to present to a child
- **Whole School** - 90 journals - **£675** - includes the Gold Edition award copy

Every tier includes the **recognition pack**: a named bookplate in every copy ("Donated to [school] by [sponsor]"), a certificate for the sponsor, and a ready-made social post pack.

## How it works
1. Choose a tier.
2. Nominate a UK primary school (search the register, or ask us to choose one that's waiting for books).
3. Add your recognition details and pay securely by Stripe.

We always **confirm with the school before dispatch - we never send unannounced**. If they can't accept, we arrange your second choice with you.

## The journals
Each Story Blocks Journal gives a child aged 6+ a daily spark to write their own stories: three words and a friendly question, 70+ story starters across four kinds, writing tips and challenges, plus a sticker sheet and reward chart. Made in Britain.

## Who it's for
Local businesses, community groups and individuals who want to back a primary school's writing - and schools who'd like to join our receiving list.

## Key pages
- [Gift a journal (from £8.50)](${SITE}/gift)
- [Our mission](${SITE}/why)
- [Register your school](${SITE}/schools)
- [Free printable pack](${SITE}/resources)
- [Parents' Corner](${SITE}/parents)
- [FAQs](${SITE}/faqs)
- [About](${SITE}/about)
- [Contact](${SITE}/contact)
- [Delivery & dispatch](${SITE}/delivery)
- [Privacy policy](${SITE}/privacy)

See also: [llms.txt](${SITE}/llms.txt) and [sitemap.xml](${SITE}/sitemap.xml)`,

  'about': `# About Blocks Publishing

Blocks Publishing Ltd is a small British children's publisher behind the **Story Blocks Journal** - a daily creative-writing journal that gets children writing for the joy of it, away from screens.

Story Blocks began as a way to get one child writing at a kitchen table, and grew into a daily-writing journal with 70+ story starters, writing tips, a free sticker sheet and reward chart, and a free Parents' Corner of printables and guides. Every journal is printed and bound in Britain.

Today the journals reach children through **school sponsorship**: businesses and individuals sponsor batches for a UK primary school they nominate, and schools join our receiving list to be matched with sponsors.

- Contact: [hello@blockspublishing.com](mailto:hello@blockspublishing.com)
- [Our mission](${SITE}/why) · [Schools](${SITE}/schools) · [Contact](${SITE}/contact)`,

  'contact': `# Contact Story Blocks / Blocks Publishing

Questions about an order, the journal, the Parents' Corner or working with us? We're happy to help.

- Email: [hello@blockspublishing.com](mailto:hello@blockspublishing.com)
- Contact form: ${SITE}/contact
- Wholesale enquiries: ${SITE}/wholesale

We read every message and usually reply within a couple of working days. For order questions, include your order confirmation email so we can find it quickly.

Blocks Publishing Ltd - a British children's publisher. See our [About](${SITE}/about) and [Privacy policy](${SITE}/privacy).`,

  'privacy': `# Privacy policy

Blocks Publishing Ltd is the data controller for the personal data described here, in line with UK GDPR and the Data Protection Act 2018. Contact: [hello@blockspublishing.com](mailto:hello@blockspublishing.com).

## What we collect
Sponsorship details (sponsor/business name for the bookplate, contact email, the school you nominate), payment details (processed securely by Stripe - we never see full card numbers), email sign-ups for the free resources pack, school-registration details, and anything you send us via a form.

## Cookies and analytics
We keep cookies to a minimum and ask before setting any that aren't essential. Essential storage (your cookie choice) is always on. Google Analytics 4 runs only after you accept, via Google Consent Mode. Stripe's checkout pages use their own cookies for security.

## Your rights
Under UK GDPR you can access, correct, delete or port your data, object to processing, or withdraw consent. Every marketing email includes a one-click unsubscribe. Full policy: ${SITE}/privacy`,

  'schools': `# Register your school for sponsored journals

Local businesses sponsor batches of Story Blocks journals for UK primary schools. Join our **receiving list** - it's free, with no commitment - and when a sponsor asks us to choose a school, we match them with registered schools like yours.

A box includes hardback journals, sticker sheets and a wall reward chart - enough for a class, a year group or the whole school. We always confirm with you before anything ships.

Register your school: ${SITE}/schools`,

  'resources': `# Free printable pack

A free taste of Story Blocks you can print at home or in class - no journal required. Pop in your email and we unlock the downloads.

The pack includes three printable story starters (three words, an object and a scenario) plus the reward chart. If they love it, the full journal has 70+ story starters across all four types.

Get the free pack: ${SITE}/resources`,

  'parents': `# The Parents' Corner

A free online corner for the grown-ups: printable story starters, extra reward charts, and short, practical guides on helping a young writer find their feet - handy whether a child writes in a Story Blocks journal at home or has one from school.

Open it here: ${SITE}/parents`,

  'why': `# Why this matters

Writing for pleasure among children has fallen to near a 15-year low - around 1 in 4 children now enjoy writing in their free time, squeezed out by screens, schedules and school pressure.

Story Blocks exists to bring it back: five minutes of storytelling a day, away from screens, until writing stops being a chore and starts being theirs. Read more: ${SITE}/why`,

  'faqs': `# Frequently asked questions

Common questions about sponsoring Story Blocks journals - how sponsorship works, the tiers (Class 30, Year Group 60, Whole School 90), nominating a school, the recognition pack, dispatch, and what the journals contain.

See all answers: ${SITE}/faqs · Delivery: ${SITE}/delivery · Contact: ${SITE}/contact`,

  'delivery': `# Delivery & dispatch

Sponsored journals are delivered free to the nominated UK primary school, typically within a couple of weeks of us confirming with the school. We never send unannounced - we confirm with the school before dispatch, and share a delivery confirmation (with a photo where the school allows).

More detail and how to get in touch: ${SITE}/delivery`,

  'gift': `# Gift a journal to a child at school

For **£8.50** you put a Story Blocks daily creative-writing journal in a child's hands. We deliver gifted journals to UK primary schools in **classroom batches of 30** (an open pool - no named school at purchase).

- Gift 1, 5, 10 or any number at £8.50 each.
- A rolling tracker shows the next classroom filling up (N of 30).
- At 30 we match the classroom to a UK primary school and **confirm with them before delivery - never unannounced**.
- Every journal gifted reaches a school, guaranteed: if a classroom hasn't completed within 3 months, we complete it ourselves.

We're a small business, not a charity: your £8.50 covers the journal, delivery to the school, and keeps us making them. You can also **nominate a school** (anyone can) - confirmed schools go to the front of the queue. Gifting a whole classroom at once is a business [sponsorship](${SITE}/).

Gift a journal: ${SITE}/gift`,

  'wholesale': `# Wholesale & stockists

Interested in stocking the Story Blocks Journal in your shop? Tell us about your business and we'll be in touch. Enquiries: ${SITE}/wholesale`,

  'story-starters': `# Story starters

Browse the Story Blocks story starters - 70+ daily writing prompts across four types (three words, objects, scenarios and first lines). Each opens a full-screen writing experience. Browse: ${SITE}/story-starters`,
};

/* Prefixes that are real (dynamic) sections, so we don't 404 their Markdown. */
const KNOWN_PREFIXES = ['story-starters/', 'stickers/'];

export function normalizePath(pathname) {
  return String(pathname || '').replace(/^\/+/, '').replace(/\/+$/, '').toLowerCase();
}

/* Returns { status, body } for a Markdown request to `pathname`. */
export function markdownResponse(pathname) {
  const path = normalizePath(pathname);

  if (Object.prototype.hasOwnProperty.call(PAGES, path)) {
    return { status: 200, body: PAGES[path] + '\n' };
  }
  if (KNOWN_PREFIXES.some((p) => path.startsWith(p))) {
    const label = path.startsWith('stickers/') ? 'reward sticker' : 'story starter';
    return { status: 200, body: `# Story Blocks ${label}\n\nThis is a Story Blocks ${label} page. View it in your browser: ${SITE}/${path}\n\nHome: ${SITE}/ · Agent guide: ${SITE}/llms.txt\n` };
  }
  return {
    status: 404,
    body: `# 404 - Page not found\n\nThe page \`/${path}\` does not exist on Story Blocks Journal (blockspublishing.com).\n\nTry one of these instead:\n\n- Home: ${SITE}/\n- Sitemap: ${SITE}/sitemap.xml\n- Agent guide: ${SITE}/llms.txt\n`,
  };
}
