# AtellixCareer API — backend

Node.js + Express + MongoDB (Mongoose) REST API for the AtellixCareer platform.

## Quick start

```bash
cp .env.example .env   # add your MONGODB_URI (or leave unset for demo mode)
npm install
npm run dev            # http://localhost:4000
```

Without `MONGODB_URI` the API runs in **demo mode**: all endpoints work and return
deterministic sample data, but nothing is persisted.

## Endpoints

| Method | Path | Description |
| --- | --- | --- |
| GET | `/api/health` | Health check + DB status |
| POST | `/api/resumes` | Upload a resume (multipart, field `resume`) |
| POST | `/api/analysis` | Run skill-gap analysis `{ resumeText, roleKey }` |
| GET | `/api/analysis/:id` | Fetch a stored assessment |
| POST | `/api/plan` | Generate a learning path `{ assessmentId?, roleKey?, weeks? }` |
| GET | `/api/plan/:id` | Fetch a plan |
| PATCH | `/api/plan/:id/week/:week` | Update week status / completed resources |
| GET | `/api/dashboard` | Aggregated dashboard stats `?userId=` |

## Architecture notes

- `src/services/analysis.js` — gap engine. Deterministic heuristics today; swap in an
  LLM call (key via `LLM_API_KEY`) returning schema-validated JSON. Output records the
  `model` used for auditability, per the project's responsible-AI principles.
- `src/data/frameworks.js` — versioned role skill frameworks. Move to MongoDB and add
  a review process before production.
- Models: `User`, `Resume`, `Assessment`, `LearningPlan` — all timestamped, indexed
  on `userId`.
- The API never makes hiring/employability claims; assessments are advisory and
  editable, matching the product principles in `../README.md`.
