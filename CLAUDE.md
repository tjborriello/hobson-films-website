# CLAUDE.md — context for Claude Code sessions

This file is for an AI coding assistant. The user (TJ) is non-technical and is maintaining this site on behalf of the subject (Rob Hobson, Director of Photography).

## Stack — read carefully

This is an intentionally **buildless** static site:

- HTML + CSS + `.jsx` files served directly from the repo root
- React + Babel-standalone are loaded from `unpkg.com` via `<script>` tags in `index.html`
- Each `.jsx` file is loaded with `<script type="text/babel" src="...jsx">` and compiled in the browser at runtime
- Components attach themselves to `window` (e.g. `window.Hero = Hero`) so subsequent script tags can reference them by name. There are **no ES modules and no `import` statements**.
- Portfolio data + localStorage helpers live in `data.jsx`
- Fonts in `fonts/`, images in `assets/` (logo, portrait, project thumbnails in `assets/thumbs/`)

**Do NOT add:** a bundler, package.json with build scripts, TypeScript, Vite/Webpack/esbuild, ES module `import` statements, or any compilation pipeline. The architecture's whole point is that the repo deploys as-is to a static host with zero build step. If a change feels like it requires tooling, push back and discuss before touching it.

## File map

- `index.html` — main site entry, defines the `<App>` shell and routes (home / work / about / project / contact)
- `print.html` — paginated print-friendly variant for PDF export
- `site.css` — main styles (~1300 lines)
- `colors_and_type.css` — design tokens + typography
- `data.jsx` — `SEED_PROJECTS` array, `loadProjects` / `saveProjects` / `resetProjects` / `newProject`. `STORAGE_KEY` is currently `hobsonfilms.portfolio.v7`.
- Component `.jsx` files (one component per file): `Buttons`, `Header`, `Footer`, `Hero`, `Strips` (Marquee + Stats), `WorkGrid`, `ProjectDetail`, `ReelOverlay`, `VimeoModal`, `ContactForm`, `About`, `Admin` (AdminBar + ProjectEditor)
- `assets/`, `fonts/` — static assets
- `.gitignore`, `README.md` (user-facing), `CLAUDE.md` (this file)

## Workflow

1. **Local preview first.** Spin up `python -m http.server 5173` in a background terminal and iterate at <http://localhost:5173>. If Python isn't installed on this machine, the fallback is the PowerShell HttpListener script at `C:\Users\tjbor\AppData\Local\Temp\hobson-serve.ps1` (run with `powershell -NoProfile -ExecutionPolicy Bypass -File <path>`). VS Code Live Server also works.
2. **Don't commit every keystroke.** Iterate locally, refresh the browser, until a change is actually done. Then commit.
3. **`main` is the published branch.** Cloudflare Pages auto-deploys every push to `main` in ~30–90 seconds. There is no staging branch.
4. **Commit & push convention** — see "Commit conventions" below.
5. **Content-only updates** (adding/reordering portfolio projects): TJ usually uses the in-page admin (Cmd+E / Ctrl+E), drags/edits, then clicks **Export JSON**. The JSON is what becomes the new `SEED_PROJECTS` in `data.jsx`. If `data.jsx` shows surprise diffs, that's likely why.

## Commit conventions

- Use a **HEREDOC** for commit messages — never the `-m "..."` shorthand for multi-line commits.
- Always pass `git -c core.autocrlf=false commit ...` to suppress the Windows CRLF-warning noise.
- Trailer: `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>`
- Bash CWD does NOT persist across tool turns — every Bash invocation must `cd /c/Users/tjbor/hobson-films-website` first, or use `git -C`.

```bash
cd /c/Users/tjbor/hobson-films-website && git add <files> && git -c core.autocrlf=false commit -m "$(cat <<'EOF'
Short subject line (<=72 chars)

Optional body.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)" && git push origin main
```

## Hero scroll-locked camera animation

The hero has a scroll-driven background animation: an exploded ARRI Alexa Mini LF camera assembles as the user scrolls.

