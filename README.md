# anivar.net

Personal site of Anivar A. Aravind.

Built with [Eleventy](https://www.11ty.dev/). Deploys to GitHub Pages via Actions.

## Local development

```sh
npm install
npm run dev      # http://localhost:8080
npm run build    # produces ./_site
npm run clean    # remove ./_site
```

## Stack

- **Eleventy 3.x** static site, no client-side framework. Vanilla JS only on `/press/` for copy-to-clipboard; site renders fully with JS off.
- **Self-hosted variable fonts** via fontsource (Source Serif 4, Inter, JetBrains Mono).
- **Sitemap** at `/sitemap.xml`.
- **Atom feed** at `/feed.xml` (covers `/writing/`; populated as the cross-post bridge to Layer 8 lands).
- **OG image** generated at build time by `scripts/og-card.mjs` → `_site/og.png`.

## Content authoring

| To add… | Edit |
|---|---|
| A canonical fact about the site | `src/_data/site.json` |
| A nav link | `src/_data/nav.json` |
| A career row | `src/_data/operatingRange.json` |
| A working-idea entry | `src/_data/workingIdeas.json` |
| A project | `src/_data/projects.json` (and `src/pages/projects/<slug>.njk`) |
| A recognition | `src/_data/recognitions.json` |
| A "Now" line | `src/_data/now.json` |
| A bio length | `src/_data/bios.json` |
| The Quote-me-as block | `src/_data/quoteme.json` |
| A long-form post | `src/pages/writing/<slug>.md` (collection wiring pending) |
| A talk | `src/pages/talks.njk` (manual until log rebuild) |

## Migration from `/var/www/anivar.net`

The current `/corrigibility/` long-read and PDFs have been copied into `public/corrigibility/`. After the cutover, the existing VPS can be decommissioned for `anivar.net`.

## Privacy

No analytics. No third-party scripts. No consent banner. If self-hosted analytics are wired later they will live at `analytics.anivar.net` (GoatCounter or Plausible).

## Licensing

- Site source: [MIT](LICENSE).
- Site copy and assets: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
- Papers: [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/).

## Deploy

Pushes to `main` trigger `.github/workflows/deploy.yml`, which runs `npm ci`, `npm run build`, and deploys `_site/` via `actions/deploy-pages@v4`.

A separate workflow `.github/workflows/a11y.yml` runs Pa11y CI against every page on push and PR; configuration in `.pa11yci.json`.

DNS:

```
anivar.net      A     185.199.108.153
anivar.net      A     185.199.109.153
anivar.net      A     185.199.110.153
anivar.net      A     185.199.111.153
www.anivar.net  CNAME anivar.github.io.
```

(`CNAME` file lives at `public/CNAME` — already populated.)
