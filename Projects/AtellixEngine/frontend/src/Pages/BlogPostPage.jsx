import { ArrowLeft, ArrowRight, Clock3 } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { articles } from "../lib/content";

const BlogPostPage = () => {
  const { slug } = useParams();
  const article = articles.find((item) => item.slug === slug);
  if (!article) return <Navigate to="/blog" replace />;
  const nextArticle =
    articles[(articles.indexOf(article) + 1) % articles.length];

  return (
    <main className="post-page">
      <div className="post-hero page-container">
        <Link className="back-link" to="/blog">
          <ArrowLeft size={14} /> All articles
        </Link>
        <span className="eyebrow-label">{article.category.toUpperCase()}</span>
        <h1>{article.title}</h1>
        <p>{article.excerpt}</p>
        <div className="post-meta">
          <span className="author-avatar">AT</span>
          <span>
            Atellix Editorial<small>{article.date}</small>
          </span>
          <span className="post-meta-read">
            <Clock3 size={14} /> {article.read}
          </span>
        </div>
      </div>
      <div className={`post-cover ${article.art}`}>
        <span className="post-cover-mark">&lt; / &gt;</span>
        <span className="post-cover-caption">
          A BETTER WAY TO BUILD THE CONVERSATION
        </span>
      </div>
      <article className="post-content">
        {article.sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </section>
        ))}
        <div className="post-callout">
          <span className="eyebrow-label">KEEP THE CONVERSATION GOING</span>
          <p>
            Explore more practical ideas for making technical hiring thoughtful
            and consistent.
          </p>
          <Link className="inline-link" to="/blog">
            More field notes <ArrowRight size={15} />
          </Link>
        </div>
      </article>
      <div className="next-article page-container">
        <span>UP NEXT</span>
        <Link to={`/blog/${nextArticle.slug}`}>
          {nextArticle.title} <ArrowRight size={16} />
        </Link>
      </div>
    </main>
  );
};

export default BlogPostPage;
