# anivar.net

Personal site of Anivar A. Aravind — engineering leader, systems thinker, independent researcher.

Built with [Astro](https://astro.build/). Deploys to GitHub Pages via Actions.

## Local development

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # produces ./dist
npm run preview  # serve the built site
```

## Stack

- **Astro** static site, no JS required to read content.
- **Self-hosted fonts** via Fontsource (Source Serif 4, Inter, JetBrains Mono).
- **Sitemap** auto-generated to `/sitemap-index.xml`.
- **Atom feed** at `/feed.xml` (covers `/research/` and `/writing/`; populated by the build step once content collections are wired).

## Content authoring

| To add… | Edit |
|---|---|
| A project | `src/pages/projects.astro` — append to the `entries` array. |
| A media citation | `src/pages/press.astro` — append to the coverage list. |
| A talk | `src/pages/talks.astro` — append a new entry under the year. |
| A working paper | `src/pages/research.astro` — append to the papers list. |
| A Layer 8 cross-post | `src/pages/writing.astro` — once the RSS mirror is wired, posts auto-populate; until then, append manually. |
| Bios / pull-quotes | `src/pages/press.astro` — `bios` and `pullQuotes` constants at the top. |

## Migration from `/var/www/anivar.net`

The current `/corrigibility/` long-read and PDFs have been copied into `public/corrigibility/`. After the cutover the existing VPS can be decommissioned for `anivar.net`.

## Privacy

No Google Analytics. No third-party scripts. No consent banner. Self-hosted analytics will be wired separately at `analytics.anivar.net`.

## Licensing

- Site source: permissive (this repo).
- Site copy and assets: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
- Papers: [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/).

## Deploy

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds with the official `withastro/action@v3` and deploys to GitHub Pages.

DNS:

```
anivar.net      A     185.199.108.153
anivar.net      A     185.199.109.153
anivar.net      A     185.199.110.153
anivar.net      A     185.199.111.153
www.anivar.net  CNAME anivar.github.io.
```

(Use the `CNAME` file in `public/` — already populated.)
