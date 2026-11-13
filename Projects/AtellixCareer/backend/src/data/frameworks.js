// Role skill frameworks — versioned, sourced expectations per role.
// In production these would live in MongoDB and be reviewed on a schedule.

export const frameworks = {
  "senior-frontend-engineer": {
    title: "Senior Frontend Engineer",
    version: "3.2",
    skills: [
      { name: "React", category: "Frontend", target: 90 },
      { name: "TypeScript", category: "Frontend", target: 88 },
      { name: "Next.js", category: "Frontend", target: 85 },
      { name: "CSS / Tailwind", category: "Frontend", target: 85 },
      { name: "System Design", category: "Architecture", target: 80 },
      { name: "Performance Optimization", category: "Frontend", target: 78 },
      { name: "Testing (Vitest/RTL)", category: "Quality", target: 75 },
      { name: "Accessibility", category: "Quality", target: 72 },
      { name: "CI/CD & Deploy", category: "DevOps", target: 70 },
      { name: "Node.js", category: "Backend", target: 70 },
      { name: "GraphQL", category: "Data", target: 65 },
      { name: "Git & Code Review", category: "Workflow", target: 80 },
    ],
  },
  "full-stack-engineer": {
    title: "Full-Stack Engineer",
    version: "2.8",
    skills: [
      { name: "React", category: "Frontend", target: 80 },
      { name: "TypeScript", category: "Frontend", target: 80 },
      { name: "Node.js", category: "Backend", target: 82 },
      { name: "PostgreSQL", category: "Data", target: 75 },
      { name: "System Design", category: "Architecture", target: 72 },
      { name: "Testing", category: "Quality", target: 70 },
      { name: "CI/CD & Deploy", category: "DevOps", target: 68 },
      { name: "API Design", category: "Backend", target: 78 },
      { name: "Docker", category: "DevOps", target: 65 },
      { name: "Auth & Security", category: "Backend", target: 74 },
    ],
  },
  "backend-engineer": {
    title: "Backend Engineer",
    version: "2.5",
    skills: [
      { name: "Node.js", category: "Backend", target: 88 },
      { name: "PostgreSQL", category: "Data", target: 85 },
      { name: "Distributed Systems", category: "Architecture", target: 82 },
      { name: "API Design", category: "Backend", target: 85 },
      { name: "Docker & K8s", category: "DevOps", target: 75 },
      { name: "Caching (Redis)", category: "Data", target: 72 },
      { name: "Messaging (Kafka/SQS)", category: "Architecture", target: 70 },
      { name: "Observability", category: "DevOps", target: 68 },
      { name: "Security", category: "Backend", target: 78 },
      { name: "Testing", category: "Quality", target: 72 },
    ],
  },
};

export function getFramework(roleKey) {
  return frameworks[roleKey] || frameworks["senior-frontend-engineer"];
}
