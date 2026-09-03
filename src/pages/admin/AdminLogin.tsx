import { useState, useEffect, FormEvent } from 'react'
import { Chrome, Lock } from 'lucide-react'
import { signInWithGoogle, signInWithEmail, createAccountWithEmail } from '../../firebase/auth'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { isAdminEmail } from '../../utils/security'

interface AdminLoginProps {
  onNavigate?: (path: string) => void
}

type Mode = 'signin' | 'signup'

function errorMessage(err: unknown): string {
  if (!err) return 'Something went wrong.'
  if (typeof err === 'string') return err
  if (err instanceof Error) return err.message
  const e = err as { message?: string; code?: string } | undefined
  if (e?.code) {
    switch (e.code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Invalid email or password.'
      case 'auth/email-already-in-use':
        return 'An account with that email already exists.'
      case 'auth/weak-password':
        return 'Password should be at least 8 characters.'
      case 'auth/popup-closed-by-user':
        return 'The sign-in popup was closed.'
      case 'auth/invalid-email':
        return 'Please enter a valid email address.'
      default:
        break
    }
  }
  return e?.message || 'Authentication failed. Please try again.'
}

export default function AdminLogin({ onNavigate }: AdminLoginProps) {
  const { user, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState<Mode>('signin')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user && isAdmin) {
      const goto = onNavigate ?? navigate
      goto('/admin')
    } else if (user && !isAdmin) {
      const goto = onNavigate ?? navigate
      goto('/')
    }
  }, [user, isAdmin, navigate, onNavigate])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      if (mode === 'signup' && !isAdminEmail(email)) {
        setError('This email is not authorized as an editor. Please use a pre-approved admin email address.')
        setLoading(false)
        return
      }
      const res =
        mode === 'signup'
          ? await createAccountWithEmail(email, password, name || undefined)
          : await signInWithEmail(email, password)
      if (res.error) {
        setError(errorMessage(res.error))
        return
      }
      const goto = onNavigate ?? navigate
      if (res.user && res.user.email && isAdminEmail(res.user.email)) {
        goto('/admin')
      } else {
        goto('/')
      }
    } catch (err: unknown) {
      setError(errorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setError(null)
    setLoading(true)
    try {
      const res = await signInWithGoogle()
      if (res.error) {
        setError(errorMessage(res.error))
        return
      }
      const goto = onNavigate ?? navigate
      const emailAddr = res.user?.email
      if (emailAddr && isAdminEmail(emailAddr)) {
        goto('/admin')
      } else {
        goto('/')
      }
    } catch (err: unknown) {
      setError(errorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="admin-login" style={{ minHeight: '100vh' }}>
      <div className="login-card">
        <div className="login-logo">
          <Lock size={28} />
          <h1>{mode === 'signin' ? 'Editor Sign In' : 'Create Editor Account'}</h1>
          <p className="login-subtitle">
            {mode === 'signin'
              ? 'Sign in to access the Bjlinks editorial dashboard.'
              : 'Create a new Bjlinks editor account.'}
          </p>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="google-login-btn"
        >
          <Chrome size={18} />
          Continue with Google
        </button>

        <div className="divider">
          <span>or continue with email</span>
        </div>

        <form onSubmit={handleSubmit} className="login-form" noValidate>
          {mode === 'signup' && (
            <div className="form-group">
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                placeholder="Adaeze Okafor"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="editor@bjlinksnews.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />
          </div>

          {error && <div className="error-banner" role="alert">{error}</div>}

          <button type="submit" className="btn-primary login-submit" disabled={loading}>
            {loading ? 'Please wait…' : mode === 'signin' ? 'Sign In' : 'Create Account'}
          </button>

          <div className="login-switch">
            {mode === 'signin' ? (
              <>
                Don&apos;t have an editor account?{' '}
                <button type="button" onClick={() => { setMode('signup'); setError(null) }}>
                  Create one
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button type="button" onClick={() => { setMode('signin'); setError(null) }}>
                  Sign in
                </button>
              </>
            )}
          </div>

          <div className="login-footer">
            <button
              type="button"
              className="btn-ghost"
              onClick={() => (onNavigate ?? navigate)('/')}
            >
              ← Back to site
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
