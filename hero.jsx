/* global React, ReactDOM, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakToggle, HoverPeek */
const { useState, useEffect, useRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "warm",
  "headlineMood": "serif",
  "showBadge": true,
  "animateOnLoad": true
}/*EDITMODE-END*/;

const PALETTES = {
  warm:   { peach: "#F8C495", lilac: "#C7C2F0", sky: "#B8DBEC", bg: "#EFE6D6", hero: "#F6EFE0", ink: "#163A2E", sun: "#F8E45A" },
  cool:   { peach: "#FFB4B4", lilac: "#9FB7E8", sky: "#A6E0D2", bg: "#E8ECEF", hero: "#F2F4F6", ink: "#1A2240", sun: "#FFD86B" },
  bold:   { peach: "#F4A26B", lilac: "#B8A9F0", sky: "#7CC5D9", bg: "#1A1A18", hero: "#22221F", ink: "#F4ECDC", sun: "#F8E45A" },
};

/* global Nav */
const NAV_HREFS = { "Home": "index.html", "Services": "services.html", "Case Studies": "work.html", "Reflections": "reflections.html", "About": "about.html" };
function navChange(item) { if (item !== "Home") window.location.href = NAV_HREFS[item]; }

// ---------- Sticker Badge ----------
function Badge({ visible }) {
  return (
    <div className={"badge " + (visible ? "is-on" : "is-off")} aria-hidden={!visible}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 .5l1.6 4.4 4.4 1.6-4.4 1.6L7 12.5 5.4 8.1.9 6.5l4.4-1.6L7 .5z" fill="#15140F"/>
      </svg>
      <span>Open to chat</span>
      <span className="badge__tail" />
    </div>
  );
}

// ---------- Inline mini pill (for the subline) ----------
function InlinePill({ tone = "dark", icon, children, href }) {
  const Tag = href ? "a" : "span";
  return (
    <Tag
      className={"inline-pill inline-pill--" + tone}
      href={href || undefined}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      style={href ? { textDecoration: "none" } : undefined}
    >
      {icon ? <span className="inline-pill__icon" aria-hidden>{icon}</span> : null}
      <span>{children}</span>
    </Tag>
  );
}

// ---------- Card deck ----------
// leftPct = horizontal anchor (0 = left of deck, 1 = right of deck)
// yOffset = vertical bob, rotate = tilt, z = stacking order
const CARDS = [
  {
    id: "recent",
    color: "peach",
    title: "Use Cases",
    body: "See how I solve problems for the companies I work with. Fair warning: the case studies run long. There's a TL;DR at the end.",
    cta: "View Use Cases",
    ctaHref: "work.html",
    rotate: -8,
    z: 1,
    leftPct: 0.18,
    yOffset: 14,
  },
  {
    id: "photo",
    color: "photo",
    title: null,
    body: null,
    cta: null,
    rotate: -3,
    z: 2,
    leftPct: 0.40,
    yOffset: 38,
  },
  {
    id: "indie",
    color: "lilac",
    title: "Creating Content",
    body: "This year I set a resolution to make educational reels about the small things we never stop to notice. Two million views later, it seems to be working.",
    cta: "View page",
    ctaHref: "https://www.instagram.com/omniahmadmajid/",
    rotate: 4,
    z: 3,
    leftPct: 0.60,
    yOffset: 28,
  },
  {
    id: "talks",
    color: "sky",
    label: null,
    title: "Ayn by Dal",
    body: "I'm currently a product designer at Dal, where we're building Ayn — an all-in-one KYC and compliance platform.",
    cta: "Visit Dal's website",
    ctaHref: "https://getdal.sa",
    rotate: 9,
    z: 4,
    leftPct: 0.82,
    yOffset: 14,
  },
];

