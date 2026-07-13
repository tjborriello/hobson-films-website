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

## Build recipe — hero frames (current, 97-frame era; repo CLAUDE.md's 73-frame recipe is stale)
Regenerating `assets/hero-frames/` from a new `hero-source.mp4` (source video via Higgsfield Seedance 2.0; NSFW filter false-positives on words like "explosion" in prompts):
```
ffmpeg -i hero-source.mp4 -vf "scale=1024:-2" -fps_mode passthrough -q:v 4 assets/hero-frames/frame-%04d.jpg
```
ffmpeg full path (often not on PATH): `C:\Users\tjbor\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1-full_build\bin\ffmpeg.exe`
After regenerating: `HERO_BG_FRAME_COUNT` in `HeroScrollBg.jsx` must match frame count on disk (currently 97: frame-0001..0097, cachebuster `?v=3`). Pin tuning: `--hf-hero-anim: 150vh`, `--hf-hero-hold: 25vh`.
