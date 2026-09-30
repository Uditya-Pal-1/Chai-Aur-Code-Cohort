import { useState } from 'react'
import { Link } from 'react-router-dom'

const SignupPage = ({ onSignup }) => {
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    try {
      await onSignup({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
      })
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="grid min-h-screen w-full place-items-center bg-base-200 px-4 py-10">
      <section className="w-full max-w-md rounded-lg bg-base-100 p-8 shadow-lg">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">LeetLab</p>
        <h1 className="mt-2 text-3xl font-bold">Create your account</h1>
        <p className="mt-2 text-base-content/70">Save your submissions and track solved problems.</p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <label className="form-control w-full">
            <span className="label-text mb-2">Name</span>
            <input className="input input-bordered w-full" type="text" name="name" autoComplete="name" required />
          </label>
          <label className="form-control w-full">
            <span className="label-text mb-2">Email</span>
            <input className="input input-bordered w-full" type="email" name="email" autoComplete="email" required />
          </label>
          <label className="form-control w-full">
            <span className="label-text mb-2">Password</span>
            <input className="input input-bordered w-full" type="password" name="password" autoComplete="new-password" required />
          </label>
          {error && <p className="text-sm text-error" role="alert">{error}</p>}
          <button className="btn btn-primary w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Already registered? <Link className="link link-primary" to="/login">Sign in</Link>
        </p>
      </section>
    </main>
  )
}

export default SignupPage