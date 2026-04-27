/* global React */
const { useEffect: useEffectV } = React;

// Accept a full Vimeo URL or a bare numeric ID; return just the ID.
function extractVimeoId(input) {
  if (!input) return '';
  const s = String(input).trim();
  if (/^\d+$/.test(s)) return s;
  const m = s.match(/vimeo\.com\/(?:video\/|channels\/[^/]+\/|groups\/[^/]+\/videos\/)?(\d+)/i);
  return m ? m[1] : '';
}

function VimeoModal({ project, onClose }) {
  const isOpen = !!project;
  useEffectV(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  const id = extractVimeoId(project.vimeo);
  const src = id
    ? `https://player.vimeo.com/video/${id}?autoplay=1&title=0&byline=0&portrait=0&color=ff5b1a`
    : '';

  return (
    <div className="hf-vmodal" onClick={onClose}>
      <button className="hf-vmodal__close" onClick={onClose} aria-label="Close">×</button>
      <div className="hf-vmodal__topmeta">
        <span className="hf-meta hf-meta--strong-light">{project.cat?.toUpperCase()} · {project.year}</span>
        <span className="hf-meta hf-meta--strong-light">{project.client}</span>
      </div>
      <div className="hf-vmodal__frame" onClick={(e) => e.stopPropagation()}>
        {id ? (
          <iframe
            src={src}
            title={project.title}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="hf-vmodal__empty">
            <span className="hf-eyebrow" style={{color: 'var(--hf-orange)'}}>VIDEO COMING SOON</span>
            <h3>{project.title}</h3>
            <p>This project doesn't have a video linked yet. Add a Vimeo URL or ID in the editor.</p>
          </div>
        )}
      </div>
      <div className="hf-vmodal__bottommeta">
        <h2 className="hf-vmodal__title">{project.title}</h2>
        <p className="hf-vmodal__sub">{project.sub}</p>
      </div>
    </div>
  );
}

window.VimeoModal = VimeoModal;
window.extractVimeoId = extractVimeoId;
