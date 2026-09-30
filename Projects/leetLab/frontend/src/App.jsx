import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import SignupPage from './Pages/SignupPage'
import LoginPage from './Pages/LoginPage'
import HomePage from './Pages/HomePage'
import { authApi } from './lib/auth.js'

const App = () => {
  const [authUser, setAuthUser] = useState(null)
  const [isCheckingSession, setIsCheckingSession] = useState(true)

  useEffect(() => {
    let isMounted = true

    authApi.checkSession()
      .then((user) => {
        if (isMounted) setAuthUser(user)
      })
      .catch(() => {
        if (isMounted) setAuthUser(null)
      })
      .finally(() => {
        if (isMounted) setIsCheckingSession(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  const handleLogin = async (credentials) => {
    const { user } = await authApi.login(credentials)
    setAuthUser(user)
  }

  const handleSignup = async (credentials) => {
    const { user } = await authApi.signup(credentials)
    setAuthUser(user)
  }

  const handleLogout = async () => {
    await authApi.logout()
    setAuthUser(null)
  }

  if (isCheckingSession) {
    return <main className="grid min-h-screen place-items-center">Checking session...</main>
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-start">
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage user={authUser} onLogout={handleLogout} /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" replace /> : <LoginPage onLogin={handleLogin} />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" replace /> : <SignupPage onSignup={handleSignup} />}
        />
        <Route path="*" element={<Navigate to={authUser ? "/" : "/login"} replace />} />
      </Routes>
    </div>
  )
}

export default App