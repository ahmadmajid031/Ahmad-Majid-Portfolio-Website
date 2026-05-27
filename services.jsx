/* global React */
/* services.jsx — Two morphing service cards with multi-step conditional forms */
'use strict';

const { useState, useEffect, useRef, useMemo } = React;

// ─── Question configs ─────────────────────────────────────────────────────────

const WEB_QS = [
  {
    id: 'need', q: 'What do you need?',
    type: 'radio', auto: true,
    opts: ['Web design', 'Web development', 'Both'],
  },
  {
    id: 'platform', q: 'Which platform?',
    type: 'radio', auto: true,
    opts: ['Framer', 'Webflow', 'Other'],
    show: a => a.need === 'Web development' || a.need === 'Both',
  },
  {
    id: 'scope', q: "What's the scope?",
    type: 'radio', auto: true,
    opts: ['Single landing page', 'Multiple pages'],
  },
  {
    id: 'pages', q: 'Roughly how many pages?',
    type: 'number', placeholder: 'e.g. 5',
    show: a => a.scope === 'Multiple pages',
  },
  {
    id: 'analytics', q: 'Do you want analytics set up?',
    type: 'radio', auto: true,
    opts: ['Yes', 'No'],
  },
  {
    id: 'addons', q: 'Any add-ons? (optional)',
    type: 'multi', optional: true,
    opts: ['Integrations & Automation', 'Email Marketing Setup'],
  },
  { id: 'contact', type: 'contact', q: 'Almost there — how can I reach you?' },
];

const PRODUCT_QS = [
  {
    id: 'need', q: 'What do you need?',
    type: 'multi',
    opts: ['UX Architecture', 'Product Design', 'UX Research', 'Product Analytics'],
  },
  {
    id: 'stage', q: 'What stage is your project?',
    type: 'radio', auto: true,
    opts: ['0 → 1', 'Redesign', 'Ongoing'],
  },
  {
    id: 'research', q: 'Do you have existing research?',
    type: 'radio', auto: true,
    opts: ['Yes', 'No', 'Some'],
    show: a => Array.isArray(a.need) && a.need.includes('UX Research'),
  },
  {
    id: 'timeline', q: "What's your timeline?",
    type: 'radio', auto: true,
    opts: ['< 1 month', '1–3 months', '3+ months', 'Flexible'],
  },
  { id: 'contact', type: 'contact', q: 'Almost there — how can I reach you?' },
];

// ─── Multi-step form hook ─────────────────────────────────────────────────────

function useMultiForm(allQs) {
  const [answers, setAnswers]   = useState({});
  const [stepIdx, setStepIdx]   = useState(0);
  const [dir,     setDir]       = useState(1);   // 1=fwd, -1=back
  const [status,  setStatus]    = useState('idle'); // idle|submitting|done
  const timerRef = useRef(null);

  const steps = useMemo(
    () => allQs.filter(q => !q.show || q.show(answers)),
    [allQs, answers]
  );

  const step    = steps[Math.min(stepIdx, steps.length - 1)];
  const total   = steps.length;
  const isFirst = stepIdx === 0;
  const isLast  = stepIdx === total - 1;
  const progress = total > 1 ? (stepIdx / (total - 1)) * 100 : 0;

  function answer(id, val) {
    setAnswers(prev => ({ ...prev, [id]: val }));
  }

  function goNext() {
    setDir(1);
    setStepIdx(i => Math.min(i + 1, steps.length - 1));
  }

  function goBack() {
    setDir(-1);
    setStepIdx(i => Math.max(i - 1, 0));
  }

  // For radio: update answer + auto-advance after 340ms
  function autoSelect(id, val) {
    const newAnswers = { ...answers, [id]: val };
    setAnswers(newAnswers);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const nextSteps = allQs.filter(q => !q.show || q.show(newAnswers));
      setDir(1);
      setStepIdx(i => Math.min(i + 1, nextSteps.length - 1));
    }, 340);
  }

  async function submit(contactData) {
    setAnswers(prev => ({ ...prev, contact: contactData }));
    setStatus('submitting');
    await new Promise(r => setTimeout(r, 1500));
    setStatus('done');
  }

  function reset() {
    clearTimeout(timerRef.current);
    setAnswers({});
    setStepIdx(0);
    setDir(1);
    setStatus('idle');
  }

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return { step, stepIdx, total, isFirst, isLast, progress, dir,
           answers, answer, goNext, goBack, autoSelect, submit, status, reset };
}

