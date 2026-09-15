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
      <div className="cookie-card">
        <div className="cookie-content">
          <div className="cookie-icon" aria-hidden>
            <Cookie size={18} />
          </div>
          <div className="cookie-copy">
            <div className="cookie-title">We value your privacy</div>
            <div className="cookie-desc">
              {cfg.name} uses cookies and similar technologies to enhance your
              browsing experience, analyze site traffic, and serve personalized
              content. By clicking "Accept", you consent to our use
              of cookies as described in our{' '}
              <a href="/privacy" className="cookie-link">
                Privacy Policy
              </a>
              .
            </div>
          </div>
        </div>
        <div className="cookie-actions">
          <button className="cookie-icon-btn" onClick={() => write('denied')} aria-label="Decline cookies" title="Decline">
            <X size={16} />
          </button>
          <button className="cookie-btn cookie-decline" onClick={() => write('denied')}>Decline</button>
          <button className="cookie-btn cookie-accept" onClick={() => write('granted')}>Accept all</button>
        </div>
      </div>
    </div>
  )
}

export default CookieConsent
