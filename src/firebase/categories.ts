import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
  writeBatch,
} from 'firebase/firestore'
import { db } from './init'
import { categories as staticCategories } from '../data/articles'

export interface Category {
  id: string
  name: string
  slug: string
  emoji: string
  color: string
  description: string
  visible: boolean
  order: number
  createdAt?: Timestamp
  updatedAt?: Timestamp
}

const CATEGORIES_COLLECTION = 'categories'

// Seed the default static categories if Firestore is empty
export async function seedCategoriesIfEmpty(): Promise<void> {
  try {
    const snap = await getDocs(collection(db, CATEGORIES_COLLECTION))
    if (!snap.empty) return
    const batch = writeBatch(db)
    const defaultEmojis: Record<string, string> = {
      politics: '🏛️',
      news: '📰',
      business: '💼',
      world: '🌍',
      tech: '💻',
      health: '❤️',
      sports: '⚽',
      religion: '✝️',
      education: '📚',
      stories: '🎬',
    }
    const defaultColors: Record<string, string> = {
      politics: '#E32626',
      news: '#3B82F6',
      business: '#F2A900',
      world: '#10B981',
      tech: '#6366F1',
      health: '#EC4899',
      sports: '#F97316',
      religion: '#8B5CF6',
      education: '#14B8A6',
      stories: '#F59E0B',
    }
    for (const cat of staticCategories) {
      const ref = doc(collection(db, CATEGORIES_COLLECTION))
      batch.set(ref, {
        name: cat.label,
        slug: cat.slug,
        emoji: defaultEmojis[cat.slug] ?? '📌',
        color: defaultColors[cat.slug] ?? '#6B7280',
        description: '',
        visible: true,
        order: cat.order,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      })
    }
    await batch.commit()
  } catch (err) {
    console.warn('[categories] seed failed (may be offline):', err)
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const q = query(collection(db, CATEGORIES_COLLECTION), orderBy('order', 'asc'))
    const snap = await getDocs(q)
    if (snap.empty) return staticCategories.map((c) => ({ ...c, name: c.label, id: c.slug, emoji: '📌', color: '#6B7280', description: '', visible: true }))
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Category)
  } catch {
    return staticCategories.map((c) => ({ ...c, name: c.label, id: c.slug, emoji: '📌', color: '#6B7280', description: '', visible: true }))
  }
}

export function subscribeToCategories(callback: (cats: Category[]) => void): () => void {
  try {
    const q = query(collection(db, CATEGORIES_COLLECTION), orderBy('order', 'asc'))
    return onSnapshot(
      q,
      (snap) => {
        if (snap.empty) {
          callback(staticCategories.map((c) => ({ ...c, name: c.label, id: c.slug, emoji: '📌', color: '#6B7280', description: '', visible: true })))
          return
        }
        callback(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Category))
      },
      () => {
        callback(staticCategories.map((c) => ({ ...c, name: c.label, id: c.slug, emoji: '📌', color: '#6B7280', description: '', visible: true })))
      }
    )
  } catch {
    callback(staticCategories.map((c) => ({ ...c, name: c.label, id: c.slug, emoji: '📌', color: '#6B7280', description: '', visible: true })))
    return () => {}
  }
}

export async function addCategory(data: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<Category> {
  const ref = await addDoc(collection(db, CATEGORIES_COLLECTION), {
    ...data,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  })
  return { id: ref.id, ...data }
}

export async function updateCategory(id: string, data: Partial<Omit<Category, 'id'>>): Promise<void> {
  await updateDoc(doc(db, CATEGORIES_COLLECTION, id), { ...data, updatedAt: Timestamp.now() })
}

export async function deleteCategory(id: string): Promise<void> {
  await deleteDoc(doc(db, CATEGORIES_COLLECTION, id))
}

export async function reorderCategories(orderedIds: string[]): Promise<void> {
  try {
    const batch = writeBatch(db)
    orderedIds.forEach((id, idx) => {
      batch.update(doc(db, CATEGORIES_COLLECTION, id), { order: idx + 1, updatedAt: Timestamp.now() })
    })
    await batch.commit()
  } catch (err) {
    console.error('[categories] reorder failed:', err)
  }
}
