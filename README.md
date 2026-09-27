# Patrick Fruean — Professional Portfolio

A production-oriented personal portfolio and CV website for Patrick Fruean, a Computer Science student and full-stack developer with interests across web applications, databases, networks, operating systems, distributed computing, and cybersecurity.

The content is based on `Patrick_Fruean_CV_2026_Updated.docx` and documented project information. The original CV is preserved at the project root and a byte-identical public copy is provided for download.

## Features

- Premium responsive one-page portfolio with five detailed project case-study routes
- Three visual systems: interactive Three.js network, animated gradient orbs, and a technical grid with light traces
- About, technical skills, selected projects, education, development journey, services, and contact sections
- Filterable project cards and statically generated project detail pages
- Accessible desktop/mobile navigation, active-section feedback, and direct CV download
- Client-side contact validation that safely opens the visitor's email application
- Reduced-motion support, a WebGL fallback, keyboard navigation, focus states, and semantic landmarks
- Dynamic Open Graph image, metadata, sitemap, robots rules, favicon, and security response headers
- No analytics, trackers, credentials, external font requests, or hard-coded secrets

## Technology stack

- Next.js 16 App Router
- React 19 and TypeScript
- Tailwind CSS 4
- Three.js for the lightweight interactive network
- Lucide React for interface icons
- Native CSS animation and Intersection Observer reveals

## Requirements

- Node.js 20.9 or newer
- npm 10 or newer recommended

## Installation and development

```bash
npm install
npm run dev
```

Open `http://localhost:3000` during local development.

## Quality checks

```bash
npm run lint
npm run typecheck
npm test
npm run test:e2e
npm run build
```

Run the complete sequence with `npm run check`.

The end-to-end suite uses a project-local Chromium install. Install it once with:

```bash
PLAYWRIGHT_BROWSERS_PATH=.playwright-browsers npx playwright install chromium
```

## Production build and preview

```bash
npm run build
npm start
```

## Environment variables

Copy `.env.example` to `.env.local` only when a canonical public URL is known:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

`NEXT_PUBLIC_SITE_URL` is used only for absolute sitemap and robots metadata. No secret environment values are required. Never place private keys or credentials in `NEXT_PUBLIC_*` variables.

## Deployment

The application can be deployed to any platform supporting a Next.js Node deployment, including Vercel or a Node-capable container/host.

1. Install locked dependencies with `npm ci`.
2. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin.
3. Run `npm run build`.
4. Start with `npm start`, or use the host's standard Next.js deployment integration.

All public assets use site-relative URLs. There are no production dependencies on local filesystem paths or localhost endpoints.

## Project structure

```text
src/
├── app/
│   ├── projects/[slug]/page.tsx   # Static case-study route
│   ├── globals.css                # Design system and responsive styling
│   ├── layout.tsx                 # Metadata and document shell
│   ├── opengraph-image.tsx        # Generated social image
│   ├── page.tsx                   # Main portfolio experience
│   ├── robots.ts
│   └── sitemap.ts
├── components/                    # Interactive and visual components
└── data/portfolio.ts              # Profile, skills, journey, and project data
public/documents/                  # Public, downloadable CV copy
tests/                             # Dependency-free integrity tests
```

## Updating portfolio information

Most structured content lives in `src/data/portfolio.ts`. Update the `profile`, `skillGroups`, `projects`, `journey`, or `services` collections there. Personal narrative and section composition live in `src/app/page.tsx`.

Keep claims aligned with the source CV. If the root CV is replaced, also replace `public/documents/Patrick_Fruean_CV_2026_Updated.docx`, then run `npm test` to verify the copies match.

## Adding project and external links

Add project details to the `projects` array in `src/data/portfolio.ts`; the matching case-study route is generated automatically from its slug. The current source material does not provide verified GitHub, LinkedIn, or live-demo URLs, so none are invented. When verified URLs are available, add explicit optional fields to the data types and render them with `target="_blank"` and `rel="noreferrer"`.

## Visual backgrounds

1. **Network:** `NetworkScene.tsx` renders 46 moving particles and nearby connections in one capped-DPR Three.js canvas. It loads dynamically and catches unavailable WebGL contexts.
2. **Orbs:** `OrbBackground.tsx` uses composited CSS gradients and transforms for depth without another canvas.
3. **Technical grid:** `CyberGrid.tsx` combines a masked CSS grid with three lightweight trace animations.

Animation is disabled or effectively frozen when `prefers-reduced-motion` is enabled.

## Performance considerations

- The page remains server rendered; only genuinely interactive components hydrate.
- Three.js is isolated in a dynamically imported hero component.
- Device pixel ratio is capped and the network node count is intentionally low.
- No remote font or image requests block rendering.
- Case-study routes are pre-rendered at build time.
- CSS provides a graceful visual fallback when WebGL is unavailable.

## Contact form behaviour

The site has no email backend and does not claim to send or store submissions. After validation, the form opens a pre-filled `mailto:` draft in the visitor's configured email application. A hosted provider or server action can be integrated later without placing credentials in client code.
