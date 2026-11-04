# AtellixEngine

**A candidate-first technical interview platform for engineering teams.**

AtellixEngine is being shaped around practical coding interviews, real collaboration, and clear interviewer feedback. The product direction takes cues from live coding interview tools while keeping its own focus on a calm, human interview experience.

> **Project status:** The React marketing site, account flows, blog, legal draft pages, and existing code-practice API are in development. Live interview rooms, scheduling, realtime collaboration, interviewer notes, and hiring workflows are not implemented yet. Marketing workspace panels are illustrative UI.

## Product principles

- **Show real engineering work.** Use practical prompts and give candidates room to clarify, discuss, and explain tradeoffs.
- **Keep the interview human.** Tools should support a good conversation rather than turn it into a speed test.
- **Make feedback useful.** Help interview teams record observations consistently and compare evidence against role needs.
- **Protect workspace boundaries.** Access to prompts, candidate work, notes, and results must be scoped to the right people.
- **Be clear about product status.** Draft legal pages and illustrative screens are identified as such until they reflect the production service.

## Current implementation

### Frontend

- React 19, Vite 8, Tailwind CSS 4, React Router, and Lucide icons.
- Black and orange visual system, responsive layouts, Framer Motion transitions, and a lazy-loaded Three.js hero scene.
- Account registration, sign-in, session restoration, and sign-out connected to the API.
- Product, solutions, pricing, blog index and articles, privacy, terms, and security pages.
- Legal page copy is a planning draft and must be reviewed against production data flows before launch.

### Backend

- Node.js and Express 5 API with MongoDB through Mongoose.
- Cookie-based JWT authentication and role-protected problem authoring.
- Coding problem, Judge0 execution, submission history, solved-problem, and playlist endpoints.
- Existing code-practice backend work remains available; live interview session APIs still need to be built.

### Routes

| Route                                 | Purpose                        |
| ------------------------------------- | ------------------------------ |
| `/`                                   | Product landing page           |
| `/platform`, `/solutions`, `/pricing` | Product information            |
| `/blog`, `/blog/:slug`                | Editorial pages                |
| `/privacy`, `/terms`, `/security`     | Legal and security drafts      |
| `/login`, `/signup`                   | Account access                 |
| `/workspace`                          | Signed-in account landing page |

## Run locally

### API

```bash
cd backend
npm install
```

Copy `.env.sample` to `.env`, then set:

```env
PORT=8080
MONGODB_URI=mongodb://127.0.0.1:27017/atellixengine
JWT_SECRET=replace-with-a-long-random-secret
JUDGE0_API_URL=http://your-judge0-host
```

Start MongoDB and Judge0, then run:

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Vite proxies `/api` to `http://localhost:8080`. Set `VITE_API_BASE_URL` in `frontend/.env` only when the API is hosted elsewhere.

## API overview

- `POST /api/v1/auth/register`, `POST /api/v1/auth/login`, `POST /api/v1/auth/logout`, `GET /api/v1/auth/check`
- `/api/v1/problems` for problem browse, authoring, and solved status
- `POST /api/v1/execute-code` for Judge0 submissions
- `/api/v1/submission` for the signed-in user's submission history
- `/api/v1/playlist` for personal problem collections
- `GET /api/health` for service health

## MongoDB migration note

The application code now uses MongoDB/Mongoose. The historical Prisma schema and migration files are retained as reference; they are not used at runtime. Moving existing PostgreSQL records into MongoDB is a separate data migration and has not been run. Back up and migrate existing data before replacing a database that contains user records.

## Before a public launch

- Implement and threat-model live interview rooms, scheduling, access controls, and candidate-data retention.
- Validate the execution provider and isolate untrusted code beyond the current external Judge0 dependency.
- Add rate limiting, email verification and recovery, operational monitoring, backups, and restore procedures.
- Review privacy, terms, security, and pricing against the actual company, vendors, features, and jurisdictions.
- Verify accessibility, responsive behavior, API authorization, and production deployment settings.
