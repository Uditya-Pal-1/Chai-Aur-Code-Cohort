<div align="center">

# Projects

**A growing collection of full-stack experiments, product ideas, and learning milestones.**

This directory is where concepts leave the notebook and become working software.

</div>

## Portfolio Overview

This directory contains standalone application work built from the concepts practiced in the cohort. LeetLab is the current implementation; AtellixDo and AtellixUI are planned products with briefs, not completed applications.

## Project Index

| Project       | Status         | Focus                                                       | Documentation                                                   | Demo          |
| ------------- | -------------- | ----------------------------------------------------------- | --------------------------------------------------------------- | ------------- |
| **LeetLab**   | In development | Coding problems, submissions, execution, and playlists      | [Project README](./leetLab/Readme.md) · [PRD](./leetLab/PRD.md) | Not deployed  |
| **AtellixDo** | Planned        | Task management with optional, human-reviewed AI assistance | [Project brief](./AtellixDo/README.md)                          | Not available |
| **AtellixUI** | Planned        | Reusable UI components and interactive documentation        | [Project brief](./AtellixUI/README.md)                          | Not available |

**Status definitions:** “In development” means implementation exists but still needs end-to-end verification. “Planned” means only a brief exists in this repository.

## LeetLab: Product Overview

LeetLab is the first major project in this collection: a platform designed to make coding practice feel structured, measurable, and rewarding. A learner can discover a problem, write a solution, submit it for execution, inspect test-case results, and track progress over time. An administrator can create problems, manage test cases, and curate playlists for focused study.

The product is built around a simple loop:

```text
Choose a problem -> Write a solution -> Run it against test cases
		|                                             v
Review the result <- Save the submission <- Track progress
```

### Implemented Scope

The repository contains code for these workflows; end-to-end behavior still depends on configured services and verification. LeetLab is not currently deployed.

- JWT authentication with HTTP-only cookies
- User and administrator roles
- Problem creation and management for administrators
- Difficulty levels, tags, constraints, hints, snippets, and editorial content
- Batch code execution through Judge0 integration
- Per-test-case output, errors, execution time, and memory details
- Submission history and solved-problem tracking
- Personal problem playlists for structured practice
- React-based interface with form validation and responsive UI foundations

### Technology Snapshot

| Layer             | Technologies                                                                         |
| ----------------- | ------------------------------------------------------------------------------------ |
| Frontend          | React, Vite, React Router, Tailwind CSS, DaisyUI, React Hook Form, Zod, Lucide React |
| Backend           | Node.js, Express, Prisma, PostgreSQL, JWT, bcryptjs                                  |
| Code execution    | Judge0-compatible execution API                                                      |
| Development style | JavaScript ES modules, REST APIs, Prisma migrations                                  |

### Architecture At A Glance

```mermaid
flowchart LR
	Browser[React Frontend] -->|HTTP and cookies| API[Express API]
	API --> Auth[Authentication and authorization]
	API --> DB[(PostgreSQL via Prisma)]
	API --> Judge[Judge0 code execution]
	Judge --> API
	API --> Browser
```

The backend owns authentication, problem management, submissions, playlists, and execution orchestration. PostgreSQL stores the durable application state, while Judge0 evaluates submitted code in an isolated execution environment.

<details>
<summary>Technical reference: request lifecycle, data model, API, authorization, and Judge0</summary>

## Technical Design

### Request Lifecycle

An authenticated code submission moves through these stages:

1. The React client sends source code, language ID, and problem ID to `POST /api/v1/execute-code`.
2. The authentication middleware reads the JWT from the HTTP-only cookie and attaches the authenticated user to the request.
3. The execution controller loads the problem's test cases from PostgreSQL and builds one Judge0 submission per stored test case; clients cannot provide or replace expected outputs.
4. The Judge0 adapter submits the batch and polls `/submissions/batch` until every result reaches a terminal status.
5. The controller aggregates the results, persists the submission and individual `TestCaseResult` records, and marks the problem as solved when all test cases pass.
6. The API returns structured execution details without exposing expected outputs, so the frontend can render accepted, wrong-answer, compilation, runtime, memory, and timing states.

