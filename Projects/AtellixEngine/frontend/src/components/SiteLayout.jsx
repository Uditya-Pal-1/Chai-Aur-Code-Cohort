import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { ArrowUpRight, Code2, Menu, X } from "lucide-react";

const navItems = [
  ["Platform", "/platform"],
  ["Solutions", "/solutions"],
  ["Pricing", "/pricing"],
  ["Resources", "/blog"],
];

const SiteLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <header className="site-header">
        <Link
          className="brand"
          to="/"
          onClick={closeMenu}
          aria-label="Atellix home"
        >
          <span className="brand-mark">
            <Code2 size={18} />
          </span>
          atellix<span className="brand-light">engine</span>
        </Link>
        <nav
          className={menuOpen ? "main-nav is-open" : "main-nav"}
          aria-label="Main navigation"
        >
          {navItems.map(([label, href]) => (
            <NavLink key={href} to={href} onClick={closeMenu}>
              {label}
            </NavLink>
          ))}
          <Link className="mobile-nav-link" to="/login" onClick={closeMenu}>
            Sign in
          </Link>
          <Link
            className="button button-orange mobile-cta"
            to="/signup"
            onClick={closeMenu}
          >
            Get started <ArrowUpRight size={15} />
          </Link>
        </nav>
        <div className="header-actions">
          <Link className="header-login" to="/login">
            Sign in
          </Link>
          <Link className="button button-orange header-cta" to="/signup">
            Get started <ArrowUpRight size={15} />
          </Link>
        </div>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>
      <Outlet />
      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand-block">
            <Link className="brand" to="/">
              <span className="brand-mark">
                <Code2 size={18} />
              </span>
              atellix<span className="brand-light">engine</span>
            </Link>
            <p>Better technical interviews start with better conversations.</p>
          </div>
          <div className="footer-column">
            <strong>Explore</strong>
            <Link to="/platform">Platform</Link>
            <Link to="/solutions">Solutions</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/blog">Blog</Link>
          </div>
          <div className="footer-column">
            <strong>Company</strong>
            <a href="mailto:hello@atellixengine.com">Contact</a>
            <Link to="/security">Security</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
          </div>
          <div className="footer-cta">
            <span>Make every interview count.</span>
            <Link className="button button-outline" to="/signup">
              Get started <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 AtellixEngine. All rights reserved.</span>
          <span>Designed for thoughtful engineering teams.</span>
          <div>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SiteLayout;
