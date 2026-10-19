/* Story Blocks - machine-readable page content (Markdown).
   Shared by the Edge middleware (Accept: text/markdown content negotiation and
   agent-friendly 404s) and the verification script. Pure data + helpers so it
   runs in the Edge runtime (no Node APIs). */

export const SITE = 'https://blockspublishing.com';

/* Markdown body per clean-URL path (no leading/trailing slash; '' = homepage). */
export const PAGES = {
  '': `# Story Blocks Journal

The daily creative-writing journal for children aged 6+.

Every day, Story Blocks gives a child three words and a friendly question to spark a story of their own, plus writing tips and mini challenges. There are **70+ story starters** across four kinds - three words, an object, a scenario and a first line - on pages made for young writers, with gentle nudges that build confidence without feeling like homework.

Every journal includes a **free sticker sheet and reward chart**, and unlocks the online **Parents' Corner** of printables and short guides for grown-ups. Made in Britain. £19.99 with free UK delivery.

## What's inside
- 70+ daily story starters, writing tips and challenges
- A free sticker sheet and reward chart in every journal
- Free Parents' Corner access - guides and printables
- A free online companion app for a daily nudge

## Who it's for
Parents, grandparents, carers and teachers who want to swap ten minutes of screen time for ten minutes of storytelling, and help a child aged roughly 6-11 build a daily writing habit.

## Key pages
- [Our mission](${SITE}/why)
- [Schools - free journals for UK schools](${SITE}/schools)
- [Free printable pack](${SITE}/resources)
- [Parents' Corner](${SITE}/parents)
- [FAQs](${SITE}/faqs)
- [About](${SITE}/about)
- [Contact](${SITE}/contact)
- [Delivery & returns](${SITE}/delivery)
- [Privacy policy](${SITE}/privacy)

See also: [llms.txt](${SITE}/llms.txt) and [sitemap.xml](${SITE}/sitemap.xml)`,

  'about': `# About Blocks Publishing

Blocks Publishing Ltd is a small British children's publisher behind the **Story Blocks Journal** - a daily creative-writing journal that gets children writing for the joy of it, away from screens.

Story Blocks began as a way to get one child writing at a kitchen table, and grew into a daily-writing journal with 70+ story starters, writing tips, a free sticker sheet and reward chart, and a free Parents' Corner of printables and guides. Every journal is printed and bound in Britain.

We also give free boxes of journals to UK schools: people nominate a school, and each term we send boxes for classrooms, libraries and writing clubs.

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
Order details (name, delivery address, email, order contents), payment details (processed securely by Stripe - we never see full card numbers), email sign-ups for the free resources pack, and anything you send us via a form.

## Cookies and analytics
We keep cookies to a minimum and ask before setting any that aren't essential. Essential storage (basket, cookie choice) is always on. Google Analytics 4 runs only after you accept, via Google Consent Mode. Stripe's checkout pages use their own cookies for security.

## Your rights
Under UK GDPR you can access, correct, delete or port your data, object to processing, or withdraw consent. Every marketing email includes a one-click unsubscribe. Full policy: ${SITE}/privacy`,

  'schools': `# Story Blocks for Schools

For every journal that finds a home, we help more find their way into UK classrooms: free boxes of Story Blocks journals, sticker sheets and wall reward charts, sent to schools where they'll be used and loved.

Schools don't apply - people nominate them. A parent, teacher, governor or neighbour tells us about a school, we pick schools from the nominations each term, and a box arrives at reception.

Nominate a school: ${SITE}/schools`,

  'resources': `# Free printable pack

A free taste of Story Blocks you can print at home or in class - no journal required. Pop in your email and we unlock the downloads.

The pack includes three printable story starters (three words, an object and a scenario) plus the reward chart. If they love it, the full journal has 70+ story starters across all four types.

Get the free pack: ${SITE}/resources`,

  'parents': `# The Parents' Corner

A free online corner for the grown-ups, included with every Story Blocks Journal and unlocked with the access code emailed after your order. Printable story starters, extra reward charts, and short, practical guides on helping a young writer find their feet.

Enter your code here: ${SITE}/parents`,

  'why': `# Why this matters

Writing for pleasure among children has fallen to near a 15-year low - around 1 in 4 children now enjoy writing in their free time, squeezed out by screens, schedules and school pressure.

Story Blocks exists to bring it back: five minutes of storytelling a day, away from screens, until writing stops being a chore and starts being theirs. Read more: ${SITE}/why`,

  'faqs': `# Frequently asked questions

Common questions about the Story Blocks Journal - ages and reading level, what's inside, the free sticker sheet and reward chart, delivery, the Parents' Corner access code, and returns.

See all answers: ${SITE}/faqs · Delivery: ${SITE}/delivery · Contact: ${SITE}/contact`,

  'delivery': `# Delivery & returns

Free UK mainland postage on every order, typically delivered in 2-4 working days. Made in Britain.

Not right? Our returns policy and how to get in touch are on the page: ${SITE}/delivery`,

  'gift': `# Give the Story Blocks Journal as a gift

A screen-free gift that keeps giving: a hardback daily creative-writing journal with story starters, a free sticker sheet and reward chart. Details: ${SITE}/gift`,

  'wholesale': `# Wholesale & stockists

Interested in stocking the Story Blocks Journal? Tell us about your shop and we'll be in touch. Enquiries: ${SITE}/wholesale`,

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
