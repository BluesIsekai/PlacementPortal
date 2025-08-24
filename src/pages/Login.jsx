import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { auth, isFirebaseConfigured } from '../lib/firebase'

// Inline styles (Tailwind class strings) grouped for readability
const styles = {
  root: 'grid min-h-screen md:grid-cols-2',
  preview:
    "relative hidden bg-slate-900 text-white md:block bg-[url('/vite.svg')] bg-no-repeat bg-center bg-[length:220px]",
  previewOverlay:
    'absolute inset-0 flex flex-col justify-center bg-slate-900/70 p-8',
  title: 'text-3xl font-bold md:text-4xl',
  lead: 'mt-2 opacity-90',
  list: 'mt-6 space-y-2 text-sm opacity-90',
  formWrap: 'flex items-center justify-center p-6',
  form: 'w-full max-w-sm space-y-4',
  heading: 'text-center text-2xl font-semibold',
  label: 'mb-1 block text-sm',
  input:
    'w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-indigo-500',
  inputPwd:
    'w-full rounded-md border border-slate-300 bg-white px-3 py-2 pr-10 text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-indigo-500',
  toggle:
    'absolute inset-y-0 right-2 my-auto text-xs text-indigo-600 hover:underline',
  submit:
    'inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-4 py-2 font-medium text-white transition-colors hover:bg-indigo-700',
  actions: 'flex items-center justify-between text-sm',
  link: 'text-indigo-500 hover:underline',
  providerWrap: 'space-y-3',
  googleBtn:
    'inline-flex w-full items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 hover:bg-slate-50',
}

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/dashboard')
    } catch (err) {
      const msg = err?.message || 'Login failed'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  const onGoogle = async () => {
    setError('')
    setLoading(true)
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      navigate('/dashboard')
    } catch (err) {
      setError(err?.message || 'Google sign-in failed')
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
      <div className={styles.preview}>
        <div className={styles.previewOverlay}>
          <h1 className={styles.title}>Placement Portal</h1>
          <p className={styles.lead}>
            Practice coding, take quizzes, and explore company-wise questions.
          </p>
          <ul className={styles.list}>
            <li>• Coding Questions with filters</li>
            <li>• Timed Quizzes with scorecards</li>
            <li>• Company-wise interview questions</li>
          </ul>
        </div>
      </div>

      <div className={styles.formWrap}>
        <form className={styles.form} onSubmit={onSubmit}>
          <h2 className={styles.heading}>Login</h2>
          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}
          <div>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className={styles.label}>Password</label>
            <div className="relative">
              <input
                type={show ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className={styles.inputPwd}
                placeholder="••••••••"
              />
              <button
                type="button"
                className={styles.toggle}
                onClick={() => setShow((v) => !v)}
                aria-label={show ? 'Hide password' : 'Show password'}
              >
                {show ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <button type="submit" className={styles.submit} disabled={loading}>
            {loading ? 'Logging in…' : 'Login'}
          </button>

          <div className={styles.providerWrap}>
            <div className="relative my-2 text-center text-xs text-slate-500">
              <span className="relative z-10 bg-white px-2">or</span>
              <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-slate-200" />
            </div>
            <button
              type="button"
              className={styles.googleBtn}
              onClick={onGoogle}
              disabled={loading}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="h-5 w-5"
              >
                <path
                  fill="#FFC107"
                  d="M43.611 20.083H42V20H24v8h11.303C33.826 31.91 29.278 35 24 35c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.156 7.957 3.043l5.657-5.657C34.676 5.108 29.614 3 24 3 12.954 3 4 11.954 4 23s8.954 20 20 20c10 0 19-7.5 19-20 0-1.341-.138-2.667-.389-3.917z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306 14.691l6.571 4.817C14.644 16.264 18.961 13 24 13c3.059 0 5.842 1.156 7.957 3.043l5.657-5.657C34.676 5.108 29.614 3 24 3 16.318 3 9.656 7.337 6.306 14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24 43c5.192 0 9.86-1.742 13.474-4.727l-6.211-5.237C29.278 35 27.017 36 24 36c-5.248 0-9.811-3.106-11.737-7.557l-6.59 5.077C8.974 39.556 15.955 43 24 43z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611 20.083H42V20H24v8h11.303c-1.094 3.244-3.563 5.854-6.84 7.036l6.211 5.237C36.109 39.205 40 33.5 40 25c0-1.341-.138-2.667-.389-3.917z"
                />
              </svg>
              {loading ? 'Please wait…' : 'Continue with Google'}
            </button>
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.link}>
              Forgot Password?
            </button>
            <button
              type="button"
              className={styles.link}
              onClick={() => navigate('/register')}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
