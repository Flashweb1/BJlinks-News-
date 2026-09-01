import { describe, it, expect } from 'vitest'
import {
  articles,
  categories,
  getArticlesByCategory,
  searchArticles,
  getArticleBySlug,
  getFeaturedArticle,
  getLatestArticles,
  getRelatedArticles,
} from './articles'

describe('articles fixtures', () => {
  it('has at least one article', () => {
    expect(articles.length).toBeGreaterThan(0)
  })

  it('every article has a unique id and slug', () => {
    const ids = new Set<string>()
    const slugs = new Set<string>()
    for (const a of articles) {
      expect(ids.has(a.id)).toBe(false)
      expect(slugs.has(a.slug)).toBe(false)
      ids.add(a.id)
      slugs.add(a.slug)
    }
  })

  it('every article has a category that exists in the categories list', () => {
    const slugs = new Set(categories.map((c) => c.slug))
    for (const a of articles) {
      expect(slugs.has(a.category.toLowerCase())).toBe(true)
    }
  })
})

describe('getArticlesByCategory', () => {
  it('filters by category slug (case-insensitive)', () => {
    const politics = getArticlesByCategory('Politics')
    expect(politics.length).toBeGreaterThan(0)
    for (const a of politics) {
      expect(a.category.toLowerCase()).toBe('politics')
    }
  })

  it('returns empty for unknown categories', () => {
    expect(getArticlesByCategory('nope-not-real')).toEqual([])
  })
})

describe('searchArticles', () => {
  it('matches title text', () => {
    const result = searchArticles('Governor')
    expect(result.length).toBeGreaterThan(0)
  })

  it('matches tag text', () => {
    const sample = articles[0]
    if (sample && sample.tags[0]) {
      const result = searchArticles(sample.tags[0])
      expect(result.length).toBeGreaterThan(0)
    }
  })

  it('is case-insensitive', () => {
    const a = searchArticles('GOVERNOR')
    const b = searchArticles('governor')
    expect(a.length).toBe(b.length)
  })

  it('returns empty for nonsense queries', () => {
    expect(searchArticles('zzzzqqqxxx-not-real')).toEqual([])
  })
})

describe('getArticleBySlug', () => {
  it('returns the matching article', () => {
    const first = articles[0]
    if (!first) throw new Error('no articles')
    const found = getArticleBySlug(first.slug)
    expect(found?.id).toBe(first.id)
  })

  it('returns undefined for an unknown slug', () => {
    expect(getArticleBySlug('not-a-real-slug-zzz')).toBeUndefined()
  })
})

describe('getFeaturedArticle', () => {
  it('returns an article with featured=true', () => {
    const featured = getFeaturedArticle()
    if (featured) expect(featured.featured).toBe(true)
  })
})

describe('getLatestArticles', () => {
  it('respects a count limit', () => {
    expect(getLatestArticles(2).length).toBe(2)
  })

  it('returns all when no limit is given', () => {
    expect(getLatestArticles().length).toBe(articles.length)
  })
})

describe('getRelatedArticles', () => {
  it('excludes the current article and matches category', () => {
    const first = articles[0]
    if (!first) throw new Error('no articles')
    const related = getRelatedArticles(first.id, first.category, 3)
    for (const a of related) {
      expect(a.id).not.toBe(first.id)
      expect(a.category).toBe(first.category)
    }
  })

  it('returns at most the requested limit', () => {
    const first = articles[0]
    if (!first) throw new Error('no articles')
    const related = getRelatedArticles(first.id, first.category, 1)
    expect(related.length).toBeLessThanOrEqual(1)
  })
})
