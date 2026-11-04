import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Code2, ShieldCheck } from "lucide-react";

const LoginPage = ({ onLogin }) => {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    try {
      await onLogin({
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
            New to Atellix? <Link to="/signup">Create account</Link>
          </span>
        </div>
        <div className="auth-content">
          <h1>Welcome back.</h1>
          <p className="auth-subtitle">
            Sign in to pick up where your team left off.
          </p>
          <form className="auth-form" onSubmit={handleSubmit}>
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
                autoComplete="current-password"
                placeholder="Enter your password"
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
                "Signing in…"
              ) : (
                <>
                  Sign in <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>
          <p className="auth-legal">
            <ShieldCheck
              size={13}
              style={{ verticalAlign: "-2px", marginRight: 5 }}
            />
            Your workspace access is protected by your account permissions.
          </p>
          <p className="auth-switch">
            New to AtellixEngine? <Link to="/signup">Create an account</Link>
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
          <h2>Give good ideas room to grow.</h2>
          <p>
            A shared workspace for teams who want to spend less time getting set
            up and more time making something great.
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

export default LoginPage;
