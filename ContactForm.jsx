/* global React, PrimaryBtn, OutlineBtn */
const { useState: useStateCF } = React;

function ContactForm() {
  const [sent, setSent] = useStateCF(false);
  const [form, setForm] = useStateCF({ name: '', email: '', type: 'Music video', when: '', brief: '' });
  const upd = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  return (
    <section className="hf-contact" data-screen-label="Contact">
      <div className="hf-contact__inner">
        <div className="hf-contact__intro">
          <span className="hf-eyebrow" style={{color: 'var(--hf-orange)'}}>START A PROJECT</span>
          <h2 className="hf-contact__title">Tell me<br/><em>about it.</em></h2>
          <p className="hf-contact__lead">Booking music videos, broadcast, sports, and brand work. Replies within 24 hours. Day rates and crew packages on request.</p>
          <div className="hf-contact__direct">
            <div><div className="hf-meta">EMAIL</div><div className="hf-contact__direct-val" style={{color: 'var(--hf-orange)'}}>rob@hobsonfilms.com</div></div>
            <div><div className="hf-meta">PHONE</div><div className="hf-contact__direct-val">+1 (212) 555 0184</div></div>
            <div><div className="hf-meta">BASED</div><div className="hf-contact__direct-val">NY / NJ</div></div>
            <div><div className="hf-meta">SHOOTS</div><div className="hf-contact__direct-val">Anywhere on location</div></div>
          </div>
        </div>
        <form className="hf-form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
          {sent ? (
            <div className="hf-form__sent">
              <span className="hf-meta hf-meta--accent">SENT</span>
              <h3 style={{fontFamily: 'var(--font-display)', fontSize: 36, lineHeight: 1, letterSpacing: '-0.03em', margin: '12px 0 16px', fontWeight: 900}}>Got it.<br/>I'll be in touch within a day.</h3>
              <button type="button" className="hf-link-arrow" onClick={() => { setSent(false); setForm({ name:'', email:'', type:'Music video', when:'', brief:'' }); }}>Send another <span className="arrow">→</span></button>
            </div>
          ) : (
            <>
              <label><span>Name</span><input value={form.name} onChange={upd('name')} placeholder="Your name" required /></label>
              <label><span>Email</span><input type="email" value={form.email} onChange={upd('email')} placeholder="you@studio.com" required /></label>
              <label><span>Project type</span>
                <select value={form.type} onChange={upd('type')}>
                  <option>Music video</option>
                  <option>Broadcast / reality</option>
                  <option>Sports</option>
                  <option>Corporate / brand</option>
                  <option>On location</option>
                  <option>Other</option>
                </select>
              </label>
              <label><span>When</span><input value={form.when} onChange={upd('when')} placeholder="April 2026, 2 days" /></label>
              <label className="hf-form__full"><span>Tell me about it</span><textarea rows="5" value={form.brief} onChange={upd('brief')} placeholder="Short brief, location, references."></textarea></label>
              <div className="hf-form__actions">
                <PrimaryBtn type="submit">Send →</PrimaryBtn>
                <span className="hf-meta">REPLIES WITHIN 24 HOURS</span>
              </div>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
window.ContactForm = ContactForm;
