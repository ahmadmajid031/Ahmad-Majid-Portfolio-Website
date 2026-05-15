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
      <div className="slab__inner about-layout">

        <div className="about-left">
          <h2 className="about-headline">
            Designing forward.<br />
            One disruption at a time.
          </h2>

          <div className="about-bio">
            <p>I started in graphic design — spending more hours than I'd like to admit inside Photoshop and Illustrator. Then AI tools showed up and started producing work that honestly looked better than mine. I can't blame the clients who switched. It was impressive. I just had to move on.</p>
            <p>I moved into web design, spent over a year getting sharp at it, and eventually landed a UX role at a company. There I was mapping user journeys, running research, and somewhere along the way slipped into a product manager role too. I worked with developers, content writers, and designers — mostly figuring out how to make the product less confusing and the process less painful.</p>
            <p>Then a friend showed me a site that generates UI screens from a single prompt. I still have complicated feelings about that site. But it did what every AI incursion before it did — pushed me to go deeper instead of wider. That's been the pattern: AI narrows the field, so I sharpen the edge I have left.</p>
            <p>For the past year and a half I've been working at Dal as a product designer. I lead design, run UX research, and build AI chatbots and automated workflows into the product. If AI comes for that stack next, I've already decided: full-time comedian.</p>
          </div>
          <div className="about-actions">
            <a className="about-btn" href="#">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2v8M5 8l3 3 3-3M3 13h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Download resume
            </a>
            <a className="about-btn" href="#">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="2" width="12" height="12" rx="3" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M5.5 11.5v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="5.5" cy="5.5" r=".75" fill="currentColor"/>
                <path d="M8 11.5V8.75A1.75 1.75 0 0 1 11.5 8.75v2.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              LinkedIn
            </a>
          </div>
        </div>

        <div className="about-right">
          <div className="acard acard--photo">
            <img src="images/heroimage.jpg" alt="Ahmad Majid" className="acard__img" />
          </div>

          <div className="acard acard--edu">
            <div className="acard__eyebrow">Education</div>
            <div className="acard__rows">
              <div className="acard__row">
                <span className="acard__name">Queen Mary, London</span>
                <span className="acard__sub">BSc Computer Science</span>
              </div>
              <div className="acard__row">
                <span className="acard__name">University of Twente</span>
                <span className="acard__sub">MSc Interactive Technology</span>
              </div>
              <div className="acard__row">
                <span className="acard__name">KTH Royal Institute of Technology</span>
                <span className="acard__sub">MSc Human Computer Interaction</span>
              </div>
            </div>
          </div>

          <div className="acard acard--exp">
            <div className="acard__eyebrow">Experience</div>
            <div className="acard__rows">
              <div className="acard__row">
                <span className="acard__name">Dal</span>
                <span className="acard__sub">Product Designer · 2024 – Now</span>
              </div>
              <div className="acard__row">
                <span className="acard__name">Asana</span>
                <span className="acard__sub">Embedded Product Designer · 2024</span>
              </div>
              <div className="acard__row">
                <span className="acard__name">Notion</span>
                <span className="acard__sub">Embedded Product Designer · 2023</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

// ---------- Work section ----------
const WORK = [
  {
    slug: "dal-ayn",
    year: "2024",
    company: "Dal",
    role: "Product Designer",
    title: "Building Ayn — from zero",
    blurb: "Leading the design on an all-in-one KYC and compliance platform, turning one of the most complex regulatory workflows into something ops teams could handle confidently.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
    accent: "#4C7CDA",
    locked: true,
    href: "dal-ayn.html",
  },
  {
    slug: "asana-timeline",
    year: "2024",
    company: "Asana",
    role: "Embedded Product Designer",
    title: "Redesigning the Project Timeline",
    blurb: "Turning Asana's most powerful planning view into something teams actually opened on Monday morning — not just during quarterly planning panics.",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=1400&q=80",
    accent: "#E8634A",
    href: "asana-timeline.html",
  },
  {
    slug: "notion-ai",
    year: "2023",
    company: "Notion",
    role: "Staff Product Designer",
    title: "Redesigning AI in Databases",
    blurb: "Bringing trust, clarity, and control to Notion's AI properties — turning a feature with 67% drop-off into one teams could actually adopt.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1400&q=80",
    accent: "#9B8DE8",
    href: "notion-ai.html",
  },
];