```mermaid
sequenceDiagram
	participant U as React Client
	participant A as Express API
	participant M as Auth Middleware
	participant J as Judge0
	participant P as PostgreSQL

	U->>A: POST /api/v1/execute-code
	A->>M: Verify JWT cookie
	M-->>A: Authenticated user
	A->>J: Submit test-case batch
	J-->>A: Submission tokens
	loop Until all results are terminal
		A->>J: Poll batch results
		J-->>A: Status, output, time, memory
	end
	A->>P: Save submission and test-case results
	A-->>U: Aggregated execution response
```

### Database Model

The Prisma schema uses UUID-backed relational entities with cascading deletes for user-owned records:

| Model               | Responsibility                                                  | Important constraints                                      |
| ------------------- | --------------------------------------------------------------- | ---------------------------------------------------------- |
| `User`              | Identity, credentials, role, and ownership root                 | Unique email; role defaults to `USER`                      |
| `Problem`           | Problem statement, metadata, examples, snippets, and test cases | Owned by a user; difficulty is `EASY`, `MEDIUM`, or `HARD` |
| `Submission`        | One submitted solution and its aggregate result                 | References one user and one problem                        |
| `TestCaseResult`    | Result for each executed test case                              | Indexed by `submissionId`                                  |
| `ProblemSolved`     | A user's solved-problem relationship                            | Unique pair of `userId` and `problemId`                    |
| `Playlist`          | A named user study list                                         | Unique playlist name per user                              |
| `ProblemInPlaylist` | Join record between playlists and problems                      | Unique pair of `playListId` and `problemId`                |

Problem content that can change shape over time, including `examples`, `testcases`, `codeSnippets`, and `referenceSolutions`, is stored in PostgreSQL JSON columns. Tags are stored as a PostgreSQL string array. This keeps problem authoring flexible while preserving relational integrity for users, submissions, solved status, and playlists.

### API Surface

All application routes are mounted under `/api/v1`. Except for registration and login, the current API expects an authenticated JWT cookie. Administrative problem mutations additionally require the `ADMIN` role.

#### Authentication: `/auth`

| Method | Route       | Access        | Purpose                                 |
| ------ | ----------- | ------------- | --------------------------------------- |
| `POST` | `/register` | Public        | Create a user account                   |
| `POST` | `/login`    | Public        | Authenticate and issue a session cookie |
| `POST` | `/logout`   | Authenticated | Clear the session cookie                |
| `GET`  | `/check`    | Authenticated | Return the current authenticated user   |

#### Problems: `/problems`

| Method   | Route                  | Access        | Purpose                                       |
| -------- | ---------------------- | ------------- | --------------------------------------------- |
| `POST`   | `/create-problem`      | Admin         | Create a problem with metadata and test cases |
| `GET`    | `/get-all-problems`    | Authenticated | List available problems                       |
| `GET`    | `/get-problem/:id`     | Authenticated | Retrieve one problem                          |
| `PUT`    | `/update-problem/:id`  | Admin         | Update problem content                        |
| `DELETE` | `/delete-problem/:id`  | Admin         | Delete a problem and dependent records        |
| `GET`    | `/get-solved-problems` | Authenticated | List problems solved by the current user      |

#### Execution, submissions, and playlists

| Resource       | Routes                                                                         | Purpose                                                |
| -------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------ |
| Code execution | `POST /execute-code`                                                           | Execute submitted code against server-owned test cases |
| Submissions    | `GET /submission/get-all-submissions`                                          | Retrieve the current user's submissions                |
| Submissions    | `GET /submission/get-submissions/:problemId`                                   | Retrieve submissions for one problem                   |
| Submissions    | `GET /submission/get-submissions-count/:problemId`                             | Retrieve submission count for one problem              |
| Playlists      | `POST /playlist/create-playlist`, `GET /playlist`, `GET /playlist/:playListId` | Create and inspect playlists                           |
| Playlists      | `POST /playlist/:playListId/add-problem`                                       | Add a problem to a playlist                            |
| Playlists      | `DELETE /playlist/:playListId/remove-problem`                                  | Remove a problem from a playlist                       |
| Playlists      | `DELETE /playlist/:playListId`                                                 | Delete a playlist                                      |

### Authorization Flow

The backend applies authorization in two layers:

- `authMiddleware` verifies the JWT cookie and rejects unauthenticated requests before controllers run.
- `checkAdmin` protects problem creation, updates, and deletion so only users with `role: ADMIN` can change the problem catalog.

Passwords are hashed with `bcryptjs`; the application does not use the raw password for subsequent requests. The client sends HTTP-only cookies with requests. In local development, Vite proxies `/api` to the backend on port `8080`, keeping auth requests same-origin.

