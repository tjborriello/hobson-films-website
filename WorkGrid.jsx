/* global React */
const { useMemo } = React;

// Layout pattern for the grid — recycles in groups of 6 so any number of
// projects looks intentional. Big tile leads each cycle.
const SPAN_PATTERN = ['xl', 'std', 'tall', 'std', 'wide', 'std'];

// Compact home-page pattern: smaller tiles, more of them. No 'xl' since the
// hero already hands off; this is the highlight reel, not a magazine cover.
const COMPACT_PATTERN = ['wide', 'std', 'std', 'tall', 'std', 'std', 'wide', 'std', 'std', 'tall', 'std', 'std'];

function WorkGrid({ projects, filter, setFilter, onOpenProject, compact, adminOn, onEditProject, onAddProject, onReorder }) {
  const cats = useMemo(() => {
    const counts = { All: projects.length };
    projects.forEach(p => { counts[p.cat] = (counts[p.cat] || 0) + 1; });
    const order = ['All', 'Music', 'Sports', 'Reality', 'Corporate'];
    return order.filter(c => c === 'All' || counts[c]).map(c => [c, counts[c] || 0]);
  }, [projects]);

  const items = filter === 'All' ? projects : projects.filter(p => p.cat === filter);
  const display = compact ? items.slice(0, 10) : items;

  // Drag/drop in admin mode
  const onDragStart = (e, idx) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', String(idx));
    e.currentTarget.classList.add('is-dragging');
  };
  const onDragEnd = (e) => e.currentTarget.classList.remove('is-dragging');
  const onDragOver = (e) => { if (adminOn) { e.preventDefault(); e.currentTarget.classList.add('is-dragover'); } };
  const onDragLeave = (e) => e.currentTarget.classList.remove('is-dragover');
  const onDrop = (e, targetIdx) => {
    e.preventDefault();
    e.currentTarget.classList.remove('is-dragover');
    const fromIdx = parseInt(e.dataTransfer.getData('text/plain'), 10);
    if (Number.isNaN(fromIdx) || fromIdx === targetIdx) return;
    onReorder && onReorder(fromIdx, targetIdx);
  };

  return (
    <section className={`hf-work${compact ? ' hf-work--compact' : ''}`} data-screen-label={compact ? 'Featured work' : 'All work'}>
      <div className="hf-sec-head">
        <div>
          <span className="hf-eyebrow" style={{color: 'var(--hf-orange)'}}>{compact ? 'FEATURED WORK' : 'PORTFOLIO'}</span>
          <h2 className="hf-sec-head__title">
            {compact ? <>Reel <em>highlights.</em></> : <>Selected <em>work.</em></>}
          </h2>
        </div>
        {!compact && (
          <div className="hf-work__filters">
            {cats.map(([c, n]) => (
              <button key={c}
                onClick={() => setFilter(c)}
                className={`hf-chip${filter === c ? ' is-active' : ''}`}>
                {c}<span className="hf-chip__count">{n}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="hf-grid">
        {display.map((p, i) => {
          // In compact (home) mode, use the compact pattern instead of the
          // per-project span so tiles stay smaller and more fit on screen.
          const span = compact
            ? COMPACT_PATTERN[i % COMPACT_PATTERN.length]
            : (p.span || SPAN_PATTERN[i % SPAN_PATTERN.length]);
          const num = String(i + 1).padStart(2, '0');
          return (
            <a key={p.id}
               className={`hf-tile hf-tile--${span}${adminOn ? ' is-editing' : ''}`}
               draggable={adminOn}
               onDragStart={(e) => onDragStart(e, i)}
               onDragEnd={onDragEnd}
               onDragOver={onDragOver}
               onDragLeave={onDragLeave}
               onDrop={(e) => onDrop(e, i)}
               onClick={() => !adminOn && onOpenProject(p)}>
              <div className="hf-tile__img" style={{ backgroundImage: `url(${p.img.startsWith('data:') || p.img.startsWith('http') || p.img.startsWith('assets/') ? p.img : `assets/photography/${p.img}`})` }} />
              <div className="hf-tile__scrim" />
              {adminOn && (
                <button className="hf-tile__edit" onClick={(e) => { e.stopPropagation(); onEditProject(p); }}>Edit</button>
              )}
              <div className="hf-tile__index">{num} / {String(display.length).padStart(2, '0')}</div>
              <div className="hf-tile__cat">{p.cat}</div>
              <div className="hf-tile__caption">
                <h3 className="hf-tile__title">{p.title}</h3>
                {(span === 'xl' || span === 'big' || span === 'wide') && p.sub && (
                  <p className="hf-tile__sub">{p.sub}</p>
                )}
                <div className="hf-tile__meta">
                  <span>{p.client.toUpperCase()}</span>
                  <span style={{opacity: 0.5}}>·</span>
                  <span>{p.year}</span>
                </div>
                <div className="hf-tile__view">View project →</div>
              </div>
            </a>
          );
        })}
        {adminOn && (
          <button className="hf-tile hf-tile--std hf-tile--add" onClick={onAddProject}>
            <span className="hf-tile--add__plus">+</span>
            <span style={{fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase'}}>Add project</span>
          </button>
        )}
      </div>

      {compact && items.length > display.length && (
        <div style={{maxWidth: 'var(--container-max)', margin: '64px auto 0', textAlign: 'center'}}>
          <span className="hf-meta" style={{display: 'block', marginBottom: 16}}>
            {items.length - display.length} more in the archive
          </span>
        </div>
      )}
    </section>
  );
}
window.WorkGrid = WorkGrid;