// ─── Progress bar ─────────────────────────────────────────────────────────────

function ProgressBar({ progress, color }) {
  return (
    <div className="svc-prog">
      <div className="svc-prog__fill" style={{ width: progress + '%', background: color }} />
    </div>
  );
}

// ─── Confetti ─────────────────────────────────────────────────────────────────

const C_COLORS = ['#F8C495','#C7C2F0','#B8DBEC','#F8E45A','#163A2E','#F4A26B','#6BD08A'];

function Confetti() {
  const pieces = useMemo(() =>
    Array.from({ length: 32 }, (_, i) => ({
      id: i,
      x: 4 + (Math.random() * 92),
      y: 20 + (Math.random() * 55),
      w: 5 + (Math.random() * 9),
      h: 5 + (Math.random() * 12),
      color: C_COLORS[i % C_COLORS.length],
      round: Math.random() > 0.55,
      delay: (Math.random() * 0.5).toFixed(2),
      dur:   (0.75 + Math.random() * 0.6).toFixed(2),
      dy:    -(110 + Math.random() * 170),
      rot:   Math.round(Math.random() * 540),
    })),
  []);

  return (
    <div className="svc-confetti" aria-hidden="true">
      {pieces.map(p => (
        <div key={p.id} className="svc-confetti__bit" style={{
          left: p.x + '%', top: p.y + '%',
          width: p.w, height: p.h,
          background: p.color,
          borderRadius: p.round ? '50%' : '2px',
          animationDelay: p.delay + 's',
          animationDuration: p.dur + 's',
          '--dy': p.dy + 'px',
          '--rot': p.rot + 'deg',
        }} />
      ))}
    </div>
  );
}

// ─── Option buttons ───────────────────────────────────────────────────────────

function RadioOpt({ label, selected, onClick, accent }) {
  return (
    <button
      className={'svc-opt' + (selected ? ' is-sel' : '')}
      onClick={onClick}
      style={selected ? { borderColor: accent, background: accent + '28' } : {}}
    >
      <span
        className="svc-opt__radio"
        style={selected ? { background: accent, borderColor: accent } : {}}
      />
      {label}
    </button>
  );
}

function MultiOpt({ label, selected, onClick, accent }) {
  return (
    <button
      className={'svc-opt svc-opt--multi' + (selected ? ' is-sel' : '')}
      onClick={onClick}
      style={selected ? { borderColor: accent, background: accent + '28' } : {}}
    >
      <span
        className={'svc-opt__check' + (selected ? ' is-sel' : '')}
        style={selected ? { background: accent, borderColor: accent } : {}}
      >
        {selected && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4l3 3 5-6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </span>
      {label}
    </button>
  );
}

// ─── Question renderers ───────────────────────────────────────────────────────

function RadioQ({ step, answers, autoSelect, accent }) {
  const cur = answers[step.id];
  return (
    <div className="svc-q">
      <p className="svc-q__text">{step.q}</p>
      <div className="svc-opts">
        {step.opts.map(opt => (
          <RadioOpt key={opt} label={opt}
            selected={cur === opt}
            onClick={() => autoSelect(step.id, opt)}
            accent={accent}
          />
        ))}
      </div>
    </div>
  );
}

function MultiQ({ step, answers, answer, accent }) {
  const cur = answers[step.id] || [];
  function toggle(opt) {
    answer(step.id, cur.includes(opt) ? cur.filter(o => o !== opt) : [...cur, opt]);
  }
  return (
    <div className="svc-q">
      <p className="svc-q__text">{step.q}</p>
      <div className="svc-opts">
        {step.opts.map(opt => (
          <MultiOpt key={opt} label={opt}
            selected={cur.includes(opt)}
            onClick={() => toggle(opt)}
            accent={accent}
          />
        ))}
      </div>
    </div>
  );
}

function NumberQ({ step, answers, answer, accent }) {
  return (
    <div className="svc-q">
      <p className="svc-q__text">{step.q}</p>
      <input
        className="svc-num"
        type="number" min="1"
        placeholder={step.placeholder}
        value={answers[step.id] || ''}
        onChange={e => answer(step.id, e.target.value)}
        style={{ '--a': accent }}
      />
    </div>
  );
}

function ContactQ({ step, onSubmit, submitting, accent }) {
  const [name,  setName]  = useState('');
  const [email, setEmail] = useState('');
  const [msg,   setMsg]   = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (name.trim() && email.trim()) onSubmit({ name, email, message: msg });
  }

  return (
    <div className="svc-q">
      <p className="svc-q__text">{step.q}</p>
      <form className="svc-contact" onSubmit={handleSubmit}>
        <div className="svc-field-row">
          <input className="svc-field" type="text"  placeholder="Your name"     value={name}  onChange={e => setName(e.target.value)}  required />
          <input className="svc-field" type="email" placeholder="Email address"  value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <textarea className="svc-field svc-field--ta" placeholder="Anything else? (optional)" value={msg} onChange={e => setMsg(e.target.value)} rows={3} />
        <button type="submit" className="svc-submit" style={{ background: accent }} disabled={submitting}>
          {submitting
            ? <><span className="svc-spin" /> Sending…</>
            : <>Send it <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h9M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg></>
          }
        </button>
      </form>
    </div>
  );
}