### Code Execution Adapter

The Judge0 adapter currently maps these application language names to Judge0 IDs:

| Application language | Judge0 ID |
| -------------------- | --------: |
| JavaScript           |      `63` |
| Java                 |      `62` |
| Python               |      `71` |

The adapter submits a batch, stores the returned tokens, and polls once per second for up to 60 seconds. Judge0 failures return a `502` response; the API does not fabricate accepted results or save failed provider calls as successful submissions. Configure a reachable Judge0 endpoint before running code submissions.

</details>

## Getting Started

The commands below are for LeetLab. For the complete feature list and API reference, see the [LeetLab README](./leetLab/Readme.md).

### Prerequisites

- Node.js 20.19+ or 22.12+ (required by the LeetLab Vite 8 frontend)
- npm or pnpm
- A PostgreSQL database
- A Judge0 API key or a self-hosted Judge0 instance

### 1. Start The Backend

```bash
cd leetLab/backend
npm install
```

Create a `.env` file from `.env.sample` and provide the database, authentication, and code-execution settings required by the backend. Then prepare Prisma and start the API:

```env
PORT=8080
DATABASE_URL="postgresql://user:password@localhost:5432/leetlab_db?schema=public"
JWT_SECRET="replace-with-a-long-random-secret"
JUDGE0_API_URL="http://localhost:2358"
```

`JUDGE0_API_URL` is read by the execution adapter and should point to the base URL of the Judge0 service. Keep `.env` files out of version control and use separate secrets for development, staging, and production.

```bash
npx prisma generate
npx prisma migrate deploy
npm run dev
```

Use `npx prisma migrate dev` when creating and testing a new local schema migration. Use `npx prisma migrate deploy` for applying committed migrations in a deployment environment.

### 2. Start The Frontend

In a second terminal:

```bash
cd leetLab/frontend
npm install
```

Create a `.env` file from `.env.sample`, set the backend URL if needed, and start Vite:

```bash
npm run dev
```

The frontend and backend scripts are intentionally kept inside their respective applications so each side can be developed and deployed independently.

### Verification Commands

Run these from `leetLab/frontend`:

```bash
npm run lint
npm run build
```

Run backend unit tests from `leetLab/backend`:

```bash
npm test
```

The backend currently exposes a development server through `npm run dev`. Backend changes should be checked against the configured PostgreSQL database and Judge0 endpoint, with special attention to authentication cookies, role checks, and submission persistence.

## Repository Structure

```text
Projects/
|-- README.md                 # This project index
|-- Assets/                   # Shared and project-specific visual assets
|-- AtellixDo/                # Planned task and todo management application
|-- AtellixUI/                # Planned reusable component library
|-- leetLab/
|   |-- Readme.md             # LeetLab product documentation
|   |-- backend/              # Express API, Prisma schema, and controllers
|   `-- frontend/             # React application and UI components
```

## Development Principles

- Build from a real user workflow, not only from isolated screens.
- Keep API contracts and database changes explicit.
- Prefer small, testable improvements over large speculative rewrites.
- Treat error states, empty states, and validation as part of the product.
- Document decisions so the next feature starts with context instead of guesswork.

## Roadmap

The roadmap evolves as the projects grow. The most valuable next steps for LeetLab are:

- Improve editor quality with formatting, autocomplete, and custom test cases
- Add stronger output syntax highlighting for JSON and array results
- Refine empty, loading, and error states across the application
- Expand profile progress views with richer activity and solved-problem insights
- Add a polished landing experience and clearer navigation flows
- Introduce optional AI-assisted hints and explanations with careful privacy controls
- Continue hardening validation, authorization, and automated testing

## Contributing

These projects are part of an ongoing learning journey, and thoughtful contributions are welcome.

1. Create a focused branch for your change.
2. Keep commits small and describe the behavior they introduce.
3. Update the relevant README when setup or behavior changes.
4. Run the available lint, build, and application checks before opening a pull request.
5. Explain the problem, the solution, and any follow-up work in the pull request description.

See the repository-level [contribution guidelines](../CONTRIBUTING.md) before submitting changes.

## License

The cohort repository is distributed under the [MIT License](../LICENSE). Check each project's package metadata and third-party licenses before redistributing a project independently.

<div align="center">

_The best project is the one that teaches you what to build next._

</div>
