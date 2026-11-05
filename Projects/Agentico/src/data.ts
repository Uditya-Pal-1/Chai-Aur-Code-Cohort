import type { LucideIcon } from 'lucide-react'
import { Headphones, TrendingUp, Workflow, Receipt, Users } from 'lucide-react'

export type Agent = { name: string; desc: string; stat: string; statLabel: string; steps: string[] }
export type Department = { id: string; label: string; icon: LucideIcon; blurb: string; agents: Agent[] }

export const departments: Department[] = [
  {
    id: 'sales', label: 'Sales', icon: TrendingUp,
    blurb: 'Agents that find, research and qualify leads, then book meetings with your reps.',
    agents: [
      { name: 'Lead Researcher', desc: 'Enriches every inbound lead with firmographics, intent and a tailored first line.', stat: '9 min → 20 s', statLabel: 'per lead', steps: ['New lead in HubSpot', 'Scrape site + LinkedIn', 'Score ICP fit 87/100', 'Draft personalised email'] },
      { name: 'Inbound SDR', desc: 'Replies to demo requests in under 60 seconds, qualifies, and books on the right calendar.', stat: '3.2×', statLabel: 'more meetings', steps: ['Form submitted', 'Qualify via email', 'Route to AE by territory', 'Meeting booked'] },
      { name: 'CRM Hygiene', desc: 'Logs calls, updates deal stages and flags stalled opportunities every morning.', stat: '6 h', statLabel: 'saved / rep / week', steps: ['Read call transcript', 'Update deal fields', 'Next step task created', 'Slack digest sent'] },
    ],
  },
  {
    id: 'support', label: 'Support', icon: Headphones,
    blurb: 'Agents that resolve tickets end-to-end across chat, email and voice, on brand and 24/7.',
    agents: [
      { name: 'Tier-1 Resolver', desc: 'Answers from your docs and takes real actions: refunds, address changes, order tracking.', stat: '68%', statLabel: 'auto-resolution', steps: ['Ticket received', 'Look up order in Shopify', 'Issue refund ($42.10)', 'Close + CSAT survey'] },
      { name: 'Voice Receptionist', desc: 'Picks up every call, books appointments and hands off to a human with full context.', stat: '0', statLabel: 'missed calls', steps: ['Inbound call', 'Identify caller', 'Book slot in calendar', 'SMS confirmation'] },
      { name: 'QA Reviewer', desc: 'Scores 100% of conversations for tone, accuracy and policy, and surfaces coaching moments.', stat: '100%', statLabel: 'tickets reviewed', steps: ['Pull conversations', 'Score against rubric', 'Flag policy risks', 'Weekly report'] },
    ],
  },
  {
    id: 'ops', label: 'Operations', icon: Workflow,
    blurb: 'Agents that run the messy back-office workflows spread across spreadsheets, inboxes and portals.',
    agents: [
      { name: 'Order Processor', desc: 'Reads POs from email and PDFs, keys them into your ERP and chases missing info.', stat: '98.4%', statLabel: 'field accuracy', steps: ['PO email arrives', 'Extract line items', 'Create order in ERP', 'Confirm to customer'] },
      { name: 'Vendor Onboarding', desc: 'Collects documents, verifies tax IDs and sets vendors up in every system.', stat: '5 days → 4 h', statLabel: 'cycle time', steps: ['Send intake form', 'Verify W-9 / VAT', 'Create vendor record', 'Notify procurement'] },
      { name: 'Report Builder', desc: 'Pulls data from 6 tools every Monday and writes the exec summary for you.', stat: '1 click', statLabel: 'weekly report', steps: ['Query warehouse', 'Build charts', 'Write narrative', 'Post to Slack'] },
    ],
  },
  {
    id: 'finance', label: 'Finance', icon: Receipt,
    blurb: 'Agents that close the books faster, with a human approving every payment.',
    agents: [
      { name: 'AP Clerk', desc: 'Matches invoices to POs, codes GL accounts and queues payments for approval.', stat: '82%', statLabel: 'touchless invoices', steps: ['Invoice received', '3-way match', 'Code to GL 6100', 'Queue for approval'] },
      { name: 'Collections Agent', desc: 'Sends polite, escalating reminders and negotiates payment plans.', stat: '−19 days', statLabel: 'DSO', steps: ['Overdue detected', 'Personalised reminder', 'Payment link sent', 'Paid ✓'] },
      { name: 'Expense Auditor', desc: 'Checks every receipt against policy and flags duplicates or out-of-policy spend.', stat: '$41k', statLabel: 'leakage found / yr', steps: ['Receipt uploaded', 'OCR + categorise', 'Policy check', 'Flag or approve'] },
    ],
  },
  {
    id: 'hr', label: 'People', icon: Users,
    blurb: 'Agents that screen, schedule and onboard, so your team can focus on people.',
    agents: [
      { name: 'Candidate Screener', desc: 'Reviews applications against your scorecard and shortlists the best fits.', stat: '90 s', statLabel: 'per candidate', steps: ['Application in', 'Parse CV', 'Score vs. rubric', 'Shortlist + summary'] },
      { name: 'Interview Scheduler', desc: 'Coordinates panels across time zones and handles every reschedule.', stat: '0', statLabel: 'back-and-forth emails', steps: ['Candidate advanced', 'Find panel overlap', 'Send invites', 'Reminders sent'] },
      { name: 'Onboarding Buddy', desc: 'Answers new-hire questions from your handbook and tracks onboarding tasks.', stat: '24/7', statLabel: 'HR answers', steps: ['New hire starts', 'Provision accounts', 'Day-1 checklist', 'Check-in at day 30'] },
    ],
  },
]

