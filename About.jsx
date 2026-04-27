/* global React, PrimaryBtn, OutlineBtn, LinkArrow */

function About({ setRoute, asPage }) {
  return (
    <section className="hf-about" data-screen-label={asPage ? 'About' : 'About strip'}>
      <div className="hf-about__inner">
        <div>
          <div className="hf-about__portrait" style={{ backgroundImage: 'url(assets/rob-hobson-portrait.jpeg)' }}>
            <div className="hf-about__portrait-meta">
              <span>Rob Hobson · NJ / NYC</span>
              <span>2026</span>
            </div>
          </div>
        </div>
        <div>
          <span className="hf-eyebrow" style={{color: 'var(--hf-orange)'}}>ABOUT THE STUDIO</span>
          <h2 className="hf-about__title">One DP.<br/><em>One eye.</em></h2>
          <div className="hf-about__body" style={{marginTop: 32}}>
            <p>I'm Rob Hobson — a New Jersey–based Director of Photography working out of NYC. I shoot for broadcast, brands, and the in-between.</p>
            <p>Hobson Films is a one-DP studio. Image-driven, story-led. Real moments captured with technical precision and a cinematographer's eye — for music, sports, reality, and corporate productions.</p>
            <p>Credits include <strong>MTV</strong>, <strong>Viacom</strong>, <strong>Food Network</strong>, <strong>The Daily Show</strong>, <strong>Women's Health</strong>, and <strong>LOGO Network</strong>. Based in NJ, working out of NYC, available on location anywhere the work goes.</p>
          </div>
          <div className="hf-about__credits">
            {[['MTV','Music · Live'],['VIACOM','Reality · Promo'],['FOOD NETWORK','Specials'],['THE DAILY SHOW','Field'],["WOMEN'S HEALTH",'Editorial'],['LOGO NETWORK','Feature']].map(([c, k]) => (
              <div key={c} className="hf-about__credit">
                <span className="hf-meta">{k}</span>{c}
              </div>
            ))}
          </div>
          <div className="hf-about__cta">
            <LinkArrow light onClick={() => setRoute('contact')}>Start a project with Rob</LinkArrow>
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaStrip({ onOpenReel, setRoute }) {
  return (
    <section className="hf-ctaStrip" data-screen-label="CTA strip">
      <div className="hf-ctaStrip__inner">
        <h2 className="hf-ctaStrip__title">Roll<br/><em>camera.</em></h2>
        <div className="hf-ctaStrip__right">
          <p className="hf-ctaStrip__lead">Booking music videos, broadcast, sports, and brand work. Day rates and crew packages on request.</p>
          <div className="hf-ctaStrip__actions">
            <PrimaryBtn onClick={() => setRoute('contact')}>Start your project →</PrimaryBtn>
            <OutlineBtn onClick={onOpenReel}>▸ Watch reel</OutlineBtn>
          </div>
          <span className="hf-ctaStrip__avail">
            Based NY / NJ · traveling for the shoot
          </span>
        </div>
      </div>
    </section>
  );
}

window.About = About;
window.CtaStrip = CtaStrip;
