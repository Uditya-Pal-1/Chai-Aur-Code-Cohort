// Mock admin dataset — in production this comes from /api/admin/* endpoints.
export const adminUsers = [
    { id: "u1", name: "Aman Pal", email: "aman@example.com", plan: "Pro", readiness: 68, streak: 12, joined: "2026-09-14", status: "active" },
    { id: "u2", name: "Priya Sharma", email: "priya@example.com", plan: "Pro", readiness: 81, streak: 24, joined: "2026-08-02", status: "active" },
    { id: "u3", name: "Daniel Okafor", email: "daniel@example.com", plan: "Free", readiness: 44, streak: 3, joined: "2026-10-21", status: "trialing" },
    { id: "u4", name: "Mei-Lin Chen", email: "mei@example.com", plan: "Teams", readiness: 57, streak: 18, joined: "2026-07-30", status: "active" },
    { id: "u5", name: "Jonas Weber", email: "jonas@example.com", plan: "Free", readiness: 31, streak: 0, joined: "2026-11-02", status: "churned" },
    { id: "u6", name: "Sara Kim", email: "sara@example.com", plan: "Pro", readiness: 74, streak: 9, joined: "2026-09-05", status: "active" },
    { id: "u7", name: "Ravi Patel", email: "ravi@example.com", plan: "Free", readiness: 52, streak: 6, joined: "2026-10-11", status: "trialing" },
    { id: "u8", name: "Elena Rossi", email: "elena@example.com", plan: "Teams", readiness: 88, streak: 31, joined: "2026-06-19", status: "active" },
];
export const adminAssessments = [
    { id: "a1", user: "Aman Pal", role: "Senior Frontend Engineer", score: 68, gaps: 7, model: "heuristic-v1", created: "2026-11-12" },
    { id: "a2", user: "Priya Sharma", role: "Staff Frontend Engineer", score: 81, gaps: 3, model: "gpt-4o-mini", created: "2026-11-11" },
    { id: "a3", user: "Daniel Okafor", role: "Backend Engineer", score: 44, gaps: 6, model: "heuristic-v1", created: "2026-11-10" },
    { id: "a4", user: "Elena Rossi", role: "Engineering Manager", score: 88, gaps: 2, model: "gpt-4o-mini", created: "2026-11-09" },
    { id: "a5", user: "Sara Kim", role: "Full-Stack Engineer", score: 74, gaps: 4, model: "heuristic-v1", created: "2026-11-08" },
    { id: "a6", user: "Ravi Patel", role: "ML Engineer", score: 52, gaps: 8, model: "gpt-4o-mini", created: "2026-11-07" },
];
export const roleFrameworks = [
    { key: "senior-frontend-engineer", title: "Senior Frontend Engineer", version: "3.2", skills: 12, updated: "2026-11-01", status: "published" },
    { key: "full-stack-engineer", title: "Full-Stack Engineer", version: "2.8", skills: 10, updated: "2026-10-18", status: "published" },
    { key: "backend-engineer", title: "Backend Engineer", version: "2.5", skills: 10, updated: "2026-10-02", status: "review" },
    { key: "ml-engineer", title: "ML Engineer", version: "1.9", skills: 14, updated: "2026-09-21", status: "draft" },
    { key: "engineering-manager", title: "Engineering Manager", version: "2.1", skills: 11, updated: "2026-09-10", status: "published" },
];
export const revenueByMonth = [
    { m: "Jun", mrr: 12400 }, { m: "Jul", mrr: 15100 }, { m: "Aug", mrr: 18900 },
    { m: "Sep", mrr: 22400 }, { m: "Oct", mrr: 26800 }, { m: "Nov", mrr: 31400 },
];
export const funnel = [
    { stage: "Visited", count: 48210, pct: 100 },
    { stage: "Signed up", count: 9310, pct: 19.3 },
    { stage: "Uploaded resume", count: 5210, pct: 10.8 },
    { stage: "Completed analysis", count: 4470, pct: 9.3 },
    { stage: "Started path", count: 2980, pct: 6.2 },
    { stage: "Converted to Pro", count: 1140, pct: 2.4 },
];
export const aiUsage = [
    { model: "heuristic-v1 (fallback)", calls: 3120, share: 58 },
    { model: "gpt-4o-mini", calls: 2260, share: 42 },
];
