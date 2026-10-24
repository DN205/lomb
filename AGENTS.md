# AGENTS.md

## Project

Static site built with [Zola](https://www.getzola.org/) 0.23.4. No Node/package manager, no test or lint suite, no git repo checked in.

## Commands

- `zola serve` — dev server at http://127.0.0.1:1111 (rebuilds on change).
- `zola build` — regenerates `public/` from scratch.
- `zola check` — fast validation of templates, links and content; run after edits.

## Structure

- `content/species/` — tree species pages. Front matter uses TOML (`+++`), not YAML; facts go under `[extra]`.
- `content/species/_index.md` — section config; assigns `template = "tree.html"` and `page_template = "tree-page.html"`.
- `templates/base.html` — shared shell; `index.html`, `tree.html`, `tree-page.html` extend it.
- `templates/species-list.html` — Tera 2 component (`species.list`) that renders the filter and species list.
- `static/css/tree.css` — source stylesheet (plain CSS; `compile_sass = false`), linked globally from `base.html`.
- `static/js/filter.js` — client-side, accent-insensitive species filter for `#species-filter` / `#species-list`.
- `public/` — generated output. Never edit it directly, including `public/css/tree.css`; edit `static/` and rebuild.

## Gotchas

- This project uses Zola 0.23 / Tera 2: macros and `{% import %}` are gone. Components are global and called as `{{<name args />}}`; passing non-strings uses `{...}`, e.g. `{{<species.list pages={section.pages} />}}`.
- File names, CSS classes, IDs, JS identifiers and front matter keys are English; visible content and UI copy are Hungarian.
- Fonts are system stacks with serif/sans fallbacks; no webfonts are loaded.
- `zola.toml` uses placeholder `base_url = "https://example.com"`. `zola serve` overrides it; `public/search_index.en.js` may contain `127.0.0.1:1111` URLs from the last serve.
- `data/lomb.db` is an empty SQLite database not referenced by templates.
- `themes/` is empty; templates are site-local.
