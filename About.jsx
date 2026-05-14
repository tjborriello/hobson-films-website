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

function AboutPage({ setRoute }) {
  // Full editorial about page: uses the existing About strip as the header,
  // then expands with three principle cards, a 3-step process, and a
  // location + gear panel. All copy was either inferred from the existing
  // site or kept generic so we don't fabricate specifics about Rob.
  return (
    <>
      <About setRoute={setRoute} asPage />

      <section className="hf-aboutpage__approach" data-screen-label="Approach">
        <div className="hf-aboutpage__inner">
          <div className="hf-aboutpage__sec-head">
            <span className="hf-eyebrow" style={{color: 'var(--hf-orange)'}}>WORKING PHILOSOPHY</span>
            <h2 className="hf-aboutpage__h2">Three <em>principles.</em></h2>
            <p className="hf-aboutpage__lead">A short list because long lists rarely survive a shoot day. These three do.</p>
          </div>
          <div className="hf-aboutpage__principles">
            <article className="hf-principle">
              <span className="hf-principle__num">01</span>
              <h3 className="hf-principle__title">Image-driven.</h3>
              <p className="hf-principle__body">Every frame earns its place in the cut. Composition and lighting do the talking — the cut just shows up to hear them out.</p>
            </article>
            <article className="hf-principle">
              <span className="hf-principle__num">02</span>
              <h3 className="hf-principle__title">Story-led.</h3>
              <p className="hf-principle__body">The image serves the story, not the other way around. Coverage choices come from what the scene needs — not from a list of obligatory shots.</p>
            </article>
            <article className="hf-principle">
              <span className="hf-principle__num">03</span>
              <h3 className="hf-principle__title">Color final in-camera.</h3>
              <p className="hf-principle__body">Light, lens, exposure, white balance — the look lands on set. Post is for the cut, not for rescuing what the camera should have caught.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="hf-aboutpage__process" data-screen-label="Process">
        <div className="hf-aboutpage__inner">
          <div className="hf-aboutpage__sec-head">
            <span className="hf-eyebrow" style={{color: 'var(--hf-orange)'}}>PROCESS</span>
            <h2 className="hf-aboutpage__h2">How a <em>shoot goes.</em></h2>
          </div>
          <ol className="hf-process">
            <li className="hf-process__step">
              <span className="hf-process__label">BEFORE</span>
              <div>
                <h3 className="hf-process__title">Pre-production.</h3>
                <p>Scout, references, lighting plan. We talk through the brief, lock the visual approach, and build a shot list with room to breathe when something better shows up on the day.</p>
              </div>
            </li>
            <li className="hf-process__step">
              <span className="hf-process__label">ON SET</span>
              <div>
                <h3 className="hf-process__title">The day.</h3>
                <p>Precision first, presence second. Every setup is intentional — and when the moment changes, the camera follows. One DP means decisions move at the speed of the room, not the speed of a department meeting.</p>
              </div>
            </li>
            <li className="hf-process__step">
              <span className="hf-process__label">AFTER</span>
              <div>
                <h3 className="hf-process__title">Finishing.</h3>
                <p>Color landed in camera means post is for the cut, not for fixing. Quick turnover, clean handoff to your editor or finishing house.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="hf-aboutpage__where" data-screen-label="Where & gear">
        <div className="hf-aboutpage__inner">
          <div className="hf-aboutpage__where-grid">
            <div>
              <span className="hf-eyebrow" style={{color: 'var(--hf-orange)'}}>BASED</span>
              <h2 className="hf-aboutpage__h2">NJ. NYC.<br/><em>Anywhere on location.</em></h2>
              <p className="hf-aboutpage__body">Home base is New Jersey, working out of NYC most days. Travel anywhere the project goes — domestic and international. Day rates and crew packages adjust to the shoot.</p>
            </div>
            <div className="hf-aboutpage__gear">
              <span className="hf-eyebrow" style={{color: 'var(--hf-orange)'}}>EQUIPMENT</span>
              <h3 className="hf-aboutpage__gear-title">Gear matched to the project.</h3>
              <p className="hf-aboutpage__body">No pre-committed kit. Camera bodies, lenses, lighting, grip — chosen for the brief and the budget. Full equipment list available on request.</p>
              <div className="hf-aboutpage__gear-cta">
                <LinkArrow onClick={() => setRoute('contact')}>Request equipment notes</LinkArrow>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

window.About = About;
window.AboutPage = AboutPage;
window.CtaStrip = CtaStrip;