function QuestionContent({ step, answers, autoSelect, answer, onSubmit, submitting, accent }) {
  if (step.type === 'radio')   return <RadioQ   step={step} answers={answers} autoSelect={autoSelect} accent={accent} />;
  if (step.type === 'multi')   return <MultiQ   step={step} answers={answers} answer={answer}         accent={accent} />;
  if (step.type === 'number')  return <NumberQ  step={step} answers={answers} answer={answer}         accent={accent} />;
  if (step.type === 'contact') return <ContactQ step={step} onSubmit={onSubmit} submitting={submitting} accent={accent} />;
  return null;
}

// ─── Success state ────────────────────────────────────────────────────────────

function SuccessState({ onReset, accent }) {
  return (
    <div className="svc-success">
      <Confetti />
      <div className="svc-success__inner">
        <div className="svc-success__ring" style={{ borderColor: accent }}>
          <svg width="30" height="24" viewBox="0 0 30 24" fill="none">
            <path className="svc-check-path" d="M2 12L11 21L28 3"
              stroke={accent} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 className="svc-success__title">You're in!</h3>
        <p className="svc-success__sub">I'll be in touch shortly. Looking forward to working together.</p>
        <button className="svc-success__reset" onClick={onReset}>Send another →</button>
      </div>
    </div>
  );
}

// ─── Animated step wrapper ────────────────────────────────────────────────────
// Key-based remount triggers CSS enter animation; direction sets which variant.

function AnimStep({ children, stepKey, dir }) {
  return (
    <div key={stepKey} className={'svc-step svc-step--' + (dir > 0 ? 'fwd' : 'bwd')}>
      {children}
    </div>
  );
}

// ─── Form panel ───────────────────────────────────────────────────────────────

