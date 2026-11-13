// Generates a week-by-week learning plan from an assessment's gap skills.
// Deterministic template in demo mode; swap for LLM-generated plans later.

const RESOURCE_BANK = {
  "Next.js": [
    { title: "Next.js Docs — App Router", type: "Docs", duration: "2h" },
    { title: "Vercel Academy: Next.js", type: "Course", duration: "1h" },
  ],
  "System Design": [
    { title: "Frontend System Design (ByteByteGo)", type: "Course", duration: "4h" },
    { title: "Design: notifications system", type: "Exercise", duration: "2h" },
  ],
  "Testing (Vitest/RTL)": [
    { title: "Testing JavaScript (Kent C. Dodds)", type: "Course", duration: "3h" },
    { title: "Build a CI pipeline", type: "Project", duration: "3h" },
  ],
  default: [
    { title: "Official documentation deep-dive", type: "Docs", duration: "2h" },
    { title: "Guided project", type: "Project", duration: "3h" },
  ],
};

const WEEK_THEMES = [
  { theme: "Foundations & Setup", focus: "Environment, core concepts, first build" },
  { theme: "Core Skill Building", focus: "Structured practice on the primary gap" },
  { theme: "Applied Practice", focus: "Real project work, deliberate practice" },
  { theme: "Depth & Edge Cases", focus: "Advanced patterns, debugging, trade-offs" },
  { theme: "Integration", focus: "Combine skills into a cohesive project" },
  { theme: "Capstone & Proof", focus: "Ship portfolio-grade work, write case study" },
];

export function generatePlan(assessment, weeks = 6) {
  const gaps = assessment.skills.filter((s) => s.status === "gap");
  const developing = assessment.skills.filter((s) => s.status === "developing");
  const focusSkills = [...gaps.slice(0, 2), ...developing.slice(0, 1)].map((s) => s.name);

  return Array.from({ length: weeks }, (_, i) => {
    const template = WEEK_THEMES[i % WEEK_THEMES.length];
    const skill = focusSkills[i % Math.max(focusSkills.length, 1)] || "Core skills";
    const primary = RESOURCE_BANK[skill] || RESOURCE_BANK.default;
    const secondary = RESOURCE_BANK.default;

    return {
      week: i + 1,
      theme: i === weeks - 1 ? "Capstone: Portfolio-Grade App" : `${template.theme}: ${skill}`,
      focus: i === weeks - 1 ? "Ship a full-stack app with tests, CI, and deploy" : `${template.focus} — ${skill}`,
      hours: i === weeks - 1 ? 10 : 6 + (i % 3),
      status: i === 0 ? "current" : "upcoming",
      milestones: [
        i === 0 ? "Setup complete, first exercise done" : `Week ${i} milestone shipped`,
        `${skill} validation exercise passed`,
      ],
      resources: i % 2 === 0 ? primary.concat(secondary[0]) : secondary.concat(primary[0]),
    };
  });
}
