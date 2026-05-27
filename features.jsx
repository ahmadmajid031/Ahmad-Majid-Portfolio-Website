/* global React */
const { useState: useFState, useEffect: useFEffect, useRef: useFRef, useMemo: useFMemo } = React;

// ============================================================
// SERVICES DATA
// ============================================================
const SERVICES = [
  {
    id: "web",
    title: "WEB DESIGN",
    title2: "& DEV",
    eyebrow: "Service 01",
    color: "peach",
    accent: "#E37D3A",
    blurb: "Marketing sites, landing pages, micro-apps. Designed in Figma, shipped in Framer or Webflow — by the same person.",
    pill: "Fixed price · From $1k",
    cta: "Start a project",
    features: [
      { icon: "spark",     label: "Strategy & visual identity" },
      { icon: "layers",    label: "Figma design with motion specs" },
      { icon: "code",      label: "Framer / Webflow build, end-to-end" },
      { icon: "integrate", label: "Integrations & automations" },
      { icon: "chart",     label: "Analytics" },
      { icon: "rocket",    label: "Launch in 4 – 6 weeks" },
    ],
  },
  {
    id: "product",
    title: "PRODUCT",
    title2: "DESIGN",
    eyebrow: "Service 02",
    color: "lilac",
    accent: "#6F62D9",
    blurb: "I embed with your team to ship hard things — onboarding, dashboards, dense workflows.",
    pill: "Hourly rate",
    cta: "Start a project",
    features: [
      { icon: "compass", label: "Discovery, interviews, jobs-to-be-done" },
      { icon: "frame",   label: "Hi-fi flows + interactive prototypes" },
      { icon: "system",  label: "Design system & token pipeline" },
      { icon: "handoff", label: "Engineering handoff" },
      { icon: "chart",   label: "Product analytics" },
      { icon: "layers",  label: "Functional design documents" },
    ],
  },
];

// ============================================================
// ICONS (line, currentColor)
// ============================================================
function Icon({ name, size = 18 }) {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "spark":   return (<svg {...p}><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/></svg>);
    case "layers":  return (<svg {...p}><path d="M12 3 3 8l9 5 9-5-9-5z"/><path d="m3 13 9 5 9-5"/><path d="m3 18 9 5 9-5"/></svg>);
    case "code":    return (<svg {...p}><path d="m9 8-5 4 5 4M15 8l5 4-5 4M13 5l-2 14"/></svg>);
    case "rocket":  return (<svg {...p}><path d="M14 4c4 0 6 2 6 6-2 0-4 1-6 3l-3 3-3-3 3-3c2-2 3-4 3-6z"/><path d="M9 11 6 8c0-3 2-4 4-4M9 15c-1 1-2 3-2 5 2 0 4-1 5-2"/></svg>);
    case "compass": return (<svg {...p}><circle cx="12" cy="12" r="9"/><path d="m15 9-4 2-2 4 4-2 2-4z"/></svg>);
    case "frame":   return (<svg {...p}><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 9h16M9 4v16"/></svg>);
    case "system":  return (<svg {...p}><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><circle cx="17.5" cy="17.5" r="3.5"/></svg>);
    case "handoff": return (<svg {...p}><path d="M3 7h12l-3-3M21 17H9l3 3"/></svg>);
    case "close":   return (<svg {...p}><path d="M5 5l14 14M19 5 5 19"/></svg>);
    case "arrow":   return (<svg {...p}><path d="M4 12h14M13 6l6 6-6 6"/></svg>);
    case "back":    return (<svg {...p}><path d="M20 12H6M11 6l-6 6 6 6"/></svg>);
    case "integrate": return (<svg {...p}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>);
    case "chart":     return (<svg {...p}><path d="M3 3v18h18"/><path d="M7 16l3-4 3 3 4-5"/></svg>);
    case "check":   return (<svg {...p}><path d="m5 12 4 4 10-10"/></svg>);
    default: return null;
  }
}

// ============================================================
// VISUAL VIGNETTES
// ============================================================
function WebVignette() {
  return (
    <svg className="svc-vis" viewBox="0 0 360 280" preserveAspectRatio="xMidYMid meet">
      <g className="svc-vis__browser">
        <rect x="20" y="32" width="320" height="220" rx="14" fill="#15140F"/>
        <circle cx="38" cy="50" r="4" fill="#E37D3A"/>
        <circle cx="52" cy="50" r="4" fill="#F8E45A"/>
        <circle cx="66" cy="50" r="4" fill="#6BD08A"/>
        <rect x="84" y="44" width="180" height="12" rx="6" fill="rgba(244,236,220,.10)"/>
        <rect x="34" y="74" width="180" height="14" rx="3" fill="#F4ECDC"/>
        <rect x="34" y="96" width="120" height="10" rx="3" fill="rgba(244,236,220,.45)"/>
        <rect x="34" y="112" width="260" height="6" rx="3" fill="rgba(244,236,220,.18)"/>
        <rect x="34" y="124" width="220" height="6" rx="3" fill="rgba(244,236,220,.18)"/>
        <rect x="34" y="144" width="92" height="32" rx="6" fill="#E37D3A"/>
        <rect x="142" y="148" width="74" height="24" rx="4" fill="none" stroke="rgba(244,236,220,.3)"/>
        <rect x="34" y="192" width="120" height="46" rx="6" fill="rgba(244,236,220,.08)"/>
        <rect x="166" y="192" width="60" height="46" rx="6" fill="rgba(244,236,220,.08)"/>
        <rect x="238" y="192" width="60" height="46" rx="6" fill="rgba(244,236,220,.08)"/>
      </g>
      <g className="svc-vis__cursor">
        <path d="M180 150l8 22 4-10 11-3z" fill="#F4ECDC" stroke="#15140F" strokeWidth="1.6"/>
      </g>
      <g className="svc-vis__tag">
        <rect x="248" y="14" width="76" height="22" rx="11" fill="#15140F"/>
        <text x="286" y="29" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#6BD08A" letterSpacing=".05em">&lt;ship/&gt;</text>
      </g>
    </svg>
  );
}

