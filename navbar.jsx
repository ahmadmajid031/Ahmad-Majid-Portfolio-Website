/* global React */
const { useEffect: useNavEffect, useRef: useNavRef } = React;

function Nav({ active, onChange }) {
  const items = ["Home", "Case Studies", "About"];
  const navRef = useNavRef(null);
  const pillRef = useNavRef(null);

  useNavEffect(() => {
    const container = navRef.current;
    const pill = pillRef.current;
    if (!container || !pill) return;

    const toEl = container.querySelector(`[data-nav="${active}"]`);
    if (!toEl) return;

    const parent = container.getBoundingClientRect();
    const toRect = toEl.getBoundingClientRect();
    const toLeft = toRect.left - parent.left;
    const toWidth = toRect.width;

    const fromTab = sessionStorage.getItem('nav_from');
    sessionStorage.removeItem('nav_from');

    if (fromTab && fromTab !== active) {
      const fromEl = container.querySelector(`[data-nav="${fromTab}"]`);
      if (fromEl) {
        const fromRect = fromEl.getBoundingClientRect();
        const fromLeft = fromRect.left - parent.left;
        const fromWidth = fromRect.width;

        // Teleport to the "from" position with no transition, then slide to "to"
        pill.style.transition = 'none';
        pill.style.transform = `translateX(${fromLeft}px)`;
        pill.style.width = `${fromWidth}px`;
        pill.style.opacity = '1';

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            pill.style.transition = '';
            pill.style.transform = `translateX(${toLeft}px)`;
            pill.style.width = `${toWidth}px`;
          });
        });
        return;
      }
    }

    // No "from" context — just appear in place
    pill.style.transition = 'none';
    pill.style.transform = `translateX(${toLeft}px)`;
    pill.style.width = `${toWidth}px`;
    pill.style.opacity = '1';
  }, [active]);

  function handleClick(item) {
    sessionStorage.setItem('nav_from', active);
    onChange(item);
  }

  return (
    <header className="nav">
      <div className="nav__inner">
        <div className="nav__brand">
          <img src="Images/navbar-logo.png" alt="Ahmad Majid" className="nav__logo" />
          <span className="nav__name">Ahmad Majid</span>
        </div>

        <nav className="nav__pill" ref={navRef}>
          <span ref={pillRef} className="nav__pill-active" style={{ opacity: 0 }} />
          {items.map(it => (
            <button
              key={it}
              data-nav={it}
              className={"nav__item " + (active === it ? "is-active" : "")}
              onClick={() => handleClick(it)}
            >{it}</button>
          ))}
        </nav>

        <a href="contact.html" className="nav__cta">
          <span className="nav__cta-dot" />
          Say hello
        </a>
      </div>
    </header>
  );
}

// ---------- Nav styles ----------
const navCss = `
.nav {
  position: sticky; top: 0; z-index: 50;
  background: rgba(239,230,214,.92);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(20,40,30,.08);
  padding: 12px clamp(20px, 4vw, 56px);
}
.nav__inner {
  max-width: 1320px;
  margin: 0 auto;
  width: 100%;
  display: flex; align-items: center; justify-content: space-between;
  gap: 24px;
}
.nav__brand { display: flex; align-items: center; gap: 12px; text-decoration: none; }
.nav__logo { height: 36px; width: auto; display: block; }
.nav__name {
  font-weight: 600; font-size: 15px; color: var(--ink); letter-spacing: -0.01em;
}

.nav__pill {
  position: relative;
  display: flex; gap: 4px; align-items: center;
  background: rgba(246,239,224,.85);
  border: 1px solid rgba(0,0,0,.06);
  border-radius: 999px;
  padding: 5px;
  backdrop-filter: blur(8px);
}
.nav__pill-active {
  position: absolute;
  top: 5px; bottom: 5px;
  background: var(--ink);
  border-radius: 999px;
  transition: transform .42s cubic-bezier(.6,.1,.2,1), width .42s cubic-bezier(.6,.1,.2,1);
  box-shadow: 0 1px 2px rgba(0,0,0,.18) inset, 0 1px 0 rgba(255,255,255,.06);
}
.nav__item {
  position: relative; z-index: 1;
  border: 0; background: transparent; cursor: pointer;
  font: inherit; color: var(--ink);
  padding: 9px 18px; border-radius: 999px;
  font-size: 14px; font-weight: 500; letter-spacing: -0.01em;
  text-align: center;
  display: inline-flex; align-items: center; justify-content: center;
  transition: color .25s ease, background-color .25s ease;
}
.nav__item.is-active { color: #F6EFE0; }
.nav__item:not(.is-active):hover {
  background: rgba(22, 58, 46, 0.08);
  color: var(--ink);
}

.nav__cta {
  display: inline-flex; align-items: center; gap: 9px;
  background: var(--pill-dark); color: #F4ECDC;
  border: 0; cursor: pointer; text-decoration: none;
  padding: 11px 18px; border-radius: 4px;
  font-size: 14px; font-weight: 500; font-family: inherit;
  letter-spacing: -0.01em;
  box-shadow: 0 1px 0 rgba(255,255,255,.05) inset, 0 6px 18px rgba(0,0,0,.18);
  transition: transform .2s ease, box-shadow .2s ease;
}
.nav__cta:hover { transform: translateY(-1px); box-shadow: 0 1px 0 rgba(255,255,255,.05) inset, 0 10px 22px rgba(0,0,0,.22); }
.nav__cta-dot {
  width: 8px; height: 8px; border-radius: 999px;
  background: #6BD08A;
  box-shadow: 0 0 0 3px rgba(107,208,138,.22);
  animation: blink 2.4s ease-in-out infinite;
}
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:.55} }

@media (max-width: 920px) {
  .nav__pill { display: none; }
}
`;

const navStyleEl = document.createElement('style');
navStyleEl.textContent = navCss;
document.head.appendChild(navStyleEl);

window.Nav = Nav;