function Card({ data, hovered, anyHovered, onHover, onLeave, animateOnLoad, mobile }) {
  const isMe = hovered === data.id;
  const dim  = anyHovered && !isMe;
  const baseTransform  = `translateY(${-data.yOffset}px) rotate(${data.rotate}deg)`;
  const hoverTransform = `translateY(${-data.yOffset - 22}px) rotate(${data.rotate * 0.35}deg) scale(1.04)`;
  const dimTransform   = `translateY(${-data.yOffset + 6}px) rotate(${data.rotate}deg) scale(0.985)`;

  const mobileStyle = { position: 'relative', bottom: 'auto', left: 'auto', width: '100%', height: '100%', transform: 'none', zIndex: 1 };
  const desktopStyle = {
    zIndex: isMe ? 99 : data.z,
    left: `calc(${data.leftPct * 100}% - 115px)`,
    transform: isMe ? hoverTransform : (dim ? dimTransform : baseTransform),
    animationDelay: animateOnLoad ? (data.z * 80 + 100) + "ms" : "0ms",
  };

  return (
    <div
      className={
        "card card--" + data.color +
        (!mobile && animateOnLoad ? " card--enter" : "") +
        (isMe ? " is-hovered" : "") +
        (dim ? " is-dim" : "")
      }
      style={mobile ? mobileStyle : desktopStyle}
      onMouseEnter={() => onHover(data.id)}
      onMouseLeave={onLeave}
    >
      {data.color === "photo" ? (
        <div className="card__photo">
          <div className="card__photo-img" aria-label="Photo of Ahmad Majid">
            <img src="images/heroimage.jpg" alt="Ahmad Majid" style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}} />
          </div>
        </div>
      ) : (
        <>
          {data.label !== null && data.label && <span className="card__label">{data.label}</span>}
          <h3 className="card__title">{data.title}</h3>
          <p className="card__body">{data.body}</p>
          {data.ctaHref ? (
            <a href={data.ctaHref} className="card__cta" target={data.ctaHref.startsWith('http') ? '_blank' : '_self'} rel="noopener">
              {data.cta}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h7M7 4l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          ) : (
            <button className="card__cta">
              {data.cta}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h7M7 4l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </>
      )}
    </div>
  );
}

const CARD_DURATION = 3400; // ms each card stays
const TICK_MS = 40;

function CardDeck({ animateOnLoad }) {
  const [hovered, setHovered] = useState(null);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 640);
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const touchStartX = useRef(null);
  const intervalRef = useRef(null);
  const anyHovered = !!hovered;
  const N = CARDS.length;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 640);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Timer: resets every time activeIdx or isMobile changes
  useEffect(() => {
    if (!isMobile) return;
    let elapsed = 0;
    setProgress(0);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      elapsed += TICK_MS;
      setProgress(Math.min(elapsed / CARD_DURATION, 1));
      if (elapsed >= CARD_DURATION) {
        clearInterval(intervalRef.current);
        setActiveIdx(i => (i + 1) % N);
      }
    }, TICK_MS);
    return () => clearInterval(intervalRef.current);
  }, [isMobile, activeIdx]);

  function goTo(idx) {
    setActiveIdx(((idx % N) + N) % N);
    // Effect dependency on activeIdx restarts timer automatically
  }

  if (isMobile) {
    return (
      <div className="deck-mobile-wrap">
        {/* Overflow container clips left/right; stage itself is overflow:visible for shadow */}
        <div className="deck-mobile-clip">
          <div
            className="deck-mobile-stage"
            onTouchStart={e => { touchStartX.current = e.touches[0].clientX; }}
            onTouchEnd={e => {
              if (touchStartX.current === null) return;
              const delta = e.changedTouches[0].clientX - touchStartX.current;
              touchStartX.current = null;
              if (delta < -44) goTo(activeIdx + 1);
              if (delta > 44)  goTo(activeIdx - 1);
            }}
          >
            {CARDS.map((c, i) => {
              let offset = i - activeIdx;
              if (offset > N / 2) offset -= N;
              if (offset < -N / 2) offset += N;
              const isActive = offset === 0;
              const isAdj = Math.abs(offset) === 1;
              return (
                <div
                  key={c.id}
                  className="deck-mobile-card"
                  style={{
                    left: '50%',
                    transform: `translateX(calc(-50% + ${offset * 256}px)) scale(${isActive ? 1 : 0.88})`,
                    opacity: isActive ? 1 : isAdj ? 0.42 : 0,
                    zIndex: isActive ? 3 : isAdj ? 2 : 0,
                    transition: 'transform .42s cubic-bezier(.4,.1,.2,1), opacity .35s ease',
                    pointerEvents: isActive ? 'auto' : 'none',
                  }}
                >
                  <Card data={c} hovered={null} anyHovered={false} onHover={() => {}} onLeave={() => {}} animateOnLoad={false} mobile={true} />
                </div>
              );
            })}
          </div>
          {/* Blurred edge faders — sit above cards */}
          <div className="deck-mobile-edge deck-mobile-edge--l" aria-hidden="true" />
          <div className="deck-mobile-edge deck-mobile-edge--r" aria-hidden="true" />
        </div>

        {/* Progress bar */}
        <div className="deck-mobile-progress">
          <div className="deck-mobile-progress-fill" style={{ transform: `scaleX(${progress})` }} />
        </div>
      </div>
    );
  }

  return (
    <div className="deck-wrap">
      <div className="deck">
        {CARDS.map(c => (
          <Card
            key={c.id}
            data={c}
            hovered={hovered}
            anyHovered={anyHovered}
            onHover={setHovered}
            onLeave={() => setHovered(null)}
            animateOnLoad={animateOnLoad}
          />
        ))}
      </div>
    </div>
  );
}