function FormPanel({ title, allQs, accent, onClose }) {
  const {
    step, stepIdx, total, isFirst, progress, dir,
    answers, answer, goNext, goBack, autoSelect, submit, status, reset,
  } = useMultiForm(allQs);

  const isContact        = step && step.type === 'contact';
  const isMultiOrNumber  = step && (step.type === 'multi' || step.type === 'number');
  const canNext = (() => {
    if (!step) return false;
    if (step.type === 'multi' && !step.optional) {
      const v = answers[step.id];
      return Array.isArray(v) && v.length > 0;
    }
    if (step.type === 'number') return !!answers[step.id];
    return false;
  })();

  if (status === 'done') {
    return (
      <div className="svc-form svc-form--success">
        <SuccessState onReset={reset} accent={accent} />
      </div>
    );
  }

  return (
    <div className="svc-form">
      {/* Header */}
      <div className="svc-form__head">
        <span className="svc-form__title">{title}</span>
        <button className="svc-form__close" onClick={onClose} aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Progress */}
      <ProgressBar progress={progress} color={accent} />
      <div className="svc-form__counter">
        <span style={{ opacity: 1 }}>{stepIdx + 1}</span>
        <span style={{ opacity: 0.35 }}> / {total}</span>
      </div>

      {/* Animated question body */}
      <div className="svc-form__body">
        <AnimStep stepKey={step ? step.id + stepIdx : 'q'} dir={dir}>
          {step && (
            <QuestionContent
              step={step} answers={answers}
              autoSelect={autoSelect} answer={answer}
              onSubmit={submit} submitting={status === 'submitting'}
              accent={accent}
            />
          )}
        </AnimStep>
      </div>

      {/* Nav (not shown for contact — it has its own submit) */}
      {!isContact && (
        <div className="svc-form__nav">
          <button
            className="svc-form__back"
            onClick={goBack}
            style={{ visibility: isFirst ? 'hidden' : 'visible' }}
          >
            ← Back
          </button>
          {isMultiOrNumber && (
            <button
              className="svc-form__next"
              style={{ background: accent, opacity: (canNext || step.optional) ? 1 : 0.4 }}
              onClick={goNext}
              disabled={!canNext && !step.optional}
            >
              Next →
            </button>
          )}
        </div>
      )}
      {isContact && (
        <div className="svc-form__nav">
          <button className="svc-form__back" onClick={goBack}
            style={{ visibility: isFirst ? 'hidden' : 'visible' }}>
            ← Back
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Default card face ────────────────────────────────────────────────────────

function CardFace({ title, services, accent, onOpen }) {
  return (
    <div className="svc-card__face">
      <div className="svc-card__face-top">
        <span className="svc-card__tag">
          <span className="svc-card__tag-dot" style={{ background: accent }} />
          Services
        </span>
        <h3 className="svc-card__title">{title}</h3>
      </div>
      <ul className="svc-card__list">
        {services.map(s => (
          <li key={s} className="svc-card__item">
            <span className="svc-card__item-dot" style={{ background: accent }} />
            {s}
          </li>
        ))}
      </ul>
      <button className="svc-cta" style={{ background: accent }} onClick={onOpen}>
        Start a project
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 7h7M7 4l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}

// ─── Service card (handles morph) ─────────────────────────────────────────────

function ServiceCard({ id, title, services, allQs, accent, isOpen, isDimmed, onOpen, onClose }) {
  // Escape key to close
  useEffect(() => {
    if (!isOpen) return;
    function onKey(e) { if (e.key === 'Escape') onClose(); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  // Cross-fade between card face and form panel
  const [showing, setShowing] = useState(isOpen ? 'form' : 'card');
  const [fadeIn, setFadeIn]   = useState(true);
  const fadeTimer = useRef(null);

  useEffect(() => {
    const next = isOpen ? 'form' : 'card';
    if (showing === next) return;

    setFadeIn(false);
    clearTimeout(fadeTimer.current);
    fadeTimer.current = setTimeout(() => {
      setShowing(next);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setFadeIn(true));
      });
    }, 180);
    return () => clearTimeout(fadeTimer.current);
  }, [isOpen]);

  return (
    <div className={[
      'svc-card',
      isOpen   ? 'is-open'   : '',
      isDimmed ? 'is-dimmed' : '',
    ].join(' ')}>
      <div className="svc-card__inner" style={{ opacity: fadeIn ? 1 : 0 }}>
        {showing === 'card'
          ? <CardFace title={title} services={services} accent={accent} onOpen={onOpen} />
          : <FormPanel title={title} allQs={allQs} accent={accent} onClose={onClose} />
        }
      </div>
    </div>
  );
}

// ─── Booking card ─────────────────────────────────────────────────────────────

function BookingCard() {
  return (
    <div className="svc-book">
      <div className="svc-book__left">
        <span className="svc-book__dot" />
        <div>
          <p className="svc-book__title">Ready to get started?</p>
          <p className="svc-book__sub">Book a 30-min discovery call — no obligations, just a conversation.</p>
        </div>
      </div>
      <button
        className="svc-book__btn"
        data-cal-link="ahmad-majid-7sgoyt/30min"
        data-cal-namespace="30min"
        data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
      >
        Book a call
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 7h7M7 4l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}

// ─── Services section ─────────────────────────────────────────────────────────

function ServicesSection() {
  const [open, setOpen] = useState(null); // null | 'web' | 'product'

  return (
    <section className="svc-section">
      <div className="svc-header">
        <span className="svc-eyebrow">
          <span className="svc-eyebrow__dot" />
          Work with me
        </span>
        <h2 className="svc-heading">Services</h2>
        <p className="svc-sub">Pick a card. Tell me what you need. I'll handle the rest.</p>
      </div>

      {/* Outer shell card */}
      <div className="svc-shell">

        {/* Top row: two service cards */}
        <div className="svc-top">
          <ServiceCard
            id="web"
            title="Web Design & Build"
            services={['Web Design','Low-code Web Development','Web Analytics','Integrations & Automation','Email Marketing Setup']}
            allQs={WEB_QS}
            accent="#F8C495"
            isOpen={open === 'web'}
            isDimmed={open !== null && open !== 'web'}
            onOpen={() => setOpen('web')}
            onClose={() => setOpen(null)}
          />
          <ServiceCard
            id="product"
            title="Product Design"
            services={['UX Architecture','Product Design','UX Research','Product Analytics']}
            allQs={PRODUCT_QS}
            accent="#C7C2F0"
            isOpen={open === 'product'}
            isDimmed={open !== null && open !== 'product'}
            onOpen={() => setOpen('product')}
            onClose={() => setOpen(null)}
          />
        </div>

        {/* Bottom: purple booking card */}
        <BookingCard />

      </div>
    </section>
  );
}

// ─── CSS ──────────────────────────────────────────────────────────────────────

const svcCss = `
/* ── Section wrapper ──────────────────────────────────── */
.svc-section {
  max-width: 1320px; margin: 0 auto;
  padding: clamp(80px,10vw,140px) clamp(28px,5vw,72px);
}
.svc-header { margin-bottom: 40px; }
.svc-eyebrow {
  display: inline-flex; align-items: center; gap: 10px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px; letter-spacing: .08em; text-transform: uppercase;
  color: var(--ink); opacity: .5;
}
.svc-eyebrow__dot {
  width: 8px; height: 8px; border-radius: 999px;
  background: var(--sun, #F8E45A);
}
.svc-heading {
  margin: 14px 0 0;
  font-family: 'Newsreader', Georgia, serif;
  font-weight: 800; letter-spacing: -0.035em; line-height: 0.95;
  font-size: clamp(48px,7vw,100px); color: var(--ink);
}
.svc-sub {
  margin: 12px 0 0;
  font-size: clamp(15px,1.2vw,18px); font-weight: 500;
  color: var(--ink); opacity: .6; max-width: 44ch;
}

/* ── Outer shell card ─────────────────────────────────── */
.svc-shell {
  background: var(--hero-bg, #F6EFE0);
  border: 1px solid rgba(22,58,46,.1);
  border-radius: 28px;
  padding: 10px;
  display: flex; flex-direction: column; gap: 8px;
  box-shadow: 0 2px 32px rgba(22,58,46,.06);
}

/* ── Top row (two service cards) ──────────────────────── */
.svc-top {
  display: flex; gap: 8px; align-items: flex-start;
}

/* ── Individual service card ──────────────────────────── */
.svc-card {
  flex: 1 1 0%; min-width: 0;
  background: #FDFAF5;
  border: 1px solid rgba(22,58,46,.07);
  border-radius: 20px; overflow: hidden;
  transition:
    flex-grow  .55s cubic-bezier(.22,1,.36,1),
    opacity    .38s cubic-bezier(.22,1,.36,1),
    transform  .42s cubic-bezier(.22,1,.36,1);
}
.svc-card.is-open   { flex-grow: 2.6; }
.svc-card.is-dimmed { flex-grow: .55; opacity: .22; transform: scale(.97); pointer-events: none; }
.svc-card__inner    { transition: opacity .18s ease; }

/* Default card face */
.svc-card__face {
  padding: 32px; display: flex; flex-direction: column; min-height: 480px;
}
.svc-card__face-top { flex-shrink: 0; }
.svc-card__tag {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px; letter-spacing: .08em; text-transform: uppercase;
  color: var(--ink); opacity: .4;
}
.svc-card__tag-dot { width: 6px; height: 6px; border-radius: 999px; }
.svc-card__title {
  margin: 12px 0 0;
  font-family: 'Newsreader', Georgia, serif;
  font-weight: 700; letter-spacing: -0.025em; line-height: 1.1;
  font-size: clamp(22px, 2vw, 34px); color: var(--ink);
}
.svc-card__list {
  list-style: none; margin: 24px 0 0; padding: 0;
  display: flex; flex-direction: column; gap: 11px; flex: 1;
}
.svc-card__item {
  display: flex; align-items: center; gap: 10px;
  font-size: 14px; font-weight: 500; color: var(--ink); opacity: .65;
}
.svc-card__item-dot { width: 5px; height: 5px; border-radius: 999px; flex-shrink: 0; opacity: .8; }
.svc-cta {
  margin-top: 28px; align-self: flex-start;
  display: inline-flex; align-items: center; gap: 8px;
  color: var(--ink); border: none; cursor: pointer; font: inherit;
  font-size: 14px; font-weight: 600; letter-spacing: -0.01em;
  padding: 12px 18px; border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0,0,0,.1);
  transition: transform .2s ease, box-shadow .2s ease;
}
.svc-cta:hover  { transform: translateY(-2px); box-shadow: 0 7px 18px rgba(0,0,0,.13); }
.svc-cta:active { transform: scale(.96); }

/* ── Purple booking card ──────────────────────────────── */
.svc-book {
  background: linear-gradient(118deg, #2E2070 0%, #4A339A 100%);
  border-radius: 20px;
  padding: 26px 32px;
  display: flex; align-items: center;
  justify-content: space-between; gap: 24px;
  flex-wrap: wrap;
}
.svc-book__left {
  display: flex; align-items: center; gap: 16px;
}
.svc-book__dot {
  width: 10px; height: 10px; border-radius: 999px;
  background: #6BD08A;
  box-shadow: 0 0 0 3px rgba(107,208,138,.28);
  flex-shrink: 0;
  animation: svcBookDot 2.4s ease-in-out infinite;
}
@keyframes svcBookDot { 0%,100%{opacity:1} 50%{opacity:.5} }
.svc-book__title {
  margin: 0;
  font-family: 'Newsreader', Georgia, serif;
  font-weight: 700; font-size: clamp(18px,1.6vw,24px);
  letter-spacing: -0.02em; color: #F4ECDC;
}
.svc-book__sub {
  margin: 4px 0 0;
  font-size: 14px; font-weight: 500;
  color: rgba(244,236,220,.55);
}
.svc-book__btn {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(244,236,220,.12);
  border: 1px solid rgba(244,236,220,.22);
  color: #F4ECDC;
  cursor: pointer; font: inherit;
  font-size: 14px; font-weight: 600; letter-spacing: -0.01em;
  padding: 12px 20px; border-radius: 10px; flex-shrink: 0;
  transition: background .18s ease, transform .18s ease;
  backdrop-filter: blur(8px);
}
.svc-book__btn:hover  { background: rgba(244,236,220,.22); transform: translateY(-1px); }
.svc-book__btn:active { transform: scale(.96); }

/* ── Form panel ───────────────────────────────────────── */
.svc-form {
  display: flex; flex-direction: column; min-height: 480px;
}
.svc-form--success { min-height: 480px; }
.svc-form__head {
  display: flex; align-items: center; justify-content: space-between;
  padding: 24px 28px 16px; flex-shrink: 0;
}
.svc-form__title {
  font-family: 'Newsreader', Georgia, serif;
  font-weight: 700; font-size: 18px; letter-spacing: -0.02em;
  color: var(--ink);
}
.svc-form__close {
  width: 30px; height: 30px; border-radius: 999px;
  background: rgba(22,58,46,.08); border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  color: var(--ink); flex-shrink: 0; transition: background .15s ease;
}
.svc-form__close:hover { background: rgba(22,58,46,.16); }

/* Progress */
.svc-prog {
  height: 2px; background: rgba(22,58,46,.08);
  margin: 0 28px; border-radius: 999px; overflow: hidden; flex-shrink: 0;
}
.svc-prog__fill {
  height: 100%; border-radius: 999px;
  transition: width .45s cubic-bezier(.22,1,.36,1);
}
.svc-form__counter {
  padding: 9px 28px 0;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px; letter-spacing: .05em; color: var(--ink);
  flex-shrink: 0;
}

/* Body */
.svc-form__body {
  flex: 1; padding: 2px 28px 0; overflow: hidden; position: relative;
}

/* Step enter animations */
.svc-step { width: 100%; }
.svc-step--fwd { animation: svcStepFwd .25s cubic-bezier(.22,1,.36,1) both; }
.svc-step--bwd { animation: svcStepBwd .25s cubic-bezier(.22,1,.36,1) both; }
@keyframes svcStepFwd { from { opacity: 0; transform: translateX(28px); } }
@keyframes svcStepBwd { from { opacity: 0; transform: translateX(-28px); } }

/* Nav */
.svc-form__nav {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 28px 24px; gap: 12px; flex-shrink: 0;
}
.svc-form__back {
  background: none; border: none; cursor: pointer;
  font: inherit; font-size: 13px; font-weight: 500;
  color: var(--ink); opacity: .45; padding: 8px 0;
  transition: opacity .15s ease;
}
.svc-form__back:hover { opacity: .8; }
.svc-form__next {
  display: inline-flex; align-items: center; gap: 6px;
  border: none; cursor: pointer; font: inherit;
  font-size: 14px; font-weight: 600;
  color: var(--ink); padding: 11px 20px; border-radius: 8px;
  transition: opacity .15s ease;
}
.svc-form__next:disabled { cursor: default; }
.svc-form__next:active   { transform: scale(.96); }

/* Questions */
.svc-q { padding-top: 16px; }
.svc-q__text {
  margin: 0 0 18px;
  font-size: clamp(16px,1.4vw,21px); font-weight: 700;
  letter-spacing: -0.02em; line-height: 1.25; color: var(--ink);
}
.svc-opts { display: flex; flex-direction: column; gap: 8px; }

/* Option */
.svc-opt {
  display: flex; align-items: center; gap: 12px;
  background: rgba(22,58,46,.035);
  border: 1.5px solid rgba(22,58,46,.09);
  border-radius: 11px; padding: 11px 14px;
  cursor: pointer; font: inherit;
  font-size: 14px; font-weight: 500;
  color: var(--ink); text-align: left;
  transition: border-color .15s ease, background .15s ease;
}
.svc-opt:hover:not(.is-sel) {
  border-color: rgba(22,58,46,.2); background: rgba(22,58,46,.065);
}
.svc-opt.is-sel { animation: optBounce .38s cubic-bezier(.34,1.56,.64,1) both; }
.svc-opt:active { transform: scale(.96); }
@keyframes optBounce { 0%{transform:scale(1)} 45%{transform:scale(1.03)} 100%{transform:scale(1)} }

.svc-opt__radio {
  width: 7px; height: 7px; border-radius: 999px;
  border: 1.5px solid rgba(22,58,46,.25); flex-shrink: 0;
  transition: background .15s ease, border-color .15s ease;
}
.svc-opt__check {
  width: 17px; height: 17px; border-radius: 5px;
  border: 1.5px solid rgba(22,58,46,.2); flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  transition: background .15s ease, border-color .15s ease;
}

/* Number input */
.svc-num {
  display: block; margin-top: 4px;
  width: 100%; max-width: 160px;
  font: inherit; font-size: 26px; font-weight: 700; color: var(--ink);
  background: rgba(22,58,46,.04);
  border: 1.5px solid rgba(22,58,46,.12);
  border-radius: 11px; padding: 12px 16px; outline: none;
  transition: border-color .15s ease;
}
.svc-num:focus { border-color: rgba(22,58,46,.35); }
.svc-num::-webkit-outer-spin-button,
.svc-num::-webkit-inner-spin-button { -webkit-appearance: none; }

/* Contact */
.svc-contact { display: flex; flex-direction: column; gap: 9px; }
.svc-field-row { display: flex; gap: 9px; }
.svc-field {
  flex: 1; font: inherit; font-size: 14px; color: var(--ink);
  background: rgba(22,58,46,.04);
  border: 1.5px solid rgba(22,58,46,.12);
  border-radius: 9px; padding: 11px 13px; outline: none;
  transition: border-color .15s ease;
}
.svc-field:focus   { border-color: rgba(22,58,46,.35); }
.svc-field--ta     { resize: vertical; min-height: 76px; }
.svc-field::placeholder { color: var(--ink); opacity: .28; }
.svc-submit {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  border: none; cursor: pointer; font: inherit;
  font-size: 14px; font-weight: 600; color: var(--ink);
  padding: 12px 20px; border-radius: 9px;
  margin-top: 4px; align-self: flex-start;
  transition: opacity .15s ease, transform .15s ease;
}
.svc-submit:hover    { transform: translateY(-1px); }
.svc-submit:active   { transform: scale(.97); }
.svc-submit:disabled { opacity: .6; cursor: wait; }
.svc-spin {
  width: 14px; height: 14px; border-radius: 999px;
  border: 2px solid rgba(22,58,46,.2); border-top-color: var(--ink);
  animation: svcSpin .55s linear infinite;
}
@keyframes svcSpin { to { transform: rotate(360deg); } }

/* ── Success ──────────────────────────────────────────── */
.svc-success {
  flex: 1; display: flex; align-items: center; justify-content: center;
  position: relative; overflow: hidden; padding: 40px 28px; min-height: 420px;
}
.svc-success__inner {
  display: flex; flex-direction: column; align-items: center;
  text-align: center; gap: 10px; position: relative; z-index: 1;
  animation: svcFadeUp .5s cubic-bezier(.22,1,.36,1) both;
}
@keyframes svcFadeUp { from { opacity: 0; transform: translateY(12px); } }
.svc-success__ring {
  width: 64px; height: 64px; border-radius: 999px;
  border: 2px solid; display: flex; align-items: center; justify-content: center;
  margin-bottom: 6px;
  animation: svcRingPop .45s cubic-bezier(.34,1.56,.64,1) both;
}
@keyframes svcRingPop { from { transform: scale(.6); opacity: 0; } }
.svc-check-path {
  stroke-dasharray: 52; stroke-dashoffset: 52;
  animation: svcCheckDraw .45s cubic-bezier(.22,1,.36,1) .18s forwards;
}
@keyframes svcCheckDraw { to { stroke-dashoffset: 0; } }
.svc-success__title {
  margin: 0; font-family: 'Newsreader', Georgia, serif;
  font-weight: 700; font-size: 30px; letter-spacing: -0.025em; color: var(--ink);
}
.svc-success__sub {
  margin: 2px 0 0; font-size: 14px; font-weight: 500;
  color: var(--ink); opacity: .6; max-width: 28ch;
}
.svc-success__reset {
  margin-top: 10px; background: none; border: none; cursor: pointer;
  font: inherit; font-size: 13px; font-weight: 600;
  color: var(--ink); opacity: .4; transition: opacity .15s ease;
}
.svc-success__reset:hover { opacity: .85; }

/* Confetti */
.svc-confetti { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.svc-confetti__bit { position: absolute; animation: svcConfetti linear forwards; }
@keyframes svcConfetti {
  0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(var(--dy,-200px)) rotate(var(--rot,360deg)); opacity: 0; }
}

/* ── Mobile ───────────────────────────────────────────── */
@media (max-width: 720px) {
  .svc-shell { padding: 8px; gap: 6px; }
  .svc-top   { flex-direction: column; }
  .svc-card.is-dimmed { display: none; }
  .svc-card.is-open   { flex-grow: 1; }
  .svc-book  { flex-direction: column; align-items: flex-start; gap: 16px; }
  .svc-field-row { flex-direction: column; }
}
`;

const _svcStyle = document.createElement('style');
_svcStyle.textContent = svcCss;
document.head.appendChild(_svcStyle);

window.ServicesSection = ServicesSection;
