# Lomb

Lomb is a Hungarian-language database of trees. It collects fact sheets on native and introduced trees, a botanical glossary, an introduction to taxonomy, and the background of the data behind the site.

The site is built with [Zola](https://www.getzola.org/) and deployed to GitHub Pages.

- **Live site:** <https://dn205.github.io/lomb/>
- **Issues and contributions:** <https://github.com/DN205/lomb>

## What is in the repository

| Path | Purpose |
| --- | --- |
| `content/species/` | One Markdown file per tree species, rendered with `tree-page.html` |
| `content/taxonomy/` | Linnéi and cladistic taxonomy explainers plus the seven rank pages |
| `content/glossary.md` | Botanical and ecological glossary |
| `content/sources/` | External links policy and the database references |
| `content/about.md`, `content/privacy.md` | Standalone root pages |
| `templates/` | All Tera templates (no theme is used) |
| `static/css/tree.css` | The single stylesheet |
| `static/js/filter.js` | Accent-insensitive species filter on the Fajok page (`/fajok/`) |
| `AGENTS.md` | Detailed repository conventions and gotchas |

## Requirements

- Zola **0.23.x** — developed with 0.23.4, CI builds with 0.23.6.

There is no Node.js, package manager, test suite or linter. `zola check` is the only verification step.

## Quick start

```sh
zola serve   # http://127.0.0.1:1111, rebuilds on change
zola build   # regenerates public/ from scratch
zola check   # validates templates, internal links and content
```

`public/` is build output and is ignored by Git. Do not edit it by hand.

## Adding a species

1. Create `content/species/<english-kebab-case>.md` (for example `pedunculate-oak.md`). The `title` must be the Hungarian name.
2. Fill in the front matter. TOML is used between `+++` markers, not YAML:

```toml
+++
title = "Kocsányos tölgy"
description = "A kocsányos tölgy (Quercus robur) Európa egyik legjellemzőbb lombos fája."
date = 2026-10-26

[extra]
latin = "Quercus robur"
english = "Pedunculate oak"
verified_by = "AI"
family = "Bükkfafélék (Fagaceae)"
height = "25–40 m"
lifespan = "400–600 év"
origin = "Európa"

[extra.distribution]
native = ["Európa sík- és dombvidéke"]
other = ["Más kontinenseken telepített"]

[extra.linnaean]
kingdom = "Növények (Plantae)"
division = "Zárvatermők (Magnoliophyta)"
class = "Kétszikűek (Magnoliopsida)"
order = "Bükkfavirágúak (Fagales)"
family = "Bükkfafélék (Fagaceae)"
genus = "Tölgy (Quercus)"
species = "Kocsányos tölgy (Quercus robur)"

[extra.cladistic]
clades = ["Angiospermae", "Eudicotyledoneae", "Superrosidae", "Rosidae",
          "Fabidae", "Fagales", "Fagaceae", "Quercoideae", "Quercus",
          "Quercus robur"]
+++
```

3. Write the article below the front matter. Connect the first occurrence of each botanical term to the glossary, for example `[makk](@/glossary.md#makk)`, instead of redefining it.
4. Run `zola check` and open the page with `zola serve`.

Notes on the front matter:

- `extra.origin` is the short place of origin shown in the search results on the Fajok page; keep it consistent with `distribution.native`.
- `extra.distribution.native` and `extra.distribution.other` are optional lists. A legacy scalar `distribution` still renders.
- `extra.family` must match `extra.linnaean.family`.
- `linnaean` values use the `"Hungarian (Latin)"` format; `clades` are Latin-only, ordered from broad to species.
- `verified_by = "Human"` may only be set after a person has actually reviewed the page. Anything else renders as *Ember ellenőrizte: Nem*. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Content conventions

- All visible copy is Hungarian. Filenames, front-matter keys, CSS classes, ids and JavaScript identifiers are English.
- Use en-dash ranges (`15–25 m`) and Hungarian quotes („…”).
- Internal links use Zola's `@/path.md` syntax; the build fails on broken ones.
- Keep claims traceable to the literature and online databases listed on the Hivatkozások page. Do not add sources that were not actually consulted.

## Licensing

The project uses two licenses:

- **Content** (`content/`, the text and data of the site): [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) — see `LICENSE-CONTENT`. Reuse is allowed for non-commercial purposes with attribution and under the same license.
- **Code** (templates, CSS, JavaScript, configuration): [MIT](https://opensource.org/licenses/MIT) — see `LICENSE`.

## AI and verification

The species texts are drafted with the help of a language model and checked against online databases. The status panel on every page states whether a human has reviewed it. AI output is not treated as a source, and AI-generated text must not be used to disguise copied material.

## Deployment

Every push to `main` triggers `.github/workflows/pages.yml`, which installs Zola 0.23.6, runs `zola build` and publishes `public/` to GitHub Pages. The workflow can also be started manually with `workflow_dispatch`.
