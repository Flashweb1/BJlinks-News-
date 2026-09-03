import { useState } from 'react'
import { Upload, Trash2, Copy, Check, Image as ImageIcon, X } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout'

interface MediaPageProps {
  onNavigate: (path: string) => void
}

interface MediaItem {
  id: string
  url: string
  name: string
  uploadedAt: string
  size: string
}

const sampleMedia: MediaItem[] = [
  { id: '1', url: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=400&q=80', name: 'delta-secretariat.jpg', uploadedAt: 'Aug 24, 2026', size: '245 KB' },
  { id: '2', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80', name: 'economy-growth.jpg', uploadedAt: 'Aug 23, 2026', size: '189 KB' },
  { id: '3', url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80', name: 'warri-tech-hub.jpg', uploadedAt: 'Aug 22, 2026', size: '312 KB' },
  { id: '4', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80', name: 'university-ai.jpg', uploadedAt: 'Aug 21, 2026', size: '178 KB' },
  { id: '5', url: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=400&q=80', name: 'super-eagles.jpg', uploadedAt: 'Aug 20, 2026', size: '156 KB' },
  { id: '6', url: 'https://images.unsplash.com/photo-1555824954-7ca8955f023c?auto=format&fit=crop&w=400&q=80', name: 'lagos-infrastructure.jpg', uploadedAt: 'Aug 19, 2026', size: '223 KB' },
  { id: '7', url: 'https://images.unsplash.com/photo-1525495001375-879186627191?auto=format&fit=crop&w=400&q=80', name: 'central-bank.jpg', uploadedAt: 'Aug 18, 2026', size: '145 KB' },
  { id: '8', url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=400&q=80', name: 'digital-health.jpg', uploadedAt: 'Aug 17, 2026', size: '198 KB' },
]

export default function MediaPage({ onNavigate }: MediaPageProps) {
  const [media, setMedia] = useState<MediaItem[]>(sampleMedia)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)
  const [newImageUrl, setNewImageUrl] = useState('')
  const [showUrlInput, setShowUrlInput] = useState(false)

  const handleCopyUrl = (item: MediaItem) => {
    navigator.clipboard.writeText(item.url)
    setCopiedId(item.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleAddByUrl = () => {
    if (!newImageUrl.trim()) return
    const newItem: MediaItem = {
      id: Date.now().toString(),
      url: newImageUrl,
      name: newImageUrl.split('/').pop() || 'image.jpg',
      uploadedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      size: '—',
    }
    setMedia([newItem, ...media])
    setNewImageUrl('')
    setShowUrlInput(false)
  }

  const handleDelete = (id: string) => {
    setMedia(media.filter((m) => m.id !== id))
    if (selectedItem?.id === id) setSelectedItem(null)
  }

  return (
    <AdminLayout currentPage="media" onNavigate={onNavigate}>
      <div className="admin-page-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1 className="admin-page-title">Media Library</h1>
          <p className="admin-page-subtitle">{media.length} image{media.length !== 1 ? 's' : ''}</p>
        </div>
        <button className="btn-admin-primary" onClick={() => setShowUrlInput(true)}>
          <Upload size={16} /> Add Image
        </button>
      </div>

      {showUrlInput && (
        <div className="admin-card" style={{ marginBottom: '1rem', padding: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end' }}>
            <div className="admin-form-group" style={{ flex: 1, marginBottom: 0 }}>
              <label className="admin-label">Image URL</label>
              <input
                type="url"
                className="admin-input"
                placeholder="https://images.unsplash.com/..."
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddByUrl()}
              />
            </div>
            <button className="btn-admin-primary" onClick={handleAddByUrl}>Add</button>
            <button className="btn-admin-secondary" onClick={() => { setShowUrlInput(false); setNewImageUrl('') }}>Cancel</button>
          </div>
        </div>
      )}

      <div className="admin-card">
        <div className="admin-media-grid">
          {media.map((item) => (
            <div
              key={item.id}
              className="admin-media-item"
              onClick={() => setSelectedItem(item)}
            >
              <img src={item.url} alt={item.name} loading="lazy" />
              <div className="admin-media-item-overlay">
                <button
                  className="btn-admin-icon"
                  style={{ background: 'white' }}
                  onClick={(e) => { e.stopPropagation(); handleCopyUrl(item) }}
                  title="Copy URL"
                >
                  {copiedId === item.id ? <Check size={14} /> : <Copy size={14} />}
                </button>
                <button
                  className="btn-admin-icon"
                  style={{ background: 'var(--admin-error)', color: 'white' }}
                  onClick={(e) => { e.stopPropagation(); handleDelete(item.id) }}
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}

          <div
            className="admin-media-item admin-media-upload"
            onClick={() => setShowUrlInput(true)}
          >
            <Upload size={24} />
            <span className="admin-text-sm">Add Image</span>
          </div>
        </div>
      </div>

      {selectedItem && (
        <div className="admin-modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="admin-modal" style={{ maxWidth: '560px' }} onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">Image Details</h3>
              <button className="btn-admin-icon" onClick={() => setSelectedItem(null)}>
                <X size={16} />
              </button>
            </div>
            <div className="admin-modal-body" style={{ padding: 0 }}>
              <img
                src={selectedItem.url}
                alt={selectedItem.name}
                style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
              />
              <div style={{ padding: '1rem 1.25rem' }}>
                <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>{selectedItem.name}</div>
                <div className="admin-text-sm admin-text-muted" style={{ marginBottom: '0.25rem' }}>
                  Uploaded: {selectedItem.uploadedAt}
                </div>
                <div className="admin-text-sm admin-text-muted" style={{ marginBottom: '1rem' }}>
                  Size: {selectedItem.size}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    className="btn-admin-secondary"
                    style={{ flex: 1 }}
                    onClick={() => handleCopyUrl(selectedItem)}
                  >
                    {copiedId === selectedItem.id ? <Check size={14} /> : <Copy size={14} />}
                    {copiedId === selectedItem.id ? 'Copied!' : 'Copy URL'}
                  </button>
                  <button
                    className="btn-admin-danger"
                    style={{ flex: 1 }}
                    onClick={() => handleDelete(selectedItem.id)}
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
