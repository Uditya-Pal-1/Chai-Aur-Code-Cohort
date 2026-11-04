import { ArrowUpRight, FileText, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { legalCopy } from "../lib/content";

const LegalPage = ({ page }) => {
  const content = legalCopy[page];
  const Icon = page === "security" ? ShieldCheck : FileText;

  return (
    <main className="legal-page page-container">
      <header className="legal-heading">
        <span className="legal-icon">
          <Icon size={20} />
        </span>
        <span className="eyebrow-label">{content.kicker}</span>
        <h1>{content.title}</h1>
        <p>{content.intro}</p>
        <span className="legal-updated">LAST UPDATED · {content.updated}</span>
      </header>
      <div className="legal-layout">
        <nav className="legal-toc" aria-label="On this page">
          <span>ON THIS PAGE</span>
          {content.sections.map(([title]) => (
            <a
              key={title}
              href={`#${title.toLowerCase().replaceAll(" ", "-")}`}
            >
              {title}
            </a>
          ))}
          <Link to="/security">
            Security overview <ArrowUpRight size={13} />
          </Link>
        </nav>
        <article className="legal-content">
          {content.sections.map(([title, body], index) => (
            <section id={title.toLowerCase().replaceAll(" ", "-")} key={title}>
              <span className="legal-section-num">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h2>{title}</h2>
                <p>{body}</p>
              </div>
            </section>
          ))}
          <div className="legal-draft-note">
            <ShieldCheck size={17} />
            <p>
              This page is a product-planning draft. It should be reviewed and
              updated to match the actual product, service providers, and
              operating practices before launch.
            </p>
          </div>
        </article>
      </div>
    </main>
  );
};

export default LegalPage;
