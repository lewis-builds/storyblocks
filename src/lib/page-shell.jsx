/* Shared layout for the simple content pages: site header, a hero band, a
   reading column, and the site footer. Keeps each content page thin. */
import React from 'react';
import { SiteHeader, SiteFooter } from '../sections.jsx';

export function PageShell({ active = null, wash = 'sky', kicker, title, intro, children }) {
  return (
    <React.Fragment>
      <SiteHeader active={active} />
      <main>
        <section className="page-hero" style={{ background: `var(--sb-wash-${wash})` }}>
          <div className="sb-wrap">
            {kicker && <div className="sb-marker page-kicker">{kicker}</div>}
            <h1 className="sb-display page-title">{title}</h1>
            {intro && <p className="page-intro">{intro}</p>}
          </div>
        </section>
        <section className="page-body">
          <div className="sb-wrap prose">{children}</div>
        </section>
      </main>
      <SiteFooter />
    </React.Fragment>
  );
}
