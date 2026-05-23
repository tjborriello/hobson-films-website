/* global React */

function Footer({ setRoute }) {
  return (
    <footer className="hf-footer" data-screen-label="Footer">
      <div className="hf-footer__inner">
        <div className="hf-footer__top">
          <div>
            <div className="hf-footer__brand-line">
              <img src="assets/hobson-films-logo-light.png" alt="Hobson Films" />
            </div>
            <h3 className="hf-footer__tag">Capturing your <em>world.</em></h3>
          </div>
          <div className="hf-footer__cols">
            <div>
              <div className="hf-footer__label">Studio</div>
              <button onClick={() => setRoute('home')}>Home</button>
              <button onClick={() => setRoute('work')}>Work</button>
              <button onClick={() => setRoute('about')}>About</button>
              <button onClick={() => setRoute('contact')}>Contact</button>
            </div>
            <div>
              <div className="hf-footer__label">Credits</div>
              <span style={{fontSize: 14}}>MTV</span>
              <span style={{fontSize: 14}}>Viacom</span>
              <span style={{fontSize: 14}}>Food Network</span>
              <span style={{fontSize: 14}}>The Daily Show</span>
              <span style={{fontSize: 14}}>LOGO Network</span>
            </div>
            <div>
              <div className="hf-footer__label">Follow</div>
              <a href="https://www.instagram.com/hobsonfilms" target="_blank" rel="noopener noreferrer">Instagram ↗</a>
              <a href="https://vimeo.com/user5534744" target="_blank" rel="noopener noreferrer">Vimeo ↗</a>
            </div>
            <div>
              <div className="hf-footer__label">Booking</div>
              <a href="mailto:hobsontv@gmail.com" style={{fontSize: 14, color: 'var(--hf-orange)'}}>hobsontv@gmail.com</a>
              <span style={{fontSize: 14, color: 'var(--fg-muted)'}}>NJ / NYC</span>
            </div>
          </div>
        </div>
        <div className="hf-footer__base">
          <span className="hf-meta">© 2026 HOBSON FILMS INC · NJ / NYC</span>
          <span className="hf-meta">DESIGNED &amp; SHOT IN HOUSE</span>
        </div>
      </div>
    </footer>
  );
}
window.Footer = Footer;
