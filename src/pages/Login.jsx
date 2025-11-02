import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { auth, isFirebaseConfigured } from '../lib/firebase'
import { getUserProfileStatus, markAsReturningUser } from '../utils/profileUtils'
import {
  Sun,
  Moon,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
} from 'lucide-react'

// Theme configuration
const themes = {
  light: {
    root: 'min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50',
    leftPanel:
      'relative hidden lg:flex lg:flex-col lg:justify-center lg:items-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-12 text-white overflow-hidden',
    rightPanel:
      'flex flex-col justify-center px-6 py-12 lg:px-8 bg-white/80 backdrop-blur-sm',
    card: 'mx-auto w-full max-w-md space-y-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8',
    title: 'text-4xl lg:text-5xl font-bold text-white mb-6',
    subtitle: 'text-lg text-white/90 mb-8 max-w-md',
    feature: 'flex items-center space-x-3 text-white/80 mb-4',
    heading: 'text-3xl font-bold text-gray-900 text-center mb-2',
    subheading: 'text-gray-600 text-center mb-8',
    label: 'block text-sm font-medium text-gray-700 mb-2',
    input:
      'w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/80',
    button:
      'w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
    googleBtn:
      'w-full border border-gray-200 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200 flex items-center justify-center space-x-2 bg-white/80',
    themeToggle:
      'fixed top-6 right-6 p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all duration-200 z-50',
    error:
      'bg-red-50 border border-red-200 text-red-800 rounded-xl p-3 text-sm',
    warning:
      'bg-amber-50 border border-amber-200 text-amber-800 rounded-xl p-3 text-sm',
    success:
      'bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl p-3 text-sm',
  },
  dark: {
    root: 'min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black',
    leftPanel:
      'relative hidden lg:flex lg:flex-col lg:justify-center lg:items-center bg-gradient-to-br from-slate-800 via-purple-900 to-indigo-900 p-12 text-white overflow-hidden',
    rightPanel:
      'flex flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900/80 backdrop-blur-sm',
    card: 'mx-auto w-full max-w-md space-y-8 bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 p-8',
    title: 'text-4xl lg:text-5xl font-bold text-white mb-6',
    subtitle: 'text-lg text-gray-300 mb-8 max-w-md',
    feature: 'flex items-center space-x-3 text-gray-300 mb-4',
    heading: 'text-3xl font-bold text-white text-center mb-2',
    subheading: 'text-gray-400 text-center mb-8',
    label: 'block text-sm font-medium text-gray-300 mb-2',
    input:
      'w-full px-4 py-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-700/50 text-white placeholder-gray-400',
    button:
      'w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800',
    googleBtn:
      'w-full border border-gray-600 text-gray-300 py-3 px-4 rounded-xl font-medium hover:bg-gray-700/50 transition-all duration-200 flex items-center justify-center space-x-2 bg-gray-700/30',
    themeToggle:
      'fixed top-6 right-6 p-3 rounded-full bg-gray-800/60 backdrop-blur-sm border border-gray-700 text-gray-300 hover:bg-gray-700/60 transition-all duration-200 z-50',
    error:
      'bg-red-900/50 border border-red-700 text-red-300 rounded-xl p-3 text-sm',
    warning:
      'bg-amber-900/50 border border-amber-700 text-amber-300 rounded-xl p-3 text-sm',
    success:
      'bg-emerald-900/40 border border-emerald-700 text-emerald-200 rounded-xl p-3 text-sm',
  },
  gradient: {
    root: 'min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600',
    leftPanel:
      'relative hidden lg:flex lg:flex-col lg:justify-center lg:items-center bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 p-12 text-white overflow-hidden',
    rightPanel:
      'flex flex-col justify-center px-6 py-12 lg:px-8 bg-white/10 backdrop-blur-lg',
    card: 'mx-auto w-full max-w-md space-y-8 bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/30 p-8',
    title: 'text-4xl lg:text-5xl font-bold text-white mb-6',
    subtitle: 'text-lg text-white/90 mb-8 max-w-md',
    feature: 'flex items-center space-x-3 text-white/80 mb-4',
    heading: 'text-3xl font-bold text-white text-center mb-2',
    subheading: 'text-white/80 text-center mb-8',
    label: 'block text-sm font-medium text-white mb-2',
    input:
      'w-full px-4 py-3 border border-white/30 rounded-xl focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200 bg-white/20 text-white placeholder-white/60',
    button:
      'w-full bg-white/20 backdrop-blur-sm text-white py-3 px-4 rounded-xl font-medium hover:bg-white/30 transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white/50 border border-white/30',
    googleBtn:
      'w-full border border-white/30 text-white py-3 px-4 rounded-xl font-medium hover:bg-white/20 transition-all duration-200 flex items-center justify-center space-x-2 bg-white/10',
    themeToggle:
      'fixed top-6 right-6 p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all duration-200 z-50',
    error:
      'bg-red-500/20 border border-red-400/30 text-red-100 rounded-xl p-3 text-sm backdrop-blur-sm',
    warning:
      'bg-amber-500/20 border border-amber-400/30 text-amber-100 rounded-xl p-3 text-sm backdrop-blur-sm',
    success:
      'bg-emerald-500/20 border border-emerald-400/30 text-emerald-100 rounded-xl p-3 text-sm backdrop-blur-sm',
  },
}

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [resetting, setResetting] = useState(false)

  // Theme state - stored in localStorage for persistence
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('login-theme') || 'light'
  })

  const styles = themes[currentTheme]

  // Save theme preference
  useEffect(() => {
    localStorage.setItem('login-theme', currentTheme)
  }, [currentTheme])

  const cycleTheme = () => {
    const themeOrder = ['light', 'dark', 'gradient']
    const currentIndex = themeOrder.indexOf(currentTheme)
    const nextIndex = (currentIndex + 1) % themeOrder.length
    setCurrentTheme(themeOrder[nextIndex])
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)
    
    try {
      let loginSuccess = false;
      let userEmail = email;

      // Try Firebase login first (if configured)
      if (isFirebaseConfigured && auth) {
        try {
          await signInWithEmailAndPassword(auth, email, password)
          userEmail = email;
          loginSuccess = true;
          console.log('✅ Firebase login successful');
        } catch (firebaseError) {
          console.warn('Firebase login failed, trying backend only:', firebaseError.message);
          // Continue with backend login even if Firebase fails
        }
      }

      // Try backend login for profile management
      try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password
          })
        });

        const data = await response.json();

        if (response.ok && data.success) {
          // Store authentication data
          localStorage.setItem('token', data.token);
          localStorage.setItem('authToken', data.token);
          localStorage.setItem('userEmail', data.user.email);
          localStorage.setItem('userName', data.user.name);
          
          // Store user data
          localStorage.setItem('user', JSON.stringify(data.user));
          
          loginSuccess = true;
          console.log('✅ Backend login successful:', data);
          
        } else {
          if (!loginSuccess) {
            throw new Error(data.message || 'Backend login failed');
          }
        }
      } catch (backendError) {
        console.error('Backend login failed:', backendError);
        
        if (!loginSuccess) {
          throw new Error(backendError.message || 'Login failed. Please check your credentials.');
        } else {
          console.warn('Firebase login succeeded but backend failed. Creating demo token.');
          localStorage.setItem('token', 'firebase_token_' + Date.now());
          localStorage.setItem('userEmail', userEmail);
        }
      }

      if (loginSuccess) {
        // Check if profile is complete and redirect accordingly
        const { isComplete } = getUserProfileStatus();
        
        if (isComplete) {
          // Mark as returning user and go to dashboard
          markAsReturningUser();
          navigate('/dashboard');
        } else {
          // First-time user or incomplete profile - redirect to complete profile
          navigate('/complete-profile');
        }
      }
      
    } catch (err) {
      const msg = err?.message || 'Login failed'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  const onGoogle = async () => {
    setError('')
    setSuccess('')
    setLoading(true)
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      
      // Store user info for profile completion
      const user = result.user
      localStorage.setItem('userEmail', user.email)
      localStorage.setItem('userName', user.displayName || user.email)
      localStorage.setItem('token', 'google_token_' + Date.now())
      
      // Check if profile is complete and redirect accordingly
      const { isComplete } = getUserProfileStatus()
      
      if (isComplete) {
        // Mark as returning user and go to dashboard
        markAsReturningUser()
        navigate('/dashboard')
      } else {
        // First-time user or incomplete profile - redirect to complete profile
        navigate('/complete-profile')
      }
    } catch (err) {
      setError(err?.message || 'Google sign-in failed')
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordReset = async () => {
    setError('')
    setSuccess('')

    if (!isFirebaseConfigured || !auth) {
      setError('Password reset is unavailable while Firebase is not configured.')
      return
    }

    if (!email) {
      setError('Enter your email address before requesting a password reset.')
      return
    }

    setResetting(true)
    try {
      await sendPasswordResetEmail(auth, email)
      setSuccess('Password reset email sent. Check your inbox for further instructions.')
    } catch (err) {
      setError(err?.message || 'Unable to send password reset email right now.')
    } finally {
      setResetting(false)
    }
  }

  return (
    <div className={styles.root}>
      {/* Theme Toggle Button */}
      <button
        onClick={cycleTheme}
        className={styles.themeToggle}
        title="Switch theme"
      >
        {currentTheme === 'light' ? (
          <Moon size={20} />
        ) : currentTheme === 'dark' ? (
          <Sparkles size={20} />
        ) : (
          <Sun size={20} />
        )}
      </button>

      {/* Firebase Configuration Warning */}
      {!isFirebaseConfigured && (
        <div className="fixed top-20 left-1/2 z-40 w-[90%] max-w-xl -translate-x-1/2 transform">
          <div className={styles.warning}>
            <div className="flex items-center space-x-2">
              <Shield size={16} />
              <span>
                Firebase is not configured. Copy .env.example to .env and set
                your VITE_FIREBASE_* keys, then restart the dev server.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Left Panel - Feature Preview */}
      <div className={styles.leftPanel}>
        {/* Decorative background elements */}
        <div className="absolute top-10 left-10 h-20 w-20 rounded-full bg-white/10 blur-xl"></div>
        <div className="absolute right-10 bottom-20 h-32 w-32 rounded-full bg-white/5 blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gradient-to-r from-white/5 to-transparent blur-3xl"></div>

        <div className="relative z-10 text-center">
          <div className="mb-6 flex items-center justify-center">
            <div className="rounded-2xl bg-white/20 p-3 backdrop-blur-sm">
              <Zap size={40} className="text-white" />
            </div>
          </div>

          <h1 className={styles.title}>Placement Portal</h1>

          <p className={styles.subtitle}>
            Your gateway to coding excellence and career success. Practice,
            learn, and ace your interviews.
          </p>

          <div className="space-y-4">
            <div className={styles.feature}>
              <div className="rounded-lg bg-white/20 p-2">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span>1000+ Coding Problems</span>
            </div>

            <div className={styles.feature}>
              <div className="rounded-lg bg-white/20 p-2">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M12 6V4l-2-2H4a2 2 0 00-2 2v12c0 1.1.9 2 2 2h12a2 2 0 002-2V8l-6-2z" />
                </svg>
              </div>
              <span>Interactive Quizzes</span>
            </div>

            <div className={styles.feature}>
              <div className="rounded-lg bg-white/20 p-2">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <span>Company-wise Questions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className={styles.rightPanel}>
        <div className={styles.card}>
          <div>
            <h2 className={styles.heading}>Welcome back</h2>
            <p className={styles.subheading}>
              Sign in to your account to continue
            </p>
          </div>

          {error && (
            <div className={styles.error}>
              <div className="flex items-center space-x-2">
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{error}</span>
              </div>
            </div>
          )}

          {success && (
            <div className={styles.success}>
              <div className="flex items-center space-x-2">
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414l2.293 2.293 6.543-6.543a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{success}</span>
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={onSubmit}>
            <div>
              <label htmlFor="email" className={styles.label}>
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={styles.button}
              >
                <div className="flex items-center justify-center space-x-2">
                  {loading ? (
                    <svg
                      className="h-4 w-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    <ArrowRight size={16} />
                  )}
                  <span>{loading ? 'Signing in...' : 'Sign in'}</span>
                </div>
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={onGoogle}
                disabled={loading}
                className={styles.googleBtn}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>{loading ? 'Please wait...' : 'Google'}</span>
              </button>
            </div>
          </form>

          <div className="mt-6 flex items-center justify-between text-sm">
            <button
              type="button"
              onClick={handlePasswordReset}
              disabled={resetting}
              className="font-medium text-indigo-600 hover:text-indigo-500 disabled:opacity-50"
            >
              {resetting ? 'Sending reset link...' : 'Forgot password?'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Create account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
