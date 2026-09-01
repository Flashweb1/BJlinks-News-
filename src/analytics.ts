import { initReactSentry } from './utils/sentry'

// Analytics configuration
const plausibleDomain = import.meta.env.VITE_PLAUSIBLE_DOMAIN || ''
const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID || ''
const sentryDsn = import.meta.env.VITE_SENTRY_DSN || ''

// Initialize Sentry if configured
if (sentryDsn) {
  initReactSentry(sentryDsn)
}

// Initialize Plausible Analytics if configured
if (plausibleDomain) {
  ;(function () {
    const d = document
    const p = d.createElement('script')
    p.defer = true
    p.async = true
    p.src = 'https://plausible.io/js/script.js'
    p.setAttribute('data-domain', plausibleDomain)
    d.head.appendChild(p)
  })()
}

// Initialize Google Analytics if configured
if (gaMeasurementId) {
  // Type assertion to bypass TypeScript gtag type checking
  // @ts-ignore
  ;(function gtag() {
    // @ts-ignore
    window.dataLayer.push(arguments)
  })
  // @ts-ignore
  window.gtag('js', new Date())
  // @ts-ignore
  window.gtag('config', gaMeasurementId, {
    send_page_view: false,
  })
}

// Export for use in other modules
export const analytics = {
  logPageView: (path: string) => {
    if (plausibleDomain) {
      try {
        // @ts-ignore - plausible may not be defined
        window.plausible?.('pageview', { u: path })
      } catch {
        // Ignore plausible errors
      }
    }
    if (gaMeasurementId) {
      try {
        // @ts-ignore - gtag may not be defined
        window.gtag?.('event', 'page_view', { page_path: path })
      } catch {
        // Ignore GA errors
      }
    }
  },

  logEvent: (eventName: string, eventParams?: Record<string, unknown>) => {
    if (plausibleDomain) {
      try {
        // @ts-ignore - plausible may not be defined
        window.plausible?.(eventName, { props: eventParams })
      } catch {
        // Ignore plausible errors
      }
    }
    if (gaMeasurementId) {
      try {
        // @ts-ignore - gtag may not be defined
        window.gtag?.('event', eventName, eventParams)
      } catch {
        // Ignore GA errors
      }
    }
  },
}
