import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";
import { articles } from "../lib/content";

const BlogPage = () => (
  <main className="editorial-page">
    <section className="editorial-hero">
      <span className="eyebrow-label">THE ATELLIX JOURNAL</span>
      <h1>
        Better interviews
        <br />
        start with <span>better questions.</span>
      </h1>
      <p>
        Ideas, practical guides, and fresh perspectives for engineering teams
        building thoughtful hiring experiences.
      </p>
    </section>
    <section className="article-list page-container">
      <div className="article-list-heading">
        <span>FIELD NOTES FOR ENGINEERING TEAMS</span>
        <span>{articles.length} ARTICLES</span>
      </div>
      {articles.map((article, index) => (
        <motion.article
          className="article-row"
          key={article.slug}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.07, duration: 0.45 }}
        >
          <Link
            className={`article-art ${article.art}`}
            to={`/blog/${article.slug}`}
            aria-label={`Read ${article.title}`}
          >
            <span className="article-art-mark">
              {index === 0 ? "</>" : index === 1 ? "✳" : "↗"}
            </span>
          </Link>
          <div className="article-row-copy">
            <span className="article-meta">
              {article.category.toUpperCase()} <i /> {article.date}
            </span>
            <h2>
              <Link to={`/blog/${article.slug}`}>{article.title}</Link>
            </h2>
            <p>{article.excerpt}</p>
            <span className="article-read">
              <Clock3 size={13} /> {article.read}
            </span>
          </div>
          <Link
            className="article-arrow"
            to={`/blog/${article.slug}`}
            aria-label={`Read ${article.title}`}
          >
            <ArrowUpRight size={18} />
          </Link>
        </motion.article>
      ))}
    </section>
    <section className="newsletter-band">
      <div>
        <span className="eyebrow-label">
          A NOTE FOR THOUGHTFUL HIRING TEAMS
        </span>
        <h2>Build a better interview, one idea at a time.</h2>
      </div>
      <a
        className="button button-orange"
        href="mailto:hello@atellixengine.com?subject=Atellix%20journal"
      >
        Talk with us <ArrowRight size={15} />
      </a>
    </section>
  </main>
);

export default BlogPage;
