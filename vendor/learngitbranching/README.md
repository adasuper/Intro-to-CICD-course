# Learn Git Branching (vendored copy)

This folder is a **vendored static copy** of the open-source project
**Learn Git Branching** by **Peter Cottle (@pcottle)**, hosted here so the
interactive visualizer is usable even when the original site is slow or
blocked (e.g. from within China).

- **Original website:** https://learngitbranching.js.org/
- **Source repository:** https://github.com/pcottle/learnGitBranching
- **Author:** Peter Cottle and contributors
- **License:** MIT (see `LICENSE.md` in this folder)
- **Vendored from branch/commit:** `gh-pages` @ `03d98d3ad23ba023d382cc51f861ef5bccb62d72`

## What is included

Only the files needed to serve the prebuilt site:

- `index.html` — the app entry point
- `build/` — the compiled JS bundle and CSS
- `assets/` — fonts, icons, and images
- `LICENSE.md` — the original MIT license

The 4 MB `src/` tree, tests, and build tooling were intentionally left out.

## Local modifications

- Removed the Google Analytics (`googletagmanager.com`) script tag from
  `index.html` so the copy makes no external network calls (Google is also
  unreachable from within China). No application code was changed.

All credit for the tool itself goes to the original authors. Please support
and star the upstream project.
