import { motion, useReducedMotion } from 'framer-motion'
import { LogIn, MessageSquareText, Send, Star } from 'lucide-react'
import { useEffect, useState, type FormEvent } from 'react'

interface User {
  id: string
  name: string
  email: string
  avatarUrl?: string
}
interface Review {
  id: string
  name: string
  avatarUrl?: string
  rating: number
  message: string
  createdAt: string
}
const api = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [authOpen, setAuthOpen] = useState(false)
  const [registerMode, setRegisterMode] = useState(false)
  const [rating, setRating] = useState(5)
  const [notice, setNotice] = useState('')
  const [busy, setBusy] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    let active = true
    void fetch(`${api}/api/reviews`, { credentials: 'include' })
      .then(async (response) => {
        const result = await response.json()
        if (!response.ok) throw new Error(result.message || 'Reviews are temporarily unavailable.')
        if (active) setReviews(result.data ?? [])
      })
      .catch(() => {
        if (active)
          setNotice(
            'Reviews are temporarily unavailable. Start the API and configure MongoDB to connect.',
          )
      })
    void fetch(`${api}/api/account/me`, { credentials: 'include' })
      .then(async (response) => (response.ok ? response.json() : null))
      .then((result) => {
        if (active && result?.user) setUser(result.user)
      })
      .catch(() => {})
    return () => {
      active = false
    }
  }, [])

  const submitAuth = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setBusy(true)
    setNotice('')
    const values = new FormData(event.currentTarget)
    const payload = Object.fromEntries(values.entries())
    try {
      const response = await fetch(`${api}/api/account/${registerMode ? 'register' : 'login'}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Could not sign in.')
      setUser(result.user)
      setAuthOpen(false)
      setNotice(`Signed in as ${result.user.name}. You can add a review below.`)
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'The account service is unavailable.')
    } finally {
      setBusy(false)
    }
  }

  const submitReview = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    setBusy(true)
    const values = new FormData(form)
    try {
      const response = await fetch(`${api}/api/reviews`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: values.get('message'), rating, productId: 'atellixui' }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Could not post your review.')
      setReviews((items) => [result.data, ...items])
      form.reset()
      setRating(5)
      setNotice('Thanks. Your review is now visible.')
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'The review service is unavailable.')
    } finally {
      setBusy(false)
    }
  }

  const logout = async () => {
    await fetch(`${api}/api/account/logout`, { method: 'POST', credentials: 'include' }).catch(
      () => {},
    )
    setUser(null)
    setNotice('You have signed out.')
  }

  return (
    <section
      className="relative overflow-hidden border-y border-white/[.07] bg-zinc-950 py-20 sm:py-28"
      aria-labelledby="community-title"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(251,146,60,.08),transparent_35%)]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <header className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="font-mono text-xs tracking-[.2em] text-orange-300 uppercase">
              Community voices
            </span>
            <h2
              id="community-title"
              className="mt-3 mb-0 text-3xl font-semibold tracking-tight sm:text-5xl"
            >
              Built in the open.
              <br />
              Reviewed by the people using it.
            </h2>
            <p className="mt-4 mb-0 max-w-xl leading-7 text-zinc-400">
              Share what works, what needs attention, and the components you want to see next.
            </p>
          </div>
          {user ? (
            <div className="flex items-center gap-3">
              <Avatar user={user} />
              <span className="text-sm text-zinc-300">{user.name}</span>
              <button
                onClick={logout}
                className="text-xs text-zinc-500 hover:text-white"
                type="button"
              >
                Sign out
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setAuthOpen((open) => !open)
                setNotice('')
              }}
              className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-white/15 px-4 py-2.5 text-sm text-zinc-100 transition hover:border-orange-300/40 sm:self-auto"
              type="button"
            >
              <LogIn size={15} /> Sign in to review
            </button>
          )}
        </header>

        {notice && (
          <p
            role="status"
            className="mb-5 rounded-xl border border-white/10 bg-white/[.03] px-4 py-3 text-sm text-zinc-300"
          >
            {notice}
          </p>
        )}

        {authOpen && (
          <form
            onSubmit={submitAuth}
            className="mb-6 grid gap-3 rounded-2xl border border-white/10 bg-zinc-900/80 p-5 sm:grid-cols-2"
            aria-label={registerMode ? 'Create account' : 'Sign in'}
          >
            {registerMode && (
              <label className="text-xs text-zinc-400">
                Display name
                <input
                  required
                  name="name"
                  minLength={2}
                  maxLength={80}
                  autoComplete="name"
                  placeholder="Your name"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-white"
                />
              </label>
            )}
            <label className="text-xs text-zinc-400">
              Email
              <input
                required
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-white"
              />
            </label>
            <label className="text-xs text-zinc-400">
              Password
              <input
                required
                name="password"
                type="password"
                minLength={registerMode ? 10 : undefined}
                autoComplete={registerMode ? 'new-password' : 'current-password'}
                placeholder={registerMode ? 'At least 10 characters' : 'Your password'}
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-white"
              />
            </label>
            {registerMode && (
              <label className="text-xs text-zinc-400">
                Profile photo URL <span className="text-zinc-600">(optional, https)</span>
                <input
                  name="avatarUrl"
                  type="url"
                  placeholder="https://…"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-white"
                />
              </label>
            )}
            <div className="flex items-center gap-4 sm:col-span-2">
              <button
                disabled={busy}
                className="rounded-xl bg-orange-300 px-4 py-2.5 text-sm font-semibold text-zinc-950 disabled:opacity-60"
                type="submit"
              >
                {busy ? 'Please wait…' : registerMode ? 'Create account' : 'Sign in'}
              </button>
              <button
                onClick={() => setRegisterMode((value) => !value)}
                className="text-sm text-orange-200"
                type="button"
              >
                {registerMode ? 'Already have an account? Sign in' : 'Create an account'}
              </button>
            </div>
          </form>
        )}

        {user && (
          <form
            onSubmit={submitReview}
            className="mb-7 rounded-2xl border border-orange-300/15 bg-orange-300/[.035] p-5 sm:p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <label htmlFor="review-message" className="font-medium">
                Leave a review
              </label>
              <div className="flex gap-1" role="group" aria-label="Rating from 1 to 5">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    onClick={() => setRating(value)}
                    className={value <= rating ? 'text-amber-300' : 'text-zinc-700'}
                    aria-label={`${value} star${value === 1 ? '' : 's'}`}
                    aria-pressed={rating === value}
                    type="button"
                  >
                    <Star size={17} fill="currentColor" />
                  </button>
                ))}
              </div>
            </div>
            <textarea
              id="review-message"
              name="message"
              required
              minLength={12}
              maxLength={600}
              placeholder="What was useful? What could be better?"
              className="min-h-24 w-full resize-y rounded-xl border border-white/10 bg-black/30 p-3 text-sm leading-6 text-white outline-none focus:border-orange-300/40"
            />
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-zinc-500">
                Your name and profile photo appear with your review.
              </span>
              <button
                disabled={busy}
                className="inline-flex items-center gap-2 rounded-xl bg-orange-300 px-4 py-2 text-sm font-semibold text-zinc-950 disabled:opacity-60"
                type="submit"
              >
                Post review <Send size={14} />
              </button>
            </div>
          </form>
        )}

        {reviews.length ? (
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {reviews.map((review, index) => (
              <motion.article
                key={review.id}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.25) }}
                className="mb-4 break-inside-avoid rounded-2xl border border-white/10 bg-gradient-to-br from-white/[.055] to-white/[.018] p-5 shadow-lg shadow-black/20"
              >
                <div className="flex items-center gap-3">
                  <Avatar user={{ name: review.name, avatarUrl: review.avatarUrl }} />
                  <div className="min-w-0">
                    <h3 className="m-0 truncate text-sm font-semibold text-zinc-100">
                      {review.name}
                    </h3>
                    <p className="m-0 mt-0.5 text-xs text-zinc-500">
                      {new Date(review.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <span
                    className="ml-auto flex shrink-0 text-amber-300"
                    aria-label={`${review.rating} out of 5 stars`}
                  >
                    {Array.from({ length: review.rating }, (_, i) => (
                      <Star key={i} size={12} fill="currentColor" />
                    ))}
                  </span>
                </div>
                <blockquote className="mt-4 mb-0 text-sm leading-6 text-zinc-300">
                  “{review.message}”
                </blockquote>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-white/15 bg-white/[.015] px-6 py-12 text-center">
            <MessageSquareText size={22} className="mx-auto text-zinc-500" />
            <h3 className="mt-4 mb-1 text-lg font-medium">Be the first to leave a note.</h3>
            <p className="m-0 text-sm text-zinc-500">
              Community reviews will appear here with their authors’ profile photos.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

function Avatar({ user }: { user: { name: string; avatarUrl?: string } }) {
  return user.avatarUrl ? (
    <img
      src={user.avatarUrl}
      alt={`${user.name}'s profile`}
      referrerPolicy="no-referrer"
      className="size-10 rounded-full border border-white/10 bg-zinc-800 object-cover"
    />
  ) : (
    <span
      aria-label={`${user.name}'s profile`}
      className="grid size-10 shrink-0 place-items-center rounded-full border border-orange-300/15 bg-orange-300/10 text-sm font-semibold text-orange-100"
    >
      {user.name.trim().slice(0, 1).toUpperCase()}
    </span>
  )
}
