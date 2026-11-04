# AtellixEngine Web

React 19 application built with Vite 8, Tailwind CSS 4, React Router, Framer Motion, and Three.js.

## Run locally

```bash
npm install
npm run dev
```

Vite proxies `/api` requests to `http://localhost:8080`. Configure `VITE_API_BASE_URL` in `.env` only when the API uses a different base path or host.

## Commands

- `npm run dev` starts Vite.
- `npm run build` creates the production bundle in `dist/`.
- `npm run preview` serves the production bundle locally.
- `npm run lint` runs ESLint.
- `npm run format` formats frontend source with Prettier.
- `npm run format:check` checks frontend formatting.

The 3D hero scene loads as a separate bundle. Blog content and legal draft copy are currently static frontend content.