export const faqs = [
  { q: 'What exactly is an AI agent?', a: 'An AI agent is software that can understand a goal, decide on the steps, and take actions in your tools (CRM, helpdesk, ERP, email) to complete it. Unlike a chatbot, it does the work instead of just answering questions.' },
  { q: 'How fast can we get our first agent live?', a: 'Most Pilot engagements ship a production agent in 21 days: one week of discovery and design, two weeks of build, evaluation and a supervised launch.' },
  { q: 'Do we need an engineering team?', a: 'No. We handle design, build, integration, hosting and monitoring. Your team gives domain knowledge and approves the agent’s behaviour. If you want to own it, we can hand everything off.' },
  { q: 'Which tools and models do you work with?', a: 'We integrate with 400+ tools out of the box (HubSpot, Salesforce, Zendesk, Slack, Shopify, NetSuite, Google Workspace and more) and build custom connectors when needed. We are model-agnostic and pick the best model for each task: OpenAI, Anthropic, Google or open-source.' },
  { q: 'How do you keep agents safe and accurate?', a: 'Every agent ships with guardrails, human-in-the-loop approvals for sensitive actions, an evaluation suite that runs before every release, and full audit logs. You choose how much autonomy it gets.' },
  { q: 'What does it cost?', a: 'Pilots start at a fixed $4,900 build fee. Ongoing plans are either a managed monthly retainer or outcome-based pricing where you pay per completed task. See the pricing page for details and an ROI calculator.' },
  { q: 'Who owns the agent and our data?', a: 'You do. Your data is never used to train models, it stays in your region, and on Build & hand-off plans you get the full source code and prompts.' },
]

export const testimonials = [
  { quote: 'Agentico shipped a support agent in 3 weeks that now resolves two-thirds of our tickets. Our team finally works on the hard problems.', name: 'Priya Raman', role: 'VP Customer Experience, Northwind Retail' },
  { quote: 'The ROI was obvious by week six. The lead researcher agent alone replaced a part-time contractor and our reply rates doubled.', name: 'Marcus Feld', role: 'Head of Growth, Brightlane' },
  { quote: 'What sold us was the human-in-the-loop design. Nothing ships without approval until we trust it, and then we turn the dial up.', name: 'Elena Torres', role: 'CFO, Halcyon Logistics' },
  { quote: 'They didn’t sell us a tool, they sold us an outcome. Invoices are now 82% touchless.', name: 'Daniel Okafor', role: 'Controller, Meridian Health' },
  { quote: 'Best vendor experience we have had with AI. Weekly demos, clear metrics, and an agent our ops team actually likes.', name: 'Sophie Laurent', role: 'COO, Atlas & Co.' },
  { quote: 'We went from “AI strategy deck” to three agents in production in one quarter.', name: 'Ken Watanabe', role: 'CTO, Kumo Labs' },
]

export const caseStudies = [
  { company: 'Northwind Retail', metric: '68%', label: 'tickets auto-resolved', tone: 'bg-accent text-white', note: 'Tier-1 support agent across chat + email' },
  { company: 'Brightlane', metric: '3.2×', label: 'more qualified meetings', tone: 'bg-coral text-ink', note: 'Inbound SDR + lead researcher' },
  { company: 'Halcyon Logistics', metric: '1,900 h', label: 'saved per quarter', tone: 'bg-ink text-white', note: 'Order processing agent' },
  { company: 'Meridian Health', metric: '82%', label: 'touchless invoices', tone: 'bg-mint text-ink', note: 'Accounts payable agent' },
]

export const logos = ['Northwind', 'Brightlane', 'Halcyon', 'Meridian', 'Atlas & Co.', 'Kumo Labs', 'Vertex', 'Lumen', 'Parallel', 'Oakridge', 'Nimbus', 'Fathom']

export const integrations = ['Salesforce', 'HubSpot', 'Zendesk', 'Intercom', 'Slack', 'Teams', 'Gmail', 'Outlook', 'Shopify', 'Stripe', 'NetSuite', 'QuickBooks', 'Notion', 'Jira', 'Airtable', 'Twilio', 'WhatsApp', 'Postgres']
