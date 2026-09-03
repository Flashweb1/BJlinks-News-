import { useState } from 'react'
import { Save, Globe, Mail, Bell, Shield, Palette } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout'

interface SettingsPageProps {
  onNavigate: (path: string) => void
}

export default function SettingsPage({ onNavigate }: SettingsPageProps) {
  const [siteName, setSiteName] = useState('Bjlinks News')
  const [siteTagline, setSiteTagline] = useState('Information for living')
  const [contactEmail, setContactEmail] = useState('editor@bjlinksnews.com')
  const [description, setDescription] = useState('Your trusted source for Nigerian news, politics, business, and stories that matter.')
  const [facebook, setFacebook] = useState('https://facebook.com/bjlinksnews')
  const [twitter, setTwitter] = useState('https://twitter.com/bjlinksnews')
  const [instagram, setInstagram] = useState('')
  const [notifyOnComment, setNotifyOnComment] = useState(true)
  const [notifyOnPublish, setNotifyOnPublish] = useState(true)
  const [defaultCategory, setDefaultCategory] = useState('News')
  const [moderation, setModeration] = useState(true)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const Section = ({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) => (
    <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
      <div className="admin-card-header">
        <h2 className="admin-card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Icon size={16} /> {title}
        </h2>
      </div>
      <div className="admin-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {children}
      </div>
    </div>
  )

  const Toggle = ({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span className="admin-text-sm">{label}</span>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        style={{
          width: 40,
          height: 22,
          borderRadius: 11,
          background: checked ? 'var(--admin-accent)' : 'var(--admin-border)',
          border: 'none',
          cursor: 'pointer',
          position: 'relative',
          transition: 'background var(--duration-150)',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 3,
            left: checked ? 21 : 3,
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: 'white',
            transition: 'left var(--duration-150)',
          }}
        />
      </button>
    </div>
  )

  return (
    <AdminLayout currentPage="settings" onNavigate={onNavigate}>
      <div className="admin-page-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1 className="admin-page-title">Settings</h1>
          <p className="admin-page-subtitle">Configure your site preferences and preferences</p>
        </div>
        <button className="btn-admin-primary" onClick={handleSave}>
          <Save size={16} /> {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div>
          <Section title="Site Information" icon={Globe}>
            <div className="admin-form-group">
              <label className="admin-label">Site Name</label>
              <input type="text" className="admin-input" value={siteName} onChange={(e) => setSiteName(e.target.value)} />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Tagline</label>
              <input type="text" className="admin-input" value={siteTagline} onChange={(e) => setSiteTagline(e.target.value)} />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Description</label>
              <textarea
                className="admin-textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </Section>

          <Section title="Contact" icon={Mail}>
            <div className="admin-form-group">
              <label className="admin-label">Editor Email</label>
              <input type="email" className="admin-input" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
            </div>
          </Section>

          <Section title="Social Media" icon={Globe}>
            <div className="admin-form-group">
              <label className="admin-label">Facebook</label>
              <input type="url" className="admin-input" placeholder="https://facebook.com/..." value={facebook} onChange={(e) => setFacebook(e.target.value)} />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Twitter / X</label>
              <input type="url" className="admin-input" placeholder="https://twitter.com/..." value={twitter} onChange={(e) => setTwitter(e.target.value)} />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Instagram</label>
              <input type="url" className="admin-input" placeholder="https://instagram.com/..." value={instagram} onChange={(e) => setInstagram(e.target.value)} />
            </div>
          </Section>
        </div>

        <div>
          <Section title="Notifications" icon={Bell}>
            <Toggle checked={notifyOnComment} onChange={setNotifyOnComment} label="Email on new comment" />
            <Toggle checked={notifyOnPublish} onChange={setNotifyOnPublish} label="Email on article published" />
          </Section>

          <Section title="Content Settings" icon={Shield}>
            <div className="admin-form-group">
              <label className="admin-label">Default Category</label>
              <select
                className="admin-select"
                value={defaultCategory}
                onChange={(e) => setDefaultCategory(e.target.value)}
              >
                {['Politics', 'News', 'Business', 'World', 'Tech', 'Health', 'Sports', 'Religion', 'Education', 'Stories'].map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <Toggle checked={moderation} onChange={setModeration} label="Require comment moderation" />
          </Section>

          <Section title="Security" icon={Shield}>
            <div style={{ padding: '0.75rem', background: 'var(--admin-surface-3)', borderRadius: '6px' }}>
              <div className="admin-text-sm" style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Two-Factor Authentication</div>
              <div className="admin-text-sm admin-text-muted" style={{ marginBottom: '0.75rem' }}>Add an extra layer of security to your admin account.</div>
              <button className="btn-admin-secondary" style={{ height: 32, fontSize: '0.8125rem' }}>
                Enable 2FA
              </button>
            </div>
          </Section>

          <div className="admin-card">
            <div className="admin-card-header">
              <h2 className="admin-card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Shield size={16} /> Danger Zone
              </h2>
            </div>
            <div className="admin-card-body">
              <div style={{ padding: '0.75rem', background: 'var(--admin-error-soft)', borderRadius: '6px', border: '1px solid rgba(220, 38, 38, 0.2)' }}>
                <div className="admin-text-sm" style={{ fontWeight: 600, color: 'var(--admin-error)', marginBottom: '0.25rem' }}>Delete All Articles</div>
                <div className="admin-text-sm admin-text-muted" style={{ marginBottom: '0.75rem' }}>Permanently delete all articles. This cannot be undone.</div>
                <button className="btn-admin-primary" style={{ background: 'var(--admin-error)', height: 32, fontSize: '0.8125rem' }}>
                  Delete All Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
