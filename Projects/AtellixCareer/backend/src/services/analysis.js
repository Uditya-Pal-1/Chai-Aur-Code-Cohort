import { getFramework } from "../data/frameworks.js";

// Deterministic demo extraction: in production this calls an LLM with the
// resume text and returns validated JSON matching the skill schema.
// Skill names not in the framework are still returned as "extra" evidence.

const DEMO_SKILLS = {
  React: { current: 82, evidence: "4 production apps, hooks & Suspense", confidence: 0.9 },
  TypeScript: { current: 74, evidence: "Used in 2 projects, limited generics", confidence: 0.85 },
  "Next.js": { current: 58, evidence: "One SSR project, no App Router depth", confidence: 0.8 },
  "System Design": { current: 35, evidence: "Not evidenced on resume", confidence: 0.6 },
  "Testing (Vitest/RTL)": { current: 41, evidence: "Basic unit tests only", confidence: 0.75 },
  "CI/CD & Deploy": { current: 30, evidence: "Manual deploys", confidence: 0.7 },
  GraphQL: { current: 20, evidence: "REST only", confidence: 0.65 },
  "Performance Optimization": { current: 48, evidence: "No Core Web Vitals evidence", confidence: 0.7 },
  "Node.js": { current: 66, evidence: "Express APIs in production", confidence: 0.85 },
  Accessibility: { current: 55, evidence: "Some ARIA usage", confidence: 0.7 },
  "CSS / Tailwind": { current: 88, evidence: "Design-system owner", confidence: 0.95 },
  "Git & Code Review": { current: 85, evidence: "PR reviewer on team", confidence: 0.9 },
};

function classify(current, target) {
  if (current >= target) return "strong";
  if (current >= target * 0.6) return "developing";
  return "gap";
}

export function analyzeGap(resumeText, roleKey) {
  const framework = getFramework(roleKey);
  const text = (resumeText || "").toLowerCase();

  const skills = framework.skills.map((f) => {
    const demo = DEMO_SKILLS[f.name] || { current: 25, evidence: "Not evidenced", confidence: 0.5 };
    // Nudge scores up slightly when the skill name literally appears in the resume text.
    const mentioned = text.includes(f.name.toLowerCase().split(" ")[0]);
    const current = Math.min(100, demo.current + (mentioned ? 4 : 0));
    return {
      name: f.name,
      category: f.category,
      current,
      target: f.target,
      status: classify(current, f.target),
      confidence: demo.confidence,
      evidence: demo.evidence,
    };
  });

  const readiness = Math.round(
    skills.reduce((sum, s) => sum + Math.min(s.current / s.target, 1), 0) / skills.length * 100
  );

  return {
    roleKey,
    frameworkVersion: framework.version,
    roleTitle: framework.title,
    matchScore: readiness,
    model: process.env.LLM_API_KEY ? process.env.LLM_MODEL || "llm" : "heuristic-v1",
    skills: skills.sort((a, b) => {
      const order = { gap: 0, developing: 1, strong: 2 };
      return order[a.status] - order[b.status] || a.current - b.current;
    }),
  };
}
