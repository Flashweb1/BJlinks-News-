import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {
  getFirestore,
  enableIndexedDbPersistence,
  CACHE_SIZE_UNLIMITED,
} from 'firebase/firestore'

export type FirebaseConfig = {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
  measurementId?: string
}

function readFirebaseConfigFromEnv(): FirebaseConfig | null {
  const env = import.meta.env
  const apiKey = env.VITE_FIREBASE_API_KEY
  const authDomain = env.VITE_FIREBASE_AUTH_DOMAIN
  const projectId = env.VITE_FIREBASE_PROJECT_ID
  const storageBucket = env.VITE_FIREBASE_STORAGE_BUCKET
  const messagingSenderId = env.VITE_FIREBASE_MESSAGING_SENDER_ID
  const appId = env.VITE_FIREBASE_APP_ID

  if (apiKey && authDomain && projectId && storageBucket && messagingSenderId && appId) {
    return {
      apiKey,
      authDomain,
      projectId,
      storageBucket,
      messagingSenderId,
      appId,
      measurementId: env.VITE_FIREBASE_MEASUREMENT_ID || undefined,
    }
  }
  return null
}

function validateConfig(config: FirebaseConfig | null): asserts config is FirebaseConfig {
  if (!config) {
    throw new Error(
      'Firebase configuration missing. Set VITE_FIREBASE_* environment variables in .env file. See .env.example for reference.'
    )
  }
}

const envConfig = readFirebaseConfigFromEnv()
validateConfig(envConfig)
const resolvedConfig: FirebaseConfig = envConfig

const app: FirebaseApp = getApps().length
  ? getApp()
  : initializeApp(resolvedConfig)

export const auth = getAuth(app)

export const db = getFirestore(app)
try {
  void enableIndexedDbPersistence(db).catch((err: { code?: string }) => {
    const code = err?.code ?? 'unknown'
    if (code === 'failed-precondition') {
      console.warn('[Firebase] Offline persistence disabled (multiple tabs open).')
    } else if (code === 'unimplemented') {
      console.warn('[Firebase] Offline persistence not supported in this browser.')
    } else {
      console.warn('[Firebase] Offline persistence setup failed:', code)
    }
  })
} catch {
}

export { app, resolvedConfig as firebaseConfig }
