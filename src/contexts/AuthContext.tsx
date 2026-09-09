import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User } from 'firebase/auth'
import { onAuthStateChange, signOutUser, isAdminUser } from '../firebase/auth'

interface AuthContextType {
  user: User | null
  isAdmin: boolean
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  loading: true,
  signOut: async () => {}
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  // TEMPORARY: Bypass auth for testing - remove before production
  const DEV_BYPASS_AUTH = true

  useEffect(() => {
    if (DEV_BYPASS_AUTH) {
      // Mock user for development
      setUser({ email: 'dev@bjlinks.test', uid: 'dev-user-123' } as User)
      setIsAdmin(true)
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChange((currentUser) => {
      setUser(currentUser as User | null)
      setIsAdmin(isAdminUser(currentUser))
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await signOutUser()
  }

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, signOut: handleSignOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)