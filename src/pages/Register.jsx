import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, isFirebaseConfigured } from '../lib/firebase'
import { getUserProfileStatus, updateProfileCompletionStatus } from '../utils/profileUtils'
import {
  Sun,
  Moon,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Shield,
  UserPlus,
} from 'lucide-react'

// Theme configuration - same as Login page
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
    themeToggle:
      'fixed top-6 right-6 p-3 rounded-full bg-gray-800/60 backdrop-blur-sm border border-gray-700 text-gray-300 hover:bg-gray-700/60 transition-all duration-200 z-50',
    error:
      'bg-red-900/50 border border-red-700 text-red-300 rounded-xl p-3 text-sm',
    warning:
      'bg-amber-900/50 border border-amber-700 text-amber-300 rounded-xl p-3 text-sm',
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

export default function Register() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

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
    
    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }

    setLoading(true)
    
    try {
      let registrationSuccess = false;
      let userEmail = email;
      let userName = name;

      // Try Firebase registration first (if configured)
      if (isFirebaseConfigured && auth) {
        try {
          const cred = await createUserWithEmailAndPassword(auth, email, password)
          if (name) {
            await updateProfile(cred.user, { displayName: name })
          }
          userEmail = cred.user.email;
          userName = cred.user.displayName || name;
          registrationSuccess = true;
          console.log('✅ Firebase registration successful');
        } catch (firebaseError) {
          console.warn('Firebase registration failed, trying backend only:', firebaseError.message);
          // Continue with backend registration even if Firebase fails
        }
      }

      // Always try backend registration for profile management
      try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: userName,
            email: userEmail,
            password: password,
            confirmPassword: confirm
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
          const userData = {
            ...data.user,
            fullName: data.user.name,
            username: data.user.name.toLowerCase().replace(/\s+/g, ''),
            email: data.user.email
          };
          localStorage.setItem('user', JSON.stringify(userData));
          
          registrationSuccess = true;
          console.log('✅ Backend registration successful:', data);
          
          setSuccess('🎉 Registration successful! Redirecting...');
          
          // Check if profile is complete and redirect accordingly
          const { isComplete } = getUserProfileStatus();
          
          setTimeout(() => {
            if (isComplete) {
              navigate('/dashboard');
            } else {
              // New users need to complete their profile
              navigate('/complete-profile');
            }
          }, 1500);
          
        } else {
          throw new Error(data.message || 'Backend registration failed');
        }
      } catch (backendError) {
        console.error('Backend registration failed:', backendError);
        
        if (!registrationSuccess) {
          // If both Firebase and backend failed
          throw new Error(backendError.message || 'Registration failed. Please try again.');
        } else {
          // Firebase succeeded but backend failed - still allow login
          console.warn('Firebase registration succeeded but backend failed. User can still login.');
          localStorage.setItem('token', 'firebase_token_' + Date.now());
          localStorage.setItem('userEmail', userEmail);
          localStorage.setItem('userName', userName);
          
          setSuccess('🎉 Registration successful! Redirecting...');
          
          setTimeout(() => {
            navigate('/complete-profile');
          }, 1500);
        }
      }

    } catch (err) {
      console.error('Registration error:', err);
      setError(err?.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
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
              <UserPlus size={40} className="text-white" />
            </div>
          </div>

          <h1 className={styles.title}>Join Placement Portal</h1>

          <p className={styles.subtitle}>
            Start your journey to coding excellence. Create your account and
            unlock access to premium practice resources.
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
              <span>Free access to all features</span>
            </div>

            <div className={styles.feature}>
              <div className="rounded-lg bg-white/20 p-2">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span>Real-time code execution</span>
            </div>

            <div className={styles.feature}>
              <div className="rounded-lg bg-white/20 p-2">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2v1a1 1 0 001 1h6a1 1 0 001-1V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span>Track your progress</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Registration Form */}
      <div className={styles.rightPanel}>
        <div className={styles.card}>
          <div>
            <h2 className={styles.heading}>Create account</h2>
            <p className={styles.subheading}>
              Get started with your placement preparation
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
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{success}</span>
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={onSubmit}>
            <div>
              <label htmlFor="name" className={styles.label}>
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.input}
                placeholder="Enter your full name"
              />
            </div>

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
                  autoComplete="new-password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                  placeholder="Minimum 6 characters"
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
              <label htmlFor="confirm" className={styles.label}>
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirm"
                  name="confirm"
                  type={showConfirm ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  minLength={6}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className={styles.input}
                  placeholder="Re-enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? (
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
                  <span>
                    {loading ? 'Creating account...' : 'Create account'}
                  </span>
                </div>
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
