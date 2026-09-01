import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Compass, Home, Search, ArrowLeft } from 'lucide-react'
import { buildCanonicalUrl, getSiteConfig } from '../utils/security'

interface NotFoundPageProps {
  onNavigate: (path: string) => void
}

export default function NotFoundPage({ onNavigate }: NotFoundPageProps) {
  const cfg = getSiteConfig()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [])

  return (
    <main className="error-page" role="main">
      <Helmet>
        <title>Page Not Found</title>
        <meta name="description" content={`The page you requested could not be found on ${cfg.name}.`} />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href={buildCanonicalUrl('/')} />
      </Helmet>

      <div className="error-page-inner" style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center', padding: '4rem 1.25rem' }}>
        <div
          aria-hidden
          style={{
            width: 72,
            height: 72,
            margin: '0 auto 1.5rem',
            borderRadius: 18,
            background: 'linear-gradient(135deg, #ffefe4 0%, #ffe1cf 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Compass color="#b7281e" size={36} strokeWidth={2} />
        </div>

        <p
          style={{
            fontFamily: '"DM Mono", ui-monospace, monospace',
            fontSize: 12,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#8b8680',
            margin: 0,
            marginBottom: '0.5rem',
          }}
        >
          404 — Off the Press
        </p>

        <h1
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            fontWeight: 700,
            margin: 0,
            marginBottom: '0.75rem',
            letterSpacing: '-0.01em',
            lineHeight: 1.15,
          }}
        >
          We can't find that page.
        </h1>

        <p
          style={{
            color: '#5a5650',
            fontSize: '1.05rem',
            lineHeight: 1.6,
            margin: 0,
            marginBottom: '2rem',
          }}
        >
          The story you're looking for may have been moved, archived, or never existed.
          Try one of the options below to keep reading.
        </p>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.625rem',
            marginBottom: '2.5rem',
          }}
        >
          <button
            type="button"
            onClick={() => onNavigate('/')}
            style={primaryBtn}
          >
            <Home size={16} /> Back to home
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/search')}
            style={secondaryBtn}
          >
            <Search size={16} /> Search articles
          </button>
          <button
            type="button"
            onClick={() => window.history.length > 1 && window.history.back()}
            style={secondaryBtn}
          >
            <ArrowLeft size={16} /> Go back
          </button>
        </div>

        <div
          style={{
            borderTop: '1px solid #e9e2d7',
            paddingTop: '1.5rem',
            fontSize: 13,
            color: '#8b8680',
          }}
        >
          Need to report a broken link?{' '}
          <a
            href={`mailto:${cfg.contactEmail}?subject=${encodeURIComponent('Broken link report')}`}
            style={{ color: '#111', textDecoration: 'underline' }}
          >
            {cfg.contactEmail}
          </a>
        </div>
      </div>
    </main>
  )
}

const primaryBtn: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.75rem 1.125rem',
  background: '#000',
  color: '#fff',
  borderRadius: 10,
  fontWeight: 600,
  fontSize: 14,
  border: '1px solid #000',
  cursor: 'pointer',
}

const secondaryBtn: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.75rem 1.125rem',
  background: '#ffffff',
  color: '#111',
  borderRadius: 10,
  fontWeight: 600,
  fontSize: 14,
  border: '1px solid #e3ddd2',
  cursor: 'pointer',
}
