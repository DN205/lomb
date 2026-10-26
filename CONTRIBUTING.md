# Contributing to Lomb

Thanks for helping improve Lomb. This guide covers the local setup, the content rules and the review process. By taking part you agree to keep discussion respectful, factual and focused on the project.

## Before you start

- Install **Zola 0.23.x** (`zola --version`).
- There is no Node.js, package manager or automated test suite. `zola check` is the required verification.
- Read [AGENTS.md](AGENTS.md) for the repository layout and known template gotchas, and [README.md](README.md) for the project overview.

## Local setup

```sh
git clone https://github.com/DN205/lomb.git
cd lomb
zola serve   # http://127.0.0.1:1111
```

`public/` is generated output. Never commit it or edit it by hand.

## Workflow

1. Open an issue for larger changes, or describe the reason clearly in the pull request.
2. Create a branch from `main`:
   ```sh
   git switch -c fix/glossary-grouping
   ```
3. Make the change, then run:
   ```sh
   zola check
   ```
4. Commit. Every feature or fix gets its own commit; do not fold unrelated edits together.
5. Push the branch and open a pull request against `main`. The PR template lists the checks.

Commit messages are short, imperative and in English, for example `Fix glossary topic spacing`. Hungarian is used only in the visible copy.

## Adding or editing a species

Species live in `content/species/` as one Markdown file per species, named in English kebab-case (`pedunculate-oak.md`). The `title` is Hungarian.

A page must contain:

- `title`, `description` and `date`;
- the scalars `latin`, `english`, `family`, `height`, `lifespan` and `origin`;
- `[extra.distribution]` with `native` and/or `other` lists;
- `[extra.linnaean]` with all seven ranks in `"Hungarian (Latin)"` form;
- `[extra.cladistic].clades` in Latin, ordered from broad to species.

Keep `extra.family` identical to `extra.linnaean.family`. Use en-dash ranges (`15–25 m`) and Hungarian quotes („…”). Link the first occurrence of a botanical term to the glossary instead of redefining it, for example `[makk](@/glossary.md#makk)`.

### Freshness and verification

- Set `verified_by = "AI"` unless a person has actually read the page.
- Set `verified_by = "Human"` only after a thorough factual review, including the taxonomy, measurements, distribution and Hungarian wording.
- The status panel is generated from this value; do not fake it.
- The species text must be traceable to the literature and online databases listed on the Hivatkozások page. Do not add books or papers that were not consulted.

## Editing taxonomy, glossary or sources

- Taxonomy pages live in `content/taxonomy/`. The seven rank pages are generic explanations of a rank — keep them free of a single example species so they stay neutral.
- The glossary (`content/glossary.md`) is grouped under `##` headings; every entry needs a `###` heading with a unique `{#anchor}` id, because articles link to it.
- The sources section (`content/sources/`) explains external linking and lists the consulted literature and online databases. Only add references that were actually used.

## Style guide

- **Language:** all visible copy is Hungarian. Identifiers (files, front-matter keys, CSS classes, ids, JS) stay English.
- **Tone:** informative and neutral; no marketing claims, no personal anecdotes.
- **Punctuation:** en-dash ranges (`15–25 m`), Hungarian quotes („…”), `·` between metadata items.
- **Numbers and units:** SI units, a non-breaking space is not required, but keep the existing `25–40 m` style.
- **Links:** internal links use `@/path.md`; link text must describe the target. External links are collected on the Hivatkozások page rather than scattered through articles.
- **AI text:** never copy AI output verbatim without checking it, and never use AI to disguise copied text.

## What reviewers check

- `zola check` passes.
- The page builds and appears at the expected URL.
- Front matter is complete and internally consistent (`extra.family` vs `linnaean.family`, `origin` vs `distribution.native`).
- `verified_by` reflects the real review status.
- Internal links and glossary anchors resolve.
- Visible copy is Hungarian and follows the style guide.
- Changes are focused and committed separately from unrelated work.

## Reporting issues

Open an issue at <https://github.com/DN205/lomb/issues>. For content errors, include the page URL, the incorrect statement and the database or source that supports the correction. For visual issues, add a screenshot and the browser/device used.

## Licensing of contributions

By submitting a pull request you agree that:

- your code contributions are licensed under the MIT license (`LICENSE`);
- your content contributions are licensed under CC BY-NC-SA 4.0 (`LICENSE-CONTENT`).

Only submit material you have the right to license under these terms.
