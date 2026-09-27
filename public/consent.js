/* Story Blocks - cookie consent banner + Google Consent Mode v2 toggle.
   Analytics stays denied until the visitor accepts; the choice is remembered
   in localStorage and re-applied by the gtag snippet on later page loads. */
(function () {
  var KEY = 'sb_cookie_consent';
  function gtag() { (window.dataLayer = window.dataLayer || []).push(arguments); }

  function setConsent(granted) {
    try { localStorage.setItem(KEY, granted ? 'granted' : 'denied'); } catch (e) {}
    gtag('consent', 'update', { analytics_storage: granted ? 'granted' : 'denied' });
  }

  var banner = null;
  function removeBanner() { if (banner) { banner.remove(); banner = null; } }

  function buildBanner() {
    if (banner) return;
    if (!document.getElementById('sb-cc-style')) {
      var st = document.createElement('style');
      st.id = 'sb-cc-style';
      st.textContent = [
        '#sb-cc{position:fixed;left:0;right:0;bottom:0;z-index:9999;display:flex;justify-content:center;padding:16px;padding-bottom:calc(16px + env(safe-area-inset-bottom,0px));pointer-events:none;}',
        '#sb-cc .sb-cc-card{pointer-events:auto;max-width:640px;width:100%;background:var(--sb-paper,#fff);color:var(--sb-ink,#231F20);border:3px solid var(--sb-ink,#231F20);border-radius:18px;box-shadow:6px 6px 0 0 var(--sb-ink,#231F20);padding:18px 20px;display:flex;gap:16px;align-items:center;flex-wrap:wrap;font-family:var(--font-body,system-ui,sans-serif);}',
        '#sb-cc .sb-cc-text{flex:1;min-width:220px;margin:0;font-size:.95rem;line-height:1.5;font-weight:600;}',
        '#sb-cc .sb-cc-text a{color:var(--sb-blue,#3A5896);font-weight:800;}',
        '#sb-cc .sb-cc-actions{display:flex;gap:10px;flex-shrink:0;}',
        '#sb-cc .sb-cc-btn{cursor:pointer;font-family:var(--font-body,system-ui,sans-serif);font-weight:800;font-size:.95rem;border:3px solid var(--sb-ink,#231F20);border-radius:12px;padding:10px 18px;transition:transform .12s ease,box-shadow .12s ease;}',
        '#sb-cc .sb-cc-accept{background:var(--sb-yellow,#FDCD2A);color:var(--sb-ink,#231F20);box-shadow:3px 3px 0 0 var(--sb-ink,#231F20);}',
        '#sb-cc .sb-cc-decline{background:var(--sb-paper,#fff);color:var(--sb-ink,#231F20);}',
        '#sb-cc .sb-cc-btn:active{transform:translate(2px,2px);box-shadow:1px 1px 0 0 var(--sb-ink,#231F20);}',
        '@media (max-width:560px){#sb-cc .sb-cc-actions{width:100%;}#sb-cc .sb-cc-btn{flex:1;}}'
      ].join('');
      document.head.appendChild(st);
    }
    banner = document.createElement('div');
    banner.id = 'sb-cc';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.innerHTML =
      '<div class="sb-cc-card">' +
        '<p class="sb-cc-text">We use analytics cookies to see how Story Blocks is used and make it better. ' +
        'You can accept, or decline and only essential cookies are used. See our <a href="/privacy">privacy policy</a>.</p>' +
        '<div class="sb-cc-actions">' +
          '<button type="button" class="sb-cc-btn sb-cc-decline">Decline</button>' +
          '<button type="button" class="sb-cc-btn sb-cc-accept">Accept</button>' +
        '</div>' +
      '</div>';
    banner.querySelector('.sb-cc-accept').addEventListener('click', function () { setConsent(true); removeBanner(); });
    banner.querySelector('.sb-cc-decline').addEventListener('click', function () { setConsent(false); removeBanner(); });
    (document.body || document.documentElement).appendChild(banner);
  }

  // Public API so a footer "Cookie settings" link can reopen the choice.
  window.sbCookieConsent = { open: buildBanner };

  // Show the banner on first visit only (no saved choice yet).
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  if (saved !== 'granted' && saved !== 'denied') {
    if (document.body) buildBanner();
    else document.addEventListener('DOMContentLoaded', buildBanner);
  }
})();
