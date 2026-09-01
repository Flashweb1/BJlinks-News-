import { Helmet } from 'react-helmet-async'
import { Scale } from 'lucide-react'
import { buildCanonicalUrl, getSiteConfig } from '../utils/security'

export default function TermsPage({ onNavigate }: { onNavigate?: (path: string) => void }) {
  const cfg = getSiteConfig()
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <main className="page-content terms-page" style={{ maxWidth: 760, marginInline: 'auto' }}>
      <Helmet>
        <title>Terms of Service — {cfg.name}</title>
        <meta name="description" content={`Terms of Service for ${cfg.name}.`} />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href={buildCanonicalUrl('/terms')} />
        <meta property="og:title" content={`Terms of Service — ${cfg.name}`} />
        <meta property="og:url" content={buildCanonicalUrl('/terms')} />
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
            <Scale size={13} /> Legal
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
            Terms of Service
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
            These Terms of Service (“Terms”) are a binding legal agreement between you and{' '}
            <strong>{cfg.name}</strong> (“we”, “us”, “our”). By accessing or using {cfg.name},
            you agree to be bound by these Terms. If you do not agree, please do not use the
            service.
          </p>

          <h2>1. Description of service</h2>
          <p>
            {cfg.name} is a digital news publication providing editorial, analysis, and
            opinion content, along with reader features including bookmarks, search, and a
            newsletter subscription.
          </p>

          <h2>2. Eligibility &amp; accounts</h2>
          <ul>
            <li>You must be at least 13 years old to use the service.</li>
            <li>
              You agree to provide accurate, complete, and current account information and
              to update it promptly.
            </li>
            <li>
              You are responsible for safeguarding your account credentials and for any
              activity conducted under your account.
            </li>
          </ul>

          <h2>3. Acceptable use</h2>
          <p>You agree <strong>not</strong> to:</p>
          <ul>
            <li>
              Violate any applicable law, regulation, or third-party right, including
              copyright, trademark, privacy, and publicity.
            </li>
            <li>
              Engage in scraping, crawling, automated access, volume article downloading, or
              data extraction without our written consent.
            </li>
            <li>
              Circumvent or disable any security, authentication, or access-control feature
              of the service.
            </li>
            <li>
              Upload, post, or transmit any content that contains viruses, malware, or other
              harmful code.
            </li>
            <li>
              Use the service for commercial purposes (e.g., republishing, reselling, or
              syndicating our content) without our written consent.
            </li>
          </ul>

          <h2>4. Intellectual property</h2>
          <p>
            Except as otherwise noted, all content published on {cfg.name} — including
            articles, photos, illustrations, graphics, logos, audio, and source code — is
            owned or licensed by us and is protected by copyright, trademark, and other
            intellectual property laws. You may view, download, and print individual pages
            for your personal, non-commercial use only.
          </p>

          <h2>5. Subscriber communications &amp; newsletters</h2>
          <p>
            If you subscribe to our newsletter(s), you agree to receive electronic
            communications from us. You may unsubscribe at any time via the one-click
            unsubscribe link contained in every message or by contacting{' '}
            <a href={`mailto:${cfg.contactEmail}`}>{cfg.contactEmail}</a>.
          </p>

          <h2>6. Disclaimers</h2>
          <p>
            The service and all content are provided on an “AS IS” and “AS AVAILABLE” basis.
            We disclaim all warranties, express or implied, including warranties of
            merchantability, fitness for a particular purpose, title, and non-infringement.
            We do not warrant that the service will be uninterrupted, error-free, secure, or
            free of viruses or other harmful components.
          </p>

          <h2>7. Limitation of liability</h2>
          <p>
            To the maximum extent permitted by applicable law, in no event shall {cfg.name}
            or its directors, officers, employees, or agents be liable for any indirect,
            incidental, special, consequential, or punitive damages, or any loss of profits,
            revenues, data, or use, arising out of or related to these Terms or the service,
            even if advised of the possibility of such damages. Our total aggregate liability
            to you for any claim arising out of these Terms shall not exceed the total amount
            you paid (if any) to use the service in the twelve (12) months preceding the
            claim.
          </p>

          <h2>8. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless {cfg.name} and its officers,
            directors, employees, and agents from and against any claim, action, demand,
            damage, loss, liability, cost, or expense (including reasonable attorney fees)
            arising out of or related to your breach of these Terms, your use of the
            service, or your violation of any third-party right.
          </p>

          <h2>9. Modifications</h2>
          <p>
            We may revise these Terms from time to time. The most current version will be
            posted on this page with the &quot;Last updated&quot; date. Your continued use of
            the service after changes become effective constitutes your acceptance of the
            revised Terms.
          </p>

          <h2>10. Governing law &amp; dispute resolution</h2>
          <p>
            These Terms shall be governed by the laws of the Federal Republic of Nigeria,
            without regard to its conflict-of-law principles. Any dispute arising out of or
            related to these Terms or the service shall first be resolved through good-faith
            negotiation; if unresolved, the parties submit to the exclusive jurisdiction of
            the competent courts in Lagos, Nigeria.
          </p>

          <h2>11. Severability</h2>
          <p>
            If any provision of these Terms is found to be invalid or unenforceable, that
            provision shall be severed and the remaining provisions shall remain in full
            force and effect.
          </p>

          <h2>12. Contact</h2>
          <p>
            Questions or notices regarding these Terms should be directed to{' '}
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
            This terms page is a template providing a baseline for general web-publisher
            terms. Consult a qualified lawyer before publication to ensure it accurately
            reflects your jurisdiction, business model, and legal obligations.
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
