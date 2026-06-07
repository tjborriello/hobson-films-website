# Hobson Films — handoff

**What:** Portfolio site for Rob Hobson (DP). TJ maintains; Rob is client/subject.
**Stack:** HTML + CSS + React via Babel-standalone (no build step). **Status: 🟢 LIVE / migration complete.**
**Last worked:** 2026-05-23 · **Swept:** 2026-06-07 (verified live, HTTP 200).

## Where it lives
- Live: https://hobsonfilms.com (+ www) — CF Workers static assets, auto-deploys on push to `main`
- Repo: `tjborriello/hobson-films-website` (private) · Local: `C:\Users\tjbor\hobson-films-website\`
- Old `*.workers.dev` URL still resolves; hobsonfilms.com is canonical.

## Done
- Full Webflow→Workers migration complete; Webflow subscription decommissioned (2026-05-23).
- Contact form live (Web3Forms + Turnstile explicit-render). Recipient `hobsontv@gmail.com`.
- Real contact info, footer socials (IG `@hobsonfilms`, Vimeo user5534744), Vimeo per-video privacy.
- About page editorial expansion. Reel-2026 link removed site-wide (no reel exists).
- DNS cutover done (Squarespace registrar → CF nameservers; Workers Custom Domain apex+www; Always-HTTPS).

## Open / next
1. **Site-wide content review by Rob** — esp. About page principles/process copy (inferred from voice, not Rob's words).
2. **Live Instagram feed** — BLOCKED on Rob's correct IG login (creds he sent were wrong). Plan: Behold.so free tier → component between `<About />` and `<CtaStrip />`. Rob's IG likely needs Business/Creator + FB page link.

## Don't touch
- `data.jsx` edits: bump `STORAGE_KEY` (`v7`) on reorder; CSS cachebuster `site.css?v=37`; `.assetsignore` must exclude `.git/` (32MiB pack > CF 25MiB limit) — without it deploy fails.
