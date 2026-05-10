/* global React, ReactDOM */
const { useState: useNavState, useEffect: useNavEffect, useRef: useNavRef } = React;

const NAV_ITEMS = ["Home", "Case Studies", "About Me"];
const NAV_HREFS = { "Home": "index.html", "Case Studies": "work.html", "About Me": "about.html" };

function Navbar({ active, backHref }) {
  active = active || "Home";
  const pillRef = useNavRef(null);
  const [ind, setInd] = useNavState({ left: 0, width: 0, ok: false });

  useNavEffect(() => {
    const pill = pillRef.current;
    if (!pill) return;
    const el = pill.querySelector('[data-nav="' + active + '"]');
    if (!el) return;
    const pr = pill.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    setInd({ left: er.left - pr.left, width: er.width, ok: true });
  }, [active]);

  function go(item) {
    if (item === active) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    window.location.href = NAV_HREFS[item];
  }

  return (
    <header className="snav">
      <div className="snav__inner">
        <a className="snav__brand" href="index.html">
          <div className="snav__av"><span className="snav__mono">AM</span></div>
          <span className="snav__name">Ahmad Majid</span>
        </a>

        <nav className="snav__pill" ref={pillRef}>
          <span
            className="snav__ind"
            style={{
              transform: 'translateX(' + ind.left + 'px)',
              width: ind.width,
              opacity: ind.ok ? 1 : 0,
            }}
          />
          {backHref ? (
            <a className="snav__back" href={backHref}>
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M11 7H4M7 4L4 7l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back
            </a>
          ) : null}
          {NAV_ITEMS.map(function(it) {
            return (
              <button
                key={it}
                data-nav={it}
                className={'snav__item' + (active === it ? ' is-active' : '')}
                onClick={function() { go(it); }}
              >{it}</button>
            );
          })}
        </nav>

        <button
          className="snav__cta"
          data-cal-link="ahmad-majid-7sgoyt/30min"
          data-cal-namespace="30min"
          data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
        >
          <span className="snav__dot" />
          Say hello
        </button>
      </div>
    </header>
  );
}

const snavCss = `
.snav {
  position: sticky; top: 0; z-index: 50;
  background: rgba(239,230,214,.78);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(20,40,30,.06);
  view-transition-name: site-nav;
}
::view-transition-group(site-nav) {
  animation-duration: .55s;
  animation-timing-function: cubic-bezier(.2,.8,.2,1);
}
.snav__inner {
  max-width: 1320px; margin: 0 auto;
  display: flex; align-items: center; justify-content: space-between;
  gap: 24px;
  padding: 14px clamp(20px, 4vw, 56px);
}
.snav__brand {
  display: flex; align-items: center; gap: 12px;
  text-decoration: none; flex-shrink: 0;
}
.snav__av {
  width: 36px; height: 36px; border-radius: 999px;
  background: linear-gradient(135deg,#3D3329,#1A1612);
  border: 2px solid var(--bg);
  display: grid; place-items: center;
  box-shadow: 0 1px 0 rgba(0,0,0,.12), 0 0 0 1px rgba(0,0,0,.06);
  position: relative; overflow: hidden;
}
.snav__av::after {
  content: ""; position: absolute; inset: 0;
  background: radial-gradient(120% 80% at 30% 25%, rgba(255,255,255,.18), transparent 55%);
}
.snav__mono {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px; color: #F4ECDC; letter-spacing: .04em; font-weight: 500;
  position: relative; z-index: 1;
}
.snav__name {
  font-weight: 600; font-size: 14px; color: var(--ink); letter-spacing: -0.01em;
}
.snav__pill {
  position: relative;
  display: flex; gap: 4px; align-items: center;
  background: rgba(246,239,224,.85);
  border: 1px solid rgba(0,0,0,.06);
  border-radius: 999px;
  padding: 5px;
  backdrop-filter: blur(8px);
}
.snav__ind {
  position: absolute;
  top: 5px; bottom: 5px;
  background: var(--ink);
  border-radius: 999px;
  transition: transform .42s cubic-bezier(.6,.1,.2,1), width .42s cubic-bezier(.6,.1,.2,1);
  box-shadow: 0 1px 2px rgba(0,0,0,.18) inset, 0 1px 0 rgba(255,255,255,.06);
}
.snav__back {
  position: relative; z-index: 1;
  display: inline-flex; align-items: center; gap: 6px;
  text-decoration: none;
  background: var(--ink); color: #F6EFE0;
  padding: 8px 14px 8px 12px; border-radius: 999px;
  font-size: 13.5px; font-weight: 500; letter-spacing: -0.01em;
  white-space: nowrap;
  transition: background .2s ease;
}
.snav__back:hover { background: #0F2820; }
.snav__item {
  position: relative; z-index: 1;
  border: 0; background: transparent; cursor: pointer;
  font: inherit; color: var(--ink);
  padding: 8px 16px; border-radius: 999px;
  font-size: 13.5px; font-weight: 500; letter-spacing: -0.01em;
  transition: color .25s ease;
  white-space: nowrap;
}
.snav__item.is-active { color: #F6EFE0; }
.snav__item:not(.is-active):hover { color: #000; }
.snav__cta {
  display: inline-flex; align-items: center; gap: 9px;
  background: var(--pill-dark); color: #F4ECDC;
  border: 0; cursor: pointer;
  padding: 10px 18px; border-radius: 4px;
  font-size: 14px; font-weight: 500; font-family: inherit;
  letter-spacing: -0.01em;
  box-shadow: 0 1px 0 rgba(255,255,255,.05) inset, 0 6px 18px rgba(0,0,0,.18);
  transition: transform .2s ease, box-shadow .2s ease;
  flex-shrink: 0;
}
.snav__cta:hover { transform: translateY(-1px); box-shadow: 0 1px 0 rgba(255,255,255,.05) inset, 0 10px 22px rgba(0,0,0,.22); }
.snav__dot {
  width: 8px; height: 8px; border-radius: 999px;
  background: #6BD08A;
  box-shadow: 0 0 0 3px rgba(107,208,138,.22);
  animation: snavBlink 2.4s ease-in-out infinite;
}
@keyframes snavBlink { 0%,100%{opacity:1} 50%{opacity:.55} }
@media (max-width: 920px) { .snav__pill { display: none; } }
@media (max-width: 600px) { .snav__cta span:not(.snav__dot) { display: none; } }
`;

(function() {
  const el = document.createElement('style');
  el.textContent = snavCss;
  document.head.appendChild(el);
})();

window.Navbar = Navbar;
