/* global React, ReactDOM */
const {
  useState: usePeekState,
  useRef: usePeekRef,
  useCallback: usePeekCallback,
  useEffect: usePeekEffect,
} = React;

function HoverPeek({ children, imageSrc, width = 200, height = 125 }) {
  const isTouch = typeof window !== 'undefined' &&
    ('ontouchstart' in window || window.matchMedia('(hover: none)').matches);

  if (isTouch) return <>{children}</>;

  const [visible, setVisible] = usePeekState(false);
  const [pos, setPos] = usePeekState({ x: 0, y: 0 });
  const triggerRef = usePeekRef(null);
  const hideTimeout = usePeekRef(null);
  const [imgFailed, setImgFailed] = usePeekState(false);

  const handleEnter = usePeekCallback(() => {
    clearTimeout(hideTimeout.current);
    if (triggerRef.current) {
      const r = triggerRef.current.getBoundingClientRect();
      setPos({ x: r.left + r.width / 2, y: r.top + window.scrollY });
    }
    setVisible(true);
  }, []);

  const handleLeave = usePeekCallback(() => {
    hideTimeout.current = setTimeout(() => setVisible(false), 150);
  }, []);

  usePeekEffect(() => () => clearTimeout(hideTimeout.current), []);

  const card = (
    <div
      style={{
        position: 'absolute',
        left: pos.x,
        top: pos.y,
        transform: `translateX(-50%) translateY(calc(-100% - 14px)) scale(${visible ? 1 : 0.88})`,
        zIndex: 9999,
        pointerEvents: 'none',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.18s ease, transform 0.18s ease',
        transformOrigin: '50% 100%',
      }}
    >
      <div
        style={{
          borderRadius: '14px',
          overflow: 'hidden',
          boxShadow: '0 24px 48px rgba(0,0,0,0.22), 0 1px 0 rgba(255,255,255,0.18) inset',
          border: '1px solid rgba(200,200,200,0.2)',
          background: '#fff',
          padding: '3px',
        }}
      >
        {imgFailed ? (
          <div
            style={{
              width: width,
              height: height,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#f5f5f5',
              color: '#999',
              fontSize: '12px',
              borderRadius: '11px',
            }}
          >
            Preview unavailable
          </div>
        ) : (
          <img
            src={imageSrc}
            alt=""
            width={width}
            height={height}
            onError={() => setImgFailed(true)}
            style={{
              display: 'block',
              width: width + 'px',
              height: height + 'px',
              objectFit: 'cover',
              borderRadius: '11px',
            }}
          />
        )}
      </div>
    </div>
  );

  return (
    <>
      <span
        ref={triggerRef}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        style={{ display: 'inline-flex' }}
      >
        {children}
      </span>
      {ReactDOM.createPortal(card, document.body)}
    </>
  );
}
