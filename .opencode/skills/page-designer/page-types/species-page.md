# Species page

One species per file in `content/species/`, filename in English kebab-case
(`pedunculate-oak.md`), `title` in Hungarian, URL `/species/<filename>/`. Do not
set `template`: `content/species/_index.md` applies `tree-page.html` to every
page and hides the section index with `render = false`.

The template renders, in order: the Adatlap panel (front matter), the page header
(`latin` as eyebrow, `title`, `description` as lead), the Markdown body, and the
Állapot panel (`date`, `verified_by`).

## Front matter

```toml
+++
title = "Kocsányos tölgy"
description = "A kocsányos tölgy (Quercus robur) Európa egyik legjellemzőbb lombos fája: hosszú életű, kemény fájú, a síkvidéki és dombvidéki erdők meghatározó faja."
date = 2026-10-24

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
other = ["Európán kívül parkokban telepített"]

[extra.linnaean]
kingdom = "Növények (Plantae)"
division = "Zárvatermők (Magnoliophyta)"
class = "Kétszikűek (Magnoliopsida)"
order = "Bükkfavirágúak (Fagales)"
family = "Bükkfafélék (Fagaceae)"
genus = "Tölgy (Quercus)"
species = "Kocsányos tölgy (Quercus robur)"

[extra.cladistic]
clades = [
    "Angiospermae",
    "Eudicotyledoneae",
    "Superrosidae",
    "Rosidae",
    "Fabidae",
    "Fagales",
    "Fagaceae",
    "Quercoideae",
    "Quercus",
    "Quercus robur",
]
+++
```

### Field rules

- All seven `linnaean` ranks are required and formatted `"Hungarian (Latin)"`.
  Each row links to the group page whose `extra.latin` appears in the value;
  kingdom to genus normally resolve to a group, the `species` row falls back to
  the rank explainer. Ordering is fixed: kingdom, division, class, order, family,
  genus, species.
- `clades` are Latin only, ordered broad → species, following APG IV. Include the
  family, subfamily and genus even when they repeat a Linnéi rank.
- `extra.family` must be byte-identical to `extra.linnaean.family`; the Adatlap
  shows one and the Rendszertan block the other.
- `origin` is the short place of origin printed on the right of each catalogue
  row. Keep it consistent with `distribution.native`; for a hybrid use a
  descriptive value such as `Kertészeti hibrid`.
- `distribution.native` / `distribution.other` are optional list keys. `native`
  means őshonos occurrences, `other` means non-native ones such as ornamental
  plantings. A legacy scalar `distribution = "…"` still renders as one value but
  do not use it for new pages.
- `height` and `lifespan` are en-dash ranges with units (`25–40 m`,
  `400–600 év`). If a value is genuinely unknown, omit the key — the Adatlap
  drops the row.
- `description` becomes the lead paragraph: one full Hungarian sentence naming
  the species and what makes it notable.
- `date` is the last real revision date, written bare (`2026-10-24`).
- `verified_by = "AI"` unless a person reviewed the page; see `CONTRIBUTING.md`.

## Body

Exactly three `##` sections, in this order, after one intro paragraph. All
existing species follow it, and the anchors are stable because the glossary and
other articles rely on them.

```markdown
A kocsányos tölgy a Kárpát-medence legtekintélyesebb [őshonos](@/glossary.md#oshonos) fái közé tartozik. Neve onnan ered, hogy makktermése hosszú kocsányon függ.

## Megjelenése {#appearance}

Kérge, levelei, koronája, termése — mit lát a járókelő.

## Élőhelye {#habitat}

Talaj, víz, fény, társulások, magassági öv.

## Jelentősége {#importance}

Faanyag, termés, élőhely más fajoknak, kultúrtörténet.
```

- No `h1` — the template prints it.
- No source list, no "További információk" block: external references belong on
  the Hivatkozások page.
- Link the first occurrence of each botanical or ecological term to its glossary
  anchor (`[karéjos](@/glossary.md#karej)`) and do not explain it again in the
  article. Copy the anchor from `content/glossary.md`; some contain accents.
- Link other species as `@/species/<filename>.md`, not by URL.
- Keep one idea per paragraph, 2–4 sentences, neutral encyclopaedic tone.

## After writing

1. `zola check` — catches broken `@/` links and missing glossary anchors.
2. Confirm the new page appears in `/fajok/`: `filter.js` searches the
   `data-search` string built by `species-list.html` from `title`, `english`,
   `latin`, `origin`, `family`, `distribution`, all `linnaean` values and
   `clades`. A typo in front matter silently makes the page unfindable, but a
   missing field does not break the build.
3. Check that the Adatlap shows Elterjedés, and the Rendszertan block shows both
   systems — if not, a table is missing or misspelled.
