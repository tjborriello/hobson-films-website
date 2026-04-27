/* global React */

function ReelOverlay({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="hf-reel" onClick={onClose}>
      <div className="hf-reel__bg" style={{ backgroundImage: 'url(assets/photography/still-09-hero.png)' }} />
      <button className="hf-reel__close" onClick={onClose} aria-label="Close">×</button>
      <div className="hf-reel__topmeta">
        <span className="hf-meta hf-meta--strong-light">REEL 2026</span>
        <span className="hf-meta hf-meta--light">RUNTIME 2:14 · 4K · STEREO</span>
      </div>
      <div className="hf-reel__center">
        <button className="hf-reel__play" onClick={(e) => { e.stopPropagation(); }}>▸</button>
        <span className="hf-meta hf-meta--light">PRESS PLAY</span>
        <h2 className="hf-reel__title">Roll camera.</h2>
      </div>
      <div className="hf-reel__bottom">
        <span className="hf-meta hf-meta--light">00:00 / 02:14</span>
        <div className="hf-reel__bar"><div className="hf-reel__progress" /></div>
        <span className="hf-meta hf-meta--light">MUTED · CLICK ANYWHERE TO CLOSE</span>
      </div>
    </div>
  );
}
window.ReelOverlay = ReelOverlay;
