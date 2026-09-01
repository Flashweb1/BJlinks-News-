import { useEffect, useState } from 'react'
import { Cookie, X } from 'lucide-react'
import { getSiteConfig } from '../../utils/security'

const STORAGE_KEY = 'bjlinks-cookie-consent'
type ConsentState = 'granted' | 'denied' | 'unknown'

export function CookieConsent() {
  const cfg = getSiteConfig()
  const [consent, setConsent] = useState<ConsentState>('unknown')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!cfg.showCookieBanner) return
    try {
      const raw = localStorage.getItem(STORAGE_KEY) as ConsentState | null
      if (raw === 'granted' || raw === 'denied') {
        setConsent(raw)
      } else {
        const t = setTimeout(() => setVisible(true), 800)
        return () => clearTimeout(t)
      }
    } catch {
    }
  }, [cfg.showCookieBanner])

  if (!cfg.showCookieBanner) return null
  if (consent !== 'unknown') return null
  if (!visible) return null

  const write = (value: ConsentState) => {
    try {
      localStorage.setItem(STORAGE_KEY, value)
    } catch {
    }
    setConsent(value)
  }

  return (
    <div
      className="cookie-banner"
      role="dialog"
      aria-live="polite"
      aria-label="Cookie Consent"
      style={{
        position: 'fixed',
        insetInline: 0,
        bottom: 0,
        zIndex: 120,
        padding: '0.875rem 1rem calc(0.875rem + env(safe-area-inset-bottom))',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 960,
          background: 'rgba(12,10,8,0.96)',
          color: '#fff',
          borderRadius: 16,
          boxShadow:
            '0 20px 60px -20px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.15)',
          border: '1px solid rgba(255,255,255,0.08)',
          padding: '1rem 1.125rem',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) auto',
          gap: '0.75rem 1rem',
          alignItems: 'center',
          backdropFilter: 'blur(14px)',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            alignItems: 'flex-start',
            minWidth: 0,
          }}
        >
          <div
            style={{
              flexShrink: 0,
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'rgba(255,255,255,0.08)',
              display: 'grid',
              placeItems: 'center',
            }}
            aria-hidden
          >
            <Cookie size={18} />
          </div>
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: '-0.01em',
                marginBottom: 2,
              }}
            >
              We value your privacy
            </div>
            <div
              style={{
                fontSize: 13,
                lineHeight: 1.5,
                color: 'rgba(255,255,255,0.75)',
              }}
            >
              {cfg.name} uses cookies and similar technologies to enhance your
              browsing experience, analyze site traffic, and serve personalized
              content. By clicking &quot;Accept&quot;, you consent to our use
              of cookies as described in our{' '}
              <a
                href="/privacy"
                style={{ color: '#fff', textDecoration: 'underline' }}
              >
                Privacy Policy
              </a>
              .
            </div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <button
            onClick={() => write('denied')}
            aria-label="Decline cookies"
            title="Decline"
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: 'transparent',
              color: 'rgba(255,255,255,0.7)',
              border: '1px solid rgba(255,255,255,0.1)',
              cursor: 'pointer',
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <X size={16} />
          </button>
          <button
            onClick={() => write('denied')}
            style={{
              padding: '0.625rem 0.875rem',
              borderRadius: 10,
              background: 'transparent',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.14)',
              fontWeight: 600,
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            Decline
          </button>
          <button
            onClick={() => write('granted')}
            style={{
              padding: '0.625rem 1rem',
              borderRadius: 10,
              background: '#fff',
              color: '#0b0908',
              border: '1px solid #fff',
              fontWeight: 700,
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  )
}

export default CookieConsent
