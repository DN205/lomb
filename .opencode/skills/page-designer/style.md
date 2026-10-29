# Lomb page style

Everything visual lives in `static/css/tree.css` (plain CSS, `compile_sass =
false`, ~1120 lines). There are no build tools, no framework and no webfonts.
Reuse the tokens and components below instead of inventing new ones.

## Palette

| Token | Value | Role |
| --- | --- | --- |
| `--paper` | `#e7e9de` | Page background, inverted text on dark fills |
| `--ink` | `#1e2a20` | Body text, skip link background |
| `--moss` | `#5f6e4e` | Eyebrow text, secondary labels, scrollbar |
| `--bark` | `#4e3f31` | Dashed panel borders (`1px dashed`) |
| `--oak` | `#9a6b2f` | Hover/accent, focus outline |

No greys outside `color-mix()` of these five. No gradients, no shadows, no
rounded corners — panels are dashed outlines on the paper background.

## Typography

- `--font-heading`: `"Iowan Old Style", "Palatino Linotype", "Book Antiqua",
  Palatino, Georgia, serif` — headings and `.latin` only, `font-weight: 400`.
- `--font-body`: system UI sans stack — everything else.
- Body: `1.125rem` / `1.6`. Latin names: `.latin` = serif italic.
- `h1`: `clamp(3rem, 8vw, 7rem)` on the home page, overridden to
  `clamp(2.5rem, 6vw, 4.5rem)` inside `.species-sheet` and `.reference-page`,
  `line-height: 0.95`, `letter-spacing: -0.02em`.
- `.eyebrow`: `0.8rem`, uppercase, `letter-spacing: 0.18em`, moss. Optionally a
  breadcrumb-style link (`.eyebrow-link`) that underlines in oak on hover.
- `.lead`: `1.25rem`, `max-width: 38rem`, ink mixed towards moss.
- `.reference-body`: `max-width: 42rem`; `h2` `1.75rem` serif with
  `2.5rem` top margin, `h3` smaller serif; the first `h2` loses its top margin.
- `.result-count`, `.filter-label`, `.species-origin-label`: small uppercase or
  reduced-size labels — keep that hierarchy when adding metadata.

## Layout

`main` is `max-width: 1080px`, centred, padding `4rem 1.5rem`, and flexes to
fill the height between the top of the document and the footer.

| Sheet | Grid | Use |
| --- | --- | --- |
| `.species-sheet` | `minmax(11rem,15rem) minmax(0,1fr) minmax(9rem,12rem)`, gap `2.5rem` | Species page: Adatlap · body · Állapot |
| `.reference-sheet` | `minmax(0,1fr) minmax(9rem,12rem)`, gap `2.5rem`, max `72rem` | About/privacy, taxonomy explainer/rank, group, sources |
| `.glossary-sheet` | three columns like `.species-sheet` | Glossary: Szócikkek · body · Állapot |

`.reference-page` is `max-width: 52rem`; `.reference-body` narrows the prose to
`42rem` so tables and lists can run wider than the text.

Both side panels share `.fact-box`: sticky (`top: 1.5rem`), `align-self: start`,
`max-height: calc(100vh - 3rem)`, scrollable, `1.25rem` padding, `0.95rem` type,
`1px dashed var(--bark)`. `.status-box` is the same box, right-hand column.

## Responsive behaviour

- `≤720px`: all sheets collapse to one column, `main` padding `2.5rem 1.25rem`,
  panels stop being sticky (`position: static`, no max-height).
- Column order on mobile is explicit and must be preserved: species page = body,
  fact box, status box; glossary = body, index, status; reference pages keep
  source order.
- `≤480px`: the floating home button becomes icon-only.
- `prefers-reduced-motion`: all transitions and smooth scrolling are disabled.

## Components you should reuse

| Class | Purpose |
| --- | --- |
| `.page-header` + `.eyebrow`, `h1`, `.lead` | Page top; every template renders it |
| `.fact-box` + `.fact-box-title` + `dl/dt/dd` | Dashed info panel (Adatlap, Szócikkek) |
| `.status-box` + `.verified` + `.verified-icon` | Right-hand status: date + human review |
| `.taxonomy`, `.taxonomy-block`, `.clade-list` | Linnéi table and clade chain in the Adatlap |
| `.distribution-group`, `.distribution-label`, `.distribution-list` | Őshonos / Egyéb előfordulás lists |
| `.topic-list`, `.topic-card`, `.topic-card-featured` | Card grid (home, rank groups) |
| `.topic-group-title` | Serif sub-heading above a card grid |
| `.system-panel`, `.system-pair`, `.system-card` | Split gateway band on the taxonomy homepage |
| `.breadcrumb` | Rank chain on group pages |
| `.reference-nav`, `.back-link`, `.reference-topic-links` | Footer nav inside reference pages |
| `.filter-row`, `.filter-search`, `.filter-help*`, `.filter-limits` | Search + display-limit controls |
| `#species-list`, `#taxonomy-list`, `.species-primary/.name/.names/.origin` | Listing rows, `data-search` driven |
| `.empty-state` | Hidden-by-default no-results message |

## Interaction

- Hover and focus accent is oak; cards swap `color` and `border-color` over
  `0.2s ease`.
- Global `:focus-visible`: `2px solid var(--oak)` with `3px` offset. Keep it.
- `.topic-card-featured` marks the primary action (Fajok on the home page).

## Extending the CSS

- Append a new section to `tree.css`; do not restructure existing rules.
- Use the five tokens, the `720px` breakpoint and the existing spacing rhythm
  (`0.35 / 0.75 / 1 / 1.25 / 1.5 / 2.5rem`).
- Class names are English kebab-case; ids only where JS or `aria-controls`
  needs them.
- Check both the desktop grid and the collapsed mobile order before calling it
  done; `zola serve` plus a narrow window is enough.
