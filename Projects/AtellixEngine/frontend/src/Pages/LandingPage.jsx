import { Suspense, lazy } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  CirclePlay,
  Code2,
  Command,
  GitBranch,
  MessageSquare,
  Radio,
  ShieldCheck,
  Sparkles,
  Users,
  Video,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
const HeroScene = lazy(() => import("../components/HeroScene"));

const fadeUp = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } };

const Home = () => {
  const reduceMotion = useReducedMotion();
  const reveal = reduceMotion
    ? {}
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, amount: 0.2 },
        variants: fadeUp,
        transition: { duration: 0.55, ease: "easeOut" },
      };

  return (
    <main id="top">
      <section className="hero-dark">
        <div className="hero-grid" />
        <div className="hero-content page-container">
          <motion.div
            className="hero-copy"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow eyebrow-dark">
              <span className="status-dot" /> TECHNICAL INTERVIEWS, REIMAGINED
            </span>
            <h1>
              See how great
              <br />
              engineers <span>think.</span>
            </h1>
            <p>
              Run thoughtful, collaborative coding interviews that help your
              team find the right people—and give candidates room to do their
              best work.
            </p>
            <div className="hero-actions">
              <Link className="button button-orange" to="/signup">
                Start interviewing <ArrowRight size={17} />
              </Link>
              <Link className="button button-ghost" to="/platform">
                <CirclePlay size={17} /> Explore the platform
              </Link>
            </div>
            <div className="hero-trust">
              <span>
                <Check size={14} /> No setup for candidates
              </span>
              <span>
                <Check size={14} /> Real code, real conversations
              </span>
            </div>
          </motion.div>
          <motion.div
            className="hero-product"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.12 }}
          >
            <Suspense fallback={null}>
              <HeroScene />
            </Suspense>
            <div className="interview-card">
              <div className="interview-top">
                <span className="live-pill">
                  <i /> LIVE INTERVIEW
                </span>
                <span className="interview-time">00:32:18</span>
                <button type="button" aria-label="More interview options">
                  •••
                </button>
              </div>
              <div className="interview-info">
                <span className="candidate-avatar">JL</span>
                <span>
                  <strong>Jordan Lee</strong>
                  <small>Frontend Engineer · Candidate</small>
                </span>
                <span className="interview-people">
                  <span className="mini-avatar">MK</span>
                  <span className="mini-avatar interviewer">AS</span>
                  <Users size={14} />
                </span>
              </div>
              <div className="interview-workspace">
                <div className="workspace-sidebar">
                  <div className="workspace-brand">
                    <span>
                      <Code2 size={13} />
                    </span>{" "}
                    arrays-and-strings
                  </div>
                  <span className="file-selected">⌘ &nbsp;two-sum.js</span>
                  <span>⌄ &nbsp;tests</span>
                  <span className="nested-file">◇ &nbsp;two-sum.test.js</span>
                  <div className="sidebar-bottom">
                    <Radio size={12} /> Connected
                  </div>
                </div>
                <div className="code-editor">
                  <div className="editor-tabs">
                    <span>
                      two-sum.js <i />
                    </span>
                    <span className="language-select">JavaScript⌄</span>
                  </div>
                  <div className="code-content">
                    <div>
                      <b>1</b>
                      <span>
                        <em>function</em> <i>twoSum</i>(nums, target) {"{"}
                      </span>
                    </div>
                    <div>
                      <b>2</b>
                      <span>
                        &nbsp; <em>const</em> seen = <strong>new</strong> Map()
                      </span>
                    </div>
                    <div>
                      <b>3</b>
                      <span />
                    </div>
                    <div>
                      <b>4</b>
                      <span>
                        &nbsp; <em>for</em> (<em>let</em> i = 0; i &lt;
                        nums.length; i++) {"{"}
                      </span>
                    </div>
                    <div className="code-highlight">
                      <b>5</b>
                      <span>
                        &nbsp;&nbsp; <em>const</em> complement = target -
                        nums[i]
                      </span>
                      <span className="edit-cursor">Jordan</span>
                    </div>
                    <div>
                      <b>6</b>
                      <span>
                        &nbsp;&nbsp; <em>if</em> (seen.has(complement)) {"{"}
                      </span>
                    </div>
                    <div>
                      <b>7</b>
                      <span>
                        &nbsp;&nbsp;&nbsp; <em>return</em>{" "}
                        [seen.get(complement), i]
                      </span>
                    </div>
                    <div>
                      <b>8</b>
                      <span>&nbsp;&nbsp; {"}"}</span>
                    </div>
                    <div>
                      <b>9</b>
                      <span>&nbsp; {"}"}</span>
                    </div>
                    <div>
                      <b>10</b>
                      <span>{"}"}</span>
                    </div>
                  </div>
                  <div className="editor-status">
                    <span>
                      <GitBranch size={11} /> candidate-session
                    </span>
                    <span>JavaScript&nbsp; · &nbsp;UTF-8</span>
                  </div>
                </div>
              </div>
              <div className="interview-bottom">
                <span>
                  <Video size={14} /> Interview room
                </span>
                <span>
                  <MessageSquare size={14} /> Notes{" "}
                  <i className="note-count">3</i>
                </span>
                <span className="bottom-spacer" />
                <button type="button" className="run-button">
                  <Zap size={13} fill="currentColor" /> Run code
                </button>
              </div>
            </div>
            <div className="floating-note">
              <span className="note-avatar">AS</span>
              <span>
                <strong>Great question</strong>
                <small>“What tradeoffs are you considering?”</small>
              </span>
              <Sparkles size={15} />
            </div>
          </motion.div>
        </div>
        <div className="hero-bottom page-container">
          <span>MADE FOR ENGINEERING TEAMS WHO HIRE WITH CARE</span>
          <div>
            <span>
              <Code2 size={15} /> Real coding
            </span>
            <span>
              <Users size={15} /> Live collaboration
            </span>
            <span>
              <ShieldCheck size={15} /> Consistent evaluation
            </span>
          </div>
        </div>
      </section>

      <section className="proof-strip">
        <div className="page-container proof-inner">
          <span>ONE SPACE FOR THE WHOLE CONVERSATION</span>
          <div>
            <span>
              <Video size={18} /> Meet your candidate
            </span>
            <ArrowRight size={15} />
            <span>
              <Code2 size={18} /> Solve together
            </span>
            <ArrowRight size={15} />
            <span>
              <MessageSquare size={18} /> Share clear feedback
            </span>
          </div>
        </div>
      </section>

      <motion.section
        className="section section-how page-container"
        {...reveal}
      >
        <div className="section-intro">
          <span className="eyebrow-label">A BETTER INTERVIEW LOOP</span>
          <h2>
            Less interview theater.
            <br />
            <span>More real signal.</span>
          </h2>
          <p>
            Give candidates the tools and space to show how they approach a
            problem. Give interviewers a better way to listen, collaborate, and
            evaluate.
          </p>
          <Link className="inline-link" to="/platform">
            Meet the platform <ArrowUpRight size={15} />
          </Link>
        </div>
        <div className="how-cards">
          <article className="how-card how-card-dark">
            <span className="feature-icon orange-icon">
              <Code2 size={19} />
            </span>
            <span className="card-kicker">01 / WORK TOGETHER</span>
            <h3>A shared editor that stays out of the way.</h3>
            <p>
              Start with a prompt, write real code together, and keep the focus
              on the problem-solving conversation.
            </p>
            <div className="mini-editor">
              <div className="mini-editor-top">
                <span />
                <span />
                <span />
                <i>solution.js</i>
              </div>
              <div>
                <b>01</b>
                <em>const</em> approach = <strong>'think together'</strong>
              </div>
              <div>
                <b>02</b>
                <em>await</em> candidate.explain()
              </div>
              <div>
                <b>03</b>
                <span className="mini-caret" />
              </div>
            </div>
          </article>
          <article className="how-card">
            <span className="feature-icon soft-orange">
              <Users size={19} />
            </span>
            <span className="card-kicker">02 / SEE THE PROCESS</span>
            <h3>Follow the thinking, not just the output.</h3>
            <p>
              Make room for discussion, hints, and the small decisions that
              reveal how someone works.
            </p>
            <div className="activity-line">
              <span className="activity-avatar">JL</span>
              <span>
                <b>Jordan</b> is thinking through edge cases
                <small>Just now · Interview room</small>
              </span>
              <span className="typing-dots">
                <i />
                <i />
                <i />
              </span>
            </div>
          </article>
          <article className="how-card">
            <span className="feature-icon soft-green">
              <Check size={19} />
            </span>
            <span className="card-kicker">03 / ALIGN YOUR TEAM</span>
            <h3>Turn notes into useful feedback.</h3>
            <p>
              Capture observations in context and leave the interview with a
              clearer, more consistent signal.
            </p>
            <div className="feedback-preview">
              <span className="feedback-score">4.5</span>
              <span>
                <b>Problem solving</b>
                <small>Explained tradeoffs clearly</small>
              </span>
              <span className="feedback-stars">★★★★★</span>
            </div>
          </article>
        </div>
      </motion.section>

      <section className="testimonial-band">
        <motion.div className="testimonial page-container" {...reveal}>
          <span className="quote-mark">“</span>
          <blockquote>
            The best interviews feel less like an exam and more like solving a
            problem with a future teammate.
          </blockquote>
          <div className="quote-author">
            <span className="author-avatar">AT</span>
            <span>
              <b>The Atellix approach</b>
              <small>Thoughtful technical hiring</small>
            </span>
          </div>
        </motion.div>
      </section>

      <motion.section className="team-photo-section page-container" {...reveal}>
        <img
          src="/images/interview-session.png"
          alt="An interviewer and candidate discussing code together"
          loading="lazy"
        />
        <div className="team-photo-copy">
          <span className="eyebrow-label">A HUMAN MOMENT, NOT A TEST</span>
          <h2>
            Make space for
            <br />
            the conversation.
          </h2>
          <p>
            Give candidates the context and confidence to show how they really
            think.
          </p>
          <Link className="inline-link" to="/solutions">
            A more human interview <ArrowRight size={15} />
          </Link>
        </div>
      </motion.section>

      <motion.section
        className="section audience-section page-container"
        {...reveal}
      >
        <div className="section-intro">
          <span className="eyebrow-label">MADE FOR THE PEOPLE IN THE ROOM</span>
          <h2>
            Better for your team.
            <br />
            <span>Better for candidates.</span>
          </h2>
          <p>
            Hiring is a two-way conversation. Make the experience clear,
            focused, and respectful from the first prompt to the final decision.
          </p>
          <Link className="button button-black" to="/solutions">
            Find your interview flow <ArrowRight size={16} />
          </Link>
        </div>
        <div className="audience-list">
          <article>
            <span className="audience-number">01</span>
            <span className="audience-icon">
              <Users size={18} />
            </span>
            <div>
              <b>Engineering teams</b>
              <p>
                Run structured interviews that help interviewers compare signal
                with confidence.
              </p>
            </div>
            <ArrowUpRight size={17} />
          </article>
          <article>
            <span className="audience-number">02</span>
            <span className="audience-icon">
              <Command size={18} />
            </span>
            <div>
              <b>Growing companies</b>
              <p>
                Bring consistency to hiring as your team and interview loops
                scale.
              </p>
            </div>
            <ArrowUpRight size={17} />
          </article>
          <article>
            <span className="audience-number">03</span>
            <span className="audience-icon">
              <Sparkles size={18} />
            </span>
            <div>
              <b>Candidate-first hiring</b>
              <p>
                Replace gotchas with relevant problems and a more human
                experience.
              </p>
            </div>
            <ArrowUpRight size={17} />
          </article>
        </div>
      </motion.section>

      <section className="blog-preview">
        <div className="page-container">
          <div className="blog-preview-heading">
            <div>
              <span className="eyebrow-label">FIELD NOTES</span>
              <h2>Thoughts on better interviews.</h2>
            </div>
            <Link className="inline-link" to="/blog">
              Visit the journal <ArrowRight size={15} />
            </Link>
          </div>
          <div className="preview-grid">
            <Link
              to="/blog/technical-interviews-that-feel-like-real-work"
              className="preview-card"
            >
              <span className="preview-art preview-art-code">
                <Code2 size={32} />
                <span>
                  1010
                  <br />
                  0101
                  <br />
                  0011
                </span>
              </span>
              <span className="article-meta">
                INTERVIEW DESIGN&nbsp; · &nbsp;6 MIN READ
              </span>
              <b>Technical interviews that feel like real work</b>
              <span className="preview-read">
                Read article <ArrowRight size={13} />
              </span>
            </Link>
            <Link
              to="/blog/a-better-way-to-evaluate-candidates"
              className="preview-card"
            >
              <span className="preview-art preview-art-notes">
                <MessageSquare size={30} />
                <span className="note-lines">
                  <i />
                  <i />
                  <i />
                </span>
              </span>
              <span className="article-meta">
                HIRING PRACTICE&nbsp; · &nbsp;5 MIN READ
              </span>
              <b>A better way to evaluate candidates</b>
              <span className="preview-read">
                Read article <ArrowRight size={13} />
              </span>
            </Link>
            <Link
              to="/blog/what-candidates-wish-interviewers-knew"
              className="preview-card"
            >
              <span className="preview-art preview-art-candidate">
                <Users size={31} />
                <span className="candidate-spark">✳</span>
              </span>
              <span className="article-meta">
                CANDIDATE EXPERIENCE&nbsp; · &nbsp;4 MIN READ
              </span>
              <b>What candidates wish interviewers knew</b>
              <span className="preview-read">
                Read article <ArrowRight size={13} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="cta-glow" />
        <div className="page-container final-cta-inner">
          <span className="eyebrow eyebrow-dark">
            <span className="status-dot" /> MAKE THE NEXT INTERVIEW COUNT
          </span>
          <h2>
            Find your next
            <br />
            great teammate.
          </h2>
          <p>Build a hiring experience that brings out the best in everyone.</p>
          <Link className="button button-orange" to="/signup">
            Get started <ArrowRight size={17} />
          </Link>
          <small>No credit card required · Set up in minutes</small>
        </div>
      </section>
      <a className="back-top" href="#top" aria-label="Back to top">
        <ArrowDown size={15} />
      </a>
    </main>
  );
};

export default Home;
