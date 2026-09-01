import { Helmet } from 'react-helmet-async'
import { Shield, Lock, User, Activity } from 'lucide-react'
import { buildCanonicalUrl, getSiteConfig } from '../utils/security'

export default function PrivacyPage({ onNavigate }: { onNavigate?: (path: string) => void }) {
  const cfg = getSiteConfig()
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const year = new Date().getFullYear()

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
            Last updated: {today} · Effective {year}
          </p>
        </header>

        <div
          className="article-detail prose"
          style={{ fontSize: 16, lineHeight: 1.7, color: '#1a1714' }}
        >
          <p className="article-dek">
            At <strong>{cfg.name}</strong>, your privacy is central to how we design, build, and
            operate our services. This policy explains what information we collect, why we
            collect it, how we use it, and the rights you have under applicable law including
            the Nigeria Data Protection Regulation (NDPR), General Data Protection Regulation (GDPR),
            and other applicable data protection laws.
          </p>

          <h2>1. Information we collect</h2>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 0 }}>1.1 Account Data</h3>
            <ul>
              <li>If you create an account or sign in (Google or email), we receive your display name, email address, and profile photo.</li>
              <li>Your account is protected by Firebase Authentication with industry-standard encryption.</li>
            </ul>
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 0 }}>1.2 Usage Data</h3>
            <ul>
              <li><strong>Article engagement:</strong> Which articles you read, how long you read them, and your reading progress.</li>
              <li><strong>Device information:</strong> Browser type, operating system, screen size, and language preferences.</li>
              <li><strong>Log data:</strong> IP address (processed anonymously for security), user agent, timestamp, and referrer URL.</li>
              <li><strong>Location data:</strong> General region (country/state level only) derived from IP for editorial planning.</li>
            </ul>
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 0 }}>1.3 Cookies and Tracking Technologies</h3>
            <p>
              We use essential and non-essential cookies as described in our{' '}
              <a href="/privacy">Cookie Policy section</a> below.
            </p>
          </div>

          <h2>2. How we use your information</h2>
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
            <li>Analyze trends and usage patterns to improve content quality and relevance.</li>
          </ul>

          <h2>3. Sharing and disclosure</h2>
          <p>
            We do <strong>not</strong> sell, rent, or trade personal data to third parties. We share data only in these
            limited circumstances:
          </p>
          <ul>
            <li>
              <strong>Service Providers:</strong> Trusted partners (hosting, email delivery, analytics) bound by
              strict confidentiality obligations and limited use agreements.
            </li>
            <li>
              <strong>Legal Compliance:</strong> To protect the rights, property, or safety of {cfg.name}, our users, or the public.
            </li>
            <li>
              <strong>Business Transfers:</strong> In connection with any merger, acquisition, or asset sale —
              users will be notified via email and website notice.
            </li>
            <li>
              <strong>Legal Process:</strong> If required by a valid legal process — we will attempt to give prior notice when lawful.
            </li>
          </ul>

          <h2>4. Cookies and similar technologies</h2>
          <p>
            We use cookies and similar tracking technologies to enhance your experience. Here's what we use:
          </p>
          <ul>
            <li><strong>Essential Cookies:</strong> Authentication, session management, security features.</li>
            <li><strong>Functionality Cookies:</strong> Remembering your theme preference, bookmarks, and settings.</li>
            <li><strong>Analytics Cookies:</strong> Understanding how visitors use the site — <em>only placed after consent</em>.</li>
            <li><strong>Advertising Cookies:</strong> Not used — we do not display personalized ads.</li>
          </ul>
          <p>
            You can control cookie preferences via our consent banner and adjust browser settings to block cookies.
            Note that disabling essential cookies may prevent site functionality.
          </p>

          <h2>5. Your rights under data protection law</h2>
          <p>
            Depending on your location, you have the following rights:
          </p>
          <ul>
            <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
            <li><strong>Portability:</strong> Receive your data in a structured, commonly used, and machine-readable format.</li>
            <li><strong>Correction:</strong> Ask us to correct inaccurate or incomplete data.</li>
            <li><strong>Deletion:</strong> Request deletion of your account and related personal data, subject to legal retention requirements.</li>
            <li><strong>Restriction:</strong> Request restriction of processing in certain circumstances.</li>
            <li><strong>Objection:</strong> Object to processing for direct marketing or other purposes.</li>
            <li><strong>Withdraw Consent:</strong> Withdraw consent at any time (does not affect lawfulness of prior processing).</li>
          </ul>
          <p>
            To exercise any of these rights, contact our Data Protection Officer at{' '}
            <a href={`mailto:${cfg.contactEmail}`}>{cfg.contactEmail}</a>. We respond to
            verifiable requests within 30 days as required by NDPR and GDPR.
          </p>

          <h2>6. Children's privacy</h2>
          <p>
            {cfg.name} is not directed at children under 13 (or 16 for EU users) and we do not knowingly collect
            personal data from them. If you believe we have collected data from a child, contact us immediately
            and we will promptly delete the data.
          </p>

          <h2>7. International data transfers</h2>
          <p>
            Your data may be processed in countries other than your own. Where this occurs,
            we rely on:
          </p>
          <ul>
            <li>Adequacy decisions from relevant authorities</li>
            <li>Standard Contractual Clauses (SCCs) approved by the European Commission</li>
            <li>Other legal mechanisms to protect your rights</li>
            <li>Binding Corporate Rules where applicable</li>
          </ul>

          <h2>8. Data retention</h2>
          <p>
            We retain personal data for as long as necessary to provide our services and comply with legal obligations:
          </p>
          <ul>
            <li><strong>Account data:</strong> Until account deletion + 7 years for tax/legal</li>
            <li><strong>Log data:</strong> 90 days (anonymized thereafter)</li>
            <li><strong>Newsletter subscriptions:</strong> Until unsubscribe + 3 years</li>
            <li><strong>Cookie consent:</strong> 2 years</li>
          </ul>

          <h2>9. Security measures</h2>
          <p>
            We implement industry-standard security measures including:
          </p>
          <ul>
            <li>Encryption of data in transit (TLS 1.3)</li>
            <li>Encrypted data at rest in Firebase Firestore</li>
            <li>Regular security audits and penetration testing</li>
            <li>Access controls and least-privilege principles</li>
            <li>Regular security patches and updates</li>
          </ul>

          <h2>10. Changes to this policy</h2>
          <p>
            We may update this policy periodically. Material changes will be posted on this
            page with a revised "Last updated" date. We will also notify registered users
            via email for significant changes.
          </p>

          <h2>11. Contact information</h2>
          <p>
            Questions, concerns, or complaints regarding this policy? Please contact our Data Protection Officer:
          </p>
          <p style={{ margin: '1rem 0' }}>
            <strong>Email:</strong> <a href={`mailto:${cfg.contactEmail}`}>{cfg.contactEmail}</a><br />
            <strong>Address:</strong> Lagos, Nigeria
          </p>
          <p>
            You also have the right to lodge a complaint with your local data protection authority.
          </p>

          <div
            style={{
              marginTop: '3rem',
              padding: '1.25rem',
              borderRadius: 12,
              background: '#f8f5f0',
              border: '1px solid #e9e2d7',
              fontSize: 14,
              color: '#5a5650',
            }}
          >
            <strong>Disclaimer:</strong> This Privacy Policy is a template providing a baseline for GDPR, NDPR,
            CCPA, and general privacy compliance. It is provided "as is" without warranty of any kind.
            Consult a qualified privacy lawyer before publication to ensure it accurately reflects your exact
            processing activities, jurisdiction, and legal obligations. This template does not constitute
            legal advice.
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
