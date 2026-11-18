export const targetRole = {
    title: "Senior Frontend Engineer",
    company: "Series-B SaaS",
    salaryBand: "$145k – $185k",
    matchScore: 68,
};
export const skills = [
    { name: "React", category: "Frontend", current: 82, target: 90, status: "developing", evidence: "4 production apps, hooks & Suspense" },
    { name: "TypeScript", category: "Frontend", current: 74, target: 88, status: "developing", evidence: "Used in 2 projects, limited generics" },
    { name: "Next.js", category: "Frontend", current: 58, target: 85, status: "gap", evidence: "One SSR project, no App Router depth" },
    { name: "System Design", category: "Architecture", current: 35, target: 80, status: "gap", evidence: "Not evidenced on resume" },
    { name: "Testing (Vitest/RTL)", category: "Quality", current: 41, target: 75, status: "gap", evidence: "Basic unit tests only" },
    { name: "CI/CD & Deploy", category: "DevOps", current: 30, target: 70, status: "gap", evidence: "Manual deploys" },
    { name: "GraphQL", category: "Data", current: 20, target: 65, status: "gap", evidence: "REST only" },
    { name: "Performance Optimization", category: "Frontend", current: 48, target: 78, status: "gap", evidence: "No Core Web Vitals evidence" },
    { name: "Node.js", category: "Backend", current: 66, target: 70, status: "developing", evidence: "Express APIs in production" },
    { name: "Accessibility", category: "Quality", current: 55, target: 72, status: "developing", evidence: "Some ARIA usage" },
    { name: "CSS / Tailwind", category: "Frontend", current: 88, target: 85, status: "strong", evidence: "Design-system owner" },
    { name: "Git & Code Review", category: "Workflow", current: 85, target: 80, status: "strong", evidence: "PR reviewer on team" },
];
export const learningPath = [
    {
        week: 1,
        theme: "Next.js App Router Foundations",
        focus: "Server components, routing, data fetching",
        hours: 6,
        status: "done",
        milestones: ["Migrated sample app to App Router", "Rendered dynamic route with server data"],
        resources: [
            { title: "Next.js Docs — App Router", type: "Docs", duration: "2h" },
            { title: "Build a dashboard starter", type: "Project", duration: "3h" },
            { title: "Vercel Academy: Next.js", type: "Course", duration: "1h" },
        ],
    },
    {
        week: 2,
        theme: "Advanced React Patterns",
        focus: "Concurrent features, Suspense boundaries, error handling",
        hours: 7,
        status: "done",
        milestones: ["Implemented streaming SSR page", "Added error.tsx boundaries"],
        resources: [
            { title: "react.dev — Suspense & Error Boundaries", type: "Docs", duration: "1.5h" },
            { title: "Epic React: Advanced Patterns", type: "Course", duration: "4h" },
        ],
    },
    {
        week: 3,
        theme: "System Design for Frontend",
        focus: "State architecture, caching, API boundaries",
        hours: 8,
        status: "current",
        milestones: ["Design doc: state flow for dashboard app", "Diagram data-fetching layer"],
        resources: [
            { title: "Frontend System Design (ByteByteGo)", type: "Course", duration: "4h" },
            { title: "Design: notifications system", type: "Exercise", duration: "2h" },
        ],
    },
    {
        week: 4,
        theme: "Testing & CI",
        focus: "Vitest, React Testing Library, GitHub Actions",
        hours: 7,
        status: "upcoming",
        milestones: ["90% coverage on core components", "Green CI pipeline on PRs"],
        resources: [
            { title: "Testing JavaScript (Kent C. Dodds)", type: "Course", duration: "3h" },
            { title: "Build a CI pipeline", type: "Project", duration: "3h" },
        ],
    },
    {
        week: 5,
        theme: "Performance & Core Web Vitals",
        focus: "Bundle analysis, lazy loading, image/font strategy",
        hours: 6,
        status: "upcoming",
        milestones: ["Lighthouse ≥ 90 on key pages", "Documented perf budget"],
        resources: [
            { title: "web.dev — Performance", type: "Docs", duration: "2h" },
            { title: "Optimize a slow page", type: "Project", duration: "3h" },
        ],
    },
    {
        week: 6,
        theme: "Capstone: Portfolio-Grade App",
        focus: "Ship a full-stack app with tests, CI, and deploy",
        hours: 10,
        status: "upcoming",
        milestones: ["Deployed with CI/CD", "Case study written", "LinkedIn post published"],
        resources: [
            { title: "Ship Fast (Theo-style)", type: "Project", duration: "8h" },
            { title: "Write your case study", type: "Exercise", duration: "2h" },
        ],
    },
];
export const portfolioMilestones = [
    { title: "Gap analysis report", description: "Resume vs. Senior Frontend role — 68% coverage with evidence links", week: 0, proofType: "Report", status: "done" },
    { title: "Next.js dashboard app", description: "Streaming SSR + Suspense, deployed on Vercel", week: 2, proofType: "Live app", status: "done" },
    { title: "Component test suite", description: "Vitest + RTL, 90%+ coverage, CI-gated", week: 4, proofType: "Repo", status: "active" },
    { title: "Performance case study", description: "Before/after Lighthouse scores and bundle analysis", week: 5, proofType: "Case study", status: "locked" },
    { title: "Capstone full-stack app", description: "End-to-end product with auth, tests, CI/CD, deploy", week: 6, proofType: "Live app", status: "locked" },
    { title: "Interview-ready portfolio", description: "Case studies, metrics, and narrative for 8 target companies", week: 7, proofType: "Portfolio", status: "locked" },
];
export const roles = [
    { title: "Frontend Engineer", avgSalary: "$120k – $160k", openings: "12.4k", growth: "+9%" },
    { title: "Full-Stack Engineer", avgSalary: "$130k – $175k", openings: "18.1k", growth: "+11%" },
    { title: "Backend Engineer", avgSalary: "$135k – $180k", openings: "9.8k", growth: "+7%" },
    { title: "DevOps / Platform", avgSalary: "$140k – $190k", openings: "6.2k", openings2: "", growth: "+13%" },
    { title: "ML Engineer", avgSalary: "$160k – $230k", openings: "4.1k", growth: "+19%" },
    { title: "Product Engineer", avgSalary: "$125k – $170k", openings: "7.5k", growth: "+12%" },
    { title: "Engineering Manager", avgSalary: "$170k – $230k", openings: "3.3k", growth: "+8%" },
    { title: "Data Engineer", avgSalary: "$130k – $175k", openings: "8.9k", growth: "+14%" },
];
export const testimonials = [
    {
        quote: "The gap analysis told me exactly which three skills were blocking senior roles. I closed them in 6 weeks and got two interviews the same month.",
        name: "Priya Sharma",
        role: "Frontend Engineer → Senior Frontend",
        initials: "PS",
        color: "bg-brand-500",
    },
    {
        quote: "Finally a career tool that explains itself. Every recommendation shows the evidence and the milestone — no black-box scores.",
        name: "Daniel Okafor",
        role: "Career changer, ops → backend",
        initials: "DO",
        color: "bg-emerald-500",
    },
    {
        quote: "The week-by-week path kept me consistent. Week 4 felt impossible in week 1, but each milestone built on the last.",
        name: "Mei-Lin Chen",
        role: "Bootcamp grad → SWE",
        initials: "MC",
        color: "bg-amber-500",
    },
];
export const activityFeed = [
    { icon: "check", text: "Completed 'Next.js Docs — App Router' (2h)", time: "Today, 9:42 AM" },
    { icon: "star", text: "System Design skill +4 pts after design exercise", time: "Yesterday" },
    { icon: "doc", text: "Generated Week 4 plan revision (+12 resources)", time: "Nov 10" },
    { icon: "upload", text: "Re-analyzed resume v2 — readiness 62% → 68%", time: "Nov 8" },
    { icon: "flag", text: "Unlocked Week 3 milestone: state-flow diagram", time: "Nov 6" },
    { icon: "users", text: "Joined cohort 'Frontend '26' (214 learners)", time: "Nov 2" },
];
export const pastAnalyses = [
    { id: "resume_v2.pdf", role: "Senior Frontend Engineer", score: 68, date: "Nov 8, 2026", status: "current" },
    { id: "resume_v1.pdf", role: "Frontend Engineer", score: 54, date: "Oct 22, 2026", status: "archived" },
    { id: "linkedin_export.pdf", role: "Full-Stack Engineer", score: 61, date: "Oct 3, 2026", status: "archived" },
];
export const faqs = [
    {
        q: "How does the skill gap analysis work?",
        a: "AtellixCareer parses your resume and target role requirements, then compares your evidenced skills against the role's proficiency framework. Every gap shows the evidence (or lack of it), confidence level, and why it matters for the role — you stay in control and can correct anything.",
    },
    {
        q: "Is the assessment an AI judgment of my ability?",
        a: "No. It is a planning aid: it maps what your resume evidences against published role frameworks. It does not predict employability or rank you against other candidates, and every output is editable.",
    },
    {
        q: "What happens to my resume data?",
        a: "Your resume is processed only to generate your plan, encrypted in transit and at rest, and you can export or delete everything at any time. We minimize what is sent to AI providers and never sell your data.",
    },
    {
        q: "Can I edit the learning path?",
        a: "Yes — completely. You can swap resources, adjust weekly hours, dismiss milestones, and regenerate the plan whenever your goals change.",
    },
    {
        q: "What does Pro unlock?",
        a: "Unlimited role analyses and plan regenerations, the full resource library, portfolio milestone tracking, interview-readiness scoring, and priority support. Free includes one full analysis and the first 3 weeks of your path.",
    },
];
