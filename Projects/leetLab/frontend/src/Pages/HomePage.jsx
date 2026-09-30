import { useState } from 'react'

const HomePage = ({ user, onLogout }) => {
  const [error, setError] = useState('')

  const handleLogout = async () => {
    setError('')
    try {
      await onLogout()
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  return (
    <main className="min-h-screen w-full bg-base-200 px-4 py-10">
      <section className="mx-auto flex max-w-4xl items-center justify-between gap-6 border-b border-base-300 pb-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">LeetLab</p>
          <h1 className="mt-2 text-3xl font-bold">Welcome, {user.name || user.email}</h1>
          <p className="mt-2 text-base-content/70">Your coding practice account is ready.</p>
        </div>
        <button className="btn btn-outline" type="button" onClick={handleLogout}>Sign out</button>
      </section>
      {error && <p className="mx-auto mt-4 max-w-4xl text-sm text-error" role="alert">{error}</p>}
    </main>
  )
}

export default HomePage