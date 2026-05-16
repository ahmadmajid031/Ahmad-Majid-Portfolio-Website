/* global React */
const { useState: useStateB } = React;

// Reuse useInView from sections.jsx (loaded before this file)
// But provide a fallback in case of load order issues.
const useInViewB = (window.__useInView) || function (threshold) {
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

// ---------- Books I Read ----------
const BOOKS = [
  {
    id: "b1",
    title: "Influence",
    author: "Robert Cialdini",
    year: "1984",
    note: "The six levers of persuasion.",
    tag: "Psychology",
    color: "peach",
    image: "images/book-covers/influence.jpg",
    goodreads: "https://www.goodreads.com/book/show/28815.Influence",
  },
  {
    id: "b2",
    title: "101 Essays",
    author: "Brianna Wiest",
    year: "2016",
    note: "Short, sharp, and genuinely uncomfortable.",
    tag: "Philosophy",
    color: "lilac",
    image: "images/book-covers/101essays.jpg",
    goodreads: "https://www.goodreads.com/book/show/29782854",
  },
  {
    id: "b3",
    title: "Deep Work",
    author: "Cal Newport",
    year: "2016",
    note: "The case for undistracted focus.",
    tag: "Productivity",
    color: "sky",
    image: "images/book-covers/deepwork.jpg",
    goodreads: "https://www.goodreads.com/book/show/25744928-deep-work",
  },
  {
    id: "b4",
    title: "Magnificent Delusions",
    author: "Husain Haqqani",
    year: "2013",
    note: "How two allies misread each other for decades.",
    tag: "History",
    color: "sun",
    image: "images/book-covers/magnificentdelusions.jpg",
    goodreads: "https://www.goodreads.com/book/show/18047951",
  },
  {
    id: "b5",
    title: "Twilight of the Idols",
    author: "Friedrich Nietzsche",
    year: "1889",
    note: "Philosophy with a hammer.",
    tag: "Philosophy",
    color: "sky",
    image: "images/book-covers/twilightoftheidols.jpg",
    goodreads: "https://www.goodreads.com/book/show/18632",
  },
  {
    id: "b6",
    title: "Poor Charlie's Almanack",
    author: "Charlie Munger",
    year: "2005",
    note: "Mental models from one of the sharpest minds alive.",
    tag: "Thinking",
    color: "lilac",
    image: "images/book-covers/charliesalmanak.jpg",
    goodreads: "https://www.goodreads.com/book/show/944652",
  },
];

function BooksSection() {
  const [ref, inView] = useInViewB();
  const [hoverId, setHoverId] = useStateB(null);
  const col1 = BOOKS.filter((_, i) => i % 3 === 0);
  const col2 = BOOKS.filter((_, i) => i % 3 === 1);
  const col3 = BOOKS.filter((_, i) => i % 3 === 2);

  return (
    <section ref={ref} className={"slab slab--books " + (inView ? "is-in" : "")} id="books" data-screen-label="04 Books">
      <div className="slab__inner">
        <div className="work-head">
          <div>
            <div className="slab__eyebrow">The Shelf</div>
            <h2 className="slab__h2">The last six books <em>I finished.</em></h2>
          </div>
          <p className="work-head__lede">
            The shelf keeps growing, so this list won't stay still for long. Hover any title to bring its cover to life.
          </p>
        </div>

        <div className="books">
          <div className="books__grid">
            <div className="books__col books__col--1">
              {col1.map(b => <BookCover key={b.id} book={b} size="sm" hoverId={hoverId} onHover={setHoverId} />)}
            </div>
            <div className="books__col books__col--2">
              {col2.map(b => <BookCover key={b.id} book={b} size="lg" hoverId={hoverId} onHover={setHoverId} />)}
            </div>
            <div className="books__col books__col--3">
              {col3.map(b => <BookCover key={b.id} book={b} size="md" hoverId={hoverId} onHover={setHoverId} />)}
            </div>
          </div>

          <ul className="books__list">
            {BOOKS.map((b, i) => <BookRow key={b.id} book={b} index={i + 1} hoverId={hoverId} onHover={setHoverId} />)}
          </ul>
        </div>
      </div>
    </section>
  );
}

function BookCover({ book, size, hoverId, onHover }) {
  const active = hoverId === book.id;
  const dimmed = hoverId !== null && !active;
  return (
    <a
      href={book.goodreads || "#books"}
      target="_blank"
      rel="noopener"
      className={
        "book-cover book-cover--" + size +
        " book-cover--" + book.color +
        (dimmed ? " is-dim" : "") +
        (active ? " is-active" : "")
      }
      style={{ display: 'block', textDecoration: 'none' }}
      onMouseEnter={() => onHover(book.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="book-cover__frame">
        <img src={book.image} alt={book.title} />
      </div>
      <span className={"book-cover__tag book-cover__tag--" + book.color}>{book.tag}</span>
    </a>
  );
}

function BookRow({ book, index, hoverId, onHover }) {
  const active = hoverId === book.id;
  const dimmed = hoverId !== null && !active;
  return (
    <li
      className={"book-row book-row--" + book.color + (dimmed ? " is-dim" : "") + (active ? " is-active" : "")}
      onMouseEnter={() => onHover(book.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="book-row__top">
        <span className="book-row__num">{String(index).padStart(2, "0")}</span>
        <span className={"book-row__chip book-row__chip--" + book.color}>{book.tag}</span>
        <a className="book-row__title" href={book.goodreads || "#books"} target="_blank" rel="noopener" style={{textDecoration:'none',color:'inherit'}}>{book.title}</a>
        <a
          className="book-row__arrow"
          href={book.goodreads || "#books"}
          target="_blank"
          rel="noopener"
          aria-label={"View " + book.title + " on Goodreads"}
          onClick={(e) => e.stopPropagation()}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7h7M7 4l3 3-3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
      <div className="book-row__meta">
        <span className="book-row__author">{book.author}</span>
        <span className="book-row__dot">·</span>
        <span className="book-row__year">{book.year}</span>
        <span className="book-row__note"> — {book.note}</span>
      </div>
    </li>
  );
}

// ---------- Styles ----------
const booksCss = `
.slab--books { background: var(--hero-bg); }

.work-head__lede {
  margin: 14px 0 0;
  max-width: 460px;
  font-size: 15px; line-height: 1.55;
  color: var(--ink); opacity: .7;
  font-weight: 500;
}

.eyebrow-chip {
  display: inline-flex; align-items: center;
  padding: 3px 9px;
  border-radius: 999px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px; letter-spacing: .04em;
  color: var(--ink);
  margin-left: 8px;
  vertical-align: 2px;
  text-transform: lowercase;
  border: 1px solid rgba(20,40,30,.12);
  white-space: nowrap;
}
.eyebrow-chip--peach { background: var(--peach); }
.eyebrow-chip--lilac { background: var(--lilac); }

.books {
  margin-top: 44px;
  display: grid;
  grid-template-columns: minmax(0, auto) minmax(360px, 1fr);
  gap: clamp(32px, 5vw, 72px);
  align-items: start;
}
.books__grid { display: flex; gap: 12px; flex-shrink: 0; }
.books__col { display: flex; flex-direction: column; gap: 14px; }
.books__col--2 { margin-top: 60px; }
.books__col--3 { margin-top: 28px; }

.book-cover {
  position: relative;
  cursor: pointer;
  transition: opacity .35s ease, transform .45s cubic-bezier(.2,.8,.2,1);
}
.book-cover--sm { width: 142px; }
.book-cover--md { width: 152px; }
.book-cover--lg { width: 164px; }

.book-cover__frame {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  background: var(--ink);
  box-shadow: 0 10px 22px -12px rgba(20,30,20,.45);
  transition: box-shadow .45s ease, transform .45s cubic-bezier(.2,.8,.2,1);
  /* color overlay */
}
.book-cover--sm .book-cover__frame { height: 178px; }
.book-cover--md .book-cover__frame { height: 192px; }
.book-cover--lg .book-cover__frame { height: 206px; }

.book-cover__frame::before {
  content: "";
  position: absolute; inset: 0;
  background: var(--cover-tint, transparent);
  mix-blend-mode: multiply;
  opacity: 0;
  transition: opacity .5s ease;
  z-index: 2;
  pointer-events: none;
}
.book-cover--peach .book-cover__frame { --cover-tint: #F8C495; }
.book-cover--lilac .book-cover__frame { --cover-tint: #C7C2F0; }
.book-cover--sky   .book-cover__frame { --cover-tint: #B8DBEC; }
.book-cover--sun   .book-cover__frame { --cover-tint: #F8E45A; }

.book-cover__frame img {
  width: 100%; height: 100%;
  object-fit: cover; display: block;
  filter: grayscale(1) brightness(.78) contrast(1.05);
  transition: filter .5s ease, transform .8s ease;
}
.book-cover.is-active .book-cover__frame img {
  filter: grayscale(0) brightness(1);
  transform: scale(1.04);
}
.book-cover.is-active .book-cover__frame::before { opacity: .35; }
.book-cover.is-active .book-cover__frame {
  box-shadow: 0 18px 32px -14px rgba(20,30,20,.55);
  transform: translateY(-3px);
}
.book-cover.is-dim { opacity: .5; }

.book-cover__tag {
  position: absolute;
  left: 8px; top: 8px;
  z-index: 3;
  padding: 4px 9px;
  border-radius: 999px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px; letter-spacing: .08em;
  font-weight: 600;
  color: var(--ink);
  text-transform: uppercase;
  box-shadow: 0 1px 0 rgba(255,255,255,.4) inset, 0 4px 10px rgba(0,0,0,.18);
  transform: rotate(-4deg);
  transition: transform .35s cubic-bezier(.4,1.6,.4,1), opacity .35s ease;
  opacity: 0;
}
.book-cover.is-active .book-cover__tag { opacity: 1; transform: rotate(-7deg) translateY(-2px); }
.book-cover__tag--peach { background: var(--peach); }
.book-cover__tag--lilac { background: var(--lilac); }
.book-cover__tag--sky   { background: var(--sky); }
.book-cover__tag--sun   { background: var(--sun); }

.books__list {
  list-style: none; margin: 4px 0 0; padding: 0;
  display: flex; flex-direction: column;
  gap: 22px;
}
.book-row {
  cursor: pointer;
  transition: opacity .3s ease, transform .35s cubic-bezier(.2,.8,.2,1);
}
.book-row.is-dim { opacity: .42; }
.book-row.is-active { transform: translateX(4px); }

.book-row__top {
  display: flex; align-items: center; gap: 12px;
  flex-wrap: wrap;
}
.book-row__num {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px; color: var(--ink); opacity: .35;
  font-weight: 500;
  letter-spacing: .04em;
  width: 22px;
  transition: opacity .3s ease;
}
.book-row.is-active .book-row__num { opacity: .7; }

.book-row__chip {
  padding: 3px 9px;
  border-radius: 999px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px; letter-spacing: .08em; font-weight: 600;
  color: var(--ink);
  text-transform: uppercase;
  flex-shrink: 0;
  box-shadow: 0 1px 0 rgba(255,255,255,.4) inset;
  transform: rotate(-1deg);
  transition: transform .35s cubic-bezier(.4,1.6,.4,1);
}
.book-row.is-active .book-row__chip { transform: rotate(-3deg) scale(1.04); }
.book-row__chip--peach { background: var(--peach); }
.book-row__chip--lilac { background: var(--lilac); }
.book-row__chip--sky   { background: var(--sky); }
.book-row__chip--sun   { background: var(--sun); }

.book-row__title {
  font-family: 'Newsreader', Georgia, serif;
  font-weight: 700; font-style: italic;
  font-size: clamp(22px, 2.1vw, 30px);
  color: var(--ink); letter-spacing: -0.02em;
  line-height: 1.05;
}

.book-row__arrow {
  display: inline-grid; place-items: center;
  width: 30px; height: 30px;
  border-radius: 999px;
  background: var(--ink); color: #F4ECDC;
  text-decoration: none;
  opacity: 0;
  transform: translateX(-8px) rotate(-8deg);
  transition: opacity .25s ease, transform .3s cubic-bezier(.4,1.6,.4,1), background .2s ease;
  margin-left: 2px;
}
.book-row.is-active .book-row__arrow {
  opacity: 1;
  transform: translateX(0) rotate(0);
}
.book-row__arrow:hover { transform: translateX(3px) rotate(0); }

.book-row__meta {
  margin: 8px 0 0 34px;
  font-size: 13px;
  color: var(--ink); opacity: .6;
  font-weight: 500;
  line-height: 1.5;
}
.book-row__meta > span + span { margin-left: 6px; }
.book-row__author { font-weight: 600; opacity: .85; white-space: nowrap; }
.book-row__dot { opacity: .4; }
.book-row__year { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: .04em; }
.book-row__note { font-style: italic; opacity: .75; }

@media (max-width: 880px) {
  .books { display: block; }
  .books__grid { display: none; }
  .books__list { margin-top: 20px; gap: 0; }

  /* Clear card-like rows with borders */
  .book-row { padding: 18px 0; border-bottom: 1px solid rgba(20,40,30,.09); }
  .book-row:first-child { border-top: 1px solid rgba(20,40,30,.09); }
  .book-row.is-active { transform: none; }

  /* Line 1: num + chip */
  .book-row__top {
    flex-wrap: wrap;
    align-items: center;
    gap: 5px 8px;
    margin-bottom: 4px;
  }
  .book-row__num   { order: 1; }
  .book-row__chip  { order: 2; display: inline-flex; }
  /* Title takes full width below num+chip */
  .book-row__title { order: 3; flex: 0 0 100%; font-size: clamp(24px, 6vw, 32px); line-height: 1.1; }
  .book-row__arrow { display: none; }

  /* Author · year sits tight below the title */
  .book-row__meta { margin: 3px 0 0; font-size: 13px; }
  .book-row__note { display: none; }
}
`;
const booksStyleEl = document.createElement('style');
booksStyleEl.textContent = booksCss;
document.head.appendChild(booksStyleEl);

Object.assign(window, { BooksSection });
