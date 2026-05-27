/**
 * loader.js — Page transition overlay
 * Covers the screen immediately on load, then sweeps up to reveal content.
 * Plain JS, no React/Babel needed. Include as first <script> inside <body>.
 */
(function () {
  'use strict';

  /* ─── Styles ─────────────────────────────────────── */
  var css = [
    '#page-loader {',
    '  position: fixed; inset: 0; z-index: 9999;',
    '  background: #EFE6D6;',
    '  display: flex; flex-direction: column;',
    '  align-items: center; justify-content: center;',
    '  gap: 0;',
    '  will-change: transform;',
    '  pointer-events: all;',
    '}',

    /* Logo entrance */
    '#page-loader .pl-logo {',
    '  height: 68px; width: auto; display: block;',
    '  opacity: 0;',
    '  transform: scale(0.82) translateY(10px);',
    '  animation: pl-logo-in 0.52s cubic-bezier(.22,1,.36,1) 0.06s forwards;',
    '}',
    '@keyframes pl-logo-in {',
    '  to { opacity: 1; transform: scale(1) translateY(0); }',
    '}',

    /* Progress bar under logo */
    '#page-loader .pl-track {',
    '  position: absolute; bottom: 0; left: 0; right: 0;',
    '  height: 2px; overflow: hidden;',
    '}',
    '#page-loader .pl-bar {',
    '  height: 100%;',
    '  background: rgba(22,58,46,0.18);',
    '  transform-origin: left;',
    '  animation: pl-bar-in 1.6s cubic-bezier(.22,1,.36,1) 0.1s forwards;',
    '  transform: scaleX(0);',
    '}',
    '@keyframes pl-bar-in {',
    '  to { transform: scaleX(1); }',
    '}',

    /* Panel sweep-up exit */
    '#page-loader.pl-leaving {',
    '  transition: transform 0.72s cubic-bezier(.76,0,.24,1);',
    '  transform: translateY(-100%);',
    '}',

    /* Fade logo out just before sweep */
    '#page-loader.pl-leaving .pl-logo {',
    '  transition: opacity 0.18s ease, transform 0.18s ease;',
    '  opacity: 0;',
    '  transform: scale(0.9) translateY(-6px);',
    '}',
  ].join('\n');

  var styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ─── DOM ─────────────────────────────────────────── */
  var overlay = document.createElement('div');
  overlay.id = 'page-loader';

  var img = document.createElement('img');
  img.className = 'pl-logo';
  img.src = 'images/navbar-logo.png';
  img.alt = '';
  img.setAttribute('aria-hidden', 'true');

  var track = document.createElement('div');
  track.className = 'pl-track';
  var bar = document.createElement('div');
  bar.className = 'pl-bar';
  track.appendChild(bar);

  overlay.appendChild(img);
  overlay.appendChild(track);

  /* Append synchronously — <script> is inside <body> so body exists */
  if (document.body) {
    document.body.insertBefore(overlay, document.body.firstChild);
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      document.body.insertBefore(overlay, document.body.firstChild);
    });
  }

  /* ─── Reveal ──────────────────────────────────────── */
  var MIN_DISPLAY_MS = 520;  /* logo always visible for at least this long */
  var startMs        = Date.now();
  var windowLoaded   = document.readyState === 'complete';
  var minPassed      = false;

  function reveal() {
    /* Brief pause so the sweep doesn't collide with the logo fade-out */
    overlay.classList.add('pl-leaving');
    var removeAfter = 750; /* matches transition duration + buffer */
    setTimeout(function () {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      /* Also remove the style tag to keep DOM clean */
      if (styleEl.parentNode) styleEl.parentNode.removeChild(styleEl);
    }, removeAfter);
  }

  function tryReveal() {
    if (windowLoaded && minPassed) reveal();
  }

  /* Minimum display timer */
  var elapsed = Date.now() - startMs;
  var remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
  setTimeout(function () {
    minPassed = true;
    tryReveal();
  }, remaining);

  /* Window load listener */
  if (!windowLoaded) {
    window.addEventListener('load', function () {
      windowLoaded = true;
      tryReveal();
    });
  }

})();