**Architecture:**
- `assets/hero-frames/frame-0001.jpg` … `frame-0073.jpg` — 73 JPEG frames at 1024×576, ~60 KB each, ~4.3 MB total. Extracted from a 6s/24fps AI-generated source video by taking every 2nd frame.
- `HeroScrollBg.jsx` — preloads all 73 frames as `Image()` objects, draws the current frame to a `<canvas>` based on scroll progress through the wrap. Uses rAF throttling and falls back to the nearest loaded frame if a target frame isn't yet decoded. Honors `prefers-reduced-motion` (pins to final frame, no scroll listener).
- `Hero.jsx` — wraps the `<section class="hf-hero">` in a taller `<div class="hf-hero-wrap">` so the hero can be `position: sticky; top: 0` while the wrap scrolls underneath.
- `site.css` — `.hf-hero-wrap` defines two CSS variables that control the pin/animation timing:
  - `--hf-hero-anim` (currently `200vh`) — scroll distance over which the camera assembles. ~100px per wheel tick on 1080p, so 200vh ≈ 20 ticks.
  - `--hf-hero-hold` (currently `50vh`) — extra pin time after animation completes (assembled camera shows briefly before page unsticks).
  - Wrap height = `calc(100vh + var(--hf-hero-anim) + var(--hf-hero-hold))`.

**Tuning:** to change pacing, only the two CSS variables need editing. The JS reads `--hf-hero-anim` from the wrap element's computed style and uses it to calculate progress. Don't hardcode values in the JSX; keep them in CSS.

**The source video** (`hero-source.mp4`) is `.gitignore`-d. Only the extracted frames are committed. To regenerate frames from a new source:
1. Drop the new `hero-source.mp4` in the repo root
2. Run: `ffmpeg -i hero-source.mp4 -vf "select='not(mod(n,2))',setpts=N/FRAME_RATE/TB,scale=1024:-2" -fps_mode vfr -q:v 4 assets/hero-frames/frame-%04d.jpg`
3. Update `HERO_BG_FRAME_COUNT` in `HeroScrollBg.jsx` if the new source has a different total

**FFmpeg installed location** on this Windows machine: `C:\Users\tjbor\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1-full_build\bin\ffmpeg.exe`. Path may not be in shell PATH after a fresh terminal — invoke by full path or restart shell.

## Cache-busting on visible changes

When CSS or `data.jsx` changes affect what visitors see:

- **CSS edits** → bump `site.css?v=NN` in **both** `index.html` and `print.html` (they often drift out of sync — check both).
- **`data.jsx` seed changes** → bump `STORAGE_KEY` from `vN` to `vN+1` and add the previous `vN` to the migration cleanup list inside `loadProjects()`. This forces existing visitors' localStorage to refresh on next load. Without this, anyone who's already loaded the site keeps seeing the old data forever.

## Known open items (waiting on Rob's input — do not start without authorization)

1. **Contact form does nothing.** `ContactForm.jsx` `onSubmit` just sets `sent: true` and discards the data. Decision pending on backend (Web3Forms / Formspree / Cloudflare Pages Function) and recipient email.
2. **Placeholder contact info on the contact page**: email `rob@hobsonfilms.com` (unverified), phone `+1 (212) 555 0184` (a 555 fake), and "REPLIES WITHIN 24 HOURS" copy.
3. **Vimeo videos return "Because of its privacy settings, this video cannot be played here."** — privacy/embed settings on each Vimeo video are owned by Rob. Free Vimeo plan limits domain-allowlist features.

## Hosting

- Local: `C:\Users\tjbor\hobson-films-website\`
- GitHub: <https://github.com/tjborriello/hobson-films-website> (private)
- Cloudflare Pages: dashboard → Workers & Pages → `hobson-films-website`. Auto-deploys from `main`. There's a Cloudflare-managed branch `cloudflare/workers-autoconfig` on origin — leave it alone, it's for their integration.
