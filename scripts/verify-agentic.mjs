/* Agentic-readiness verification (acts as the test suite for the agent-readiness
   work). Checks what can be verified without a live deploy:
     - Markdown content module: homepage markdown, known pages, 404 markdown body
     - Built HTML: >=500 chars of real text + an <h1> on the homepage and the
       trust-anchor pages (about/contact/privacy)
     - llms.txt: present with a "When to use" section
     - middleware.js + vercel.json wiring for content negotiation
   The Edge-middleware HTTP behaviour (Accept: text/markdown, Vary header, 404
   status) can only be confirmed on Vercel - see the curl commands printed at
   the end. Run with: npm run verify:agentic  (builds first). */
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { markdownResponse, PAGES } from '../lib/site-content.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = resolve(ROOT, 'dist');

let failures = 0;
const ok = (name) => console.log(`  ✓ ${name}`);
const fail = (name, detail) => { failures++; console.log(`  ✗ ${name}${detail ? ' - ' + detail : ''}`); };
function check(name, cond, detail) { cond ? ok(name) : fail(name, detail); }

/* --- strip tags, return visible text length + whether an <h1> exists --- */
function rootText(html) {
  const m = html.match(/<div id="root">([\s\S]*?)<\/div>/);
  const inner = m ? m[1] : '';
  const text = inner.replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim();
  return { text, len: text.length, hasH1: /<h1[\s>]/.test(inner) };
}

console.log('\n1) Markdown content module');
{
  const home = markdownResponse('/');
  check('homepage: 200 status', home.status === 200, 'got ' + home.status);
  check('homepage: >=500 chars of markdown', home.body.length >= 500, home.body.length + ' chars');
  check('homepage: has an H1', /^#\s+\S/m.test(home.body));

  const nf = markdownResponse('/this-path-does-not-exist-xyz');
  check('404 path: 404 status', nf.status === 404, 'got ' + nf.status);
  check('404 path: >=20 chars body', nf.body.length >= 20, nf.body.length + ' chars');
  check('404 path: links to sitemap or llms.txt', /sitemap\.xml|llms\.txt/.test(nf.body));

  const about = markdownResponse('/about');
  check('known page (about): 200', about.status === 200, 'got ' + about.status);
  const dyn = markdownResponse('/story-starters/sb01-s');
  check('dynamic page (story-starter): 200', dyn.status === 200, 'got ' + dyn.status);
  check('content map covers the main nav', ['', 'about', 'contact', 'privacy', 'schools', 'resources', 'parents', 'faqs', 'why'].every((p) => p in PAGES));
}

console.log('\n2) Built HTML - raw content for crawlers');
if (!existsSync(DIST)) {
  fail('dist/ exists', 'run "npm run build" first');
} else {
  for (const [file, label] of [['index.html', 'homepage'], ['about.html', 'about'], ['contact.html', 'contact'], ['privacy.html', 'privacy']]) {
    const p = resolve(DIST, file);
    if (!existsSync(p)) { fail(`${label}: built`, file + ' missing'); continue; }
    const { len, hasH1 } = rootText(readFileSync(p, 'utf8'));
    check(`${label}: >=500 chars of raw text`, len >= 500, len + ' chars');
    check(`${label}: has an <h1>`, hasH1);
  }
}

console.log('\n3) Agent instruction file (llms.txt)');
{
  const p = resolve(DIST, 'llms.txt');
  if (!existsSync(p)) fail('llms.txt built into dist', 'missing');
  else {
    const t = readFileSync(p, 'utf8');
    check('llms.txt: has a "When to use" section', /when to use/i.test(t));
    check('llms.txt: >=300 chars', t.length >= 300, t.length + ' chars');
    check('llms.txt: links to pages', /blockspublishing\.com/.test(t));
  }
}

console.log('\n4) Content-negotiation wiring');
{
  const mw = resolve(ROOT, 'middleware.js');
  check('middleware.js present', existsSync(mw));
  if (existsSync(mw)) {
    const t = readFileSync(mw, 'utf8');
    check('middleware negotiates text/markdown', /text\\?\/markdown/.test(t));
    check('middleware sets Vary: Accept', /Vary/.test(t) && /Accept/.test(t));
  }
  const vj = JSON.parse(readFileSync(resolve(ROOT, 'vercel.json'), 'utf8'));
  const varyRule = (vj.headers || []).some((h) => (h.headers || []).some((x) => /vary/i.test(x.key) && /accept/i.test(x.value)));
  check('vercel.json adds Vary: Accept header', varyRule);
}

console.log('\nLocal checks ' + (failures ? `FAILED (${failures})` : 'passed'));
console.log('\nConfirm the live Edge behaviour after deploy:');
console.log("  curl -sS -L -i -H 'Accept: text/markdown' https://blockspublishing.com/");
console.log("  curl -sS -L -i -H 'Accept: text/html'     https://blockspublishing.com/");
console.log("  curl -sS -L -i -H 'Accept: text/markdown' https://blockspublishing.com/no-such-page");
process.exit(failures ? 1 : 0);