function ProductVignette() {
  return (
    <svg className="svc-vis" viewBox="0 0 360 280" preserveAspectRatio="xMidYMid meet">
      <g className="svc-vis__phone">
        <rect x="120" y="30" width="140" height="240" rx="22" fill="#15140F"/>
        <rect x="128" y="46" width="124" height="208" rx="14" fill="#F4ECDC"/>
        <rect x="138" y="60" width="80" height="10" rx="3" fill="#15140F"/>
        <rect x="138" y="78" width="50" height="6" rx="3" fill="rgba(21,20,15,.4)"/>
        <rect x="138" y="98" width="104" height="42" rx="8" fill="#C7C2F0"/>
        <rect x="138" y="150" width="50" height="42" rx="8" fill="#F8C495"/>
        <rect x="192" y="150" width="50" height="42" rx="8" fill="#B8DBEC"/>
        <rect x="138" y="202" width="104" height="14" rx="4" fill="rgba(21,20,15,.08)"/>
        <rect x="138" y="222" width="78" height="14" rx="4" fill="rgba(21,20,15,.08)"/>
      </g>
      <g className="svc-vis__anno svc-vis__anno--1">
        <rect x="22" y="58" width="106" height="48" rx="10" fill="#F4ECDC" stroke="rgba(21,20,15,.08)"/>
        <circle cx="36" cy="82" r="6" fill="#6F62D9"/>
        <rect x="50" y="70" width="64" height="6" rx="3" fill="#15140F"/>
        <rect x="50" y="82" width="48" height="5" rx="2" fill="rgba(21,20,15,.45)"/>
        <rect x="50" y="92" width="60" height="5" rx="2" fill="rgba(21,20,15,.45)"/>
      </g>
      <g className="svc-vis__anno svc-vis__anno--2">
        <rect x="234" y="170" width="116" height="56" rx="10" fill="#15140F"/>
        <rect x="246" y="184" width="76" height="6" rx="3" fill="#F8E45A"/>
        <rect x="246" y="198" width="60" height="5" rx="2" fill="rgba(244,236,220,.55)"/>
        <rect x="246" y="208" width="92" height="5" rx="2" fill="rgba(244,236,220,.55)"/>
      </g>
      <path className="svc-vis__wire" d="M128 82 C 100 110, 200 130, 192 178" stroke="#15140F" strokeWidth="1.5" strokeDasharray="3 4" fill="none" opacity=".4"/>
    </svg>
  );
}

// ============================================================
// SERVICE CARD
// ============================================================
function ServiceCard({ data, onOpen }) {
  const cardRef = useFRef(null);
  return (
    <article
      ref={cardRef}
      className={"svc-card svc-card--" + data.color}
      onClick={() => onOpen(data, cardRef.current?.getBoundingClientRect())}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(data, cardRef.current?.getBoundingClientRect()); }}}
    >
      <div className="svc-card__bg" aria-hidden="true">
        <div className="svc-card__grain" />
      </div>

      <div className="svc-card__main">
        <div className="svc-card__top">
          <span className="svc-card__eyebrow">{data.eyebrow}</span>
          <span className="svc-card__pill">{data.pill}</span>
        </div>

        <h3 className="svc-card__title">
          <span className="svc-card__title-line">{data.title}</span>
          <span className="svc-card__title-line svc-card__title-line--ital">{data.title2}</span>
        </h3>

        <p className="svc-card__blurb">{data.blurb}</p>

        <ul className="svc-card__features">
          {data.features.map((f, i) => (
            <li key={i} style={{ transitionDelay: (i * 60 + 80) + "ms" }}>
              <span className="svc-card__bullet"><Icon name={f.icon} size={14} /></span>
              <span>{f.label}</span>
            </li>
          ))}
        </ul>

        <div className="svc-card__cta">
          <span>{data.cta}</span>
          <span className="svc-card__cta-arrow" aria-hidden="true">
            <Icon name="arrow" size={16} />
          </span>
        </div>
      </div>

      <div className="svc-card__vis">
        {data.id === "web" ? <WebVignette /> : <ProductVignette />}
      </div>
    </article>
  );
}

// ============================================================
// INQUIRY MODAL — multi-step form
// ============================================================
const STEPS = {
  web: [
    { kind: "type",  title: "What are we building?",     sub: "Pick the closest fit — we'll refine on the call.",
      field: "kind",
      options: [
        { value: "marketing", label: "Marketing site",    icon: "rocket",  hint: "Brand site, landing pages" },
        { value: "product",   label: "Product / web app", icon: "frame",   hint: "Dashboards, tools, SaaS" },
        { value: "ecom",      label: "E-commerce",        icon: "layers",  hint: "Shopify, custom storefronts" },
        { value: "other",     label: "Something weird",   icon: "spark",   hint: "I love weird" },
      ] },
    { kind: "scale", title: "How big is the scope?",     sub: "Slide it — be generous, we can always cut.",
      field: "pages", min: 1, max: 30, step: 1, default: 6, suffix: "pages" },
    { kind: "type",  title: "What's your budget?",       sub: "Honest answers save us both time.",
      field: "budget",
      options: [
        { value: "500-1k", label: "$500 – $1,000",        icon: "spark",   hint: "Focused, tight scope" },
        { value: "1k-2k",  label: "$1,000 – $2,000",      icon: "layers",  hint: "Small-to-mid project" },
        { value: "2k-3k",  label: "$2,000 – $3,000",      icon: "code",    hint: "Solid mid-range build" },
        { value: "4k-5k",  label: "$4,000 – $5,000",      icon: "rocket",  hint: "Full-scope engagement" },
        { value: "open",   label: "Budget's not an issue", icon: "compass", hint: "Let's talk scope first" },
      ] },
    { kind: "type",  title: "Design, dev, or both?",     sub: "Helps me scope the right engagement.", cols: 3,
      field: "deliverable",
      options: [
        { value: "design", label: "Design only",           icon: "frame",   hint: "Figma, specs, prototypes" },
        { value: "both",   label: "Design + Dev",          icon: "layers",  hint: "Figma to live, end-to-end" },
        { value: "dev",    label: "Dev only",              icon: "code",    hint: "You have designs, I build" },
      ] },
    { kind: "type",  title: "Which platform?",           sub: "Both are great — this just sets the stack.", cols: 3,
      field: "platform",
      options: [
        { value: "webflow", label: "Webflow",       icon: "system",   hint: "CMS-heavy, no-code friendly" },
        { value: "framer",  label: "Framer",        icon: "spark",    hint: "Interactive & motion-rich" },
        { value: "unsure",  label: "Not sure yet",  icon: "compass",  hint: "We'll figure it out together" },
      ],
      show: (a) => a.deliverable === "both" || a.deliverable === "dev" },
    { kind: "multi", title: "Anything else to include?", sub: "Pick all that apply.",
      field: "extras",
      options: [
        { value: "integrations", label: "Integrations & automations", icon: "integrate", hint: "Zapier, Make, custom APIs" },
        { value: "analytics",    label: "Analytics & tracking",       icon: "chart",     hint: "GA4, Mixpanel, heatmaps" },
        { value: "cms",          label: "Content management",         icon: "system",    hint: "Blog, news, no-code edits" },
        { value: "none",         label: "None needed",               icon: "check",     hint: "Keep it simple" },
      ] },
    { kind: "contact", title: "Last bit — who are you?", sub: "I reply within a day, usually faster." },
  ],
  product: [
    { kind: "type",  title: "What's the surface?",       sub: "We can mix later — start with the biggest pain.",
      field: "kind",
      options: [
        { value: "0to1",     label: "0 → 1 product",     icon: "spark",   hint: "Net new, no design yet" },
        { value: "redesign", label: "Redesign",           icon: "frame",   hint: "Existing app, needs love" },
        { value: "ongoing",  label: "Ongoing product",    icon: "compass", hint: "In-flight, needs a designer" },
        { value: "system",   label: "Design system",      icon: "system",  hint: "Tokens, components, governance" },
      ] },
    { kind: "type",  title: "Who's on the team today?",  sub: "Solo founders welcome.",
      field: "team",
      options: [
        { value: "solo",  label: "Just me",  icon: "spark",   hint: "Solo founder or freelancer" },
        { value: "small", label: "2 – 5",    icon: "layers",  hint: "Small, tight-knit team" },
        { value: "mid",   label: "6 – 20",   icon: "frame",   hint: "Growing startup" },
        { value: "large", label: "20+",      icon: "rocket",  hint: "Scale-up or enterprise" },
      ] },
    { kind: "scale", title: "Engagement length?",        sub: "Most engagements run 3 – 6 months.",
      field: "months", min: 1, max: 12, step: 1, default: 3, suffix: "months" },
    { kind: "scale", title: "Hours per week?",           sub: "Be realistic — we can always adjust as we go.",
      field: "hours", min: 5, max: 30, step: 5, default: 10, suffix: "hrs / week", ticks: [5, 15, 30] },
    { kind: "contact", title: "Tell me about you",       sub: "Where can I find you?" },
  ],
};

