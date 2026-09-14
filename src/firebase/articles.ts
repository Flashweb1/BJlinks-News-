import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  Timestamp,
  limit,
  documentId,
} from 'firebase/firestore'
import { db } from './init'
import { Article, sampleArticles } from '../data/articles'
import { logger } from '../utils/logger'
import { logErrorToSentry } from '../utils/sentry'

const ARTICLES_COLLECTION = 'articles'
const IS_DEV = import.meta.env.DEV === true
const IN_BATCH = 30

function fallbackOrEmpty<T extends unknown[]>(fallback: T, label: string, err?: unknown): T {
  if (err !== undefined) {
    logger.error(`[firebase:articles] ${label} failed`, err, { label })
    if (!IS_DEV) logErrorToSentry(err, `firebase:articles:${label}`)
  }
  if (IS_DEV) return fallback
  return ([] as unknown) as T
}

function fallbackOrUndefined<T>(fallback: T | undefined, label: string, err?: unknown): T | undefined {
  if (err !== undefined) {
    logger.error(`[firebase:articles] ${label} failed`, err, { label })
    if (!IS_DEV) logErrorToSentry(err, `firebase:articles:${label}`)
  }
  if (IS_DEV) return fallback
  return undefined
}

export const subscribeToArticles = (
  callback: (articles: Article[]) => void,
  statusFilter?: string
) => {
  try {
    const baseRef = collection(db, ARTICLES_COLLECTION)
    const q = statusFilter
      ? query(baseRef, where('status', '==', statusFilter), orderBy('publishedAt', 'desc'))
      : query(baseRef, orderBy('publishedAt', 'desc'))

    return onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs
        const list: Article[] = docs
          .map((d) => ({ id: d.id, ...d.data() }) as Article)
          .filter((a) => a && typeof a.id === 'string')
        callback(list.length > 0 ? list : fallbackOrEmpty(sampleArticles, 'subscribeToArticles.empty'))
      },
      (err) => callback(fallbackOrEmpty(sampleArticles, 'subscribeToArticles', err))
    )
  } catch (err) {
    callback(fallbackOrEmpty(sampleArticles, 'subscribeToArticles.setup', err))
    return () => {}
  }
}

export const getArticles = async (): Promise<Article[]> => {
  try {
    const q = query(collection(db, ARTICLES_COLLECTION), orderBy('publishedAt', 'desc'))
    const snapshot = await getDocs(q)
    const docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Article)
    return docs.length > 0 ? docs : fallbackOrEmpty(sampleArticles, 'getArticles.empty')
  } catch (err) {
    return fallbackOrEmpty(sampleArticles, 'getArticles', err)
  }
}

export const getArticlesByCategory = async (category: string): Promise<Article[]> => {
  try {
    const q = query(
      collection(db, ARTICLES_COLLECTION),
      where('category', '==', category),
      where('status', '==', 'published'),
      orderBy('publishedAt', 'desc')
    )
    const snapshot = await getDocs(q)
    const docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Article)
    if (docs.length > 0) return docs
    return fallbackOrEmpty(
      sampleArticles.filter((a) => a.category.toLowerCase() === category.toLowerCase()),
      'getArticlesByCategory.empty'
    )
  } catch (err) {
    return fallbackOrEmpty(
      sampleArticles.filter((a) => a.category.toLowerCase() === category.toLowerCase()),
      'getArticlesByCategory',
      err
    )
  }
}

export const getArticleBySlug = async (slug: string): Promise<Article | undefined> => {
  try {
    const q = query(
      collection(db, ARTICLES_COLLECTION),
      where('slug', '==', slug),
      where('status', '==', 'published')
    )
    const snapshot = await getDocs(q)
    const first = snapshot.docs[0]
    if (first) return { id: first.id, ...first.data() } as Article
    return fallbackOrUndefined(
      sampleArticles.find((a) => a.slug === slug),
      'getArticleBySlug.empty'
    )
  } catch (err) {
    return fallbackOrUndefined(
      sampleArticles.find((a) => a.slug === slug),
      'getArticleBySlug',
      err
    )
  }
}

