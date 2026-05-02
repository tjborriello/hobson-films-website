/* global React, PrimaryBtn, OutlineBtn, HeroScrollBg */

function Hero({ onOpenReel, setRoute }) {
  // Outer wrap is taller than the viewport; the inner section sticks to the
  // top while the user scrolls through the wrap's height. The wrap's scroll
  // progress drives HeroScrollBg's frame index. Once the wrap is fully
  // scrolled past, the page resumes normally and the next section appears.
  return (
    <div className="hf-hero-wrap">
      <section className="hf-hero">
        <HeroScrollBg />
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
    </div>
  );
}
window.Hero = Hero;