const isEmailValid = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v || "");

function InquiryModal({ service, originRect, onClose }) {
  const [idx, setIdx]           = useFState(0);
  const [answers, setAnswers]   = useFState({});
  const [submitted, setSubmitted] = useFState(false);
  const [confetti, setConfetti] = useFState([]);
  const [direction, setDirection] = useFState(1);
  const overlayRef = useFRef(null);

  const steps = useFMemo(() => {
    return (STEPS[service.id] || []).filter(s => !s.show || s.show(answers));
  }, [service.id, answers]);
  const total   = steps.length;
  const step    = steps[idx];
  const progress = Math.round(((idx + (submitted ? 1 : 0)) / total) * 100);

  // Pop modal from the clicked card's position
  const popStyle = useFMemo(() => {
    if (!originRect) return {};
    const vw = window.innerWidth, vh = window.innerHeight;
    const cx = originRect.left + originRect.width  / 2 - vw / 2;
    const cy = originRect.top  + originRect.height / 2 - vh / 2;
    return { "--modal-origin-x": cx + "px", "--modal-origin-y": cy + "px" };
  }, [originRect]);

  // Esc to close
  useFEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Enter" && !submitted) next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [idx, answers, submitted]);

  // Lock body scroll
  useFEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  const setVal = (field, value) => setAnswers(a => ({ ...a, [field]: value }));

  const toggleMulti = (field, value) => {
    setAnswers(a => {
      const cur = a[field] || [];
      if (value === "none") return { ...a, [field]: ["none"] };
      const without = cur.filter(v => v !== "none" && v !== value);
      if (cur.includes(value)) return { ...a, [field]: without };
      return { ...a, [field]: [...without, value] };
    });
  };

  const isStepValid = (() => {
    if (!step) return false;
    if (step.kind === "contact") return !!(answers.name && isEmailValid(answers.email));
    if (step.kind === "scale")   return true;
    if (step.kind === "multi")   return (answers[step.field] || []).length > 0;
    return !!answers[step.field];
  })();

  const next = () => {
    if (!isStepValid) return;
    if (idx < total - 1) {
      setDirection(1);
      setIdx(i => i + 1);
    } else {
      setSubmitted(true);
      const colors = ["#F8C495","#C7C2F0","#B8DBEC","#F8E45A","#6BD08A","#F4A26B"];
      const pieces = Array.from({ length: 60 }, (_, i) => ({
        id: i,
        x:  50 + (Math.random() - 0.5) * 30,
        dx: (Math.random() - 0.5) * 700,
        dy: 400 + Math.random() * 400,
        r:  (Math.random() - 0.5) * 720,
        s:  6 + Math.random() * 10,
        d:  Math.random() * 0.4,
        c:  colors[i % colors.length],
        sh: Math.random() > 0.5 ? "sq" : "ci",
      }));
      setConfetti(pieces);
    }
  };

  const back = () => {
    if (idx === 0) return;
    setDirection(-1);
    setIdx(i => i - 1);
  };

  // Initialise slider defaults on first visit
  useFEffect(() => {
    if (step && step.kind === "scale" && answers[step.field] == null) {
      setVal(step.field, step.default);
    }
  }, [idx]);

  return (
    <div
      className="modal"
      ref={overlayRef}
      style={popStyle}
      onMouseDown={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className={"modal__panel modal__panel--" + service.color}>
        {/* Header */}
        <header className="modal__head">
          <div className="modal__head-l">
            <div className="modal__chip">
              <span className="modal__chip-dot" style={{ background: service.accent }} />
              {service.title} {service.title2}
            </div>
          </div>
          <div className="modal__progress">
            <div className="modal__progress-track">
              <div className="modal__progress-fill" style={{ width: progress + "%" }} />
            </div>
            <div className="modal__progress-label">{submitted ? "Sent ✓" : `Step ${idx + 1} of ${total}`}</div>
          </div>
          <button className="modal__close" onClick={onClose} aria-label="Close">
            <Icon name="close" size={16} />
          </button>
        </header>

        {/* Body */}
        <div className="modal__body">
          {!submitted && step && (
            <div key={idx} className={"step step--" + step.kind + " step--" + (direction > 0 ? "in-r" : "in-l")}>
              <h3 className="step__title">{step.title}</h3>
              <p className="step__sub">{step.sub}</p>

              {step.kind === "type" && (
                <div className={"opt-grid opt-grid--" + (step.cols || 2)}>
                  {step.options.map(o => (
                    <button key={o.value} type="button"
                      className={"opt-card " + (answers[step.field] === o.value ? "is-on" : "")}
                      onClick={() => setVal(step.field, o.value)}
                    >
                      <span className="opt-card__icon"><Icon name={o.icon} size={22}/></span>
                      <span className="opt-card__label">{o.label}</span>
                      <span className="opt-card__hint">{o.hint}</span>
                      <span className="opt-card__check"><Icon name="check" size={12}/></span>
                    </button>
                  ))}
                </div>
              )}

              {step.kind === "multi" && (
                <div className="opt-grid opt-grid--2">
                  {step.options.map(o => {
                    const sel = answers[step.field] || [];
                    const on  = sel.includes(o.value);
                    return (
                      <button key={o.value} type="button"
                        className={"opt-card " + (on ? "is-on" : "")}
                        onClick={() => toggleMulti(step.field, o.value)}
                      >
                        <span className="opt-card__icon"><Icon name={o.icon} size={22}/></span>
                        <span className="opt-card__label">{o.label}</span>
                        <span className="opt-card__hint">{o.hint}</span>
                        <span className="opt-card__check"><Icon name="check" size={12}/></span>
                      </button>
                    );
                  })}
                </div>
              )}

              {step.kind === "chips" && (
                <div className="chip-grid">
                  {step.options.map(o => (
                    <button key={o} type="button"
                      className={"chip " + (answers[step.field] === o ? "is-on" : "")}
                      onClick={() => setVal(step.field, o)}
                    >{o}</button>
                  ))}
                </div>
              )}

              {step.kind === "scale" && (
                <div className="scale">
                  <div className="scale__display">
                    <span className="scale__num">{answers[step.field] ?? step.default}</span>
                    <span className="scale__suffix">{step.suffix}</span>
                  </div>
                  <input
                    className="scale__range"
                    type="range"
                    min={step.min} max={step.max} step={step.step}
                    value={answers[step.field] ?? step.default}
                    onChange={(e) => setVal(step.field, +e.target.value)}
                    style={{ "--p": ((answers[step.field] ?? step.default) - step.min) / (step.max - step.min) * 100 + "%" }}
                  />
                  <div className="scale__ticks">
                    {(step.ticks || [step.min, Math.round((step.min + step.max) / 2), step.max])
                      .map((t, i, arr) => <span key={i}>{t}{i === arr.length - 1 ? "+" : ""}</span>)}
                  </div>
                </div>
              )}

              {step.kind === "vibe" && (
                <div className="opt-grid opt-grid--2">
                  {step.options.map(o => (
                    <button key={o.value} type="button"
                      className={"vibe-card " + (answers[step.field] === o.value ? "is-on" : "")}
                      onClick={() => setVal(step.field, o.value)}
                    >
                      <span className="vibe-card__swatch"
                        style={{ background: `linear-gradient(135deg, ${o.bg[0]} 0%, ${o.bg[0]} 50%, ${o.bg[1]} 50%, ${o.bg[1]} 100%)` }}
                      />
                      <span className="vibe-card__label">{o.label}</span>
                      <span className="opt-card__check"><Icon name="check" size={12}/></span>
                    </button>
                  ))}
                </div>
              )}

              {step.kind === "contact" && (
                <div className="contact-grid">
                  <label className="field">
                    <span className="field__label">Your name</span>
                    <input className="field__input" type="text" value={answers.name || ""} onChange={e => setVal("name", e.target.value)} placeholder="Ada Lovelace" autoFocus/>
                  </label>
                  <label className="field">
                    <span className="field__label">Email</span>
                    <input
                      className={"field__input" + (answers.email && !isEmailValid(answers.email) ? " field__input--err" : "")}
                      type="email"
                      value={answers.email || ""}
                      onChange={e => setVal("email", e.target.value)}
                      placeholder="ada@countess.co"
                    />
                    {answers.email && !isEmailValid(answers.email) && (
                      <span className="field__err">Enter a valid email address</span>
                    )}
                  </label>
                  <label className="field field--wide">
                    <span className="field__label">Anything else? <span className="field__opt">(optional)</span></span>
                    <textarea className="field__input field__input--ta" rows="3" value={answers.notes || ""} onChange={e => setVal("notes", e.target.value)} placeholder="Links, deadlines, weird ideas…"/>
                  </label>
                </div>
              )}
            </div>
          )}

          {submitted && (
            <div className="success">
              <div className="success__seal">
                <svg viewBox="0 0 80 80" width="84" height="84">
                  <circle cx="40" cy="40" r="36" fill="#15140F"/>
                  <path d="M26 41l10 10 20-22" stroke="#6BD08A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"
                        className="success__check"/>
                </svg>
              </div>
              <h3 className="success__title">Got it. <em>Talk soon.</em></h3>
              <p className="success__sub">I'll reply to <strong>{answers.email || "you"}</strong> within a day — usually a lot less.</p>
              <button className="modal__cta modal__cta--done" onClick={onClose}>
                Back to the site
                <Icon name="arrow" size={16}/>
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {!submitted && (
          <footer className="modal__foot">
            <button className="modal__back" onClick={back} disabled={idx === 0}>
              <Icon name="back" size={14}/> Back
            </button>
            <button
              className="modal__cta"
              onClick={next}
              disabled={!isStepValid}
            >
              {idx === total - 1 ? "Send it" : "Next"}
              <Icon name="arrow" size={16}/>
            </button>
          </footer>
        )}

        {/* Confetti */}
        {confetti.length > 0 && (
          <div className="confetti" aria-hidden="true">
            {confetti.map(p => (
              <span key={p.id}
                className={"confetti__p confetti__p--" + p.sh}
                style={{
                  left: p.x + "%", width: p.s, height: p.s, background: p.c,
                  animationDelay: p.d + "s",
                  "--dx": p.dx + "px", "--dy": p.dy + "px", "--r": p.r + "deg",
                }}
              />
            ))}
          </div>
        )}

        <div className="modal__blob modal__blob--1" aria-hidden="true" />
        <div className="modal__blob modal__blob--2" aria-hidden="true" />
      </div>
    </div>
  );
}

// ============================================================
// SECTION
// ============================================================
function ServicesSection() {
  const [open, setOpen] = useFState(null);
  const secRef  = useFRef(null);
  const [inView, setInView] = useFState(false);

  useFEffect(() => {
    if (!secRef.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); io.disconnect(); }
    }, { threshold: 0, rootMargin: "0px 0px -80px 0px" });
    io.observe(secRef.current);
    return () => io.disconnect();
  }, []);

  const handleOpen  = (service, rect) => setOpen({ service, rect });
  const handleClose = () => setOpen(null);

  return (
    <section ref={secRef} className={"slab slab--svc " + (inView ? "is-in" : "")} id="services">
      <div className="slab__inner">
        <div className="svc-head">
          <div className="slab__eyebrow">What I can do for you</div>
          <h2 className="slab__h2">Two ways to <em>work together.</em></h2>
        </div>

        <div className="svc-stack">
          {SERVICES.map(s => (
            <ServiceCard key={s.id} data={s} onOpen={handleOpen} />
          ))}
        </div>
      </div>

      {open && (
        <InquiryModal
          service={open.service}
          originRect={open.rect}
          onClose={handleClose}
        />
      )}
    </section>
  );
}

