# AtellixUI

**A prototype React component system with an interactive component gallery and visual design tools.**

> **Project status:** Frontend prototype. The Vite/React app includes a dark/light landing page, dedicated `/system`, `/about`, and `/components` pages, a two-mode `/playground`, an animated responsive mobile navigation, a shared footer, a Three.js hero, and theme-specific founder portraits. The homepage features six selected components; the full library has a searchable, filterable sidebar, interactive previews, and copyable React TSX source. The playground's Basic mode is the fast local component preview with copyable JSX; its optional Sandpack Live Code Editor mode adds editable React, a live preview, and a console-free compact IDE. Sandpack is Apache-2.0 licensed and its live sandbox requires an internet connection. Route and preview transitions use Framer Motion and respect reduced-motion preferences. Preview source uses shared AtellixUI demo styles, so copy the relevant styles when adapting it outside this app. The contact-form preview validates locally but does not deliver messages. The backend remains a minimal Express scaffold; there is no deployed demo.

## Product direction

AtellixUI aims to help developers build consistent interfaces from a shared design-token foundation. Its longer-term plan includes accessible React components, reusable hooks, copy-paste component distribution, interactive documentation, and optional visual and AI-assisted tools.

The current product direction is documented in [PRD v2.1](./AtellixUI%20PRD%20v2.1.md), which supersedes the earlier [PRD v2.0](./AtellixUI%20PRD%20v2.0.md). These documents describe planned scope, not shipped capabilities.

## Creator & Architectural Credits

- **Architect & Lead Engineer:** Uditya Pal
- **Portfolio:** [uditya-pal.vercel.app](https://my-portfolio-uditya-pal.vercel.app/)
- **GitHub:** [Uditya-Pal-1](https://github.com/Uditya-Pal-1)
- **X / Twitter:** [@Aman_pal_1](https://x.com/Aman_pal_1)
- **LinkedIn:** [in/udityapal](https://www.linkedin.com/in/udityapal/)

These links are included in the product experience and source documentation so the creator, portfolio, public repositories, and professional profiles remain visible and connected with the AtellixUI brand.

## Current repository state

| Area | Present in this repository | Not implemented yet |
| --- | --- | --- |
| Frontend | Vite, React, TypeScript, Tailwind CSS, landing page, dedicated `/system` and `/about` pages, shared footer, searchable `/components` library with 67 interactive previews in `Frontend/src/components/ui`, configurable `/playground` with responsive interactive previews, Sandpack live React editor, and copyable JSX, Framer Motion transitions, animated mobile navigation, and theme-aware surfaces | Production design-token package, documented distribution registry, and visual drag-and-drop editor |
| Backend | Modular Express REST API, resilient MongoDB connection with offline fallback, `/api/health`, `/api/contact` with rate limiting, and `/r/:component.json` CLI distribution | Full JWT user auth and hosted AI generator |
| Product plan | Component tiers, CLI/MCP distribution, Studio, and extension plans in the PRDs | The planned monorepo packages, CLI, MCP server, and browser extension |

## Getting started

### Frontend

Use a Node.js version supported by the installed Vite version and npm. From `Projects/AtellixUI/Frontend`:

```bash
npm install
npm run dev
```

Run the available checks from the same directory:

```bash
npm run lint
npm run build
```

The development server URL is printed by Vite. The page is an interactive product prototype; it does not yet provide the planned npm packages, CLI, or MCP distribution.

### Backend

Run the backend from `Projects/AtellixUI/Backend`:

```bash
npm install
npm run dev   # or npm start
```

The API provides `/api/health`, `/api/contact`, and the `/r/:component.json` registry endpoint. It connects to MongoDB when available and operates in an in-memory fallback mode when offline.

## Repository layout

```text
AtellixUI/
├── Backend/                 # Minimal Express scaffold
├── Frontend/                # Vite + React + TypeScript scaffold
├── AtellixUI PRD v2.0.md    # Earlier product requirements
└── AtellixUI PRD v2.1.md    # Current product requirements
```

## Suggested implementation order

The current PRD prioritizes the token and hooks foundation, followed by a small set of useful components and their documentation. Registry/CLI distribution and larger Studio, MCP, and extension features are later phases. Keep this README updated as planned capabilities become working, tested features.
