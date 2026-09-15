import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  signOut as fbSignOut,
  onAuthStateChanged,
  updateProfile,
  type Auth,
  type User,
} from 'firebase/auth'
import { auth, db } from './init'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { getIdTokenResult } from 'firebase/auth'
import { isAdminEmail } from '../utils/security'
import { isValidEmail } from '../utils/security'

export const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' })

type AuthResult<T = unknown> = { user: T | null; error: unknown }

export const signInWithGoogle = async (): Promise<AuthResult<User>> => {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    return { user: result.user, error: null }
  } catch (error: unknown) {
    return { user: null, error }
  }
}

export const signInWithEmail = async (
  email: string,
  password: string
): Promise<AuthResult<User>> => {
  if (!isValidEmail(email) || !password || password.length < 8) {
    return { user: null, error: new Error('Invalid email or password') }
  }
  try {
    const result = await signInWithEmailAndPassword(auth, email, password)
    return { user: result.user, error: null }
  } catch (error: unknown) {
    return { user: null, error }
  }
}

export const createAccountWithEmail = async (
  email: string,
  password: string,
  displayName?: string
): Promise<AuthResult<User>> => {
  if (!isValidEmail(email)) return { user: null, error: new Error('Invalid email') }
  if (!password || password.length < 8) {
    return { user: null, error: new Error('Password must be at least 8 characters') }
  }
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    if (displayName && result.user) {
      await updateProfile(result.user, { displayName })
    }
    try {
      // Send verification email after account creation
      if (result.user) await sendEmailVerification(result.user)
    } catch (e) {
      // Non-fatal: verification email failed to send
      console.warn('sendEmailVerification failed', e)
    }
    
    // Create a pendingUsers document for admin approval
    try {
      if (result.user) {
        const puRef = doc(db, 'pendingUsers', result.user.uid)
        await setDoc(puRef, {
          email: result.user.email || null,
          displayName: displayName || result.user.displayName || null,
          createdAt: serverTimestamp(),
          emailVerified: result.user.emailVerified || false,
        })
      }
    } catch (e) {
      console.warn('failed to create pendingUsers doc', e)
    }
    return { user: result.user, error: null }
  } catch (error: unknown) {
    return { user: null, error }
  }
}

export const sendPasswordReset = async (email: string): Promise<{ error: unknown }> => {
  if (!isValidEmail(email)) return { error: new Error('Invalid email') }
  try {
    await sendPasswordResetEmail(auth, email)
    return { error: null }
  } catch (error: unknown) {
    return { error }
  }
}

export const signOutUser = async (): Promise<{ error: unknown }> => {
  try {
    await fbSignOut(auth as Auth)
    return { error: null }
  } catch (error: unknown) {
    return { error }
  }
}

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback)
}

export const getCurrentUser = () => auth.currentUser

export const isAdminUser = (user: User | unknown | null): boolean => {
  if (!user) return false
  const u = user as { email?: string | null } | null
  const email = u && 'email' in u ? u.email : null
  return isAdminEmail(email ?? null)
}

export const isApprovedUser = async (user: User | null): Promise<boolean> => {
  if (!user) return false
  try {
    // Check admins collection by UID
    const adm = await getDoc(doc(db, 'admins', user.uid))
    if (adm.exists()) return true
  } catch (e) {
    // ignore
  }
  try {
    const tokenRes = await getIdTokenResult(user)
    if (tokenRes && (tokenRes.claims as any).approved) return true
  } catch (e) {
    // ignore
  }
  return false
}

export const getIdToken = async (user: unknown) => {
  if (!user) return null
  const u = user as User
  if (typeof u.getIdToken !== 'function') return null
  return await u.getIdToken()
}
