/* global React, PrimaryBtn, OutlineBtn, GhostBtn, newProject */
const { useState: useStateA, useEffect: useEffectA } = React;

function AdminBar({ adminOn, onToggle, onAdd, onReset, onExport }) {
  // Keyboard shortcut to summon edit mode: Cmd/Ctrl + E
  useEffectA(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        onToggle();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onToggle]);

  return (
    <>
      {adminOn && (
        <div className="hf-admin-tools">
          <button className="hf-admin-tools__btn hf-admin-tools__btn--primary" onClick={onAdd}>+ Add project</button>
          <button className="hf-admin-tools__btn" onClick={onExport}>Export JSON</button>
          <button className="hf-admin-tools__btn hf-admin-tools__btn--danger" onClick={onReset}>Reset to seed</button>
        </div>
      )}
      {/* Admin mode is summoned via the Cmd/Ctrl+E shortcut (registered in the
          useEffect above). No public-facing button — the visible affordance only
          appears once admin mode is on, so the user has a way to exit. */}
      {adminOn && (
        <button
          className="hf-admin-toggle is-on"
          onClick={onToggle}
          title="Exit edit mode (⌘E)"
          aria-label="Exit edit mode"
        >
          ● Editing — done
        </button>
      )}
    </>
  );
}

function ProjectEditor({ project, onSave, onCancel, onDelete, isNew }) {
  const [draft, setDraft] = useStateA(project);
  const upd = (k) => (e) => setDraft({ ...draft, [k]: e.target.value });

  const onFile = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => setDraft({ ...draft, img: ev.target.result });
    reader.readAsDataURL(f);
  };

  const previewSrc = draft.img.startsWith('data:') || draft.img.startsWith('http') || draft.img.startsWith('assets/')
    ? draft.img : `assets/photography/${draft.img}`;

  return (
    <div className="hf-modal" onClick={onCancel}>
      <div className="hf-modal__panel" onClick={(e) => e.stopPropagation()}>
        <div className="hf-modal__head">
          <h3 className="hf-modal__title">{isNew ? 'Add project' : 'Edit project'}</h3>
          <button className="hf-modal__close" onClick={onCancel}>×</button>
        </div>
        <div className="hf-modal__body">
          <div className="hf-modal__imagepicker">
            <div className="hf-modal__preview" style={{ backgroundImage: `url(${previewSrc})` }} />
            <div>
              <label className="hf-modal__filebtn">
                Upload still
                <input type="file" accept="image/*" onChange={onFile} style={{display: 'none'}} />
              </label>
              <p className="hf-modal__hint">Or use existing: still-01-music.png … still-09-hero.png</p>
              <label style={{marginTop: 12}}><span>Image (filename or URL)</span>
                <input value={draft.img.startsWith('data:') ? '(uploaded)' : draft.img} onChange={upd('img')} disabled={draft.img.startsWith('data:')} />
              </label>
            </div>
          </div>
          <label className="hf-modal__full"><span>Title</span>
            <input value={draft.title} onChange={upd('title')} />
          </label>
          <label className="hf-modal__full"><span>Subtitle</span>
            <input value={draft.sub} onChange={upd('sub')} />
          </label>
          <label><span>Client</span><input value={draft.client} onChange={upd('client')} /></label>
          <label><span>Category</span>
            <select value={draft.cat} onChange={upd('cat')}>
              <option>Music</option>
              <option>Sports</option>
              <option>Reality</option>
              <option>Corporate</option>
            </select>
          </label>
          <label><span>Year</span><input type="number" value={draft.year} onChange={upd('year')} /></label>
          <label><span>Tile size</span>
            <select value={draft.span} onChange={upd('span')}>
              <option value="std">Standard (2×1)</option>
              <option value="wide">Wide (3×1)</option>
              <option value="tall">Tall (2×2)</option>
              <option value="big">Big (3×2)</option>
              <option value="xl">Extra-large (4×2)</option>
            </select>
          </label>
          <label><span>Camera</span><input value={draft.camera} onChange={upd('camera')} /></label>
          <label><span>Lenses</span><input value={draft.lenses} onChange={upd('lenses')} /></label>
          <label><span>Format</span><input value={draft.format} onChange={upd('format')} /></label>
          <label><span>Role</span><input value={draft.role} onChange={upd('role')} /></label>
          <label className="hf-modal__full"><span>Vimeo URL or ID <span style={{opacity: 0.6, fontWeight: 400}}>(leave blank to use the project detail page instead)</span></span>
            <input value={draft.vimeo || ''} onChange={upd('vimeo')} placeholder="e.g. 76979871 or https://vimeo.com/76979871" />
          </label>
          <label className="hf-modal__full"><span>Lede (use *italic* to highlight in orange)</span>
            <textarea rows="3" value={draft.lede} onChange={upd('lede')}></textarea>
          </label>
          <label className="hf-modal__full"><span>Body</span>
            <textarea rows="5" value={draft.body} onChange={upd('body')}></textarea>
          </label>
        </div>
        <div className="hf-modal__foot">
          <div>
            {!isNew && (
              <button className="hf-adminbar__btn hf-adminbar__btn--danger" onClick={() => { if (confirm('Delete this project? This cannot be undone.')) onDelete(); }}>Delete project</button>
            )}
          </div>
          <div className="hf-modal__foot-actions">
            <OutlineBtn sm onClick={onCancel}>Cancel</OutlineBtn>
            <PrimaryBtn sm onClick={() => onSave(draft)}>{isNew ? 'Add project' : 'Save changes'}</PrimaryBtn>
          </div>
        </div>
      </div>
    </div>
  );
}

window.AdminBar = AdminBar;
window.ProjectEditor = ProjectEditor;
