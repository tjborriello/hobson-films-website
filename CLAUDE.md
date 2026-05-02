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