export const getFeaturedArticle = async (): Promise<Article | undefined> => {
  const featured = await getFeaturedArticles()
  return fallbackOrUndefined(featured[0], 'getFeaturedArticle.empty')
}

export const getFeaturedArticles = async (count: number = 4): Promise<Article[]> => {
  try {
    const q = query(
      collection(db, ARTICLES_COLLECTION),
      where('featured', '==', true),
      where('status', '==', 'published'),
      orderBy('publishedAt', 'desc'),
      limit(count)
    )
    const snapshot = await getDocs(q)
    const docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Article)
    if (docs.length > 0) return docs.slice(0, count)
    const featured = sampleArticles.filter((a) => a.featured)
    const pad =
      featured.length >= count
        ? featured.slice(0, count)
        : (() => {
            const idSet = new Set(featured.map((a) => a.id))
            return featured.concat(sampleArticles.filter((a) => !idSet.has(a.id))).slice(0, count)
          })()
    return fallbackOrEmpty(pad, 'getFeaturedArticles.empty')
  } catch (err) {
    const featured = sampleArticles.filter((a) => a.featured)
    const pad =
      featured.length >= count
        ? featured.slice(0, count)
        : (() => {
            const idSet = new Set(featured.map((a) => a.id))
            return featured.concat(sampleArticles.filter((a) => !idSet.has(a.id))).slice(0, count)
          })()
    return fallbackOrEmpty(pad, 'getFeaturedArticles', err)
  }
}

export const getLatestArticles = async (count: number = 6): Promise<Article[]> => {
  try {
    const q = query(
      collection(db, ARTICLES_COLLECTION),
      where('status', '==', 'published'),
      orderBy('publishedAt', 'desc')
    )
    const snapshot = await getDocs(q)
    const docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Article)
    if (docs.length > 0) return docs.slice(0, count)
    return fallbackOrEmpty(sampleArticles.slice(0, count), 'getLatestArticles.empty')
  } catch (err) {
    return fallbackOrEmpty(sampleArticles.slice(0, count), 'getLatestArticles', err)
  }
}

export const getRelatedArticles = async (
  articleId: string,
  category: string,
  limit: number = 3
): Promise<Article[]> => {
  try {
    const q = query(
      collection(db, ARTICLES_COLLECTION),
      where('status', '==', 'published'),
      where('category', '==', category),
      orderBy('publishedAt', 'desc')
    )
    const snapshot = await getDocs(q)
    const docs = snapshot.docs
      .map((d) => ({ id: d.id, ...d.data() }) as Article)
      .filter((a) => a.id !== articleId)
    if (docs.length > 0) return docs.slice(0, limit)
    return fallbackOrEmpty(
      sampleArticles.filter((a) => a.id !== articleId).slice(0, limit),
      'getRelatedArticles.empty'
    )
  } catch (err) {
    return fallbackOrEmpty(
      sampleArticles.filter((a) => a.id !== articleId).slice(0, limit),
      'getRelatedArticles',
      err
    )
  }
}

export const searchArticles = async (queryText: string): Promise<Article[]> => {
  try {
    const q = query(
      collection(db, ARTICLES_COLLECTION),
      where('status', '==', 'published'),
      orderBy('publishedAt', 'desc'),
      limit(100)
    )
    const snapshot = await getDocs(q)
    const articles = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Article)
    const lowerQuery = queryText.toLowerCase()
    return articles.filter((a) =>
      a.title.toLowerCase().includes(lowerQuery) ||
      a.dek.toLowerCase().includes(lowerQuery) ||
      a.tags.some((t) => t.toLowerCase().includes(lowerQuery))
    )
  } catch (err) {
    logger.error('[firebase:articles] searchArticles failed', err, { label: 'searchArticles' })
    if (!IS_DEV) logErrorToSentry(err, 'firebase:articles:searchArticles')
    return []
  }
}

