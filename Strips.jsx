/* global React */

function Marquee() {
  const items = [
    'MTV', 'VIACOM', 'FOOD NETWORK', 'THE DAILY SHOW', "WOMEN'S HEALTH",
    'LOGO NETWORK', 'BRAVO', 'OWN', 'COMEDY CENTRAL', 'NY KNICKS',
  ];
  const all = [...items, ...items];
  return (
    <div className="hf-marquee" aria-hidden="true">
      <div className="hf-marquee__track">
        {all.map((c, i) => (
          <span key={i} className="hf-marquee__item">
            <span className="hf-marquee__sep"></span>
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

function Stats() {
  return (
    <section className="hf-stats" data-screen-label="Stats">
      <div className="hf-stats__inner">
        <div className="hf-stat">
          <div className="hf-stat__num"><em>15+</em></div>
          <span className="hf-stat__label">Years behind the lens</span>
        </div>
        <div className="hf-stat">
          <div className="hf-stat__num">120+</div>
          <span className="hf-stat__label">Broadcast & brand projects</span>
        </div>
        <div className="hf-stat">
          <div className="hf-stat__num">10</div>
          <span className="hf-stat__label">Network credits including MTV, Viacom, Food Network</span>
        </div>
        <div className="hf-stat">
          <div className="hf-stat__num"><em>1</em></div>
          <span className="hf-stat__label">DP. One eye. One studio.</span>
        </div>
      </div>
    </section>
  );
}

window.Marquee = Marquee;
window.Stats = Stats;
