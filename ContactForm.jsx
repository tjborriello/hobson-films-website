/* global React, PrimaryBtn, OutlineBtn */
const { useState: useStateCF, useEffect: useEffectCF, useRef: useRefCF } = React;

// Web3Forms access key is meant to be public (the access key is a form-routing
// identifier, not a secret — Web3Forms verifies submissions via origin +
// Turnstile + honeypot). Inline it here rather than pretending it's an env var.
const HF_WEB3FORMS_KEY = '1a8a5374-4e29-4e49-b661-0ccca23bfca6';
const HF_TURNSTILE_SITE_KEY = '0x4AAAAAADUhXvT-1dDKyW79';
const HF_FORM_INITIAL = { name: '', email: '', type: 'Music video', when: '', brief: '' };

function ContactForm() {
  const [sent, setSent] = useStateCF(false);
  const [form, setForm] = useStateCF(HF_FORM_INITIAL);
  const [submitting, setSubmitting] = useStateCF(false);
  const [error, setError] = useStateCF(null);
  const turnstileContainerRef = useRefCF(null);
  const turnstileWidgetIdRef = useRefCF(null);
  const upd = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  // Explicitly render the Turnstile widget once mounted (and re-render on
  // "Send another" after a successful submission). Turnstile's auto-render
  // does NOT pick up dynamically-added widgets in SPAs — we have to call
  // window.turnstile.render() ourselves and poll until the api.js script
  // finishes loading.
  useEffectCF(() => {
    if (sent) return;
    if (turnstileWidgetIdRef.current !== null) return;
    let cancelled = false;
    const tryRender = () => {
      if (cancelled) return;
      if (!turnstileContainerRef.current) return;
      if (window.turnstile && typeof window.turnstile.render === 'function') {
        try {
          turnstileWidgetIdRef.current = window.turnstile.render(turnstileContainerRef.current, {
            sitekey: HF_TURNSTILE_SITE_KEY,
            theme: 'light',
          });
        } catch (err) {
          console.error('Turnstile render failed:', err);
        }
      } else {
        setTimeout(tryRender, 100);
      }
    };
    tryRender();
    return () => {
      cancelled = true;
      if (window.turnstile && turnstileWidgetIdRef.current !== null) {
        try { window.turnstile.remove(turnstileWidgetIdRef.current); } catch (_) {}
        turnstileWidgetIdRef.current = null;
      }
    };
  }, [sent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    // Critical: build FormData from the form element so Turnstile's hidden
    // cf-turnstile-response input + the honeypot are auto-included. Using
    // `new FormData()` alone (no arg) silently drops both and Web3Forms
    // rejects with "Turnstile Captcha Token is mandatory for this form".
    const data = new FormData(e.currentTarget);
    data.append('access_key', HF_WEB3FORMS_KEY);
    data.append('from_name', 'Hobson Films website');
    data.append('subject', `New project inquiry — ${form.type || 'General'}`);
    data.append('message',
      `Project type: ${form.type}\n` +
      `When: ${form.when || 'not specified'}\n\n` +
      `Tell me about it:\n${form.brief}\n\n` +
      `— ${form.name}\n${form.email}`
    );
    // BCC is configured in the Web3Forms dashboard (Pro plan). Don't append
    // bcc_email here or TJ gets duplicate copies.

    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data });
      const json = await res.json();
      if (json.success) {
        setSent(true);
      } else {
        setError(json.message || 'Could not send. Please email hobsontv@gmail.com directly.');
        // Turnstile tokens are single-use; reset so the user can retry.
        if (window.turnstile && turnstileWidgetIdRef.current !== null) {
          try { window.turnstile.reset(turnstileWidgetIdRef.current); } catch (_) {}
        }
      }
    } catch (err) {
      setError('Could not reach the form service. Please email hobsontv@gmail.com directly.');
      if (window.turnstile && turnstileWidgetIdRef.current !== null) {
        try { window.turnstile.reset(turnstileWidgetIdRef.current); } catch (_) {}
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="hf-contact" data-screen-label="Contact">
      <div className="hf-contact__inner">
        <div className="hf-contact__intro">
          <span className="hf-eyebrow" style={{color: 'var(--hf-orange)'}}>START A PROJECT</span>
          <h2 className="hf-contact__title">Tell me<br/><em>about it.</em></h2>
          <p className="hf-contact__lead">Booking music videos, broadcast, sports, and brand work. I usually reply within a day. Day rates and crew packages on request.</p>
          <div className="hf-contact__direct">
            <div><div className="hf-meta">EMAIL</div><a className="hf-contact__direct-val hf-contact__direct-val--link" href="mailto:hobsontv@gmail.com" style={{color: 'var(--hf-orange)'}}>hobsontv@gmail.com</a></div>
            <div><div className="hf-meta">INSTAGRAM</div><a className="hf-contact__direct-val hf-contact__direct-val--link" href="https://www.instagram.com/hobsonfilms" target="_blank" rel="noopener noreferrer">@hobsonfilms ↗</a></div>
            <div><div className="hf-meta">BASED</div><div className="hf-contact__direct-val">NY / NJ</div></div>
            <div><div className="hf-meta">SHOOTS</div><div className="hf-contact__direct-val">Anywhere on location</div></div>
          </div>
        </div>
        <form className="hf-form" onSubmit={handleSubmit}>
          {sent ? (
            <div className="hf-form__sent">
              <span className="hf-meta hf-meta--accent">SENT</span>
              <h3 style={{fontFamily: 'var(--font-display)', fontSize: 36, lineHeight: 1, letterSpacing: '-0.03em', margin: '12px 0 16px', fontWeight: 900}}>Got it.<br/>I'll be in touch soon.</h3>
              <button type="button" className="hf-link-arrow" onClick={() => { setSent(false); setForm(HF_FORM_INITIAL); setError(null); }}>Send another <span className="arrow">→</span></button>
            </div>
          ) : (
            <>
              <label><span>Name</span><input name="name" value={form.name} onChange={upd('name')} placeholder="Your name" required /></label>
              <label><span>Email</span><input name="email" type="email" value={form.email} onChange={upd('email')} placeholder="you@studio.com" required /></label>
              <label><span>Project type</span>
                <select name="type" value={form.type} onChange={upd('type')}>
                  <option>Music video</option>
                  <option>Broadcast / reality</option>
                  <option>Sports</option>
                  <option>Corporate / brand</option>
                  <option>On location</option>
                  <option>Other</option>
                </select>
              </label>
              <label><span>When</span><input name="when" value={form.when} onChange={upd('when')} placeholder="April 2026, 2 days" /></label>
              <label className="hf-form__full"><span>Tell me about it</span><textarea name="brief" rows="5" value={form.brief} onChange={upd('brief')} placeholder="Short brief, location, references."></textarea></label>
              {/* Honeypot — bots fill hidden fields, humans don't. */}
              <input type="checkbox" name="botcheck" tabIndex="-1" autoComplete="off" style={{display: 'none'}} />
              {/* Cloudflare Turnstile widget — rendered explicitly via useEffect above.
                  Min-height reserves space so the form layout doesn't shift when the
                  widget appears. */}
              <div ref={turnstileContainerRef} className="hf-form__full" style={{minHeight: '65px'}}></div>
              {error && (
                <p className="hf-form__full" style={{margin: 0, color: '#FF6B6B', fontSize: 14, lineHeight: 1.4}} role="alert">{error}</p>
              )}
              <div className="hf-form__actions">
                <PrimaryBtn type="submit" disabled={submitting}>{submitting ? 'Sending…' : 'Send →'}</PrimaryBtn>
                <span className="hf-meta">USUALLY REPLIES IN A DAY</span>
              </div>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
window.ContactForm = ContactForm;
