/* Story Blocks - story-starter arrival intro.
   When a starter page loads (e.g. straight after scanning its QR code) the
   character pops in front-and-centre, does a little shuffle, then the view
   pulls back to reveal the full starter. Skippable by tapping; respects
   prefers-reduced-motion. Shared by the three-words and prompt experiences. */
import React from 'react';

const INTRO_CSS = `
.sb-intro{ position:fixed; inset:0; z-index:300; display:flex; align-items:center; justify-content:center;
  background:var(--sb-intro-bg, var(--sb-cream)); cursor:pointer;
  animation:sb-intro-fade 2.1s ease both; }
.sb-intro-char{ width:min(60vw, 300px); height:auto; will-change:transform, opacity; filter:drop-shadow(6px 10px 0 rgba(35,31,32,.12));
  animation:sb-intro-pop 2.1s cubic-bezier(.34,1.5,.5,1) both; }
@keyframes sb-intro-pop{
  0%{   opacity:0; transform:rotate(0) scale(.5); }
  14%{  opacity:1; transform:rotate(0) scale(1); }
  26%{  transform:rotate(-5deg) scale(1); }
  36%{  transform:rotate(5deg) scale(1); }
  46%{  transform:rotate(-3deg) scale(1.06); }
  56%{  transform:rotate(0) scale(1); }
  68%{  opacity:1; transform:rotate(0) scale(1); }
  100%{ opacity:1; transform:rotate(0) scale(.9); }
}
@keyframes sb-intro-fade{ 0%,66%{ opacity:1; } 100%{ opacity:0; visibility:hidden; } }
/* the page itself settles from a hair zoomed-in as the intro pulls back */
html.sb-intro-on .sw, html.sb-intro-on .sp{ animation:sb-content-in 2.1s ease both; }
@keyframes sb-content-in{ 0%,55%{ transform:scale(1.05); } 100%{ transform:scale(1); } }
@media (prefers-reduced-motion:reduce){
  .sb-intro{ display:none; }
  html.sb-intro-on .sw, html.sb-intro-on .sp{ animation:none; }
}`;

export function StarterIntro({ image, bg }) {
  const [done, setDone] = React.useState(false);

  const finish = React.useCallback(() => {
    setDone(true);
    document.documentElement.classList.remove('sb-intro-on');
  }, []);

  React.useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.documentElement.classList.add('sb-intro-on');
    if (reduce) { finish(); return; }
    const t = setTimeout(finish, 2100);
    return () => { clearTimeout(t); document.documentElement.classList.remove('sb-intro-on'); };
  }, [finish]);

  if (done) return null;
  return (
    <React.Fragment>
      <style>{INTRO_CSS}</style>
      <div className="sb-intro" style={{ ['--sb-intro-bg']: bg }} onClick={finish} aria-hidden="true">
        <img className="sb-intro-char" src={'/' + image} alt="" />
      </div>
    </React.Fragment>
  );
}
