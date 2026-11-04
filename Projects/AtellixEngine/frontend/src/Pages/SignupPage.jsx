import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Code2, ShieldCheck } from "lucide-react";

const SignupPage = ({ onSignup }) => {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    try {
      await onSignup({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
      });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-panel">
        <div className="auth-top">
          <Link className="brand" to="/">
            <span className="brand-mark">
              <Code2 size={18} />
            </span>
            atellix<span className="brand-light">engine</span>
          </Link>
          <span>
            Have an account? <Link to="/login">Sign in</Link>
          </span>
        </div>
        <div className="auth-content">
          <h1>Make room to build.</h1>
          <p className="auth-subtitle">
            Create an account and bring your team’s next idea into focus.
          </p>
          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="auth-label">
              Your name
              <input
                className="auth-input"
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Alex Morgan"
                required
              />
            </label>
            <label className="auth-label">
              Work email
              <input
                className="auth-input"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@company.com"
                required
              />
            </label>
            <label className="auth-label">
              Password
              <input
                className="auth-input"
                type="password"
                name="password"
                autoComplete="new-password"
                placeholder="Create a password"
                minLength="8"
                required
              />
            </label>
            {error && (
              <p className="auth-error" role="alert">
                {error}
              </p>
            )}
            <button
              className="auth-submit"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Creating your account…"
              ) : (
                <>
                  Create account <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>
          <p className="auth-legal">
            <ShieldCheck
              size={13}
              style={{ verticalAlign: "-2px", marginRight: 5 }}
            />
            Your account keeps your workspace access in your hands.
          </p>
          <p className="auth-switch">
            Already registered? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </section>
      <aside className="auth-aside">
        <Link className="brand aside-brand" to="/">
          <span className="brand-mark">
            <Code2 size={18} />
          </span>
          atellix<span className="brand-light">engine</span>
        </Link>
        <div className="auth-aside-copy">
          <span>BUILD BETTER, TOGETHER</span>
          <h2>Good work is a team effort.</h2>
          <p>
            Atellix brings the people, ideas, and tools behind your next great
            project into one thoughtful workspace.
          </p>
        </div>
        <div className="auth-quote">
          “The best tools make the hard parts feel a little more human.”
          <span>AtellixEngine · Product principle</span>
        </div>
      </aside>
    </main>
  );
};

export default SignupPage;
