/* global React */
const { useState: useLMSt, useEffect: useLMEf, useRef: useLMRf } = React;

const LM_KEY   = 'lm_seen';
const TRIGGER_MS = 10000; // 10 seconds

function LeadMagnetPopup() {
  const [open,    setOpen]    = useLMSt(false);
  const [closing, setClosing] = useLMSt(false);
  const [name,    setName]    = useLMSt('');
  const [email,   setEmail]   = useLMSt('');
  const [errors,  setErrors]  = useLMSt({});
  const [done,    setDone]    = useLMSt(false);
  const [shaking, setShaking] = useLMSt(false);

  // ── Trigger ────────────────────────────────────────────────────────────────
  useLMEf(() => {
    if (localStorage.getItem(LM_KEY)) return;
    const t = setTimeout(() => {
      if (!localStorage.getItem(LM_KEY)) setOpen(true);
    }, TRIGGER_MS);
    return () => clearTimeout(t);
  }, []);

  // ── Dismiss (X, overlay click, or after success) ───────────────────────────
  function dismiss() {
    localStorage.setItem(LM_KEY, '1');
    setClosing(true);
    setTimeout(() => setOpen(false), 420);
  }

  // ── Shake helper ───────────────────────────────────────────────────────────
  function shake() {
    setShaking(true);
    setTimeout(() => setShaking(false), 520);
  }

  // ── Form submit ────────────────────────────────────────────────────────────
  function handleSubmit(e) {
    e.preventDefault();
    const errs = {};
    if (!name.trim())                                   errs.name  = 'What should I call you?';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errs.email = 'Need a real email address';
    if (Object.keys(errs).length) { setErrors(errs); shake(); return; }
    setErrors({});

    // Trigger download
    const a = document.createElement('a');
    a.href     = 'documents/heuristic-audit-workbook.docx';
    a.download = 'UX-Heuristic-Audit-Workbook.docx';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    localStorage.setItem(LM_KEY, '1');
    setDone(true);
    setTimeout(dismiss, 2800);
  }

  if (!open) return null;

  const cardCls = [
    'lm-card',
    closing  ? 'is-out'   : '',
    shaking  ? 'is-shake' : '',
    done     ? 'is-done'  : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={'lm-overlay' + (closing ? ' is-out' : '')}
      onClick={e => { if (e.target === e.currentTarget) dismiss(); }}
    >
      <div className={cardCls}>

        {/* Close */}
        <button className="lm-x" onClick={dismiss} aria-label="Close">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M1 1l9 9M10 1l-9 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Sun sticker badge */}
        <div className="lm-sticker">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M5.5.5l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" fill="currentColor"/>
          </svg>
          Free
        </div>

        {/* Floating icon block */}
        <div className={'lm-icon-wrap' + (done ? ' is-done' : '')}>
          {done ? (
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
              <path d="M5.5 15l7 7 12-12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="30" height="36" viewBox="0 0 30 36" fill="none">
              <rect x="1" y="1" width="22" height="30" rx="3.5" fill="rgba(22,58,46,.1)" stroke="rgba(22,58,46,.22)" strokeWidth="1.4"/>
              <path d="M23 1l6 6h-6V1z" fill="rgba(22,58,46,.15)"/>
              <path d="M23 1v6h6" stroke="rgba(22,58,46,.22)" strokeWidth="1.4" strokeLinejoin="round" fill="none"/>
              <path d="M6 12h12M6 17h12M6 22h8" stroke="rgba(22,58,46,.28)" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          )}
        </div>

        {/* Copy */}
        {done ? (
          <div className="lm-success-body">
            <h2 className="lm-title">Check your downloads.</h2>
            <p className="lm-desc">Your audit workbook is on its way. Use it on something real.</p>
          </div>
        ) : (
          <>
            <h2 className="lm-title">Free UX Audit Workbook</h2>
            <p className="lm-desc">
              The exact template I use to audit any interface — 10&nbsp;heuristics,
              scored and documented. Usually $0. Still&nbsp;$0.
            </p>

            <form className="lm-form" onSubmit={handleSubmit} noValidate>
              <div className="lm-field">
                <input
                  className={'lm-input' + (errors.name ? ' is-err' : '')}
                  type="text"
                  placeholder="First name"
                  value={name}
                  autoComplete="given-name"
                  onChange={e => { setName(e.target.value); setErrors(v => ({...v, name: ''})); }}
                />
                {errors.name && <span className="lm-field-err">{errors.name}</span>}
              </div>

              <div className="lm-field">
                <input
                  className={'lm-input' + (errors.email ? ' is-err' : '')}
                  type="email"
                  placeholder="Work email"
                  value={email}
                  autoComplete="email"
                  onChange={e => { setEmail(e.target.value); setErrors(v => ({...v, email: ''})); }}
                />
                {errors.email && <span className="lm-field-err">{errors.email}</span>}
              </div>

              <button type="submit" className="lm-btn">
                Download free copy
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M7.5 2v8M4.5 8l3 3 3-3M2.5 13h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <p className="lm-fine">No spam. No pitch deck. Just the template.</p>
            </form>
          </>
        )}

      </div>
    </div>
  );
}

