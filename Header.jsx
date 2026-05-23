/* global React, PrimaryBtn, OutlineBtn */
const { useState: useStateH, useEffect: useEffectH } = React;

function Header({ route, setRoute, adminOn }) {
  const [scrolled, setScrolled] = useStateH(false);
  const [menuOpen, setMenuOpen] = useStateH(false);
  useEffectH(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  // Lock body scroll while menu is open
  useEffectH(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);
  const items = [
    ['work', 'Work'],
    ['about', 'About'],
    ['contact', 'Contact'],
  ];
  const go = (id) => { setRoute(id); setMenuOpen(false); };
  return (
    <>
      <header className={`hf-header${scrolled ? ' is-scrolled' : ''}`} style={adminOn ? {top: 38} : {}}>
        <div className="hf-header__inner">
          <button className="hf-header__brand" onClick={() => go('home')} aria-label="Hobson Films — home">
            <img src="assets/hobson-films-logo-light.png" alt="Hobson Films" />
          </button>
          <nav className="hf-header__nav">
            {items.map(([id, label]) => (
              <button key={id}
                 className={`hf-nav-link${route === id ? ' is-active' : ''}`}
                 onClick={() => go(id)}>{label}</button>
            ))}
          </nav>
          <div className="hf-header__cta">
            <PrimaryBtn sm onClick={() => go('contact')}>Start your project →</PrimaryBtn>
          </div>
          <button
            className={`hf-header__hamburger${menuOpen ? ' is-open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>
      {menuOpen && (
        <div className="hf-mobilemenu" onClick={() => setMenuOpen(false)}>
          <nav className="hf-mobilemenu__nav" onClick={(e) => e.stopPropagation()}>
            {items.map(([id, label]) => (
              <button key={id}
                className={`hf-mobilemenu__link${route === id ? ' is-active' : ''}`}
                onClick={() => go(id)}>
                <span className="hf-mobilemenu__link-num">0{items.findIndex(it => it[0] === id) + 1}</span>
                <span>{label}</span>
              </button>
            ))}
            <div className="hf-mobilemenu__divider"></div>
            <PrimaryBtn onClick={() => go('contact')}>Start your project →</PrimaryBtn>
          </nav>
        </div>
      )}
    </>
  );
}
window.Header = Header;
