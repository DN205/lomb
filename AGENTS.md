# AGENTS.md

## Project

Zola 0.23.4 static site (Hungarian tree-species database). No Node, no package manager, no test or lint suite — `zola check` is the only verification. Git repo on `main`; `public/` and `.DS_Store` are ignored.

## Commands

- `zola serve` — dev server at http://127.0.0.1:1111 (rebuilds on change).
- `zola build` — regenerates `public/` from scratch.
- `zola check` — validates templates, links and content; run after every edit.

## Structure

- `content/species/*.md` — one species per file. Filenames are English kebab-case (`pedunculate-oak.md`); `title` is Hungarian.
- `content/species/_index.md` — section config only: `page_template = "tree-page.html"`, `sort_by = "title"` (ordering follows Hungarian titles, not filenames), `render = false` so no `/species/` index is built.
- `templates/base.html` — shared shell; `index.html` and `tree-page.html` extend it, and a `body_class` block marks the home page for its layout. The home page is the only listing page and renders `species.list` from `get_section(path="species/_index.md")` inside a bordered `.home-shell` grid: introduction left, a menu panel linking to the taxonomy section right, and the search area (filter + scrolling list) across the bottom.
- `content/taxonomy/_index.md` — taxonomy section homepage (`/taxonomy/`), listing its two explainer pages.
- `content/taxonomy/linnea.md`, `content/taxonomy/cladistics.md` — Linnéi and kladisztikus rendszertan explainers; both use `templates/taxonomy-page.html`.
- `templates/taxonomy.html`, `templates/taxonomy-page.html` — section homepage with topic cards and the shared explainer layout (`.reference-sheet`: `.reference-page` plus a right-hand `.status-box`).
- `templates/tree-page.html` — three-column species sheet: `.fact-box` (Adatlap + Rendszertan) left, article body centre, `.status-box` (update date + verification) right. Both side panels are `position: sticky` and use the same dashed panel styling; the grid collapses to one column at 720 px, where the body comes first.
- `static/css/tree.css` — the only stylesheet (plain CSS, `compile_sass = false`). `public/css/tree.css` is build output; edit `static/` and rebuild.
- `static/js/filter.js` — accent-insensitive filter over `#species-filter` / `#species-list`; it also restores and rewrites the `?q=` URL parameter.
- `themes/` is empty; all templates are site-local.

## Species front matter

TOML between `+++`, not YAML. Alongside the `latin` / `english` / `origin` / `verified_by` / `family` / `height` / `lifespan` scalars, every page carries a `distribution` table and two taxonomy tables:

```toml
[extra.distribution]
native = ["A Balkán-félsziget"]
other  = ["Európában széles körben telepített"]

[extra.linnaean]
kingdom  = "Növények (Plantae)"
division = "Zárvatermők (Magnoliophyta)"
class    = "Kétszikűek (Magnoliopsida)"
order    = "Bükkfavirágúak (Fagales)"
family   = "Bükkfafélék (Fagaceae)"
genus    = "Tölgy (Quercus)"
species  = "Kocsányos tölgy (Quercus robur)"

[extra.cladistic]
clades = ["Angiospermae", "Eudicotyledoneae", "Superrosidae", "Rosidae",
          "Fabidae", "Fagales", "Fagaceae", "Quercoideae", "Quercus",
          "Quercus robur"]
```

- `linnaean` values are `"Hungarian (Latin)"`; `clades` are Latin-only, ordered broad → species (APG IV placement).
- `distribution.native` lists native locations and `distribution.other` lists non-native occurrences such as ornamental plantings; either key may be omitted. Both render under the "Elterjedés" fact-box entry as `Őshonos` / `Egyéb előfordulás`; a legacy scalar `distribution` still renders as a single value.
- `extra.origin` is the short place of origin shown at the right of each home-page search result; keep it consistent with `distribution.native` (for hybrids, use a descriptive value such as `Kertészeti hibrid`).
- `tree-page.html` renders both in the "Rendszertan" section and guards with `is defined`, so a new page without them still builds — but that silently drops the section.
- `extra.family` is still used by the fact box; keep it in sync with `extra.linnaean.family`.
- `extra.verified_by` feeds the right-hand status panel as `Verified by: <value>`; the template falls back to `AI` when the key is missing, so set `verified_by = "Human"` only once a person has actually reviewed the page.

## Commits

- Every new feature gets its own commit: implement, run `zola check`, then commit that feature alone. Do not fold unrelated changes into it.

## Gotchas

- Tera 2 (Zola 0.23): macros and `{% import %}` are gone. Components are defined as `{% component species.list(pages) %}…{% endcomponent %}` and called as `{{<species.list pages={section.pages} />}}` — non-string arguments must be wrapped in `{…}`.
- `zola.toml` has the placeholder `base_url = "https://example.com"`, which feeds permalinks and the sitemap. `zola serve` overrides it and leaves `127.0.0.1:1111` URLs in `public/search_index.en.js`; the build enables the search index but no template consumes it.
- English identifiers everywhere (filenames, front matter keys, CSS classes, ids, JS); Hungarian is the visible copy, with one exception: the status panel's `Verified by: …` line stays English. Content style uses en-dash ranges (`15–25 m`) and „…” quotes.
- Fonts are system stacks with serif/sans fallbacks; no webfonts are loaded.
