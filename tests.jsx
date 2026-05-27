/* global React */
const { useState: useStateT } = React;

const useInViewT = (window.__useInView) || function () {
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); io.disconnect(); }
    }, { threshold: 0, rootMargin: "0px 0px -80px 0px" });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return [ref, shown];
};

// A quote longer than this gets truncated with a "Read more" button
const TRUNCATE_AT = 120;

// ---------- Testimonials ----------
const TESTS = [
  {
    id: "t1",
    color: "peach",
    quote: "Ahmad is the rare designer who can both sketch the vision and ship the pixel. He raised the bar across our entire product surface.",
    name: "Maya Brennan",
    role: "VP Product · Lumen",
    initials: "MB",
    rotate: -6,
    z: 1,
    leftPct: 0.18,
    yOffset: 12,
  },
  {
    id: "t2",
    color: "lilac",
    quote: "We hired Ahmad for a redesign and got a thinking partner. He pushes back in the right ways and brings ideas I haven't seen anywhere else.",
    name: "Sina Park",
    role: "CEO · Sundial",
    initials: "SP",
    rotate: -2,
    z: 2,
    leftPct: 0.35,
    yOffset: 32,
  },
  {
    id: "t3",
    color: "sun",
    quote: "Half designer, half engineer, fully obsessive about the details. The prototype he handed us was already 80% production-ready.",
    name: "Devon Wright",
    role: "Eng Lead · Marker",
    initials: "DW",
    rotate: 4,
    z: 3,
    leftPct: 0.52,
    yOffset: 32,
  },
  {
    id: "t4",
    color: "sky",
    quote: "Calm, clear, and absurdly fast. Working with Ahmad felt like adding a senior designer and a senior PM to the team in one hire.",
    name: "Lena Voss",
    role: "Founder · Stoop",
    initials: "LV",
    rotate: 8,
    z: 4,
    leftPct: 0.70,
    yOffset: 12,
  },
  {
    id: "t5",
    color: "peach",
    quote: "I've worked with a lot of designers over the years, but Ahmad operates at a different level. What stands out most isn't just the quality of his output — it's the way he thinks about problems before a single frame is drawn. On our onboarding project, he spent the first two weeks doing something most designers skip: really understanding why users were dropping off. He interviewed 14 users, synthesised it all into a single insight, then designed from that truth. The result was an onboarding flow that cut time-to-value by 40%. He's the kind of collaborator who makes the whole team smarter.",
    name: "Priya Mehta",
    role: "CPO · Meridian",
    initials: "PM",
    rotate: -4,
    z: 0,
    leftPct: 0.86,
    yOffset: 20,
  },
];

function TestsSection() {
  const [ref, inView] = useInViewT();
  const [hovered,    setHovered]    = useStateT(null);
  const [expandedId, setExpandedId] = useStateT(null);

  return (
    <section ref={ref} className={"slab slab--tests " + (inView ? "is-in" : "")} id="tests" data-screen-label="05 Testimonials">
      <div className="slab__inner">
        <div className="work-head">
          <div>
            <div className="slab__eyebrow">
              <span>Kind words</span>
              <span className="eyebrow-chip eyebrow-chip--sky">12 collaborators · 5 yrs</span>
            </div>
            <h2 className="slab__h2">People I've shipped <em>with</em>.</h2>
          </div>
          <p className="work-head__lede">
            A few notes from teammates and founders I've worked alongside. Hover any card to read it up close.
          </p>
        </div>

        <div className="tests-wrap">
          <div className="tests-deck">
            {TESTS.map(t => (
              <TestCard
                key={t.id}
                data={t}
                hovered={hovered}
                anyHovered={!!hovered}
                onHover={setHovered}
                onLeave={() => setHovered(null)}
                expanded={expandedId === t.id}
                onExpand={() => setExpandedId(t.id)}
                onCollapse={() => setExpandedId(null)}
              />
            ))}
          </div>
          <div className="tests-baseline" aria-hidden="true">
            <span className="tests-baseline__dot" />
            <span className="tests-baseline__line" />
            <span className="tests-baseline__label">testimonials · 05</span>
            <span className="tests-baseline__line" />
            <span className="tests-baseline__dot" />
          </div>
        </div>
      </div>
    </section>
  );
}

