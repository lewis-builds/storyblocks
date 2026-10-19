/* Vercel Edge Middleware - Markdown content negotiation + agent-friendly 404s.
   Runs before the filesystem, so it can serve a Markdown representation of a
   page (including the homepage at /) when an agent sends `Accept: text/markdown`,
   while browsers keep getting the normal HTML. Unknown paths get a 404 with a
   Markdown error body. See acceptmarkdown.com. */
import { markdownResponse } from './lib/site-content.mjs';

export const config = {
  // Page routes only: skip /api, /assets, /_ds and any path with a file extension
  // (robots.txt, sitemap.xml, llms.txt, images, pdfs, the design-system bundle…).
  matcher: ['/((?!api/|assets/|_ds/|.*\\.[a-zA-Z0-9]+$).*)'],
};

export default function middleware(request) {
  const accept = request.headers.get('accept') || '';
  // Only intercept explicit Markdown requests; everything else proceeds to HTML.
  if (!/text\/markdown/i.test(accept)) return;

  const { pathname } = new URL(request.url);
  const { status, body } = markdownResponse(pathname);

  return new Response(body, {
    status,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Vary': 'Accept',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}
