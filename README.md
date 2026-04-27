# Hobson Films Website

Portfolio site for Rob Hobson, Director of Photography.

Static site — no build step. Components are JSX files compiled in the browser via Babel-standalone. Deploy any folder-of-files to a static host and it works.

## Local preview

Static hosts won't load `file://` correctly because of the cross-origin script tags. Serve over HTTP locally:

```sh
# Python (any modern install)
python -m http.server 5173

# or Node
npx serve .
```

Then open http://localhost:5173.

## Project layout

- `index.html` — main site entry
- `print.html` — paginated print-friendly variant of the same content
- `site.css`, `colors_and_type.css` — styles
- `data.jsx` — portfolio data and localStorage helpers (12 seed projects + Jura)
- `*.jsx` — React components loaded directly by `index.html` via `<script type="text/babel" src="...">`
- `assets/` — logo, portrait, project thumbnails
- `fonts/` — Montserrat variable fonts

## Editing the portfolio

The site has a hidden admin mode. Press **Cmd+E** (or **Ctrl+E**) on any page to reveal:

- Add project, edit existing tiles, drag to reorder
- Per-project Vimeo URL/ID field
- Export the portfolio as JSON for backup
- Reset to seed

Edits are stored in your browser's localStorage. Use **Export JSON** to capture them and commit `data.jsx` updates back to the repo when you want to make them permanent.

## Deploying

Any static host works. Point it at the repo root.

- **Cloudflare Pages** — connect this GitHub repo, leave build command empty, set output directory to `/`.
- **Netlify** — same, empty build command, publish directory `.`.
- **Vercel** — import the repo as "Other" framework, no build, output directory `.`.
