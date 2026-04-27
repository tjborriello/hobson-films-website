/* global React, PrimaryBtn, OutlineBtn */

function Hero({ onOpenReel, setRoute }) {
  return (
    <section className="hf-hero">
      <div className="hf-hero__media">
        <div className="hf-hero__poster" style={{ backgroundImage: 'url(assets/photography/still-09-hero.png)' }} />
      </div>
      <div className="hf-hero__scrim" />
      <div className="hf-hero__inner">
        <div className="hf-hero__main">
          <span className="hf-eyebrow" style={{color: 'var(--hf-orange)'}}>DP Rob Hobson</span>
          <h1 className="hf-hero__title">Capturing<br/><em>your world.</em></h1>
          <p className="hf-hero__lead">Cinematography for music, sports, reality, and corporate. A one-DP studio shooting for broadcast and brands — image-driven, story-led, color final in-camera.</p>
          <div className="hf-hero__actions">
            <PrimaryBtn onClick={onOpenReel}>▸ Watch full reel</PrimaryBtn>
            <OutlineBtn dark onClick={() => setRoute('work')}>View work →</OutlineBtn>
          </div>
        </div>
      </div>
    </section>
  );
}
window.Hero = Hero;