function hexToRgba(hex, a) {
  const r = parseInt(hex.slice(1,3), 16);
  const g = parseInt(hex.slice(3,5), 16);
  const b = parseInt(hex.slice(5,7), 16);
  return `rgba(${r},${g},${b},${a})`;
}

function WorkCard({ item, onLock }) {
  const [ref, inView] = useInView(0.06);
  const dest = item.href || `case-study.html?slug=${item.slug}`;

  return (
    <div
      ref={ref}
      className={"wrow " + (inView ? "is-in" : "")}
      style={{ '--row-accent': item.accent, '--row-accent-soft': hexToRgba(item.accent, 0.18) }}
    >
      {/* ── Timeline column ── */}
      <div className="wrow__timeline">
        <div className="wrow__node" />
        <span className="wrow__year">{item.year}</span>
      </div>

      {/* ── Card ── */}
      <article className="wcard">
        {/* Tags row */}
        <div className="wcard__head">
          <div className="wcard__tags">
            <span
              className="wcard__tag wcard__tag--co"
              style={{ background: hexToRgba(item.accent, 0.18), color: item.accent }}
            >
              {item.company}
            </span>
            <span className="wcard__tag wcard__tag--role">{item.role}</span>
          </div>
          {item.locked && (
            <span className="wcard__nda">
              <svg width="10" height="11" viewBox="0 0 10 11" fill="none">
                <rect x="1" y="5" width="8" height="5.5" rx="1.5" fill="currentColor"/>
                <path d="M3 5V3.5a2 2 0 0 1 4 0V5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
              </svg>
              NDA
            </span>
          )}
        </div>

        <h3 className="wcard__title">{item.title}</h3>
        <p className="wcard__blurb">{item.blurb}</p>

        {/* Image */}
        <div className="wcard__media">
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            style={{ viewTransitionName: "case-img-" + item.slug }}
          />
          <div className="wcard__tint" style={{ background: `radial-gradient(120% 80% at 80% 0%, ${item.accent}44, transparent 60%)` }} />
          {item.locked && (
            <div className="wcard__lock-veil">
              <div className="wcard__lock-chip">
                <svg width="13" height="14" viewBox="0 0 13 14" fill="none">
                  <rect x="1" y="6" width="11" height="8" rx="2" fill="currentColor" opacity=".85"/>
                  <path d="M3.5 6V4a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity=".85"/>
                </svg>
                Password protected
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="wcard__foot">
          {item.locked ? (
            <button className="wcard__cta wcard__cta--locked" onClick={() => onLock && onLock(item.slug)}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <rect x="1" y="5.5" width="10" height="6.5" rx="1.5" fill="currentColor" opacity=".7"/>
                <path d="M3.5 5.5V3.5a2 2 0 0 1 4 0v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity=".7"/>
              </svg>
              Password protected · Unlock
            </button>
          ) : (
            <a href={dest} className="wcard__cta">
              Read case study
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2.5 6.5h8M7 3l3.5 3.5L7 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          )}
        </div>
      </article>
    </div>
  );
}

/* ---- Password gate modal (reusable for any locked case study) ---- */
function LockedGate({ slug, onClose }) {
  const [val, setVal] = useStateS('');
  const [err, setErr] = useStateS(false);
  const [success, setSuccess] = useStateS(false);
  const cardRef = useRefS(null);

  function shake() {
    const el = cardRef.current;
    if (!el) return;
    el.classList.remove('is-wrong');
    void el.offsetWidth;
    el.classList.add('is-wrong');
  }

  const GATE_CONFIG = {
    'miro-ai':  { password: 'Miroxahmad2025', href: 'case-study.html?slug=miro-ai' },
    'dal-ayn':  { password: 'dalxahmad2026',  href: 'dal-ayn.html' },
  };

  function tryUnlock() {
    const cfg = GATE_CONFIG[slug];
    if (cfg && val === cfg.password) {
      setSuccess(true);
      setTimeout(() => { window.location.href = cfg.href; }, 560);
    } else {
      setErr(true);
      shake();
    }
  }

  return (
    <div className="gate-overlay" onClick={e => { if (e.target.classList.contains('gate-overlay')) onClose(); }}>
      <div ref={cardRef} className={"gate-card" + (success ? " is-unlocked" : "")}>
        <button className="gate-close" onClick={onClose} aria-label="Close">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M1 1l9 9M10 1l-9 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>

        <div className={"gate-icon" + (success ? " is-open" : "")}>
          <svg width="28" height="30" viewBox="0 0 28 30" fill="none">
            <rect x="3" y="14" width="22" height="15" rx="3.5" fill="#15140F" opacity=".88"/>
            <path
              d={success ? "M9 14V10a5 5 0 0 1 10 0V7" : "M9 14V10a5 5 0 0 1 10 0v4"}
              stroke="#15140F" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" opacity=".88"
            />
            <circle cx="14" cy="21.5" r="2.2" fill="rgba(255,255,255,.38)"/>
          </svg>
        </div>

        <h2 className="gate-title">Protected work</h2>
        <p className="gate-desc">This case study sits behind an NDA. Drop me a line and I'll share the password — usually same day.</p>

        <input
          type="password"
          className={"gate-input" + (err ? " is-error" : "")}
          placeholder="Enter password"
          value={val}
          onChange={e => { setVal(e.target.value); setErr(false); }}
          onKeyDown={e => { if (e.key === 'Enter') tryUnlock(); if (e.key === 'Escape') onClose(); }}
          autoFocus
        />
        {err && <p className="gate-error">Wrong password — try again</p>}

        <button className="gate-btn" onClick={tryUnlock}>
          Unlock
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7h7M7 4l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="gate-or">or</div>
        <a href="contact.html" className="gate-contact">
          Contact me to get the password
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </div>
  );
}

function WorkSection() {
  const [ref, inView] = useInView();
  const [gateSlug, setGateSlug] = useStateS(null);

  return (
    <>
      <section
        ref={ref}
        className={"slab slab--work " + (inView ? "is-in" : "")}
        id="work"
      >
        <div className="slab__inner">
          <div className="work-head">
            <div>
              <h2 className="slab__h2">Some recent work</h2>
            </div>
            <a href="work.html" className="ghost-link">
              See all case studies
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h7M7 4l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          <div className="wlist">
            {WORK.map((w) => <WorkCard key={w.slug} item={w} onLock={setGateSlug} />)}
          </div>
        </div>
      </section>

      {gateSlug && <LockedGate slug={gateSlug} onClose={() => setGateSlug(null)} />}
    </>
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
            <h2 className="slab__h2">Things I've shipped <em>for fun.</em></h2>
          </div>
        </div>
        <div className="side-grid">
          {SIDE.map((s, i) => (
            <a
              key={s.name}
              className={"side-card side-card--" + i}
              href="#side"
              style={{ background: s.color }}
              aria-label={"Open " + s.name}
            >
              <div className="side-card__top">
                <span className="side-card__name">{s.name}</span>
                <span className="side-card__tag">{s.tag}</span>
              </div>
              <div className="side-card__foot">
                <span className="side-card__year">{s.year}</span>
                <div className="side-card__arrow">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M3 9L9 3M3 3h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Footer / Contact ----------
function FooterSection() {
  const [ref, inView] = useInView(0.05);
  return (
    <footer ref={ref} className={"slab slab--foot " + (inView ? "is-in" : "")}>
      <div className="slab__inner">

        <div className="foot__headline-wrap">
          <div className="foot__eyebrow">Let's make something</div>
          <h2 className="foot__headline">
            Got a problem<br /><em>worth designing?</em>
          </h2>
        </div>

        <a
          className="foot__email"
          href="#"
          data-cal-link="ahmad-majid-7sgoyt/30min"
          data-cal-namespace="30min"
          data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
        >
          <span>hi@ahmadmajid.com</span>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M4 11h14M11 5l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>

        <div className="foot__lower">
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
        </div>

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

/* ---- About (two-column) ---- */
.about-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
  gap: clamp(48px, 7vw, 96px);
  align-items: start;
}

.about-headline {
  margin: 0;
  font-family: 'Newsreader', Georgia, serif;
  font-weight: 800; letter-spacing: -0.03em; line-height: 1.0;
  font-size: clamp(40px, 5.8vw, 80px);
  color: var(--ink);
}

.about-bio { margin-top: 0; }
.about-bio p {
  margin: 0 0 16px;
  font-size: clamp(14px, 1.1vw, 16px); line-height: 1.65; font-weight: 500;
  color: var(--ink); opacity: .78; max-width: 64ch;
}
.about-bio p:last-child { margin-bottom: 0; }

.about-actions { display: flex; gap: 10px; margin-top: 28px; flex-wrap: wrap; }
.about-btn {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--pill-dark); color: #F4ECDC; text-decoration: none;
  padding: 10px 18px; border-radius: 6px;
  font-size: 13px; font-weight: 600; letter-spacing: -0.005em;
  box-shadow: 0 4px 10px rgba(0,0,0,.16);
  transition: transform .2s ease, box-shadow .2s ease;
}
.about-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 16px rgba(0,0,0,.22); }

/* Playful stacked cards — about right column */
.acard {
  border-radius: 22px;
  transition: transform .3s cubic-bezier(.2,.8,.2,1), box-shadow .3s ease;
}
.acard:hover {
  transform: rotate(0deg) translateY(-5px) !important;
  box-shadow: 0 24px 48px -18px rgba(20,40,30,.22);
}
.acard--photo {
  overflow: hidden;
  transform: rotate(2.5deg);
  box-shadow: 0 14px 32px -12px rgba(20,40,30,.24);
}
.acard__img { width: 100%; aspect-ratio: 4/3; object-fit: cover; display: block; }
.acard--edu {
  background: rgba(248,196,149,.32);
  padding: 24px 26px;
  transform: rotate(-1.8deg);
}
.acard--exp {
  background: rgba(184,219,236,.38);
  padding: 24px 26px;
  transform: rotate(1.2deg);
}
.acard__eyebrow {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px; letter-spacing: .09em; text-transform: uppercase;
  color: var(--ink); opacity: .4; font-weight: 600;
  margin-bottom: 14px;
}
.acard__rows { display: flex; flex-direction: column; }
.acard__row {
  display: flex; flex-direction: column; gap: 2px;
  padding: 11px 0; border-top: 1px solid rgba(20,40,30,.09);
}
.acard__row:first-child { border-top: 0; padding-top: 0; }
.acard__name { font-weight: 700; font-size: 14px; color: var(--ink); letter-spacing: -0.01em; }
.acard__sub { font-size: 12.5px; font-weight: 500; color: var(--ink); opacity: .52; }

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
.slab--work { overflow: visible; }

.work-head {
  display: flex; align-items: end; justify-content: space-between;
  gap: 24px; flex-wrap: wrap;
}

/* ---- Timeline + Cards ---- */
.wlist {
  margin-top: 56px;
  display: flex; flex-direction: column;
  gap: 20px; position: relative;
}
/* The vertical connecting line */
.wlist::before {
  content: "";
  position: absolute;
  left: 22px; top: 32px; bottom: 32px;
  width: 2px;
  background: linear-gradient(to bottom, transparent, rgba(20,40,30,.12) 6%, rgba(20,40,30,.12) 94%, transparent);
  pointer-events: none;
}
/* Row wrapper */
.wrow {
  display: grid;
  grid-template-columns: 46px 1fr;
  gap: 18px; align-items: start;
  position: relative;
  opacity: 0; transform: translateY(24px);
  transition: opacity .9s cubic-bezier(.2,.7,.2,1), transform .9s cubic-bezier(.2,.7,.2,1);
}
.wrow.is-in { opacity: 1; transform: none; }

/* Timeline column */
.wrow__timeline {
  display: flex; flex-direction: column;
  align-items: center; gap: 9px;
  padding-top: 30px; position: relative; z-index: 2;
}
.wrow__node {
  width: 14px; height: 14px; border-radius: 50%;
  background: var(--row-accent);
  box-shadow: 0 0 0 3px var(--bg), 0 0 0 5px var(--row-accent);
  flex-shrink: 0;
  transition: transform .38s cubic-bezier(.2,.8,.2,1), box-shadow .38s ease;
}
.wrow:hover .wrow__node {
  transform: scale(1.5);
  box-shadow: 0 0 0 3px var(--bg), 0 0 0 5px var(--row-accent), 0 0 0 11px var(--row-accent-soft);
}
.wrow__year {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px; letter-spacing: .05em; text-transform: uppercase;
  color: var(--ink); opacity: .38; text-align: center; line-height: 1.3;
  transition: opacity .3s ease, color .3s ease;
}
.wrow:hover .wrow__year { opacity: .85; color: var(--row-accent); }

/* Card */
.wcard {
  background: var(--hero-bg);
  border-radius: 22px;
  border: 1.5px solid rgba(0,0,0,.05);
  box-shadow: 0 1px 0 rgba(255,255,255,.6) inset, 0 8px 24px -12px rgba(20,40,30,.13);
  overflow: hidden;
  transition: transform .45s cubic-bezier(.2,.8,.2,1), box-shadow .45s ease, border-color .45s ease;
}
.wrow:hover .wcard {
  transform: translateY(-5px);
  box-shadow: 0 1px 0 rgba(255,255,255,.6) inset, 0 28px 52px -18px rgba(20,40,30,.22);
  border-color: var(--row-accent-soft);
}
.wcard__head {
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px 24px 0; gap: 12px;
}
.wcard__tags { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
.wcard__tag {
  display: inline-flex; align-items: center;
  padding: 5px 12px; border-radius: 999px;
  font-size: 12px; font-weight: 700; letter-spacing: -.005em; white-space: nowrap;
}
.wcard__tag--role { background: rgba(20,40,30,.07); color: var(--ink); opacity: .65; }
.wcard__nda {
  display: inline-flex; align-items: center; gap: 5px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase;
  color: var(--ink); opacity: .42;
  background: rgba(20,40,30,.07); padding: 5px 10px 5px 8px; border-radius: 999px; flex-shrink: 0;
}
.wcard__title {
  margin: 14px 24px 0;
  font-family: 'Newsreader', Georgia, serif;
  font-weight: 700; font-size: clamp(28px, 3.2vw, 46px);
  letter-spacing: -0.025em; line-height: 1.0; color: var(--ink);
  transition: color .35s ease;
}
.wrow:hover .wcard__title { color: var(--row-accent); }
.wcard__blurb {
  margin: 12px 24px 0;
  font-size: clamp(14px, 1.1vw, 16px); line-height: 1.55; font-weight: 500;
  color: var(--ink); opacity: .66; max-width: 62ch;
}
.wcard__media {
  margin: 20px 24px 0;
  border-radius: 14px; overflow: hidden;
  aspect-ratio: 16/8; position: relative;
  background: #1A1612;
  box-shadow: 0 10px 28px -14px rgba(20,40,30,.26);
}
.wcard__media img {
  width: 100%; height: 100%; object-fit: cover; display: block;
  transition: transform 1.0s cubic-bezier(.2,.7,.2,1);
}
.wrow:hover .wcard__media img { transform: scale(1.04); }
.wcard__tint { position: absolute; inset: 0; pointer-events: none; mix-blend-mode: screen; opacity: .7; }
.wcard__lock-veil {
  position: absolute; inset: 0;
  background: rgba(21,20,15,.52);
  backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
  display: flex; align-items: center; justify-content: center;
}
.wcard__lock-chip {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(246,239,224,.92); color: var(--pill-dark);
  padding: 10px 20px; border-radius: 999px;
  font-size: 13px; font-weight: 700; letter-spacing: -0.005em;
  box-shadow: 0 4px 14px rgba(0,0,0,.22);
}
.wcard__foot { padding: 16px 24px 22px; }
.wcard__cta {
  display: inline-flex; align-items: center; gap: 9px;
  background: var(--pill-dark); color: #F4ECDC;
  text-decoration: none; border: 0; cursor: pointer;
  padding: 11px 20px; border-radius: 999px;
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  font-size: 13px; font-weight: 700; letter-spacing: -0.005em;
  box-shadow: 0 4px 12px rgba(0,0,0,.18);
  transition: transform .2s ease, gap .2s ease, box-shadow .2s ease;
}
.wcard__cta:hover { transform: translateY(-2px); gap: 13px; box-shadow: 0 8px 20px rgba(0,0,0,.24); }
.wcard__cta--locked {
  background: rgba(20,40,30,.08); color: var(--ink); opacity: .58;
  box-shadow: none; cursor: default;
}
.wcard__cta--locked:hover { transform: none; gap: 9px; box-shadow: none; }

@media (max-width: 760px) {
  .wlist::before { display: none; }
  .wrow { grid-template-columns: 1fr; }
  .wrow__timeline { flex-direction: row; padding-top: 0; gap: 10px; align-items: center; }
  .wrow__node { width: 10px; height: 10px; }
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

/* ---- Side projects — scattered card grid ---- */
.side-grid {
  margin-top: 44px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}
.side-card {
  border-radius: 20px;
  padding: 22px 20px 18px;
  min-height: 168px;
  display: flex; flex-direction: column; justify-content: space-between;
  text-decoration: none; color: var(--pill-dark);
  box-shadow:
    0 1px 0 rgba(255,255,255,.65) inset,
    0 12px 28px -14px rgba(20,30,20,.24),
    0 2px 6px rgba(20,30,20,.08);
  transition: transform .45s cubic-bezier(.2,.8,.2,1), box-shadow .45s ease;
  will-change: transform;
}
/* Each card has its own resting tilt */
.side-card--0 { transform: rotate(-3.5deg); transform-origin: 30% 85%; }
.side-card--1 { transform: rotate(2deg);    transform-origin: 60% 90%; }
.side-card--2 { transform: rotate(-1.5deg); transform-origin: 70% 80%; }
.side-card--3 { transform: rotate(3deg);    transform-origin: 40% 85%; }
.side-card--4 { transform: rotate(-2.5deg); transform-origin: 55% 85%; }
.side-card:hover {
  transform: rotate(0deg) translateY(-10px) scale(1.03) !important;
  box-shadow:
    0 1px 0 rgba(255,255,255,.65) inset,
    0 28px 52px -18px rgba(20,30,20,.32),
    0 5px 14px rgba(20,30,20,.10);
}
.side-card__top { display: flex; flex-direction: column; gap: 10px; }
.side-card__name {
  font-family: 'Newsreader', Georgia, serif;
  font-weight: 700; font-style: italic;
  font-size: clamp(22px, 2.2vw, 28px);
  letter-spacing: -0.02em; line-height: 1.0;
}
.side-card__tag {
  font-size: 13px; font-weight: 500; line-height: 1.45;
  opacity: .65;
}
.side-card__foot {
  display: flex; align-items: center; justify-content: space-between;
}
.side-card__year {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px; letter-spacing: .07em; text-transform: uppercase;
  opacity: .45;
}
.side-card__arrow {
  width: 28px; height: 28px; border-radius: 999px;
  background: var(--pill-dark); color: #F4ECDC;
  display: grid; place-items: center;
  transition: transform .3s cubic-bezier(.2,.8,.2,1);
}
.side-card:hover .side-card__arrow { transform: rotate(-15deg) scale(1.1); }
@media (max-width: 680px) {
  .side-grid { grid-template-columns: 1fr 1fr; }
  .side-card--0, .side-card--1, .side-card--2, .side-card--3, .side-card--4 { transform: rotate(0); }
}

/* ---- Footer ---- */
.slab--foot {
  background: var(--ink);
  color: #F4ECDC;
  margin-bottom: 22px;
  padding-top: 80px; padding-bottom: 44px;
  position: relative; overflow: hidden;
}
/* Large decorative star in background */
.slab--foot::after {
  content: "✦";
  position: absolute;
  top: -20px; right: clamp(24px, 4vw, 60px);
  font-size: clamp(160px, 22vw, 320px);
  line-height: 1;
  color: rgba(244,236,220,.04);
  pointer-events: none;
  font-family: 'Newsreader', Georgia, serif;
  font-weight: 800;
  user-select: none;
}
.foot__eyebrow {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px; letter-spacing: .12em; text-transform: uppercase;
  color: #F4ECDC; opacity: .38;
  margin-bottom: 16px;
}
.foot__headline-wrap { position: relative; z-index: 1; }
.foot__headline {
  margin: 0;
  font-family: 'Newsreader', Georgia, serif;
  font-weight: 800; letter-spacing: -0.03em;
  line-height: 0.95;
  font-size: clamp(52px, 9vw, 132px);
  color: #F4ECDC;
}
.foot__headline em { font-style: italic; font-weight: 500; opacity: .6; }

/* Full-width email link */
.foot__email {
  display: flex; align-items: center; justify-content: space-between;
  width: 100%; margin-top: 36px;
  padding: clamp(18px, 2vw, 26px) clamp(20px, 2.5vw, 36px);
  background: rgba(244,236,220,.07);
  border: 1px solid rgba(244,236,220,.12);
  border-radius: 16px;
  color: #F4ECDC; text-decoration: none;
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  font-size: clamp(16px, 2vw, 26px); font-weight: 600;
  letter-spacing: -0.01em;
  transition: background .25s ease, border-color .25s ease, transform .2s ease;
  position: relative; z-index: 1;
}
.foot__email:hover {
  background: rgba(244,236,220,.12);
  border-color: rgba(244,236,220,.22);
  transform: translateY(-2px);
}
.foot__email svg { flex-shrink: 0; opacity: .6; transition: opacity .2s, transform .2s ease; }
.foot__email:hover svg { opacity: 1; transform: translateX(4px); }

/* Lower two-col area */
.foot__lower { margin-top: 52px; }
.foot__cols {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 28px; max-width: 340px;
}
.foot__label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px; letter-spacing: .12em; text-transform: uppercase;
  opacity: .35; margin-bottom: 14px; font-weight: 500;
}
.foot__cols ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
.foot__cols a {
  color: #F4ECDC; text-decoration: none;
  font-size: 15px; font-weight: 500; opacity: .6;
  transition: opacity .2s;
}
.foot__cols a:hover { opacity: 1; }
.foot__cols li { color: #F4ECDC; font-size: 15px; font-weight: 500; opacity: .42; }

.foot__bottom {
  display: flex; justify-content: space-between; align-items: center; gap: 20px;
  margin-top: 52px; padding-top: 24px;
  border-top: 1px solid rgba(244,236,220,.12);
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px; opacity: .35; letter-spacing: .04em;
}

@media (max-width: 880px) {
  .about-layout { grid-template-columns: 1fr; }

  .work-card { grid-template-columns: 1fr; gap: 18px; }
  .work-card__visual { aspect-ratio: 16/8; }
  .side-row { grid-template-columns: 24px 1fr 32px; }
  .side-row__tag, .side-row__year { display: none; }
  .foot__bottom { flex-direction: column; align-items: flex-start; }
}

/* ---- Password gate modal ---- */
.gate-overlay {
  position: fixed; inset: 0; z-index: 300;
  background: rgba(21,20,15,.78);
  backdrop-filter: blur(18px) saturate(.65);
  -webkit-backdrop-filter: blur(18px) saturate(.65);
  display: flex; align-items: center; justify-content: center;
  padding: clamp(20px, 5vw, 40px);
  animation: gOverlayIn .3s ease both;
}
@keyframes gOverlayIn { from { opacity: 0; } }
.gate-card {
  background: var(--hero-bg);
  border-radius: 28px; border: 1px solid rgba(0,0,0,.06);
  box-shadow: 0 1px 0 rgba(255,255,255,.65) inset, 0 24px 56px -20px rgba(20,40,30,.5), 0 4px 12px rgba(20,40,30,.08);
  padding: clamp(32px, 4vw, 52px) clamp(28px, 4vw, 48px);
  max-width: 400px; width: 100%;
  text-align: center; position: relative;
  animation: gCardIn .45s cubic-bezier(.2,.8,.2,1) both;
}
@keyframes gCardIn { from { opacity: 0; transform: translateY(20px) scale(.97); } }
.gate-card.is-wrong { animation: gShake .42s cubic-bezier(.36,.07,.19,.97) both; }
@keyframes gShake {
  0%,100% { transform: translateX(0); }
  15% { transform: translateX(-9px) rotate(-.4deg); }
  30% { transform: translateX(8px) rotate(.4deg); }
  45% { transform: translateX(-7px) rotate(-.3deg); }
  60% { transform: translateX(6px) rotate(.3deg); }
  78% { transform: translateX(-3px); }
}
.gate-card.is-unlocked { animation: gCardOut .45s cubic-bezier(.2,.8,.2,1) forwards; }
@keyframes gCardOut { to { opacity: 0; transform: scale(.96) translateY(-10px); } }
.gate-close {
  position: absolute; top: 16px; right: 16px;
  width: 30px; height: 30px; border-radius: 999px;
  background: rgba(20,40,30,.07); border: 0; cursor: pointer;
  display: grid; place-items: center; color: var(--ink); opacity: .45;
  transition: opacity .2s, background .2s;
}
.gate-close:hover { opacity: 1; background: rgba(20,40,30,.12); }
.gate-icon {
  width: 68px; height: 68px; border-radius: 20px;
  background: #F8E45A; display: grid; place-items: center;
  margin: 0 auto 24px;
  box-shadow: 0 1px 0 rgba(255,255,255,.55) inset, 0 10px 24px rgba(248,228,90,.45);
  animation: gBreathe 3.2s ease-in-out infinite;
  transition: background .4s ease, box-shadow .4s ease;
}
.gate-icon.is-open {
  background: #6BD08A;
  box-shadow: 0 1px 0 rgba(255,255,255,.55) inset, 0 10px 24px rgba(107,208,138,.45);
  animation: none;
}
@keyframes gBreathe { 0%,100% { transform: scale(1); } 50% { transform: scale(1.05); } }
.gate-title {
  margin: 0 0 10px;
  font-family: 'Newsreader', Georgia, serif;
  font-weight: 800; font-size: clamp(22px, 3vw, 30px);
  letter-spacing: -0.025em; color: var(--ink);
}
.gate-desc {
  margin: 0 auto 26px; max-width: 30ch;
  font-size: 15px; line-height: 1.6; font-weight: 500;
  color: var(--ink); opacity: .65;
}
.gate-input {
  display: block; width: 100%; padding: 13px 16px; margin-bottom: 8px;
  background: rgba(22,58,46,.05); border: 1.5px solid rgba(20,40,30,.14);
  border-radius: 10px;
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  font-size: 16px; font-weight: 600; color: var(--ink);
  letter-spacing: .10em; text-align: center; outline: none;
  transition: border-color .18s, box-shadow .18s, background .18s;
  -webkit-appearance: none; appearance: none;
}
.gate-input::placeholder { letter-spacing: 0; font-weight: 500; opacity: .35; }
.gate-input:focus { border-color: rgba(22,58,46,.45); box-shadow: 0 0 0 3px rgba(22,58,46,.08); }
.gate-input.is-error { border-color: #D95040; box-shadow: 0 0 0 3px rgba(217,80,64,.12); background: rgba(217,80,64,.04); }
.gate-error {
  font-size: 12px; font-weight: 600; letter-spacing: .01em;
  color: #D95040; font-family: 'JetBrains Mono', monospace; margin: 0 0 14px;
}
.gate-btn {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  width: 100%; padding: 14px 20px; margin-top: 6px;
  background: var(--pill-dark); color: #F4ECDC;
  border: 0; border-radius: 10px; cursor: pointer;
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  font-size: 15px; font-weight: 700; letter-spacing: -0.01em;
  box-shadow: 0 1px 0 rgba(255,255,255,.07) inset, 0 6px 20px rgba(0,0,0,.26);
  transition: transform .2s ease, box-shadow .2s ease;
}
.gate-btn:hover { transform: translateY(-1px); box-shadow: 0 1px 0 rgba(255,255,255,.07) inset, 0 10px 26px rgba(0,0,0,.3); }
.gate-or {
  display: flex; align-items: center; gap: 12px;
  margin: 20px 0; color: var(--ink); opacity: .22;
  font-size: 11px; font-family: 'JetBrains Mono', monospace; letter-spacing: .08em;
}
.gate-or::before, .gate-or::after { content: ""; flex: 1; height: 1px; background: rgba(20,40,30,.18); }
.gate-contact {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 13px; font-weight: 600; color: var(--ink); opacity: .48;
  text-decoration: none; border-bottom: 1px solid rgba(20,40,30,.18); padding-bottom: 1px;
  transition: opacity .2s;
}
.gate-contact:hover { opacity: .85; }
`;

const sectionsStyleEl = document.createElement('style');
sectionsStyleEl.textContent = sectionsCss;
document.head.appendChild(sectionsStyleEl);

Object.assign(window, { AboutSection, WorkSection, SideSection, FooterSection });
