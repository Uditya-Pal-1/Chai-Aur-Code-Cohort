import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Users,
  Video,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const pages = {
  platform: {
    label: "THE INTERVIEW WORKSPACE",
    title: "Everything you need for a better technical interview.",
    description:
      "One focused workspace for the prompt, the code, and the conversation—so interviewers can pay attention to the person in front of them.",
    icon: Code2,
    features: [
      [
        "A shared coding space",
        "Work through practical programming prompts in a collaborative editor built for interview conversations.",
        Code2,
      ],
      [
        "The conversation stays close",
        "Keep candidate discussion and interviewer context alongside the work, where it belongs.",
        MessageSquare,
      ],
      [
        "A clearer team signal",
        "Give interviewers a consistent way to capture observations and share useful feedback.",
        Check,
      ],
      [
        "Privacy by design",
        "Keep access scoped to the right people and make workspace boundaries part of the product foundation.",
        ShieldCheck,
      ],
    ],
  },
  solutions: {
    label: "DESIGNED FOR THE WHOLE TEAM",
    title: "Make room for the right kind of signal.",
    description:
      "Whether you are building an interview loop or hiring your first engineers, give every person a clearer, more thoughtful experience.",
    icon: Users,
    features: [
      [
        "For engineering teams",
        "Run practical coding sessions that feel closer to how teammates solve problems together.",
        Code2,
      ],
      [
        "For interviewers",
        "Stay present in the conversation with context, collaboration, and a clear structure.",
        Video,
      ],
      [
        "For hiring leads",
        "Create a more consistent interview experience across roles and interviewers.",
        Users,
      ],
      [
        "For candidates",
        "Replace surprise puzzles with clear prompts and space to explain their approach.",
        Sparkles,
      ],
    ],
  },
  pricing: {
    label: "SIMPLE, THOUGHTFUL PRICING",
    title: "A better hiring experience should be easy to try.",
    description:
      "We are shaping plans around the needs of engineering teams. Talk with us about your interview process and get early access updates.",
    icon: Zap,
    features: [
      [
        "Start with your workflow",
        "Tell us how your team interviews today and what a better experience would look like.",
        MessageSquare,
      ],
      [
        "Bring your interview team",
        "We will help you think through roles, candidate flow, and a practical rollout.",
        Users,
      ],
      [
        "Know what is ready",
        "Early access details will be clear about available features, limitations, and support.",
        Check,
      ],
      [
        "No surprise commitments",
        "Pricing and terms will be shared before any paid plan is offered.",
        ShieldCheck,
      ],
    ],
  },
};

const ProductPage = ({ page }) => {
  const content = pages[page];
  const PageIcon = content.icon;

  return (
    <main className="product-page">
      <section className="product-hero page-container">
        <motion.div
          className="product-hero-copy"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="eyebrow-label">{content.label}</span>
          <h1>{content.title}</h1>
          <p>{content.description}</p>
          <div className="product-hero-actions">
            <Link className="button button-orange" to="/signup">
              Get started <ArrowRight size={16} />
            </Link>
            <a className="inline-link" href="mailto:hello@atellixengine.com">
              Talk to our team <ArrowUpRight size={15} />
            </a>
          </div>
        </motion.div>
        <div className="product-orbit">
          <div className="product-orbit-ring ring-one" />
          <div className="product-orbit-ring ring-two" />
          <span className="product-orbit-icon">
            <PageIcon size={31} />
          </span>
          <span className="product-float product-float-one">
            <Code2 size={16} />
          </span>
          <span className="product-float product-float-two">
            <Users size={16} />
          </span>
          <span className="product-float product-float-three">
            <Video size={16} />
          </span>
        </div>
      </section>
      <section className="product-feature-section">
        <div className="page-container">
          <div className="product-section-heading">
            <span className="eyebrow-label">THE DETAILS THAT MATTER</span>
            <h2>Built around the conversation.</h2>
          </div>
          <div className="product-feature-grid">
            {content.features.map(([title, body, Icon], index) => (
              <article className="product-feature-card" key={title}>
                <span className="product-feature-icon">
                  <Icon size={19} />
                </span>
                <span className="card-kicker">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="product-bottom-cta page-container">
        <span className="cta-icon">
          <PageIcon size={20} />
        </span>
        <div>
          <h2>Ready for a better interview?</h2>
          <p>Start a conversation with the Atellix team.</p>
        </div>
        <a
          className="button button-black"
          href="mailto:hello@atellixengine.com?subject=Atellix%20early%20access"
        >
          Get early access <ArrowRight size={15} />
        </a>
      </section>
    </main>
  );
};

export default ProductPage;
