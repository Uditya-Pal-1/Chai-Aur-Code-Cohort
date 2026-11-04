import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { authApi } from "./lib/auth.js";

const SignupPage = lazy(() => import("./Pages/SignupPage"));
const LoginPage = lazy(() => import("./Pages/LoginPage"));
const HomePage = lazy(() => import("./Pages/HomePage"));
const LandingPage = lazy(() => import("./Pages/LandingPage"));
const SiteLayout = lazy(() => import("./components/SiteLayout"));
const ProductPage = lazy(() => import("./Pages/ProductPage"));
const BlogPage = lazy(() => import("./Pages/BlogPage"));
const BlogPostPage = lazy(() => import("./Pages/BlogPostPage"));
const LegalPage = lazy(() => import("./Pages/LegalPage"));

const App = () => {
  const [authUser, setAuthUser] = useState(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    let isMounted = true;

    authApi
      .checkSession()
      .then((user) => {
        if (isMounted) setAuthUser(user);
      })
      .catch(() => {
        if (isMounted) setAuthUser(null);
      })
      .finally(() => {
        if (isMounted) setIsCheckingSession(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogin = async (credentials) => {
    const { user } = await authApi.login(credentials);
    setAuthUser(user);
  };

  const handleSignup = async (credentials) => {
    const { user } = await authApi.signup(credentials);
    setAuthUser(user);
  };

  const handleLogout = async () => {
    await authApi.logout();
    setAuthUser(null);
  };

  if (isCheckingSession) {
    return <main className="page-fallback">Preparing your workspace...</main>;
  }

  return (
    <Suspense
      fallback={<main className="page-fallback">Loading AtellixEngine...</main>}
    >
      <Routes>
        <Route element={<SiteLayout />}>
          <Route
            path="/"
            element={
              authUser ? <Navigate to="/workspace" replace /> : <LandingPage />
            }
          />
          <Route path="/platform" element={<ProductPage page="platform" />} />
          <Route path="/solutions" element={<ProductPage page="solutions" />} />
          <Route path="/pricing" element={<ProductPage page="pricing" />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/privacy" element={<LegalPage page="privacy" />} />
          <Route path="/terms" element={<LegalPage page="terms" />} />
          <Route path="/security" element={<LegalPage page="security" />} />
        </Route>
        <Route
          path="/workspace"
          element={
            authUser ? (
              <HomePage user={authUser} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/login"
          element={
            authUser ? (
              <Navigate to="/" replace />
            ) : (
              <LoginPage onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            authUser ? (
              <Navigate to="/" replace />
            ) : (
              <SignupPage onSignup={handleSignup} />
            )
          }
        />
        <Route
          path="*"
          element={<Navigate to={authUser ? "/workspace" : "/"} replace />}
        />
      </Routes>
    </Suspense>
  );
};

export default App;
