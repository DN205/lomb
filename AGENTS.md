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
- `templates/base.html` — shared shell; `index.html` and `tree-page.html` extend it. The home page is the only listing page and renders `species.list` from `get_section(path="species/_index.md")`.
- `static/css/tree.css` — the only stylesheet (plain CSS, `compile_sass = false`). `public/css/tree.css` is build output; edit `static/` and rebuild.
- `static/js/filter.js` — accent-insensitive filter over `#species-filter` / `#species-list`; it also restores and rewrites the `?q=` URL parameter.
- `themes/` is empty; all templates are site-local.

## Species front matter

TOML between `+++`, not YAML. Alongside the `latin` / `english` / `family` / `height` / `lifespan` / `distribution` scalars, every page carries two nested tables:

```toml
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
- `tree-page.html` renders both in the "Rendszertan" section and guards with `is defined`, so a new page without them still builds — but that silently drops the section.
- `extra.family` is still used by the fact box; keep it in sync with `extra.linnaean.family`.

## Gotchas

- Tera 2 (Zola 0.23): macros and `{% import %}` are gone. Components are defined as `{% component species.list(pages) %}…{% endcomponent %}` and called as `{{<species.list pages={section.pages} />}}` — non-string arguments must be wrapped in `{…}`.
- `zola.toml` has the placeholder `base_url = "https://example.com"`, which feeds permalinks and the sitemap. `zola serve` overrides it and leaves `127.0.0.1:1111` URLs in `public/search_index.en.js`; the build enables the search index but no template consumes it.
- English identifiers everywhere (filenames, front matter keys, CSS classes, ids, JS); Hungarian only in visible copy. Content style uses en-dash ranges (`15–25 m`) and „…” quotes.
- Fonts are system stacks with serif/sans fallbacks; no webfonts are loaded.
