/* global React */

function ProjectDetail({ project, allProjects, onBack, onOpenProject }) {
  if (!project) return null;
  const heroImg = project.img.startsWith('data:') || project.img.startsWith('http') || project.img.startsWith('assets/') ? project.img : `assets/photography/${project.img}`;

  // Pick 4 still images for the gallery — use a deterministic rotation through the available stills.
  const stills = ['still-01-music.png','still-05-music.png','still-06-bts.png','still-08-music.png','still-04-corp.png','still-02-sports.png'];
  const galleryImgs = [stills[0], stills[1], stills[2], stills[3]];

  // Find next project for the next-row.
  const idx = allProjects.findIndex(p => p.id === project.id);
  const next = allProjects[(idx + 1) % allProjects.length];
  const nextImg = next.img.startsWith('data:') || next.img.startsWith('http') || next.img.startsWith('assets/') ? next.img : `assets/photography/${next.img}`;

  // italicize the lede where * marks are placed (e.g. "*Love & Hip Hop*")
  const ledeParts = (project.lede || '').split(/\*([^*]+)\*/g);

  return (
    <article className="hf-project">
      <div className="hf-project__hero" style={{ backgroundImage: `url(${heroImg})` }}>
        <div className="hf-project__heroInner">
          <div className="hf-project__heroTop">
            <button className="hf-back" onClick={onBack}>← All work</button>
            <span className="hf-meta hf-meta--strong-light">{String(idx + 1).padStart(2, '0')} / {String(allProjects.length).padStart(2, '0')}</span>
          </div>
          <div className="hf-project__heroBottom">
            <span className="hf-project__cat">{project.cat.toUpperCase()} · {project.client.toUpperCase()} · {project.year}</span>
            <h1 className="hf-project__title">{project.title}</h1>
            {project.sub && <p className="hf-project__sub">{project.sub}</p>}
          </div>
        </div>
      </div>

      <div className="hf-project__body">
        <aside className="hf-project__sidebar">
          <div>
            <span className="hf-meta">CLIENT</span>
            <div className="hf-project__sidebar-val">{project.client}</div>
          </div>
          <div>
            <span className="hf-meta">CATEGORY</span>
            <div className="hf-project__sidebar-val">{project.cat}</div>
          </div>
          <div>
            <span className="hf-meta">ROLE</span>
            <div className="hf-project__sidebar-val">{project.role}</div>
          </div>
          <div>
            <span className="hf-meta">CAMERA</span>
            <div className="hf-project__sidebar-val">{project.camera}</div>
          </div>
          <div>
            <span className="hf-meta">LENSES</span>
            <div className="hf-project__sidebar-val">{project.lenses}</div>
          </div>
          <div>
            <span className="hf-meta">FORMAT</span>
            <div className="hf-project__sidebar-val">{project.format}</div>
          </div>
          <div>
            <span className="hf-meta">YEAR</span>
            <div className="hf-project__sidebar-val">{project.year}</div>
          </div>
        </aside>

        <div className="hf-project__main">
          <p className="hf-project__lede">
            {ledeParts.map((part, i) => i % 2 === 1 ? <em key={i}>{part}</em> : <React.Fragment key={i}>{part}</React.Fragment>)}
          </p>
          <div className="hf-project__body-text">
            <p>{project.body}</p>
          </div>
          <div className="hf-project__stills">
            <div className="hf-still hf-still--wide" style={{ backgroundImage: `url(assets/photography/${galleryImgs[0]})` }} />
            <div className="hf-still" style={{ backgroundImage: `url(assets/photography/${galleryImgs[1]})` }} />
            <div className="hf-still" style={{ backgroundImage: `url(assets/photography/${galleryImgs[2]})` }} />
            <div className="hf-still hf-still--wide" style={{ backgroundImage: `url(assets/photography/${galleryImgs[3]})` }} />
          </div>
          <div className="hf-project__credits">
            <div>
              <span className="hf-meta hf-meta--strong">CREDITS</span>
            </div>
            <div className="hf-project__creditList">
              {(project.credits || []).map((c, i) => (
                <div key={i}>
                  <span className="hf-meta">{c.role.toUpperCase()}</span>
                  <div>{c.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="hf-project__nextrow">
        <div className="hf-project__nextrow-inner">
          <div>
            <span className="hf-meta hf-meta--accent">NEXT PROJECT</span>
            <h3 style={{fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3.4vw, 52px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.95, margin: '12px 0 0', color: 'var(--fg-inverse)'}}>{next.title}</h3>
            <p style={{color: 'var(--fg-inverse-secondary)', margin: '12px 0 0', fontSize: 16}}>{next.sub}</p>
          </div>
          <button className="hf-project__next" onClick={() => onOpenProject(next)} style={{ backgroundImage: `url(${nextImg})`, border: 'none' }}>
            <div className="hf-project__next-inner">
              <span className="hf-project__next-label">{next.cat.toUpperCase()} · {next.year}</span>
              <span className="hf-project__next-label" style={{color: 'var(--hf-orange)'}}>View next →</span>
            </div>
          </button>
        </div>
      </div>
    </article>
  );
}
window.ProjectDetail = ProjectDetail;
