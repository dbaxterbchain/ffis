# Foundation for Innovation in Society — Website

The public website for the **Foundation for Innovation in Society (FFIS)**, an
Arizona 501(c)(3) nonprofit. A fast, static, single-page marketing site built
with [Astro](https://astro.build).

- **Stack:** Astro 6 (static output) · TypeScript · self-hosted Fonts (Fraunces + Inter via Fontsource) · zero client JS except the header menu.
- **Hosting:** Netlify (static).
- **First project:** [Pay It Forward](https://pifboard.com).

## Prerequisites

- **Node 22+** (see `.nvmrc`). The repo pins this and Netlify mirrors it.

## Commands

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Local dev server at `http://localhost:4321` |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run check` | Type-check (`astro check`) |

## Where the content lives

Almost all copy is data-driven — edit these, no component changes needed:

- `src/config/site.ts` — **single source of truth**: org name, contact email,
  `donateUrl`, EIN, nav links, socials.
- `src/data/quotes.ts` — the inspirational quotes (mission wall + Einstein pull-quote).
- `src/data/foodFactors.ts` — food-insecurity stat cards.
- `src/data/foodChallenges.ts` — "who it hits hardest" items.
- `src/data/foodSolutions.ts` — the solutions cards.
- `src/data/pifSteps.ts` — Pay It Forward 3-step flow.

Section wording (headings, intros) lives in `src/components/sections/*.astro`.
Brand colors, fonts, spacing live in `src/styles/tokens.css`.

## Structure

```
src/
  config/site.ts        site-wide config (edit me)
  data/                 page content as typed arrays (edit me)
  styles/               tokens.css (design tokens) + global.css
  components/           UI components (Hero, QuoteBlock, StatCard, …)
    sections/           page sections (Mission, FoodResilience, …)
  layouts/BaseLayout    <head>, SEO/OG, JSON-LD, header + footer
  pages/                index.astro, donate.astro, 404.astro
public/                 favicon, icons, manifest, robots.txt, og image
scripts/                dev utilities (asset + screenshot generators)
```

## Donations (every.org)

The Donate button is wired to `site.donateUrl` in one place. It currently points
at the on-site `/donate` "launching soon" page. **At launch:**

1. Claim the FFIS profile on [every.org](https://www.every.org) (uses the
   registered 501(c)(3)).
2. In `src/config/site.ts`, set `donateUrl` to the every.org URL and
   `donateIsExternal: true`. (Optionally embed the every.org button in
   `src/pages/donate.astro` instead.)
3. Add the `ein` value in `site.ts` to surface it in the footer.

## Brand assets

Icons and the Open Graph image are generated from the lotus motif:

```bash
node scripts/generate-assets.mjs   # favicon-32, icon-192/512, apple-touch-icon, og/ffis-og.png
```

> The lotus is a placeholder built from SVG paths. Replace it with the official
> logo vector when available (`src/components/LotusMotif.astro`, `public/favicon.svg`),
> then re-run the generator.

Screenshots for visual QA (needs a local server running and Chrome installed):

```bash
node scripts/shot.mjs              # full-page desktop + mobile + menu shots
```

## Deployment (Netlify)

Connect the repo in Netlify; settings are in `netlify.toml` (build `astro build`,
publish `dist`, Node 22). Pushes to the default branch deploy to production; PRs
get deploy previews. Point the custom domain at Netlify and enable HTTPS.

**Before launch:** update `site` in `astro.config.mjs` and `url` in `site.ts` to
the real production domain (drives canonical URLs, OG, and the sitemap).

## Launch checklist

- [ ] Official **logo vector** → swap the placeholder lotus; reconcile exact brand hexes.
- [ ] **every.org** link + **EIN** → `site.ts` (`donateUrl`, `donateIsExternal`, `ein`).
- [ ] Production **domain** → `astro.config.mjs` + `site.ts`; point DNS at Netlify.
- [ ] Confirm stats/copy and public contact email.
- [ ] Add social handles (`site.socials`) if any.

## A note on `npm audit`

Reported advisories are all in **build-time tooling** (esbuild via Vite/Astro;
yaml via the type-checker) and are **not shipped** to the static site. Do **not**
run `npm audit fix --force` — it would downgrade Astro to v2 and break the build.
