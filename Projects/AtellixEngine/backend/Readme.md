# AtellixEngine API

Express 5 API using MongoDB and Mongoose. The existing endpoints support accounts and coding-practice workflows; live interview scheduling and realtime collaboration are not implemented.

## Requirements

- Node.js 20+
- MongoDB 7+ (local or hosted)
- A Judge0-compatible API for code execution

## Setup

```bash
npm install
```

Copy `.env.sample` to `.env` and configure:

```env
PORT=8080
MONGODB_URI=mongodb://127.0.0.1:27017/atellixengine
JWT_SECRET=replace-with-a-long-random-secret
JUDGE0_API_URL=http://your-judge0-host
```

Run the API:

```bash
npm run dev
```

The service checks MongoDB and `JWT_SECRET` before listening. `/api/health` reports service health.

## Data models

- `User`: role, profile, normalized email, and password hash.
- `Problem`: public prompt data plus administrator-only cases and reference solutions.
- `Submission`: source, execution summary, and embedded test-case results.
- `ProblemSolved`: unique user/problem pairs.
- `Playlist` and `ProblemInPlaylist`: user-owned lists with unique problem membership.

Private cases and reference solutions are omitted from learner-facing problem responses. Submission history also omits stored expected outputs.

## API routes

All routes are under `/api/v1` except `/api/health`:

- `/auth` — register, login, logout, and session check.
- `/problems` — list, get, create, update, delete, and solved problems.
- `/execute-code` — run a submission through Judge0.
- `/submission` — submission history and counts.
- `/playlist` — create and manage personal problem playlists.

## PostgreSQL history

`prisma/` contains the former Prisma/PostgreSQL schema and migrations. It is not used by the current runtime. No PostgreSQL-to-MongoDB data transfer has been performed. Back up the old database and migrate existing users and records before switching a populated deployment.
