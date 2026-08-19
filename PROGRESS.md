## Portfolio sweep — 2026-08-05
**Git (verified this run):**
## 2026-08-12 — sitemap shipped + GSC submitted

- [DONE] sitemap.xml live — `curl -sL .../sitemap.xml` → HTTP 200 with 1 loc (homepage; print.html deliberately excluded); submitted in Search Console on tj@tjoncall.com → "Sitemap submitted successfully". Property was domain-verified 08-11 night (see reference_gsc_business_account).
```
$ git rev-parse --abbrev-ref HEAD   -> main
$ git log --oneline -5
4ecd47d docs: correct stale known-open-items in CLAUDE.md
59abb32 docs: portfolio sweep 2026-07-22 - verify state + refresh handoff
ffb3120 docs: bank current 97-frame hero regen recipe in PROGRESS
f585cbc docs: portfolio-sweep handoff (current state + open items)
bee0ebc Remove Reel 2026 link site-wide
$ git status --short                -> (empty, clean)
$ git log -1 --format=%cd --date=short -> 2026-07-22
$ git status -sb                    -> ## main...origin/main [ahead 3]
```
**Live (verified this run):** `curl -o /dev/null -w "%{http_code}" -L https://hobsonfilms.com` → **200**.
Body confirms correct site: `<title>Hobson Films — Capturing your world.</title>`.
`https://hobsonfilms.com/sitemap.xml` → **404** (confirms the "no sitemap" line in the SEO note is still true).

**Corrected this sweep:** the 2026-07-22 flag below ("repo CLAUDE.md open-items list is stale") is **RESOLVED** — commit `4ecd47d` trimmed it. CLAUDE.md now lists only the Vimeo-privacy item, which genuinely stays open because it lives in Rob's Vimeo account and cannot be verified from this repo. Auto-memory had also gone stale on this point and was rewritten.

**Push state:** local is **3 commits ahead of origin/main, unpushed by design.** All three are docs-only. Pushing this repo IS deploying (Cloudflare auto-deploys `main`), so a sweep never pushes.

**No code change since 2026-05-23.** Real last-worked date by git = 2026-07-22 (docs only).

**NEXT:** waiting on Rob (site-wide content review) → waiting on Rob (correct Instagram login for the live feed) → hand-review the site structure before any SEO work.

---

## Sweep 2026-07-22
**Git:** `main`, clean, HEAD `ffb3120` (2026-07-12, docs-only commit banking the hero regen recipe). Local is 1 commit ahead of `origin/main` (never pushed — that's fine, sweeps never push).
**Live:** https://hobsonfilms.com verified HTTP 200; body confirmed correct site (title, OG tags, Turnstile key all match repo).
**Since last sweep (2026-06-07):** no code changes, only the 07-12 docs commit. Open items below are unchanged.
**Flag (not fixed, out of doc-edit scope):** repo `CLAUDE.md` "Known open items" section (lines 84-88) is stale — items 1 (contact form non-functional) and 2 (placeholder contact info) were both fixed 2026-05-20/22, before even the prior sweep. Item 4 (footer social links go nowhere) was also fixed the same commit. Only items 3 (Vimeo embed privacy — already marked resolved below) and 5 (content review) still apply. TJ or a future session should trim CLAUDE.md's stale item list.

---

# Hobson Films — handoff

**What:** Portfolio site for Rob Hobson (DP). TJ maintains; Rob is client/subject.
**Stack:** HTML + CSS + React via Babel-standalone (no build step). **Status: 🟢 LIVE / migration complete.**
**Last worked:** 2026-07-12 (docs) / 2026-05-23 (last code change) · **Swept:** 2026-07-22 (verified live, HTTP 200).

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

## Eval — Session (2026-08-13, independent verification)

| Item | Claim | Verification command | Result |
|------|-------|----------------------|--------|
| sitemap.xml live | HTTP 200, 1 loc (homepage only, print.html excluded) | `curl -sS https://hobsonfilms.com/sitemap.xml` | Pass — 200, single `<url><loc>https://hobsonfilms.com/</loc></url>`, no print.html entry |
| Homepage live | hobsonfilms.com serves 200 | `curl -o /dev/null -w "%{http_code}" -L https://hobsonfilms.com` | Pass — 200 |
| GSC sitemap submitted successfully | Submitted on tj@tjoncall.com | `(no command available this session — no GSC MCP/browser tool connected; would need a GSC dashboard check on tj@tjoncall.com)` | Unverifiable |
| GSC property domain-verified 08-11 | Verified on tj@tjoncall.com | `(same — GSC dashboard only)` | Unverifiable |

**Verdict: SHIP** — the site-side claim (sitemap live, correct single-URL content) Passed exactly as described. The two GSC-dashboard claims are Unverifiable without a GSC/browser session; nothing contradicts them.

## Session 2026-08-18 — canonical fix + host consolidation (portfolio-wide pass)

Triggered by Google Search Console "new reasons prevent pages from being indexed" mail on 2026-08-17.
Full cross-site analysis lives in `C:/Users/tjbor/Claude/seo-engine/PROGRESS.md` (session 2026-08-18/19).

- [DONE] Absolute, self-referencing canonical on every page, byte-matched to this site's sitemap
  `<loc>` (same scheme, same host, same trailing-slash form). Verified live in the served HTML.
- [DONE] `www` → apex 301 Redirect Rule on the Cloudflare zone, plus Always Use HTTPS.
  Verified: 301 preserving path AND query, apex still 200, no loop, worst case one hop.

**WARN — Cloudflare mechanics, learned the hard way 2026-08-18:**
- A Workers/Pages Custom Domain binds apex AND www and redirects NEITHER. That default is why every
  page answered at four addresses and why Google filed duplicate-host warnings.
- **Page Rules do NOT work for this.** A `forwarding_url` Page Rule is accepted as `active` and never
  fires, because the Custom Domain serves the request first. Use a **Redirect Rule**
  (`http_request_dynamic_redirect` phase) — those run earlier. Token: `$CLOUDFLARE_RULES_TOKEN`.
- Point the redirect the SAME direction as the site's canonical. Check the canonical first.
- Full runbook with both API calls: `wiki/design/launch-checklist.md` section 2.

**SECURITY [DONE] — `PROGRESS.md` was publicly served on this domain at HTTP 200 until 2026-08-17.**
A Workers-assets site serves EVERY tracked file, and `.assetsignore` listed only individual docs.
Closed with a `*.md` glob; the hard rule now lives in this repo's rule file with its why.
Verify after any deploy: `curl -o /dev/null -w '%{http_code}' https://<domain>/PROGRESS.md` → 404.
