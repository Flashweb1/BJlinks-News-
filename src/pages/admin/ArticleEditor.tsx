import { useState, useEffect } from 'react'
import { ArrowLeft, Save, Eye, Send } from 'lucide-react'
import type { Article } from '../../data/articles'
import { categories } from '../../data/articles'
import { addArticle, updateArticle, getArticleById, generateUniqueSlug } from '../../firebase/articles'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import {
  generateReadTime,
  isValidCategory,
  isValidExternalUrl,
  isValidTags,
  normalizeSlug,
  sanitizePlainText,
} from '../../utils/security'

interface ArticleEditorProps {
  onNavigate: (path: string) => void
  articleId?: string
}

type Status = 'draft' | 'review'

export default function ArticleEditor({ onNavigate, articleId }: ArticleEditorProps) {
  const { user } = useAuth()
  const navigate = useNavigate()

  if (!user) {
    void navigate('/admin/login', { replace: true })
    return null
  }

  const [existingArticle, setExistingArticle] = useState<Article | null>(null)

  const [title, setTitle] = useState<string>('')
  const [dek, setDek] = useState<string>('')
  const [category, setCategory] = useState<string>('Politics')
  const [body, setBody] = useState<string>('')
  const [tags, setTags] = useState<string>('')
  const [image, setImage] = useState<string>('')
  const [readTime, setReadTime] = useState<number>(3)
  const [showPreview, setShowPreview] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!articleId) return
    let cancelled = false
    void (async () => {
      try {
        const found = await getArticleById(articleId)
        if (cancelled || !found) return
        setExistingArticle(found)
        setTitle(found.title)
        setDek(found.dek)
        if (isValidCategory(found.category)) setCategory(found.category)
        setBody(Array.isArray(found.body) ? found.body.join('\n\n') : String(found.body ?? ''))
        setTags(Array.isArray(found.tags) ? found.tags.join(', ') : '')
        setImage(found.image ?? '')
        setReadTime(Number(found.readTime) || 3)
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err)
        console.error('[editor] Error loading article:', msg)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [articleId])

  const validate = (): null | {
    title: string
    dek: string
    category: string
    body: string[]
    tags: string[]
    image: string
    readTime: number
    slug: string
    author: string
    authorRole: string
    publishedAt: string
  } => {
    const cleanTitle = sanitizePlainText(title, 240).trim()
    const cleanDek = sanitizePlainText(dek, 600).trim()
    const cleanCategory = isValidCategory(category) ? category : 'News'
    const paragraphs = body
      .split(/\n\s*\n/)
      .map((p: string) => sanitizePlainText(p, 4000).trim())
      .filter(Boolean)

    const tagArr = tags
      .split(',')
      .map((t: string) => sanitizePlainText(t.trim(), 40))
      .filter((t): t is string => Boolean(t))
      .slice(0, 10)

    const safeImage = image ? (isValidExternalUrl(image) ? image : '') : ''
    const slug = normalizeSlug(`${cleanTitle || 'article'}${existingArticle?.slug || ''}`) || `article-${Date.now()}`

    if (!cleanTitle || !cleanDek || paragraphs.length === 0 || !isValidTags(tagArr)) {
      setError('Please fill in headline, dek, body, and up to 10 tags (max 32 chars).')
      return null
    }

    const author = user?.displayName?.trim() || 'Editorial Staff'
    const authorRole = 'Staff Writer'
    const publishedAt =
      existingArticle?.publishedAt ||
      new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

    const autoRt = Number(readTime) || generateReadTime(paragraphs)

    setError(null)
    return {
      title: cleanTitle,
      dek: cleanDek,
      category: cleanCategory,
      body: paragraphs,
      tags: tagArr,
      image: safeImage,
      readTime: autoRt,
      slug,
      author,
      authorRole,
      publishedAt,
    }
  }

  const handleSave = async (status: Status) => {
    const valid = validate()
    if (!valid) return
    setLoading(true)
    try {
      const finalSlug = await generateUniqueSlug(valid.slug, existingArticle?.id)
      const base = {
        title: valid.title,
        dek: valid.dek,
        category: valid.category,
        body: valid.body,
        tags: valid.tags,
        image: valid.image,
        readTime: valid.readTime,
        status,
      }

      let result: Article | null = null

      if (articleId && existingArticle) {
        result = await updateArticle(articleId, {
          ...existingArticle,
          ...base,
          slug: finalSlug,
          author: valid.author,
          authorRole: valid.authorRole,
          publishedAt: valid.publishedAt,
        })
      } else {
        const payload: Omit<Article, 'id'> = {
          ...base,
          slug: finalSlug,
          author: valid.author,
          authorRole: valid.authorRole,
          publishedAt: valid.publishedAt,
          featured: false,
          status,
        }
        result = await addArticle(payload)
      }

      if (result) {
        void navigate('/admin')
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown error'
      setError(`Error saving article: ${msg}`)
    } finally {
      setLoading(false)
    }
  }

  const previewParagraphs = body
    .split(/\n\s*\n/)
    .map((p) => sanitizePlainText(p, 4000).trim())
    .filter(Boolean)

  return (
    <main className="admin-editor">
      <div className="editor-header">
        <button className="back-btn" onClick={() => onNavigate('/admin')}>
          <ArrowLeft size={18} /> Back to Dashboard
        </button>
        <div className="editor-actions">
          <button className="btn-secondary" onClick={() => setShowPreview((s) => !s)}>
            <Eye size={16} /> {showPreview ? 'Edit' : 'Preview'}
          </button>
          <button className="btn-secondary" onClick={() => handleSave('draft')} disabled={loading}>
            <Save size={16} /> Save Draft
          </button>
          <button className="btn-primary" onClick={() => handleSave('review')} disabled={loading}>
            <Send size={16} /> Submit for Review
          </button>
        </div>
      </div>

      {showPreview ? (
        <div className="editor-preview">
          <div className="preview-card">
            {image && <img src={image} alt={title} className="preview-image" />}
            <span className="kicker">{category}</span>
            <h1>{sanitizePlainText(title, 240) || 'Untitled Article'}</h1>
            <p className="preview-dek">{sanitizePlainText(dek, 600)}</p>
            <div className="preview-body">
              {previewParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="editor-form">
          {error && <div className="error-banner" role="alert">{error}</div>}

          <div className="form-group">
            <label htmlFor="title">Headline</label>
            <input
              id="title"
              type="text"
              placeholder="Enter article headline..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="editor-title-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="dek">Subtitle / Dek</label>
            <textarea
              id="dek"
              placeholder="Brief summary of the article..."
              value={dek}
              onChange={(e) => setDek(e.target.value)}
              rows={2}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat.slug} value={cat.label}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="readTime">Read Time (min)</label>
              <input
                id="readTime"
                type="number"
                min={1}
                max={60}
                value={readTime}
                onChange={(e) => setReadTime(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="image">Cover Image URL</label>
            <input
              id="image"
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            {image && isValidExternalUrl(image) && (
              <img src={image} alt="Preview" className="image-preview" />
            )}
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags (comma separated)</label>
            <input
              id="tags"
              type="text"
              placeholder="Politics, Delta State, Governance"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="body">Article Body</label>
            <textarea
              id="body"
              placeholder="Write your article here. Separate paragraphs with blank lines..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={18}
              className="editor-body"
            />
          </div>
        </div>
      )}
    </main>
  )
}