export const addArticle = async (articleData: Omit<Article, 'id'>): Promise<Article> => {
  const docRef = await addDoc(collection(db, ARTICLES_COLLECTION), {
    ...articleData,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  })
  return { id: docRef.id, ...articleData } as Article
}

export const updateArticle = async (
  articleId: string,
  articleData: Partial<Article>
): Promise<Article> => {
  const docRef = doc(db, ARTICLES_COLLECTION, articleId)
  await updateDoc(docRef, { ...articleData, updatedAt: Timestamp.now() })
  const updated = await getDoc(docRef)
  return { id: docRef.id, ...(updated.data() ?? {}) } as Article
}

export const deleteArticle = async (articleId: string): Promise<void> => {
  await deleteDoc(doc(db, ARTICLES_COLLECTION, articleId))
}

export const getArticleById = async (articleId: string): Promise<Article | undefined> => {
  const docRef = doc(db, ARTICLES_COLLECTION, articleId)
  const docSnap = await getDoc(docRef)
  if (!docSnap.exists()) return undefined
  return { id: docSnap.id, ...docSnap.data() } as Article
}

export const getAllArticlesAdmin = async (): Promise<Article[]> => {
  try {
    const q = query(collection(db, ARTICLES_COLLECTION), orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Article)
  } catch {
    return []
  }
}

export const doesSlugExist = async (slug: string, excludeId?: string): Promise<boolean> => {
  try {
    const q = query(
      collection(db, ARTICLES_COLLECTION),
      where('slug', '==', slug),
      limit(1)
    )
    const snapshot = await getDocs(q)
    if (snapshot.empty) return false
    if (excludeId) {
      const first = snapshot.docs[0]
      if (!first) return false
      return first.id !== excludeId
    }
    return true
  } catch {
    return false
  }
}

export const generateUniqueSlug = async (
  baseSlug: string,
  excludeId?: string
): Promise<string> => {
  if (!baseSlug) return `article-${Date.now()}`
  let candidate = baseSlug
  let suffix = 2
  while (await doesSlugExist(candidate, excludeId)) {
    candidate = `${baseSlug}-${suffix}`
    suffix++
    if (suffix > 100) {
      candidate = `${baseSlug}-${Date.now()}`
      break
    }
  }
  return candidate
}

export const getArticlesByStatus = async (status: string): Promise<Article[]> => {
  try {
    const q = query(
      collection(db, ARTICLES_COLLECTION),
      where('status', '==', status),
      orderBy('createdAt', 'desc')
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Article)
  } catch (err) {
    logger.error('[firebase:articles] getArticlesByStatus failed', err, { status })
    if (!IS_DEV) logErrorToSentry(err, 'firebase:articles:getArticlesByStatus')
    return []
  }
}

function chunkArray<T>(arr: T[], size: number): T[][] {
  const out: T[][] = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

export const getArticlesByIds = async (ids: string[]): Promise<Article[]> => {
  if (ids.length === 0) return []
  try {
    const batches = chunkArray([...new Set(ids)], IN_BATCH)
    const promises = batches.map((batch) =>
      getDocs(
        query(
          collection(db, ARTICLES_COLLECTION),
          where(documentId(), 'in', batch)
        )
      )
    )
    const snaps = await Promise.all(promises)
    const map = new Map<string, Article>()
    for (const snap of snaps) {
      for (const d of snap.docs) {
        const a = { id: d.id, ...d.data() } as Article
        map.set(a.id, a)
      }
    }
    const order = new Map(ids.map((id, idx) => [id, idx]))
    return [...map.values()].sort(
      (a, b) => (order.get(a.id) ?? Number.MAX_SAFE_INTEGER) - (order.get(b.id) ?? Number.MAX_SAFE_INTEGER)
    )
  } catch (err) {
    logger.error('[firebase:articles] getArticlesByIds failed', err, { count: ids.length })
    if (!IS_DEV) logErrorToSentry(err, 'firebase:articles:getArticlesByIds')
    return []
  }
}
