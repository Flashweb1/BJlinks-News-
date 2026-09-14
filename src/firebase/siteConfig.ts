import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  Timestamp,
} from 'firebase/firestore'
import { db } from './init'
import { breakingNews as staticBreaking } from '../data/articles'

export interface BreakingNewsItem {
  id: string
  text: string
  label?: 'Breaking' | 'Developing' | 'Update'
  expiresAt?: string // ISO string
}

export interface HomepageSection {
  categorySlug: string
  visible: boolean
  order: number
}

export interface SiteConfig {
  siteName: string
  tagline: string
  description: string
  contactEmail: string
  facebook: string
  twitter: string
  instagram: string
  youtube: string
  defaultCategory: string
  breakingNews: BreakingNewsItem[]
  homepageSections: HomepageSection[]
  featuredArticleId: string | null
  // SEO
  metaDescription: string
  ogImageUrl: string
  twitterCardType: 'summary' | 'summary_large_image'
  canonicalDomain: string
  // Reading Experience
  audioEnabled: boolean
  dropCaps: boolean
  defaultFontSize: 'sm' | 'md' | 'lg'
  defaultFontStyle: 'serif' | 'sans'
  // Newsletter
  newsletterUrl: string
  // Content
  articlesPerSection: number
  showEditorsPick: boolean
  showNewsletter: boolean
  showOpinion: boolean
  showTopStories: boolean
  requireCommentModeration: boolean
  notifyOnComment: boolean
  notifyOnPublish: boolean
  // Admin
  adminEmails: string[]
}

export const DEFAULT_CONFIG: SiteConfig = {
  siteName: 'Bjlinks News',
  tagline: 'Information for living',
  description: 'Your trusted source for Nigerian news, politics, business, and stories that matter.',
  contactEmail: 'editor@bjlinksnews.com',
  facebook: 'https://facebook.com/bjlinksnews',
  twitter: 'https://twitter.com/bjlinksnews',
  instagram: '',
  youtube: '',
  defaultCategory: 'News',
  breakingNews: staticBreaking.map((text, i) => ({ id: `static-${i}`, text, label: 'Breaking' as const })),
  homepageSections: [
    { categorySlug: 'politics', visible: true, order: 1 },
    { categorySlug: 'business', visible: true, order: 2 },
    { categorySlug: 'tech', visible: true, order: 3 },
    { categorySlug: 'sports', visible: false, order: 4 },
    { categorySlug: 'health', visible: false, order: 5 },
  ],
  featuredArticleId: null,
  metaDescription: 'Bjlinks News delivers premium journalism covering politics, business, technology, and more from Nigeria.',
  ogImageUrl: '',
  twitterCardType: 'summary_large_image',
  canonicalDomain: 'https://bjlinksnews.com',
  audioEnabled: true,
  dropCaps: true,
  defaultFontSize: 'md',
  defaultFontStyle: 'serif',
  newsletterUrl: '',
  articlesPerSection: 4,
  showEditorsPick: true,
  showNewsletter: true,
  showOpinion: true,
  showTopStories: true,
  requireCommentModeration: true,
  notifyOnComment: true,
  notifyOnPublish: true,
  adminEmails: [],
}

const CONFIG_DOC = 'main'
const CONFIG_COLLECTION = 'siteConfig'

export async function getSiteConfig(): Promise<SiteConfig> {
  try {
    const ref = doc(db, CONFIG_COLLECTION, CONFIG_DOC)
    const snap = await getDoc(ref)
    if (!snap.exists()) return DEFAULT_CONFIG
    return { ...DEFAULT_CONFIG, ...snap.data() } as SiteConfig
  } catch {
    return DEFAULT_CONFIG
  }
}

export async function saveSiteConfig(config: Partial<SiteConfig>): Promise<void> {
  const ref = doc(db, CONFIG_COLLECTION, CONFIG_DOC)
  await setDoc(ref, { ...config, updatedAt: Timestamp.now() }, { merge: true })
}

export function subscribeToSiteConfig(callback: (config: SiteConfig) => void): () => void {
  try {
    const ref = doc(db, CONFIG_COLLECTION, CONFIG_DOC)
    return onSnapshot(
      ref,
      (snap) => {
        if (!snap.exists()) {
          callback(DEFAULT_CONFIG)
          return
        }
        callback({ ...DEFAULT_CONFIG, ...snap.data() } as SiteConfig)
      },
      () => callback(DEFAULT_CONFIG)
    )
  } catch {
    callback(DEFAULT_CONFIG)
    return () => {}
  }
}
