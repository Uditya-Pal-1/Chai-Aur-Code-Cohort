# AtellixUI

**A planned, token-driven React component system with visual design and code-generation tools.**

> **Project status:** Prototype scaffold. This directory contains a Vite/React frontend starter and a minimal Express backend entry point. The component platform described in the product documents is not implemented, and there is no deployed demo.

## Product direction

AtellixUI aims to help developers build consistent interfaces from a shared design-token foundation. Its longer-term plan includes accessible React components, reusable hooks, copy-paste component distribution, interactive documentation, and optional visual and AI-assisted tools.

The current product direction is documented in [PRD v2.1](./AtellixUI%20PRD%20v2.1.md), which supersedes the earlier [PRD v2.0](./AtellixUI%20PRD%20v2.0.md). These documents describe planned scope, not shipped capabilities.

## Current repository state

| Area | Present in this repository | Not implemented yet |
| --- | --- | --- |
| Frontend | Vite, React, TypeScript, Tailwind CSS, and small sample components | Design-token system, component catalogue, documentation site, and visual editor |
| Backend | Express dependency and an entry file that imports Express | Running API, routes, authentication, MongoDB models, registry, and AI generation |
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

The development server URL is printed by Vite. The page currently demonstrates starter UI rather than the planned AtellixUI product.

### Backend

The backend is not yet a runnable API. Its `index.js` only imports Express, and its package does not define a server start script. Do not treat the existing `npm test` script as a test suite; it starts `nodemon` against that incomplete entry point.

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
