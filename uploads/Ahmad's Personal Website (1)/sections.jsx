/* global React */
const { useEffect: useEffectS, useRef: useRefS, useState: useStateS } = React;

// In-view hook for fade-up reveals
function useInView(threshold = 0.18) {
  const ref = useRefS(null);
  const [shown, setShown] = useStateS(false);
  useEffectS(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); io.disconnect(); }
    }, { threshold: 0, rootMargin: "0px 0px -80px 0px" });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return [ref, shown];
}

// ---------- About section ----------
function AboutSection() {
  const [ref, inView] = useInView();
  return (
    <section ref={ref} className={"slab slab--about " + (inView ? "is-in" : "")} id="about">
      <div className="slab__inner">
        <div className="slab__eyebrow">A bit about me</div>
        <h2 className="slab__h2">
          Design is how I think.
          <br />
          Building is how I <em>prove</em> it.
        </h2>

        <div className="about-row">
          <div className="about-card">
            <div className="about-card__media" aria-label="Photo: Ahmad on stage">
              <svg viewBox="0 0 600 360" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
                <defs>
                  <linearGradient id="abg" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#3D3329"/>
                    <stop offset="1" stopColor="#1A1612"/>
                  </linearGradient>
                  <radialGradient id="screen" cx="50%" cy="45%" r="35%">
                    <stop offset="0" stopColor="#B8DBEC" stopOpacity=".95"/>
                    <stop offset="1" stopColor="#1F4A6A" stopOpacity=".15"/>
                  </radialGradient>
                </defs>
                <rect width="600" height="360" fill="url(#abg)"/>
                {/* projector screen */}
                <rect x="170" y="80" width="260" height="150" rx="6" fill="url(#screen)"/>
                <rect x="170" y="80" width="260" height="150" rx="6" fill="none" stroke="rgba(255,255,255,.18)"/>
                {/* audience silhouettes */}
                {[...Array(28)].map((_, i) => (
                  <circle key={i} cx={20 + i * 21 + (i % 3) * 4} cy={310 + (i % 4) * 6} r={14 + (i % 3) * 2} fill="#0E0B08" opacity=".85"/>
                ))}
                <text x="300" y="160" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="rgba(255,255,255,.55)" letterSpacing="2">CONFERENCE TALK</text>
                <text x="300" y="178" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="rgba(255,255,255,.4)" letterSpacing="1">drop your photo</text>
              </svg>
            </div>
          </div>

          <div className="about-copy">
            <p>
              Being a designer with an engineering and data background, I've always
              felt like I'm in a different room. Now that's my superpower.
            </p>
            <p className="about-copy__small">
              Twelve years across product, growth, and ML tooling. I think in flows,
              ship in pixels, and write the code when the prototype needs to feel
              real.
            </p>
            <a className="dark-cta" href="#about">
              Learn more about Ahmad
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h7M7 4l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Work section ----------
const WORK = [
  {
    slug: "miro-ai",
    year: "2025",
    title: "AI-first Miro",
    blurb: "Redesigned how work begins in Miro, turning the blank-board moment into an AI-guided starting point for faster collaboration with AI.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
    accent: "#F4D24A",
  },
  {
    slug: "miro-templates",
    year: "2024",
    title: "Templates, reborn",
    blurb: "Rethought the template gallery as a personal recommendation engine — surfaced the right starting point in two clicks instead of twelve.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1400&q=80",
    accent: "#9B8DE8",
  },
  {
    slug: "composer",
    year: "2023",
    title: "Composer 2.0",
    blurb: "Led the redesign of Holloway's writing workspace used by 40k+ teams. Owned the design system, motion language, and onboarding from zero.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80",
    accent: "#F4A26B",
  },
  {
    slug: "logistics",
    year: "2022",
    title: "Logistics OS",
    blurb: "The dispatch console that moves 11M packages a week. Field-shadowed 22 dispatchers across three depots before a pixel was drawn.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=80",
    accent: "#5FA8C4",
  },
  {
    slug: "atlas",
    year: "2021",
    title: "Atlas, the design system",
    blurb: "Stood up Holloway's first cross-platform design system. 240 components, two themes, a token pipeline that survived three rebrands.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1400&q=80",
    accent: "#86C5A4",
  },
];

function Cursor({ visible, overImage, x, y }) {
  return (
    <div
      className={"cursor " + (visible ? "is-on " : "") + (overImage ? "is-image" : "")}
      style={{ transform: `translate(${x}px, ${y}px)` }}
      aria-hidden="true"
    >
      <svg className="cursor__arrow" width="22" height="22" viewBox="0 0 22 22">
        <path d="M3 3l6 16 3-7 7-3z" fill="#15140F" stroke="#F4ECDC" strokeWidth="1.4" strokeLinejoin="round"/>
      </svg>
      <span className="cursor__chip">
        Read case study
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M3 6h6M6 3l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    </div>
  );
}

function WorkRow({ item }) {
  const [ref, inView] = useInView(0.08);
  return (
    <article ref={ref} className={"wrow " + (inView ? "is-in" : "")}>
      <aside className="wrow__year-col">
        <div className="wrow__year">
          <span className="wrow__bullet">·</span>
          <span>{item.year}</span>
        </div>
      </aside>

      <div className="wrow__body">
        <h3 className="wrow__title">{item.title}</h3>
        <p className="wrow__blurb">{item.blurb}</p>
        <a
          className="wrow__media"
          href={`case-study.html?slug=${item.slug}`}
          data-case-link
          aria-label={"Open case study: " + item.title}
        >
          <img
            src={item.image}
            alt=""
            loading="lazy"
            style={{ viewTransitionName: "case-img-" + item.slug }}
          />
          <div
            className="wrow__media-tint"
            style={{ background: `radial-gradient(120% 80% at 80% 0%, ${item.accent}33, transparent 60%)` }}
          />
        </a>
      </div>
    </article>
  );
}

function WorkSection() {
  const [ref, inView] = useInView();
  const sectionRef = useRefS(null);
  const [cursor, setCursor] = useStateS({ visible: false, overImage: false, x: 0, y: 0 });

  useEffectS(() => {
    const sec = sectionRef.current;
    if (!sec) return;

    const onMove = (e) => {
      const rect = sec.getBoundingClientRect();
      const overImage = !!e.target.closest(".wrow__media");
      setCursor({
        visible: true,
        overImage,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };
    const onLeave = () => setCursor((c) => ({ ...c, visible: false }));

    sec.addEventListener("mousemove", onMove);
    sec.addEventListener("mouseleave", onLeave);
    return () => {
      sec.removeEventListener("mousemove", onMove);
      sec.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      ref={(el) => { ref.current = el; sectionRef.current = el; }}
      className={"slab slab--work " + (inView ? "is-in" : "")}
      id="work"
    >
      <div className="slab__inner">
        <div className="work-head">
          <div>
            <h2 className="slab__h2">Some recent work</h2>
            <div className="slab__sub">(from full-time jobs)</div>
          </div>
          <a href="#work" className="ghost-link">
            See the full archive
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h7M7 4l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        <div className="wlist">
          {WORK.map((w) => <WorkRow key={w.slug} item={w} />)}
        </div>

        <Cursor visible={cursor.visible} overImage={cursor.overImage} x={cursor.x} y={cursor.y} />
      </div>
    </section>
  );
}

window.__WORK_DATA = WORK;

// ---------- Side projects strip ----------
const SIDE = [
  { name: "Notebook.fm", tag: "Audio journal for builders", year: "2025", color: "#C7C2F0" },
  { name: "Slowread",    tag: "RSS for the long-attention crowd", year: "2024", color: "#F8C495" },
  { name: "Lattice",     tag: "Tiny CRM for solo consultants",    year: "2023", color: "#B8DBEC" },
  { name: "Stoop",       tag: "Newsletter inbox, organized",      year: "2022", color: "#F8E45A" },
  { name: "Marker",      tag: "Visual review for design teams",   year: "2021", color: "#F4A26B" },
];

function SideSection() {
  const [ref, inView] = useInView();
  return (
    <section ref={ref} className={"slab slab--side " + (inView ? "is-in" : "")} id="side">
      <div className="slab__inner">
        <div className="work-head">
          <div>
            <div className="slab__eyebrow">Nights &amp; weekends</div>
            <h2 className="slab__h2">Things I've shipped <em>for fun</em>.</h2>
          </div>
        </div>
        <ul className="side-list">
          {SIDE.map((s) => (
            <li key={s.name} className="side-row">
              <span className="side-row__swatch" style={{ background: s.color }} />
              <span className="side-row__name">{s.name}</span>
              <span className="side-row__tag">{s.tag}</span>
              <span className="side-row__year">{s.year}</span>
              <a className="side-row__link" href="#side" aria-label={"Open " + s.name}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M5 3l8 0 0 8M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ---------- Footer / Contact ----------
function FooterSection() {
  const [ref, inView] = useInView(0.05);
  return (
    <footer ref={ref} className={"slab slab--foot " + (inView ? "is-in" : "")}>
      <div className="slab__inner foot__inner">
        <div className="foot__big">
          <div className="slab__eyebrow">Let's make something</div>
          <h2 className="foot__headline">
            Got a problem worth<br />designing? <em>Get in touch.</em>
          </h2>
          <a className="dark-cta dark-cta--lg" href="mailto:hi@ahmadmajid.com">
            hi@ahmadmajid.com
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h7M7 4l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
        <div className="foot__cols">
          <div>
            <div className="foot__label">Elsewhere</div>
            <ul>
              <li><a href="#">Are.na</a></li>
              <li><a href="#">Read.cv</a></li>
              <li><a href="#">GitHub</a></li>
              <li><a href="#">LinkedIn</a></li>
            </ul>
          </div>
          <div>
            <div className="foot__label">Now</div>
            <ul>
              <li>Brooklyn, NY</li>
              <li>Open to advisory</li>
              <li>Reading: Range</li>
              <li>Listening: HAIM</li>
            </ul>
          </div>
        </div>
        <div className="foot__rule" />
        <div className="foot__bottom">
          <span>© Ahmad Majid · 2026</span>
          <span>Built with care, in HTML.</span>
        </div>
      </div>
    </footer>
  );
}

// ---------- Stitched styles ----------
const sectionsCss = `
.slab {
  margin: 22px auto 0;
  max-width: 1320px;
  padding: 64px clamp(28px, 5vw, 72px);
  background: var(--hero-bg);
  border-radius: 36px;
  border: 1px solid rgba(0,0,0,.05);
  box-shadow: 0 1px 0 rgba(255,255,255,.6) inset, 0 30px 60px -40px rgba(20,40,30,.18);
  position: relative;
  overflow: hidden;
}
.slab__inner { width: 100%; }
.slab__eyebrow {
  font-size: 13px; font-weight: 500;
  color: var(--ink); opacity: .55;
  letter-spacing: -0.005em;
  margin-bottom: 22px;
}
.slab__h2 {
  margin: 0;
  font-family: 'Newsreader', Georgia, serif;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.0;
  font-size: clamp(36px, 5.4vw, 72px);
  color: var(--ink);
}
.slab__h2 em {
  font-style: italic; font-weight: 500; opacity: .75;
}
.slab__sub {
  margin-top: 12px;
  font-size: 14px; color: var(--ink); opacity: .55;
}

/* fade-up reveal */
.slab > .slab__inner > * {
  opacity: 0; transform: translateY(14px);
  transition: opacity .9s cubic-bezier(.2,.7,.2,1), transform .9s cubic-bezier(.2,.7,.2,1);
}
.slab.is-in > .slab__inner > * { opacity: 1; transform: none; }
.slab.is-in > .slab__inner > *:nth-child(2) { transition-delay: .08s; }
.slab.is-in > .slab__inner > *:nth-child(3) { transition-delay: .16s; }

/* ---- About row ---- */
.about-row {
  display: grid;
  grid-template-columns: minmax(280px, 1.15fr) 1fr;
  gap: 36px;
  margin-top: 40px;
  align-items: center;
}
.about-card {
  border-radius: 18px;
  overflow: hidden;
  background: #1A1612;
  box-shadow: 0 18px 30px -16px rgba(20,30,20,.25);
  aspect-ratio: 5/3;
}
.about-card__media { width: 100%; height: 100%; }
.about-copy {
  padding: 4px 0;
}
.about-copy p {
  margin: 0 0 18px;
  font-size: clamp(16px, 1.35vw, 19px);
  line-height: 1.55; font-weight: 500;
  color: var(--ink); letter-spacing: -0.005em;
}
.about-copy__small {
  font-size: 15px !important; opacity: .68;
  font-weight: 500 !important;
  max-width: 460px;
}

.dark-cta {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--pill-dark); color: #F4ECDC;
  text-decoration: none;
  padding: 11px 16px;
  border-radius: 4px;
  font-size: 13px; font-weight: 600;
  letter-spacing: -0.005em;
  margin-top: 10px;
  box-shadow: 0 4px 10px rgba(0,0,0,.16);
  transition: transform .2s ease, box-shadow .2s ease;
}
.dark-cta:hover { transform: translateY(-1px); box-shadow: 0 8px 16px rgba(0,0,0,.22); }
.dark-cta--lg {
  font-size: 16px;
  padding: 14px 22px;
  margin-top: 24px;
}

/* ---- Work ---- */
.slab--work { overflow: visible; cursor: none; }
.slab--work, .slab--work * { cursor: none; }

.work-head {
  display: flex; align-items: end; justify-content: space-between;
  gap: 24px; flex-wrap: wrap;
  cursor: default;
}
.work-head, .work-head * { cursor: default; }

/* ---- Timeline list ---- */
.wlist {
  margin-top: 56px;
  position: relative;
}
.wrow {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 32px;
  padding: 32px 0 60px;
  position: relative;
  border-top: 1px solid rgba(20,40,30,.10);
  opacity: 0; transform: translateY(20px);
  transition: opacity .9s cubic-bezier(.2,.7,.2,1), transform .9s cubic-bezier(.2,.7,.2,1);
}
.wrow:first-child { border-top: 0; padding-top: 8px; }
.wrow.is-in { opacity: 1; transform: none; }

.wrow__year-col {
  position: relative;
}
.wrow__year {
  position: sticky;
  top: 96px;
  display: flex; align-items: baseline; gap: 6px;
  font-family: 'Newsreader', Georgia, serif;
  font-weight: 500;
  font-size: clamp(28px, 2.6vw, 44px);
  letter-spacing: -0.01em;
  color: var(--ink); opacity: .55;
  transition: opacity .3s ease;
  z-index: 5;
  width: max-content;
}
.wrow:hover .wrow__year { opacity: 1; }
.wrow__bullet { font-size: 1.2em; line-height: 0; transform: translateY(-.18em); opacity: .8; }

.wrow__body {
  display: flex; flex-direction: column;
  max-width: 880px;
}
.wrow__title {
  margin: 0;
  font-family: 'Newsreader', Georgia, serif;
  font-weight: 700;
  font-size: clamp(34px, 3.4vw, 52px);
  letter-spacing: -0.025em;
  line-height: 1.0;
  color: var(--ink);
}
.wrow__blurb {
  margin: 18px 0 0;
  font-size: clamp(15px, 1.15vw, 17px);
  line-height: 1.5;
  font-weight: 500;
  color: var(--ink); opacity: .72;
  max-width: 56ch;
}
.wrow__media {
  margin-top: 28px;
  position: relative;
  display: block;
  border-radius: 18px;
  overflow: hidden;
  background: #1A1612;
  box-shadow: 0 18px 38px -22px rgba(20,40,30,.32), 0 1px 0 rgba(255,255,255,.4) inset;
  aspect-ratio: 16/9;
  text-decoration: none;
}
.wrow__media img {
  width: 100%; height: 100%;
  object-fit: cover; display: block;
  transition: transform 1.2s cubic-bezier(.2,.7,.2,1);
}
.wrow__media:hover img { transform: scale(1.04); }
.wrow__media-tint {
  position: absolute; inset: 0;
  pointer-events: none;
  mix-blend-mode: screen;
  opacity: .8;
}

/* ---- Custom cursor ---- */
.cursor {
  position: absolute;
  left: 0; top: 0;
  pointer-events: none;
  z-index: 80;
  display: flex; align-items: flex-start;
  gap: 6px;
  opacity: 0;
  transition: opacity .15s ease;
  will-change: transform;
}
.cursor.is-on { opacity: 1; }
.cursor__arrow {
  display: block;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,.18));
  flex: 0 0 auto;
  margin-left: -2px; margin-top: -2px;
}
.cursor__chip {
  display: inline-flex; align-items: center; gap: 6px;
  background: var(--pill-dark);
  color: #F4ECDC;
  font-size: 12px; font-weight: 600; letter-spacing: -0.005em;
  padding: 7px 11px;
  border-radius: 999px;
  white-space: nowrap;
  margin-top: 14px;
  transform: translateX(4px) scale(.85);
  opacity: 0;
  transform-origin: left center;
  box-shadow: 0 8px 18px rgba(0,0,0,.22);
  transition: opacity .2s ease, transform .25s cubic-bezier(.2,.8,.2,1);
}
.cursor.is-image .cursor__chip {
  opacity: 1;
  transform: translateX(4px) scale(1);
}
.ghost-link {
  display: inline-flex; align-items: center; gap: 8px;
  color: var(--ink); opacity: .65;
  text-decoration: none;
  font-size: 14px; font-weight: 600;
  border-bottom: 1px solid rgba(20,40,30,.18);
  padding-bottom: 4px;
  transition: opacity .2s, border-color .2s;
}
.ghost-link:hover { opacity: 1; border-bottom-color: var(--ink); }

.work-grid { display: none; }

.work-card {
  display: grid;
  grid-template-columns: 220px 1fr 220px;
  gap: 28px;
  background: #FAF4E6;
  border-radius: 22px;
  padding: 26px 28px;
  border: 1px solid rgba(0,0,0,.05);
  align-items: stretch;
  position: relative;
  transition: transform .35s cubic-bezier(.2,.8,.2,1), box-shadow .35s ease, opacity .9s, transform .9s;
  opacity: 0; transform: translateY(20px);
  box-shadow: 0 1px 0 rgba(255,255,255,.7) inset;
}
.work-card.is-in { opacity: 1; transform: translateY(0); }
.work-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 1px 0 rgba(255,255,255,.7) inset, 0 22px 40px -22px rgba(20,40,30,.28);
}

.work-card__meta {
  display: flex; flex-direction: column; gap: 6px;
  padding-top: 4px;
}
.work-card__co {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 14px; font-weight: 700;
  color: var(--ink); letter-spacing: -0.01em;
}
.work-card__dot {
  width: 8px; height: 8px; border-radius: 999px;
}
.work-card__role { font-size: 13px; color: var(--ink); opacity: .7; font-weight: 500; }
.work-card__dates {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px; color: var(--ink); opacity: .55;
  margin-top: 2px;
}

.work-card__body {
  display: flex; flex-direction: column; justify-content: center;
}
.work-card__title {
  margin: 0;
  font-family: 'Newsreader', Georgia, serif;
  font-weight: 700;
  font-style: italic;
  font-size: clamp(26px, 2.6vw, 34px);
  letter-spacing: -0.02em;
  color: var(--ink);
  line-height: 1.05;
}
.work-card__blurb {
  margin: 12px 0 0;
  font-size: 15px; line-height: 1.55;
  color: var(--ink); opacity: .8;
  max-width: 56ch;
  font-weight: 500;
}
.work-card__footer {
  margin-top: 20px;
  display: flex; align-items: center; gap: 14px;
}
.work-card__metric {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px; font-weight: 500;
  letter-spacing: .04em; text-transform: uppercase;
  background: rgba(20,40,30,.08);
  color: var(--ink);
  padding: 6px 10px; border-radius: 999px;
}
.work-card__link {
  display: inline-flex; align-items: center; gap: 6px;
  text-decoration: none; color: var(--ink);
  font-size: 13px; font-weight: 600;
  opacity: .8;
  transition: opacity .2s, gap .2s;
}
.work-card__link:hover { opacity: 1; gap: 9px; }

.work-card__visual {
  border-radius: 16px;
  overflow: hidden;
  aspect-ratio: 5/6;
  align-self: stretch;
}
.work-card__visual-fill { width: 100%; height: 100%; }

/* ---- Side projects ---- */
.side-list {
  list-style: none; margin: 36px 0 0; padding: 0;
  display: flex; flex-direction: column;
}
.side-row {
  display: grid;
  grid-template-columns: 32px minmax(140px, 1fr) 2.4fr 80px 32px;
  align-items: center;
  gap: 18px;
  padding: 20px 4px;
  border-top: 1px solid rgba(20,40,30,.12);
  cursor: pointer;
  transition: padding .25s ease, background .25s ease;
}
.side-row:last-child { border-bottom: 1px solid rgba(20,40,30,.12); }
.side-row:hover { padding-left: 14px; padding-right: 14px; background: rgba(20,40,30,.03); }
.side-row__swatch {
  width: 24px; height: 24px;
  border-radius: 6px;
  box-shadow: 0 0 0 1px rgba(0,0,0,.08) inset;
}
.side-row__name {
  font-family: 'Newsreader', Georgia, serif;
  font-weight: 700; font-style: italic;
  font-size: clamp(22px, 2vw, 28px);
  color: var(--ink); letter-spacing: -0.02em;
}
.side-row__tag {
  color: var(--ink); opacity: .65;
  font-size: 15px; font-weight: 500;
}
.side-row__year {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px; color: var(--ink); opacity: .55;
  text-align: right;
}
.side-row__link {
  display: inline-grid; place-items: center;
  width: 32px; height: 32px;
  border-radius: 999px;
  background: rgba(20,40,30,.08);
  color: var(--ink);
  text-decoration: none;
  transition: transform .2s ease, background .2s;
}
.side-row__link:hover { transform: rotate(-12deg); background: var(--ink); color: #F4ECDC; }

/* ---- Footer ---- */
.slab--foot {
  background: var(--ink);
  color: #F4ECDC;
  margin-bottom: 22px;
  padding-top: 84px; padding-bottom: 36px;
}
.slab--foot .slab__eyebrow { color: #F4ECDC; opacity: .6; }
.foot__inner { display: grid; gap: 56px; }
.foot__headline {
  margin: 0;
  font-family: 'Newsreader', Georgia, serif;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1;
  font-size: clamp(40px, 6vw, 84px);
  color: #F4ECDC;
}
.foot__headline em { font-style: italic; font-weight: 500; opacity: .75; }
.slab--foot .dark-cta {
  background: #F4ECDC; color: var(--ink);
}
.foot__cols {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 28px;
  max-width: 480px;
}
.foot__label {
  font-size: 11px; letter-spacing: .12em; text-transform: uppercase;
  opacity: .5; margin-bottom: 12px;
  font-family: 'JetBrains Mono', monospace; font-weight: 500;
}
.foot__cols ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
.foot__cols a {
  color: #F4ECDC; text-decoration: none;
  font-size: 15px; font-weight: 500;
  border-bottom: 1px solid transparent;
  transition: border-color .2s;
}
.foot__cols a:hover { border-bottom-color: rgba(244,236,220,.5); }
.foot__cols li { color: #F4ECDC; font-size: 15px; font-weight: 500; }
.foot__rule { height: 1px; background: rgba(244,236,220,.16); }
.foot__bottom {
  display: flex; justify-content: space-between; align-items: center; gap: 20px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px; opacity: .55; letter-spacing: .04em;
}

@media (max-width: 880px) {
  .about-row { grid-template-columns: 1fr; }
  .work-card { grid-template-columns: 1fr; gap: 18px; }
  .work-card__visual { aspect-ratio: 16/8; }
  .side-row { grid-template-columns: 24px 1fr 32px; }
  .side-row__tag, .side-row__year { display: none; }
  .foot__bottom { flex-direction: column; align-items: flex-start; }
}
`;

const sectionsStyleEl = document.createElement('style');
sectionsStyleEl.textContent = sectionsCss;
document.head.appendChild(sectionsStyleEl);

Object.assign(window, { AboutSection, WorkSection, SideSection, FooterSection });
