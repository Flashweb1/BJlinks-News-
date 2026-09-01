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
} from 'firebase/firestore'
import { db } from './init'
import { Article, sampleArticles } from '../data/articles'

const ARTICLES_COLLECTION = 'articles'

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
        callback(list.length > 0 ? list : sampleArticles)
      },
      () => callback(sampleArticles)
    )
  } catch {
    callback(sampleArticles)
    return () => {}
  }
}

export const getArticles = async (): Promise<Article[]> => {
  try {
    const q = query(collection(db, ARTICLES_COLLECTION), orderBy('publishedAt', 'desc'))
    const snapshot = await getDocs(q)
    const docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Article)
    return docs.length > 0 ? docs : sampleArticles
  } catch {
    return sampleArticles
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
  } catch {
  }
  return sampleArticles.filter((a) => a.category.toLowerCase() === category.toLowerCase())
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
  } catch {
  }
  return sampleArticles.find((a) => a.slug === slug) ?? sampleArticles[0]
}

export const getFeaturedArticle = async (): Promise<Article | undefined> => {
  try {
    const q = query(
      collection(db, ARTICLES_COLLECTION),
      where('featured', '==', true),
      where('status', '==', 'published'),
      orderBy('publishedAt', 'desc')
    )
    const snapshot = await getDocs(q)
    const first = snapshot.docs[0]
    if (first) return { id: first.id, ...first.data() } as Article
  } catch {
  }
  return sampleArticles.find((a) => a.featured) ?? sampleArticles[0]
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
  } catch {
  }
  return sampleArticles.slice(0, count)
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
  } catch {
  }
  return sampleArticles.filter((a) => a.id !== articleId).slice(0, limit)
}

export const searchArticles = async (queryText: string): Promise<Article[]> => {
  try {
    const q = query(
      collection(db, ARTICLES_COLLECTION),
      where('status', '==', 'published'),
      orderBy('publishedAt', 'desc')
    )
    const snapshot = await getDocs(q)
    const articles = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Article)
    const lowerQuery = queryText.toLowerCase()
    return articles.filter((a) =>
      a.title.toLowerCase().includes(lowerQuery) ||
      a.dek.toLowerCase().includes(lowerQuery) ||
      a.tags.some((t) => t.toLowerCase().includes(lowerQuery))
    )
  } catch {
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

export const getArticlesByStatus = async (status: string): Promise<Article[]> => {
  try {
    const q = query(
      collection(db, ARTICLES_COLLECTION),
      where('status', '==', status),
      orderBy('createdAt', 'desc')
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Article)
  } catch {
    return []
  }
}
