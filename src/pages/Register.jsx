import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, isFirebaseConfigured } from '../lib/firebase'

const styles = {
  root: 'min-h-screen grid md:grid-cols-2',
  panel:
    "relative hidden bg-slate-900 text-white md:block bg-[url('/vite.svg')] bg-no-repeat bg-center bg-[length:220px]",
  overlay: 'absolute inset-0 bg-slate-900/70 p-8 flex flex-col justify-center',
  title: 'text-3xl font-bold md:text-4xl',
  formWrap: 'flex items-center justify-center p-6',
  form: 'w-full max-w-sm space-y-4',
  heading: 'text-center text-2xl font-semibold',
  label: 'mb-1 block text-sm',
  input:
    'w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-indigo-500',
  submit:
    'w-full inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700 transition-colors',
  link: 'text-indigo-600 hover:underline text-sm',
}

export default function Register() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }
    if (!isFirebaseConfigured) {
      setError(
        'Firebase is not configured. Fill .env VITE_FIREBASE_* and restart dev server.',
      )
      return
    }
    setLoading(true)
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password)
      if (name) {
        await updateProfile(cred.user, { displayName: name })
      }
      navigate('/dashboard')
    } catch (err) {
      setError(err?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.root}>
      {!isFirebaseConfigured && (
        <div className="absolute top-2 left-1/2 z-20 w-[90%] max-w-xl -translate-x-1/2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
          Firebase is not configured. Copy .env.example to .env and set your
          VITE_FIREBASE_* keys, then restart the dev server.
        </div>
      )}
      <div className={styles.panel}>
        <div className={styles.overlay}>
          <h1 className={styles.title}>Create your account</h1>
          <p className="mt-2 opacity-90">
            Access quizzes, coding questions, and reports.
          </p>
        </div>
      </div>
      <div className={styles.formWrap}>
        <form className={styles.form} onSubmit={onSubmit}>
          <h2 className={styles.heading}>Register</h2>
          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}
          <div>
            <label className={styles.label}>Name</label>
            <input
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Your name"
            />
          </div>
          <div>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="Minimum 6 characters"
            />
          </div>
          <div>
            <label className={styles.label}>Confirm Password</label>
            <input
              type="password"
              className={styles.input}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              minLength={6}
              placeholder="Re-enter password"
            />
          </div>
          <button type="submit" className={styles.submit} disabled={loading}>
            {loading ? 'Creating…' : 'Create account'}
          </button>
          <div className="text-center">
            <Link to="/" className={styles.link}>
              Already have an account? Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
