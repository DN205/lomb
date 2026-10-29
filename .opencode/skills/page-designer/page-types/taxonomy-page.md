# Taxonomy pages

Three shapes, two templates. All live under `content/taxonomy/` and are sorted by
`weight` (`content/taxonomy/_index.md` sets `sort_by = "weight"`).

| Shape | Files | Template | `extra` |
| --- | --- | --- | --- |
| Explainer | `linnea.md`, `cladistics.md` | `taxonomy-page.html` | `group = "system"` |
| Rank | `kingdom/phylum/class/order/family/genus/species.md` | `taxonomy-page.html` | `group = "rank"`, `rank = "<key>"` |
| Group | `groups/<latin>.md` | `taxonomy-group.html` | `rank`, `latin`, ancestor Latin names |

The template owns the page header (eyebrow "Rendszertan", title, description as
lead), the status panel and the navigation. Never write an `h1` or your own
"Vissza a…" link in the body.

## Weights

`weight` is the only ordering; pick a number, not a position.

- Explainers: `10`, `20`.
- Rank pages: `30` kingdom, `40` phylum, `50` class, `60` order, `70` family,
  `80` genus, `90` species.
- Groups: one hundred per rank, sequential inside the block —
  `1xx` kingdom, `2xx` division, `3xx` class, `4xx` order, `5xx` family,
  `6xx` genus. New groups continue the sequence (`groups/quercus.md` = `623`).

## Explainer page

```toml
+++
title = "Linnéi rendszertan"
description = "A Linnéi rendszertan a növényeket egymásba ágyazott rangokba sorolja, és a fajok kétnevű, úgynevezett binomiális elnevezését használja."
date = 2026-10-25
weight = 10

[extra]
group = "system"
verified_by = "AI"
+++
```

- The body may start directly with `## Mi az a Linnéi rendszertan?`; no intro
  paragraph is required before the first heading.
- `taxonomy-page.html` appends a "További témák" nav listing the other pages with
  `group = "system"`, so do not repeat those links.
- Keep these pages conceptual. Concrete ranks belong on the rank pages, concrete
  groups on the group pages.

## Rank page

```toml
+++
title = "Osztály"
description = "Az osztály a törzs alatti rang: a törzsön belüli nagy csoportokat fogja össze, amelyek testfelépítésükben és szaporodásukban közös vonásokat mutatnak."
date = 2026-10-25
weight = 50

[extra]
group = "rank"
rank = "class"
verified_by = "AI"
+++
```

- `rank` must be one of `kingdom`, `division`, `class`, `order`, `family`,
  `genus`, `species` — it keys the "Csoportok ezen a rangon" card grid, which is
  generated from the groups whose `extra.rank` matches.
- The body starts with a definitional paragraph, then `##` sections ("Mit jelent
  az osztály rangja?", "A sziklevélszám", "Hogyan kapcsolódik a fákhoz?").
- Stay neutral: explain the rank in general and avoid resting the article on a
  single example species. Named examples are fine when they illustrate a point.

## Group page

```toml
+++
title = "Tölgy (Quercus)"
description = "A Quercus nemzetség: makktermésű erdőfák — az adatbázisban öt tölgyfaj tartozik ide."
date = 2026-10-27
weight = 623

[extra]
rank = "genus"
latin = "Quercus"
family = "Fagaceae"
order = "Fagales"
class = "Magnoliopsida"
division = "Magnoliophyta"
kingdom = "Plantae"
verified_by = "AI"
+++
```

- `latin` is the bare scientific name of the group (`Quercus`, `Fagaceae`,
  `Pinaceae`). `taxonomy-group.html` lists every species whose
  `extra.linnaean[rank]` contains that string, so it must appear verbatim in the
  species front matter — the group's `latin`, not its Hungarian title.
- Ancestor keys (`kingdom`, `division`, `class`, `order`, `family`) are the
  **Latin-only** names of the ancestor groups (`Plantae`, `Magnoliophyta`,
  `Magnoliopsida`, `Fagales`, `Fagaceae`). The breadcrumb matches them against
  other group pages with exact equality, so a Hungarian label there breaks the
  chain.
- Omit the keys above the rank: a family page needs order → kingdom, a genus page
  needs family → kingdom.
- `description` is shown on cards and should mention the rank and which database
  species belong to ("az adatbázisban … tartozik ide") — update that count when a
  species is added.
- Body pattern: one introductory paragraph naming the Hungarian and Latin name,
  linking each species in the database with `@/species/<file>.md`, then
  `## Jellemzők` with 3–6 bullet points (leaves, fruit, pollination, wood,
  ecology).
- The template appends "Fák az adatbázisban" and two nav lists ("Környező
  rangok", "Csoportok ezen a rangon"). Do not duplicate them in Markdown.

## Verify

- `zola check` for links and anchors.
- On the rank page, the matching cards appear under "Csoportok ezen a rangon".
- On a group page, the breadcrumb shows a working chain up to Rendszertan, and
  "Fák az adatbázisban" lists the expected species (it is empty if `latin`
  does not match the species' `linnaean` value).
- Both list pages are searchable in `/rendszertan/`; `taxonomy-filter.js` reads
  `data-search` built from `title`, `latin`, the rank label and `description`.