// ---------- Hero ----------
function Hero() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const palette = PALETTES[t.palette] || PALETTES.warm;

  // apply palette to CSS vars
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--bg", palette.bg);
    root.style.setProperty("--hero-bg", palette.hero);
    root.style.setProperty("--ink", palette.ink);
    root.style.setProperty("--peach", palette.peach);
    root.style.setProperty("--lilac", palette.lilac);
    root.style.setProperty("--sky", palette.sky);
    root.style.setProperty("--sun", palette.sun);
  }, [t.palette]);

  const headlineClass = "hero__headline hero__headline--" + t.headlineMood;

  return (
    <>
      <Nav active="Home" onChange={navChange} />
      <div className="page">

      <main className="hero" data-screen-label="01 Hero">
        <Badge visible={t.showBadge} />

        <h1 className={headlineClass}>
          <span className={"hero__line " + (mounted ? "is-in" : "")} style={{ transitionDelay: "60ms" }}>Hi, I'm Ahmad.</span>
          <span className={"hero__line " + (mounted ? "is-in" : "")} style={{ transitionDelay: "180ms" }}>
            Designer <em>&amp;</em> thinker.
          </span>
        </h1>

        <p className={"hero__sub " + (mounted ? "is-in" : "")} style={{ transitionDelay: "320ms" }}>
          Product Designer with a business analytics background
          <br />
          Shipping product features with{" "}
          <HoverPeek
            imageSrc="images/hero-pills/Dal.png"
            width={200}
            height={125}
          >
            <InlinePill tone="dark" href="https://getdal.sa" icon={
              <svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="3.5" fill="#F4A26B"/></svg>
            }>Dal</InlinePill>
          </HoverPeek>
          {" "}by day, building{" "}
          <HoverPeek
            imageSrc="images/hero-pills/Omnia.png"
            width={200}
            height={125}
          >
            <InlinePill tone="dark" href="https://www.instagram.com/omniahmadmajid/" icon={
              <svg width="10" height="10" viewBox="0 0 10 10"><rect x="1.5" y="1.5" width="7" height="7" rx="1.6" fill="#C7C2F0"/></svg>
            }>Omnia</InlinePill>
          </HoverPeek>
          {" "}by night.
        </p>

        <CardDeck animateOnLoad={t.animateOnLoad && mounted} />
      </main>

      <BooksSection />
      <TestsSection />
      <FooterSection />
      <LeadMagnetPopup />


<TweaksPanel title="Tweaks">
        <TweakSection title="Look">
          <TweakRadio
            label="Palette"
            value={t.palette}
            options={[
              { value: "warm", label: "Warm" },
              { value: "cool", label: "Cool" },
              { value: "bold", label: "Bold" },
            ]}
            onChange={v => setTweak("palette", v)}
          />
          <TweakRadio
            label="Headline"
            value={t.headlineMood}
            options={[
              { value: "serif", label: "Serif" },
              { value: "sans", label: "Sans" },
            ]}
            onChange={v => setTweak("headlineMood", v)}
          />
        </TweakSection>
        <TweakSection title="Behaviour">
          <TweakToggle
            label="Sticker badge"
            value={t.showBadge}
            onChange={v => setTweak("showBadge", v)}
          />
          <TweakToggle
            label="Entry animation"
            value={t.animateOnLoad}
            onChange={v => setTweak("animateOnLoad", v)}
          />
        </TweakSection>
      </TweaksPanel>
      </div>
    </>
  );
}