function TestCard({ data, hovered, anyHovered, onHover, onLeave, expanded, onExpand, onCollapse }) {
  const isMe   = hovered === data.id;
  const isLong = data.quote.length > TRUNCATE_AT;
  const dim    = anyHovered && !isMe && !expanded;


  const baseTransform     = `translateY(${-data.yOffset}px) rotate(${data.rotate}deg)`;
  const hoverTransform    = `translateY(${-data.yOffset - 22}px) rotate(${data.rotate * 0.3}deg) scale(1.04)`;
  const dimTransform      = `translateY(${-data.yOffset + 6}px) rotate(${data.rotate}deg) scale(.985)`;
  const expandedTransform = `translateY(${-data.yOffset - 36}px) rotate(0deg)`;

  function handleCardClick() {
    if (isLong && !expanded) onExpand();
  }

  function handleClose(e) {
    e.stopPropagation();
    onCollapse();
  }

  const currentTransform = expanded
    ? expandedTransform
    : isMe ? hoverTransform
    : dim  ? dimTransform
    : baseTransform;

  return (
    <div
      className={[
        'test-card',
        'test-card--' + data.color,
        isMe && !expanded ? 'is-hovered' : '',
        dim               ? 'is-dim'     : '',
        expanded          ? 'is-expanded': '',
      ].filter(Boolean).join(' ')}
      style={{
        zIndex:    expanded ? 999 : isMe ? 99 : data.z,
        left:      `calc(${data.leftPct * 100}% - 145px)`,
        transform: currentTransform,
        cursor:    isLong && !expanded ? 'pointer' : 'default',
      }}
      onMouseEnter={() => { if (!expanded) onHover(data.id); }}
      onMouseLeave={() => { if (!expanded) onLeave(); }}
      onClick={handleCardClick}
    >
      {/* Close button — only shown when expanded */}
      {expanded && (
        <button className="test-card__close" onClick={handleClose} aria-label="Collapse">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1 1l8 8M9 1l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </button>
      )}

      <div className="test-card__quote-mark" aria-hidden="true">"</div>

      <p className="test-card__quote">
        {isLong && !expanded
          ? data.quote.slice(0, TRUNCATE_AT).trimEnd() + '…'
          : data.quote}
      </p>

      {/* Read more button — only on long, collapsed cards */}
      {isLong && !expanded && (
        <button
          className="test-card__more"
          onClick={e => { e.stopPropagation(); onExpand(); }}
        >
          Read more
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 5h6M5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      <div className="test-card__foot">
        <div className="test-card__avatar">
          <span>{data.initials}</span>
        </div>
        <div className="test-card__id">
          <div className="test-card__name">{data.name}</div>
          <div className="test-card__role">{data.role}</div>
        </div>
      </div>
    </div>
  );
}

const testsCss = `
.slab--tests { background: var(--hero-bg); padding-bottom: clamp(80px, 9vw, 140px); }

.tests-wrap {
  margin-top: 56px;
  perspective: 1600px;
  perspective-origin: 50% -10%;
}
.tests-deck {
  position: relative;
  height: 360px;
  display: flex; justify-content: center;
}

/* ── Card base ── */
.test-card {
  position: absolute;
  bottom: -10px;
  width: 290px;
  min-height: 260px;
  border-radius: 22px;
  padding: 24px 22px 20px;
  display: flex; flex-direction: column;
  justify-content: space-between;
  box-shadow:
    0 1px 0 rgba(255,255,255,.6) inset,
    0 18px 30px -14px rgba(20,30,20,.25),
    0 2px 6px rgba(20,30,20,.08);
  transform-origin: 50% 100%;
  transition:
    transform   .52s cubic-bezier(.2,.8,.2,1),
    width       .42s cubic-bezier(.2,.8,.2,1),
    min-height  .42s cubic-bezier(.2,.8,.2,1),
    margin-left .42s cubic-bezier(.2,.8,.2,1),
    filter      .35s ease,
    box-shadow  .35s ease;
  will-change: transform;
  cursor: default;
}
.test-card.is-dim { filter: brightness(.94) saturate(.95); }
.test-card.is-hovered {
  box-shadow:
    0 1px 0 rgba(255,255,255,.7) inset,
    0 34px 52px -18px rgba(20,30,20,.34),
    0 4px 10px rgba(20,30,20,.12);
}

/* ── Expanded state ── */
.test-card.is-expanded {
  width: 380px;
  margin-left: -45px;  /* re-centre: (380-290)/2 */
  box-shadow:
    0 1px 0 rgba(255,255,255,.7) inset,
    0 44px 64px -22px rgba(20,30,20,.42),
    0 8px 18px rgba(20,30,20,.14);
  cursor: default;
}

.test-card--peach { background: var(--peach); }
.test-card--lilac { background: var(--lilac); }
.test-card--sky   { background: var(--sky); }
.test-card--sun   { background: var(--sun); }

/* ── Close button (top-right when expanded) ── */
.test-card__close {
  position: absolute; top: 10px; right: 10px;
  width: 34px; height: 34px; border-radius: 999px;
  background: rgba(20,40,30,.12); border: none; cursor: pointer;
  display: grid; place-items: center;
  color: var(--ink); opacity: .6;
  z-index: 10;
  /* Larger invisible tap area */
  padding: 0;
  -webkit-tap-highlight-color: transparent;
  transition: opacity .15s ease, background .15s ease, transform .2s ease;
}
.test-card__close::before {
  content: ''; position: absolute; inset: -6px;
}
.test-card__close:hover { opacity: 1; background: rgba(20,40,30,.2); transform: rotate(90deg); }

/* ── Quote mark ── */
.test-card__quote-mark {
  font-family: 'Newsreader', Georgia, serif;
  font-size: 64px;
  line-height: .7;
  color: var(--ink);
  opacity: .25;
  margin: -6px 0 -10px -2px;
  font-style: italic;
  font-weight: 700;
  flex-shrink: 0;
}

/* ── Quote text ── */
.test-card__quote {
  margin: 0;
  font-family: 'Newsreader', Georgia, serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.4;
  letter-spacing: -0.01em;
  color: var(--ink);
  flex: 1;
}

/* ── Read more button ── */
.test-card__more {
  display: inline-flex; align-items: center; gap: 5px;
  background: none; border: none; cursor: pointer;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px; font-weight: 600; letter-spacing: .07em;
  text-transform: uppercase;
  color: var(--ink); opacity: .5;
  padding: 6px 0 2px; margin-top: 4px;
  align-self: flex-start;
  transition: opacity .15s ease, gap .15s ease;
  flex-shrink: 0;
}
.test-card__more:hover { opacity: .9; gap: 8px; }

/* ── Footer ── */
.test-card__foot {
  display: flex; align-items: center; gap: 12px;
  margin-top: 18px;
  padding-top: 14px;
  border-top: 1px dashed rgba(20,40,30,.22);
  flex-shrink: 0;
}
.test-card__avatar {
  width: 36px; height: 36px;
  border-radius: 999px;
  background: var(--ink);
  display: grid; place-items: center;
  flex-shrink: 0;
  box-shadow: 0 0 0 2px rgba(255,255,255,.45);
}
.test-card__avatar span {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  color: #F4ECDC;
  font-weight: 600;
  letter-spacing: .04em;
}
.test-card__name {
  font-size: 13px;
  font-weight: 700;
  color: var(--ink);
  letter-spacing: -0.005em;
  line-height: 1.1;
}
.test-card__role {
  margin-top: 3px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  color: var(--ink); opacity: .65;
  letter-spacing: .04em;
}

/* ── Baseline label ── */
.tests-baseline {
  display: flex; align-items: center; gap: 10px;
  margin: 30px auto 0;
  max-width: 480px;
  color: var(--ink); opacity: .45;
}
.tests-baseline__dot {
  width: 6px; height: 6px; border-radius: 999px;
  background: currentColor;
  flex-shrink: 0;
}
.tests-baseline__line {
  flex: 1; height: 1px;
  background: currentColor;
  opacity: .4;
}
.tests-baseline__label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px; letter-spacing: .12em;
  text-transform: uppercase;
}

/* ── Responsive ── */
@media (max-width: 1180px) {
  .tests-deck { transform: scale(.78); transform-origin: 50% 0%; height: 300px; }
}
@media (max-width: 820px) {
  .tests-deck {
    transform: none;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 14px;
  }

  /* Reset all desktop positioning/rotation so cards stack flat */
  .test-card {
    position: relative !important;
    left: 0 !important;
    bottom: auto !important;
    transform: none !important;   /* no rotation, no translateY */
    width: 100% !important;
    margin-left: 0 !important;
    /* min-height + transition from base CSS still apply — card grows downward on expand */
  }

  /* Expanded card on mobile — full width, bigger shadow, no side offset */
  .test-card.is-expanded {
    width: 100% !important;
    margin-left: 0 !important;
    transform: none !important;
    box-shadow:
      0 1px 0 rgba(255,255,255,.7) inset,
      0 28px 44px -16px rgba(20,30,20,.36),
      0 6px 14px rgba(20,30,20,.12);
  }
}
`;

const testsStyleEl = document.createElement('style');
testsStyleEl.textContent = testsCss;
document.head.appendChild(testsStyleEl);

Object.assign(window, { TestsSection });
