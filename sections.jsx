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
            Design is how I think.<br />
            Building is how I prove it.
          </h2>
          <div className="about-bio">
            <p>I grew up in a family where success usually meant becoming an engineer or a doctor. So for a long time, I followed the expected path and studied Computer Science and Data Science.</p>
            <p>Along the way, I realized I was not only interested in how systems worked. I cared just as much about how people experienced them, where they felt stuck, and what made a product feel intuitive.</p>
            <p>That curiosity is what pulled me into design. But what kept me going was building things and shipping them into the world.</p>
            <p>I taught myself at night, freelanced while working part-time, and gradually built my way into product design. Along the way I shipped indie apps, made every kind of mistake — marketing, engineering, positioning — and learned more from those than anything else. Over the years, I have helped launch products from scratch across multiple startups, turning early ideas into experiences people actually use.</p>
            <p>My background in engineering and data still shapes how I work. I believe strong product design sits at the intersection of collaboration, experimentation, and evidence, so I use workshops, rapid prototyping, and data-informed thinking to help teams make better decisions.</p>
            <p>Today, I work as a Staff Product Designer at Miro, focused on Growth and AI. Most of my work is about helping powerful products feel easier to understand, easier to adopt, and more meaningful in people's daily workflows.</p>
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
          <div className="about-photo">
            <img
              src="https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=600&q=80"
              alt="Ahmad Majid"
            />
          </div>
          <div className="about-edu">
            <h3 className="about-edu__label">Education</h3>
            <ul className="about-edu__list">
              <li>
                <span className="about-edu__school">Queen Mary University of London</span>
                <span className="about-edu__degree">BSc Computer Science</span>
              </li>
              <li>
                <span className="about-edu__school">University of Twente</span>
                <span className="about-edu__degree">MSc Interactive Technology</span>
              </li>
              <li>
                <span className="about-edu__school">KTH Royal Institute of Technology</span>
                <span className="about-edu__degree">MSc Human Computer Interaction</span>
              </li>
            </ul>
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

const Cursor = React.forwardRef(function Cursor({ overImage }, ref) {
  return (
    <div
      ref={ref}
      className={"cursor " + (overImage ? "is-image" : "")}
      aria-hidden="true"
    >
      <span className="cursor__chip">
        <span className="cursor__chip-dot" />
        Read case study
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M3 6h6M6 3l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    </div>
  );
});

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
  const cursorRef = useRefS(null);
  const overOnMediaRef = useRefS(false);
  const [overImage, setOverImage] = useStateS(false);

  useEffectS(() => {
    const sec = sectionRef.current;
    const cur = cursorRef.current;
    if (!sec || !cur) return;

    const onMove = (e) => {
      const rect = sec.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // No lerp — pin chip directly to the mouse so it never lags behind.
      cur.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      const onMedia = !!e.target.closest(".wrow__media");
      if (onMedia !== overOnMediaRef.current) {
        overOnMediaRef.current = onMedia;
        setOverImage(onMedia);
      }
    };
    const onLeave = () => {
      if (overOnMediaRef.current) {
        overOnMediaRef.current = false;
        setOverImage(false);
      }
    };

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

        <Cursor ref={cursorRef} overImage={overImage} />
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
          <a className="dark-cta dark-cta--lg" href="#" data-cal-link="ahmad-majid-7sgoyt/30min" data-cal-namespace="30min" data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'>
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
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.0;
  font-size: clamp(36px, 5.4vw, 72px);
  color: var(--ink);
}

.about-bio {
  margin-top: 28px;
}
.about-bio p {
  margin: 0 0 16px;
  font-size: clamp(14px, 1.1vw, 16px);
  line-height: 1.65;
  font-weight: 500;
  color: var(--ink);
  opacity: .78;
  max-width: 64ch;
}
.about-bio p:last-child { margin-bottom: 0; }

.about-actions {
  display: flex;
  gap: 10px;
  margin-top: 28px;
  flex-wrap: wrap;
}
.about-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--pill-dark);
  color: #F4ECDC;
  text-decoration: none;
  padding: 10px 18px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: -0.005em;
  box-shadow: 0 4px 10px rgba(0,0,0,.16);
  transition: transform .2s ease, box-shadow .2s ease;
}
.about-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 16px rgba(0,0,0,.22); }

.about-photo {
  width: 220px;
  height: 220px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 16px 32px -12px rgba(20,40,30,.22), 0 0 0 1px rgba(0,0,0,.06);
  margin-bottom: 36px;
}
.about-photo img {
  width: 100%; height: 100%;
  object-fit: cover;
  display: block;
}

.about-edu__label {
  margin: 0 0 4px;
  font-size: 15px;
  font-weight: 700;
  color: var(--ink);
  letter-spacing: -0.01em;
}
.about-edu__list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.about-edu__list li {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 14px 0;
  border-top: 1px solid rgba(20,40,30,.12);
}
.about-edu__school {
  font-size: 14px;
  font-weight: 700;
  color: var(--ink);
  letter-spacing: -0.005em;
}
.about-edu__degree {
  font-size: 13px;
  font-weight: 500;
  color: var(--ink);
  opacity: .6;
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
.slab--work { overflow: visible; }

.work-head {
  display: flex; align-items: end; justify-content: space-between;
  gap: 24px; flex-wrap: wrap;
}

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
  align-self: stretch;
}
.wrow__year {
  position: sticky;
  top: 120px;
  display: flex; align-items: baseline; gap: 8px;
  font-family: 'Newsreader', Georgia, serif;
  font-weight: 500;
  font-size: clamp(34px, 3.2vw, 56px);
  letter-spacing: -0.015em;
  color: var(--ink); opacity: .7;
  transition: opacity .3s ease;
  z-index: 5;
  width: max-content;
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

/* ---- Custom cursor chip (sits next to the system arrow when over a case study) ---- */
.cursor {
  position: absolute;
  left: 0; top: 0;
  pointer-events: none;
  z-index: 80;
  will-change: transform;
}
.cursor__chip {
  position: absolute;
  left: 18px; top: 18px;
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--peach);
  color: var(--pill-dark);
  font-size: 13px; font-weight: 700;
  letter-spacing: -0.005em;
  padding: 8px 14px 8px 12px;
  border-radius: 14px;
  white-space: nowrap;
  box-shadow:
    0 1px 0 rgba(255,255,255,.7) inset,
    0 12px 22px -10px rgba(20,30,20,.32),
    0 2px 4px rgba(20,30,20,.10);
  border: 1px solid rgba(0,0,0,.05);
  opacity: 0;
  transition: opacity .12s linear;
}
.cursor__chip-dot {
  width: 8px; height: 8px; border-radius: 999px;
  background: var(--pill-dark);
  box-shadow: 0 0 0 3px rgba(20,30,20,.10);
}
.cursor.is-image .cursor__chip {
  opacity: 1;
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
  .about-layout { grid-template-columns: 1fr; }
  .about-photo { width: 180px; height: 180px; }
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
