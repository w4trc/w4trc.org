<!-- .github/copilot-instructions.md - guidance for AI coding agents working in this repo -->
# Repository DNA — immediate orientation

- This repository is a Hugo site built from the Hugoplate starter (Hugo + Tailwind CSS). Key technologies: Hugo (extended), Tailwind v4 CLI, Node, and Hugo Modules (go modules in `go.mod`).
- Primary entry points:
  - Site config: `hugo.toml` and `config/_default/params.toml`
  - Content: `content/english/` (site content lives here)
  - Theme: `themes/hugoplate/` (do not edit upstream theme files directly unless intentionally customizing)
  - Build output: `public/` (generated — do not edit)

# How to run and build (exact commands)

- Development (root): `npm run dev` — runs `hugo server`. Uses `hugo.toml` and site root.
- Example site (if you're using the exampleSite layout): `npm run dev:example` (runs `cd exampleSite && hugo server`). Workspace tasks may call `yarn dev:example`.
- Build (production): `npm run build` — runs `hugo --gc --minify --templateMetrics --forceSyncStatic`.
- Preview production build locally: `npm run preview`.
- Project-level helpers:
  - `npm run project-setup` — performs the project setup script in `scripts/projectSetup.js` (clones/moves theme/exampleSite). Run before `update-theme` in some workflows.
  - `npm run update-modules` — runs `scripts/clearModules.js` then `hugo mod` commands to update Hugo modules (use when module deps change).
  - `npm run update-theme` / `npm run theme-setup` — theme maintenance scripts under `scripts/`.
  - `npm run remove-darkmode` — removes dark mode assets via `scripts/removeDarkmode.js` (runs `yarn format` afterwards).
  - `npm run format` — runs Prettier (configured with `prettier-plugin-go-template` for Hugo templates).

# Important file & directory conventions (do not guess)

- `public/` is the generated site. Never hand-edit; changes belong in `layouts/`, `assets/`, `content/`, `data/` or `config/`.
- `assets/` holds source CSS/JS/images used by Hugo Pipes and Tailwind. `assets/css/custom.css` is the main CSS entry.
- `static/` contains files copied verbatim to the final site (put raw images, robots, favicons here if you don't want Hugo processing).
- `layouts/partials/` and `layouts/` contain templates — prefer editing partials for UI changes. Example: `layouts/partials/upcoming.html` implements upcoming event section.
- `data/` holds structured data (YAML/JSON) consumed by templates — e.g. `data/meetings.yaml`, `data/theme.json`.

# Project-specific patterns and gotchas

- Hugo Modules: the project uses Hugo modules (see `go.mod`) and a `scripts/update-modules` helper. When changing theme/module references run `npm run update-modules`.
- ExampleSite vs Root: this template includes an `exampleSite` workflow. If `project-setup` was run, the example site may have been moved into the repo root — check before running `dev:example`.
- Search index: `public/searchindex.json` is produced by Hugo templates and consumed by front-end search. To refresh, rebuild the site (dev or build).
- Tailwind: Tailwind is present in `devDependencies` and styles are authored under `assets/` and `tailwind-plugin/` (custom plugin files like `tailwind-plugin/tw-theme.js`). Use the standard `npm run dev` or build commands — Hugo Extended is required for asset processing.
- Formatting: Prettier is configured with `prettier-plugin-go-template`. Run `npm run format` to format templates and front-end code consistently.

# Deploy and CI entry points

- Deployment configs: `netlify.toml`, `vercel.json`, and `amplify.yml` are included. Mirror the build command in the chosen platform to `npm run build`.
- Static hosting: build produces `public/` which is the deployable artifact (set this as the publish directory in Netlify/Vercel).

# Quick examples for common edits

- Add a new blog post: create `content/english/blog/<slug>/index.md` with front matter and content. Use `layouts/_default/single.html` or `layouts/blog/single.html` for template changes.
- Change site title or social links: edit `hugo.toml` and `config/_default/params.toml` (params used by templates across the site).
- Update author images: place new images in `static/images/` (or `assets/images/` if you want Hugo processing). Update author frontmatter in `content/english/authors/`.

# When editing, validation checklist for AI edits

- Never modify `public/` directly.
- If a change affects templates, run `npm run format` after edits to keep templates consistent with Prettier rules.
- If a change touches modules/themes, run `npm run update-modules` and verify `npm run build` completes.
- Use `npm run dev` locally to verify visual changes quickly; use `npm run build` to verify production output.

# Useful files to open when reasoning about behavior

- `package.json` — scripts & devDependencies
- `hugo.toml` and `config/_default/params.toml` — site-level behavior
- `layouts/` and `layouts/partials/` — rendering logic
- `assets/css/custom.css` and `tailwind-plugin/` — styling system
- `scripts/` — project helper scripts (setup, theme update, removeDarkmode, clearModules)
- `go.mod` — Hugo modules and Go module versions

If any section is unclear or you want more examples (for example: how events are rendered from `data/meetings.yaml` into `layouts/events/`), tell me which area to expand and I'll iterate.