// ---------- Styles ----------
const css = `
.page {
  min-height: 100vh;
  padding: 22px clamp(20px, 4vw, 56px) 60px;
  position: relative;
}

/* ---- Hero card ---- */
.hero {
  position: relative;
  margin: 22px auto 0;
  max-width: 1320px;
  padding: 64px clamp(28px, 5vw, 72px) 80px;
  background: var(--hero-bg);
  border-radius: 36px;
  border: 1px solid rgba(0,0,0,.05);
  box-shadow: 0 1px 0 rgba(255,255,255,.6) inset, 0 30px 60px -40px rgba(20,40,30,.18);
  overflow: hidden;
}

/* Headline */
.hero__headline {
  margin: 0;
  color: var(--ink);
  font-weight: 800;
  letter-spacing: -0.035em;
  line-height: 0.98;
  font-size: clamp(40px, 7.4vw, 104px);
}
.hero__headline--serif { font-family: 'Newsreader', 'Source Serif 4', Georgia, serif; }
.hero__headline--sans  { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; letter-spacing: -0.045em; }
.hero__headline em {
  font-family: 'Newsreader', Georgia, serif;
  font-style: italic; font-weight: 500;
  color: var(--ink);
  opacity: .7;
}
.hero__headline--sans em { font-family: 'Newsreader', Georgia, serif; }
.hero__line {
  display: block;
  opacity: 0; transform: translateY(14px);
  transition: opacity .9s cubic-bezier(.2,.7,.2,1), transform .9s cubic-bezier(.2,.7,.2,1);
}
.hero__line.is-in { opacity: 1; transform: none; }

/* Sub */
.hero__sub {
  margin: 22px 0 0;
  max-width: 740px;
  color: var(--ink);
  font-size: clamp(15px, 1.25vw, 18px);
  font-weight: 500;
  line-height: 1.55;
  letter-spacing: -0.005em;
  opacity: 0; transform: translateY(8px);
  transition: opacity .9s cubic-bezier(.2,.7,.2,1), transform .9s cubic-bezier(.2,.7,.2,1);
}
.hero__sub.is-in { opacity: 1; transform: none; }

/* Inline pills inside sub */
.inline-pill {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 3px 10px 3px 6px;
  border-radius: 999px;
  font-size: 13px; font-weight: 600;
  vertical-align: 1px;
  white-space: nowrap;
  transition: transform .2s ease;
}
.inline-pill:hover { transform: translateY(-1px); }
.inline-pill--dark { background: var(--pill-dark); color: #F4ECDC; }
.inline-pill__icon {
  width: 18px; height: 18px; border-radius: 999px;
  background: rgba(255,255,255,.08);
  display: inline-grid; place-items: center;
}

/* Sticker badge */
.badge {
  position: absolute;
  top: 60px; right: clamp(28px, 5vw, 72px);
  background: var(--sun);
  color: var(--pill-dark);
  font-size: 13px; font-weight: 700;
  padding: 8px 14px 8px 12px;
  border-radius: 6px;
  display: inline-flex; align-items: center; gap: 8px;
  transform: rotate(8deg);
  box-shadow: 0 8px 18px rgba(0,0,0,.12), 0 1px 0 rgba(0,0,0,.05);
  letter-spacing: -0.005em;
  transition: transform .4s cubic-bezier(.5,1.6,.4,1), opacity .4s ease;
}
.badge.is-off { opacity: 0; transform: rotate(8deg) scale(.6) translateY(-12px); pointer-events: none; }
.badge::before {
  content: ""; position: absolute; left: 8px; right: 8px; bottom: 4px; top: 4px;
  border: 1px dashed rgba(0,0,0,.18);
  border-radius: 4px; pointer-events: none;
}
.badge:hover { transform: rotate(2deg) scale(1.04); }

/* ---- Card deck ---- */
.deck-wrap {
  margin: 56px clamp(-32px, -1.5vw, -8px) 0;
  perspective: 1600px;
  perspective-origin: 50% -10%;
}
.deck {
  position: relative;
  height: 320px;
  display: flex; justify-content: center;
  transform-style: preserve-3d;
}

.card {
  position: absolute;
  bottom: -10px;
  width: 230px; height: 290px;
  border-radius: 22px;
  padding: 22px 20px 20px;
  display: flex; flex-direction: column;
  justify-content: space-between;
  box-shadow:
    0 1px 0 rgba(255,255,255,.6) inset,
    0 18px 30px -14px rgba(20,30,20,.25),
    0 2px 6px rgba(20,30,20,.08);
  transform-origin: 50% 100%;
  transition: transform .55s cubic-bezier(.2,.8,.2,1), filter .35s ease, box-shadow .35s ease;
  will-change: transform;
}
.card.is-dim { filter: brightness(.94) saturate(.95); }
.card.is-hovered {
  box-shadow:
    0 1px 0 rgba(255,255,255,.7) inset,
    0 32px 50px -18px rgba(20,30,20,.32),
    0 4px 10px rgba(20,30,20,.12);
}
.card--peach { background: var(--peach); }
.card--lilac { background: var(--lilac); }
.card--sky   { background: var(--sky); }
.card--photo {
  background: #1A1612;
  padding: 10px;
}

.card__label {
  display: inline-block;
  font-size: 11px; font-weight: 700;
  letter-spacing: 0.06em; text-transform: uppercase;
  color: var(--pill-dark); opacity: .5;
  margin-bottom: 4px;
}

.card__title {
  font-family: 'Newsreader', Georgia, serif;
  font-weight: 700; font-style: italic;
  font-size: 24px; line-height: 1; margin: 4px 0 0;
  color: var(--pill-dark); letter-spacing: -0.02em;
}
.card__body {
  margin: 10px 0 0;
  font-size: 13px; line-height: 1.42;
  color: var(--pill-dark);
  font-weight: 500;
  max-width: 200px;
  opacity: .82;
}
.card__cta {
  align-self: flex-start;
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--pill-dark); color: #F4ECDC;
  border: 0; cursor: pointer; text-decoration: none;
  padding: 9px 14px;
  border-radius: 999px;
  font: inherit; font-size: 13px; font-weight: 600;
  line-height: 1;
  letter-spacing: -0.005em;
  box-shadow: 0 1px 0 rgba(255,255,255,.06) inset, 0 4px 10px rgba(0,0,0,.14);
  transition: transform .2s ease;
}
.card__cta:hover { transform: translateX(2px); }
.card__cta:active { transform: none; }

.card__photo { width: 100%; height: 100%; border-radius: 14px; overflow: hidden; }
.card__photo-img { width: 100%; height: 100%; }

/* Entry animation */
.card--enter {
  animation: cardEnter .9s cubic-bezier(.2,.8,.2,1) backwards;
}
@keyframes cardEnter {
  from { opacity: 0; transform: translate(0, 200px) rotate(0deg) scale(.92); }
}

/* Floating chat bubble bottom right */
.floater {
  position: fixed;
  right: 22px; bottom: 22px;
  z-index: 50;
}
.floater__bubble {
  width: 48px; height: 48px;
  border-radius: 999px;
  background: var(--pill-dark);
  display: grid; place-items: center;
  cursor: pointer;
  box-shadow: 0 10px 22px rgba(0,0,0,.22);
  transition: transform .2s ease;
}
.floater__bubble:hover { transform: translateY(-2px) rotate(-6deg); }

/* Bold palette text overrides */
.bold-mode .hero__headline,
.bold-mode .hero__sub { color: var(--ink); }

/* ── Mobile card carousel ── */
.deck-mobile-wrap {
  margin-top: 40px;
  display: flex; flex-direction: column; align-items: center;
}
/* clips left/right but lets shadow breathe at the bottom */
.deck-mobile-clip {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding-bottom: 20px; /* room for drop shadow */
  margin-bottom: -20px; /* cancel layout shift from padding */
}
.deck-mobile-stage {
  position: relative;
  width: 100%;
  height: 310px;
  display: flex; align-items: flex-end; justify-content: center;
  touch-action: pan-y;
  overflow: visible; /* don't clip shadows */
}
.deck-mobile-card {
  position: absolute;
  bottom: 20px; /* lifts card so shadow shows in padding area */
  width: 240px; height: 290px;
}
/* Blurred gradient overlays at left/right edges */
.deck-mobile-edge {
  position: absolute;
  top: 0; bottom: 0;
  width: 64px;
  z-index: 10;
  pointer-events: none;
}
.deck-mobile-edge--l {
  left: 0;
  background: linear-gradient(to right, var(--hero-bg) 0%, transparent 100%);
  -webkit-backdrop-filter: blur(3px);
  backdrop-filter: blur(3px);
  -webkit-mask-image: linear-gradient(to right, black 30%, transparent 100%);
  mask-image: linear-gradient(to right, black 30%, transparent 100%);
}
.deck-mobile-edge--r {
  right: 0;
  background: linear-gradient(to left, var(--hero-bg) 0%, transparent 100%);
  -webkit-backdrop-filter: blur(3px);
  backdrop-filter: blur(3px);
  -webkit-mask-image: linear-gradient(to left, black 30%, transparent 100%);
  mask-image: linear-gradient(to left, black 30%, transparent 100%);
}
/* Progress bar */
.deck-mobile-progress {
  width: 56px; height: 3px;
  background: rgba(20,40,30,.14);
  border-radius: 999px;
  overflow: hidden;
  margin-top: 22px;
}
.deck-mobile-progress-fill {
  height: 100%; width: 100%;
  background: var(--ink);
  transform-origin: left;
  border-radius: 999px;
  transition: transform .04s linear;
}

@media (max-width: 920px) {
  .deck { transform: scale(.78); transform-origin: 50% 0%; }
  .badge { display: none; }
}
@media (max-width: 640px) {
  .hero { padding-bottom: 48px; }
  .badge { display: none; }
}
`;

const styleEl = document.createElement('style');
styleEl.textContent = css;
document.head.appendChild(styleEl);

ReactDOM.createRoot(document.getElementById('root')).render(<Hero />);
