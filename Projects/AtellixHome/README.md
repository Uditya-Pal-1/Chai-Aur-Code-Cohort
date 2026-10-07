# AtellixHome

The storefront is a Next.js App Router application.

## Development

Requirements: Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open the local URL printed by Next.js.

## Production

```bash
npm run build
npm start
```

## Code quality

```bash
npm run lint
npm run format
npm run format:check
npm test
npm run check
```

## Server-backed submissions

Copy `.env.example` to `.env.local` and set `MONGODB_URI` and `MONGODB_DB` to the shop's
MongoDB database. Order and lead submissions return an explicit unavailable response until their
feature flags are enabled.

Keep `STORE_ORDERS_ENABLED=false`, `STORE_CATALOG_VERIFIED=false`, and
`STORE_ORDER_TERMS_VERIFIED=false` until product records, prices, order/delivery terms, and the
privacy notice have been verified. Order submission currently records an unpaid request only;
payment processing is not implemented and no payment is collected. Keep `STORE_LEADS_ENABLED=false`
and `STORE_PRIVACY_NOTICE_VERIFIED=false` until the privacy notice and consent wording are approved.
These endpoints store submissions in MongoDB; newsletter email delivery, consultation notifications,
and CRM sync are not connected.

The current catalog, prices, testimonials, guarantee, sourcing, and delivery statements have not
been independently verified. Do not enable live submissions or publish the site as a live shop until
the business supplies and checks its authoritative records.

## Project structure

- `app/` — App Router page, layout, and global styles
- `app/api/` — order, consultation, and newsletter request endpoints
- `src/components/` — storefront sections, dialogs, cart, and shared UI
- `src/data/` — product catalog and image references
- `src/hooks/` — cart, collection filters, scroll behavior, toasts, and wishlist state
- `src/server/` — MongoDB access and server-side request validation
- `public/Assets/` — optimized images and the store logo served by Next.js; hero images are in `public/Assets/home/`
- `Assets/` — original source images; optimized copies are kept only in `public/Assets/`, with hero sources in `Assets/home/`
- `app/icon.png` — compact favicon derived from the store logo