/* ── Styles ──────────────────────────────────────────────────────────────────── */
const lmCss = `
/* Overlay */
.lm-overlay {
  position: fixed; inset: 0; z-index: 400;
  background: rgba(21,20,15,.74);
  backdrop-filter: blur(18px) saturate(.65);
  -webkit-backdrop-filter: blur(18px) saturate(.65);
  display: flex; align-items: center; justify-content: center;
  padding: clamp(20px, 5vw, 40px);
  animation: lmOverlayIn .32s ease both;
}
.lm-overlay.is-out { animation: lmOverlayOut .38s ease both; }
@keyframes lmOverlayIn  { from { opacity: 0; } }
@keyframes lmOverlayOut { to   { opacity: 0; } }

/* Card */
.lm-card {
  background: var(--hero-bg);
  border-radius: 30px;
  border: 1px solid rgba(0,0,0,.055);
  box-shadow:
    0 1px 0 rgba(255,255,255,.65) inset,
    0 30px 68px -24px rgba(20,40,30,.58),
    0 4px 16px rgba(20,40,30,.08);
  padding: 48px 44px 36px;
  max-width: 420px; width: 100%;
  text-align: center; position: relative;
  animation: lmCardIn .58s cubic-bezier(.2,.8,.2,1) both;
  overflow: visible;
}
/* Warm radial glow in the icon zone */
.lm-card::before {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0; height: 180px;
  background: radial-gradient(ellipse at 50% -10%, rgba(248,196,149,.22), transparent 72%);
  border-radius: 30px 30px 0 0;
  pointer-events: none;
}
@keyframes lmCardIn {
  0%  { opacity: 0; transform: translateY(36px) scale(.92); }
  68% { transform: translateY(-5px) scale(1.015); }
  to  { opacity: 1; transform: translateY(0) scale(1); }
}
.lm-card.is-out   { animation: lmCardOut  .38s cubic-bezier(.2,.8,.2,1) both; }
.lm-card.is-shake { animation: lmShake    .44s cubic-bezier(.36,.07,.19,.97) both; }
.lm-card.is-done  { animation: none; }
@keyframes lmCardOut {
  to { opacity: 0; transform: scale(.94) translateY(14px); }
}
@keyframes lmShake {
  0%,100% { transform: translateX(0); }
  14%  { transform: translateX(-9px) rotate(-.4deg); }
  28%  { transform: translateX(9px)  rotate(.4deg); }
  42%  { transform: translateX(-7px) rotate(-.3deg); }
  57%  { transform: translateX(7px)  rotate(.3deg); }
  75%  { transform: translateX(-3px); }
}

/* Close button */
.lm-x {
  position: absolute; top: 16px; right: 16px;
  width: 30px; height: 30px; border-radius: 999px;
  background: rgba(20,40,30,.07); border: 0; cursor: pointer;
  display: grid; place-items: center; color: var(--ink); opacity: .45;
  transition: opacity .2s, background .2s;
  z-index: 2;
}
.lm-x:hover { opacity: 1; background: rgba(20,40,30,.13); }

/* Sticker badge */
.lm-sticker {
  position: absolute;
  top: -12px; right: 22px;
  background: var(--sun);
  color: var(--pill-dark);
  font-size: 12px; font-weight: 800;
  padding: 6px 13px 6px 10px;
  border-radius: 6px;
  display: inline-flex; align-items: center; gap: 6px;
  transform: rotate(8deg);
  box-shadow:
    0 6px 18px rgba(248,228,90,.55),
    0 1px 0 rgba(255,255,255,.6) inset;
  letter-spacing: -0.01em;
  animation: lmStickerIn .55s .18s cubic-bezier(.2,.8,.2,1) both;
  z-index: 3;
}
.lm-sticker::before {
  content: "";
  position: absolute; inset: 4px;
  border: 1px dashed rgba(0,0,0,.2);
  border-radius: 3px; pointer-events: none;
}
.lm-sticker:hover { transform: rotate(2deg) scale(1.05); transition: transform .2s; }
@keyframes lmStickerIn {
  from { opacity: 0; transform: rotate(8deg) scale(.3) translateY(12px); }
}

/* Floating document icon */
.lm-icon-wrap {
  width: 72px; height: 72px; border-radius: 22px;
  background: var(--peach);
  display: grid; place-items: center;
  margin: 0 auto 22px;
  position: relative; z-index: 1;
  box-shadow:
    0 1px 0 rgba(255,255,255,.55) inset,
    0 12px 30px rgba(248,196,149,.6);
  animation: lmIconFloat 3.6s ease-in-out infinite;
  transition: background .45s ease, box-shadow .45s ease;
}
.lm-icon-wrap.is-done {
  background: #6BD08A;
  box-shadow: 0 1px 0 rgba(255,255,255,.55) inset, 0 12px 30px rgba(107,208,138,.55);
  animation: none;
}
@keyframes lmIconFloat {
  0%, 100% { transform: translateY(0px); }
  50%      { transform: translateY(-6px); }
}

/* Title + desc */
.lm-title {
  margin: 0 0 10px;
  font-family: 'Newsreader', Georgia, serif;
  font-weight: 800; font-size: clamp(22px, 3vw, 28px);
  letter-spacing: -0.03em; line-height: 1.1;
  color: var(--ink);
}
.lm-desc {
  margin: 0 auto 26px;
  font-size: 14.5px; line-height: 1.62; font-weight: 500;
  color: var(--ink); opacity: .6;
  max-width: 30ch;
}

/* Form */
.lm-form  { display: flex; flex-direction: column; }
.lm-field { display: flex; flex-direction: column; margin-bottom: 9px; }
.lm-input {
  display: block; width: 100%; padding: 13px 16px;
  background: rgba(22,58,46,.05);
  border: 1.5px solid rgba(20,40,30,.13);
  border-radius: 10px;
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  font-size: 15px; font-weight: 500; color: var(--ink);
  text-align: left; outline: none;
  transition: border-color .18s, box-shadow .18s, background .18s;
  -webkit-appearance: none; appearance: none;
}
.lm-input::placeholder { font-weight: 500; opacity: .35; }
.lm-input:focus {
  border-color: rgba(22,58,46,.46);
  box-shadow: 0 0 0 3px rgba(22,58,46,.09);
  background: rgba(22,58,46,.03);
}
.lm-input.is-err {
  border-color: #D95040;
  box-shadow: 0 0 0 3px rgba(217,80,64,.1);
  background: rgba(217,80,64,.03);
}
.lm-field-err {
  display: block;
  font-size: 11.5px; font-weight: 600; letter-spacing: 0;
  color: #D95040;
  font-family: 'JetBrains Mono', monospace;
  text-align: left;
  margin: 5px 2px 0;
}

/* CTA button */
.lm-btn {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  width: 100%; padding: 14px 20px; margin-top: 4px;
  background: var(--pill-dark); color: #F4ECDC;
  border: 0; border-radius: 10px; cursor: pointer;
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  font-size: 15px; font-weight: 700; letter-spacing: -0.01em;
  box-shadow: 0 1px 0 rgba(255,255,255,.07) inset, 0 6px 20px rgba(0,0,0,.28);
  transition: transform .2s ease, gap .2s ease, box-shadow .2s ease;
}
.lm-btn:hover {
  transform: translateY(-2px);
  gap: 13px;
  box-shadow: 0 1px 0 rgba(255,255,255,.07) inset, 0 12px 28px rgba(0,0,0,.32);
}
.lm-btn:active { transform: none; }

/* Fine print */
.lm-fine {
  margin: 12px 0 0;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px; letter-spacing: .06em; text-transform: uppercase;
  color: var(--ink); opacity: .28;
  text-align: center;
}

/* Success state */
.lm-success-body { animation: lmSuccessIn .42s cubic-bezier(.2,.8,.2,1) both; }
@keyframes lmSuccessIn { from { opacity: 0; transform: translateY(10px); } }
.lm-success-body .lm-desc { margin-bottom: 0; }

/* Mobile */
@media (max-width: 480px) {
  .lm-card   { padding: 40px 26px 28px; }
  .lm-sticker { right: 18px; }
}
`;

const __lmEl = document.createElement('style');
__lmEl.textContent = lmCss;
document.head.appendChild(__lmEl);

window.LeadMagnetPopup = LeadMagnetPopup;