// ============================================================
// STYLES
// ============================================================
const featuresCss = `
/* ===== Services section ===== */
.slab--svc { overflow: visible; }
.svc-head  { display: flex; flex-direction: column; gap: 6px; margin-bottom: 44px; }
.svc-stack { display: flex; flex-direction: column; gap: 22px; }

/* ===== Service card ===== */
.svc-card {
  position: relative;
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  gap: 24px;
  align-items: stretch;
  padding: 38px clamp(28px, 4vw, 56px);
  border-radius: 28px;
  background: var(--card-bg);
  border: 1px solid rgba(0,0,0,.06);
  box-shadow: 0 1px 0 rgba(255,255,255,.5) inset, 0 22px 40px -28px rgba(20,40,30,.22);
  cursor: pointer;
  overflow: hidden;
  transition: transform .5s cubic-bezier(.2,.8,.2,1), box-shadow .4s ease;
  isolation: isolate;
}
.svc-card--peach { --card-bg: #F8DDC1; --card-accent: #E37D3A; }
.svc-card--lilac { --card-bg: #DCD8F5; --card-accent: #6F62D9; }

.svc-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 1px 0 rgba(255,255,255,.55) inset, 0 32px 50px -28px rgba(20,40,30,.32);
}
.svc-card:hover .svc-card__cta-arrow { transform: translateX(6px) rotate(-2deg); }
.svc-card:hover .svc-vis__browser    { transform: translateY(-4px); }
.svc-card:hover .svc-vis__cursor     { transform: translate(8px,-6px) rotate(-4deg); }
.svc-card:hover .svc-vis__tag        { transform: translate(-6px,2px) rotate(-3deg); }
.svc-card:hover .svc-vis__phone      { transform: translateY(-3px) rotate(-2deg); }
.svc-card:hover .svc-vis__anno--1    { transform: translate(-6px,-4px) rotate(-4deg); }
.svc-card:hover .svc-vis__anno--2    { transform: translate(6px,2px) rotate(3deg); }
.svc-card:active { transform: translateY(-1px) scale(.997); }
.svc-card:focus-visible { outline: 2px solid var(--card-accent); outline-offset: 4px; }

.svc-card__bg { position: absolute; inset: 0; pointer-events: none; z-index: 0;
  background: radial-gradient(80% 60% at 95% 0%, rgba(255,255,255,.6), transparent 60%),
              radial-gradient(120% 80% at 0% 100%, rgba(0,0,0,.05), transparent 60%); }
.svc-card__grain {
  position: absolute; inset: 0; opacity: .55; mix-blend-mode: multiply;
  background-image: radial-gradient(rgba(0,0,0,.04) 1px, transparent 1px);
  background-size: 4px 4px; pointer-events: none;
}

.svc-card__main { position: relative; z-index: 2; display: flex; flex-direction: column; }
.svc-card__top  { display: flex; justify-content: flex-start; align-items: center; gap: 10px; margin-bottom: 18px; }
.svc-card__eyebrow {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px; font-weight: 500; letter-spacing: .12em; text-transform: uppercase;
  color: var(--card-accent);
}
.svc-card__pill {
  display: inline-flex; align-items: center;
  padding: 5px 10px; border-radius: 999px;
  background: rgba(21,20,15,.08); color: var(--pill-dark);
  font-size: 12px; font-weight: 600; letter-spacing: -0.005em;
}

.svc-card__title {
  margin: 0 0 18px;
  font-family: 'Newsreader', Georgia, serif;
  font-weight: 800;
  font-size: clamp(40px, 5.4vw, 76px);
  line-height: .9; letter-spacing: -0.03em;
  color: var(--pill-dark);
}
.svc-card__title-line       { display: block; }
.svc-card__title-line--ital {
  font-style: italic; font-weight: 600;
  letter-spacing: -0.02em;
  opacity: .88; font-size: .82em; margin-top: 4px;
}

.svc-card__blurb {
  margin: 0 0 22px;
  font-size: clamp(15px, 1.15vw, 17px); line-height: 1.5; font-weight: 500;
  color: var(--pill-dark); opacity: .78; max-width: 44ch;
}

.svc-card__features {
  list-style: none; padding: 0; margin: 0 0 26px;
  display: flex; flex-direction: column; gap: 10px;
}
.svc-card__features li {
  display: flex; align-items: center; gap: 12px;
  font-size: 14.5px; font-weight: 500; color: var(--pill-dark); letter-spacing: -0.005em;
}
.svc-card__bullet {
  width: 28px; height: 28px; display: grid; place-items: center;
  border-radius: 8px; background: rgba(21,20,15,.08); color: var(--pill-dark);
  flex: 0 0 28px;
  transition: background .3s ease, color .3s ease;
}
.svc-card:hover .svc-card__bullet { background: var(--pill-dark); color: #F4ECDC; }
.svc-card:hover .svc-card__features li:nth-child(1) .svc-card__bullet { transition-delay:   0ms; }
.svc-card:hover .svc-card__features li:nth-child(2) .svc-card__bullet { transition-delay:  50ms; }
.svc-card:hover .svc-card__features li:nth-child(3) .svc-card__bullet { transition-delay: 100ms; }
.svc-card:hover .svc-card__features li:nth-child(4) .svc-card__bullet { transition-delay: 150ms; }
.svc-card:hover .svc-card__features li:nth-child(5) .svc-card__bullet { transition-delay: 200ms; }
.svc-card:hover .svc-card__features li:nth-child(6) .svc-card__bullet { transition-delay: 250ms; }

.svc-card__cta {
  align-self: flex-start; margin-top: auto;
  display: inline-flex; align-items: center; gap: 10px;
  padding: 12px 18px; background: var(--pill-dark); color: #F4ECDC;
  border-radius: 999px; font-size: 14px; font-weight: 600; letter-spacing: -0.005em;
  box-shadow: 0 6px 14px rgba(0,0,0,.16);
}
.svc-card__cta-arrow { display: inline-flex; transition: transform .35s cubic-bezier(.4,1.5,.5,1); }

/* ===== Vignette ===== */
.svc-card__vis { position: relative; z-index: 1; display: grid; place-items: center; min-height: 280px; }
.svc-vis       { width: 100%; max-width: 380px; height: auto; filter: drop-shadow(0 22px 28px rgba(20,30,20,.18)); }
.svc-vis__browser, .svc-vis__cursor, .svc-vis__tag,
.svc-vis__phone,   .svc-vis__anno--1, .svc-vis__anno--2 { transition: transform .55s cubic-bezier(.2,.8,.2,1); }
.svc-vis__anno--1, .svc-vis__anno--2 { filter: drop-shadow(0 4px 8px rgba(0,0,0,.16)); }
.svc-vis__phone  { filter: drop-shadow(0 12px 18px rgba(0,0,0,.18)); }

@keyframes svcFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
.svc-vis__cursor  { animation: svcFloat 4.2s ease-in-out infinite; }
.svc-vis__anno--1 { animation: svcFloat 5s   ease-in-out infinite; }
.svc-vis__anno--2 { animation: svcFloat 5.4s ease-in-out infinite reverse; }
.svc-vis__tag     { animation: svcFloat 4.6s ease-in-out infinite reverse; }

/* ============================================================
   MODAL
   ============================================================ */
.modal {
  position: fixed; inset: 0; z-index: 9000;
  background: rgba(21,20,15,.42); backdrop-filter: blur(10px);
  display: grid; place-items: center;
  padding: clamp(12px, 3vw, 32px);
  overflow-y: auto;
  animation: modalFade .35s ease;
}
@keyframes modalFade { from { opacity: 0; } to { opacity: 1; } }

.modal__panel {
  position: relative; width: min(880px, 100%);
  max-height: 92vh; max-height: 92dvh;
  background: var(--hero-bg);
  border-radius: 26px; border: 1px solid rgba(0,0,0,.08);
  box-shadow: 0 40px 80px -30px rgba(20,30,20,.5), 0 1px 0 rgba(255,255,255,.6) inset;
  display: flex; flex-direction: column; overflow: hidden;
  transform-origin: calc(50% + var(--modal-origin-x,0px)) calc(50% + var(--modal-origin-y,0px));
  animation: modalPop .55s cubic-bezier(.2,.9,.25,1.05);
}
@keyframes modalPop {
  0%   { transform: scale(.4) translate(var(--modal-origin-x,0px), var(--modal-origin-y,0px)); opacity: 0; }
  60%  { transform: scale(1.02); opacity: 1; }
  100% { transform: scale(1) translate(0,0); opacity: 1; }
}
.modal__panel--peach { background: #FBF1E0; }
.modal__panel--lilac { background: #F1EEFB; }

.modal__blob {
  position: absolute; border-radius: 50%; pointer-events: none; z-index: 0;
  filter: blur(40px); opacity: .55;
  animation: blobDrift 12s ease-in-out infinite;
}
.modal__blob--1 { width: 280px; height: 280px; background: var(--peach); top: -60px; right: -60px; }
.modal__blob--2 { width: 220px; height: 220px; background: var(--lilac); bottom: -60px; left: -40px; animation-delay: -6s; }
@keyframes blobDrift { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(18px,-22px) scale(1.06)} }

.modal__head {
  position: relative; z-index: 2; flex-shrink: 0;
  display: grid; grid-template-columns: auto 1fr auto;
  align-items: center; gap: 16px;
  padding: 18px 22px;
  border-bottom: 1px solid rgba(20,40,30,.08);
}
.modal__chip {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 6px 12px; border-radius: 999px;
  background: rgba(21,20,15,.06); color: var(--pill-dark);
  font-size: 12px; font-weight: 700; letter-spacing: .04em; text-transform: uppercase;
}
.modal__chip-dot { width: 8px; height: 8px; border-radius: 999px; }

.modal__progress          { display: flex; align-items: center; gap: 12px; }
.modal__progress-track    { flex: 1; height: 6px; border-radius: 999px; background: rgba(21,20,15,.08); overflow: hidden; }
.modal__progress-fill     { height: 100%; background: var(--pill-dark); border-radius: 999px; transition: width .5s cubic-bezier(.2,.8,.2,1); position: relative; }
.modal__progress-fill::after {
  content: ""; position: absolute; right: 0; top: -2px;
  width: 10px; height: 10px; border-radius: 999px;
  background: var(--pill-dark); box-shadow: 0 0 0 3px rgba(21,20,15,.15);
}
.modal__progress-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px; letter-spacing: .04em; color: var(--pill-dark); opacity: .6; white-space: nowrap;
}

.modal__close {
  width: 36px; height: 36px; border-radius: 999px;
  border: 0; background: rgba(21,20,15,.08); color: var(--pill-dark);
  cursor: pointer; display: grid; place-items: center;
  transition: background .25s ease, transform .25s ease;
}
.modal__close:hover { background: var(--pill-dark); color: #F4ECDC; transform: rotate(90deg); }

.modal__body { position: relative; z-index: 2; flex: 1; padding: clamp(16px,4vw,42px); overflow-y: auto; min-height: 0; -webkit-overflow-scrolling: touch; }

/* Steps */
.step          { position: relative; }
.step--in-r    { animation: stepInR .55s cubic-bezier(.2,.85,.2,1) both; }
.step--in-l    { animation: stepInL .55s cubic-bezier(.2,.85,.2,1) both; }
@keyframes stepInR { from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:translateX(0)} }
@keyframes stepInL { from{opacity:0;transform:translateX(-40px)} to{opacity:1;transform:translateX(0)} }

.step__title {
  margin: 0; font-family: 'Newsreader', Georgia, serif;
  font-weight: 700; font-size: clamp(26px,3.4vw,40px);
  letter-spacing: -0.02em; line-height: 1.05; color: var(--pill-dark);
}
.step__sub { margin: 8px 0 28px; font-size: 15px; font-weight: 500; color: var(--pill-dark); opacity: .68; }

/* Option grid */
.opt-grid    { display: grid; gap: 12px; }
.opt-grid--2 { grid-template-columns: repeat(2, minmax(0,1fr)); }
.opt-grid--3 { grid-template-columns: repeat(3, minmax(0,1fr)); }
/* lone last item in a 2-col grid spans full width (e.g. 5-option budget) */
.opt-grid--2 .opt-card:last-child:nth-child(odd) { grid-column: 1 / -1; }
.opt-card {
  position: relative; display: flex; flex-direction: column; gap: 8px;
  text-align: left; background: rgba(255,255,255,.55);
  border: 1.5px solid rgba(21,20,15,.08); border-radius: 16px;
  padding: 18px 18px 16px; font: inherit; color: var(--pill-dark);
  cursor: pointer;
  transition: transform .25s cubic-bezier(.4,1.5,.5,1), background .25s, border-color .25s, box-shadow .25s;
}
.opt-card:hover { transform: translateY(-2px); background: #fff; }
.opt-card.is-on {
  background: var(--pill-dark); color: #F4ECDC;
  border-color: var(--pill-dark); box-shadow: 0 10px 22px -10px rgba(0,0,0,.4);
  animation: optPop .35s cubic-bezier(.3,1.6,.4,1);
}
@keyframes optPop { 0%{transform:scale(.96)} 60%{transform:scale(1.03)} 100%{transform:scale(1)} }
.opt-card__icon { width: 38px; height: 38px; display: grid; place-items: center; border-radius: 10px; background: rgba(21,20,15,.06); }
.opt-card.is-on .opt-card__icon { background: rgba(244,236,220,.16); }
.opt-card__label { font-weight: 700; font-size: 16px; letter-spacing: -0.01em; }
.opt-card__hint  { font-size: 13px; opacity: .68; font-weight: 500; }
.opt-card__check {
  position: absolute; top: 14px; right: 14px;
  width: 22px; height: 22px; border-radius: 999px;
  background: rgba(244,236,220,.18); display: grid; place-items: center;
  opacity: 0; transform: scale(.6);
  transition: opacity .2s, transform .25s cubic-bezier(.3,1.6,.4,1); color: #6BD08A;
}
.opt-card.is-on .opt-card__check { opacity: 1; transform: scale(1); }
.vibe-card.is-on .opt-card__check { opacity: 1; transform: scale(1); }

/* Chips */
.chip-grid { display: flex; flex-wrap: wrap; gap: 10px; }
.chip {
  background: rgba(255,255,255,.55); border: 1.5px solid rgba(21,20,15,.08);
  border-radius: 999px; padding: 12px 18px;
  font: inherit; font-size: 15px; font-weight: 600; color: var(--pill-dark);
  cursor: pointer; letter-spacing: -0.01em;
  transition: transform .25s cubic-bezier(.4,1.5,.5,1), background .25s, border-color .25s, color .25s;
}
.chip:hover { transform: translateY(-2px); background: #fff; }
.chip.is-on { background: var(--pill-dark); color: #F4ECDC; border-color: var(--pill-dark); animation: optPop .35s cubic-bezier(.3,1.6,.4,1); }

/* Slider */
.scale { background: rgba(255,255,255,.55); border-radius: 18px; padding: 28px 24px 22px; border: 1.5px solid rgba(21,20,15,.08); }
.scale__display { display: flex; align-items: baseline; gap: 8px; margin-bottom: 22px; }
.scale__num {
  font-family: 'Newsreader', Georgia, serif; font-weight: 800;
  font-size: clamp(64px,9vw,100px); line-height: 1; letter-spacing: -0.04em; color: var(--pill-dark);
}
.scale__suffix { font-size: 18px; font-weight: 600; color: var(--pill-dark); opacity: .55; letter-spacing: -0.005em; }
.scale__range {
  -webkit-appearance: none; appearance: none; width: 100%; height: 8px;
  border-radius: 999px; outline: none; margin-bottom: 12px;
  background: linear-gradient(to right, var(--pill-dark) 0%, var(--pill-dark) var(--p,50%), rgba(21,20,15,.12) var(--p,50%), rgba(21,20,15,.12) 100%);
}
.scale__range::-webkit-slider-thumb {
  -webkit-appearance: none; width: 26px; height: 26px; border-radius: 999px;
  background: var(--pill-dark); border: 4px solid #F4ECDC;
  box-shadow: 0 6px 14px rgba(0,0,0,.25); cursor: grab;
  transition: transform .2s ease;
}
.scale__range::-webkit-slider-thumb:active { cursor: grabbing; transform: scale(1.15); }
.scale__range::-moz-range-thumb {
  width: 22px; height: 22px; border-radius: 999px;
  background: var(--pill-dark); border: 4px solid #F4ECDC;
  box-shadow: 0 6px 14px rgba(0,0,0,.25); cursor: grab;
}
.scale__ticks {
  display: flex; justify-content: space-between;
  font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--pill-dark); opacity: .55; letter-spacing: .04em;
}

/* Vibe */
.vibe-card {
  position: relative; display: flex; align-items: center; gap: 14px;
  background: rgba(255,255,255,.55); border: 1.5px solid rgba(21,20,15,.08);
  border-radius: 16px; padding: 14px 16px;
  font: inherit; color: var(--pill-dark); cursor: pointer; text-align: left;
  transition: transform .25s cubic-bezier(.4,1.5,.5,1), background .25s, border-color .25s, box-shadow .25s;
}
.vibe-card:hover { transform: translateY(-2px); background: #fff; }
.vibe-card.is-on { background: var(--pill-dark); color: #F4ECDC; border-color: var(--pill-dark); animation: optPop .35s cubic-bezier(.3,1.6,.4,1); }
.vibe-card__swatch {
  width: 44px; height: 44px; border-radius: 10px; flex: 0 0 44px;
  box-shadow: 0 0 0 1px rgba(0,0,0,.08) inset, 0 4px 10px rgba(0,0,0,.08);
  transition: transform .35s ease;
}
.vibe-card:hover .vibe-card__swatch { transform: rotate(8deg) scale(1.06); }
.vibe-card__label { font-weight: 700; font-size: 15.5px; letter-spacing: -0.01em; }

/* Contact */
.contact-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 14px; }
.field { display: flex; flex-direction: column; gap: 6px; }
.field--wide { grid-column: 1 / -1; }
.field__label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: .12em; color: var(--pill-dark); opacity: .65;
}
.field__opt { text-transform: none; letter-spacing: 0; opacity: .65; }
.field__input {
  font: inherit; color: var(--pill-dark);
  background: rgba(255,255,255,.6); border: 1.5px solid rgba(21,20,15,.08);
  border-radius: 12px; padding: 14px 16px;
  font-size: 15px; font-weight: 500; outline: none;
  transition: background .2s, border-color .2s, transform .2s;
}
.field__input::placeholder { color: var(--pill-dark); opacity: .35; }
.field__input:focus { background: #fff; border-color: var(--pill-dark); transform: translateY(-1px); }
.field__input--ta   { resize: vertical; font-family: inherit; }
.field__input--err  { border-color: #C0392B !important; background: rgba(192,57,43,.06) !important; }
.field__err {
  font-size: 12px; font-weight: 500; color: #C0392B;
  margin-top: -2px; letter-spacing: -0.005em;
}

/* Modal footer */
.modal__foot {
  position: relative; z-index: 2; flex-shrink: 0;
  display: flex; justify-content: space-between; align-items: center;
  padding: 18px 22px; border-top: 1px solid rgba(20,40,30,.08); gap: 12px;
}
.modal__back {
  display: inline-flex; align-items: center; gap: 8px;
  background: transparent; border: 0; cursor: pointer;
  padding: 10px 14px; border-radius: 999px;
  font: inherit; font-size: 14px; font-weight: 600;
  color: var(--pill-dark); opacity: .7; transition: opacity .2s, background .2s;
}
.modal__back:disabled { opacity: .3; cursor: not-allowed; }
.modal__back:not(:disabled):hover { opacity: 1; background: rgba(21,20,15,.06); }

.modal__cta {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--pill-dark); color: #F4ECDC;
  border: 0; cursor: pointer; padding: 13px 22px; border-radius: 999px;
  font: inherit; font-size: 14px; font-weight: 700; letter-spacing: -0.005em;
  box-shadow: 0 8px 18px -4px rgba(21,20,15,.4);
  transition: transform .25s cubic-bezier(.3,1.6,.4,1), box-shadow .25s ease, opacity .25s ease;
}
.modal__cta:hover:not(:disabled) { transform: translateY(-2px) scale(1.02); }
.modal__cta:disabled { opacity: .35; cursor: not-allowed; box-shadow: none; }
.modal__cta--done    { margin: 26px auto 0; background: var(--pill-dark); }

/* Success */
.success { text-align: center; padding: 36px 12px 0; animation: successFade .55s cubic-bezier(.2,.85,.2,1); }
@keyframes successFade { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
.success__seal {
  display: inline-block; margin-bottom: 22px;
  animation: sealPop .65s cubic-bezier(.3,1.6,.4,1);
}
@keyframes sealPop { 0%{transform:scale(0) rotate(-20deg)} 60%{transform:scale(1.15) rotate(8deg)} 100%{transform:scale(1) rotate(0)} }
.success__check { stroke-dasharray: 60; stroke-dashoffset: 60; animation: checkDraw .6s .35s cubic-bezier(.4,1.2,.4,1) forwards; }
@keyframes checkDraw { to { stroke-dashoffset: 0; } }
.success__title {
  margin: 0; font-family: 'Newsreader', Georgia, serif; font-weight: 700;
  font-size: clamp(32px,4.4vw,52px); letter-spacing: -0.02em; line-height: 1; color: var(--pill-dark);
}
.success__title em { font-style: italic; font-weight: 500; opacity: .7; }
.success__sub { margin: 14px 0 0; font-size: 15px; color: var(--pill-dark); opacity: .7; font-weight: 500; }
.success__sub strong { font-weight: 700; opacity: 1; }

/* Confetti */
.confetti { position: absolute; inset: 0; pointer-events: none; overflow: hidden; z-index: 5; }
.confetti__p {
  position: absolute; top: 40%; display: block; border-radius: 2px;
  animation: confettiFall 1.6s cubic-bezier(.3,.7,.3,1) forwards;
  --dx: 0px; --dy: 400px; --r: 0deg;
}
.confetti__p--ci { border-radius: 999px; }
@keyframes confettiFall {
  0%   { opacity: 0; transform: translate(0,0) rotate(0); }
  10%  { opacity: 1; }
  100% { opacity: 0; transform: translate(var(--dx), var(--dy)) rotate(var(--r)); }
}

/* Responsive */
@media (max-width: 880px) {
  .svc-card { grid-template-columns: 1fr; }
  .svc-card__vis { min-height: 200px; order: -1; }
  .svc-vis { max-width: 280px; }
  .contact-grid { grid-template-columns: 1fr; }
  .opt-grid--2, .opt-grid--3 { grid-template-columns: 1fr; }
  .opt-grid--2 .opt-card:last-child:nth-child(odd) { grid-column: auto; }
  /* header: chip + close on one row, progress bar below */
  .modal__head {
    display: flex; flex-wrap: wrap;
    align-items: center; justify-content: space-between;
    gap: 10px;
  }
  .modal__progress { order: 3; flex: 1 1 100%; }
}

/* Bottom sheet on phones */
@keyframes sheetUp {
  from { transform: translateY(100%); }
  to   { transform: translateY(0); }
}
@media (max-width: 600px) {
  .modal {
    padding: 0;
    align-items: flex-end;
    overflow: hidden;
  }
  .modal__panel {
    width: 100%;
    /* fixed height so the body flex-child can expand and scroll inside */
    height: 88vh; height: 88dvh;
    max-height: 92vh; max-height: 92dvh;
    border-radius: 22px 22px 0 0;
    animation: sheetUp .4s cubic-bezier(.2,.9,.25,1);
  }
  /* pull-handle pill */
  .modal__panel::before {
    content: ""; display: block; flex-shrink: 0;
    width: 36px; height: 4px; border-radius: 999px;
    background: rgba(21,20,15,.16);
    margin: 10px auto 2px;
  }
  .modal__head { padding: 8px 16px 10px; }
  .modal__body { padding: 10px 14px 16px; }
  .modal__foot { padding: 10px 14px 12px; }
  .step__title { font-size: clamp(20px, 5.5vw, 28px); }
  .step__sub   { margin-bottom: 16px; font-size: 14px; }
  .opt-card    { padding: 12px 12px 10px; gap: 6px; }
  .opt-card__icon { width: 32px; height: 32px; }
  /* hide "Step X of Y" text — only track shows on narrow screens */
  .modal__progress-label { display: none; }
}
`;

const featuresStyleEl = document.createElement('style');
featuresStyleEl.textContent = featuresCss;
document.head.appendChild(featuresStyleEl);

window.ServicesSection = ServicesSection;
