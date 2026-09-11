# CropX Web

Marketing site and interactive preview for **CropX** — safeguarding African food security by helping farmers choose drought- and climate-resilient seed varieties for an ever-warming environment.

There is no marketplace, no user accounts, and no backend dependency. The Seed Advisor runs entirely in the browser against a curated local dataset.

## Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- [Mantine 7](https://mantine.dev/)
- [Framer Motion](https://www.framer.com/motion/)
- TypeScript

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run typecheck` | TypeScript check |
| `npm run lint` | ESLint + Stylelint |
| `npm run images:fetch` | Download source photographs (requires network) |
| `npm run images:build` | Compress images and regenerate `core/content/image-manifest.ts` |

## Site structure

| Route | Purpose |
|-------|---------|
| `/` | Home — editorial narrative across four acts |
| `/seed-advisor` | Interactive seed recommendation demo |
| `/climate-insights` | Agro-ecological zone reference |
| `/crop-surveillance` | Pest and disease early warning (planned) |
| `/agronomist-network` | Extension advisory model (planned) |
| `/blog` | Field notes (local markdown content) |
| `/about-us` | Mission and FAQs |
| `/contact-us` | Mailto contact form |
| `/image-credits` | Photo attribution |

## Seed Advisor

Recommendations are computed client-side in `core/content/scoring.ts` from:

- Nigerian state → agro-ecological zone (`core/content/agro-zones.ts`)
- Curated variety dataset (`core/content/seed-varieties.ts`)

Results are labelled as a **preview** — resilience scores are composite estimates, not measured trial data.

## Images

Photographs live in `public/images/cropx/` and are registered in `core/content/image-manifest.ts`. Every page references images through typed slots so a missing asset is a compile-time error.

Attribution requirements are recorded in `public/images/cropx/CREDITS.md` and rendered on `/image-credits`.

## Pending before launch

These are intentionally left as placeholders:

- **Logo and favicon** — navbar uses a temporary `IconSeeding` wordmark
- **Team section** — hidden (`showTeamSection = false` in `core/utilities/index.ts`)
- **Testimonials** — hidden (`showTestimonials = false` in `core/content/testimonials.ts`)
- **Open Graph image** — add `public/og/cropx-og.jpg` and wire it in `core/utils/metadata.ts`
- **Legal review** — privacy policy and terms are drafts, not lawyer-reviewed
