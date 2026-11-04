# AtellixEngine Product Requirements

| Field    | Value                                                  |
| -------- | ------------------------------------------------------ |
| Product  | AtellixEngine                                          |
| Status   | Product direction and implementation draft             |
| Audience | Engineering interviewers, hiring teams, and candidates |
| Updated  | 2026-11-04                                             |

## 1. Product summary

AtellixEngine is a candidate-first technical interview platform. It aims to help engineering teams run practical coding sessions, collaborate with candidates, and share consistent feedback. The product should make interviews feel like a thoughtful working conversation rather than a timed puzzle.

## 2. Current state

The frontend includes the marketing site, account access, editorial pages, legal drafts, and a signed-in landing screen. The Express API supports accounts and code-practice workflows: problem authoring, Judge0 execution, submission history, solved problems, and personal playlists. It now connects to MongoDB through Mongoose.

Scheduling, live interview rooms, realtime code collaboration, candidate management, interviewer notes, and hiring analytics are not implemented. Marketing UI that depicts a live interview is illustrative.

## 3. Users

- **Interviewers** need a focused shared coding session and room for discussion.
- **Hiring leads** need a consistent interview loop and useful team feedback.
- **Candidates** need clear prompts, a reliable environment, and respectful communication.
- **Administrators** need secure management of interview prompts, accounts, and team access.

## 4. Product principles

- Evaluate problem-solving and communication, not familiarity with interview tricks.
- Keep candidate work, interviewer notes, and team feedback access-scoped.
- Make the product usable without AI features; AI suggestions must remain opt-in and reviewable.
- Run untrusted code with strict isolation, quotas, cancellation, and cleanup.
- Make availability, retention, service providers, and feature status explicit.

## 5. Proposed MVP

### Interview workspace

- Create and schedule an interview with a selected prompt and participant roles.
- Invite a candidate using a short-lived, scoped session link.
- Share a browser code editor and interview context with presence and reconnect handling.
- Run code against public examples and private evaluation cases without exposing expected outputs.
- Let interviewers capture private notes and structured feedback separately from candidate-visible content.
- End a session, preserve authorized records, and apply published retention rules.

### Team workflow

- Create an organization and invite teammates.
- Assign interviewer, hiring lead, and administrator permissions.
- Organize prompt libraries by role, difficulty, and skill area.
- Compare structured feedback against role criteria without making automated hiring decisions.

## 6. Functional requirements

| ID       | Priority | Requirement                       | Acceptance criteria                                                                              |
| -------- | -------- | --------------------------------- | ------------------------------------------------------------------------------------------------ |
| AUTH-01  | P0       | Secure account access             | Registration, sign-in, sign-out, and session restoration use server-verified HTTP-only cookies.  |
| TEAM-01  | P0       | Organization roles                | Every API and collaboration action checks organization and session membership.                   |
| INT-01   | P0       | Create and invite to an interview | Only authorized team members can create a session; candidate links are scoped and expire.        |
| CODE-01  | P0       | Collaborative editor              | Changes propagate to participants, save state is visible, and reconnect recovery is defined.     |
| EXEC-01  | P0       | Execute candidate code            | The server owns hidden tests; runners have resource limits, default-deny network, and cleanup.   |
| FEED-01  | P0       | Capture structured feedback       | Interviewers can submit role-relevant observations visible only to authorized hiring teammates.  |
| PRIV-01  | P0       | Apply data retention              | Users can understand, export, and delete records under published retention rules.                |
| BLOG-01  | P1       | Editorial content                 | Blog index and article pages have accessible navigation, responsive layouts, and shareable URLs. |
| LEGAL-01 | P0       | Publish accurate legal pages      | Privacy and terms match actual infrastructure, vendors, retention, and applicable jurisdictions. |

## 7. Trust boundaries and security

- Authenticate and authorize HTTP, WebSocket, file, runner, note, and feedback operations independently.
- Treat candidate code and repository content as untrusted.
- Do not expose hidden test cases, expected output, private notes, secrets, or another team's data.
- Use short-lived execution environments without host credentials, privileged mode, or workspace secret mounts.
- Record auditable events for invitations, role changes, session access, code execution, exports, and deletion.
- Threat-model prompt injection before adding AI context retrieval; generated changes must be reviewable.
- Review privacy, terms, and security pages against real product data flows before launch.

## 8. Success measures

- Time from account creation to the first scheduled interview.
- Candidate completion and interviewer feedback completion rates.
- Reconnect success, edit propagation latency, and save durability.
- Runner completion, queue time, timeout rates, and cleanup success.
- Interviewer agreement and candidate-reported clarity, monitored for fairness across groups.
- Authorization defects, cross-team data leaks, and unresolved security findings.

Do not optimize for completion speed or acceptance rate at the expense of candidate fairness, data privacy, or reliable evaluation.
