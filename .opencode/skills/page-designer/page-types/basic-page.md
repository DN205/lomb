# Basic pages

Pages that are not species or taxonomy: standalone root pages, the glossary, the
sources section and the catalogue. They all use the `.reference-sheet` layout
(a `.reference-page` plus a right-hand `.status-box`), so the differences are in
front matter and body structure, not in markup.

## Standalone page (`page.html`)

Used by `content/about.md` and `content/privacy.md`, reachable at `/<filename>/`
or at the `slug` when one is set.

```toml
+++
title = "Névjegy"
description = "Mi a Lomb, kinek készül, hogyan készülnek az adatai, milyen licenc alatt használható, és hogyan lehet kapcsolatba lépni a szerzővel."
date = 2026-10-26
template = "page.html"

[extra]
verified_by = "AI"
+++
```

- `template = "page.html"` is required: these files sit at the content root,
  outside any section, so nothing else assigns a template.
- `description` is the lead paragraph under the `h1`.
- Always set `date`: the status panel prints `page.date`, and when the key is
  missing Zola falls back to the file's modification time, which changes on
  every checkout. (`privacy.md` currently omits it and shows an mtime-derived
  date.)
- Body: `##` sections only. The eyebrow is the literal `Lomb`, the title comes
  from front matter, so no `h1` and no duplicate intro.
- The page ends at the body — `page.html` adds no navigation, so a page that
  needs "back" links or cross-links has to spell them out as Markdown links.
- Typical sections for about/privacy: what the site is, who it is for, how data
  is produced, licence, contact / data handling. Keep the licence and AI
  disclosure wording aligned with the shared footer in `templates/base.html`.

## Glossary (`glossary.html`)

`content/glossary.md`, `template = "glossary.html"`, URL `/glossary/`.

- Structure is load-bearing: `glossary.html` builds the sticky left-hand
  `aside.fact-box.glossary-nav` from `page.toc`, one labelled group per `##`
  heading, one link per `###` child. A term under the wrong `##` lands in the
  wrong group; a term without a `###` heading never appears in the index.
- Entry shape:

  ```markdown
  ## Termések

  ### Makk {#makk}

  A tölgy, a bükk és a gesztenye jellegzetes, egy magot tartalmazó, fásodó
  burkolatú termése.
  ```

- The `{#anchor}` is required and must be unique and stable: species articles
  link `[makk](@/glossary.md#makk)`. Existing anchors are hand-written and
  mostly accent-free, but a few keep accents (`#csonthéjas-termes`) — copy the
  anchor, never retype it from the term.
- Add a term to an existing `##` topic rather than opening a new one; the five
  topics are Termések, Virágok és virágzatok, Levelek, Szaporodás és életmód,
  Ökológia és természetvédelem.
- One or two sentences, Hungarian, no Latin synonym in the heading unless the
  Latin name is the common one (`Szárnyas termés (szamara)`).
- When you add an entry, the matching articles may now link it; do not go back
  and re-link every species page.

## Sources section

- `content/sources/_index.md` is a section: `template = "sources.html"`,
  `page_template = "sources-page.html"`, `sort_by = "weight"`, and
  `[extra] updated = "2026-10-25"` + `verified_by`. Sections expose `extra.updated`
  (the template reads that), not `date`.
- `content/sources/references.md` is a child page with `weight = 10`, the normal
  `date` and no `template` (the section's `page_template` supplies it).
- The index explains the linking policy; the references page lists literature,
  online databases and AI terms. Only add sources that were actually consulted —
  the species pages must be traceable to this list.

## Catalogue (`species-index.html`)

`content/species-index.md` with `slug = "fajok"` (so the URL is `/fajok/`),
`template = "species-index.html"`. The body is optional short intro text above
the filter; the listing itself comes from the `species.list` component in
`templates/species-list.html`, fed by `get_section(path="species/_index.md")`.

- Do not hand-write result rows: the component emits the `data-search` attribute
  that `static/js/filter.js` searches, plus the display-limit buttons and the
  empty state.
- If you add a front-matter field that should be searchable, extend the
  `data-search` expression in `species-list.html`, not the Markdown.
- The taxonomy equivalent lives in `templates/taxonomy.html` with
  `taxonomy-filter.js` and `data-taxonomy-limit` buttons.

## When a new template is warranted

Reuse `page.html` if the page is prose plus the status panel. Create a new
template only when the page needs a different structure (extra panel, listing,
generated nav). Then:

1. Add `templates/<name>.html` extending `base.html`, with the standard
   `title`/`description` blocks and the `.status-box` panel.
2. Point to it with `template = "<name>"` on a page, or `page_template` on a
   section.
3. Add any new classes to `static/css/tree.css` (see `../style.md`).
4. If the page type is new, add it to the table in `../SKILL.md` and to
   `AGENTS.md`.

## Verify

- `zola check` for links and anchors.
- `zola serve`: the status panel renders the update date and the human-review
  line, and the glossary index lists every new entry under the right topic.
- Internal links use `@/path.md`; external links are collected on Hivatkozások.
