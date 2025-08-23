import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
}

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    // TODO: replace with real auth
    navigate('/dashboard')
  }

  return (
    <div className={styles.root}>
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
          <button type="submit" className={styles.submit}>
            Login
          </button>

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
