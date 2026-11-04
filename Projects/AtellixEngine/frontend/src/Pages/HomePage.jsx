import { useState } from "react";
import {
  ArrowUpRight,
  Code2,
  FolderPlus,
  LogOut,
  ShieldCheck,
  Users,
  Sparkles,
  TerminalSquare,
} from "lucide-react";
import { Link } from "react-router-dom";

const HomePage = ({ user, onLogout }) => {
  const [error, setError] = useState("");

  const handleLogout = async () => {
    setError("");
    try {
      await onLogout();
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  return (
    <main className="workspace-page">
      <header className="workspace-nav">
        <Link className="brand" to="/">
          <span className="brand-mark">
            <Code2 size={18} />
          </span>
          atellix<span className="brand-light">engine</span>
        </Link>
        <span className="workspace-nav-label">YOUR SPACE</span>
        <button
          className="workspace-user"
          type="button"
          onClick={handleLogout}
          aria-label="Sign out"
        >
          <span className="user-avatar">
            {(user.name || user.email || "A").slice(0, 1).toUpperCase()}
          </span>
          <span>{user.name || user.email}</span>
          <LogOut size={15} />
        </button>
      </header>
      <section className="workspace-welcome">
        <span className="eyebrow">
          <span className="eyebrow-dot" /> YOUR ACCOUNT IS READY
        </span>
        <h1>Welcome, {user.name?.split(" ")[0] || "there"}.</h1>
        <p>
          Your AtellixEngine account is set up. We’re shaping a more thoughtful
          way for engineering teams to run technical interviews.
        </p>
        {error && (
          <p className="auth-error" role="alert">
            {error}
          </p>
        )}
      </section>
      <section className="workspace-empty">
        <div className="empty-art">
          <div className="empty-orbit orbit-one" />
          <div className="empty-orbit orbit-two" />
          <span className="empty-folder">
            <FolderPlus size={27} />
          </span>
          <span className="orbit-chip chip-users">
            <Users size={15} />
          </span>
          <span className="orbit-chip chip-code">
            <Code2 size={15} />
          </span>
        </div>
        <div className="empty-copy">
          <span className="eyebrow-label">YOUR NEXT INTERVIEW, REIMAGINED</span>
          <h2>
            A better interview
            <br />
            starts here.
          </h2>
          <p>
            Collaborative interview rooms and interviewer tools are in
            development. We’ll keep your account ready for early access.
          </p>
          <button
            className="button button-dark"
            type="button"
            disabled
            title="Interview rooms are in development"
          >
            Interview rooms are coming soon <ArrowUpRight size={15} />
          </button>
        </div>
      </section>
      <section className="workspace-next">
        <div className="next-heading">
          <span className="eyebrow-label">THE ATELLIX APPROACH</span>
          <h2>Tools for a more human interview.</h2>
        </div>
        <div className="next-grid">
          <article>
            <span className="principle-icon lavender">
              <Users size={18} />
            </span>
            <strong>Live collaboration</strong>
            <p>Work through practical coding prompts together.</p>
            <span className="coming-label">IN DEVELOPMENT</span>
          </article>
          <article>
            <span className="principle-icon peach">
              <Sparkles size={18} />
            </span>
            <strong>Structured feedback</strong>
            <p>Turn observations into a clearer team signal.</p>
            <span className="coming-label">PLANNED</span>
          </article>
          <article>
            <span className="principle-icon mint">
              <TerminalSquare size={18} />
            </span>
            <strong>Reliable code execution</strong>
            <p>Run candidate code with useful, consistent feedback.</p>
            <span className="coming-label">PLANNED</span>
          </article>
        </div>
      </section>
      <footer className="workspace-footer">
        <span>
          <ShieldCheck size={14} /> Your workspace access is tied to your
          account.
        </span>
        <span>AtellixEngine · Early access concept</span>
      </footer>
    </main>
  );
};

export default HomePage;
