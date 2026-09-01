import { Helmet } from 'react-helmet-async'
import { Shield } from 'lucide-react'
import { buildCanonicalUrl, getSiteConfig } from '../utils/security'

export default function PrivacyPage({ onNavigate }: { onNavigate?: (path: string) => void }) {
  const cfg = getSiteConfig()
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <main className="page-content privacy-page" style={{ maxWidth: 760, marginInline: 'auto' }}>
      <Helmet>
        <title>Privacy Policy — {cfg.name}</title>
        <meta name="description" content={`Privacy Policy for ${cfg.name}. Learn how we collect, use, and protect your personal data.`} />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href={buildCanonicalUrl('/privacy')} />
        <meta property="og:title" content={`Privacy Policy — ${cfg.name}`} />
        <meta property="og:url" content={buildCanonicalUrl('/privacy')} />
      </Helmet>

      <article style={{ padding: '2.5rem 1.25rem 4rem' }}>
        <header style={{ marginBottom: '2rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.3rem 0.7rem',
              borderRadius: 999,
              background: '#fff3ec',
              color: '#b7281e',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            <Shield size={13} /> Legal
          </div>
          <h1
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              margin: 0,
              marginBottom: '0.5rem',
            }}
          >
            Privacy Policy
          </h1>
          <p style={{ color: '#6f6a63', margin: 0 }}>
            Last updated: {today} · Effective immediately
          </p>
        </header>

        <div
          className="article-detail prose"
          style={{ fontSize: 16, lineHeight: 1.7, color: '#1a1714' }}
        >
          <p className="article-dek">
            At <strong>{cfg.name}</strong>, your privacy is central to how we design, build, and
            operate our services. This policy explains what information we collect, why we
            collect it, how we use it, and the rights you have under applicable law.
          </p>

          <h2>1. Information we collect</h2>
          <ul>
            <li>
              <strong>Account data:</strong> If you create an account or sign in (Google or
              email), we receive your display name, email address, and profile photo.
            </li>
            <li>
              <strong>Bookmarks &amp; preferences:</strong> Bookmarked article IDs and your
              chosen theme preference are stored locally in your browser and may be synced
              across your signed-in devices.
            </li>
            <li>
              <strong>Usage analytics:</strong> Aggregated, pseudonymized data about which
              articles you read, how long you read them, and your general region (country /
              state level) for editorial planning.
            </li>
            <li>
              <strong>Device &amp; logs:</strong> Standard server request logs (IP, user
              agent, timestamp) used exclusively for abuse prevention and security. Logs are
              retained for 14 days.
            </li>
          </ul>

          <h2>2. How we use information</h2>
          <ul>
            <li>Provide, maintain, and improve the {cfg.name} service.</li>
            <li>
              Personalize your experience (e.g., remembering bookmarks, theme preference, or
              reading progress).
            </li>
            <li>
              Send the Morning Digest newsletter and breaking-news alerts — <em>only</em> if
              you explicitly subscribe.
            </li>
            <li>
              Detect, prevent, and address fraud, abuse, security incidents, and illegal
              activity.
            </li>
            <li>
              Comply with legal obligations (e.g., valid subpoenas, court orders, or
              government requests).
            </li>
          </ul>

          <h2>3. Sharing &amp; third parties</h2>
          <p>
            We do <strong>not</strong> sell or rent personal data. We share data only in these
            limited circumstances:
          </p>
          <ul>
            <li>
              With trusted service providers (hosting, email delivery, analytics) bound by
              confidentiality obligations.
            </li>
            <li>To protect the rights, property, or safety of {cfg.name}, our users, or the public.</li>
            <li>If required by a valid legal process — we will attempt to give prior notice when lawful.</li>
          </ul>

          <h2>4. Cookies &amp; similar technologies</h2>
          <p>
            We use essential cookies to authenticate signed-in users, store your theme and
            bookmarks, and to measure the security of the service. Non-essential analytics
            cookies are only placed after you accept them via the consent banner shown when
            you first visit.
          </p>

          <h2>5. Your rights</h2>
          <ul>
            <li><strong>Access &amp; portability:</strong> Request a copy of the personal data we hold about you.</li>
            <li><strong>Correction:</strong> Ask us to correct inaccurate or incomplete data.</li>
            <li><strong>Deletion:</strong> Request deletion of your account and related personal data, subject to legal retention requirements.</li>
            <li><strong>Objection / restriction:</strong> Object to or restrict certain processing.</li>
            <li><strong>Unsubscribe:</strong> One-click unsubscribe in every marketing email.</li>
          </ul>
          <p>
            To exercise any of these rights, contact us at{' '}
            <a href={`mailto:${cfg.contactEmail}`}>{cfg.contactEmail}</a>. We respond to
            verifiable requests within 30 days.
          </p>

          <h2>6. Children&apos;s privacy</h2>
          <p>
            {cfg.name} is not directed at children under 13 and we do not knowingly collect
            personal data from them. If you believe we have done so, contact us and we will
            promptly delete the data.
          </p>

          <h2>7. International transfers</h2>
          <p>
            Your data may be processed in countries other than your own. Where this occurs,
            we rely on adequacy decisions, standard contractual clauses, or other legal
            mechanisms to protect your rights.
          </p>

          <h2>8. Changes to this policy</h2>
          <p>
            We may update this policy periodically. Material changes will be posted on this
            page with a revised &quot;Last updated&quot; date and, where appropriate,
            notified via the Morning Digest or an in-banner notice.
          </p>

          <h2>9. Contact</h2>
          <p>
            Questions, concerns, or complaints regarding this policy? Please email{' '}
            <a href={`mailto:${cfg.contactEmail}`}>{cfg.contactEmail}</a>.
          </p>

          <div
            style={{
              marginTop: '3rem',
              padding: '1rem 1.25rem',
              borderRadius: 12,
              background: '#f8f5f0',
              border: '1px solid #e9e2d7',
              fontSize: 14,
              color: '#5a5650',
            }}
          >
            This policy page is a template providing a baseline for GDPR, CCPA, and general
            privacy compliance. Consult a qualified privacy lawyer before publication to
            ensure it accurately reflects your exact processing activities and legal
            obligations.
          </div>

          {onNavigate && (
            <div style={{ marginTop: '2rem' }}>
              <button
                onClick={() => onNavigate('/')}
                className="btn-secondary"
                style={{
                  display: 'inline-flex',
                  padding: '0.7rem 1.25rem',
                  borderRadius: 10,
                  border: '1px solid #e3ddd2',
                  background: '#fff',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                ← Back to homepage
              </button>
            </div>
          )}
        </div>
      </article>
    </main>
  )
}
