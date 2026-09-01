/**
 * Accessibility Utilities
 * WCAG 2.1 AA/AAA compliance helpers
 */

/**
 * Generate unique ID for aria-labelledby/aria-describedby
 */
export function generateId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Check if element is visible to screen readers
 */
export function isAccessibleElement(element: HTMLElement): boolean {
  const style = window.getComputedStyle(element)
  const isHidden =
    element.hasAttribute('aria-hidden') ||
    element.getAttribute('aria-hidden') === 'true' ||
    style.display === 'none' ||
    style.visibility === 'hidden'

  return !isHidden
}

/**
 * Focus management utilities
 */
export const focusManager = {
  /**
   * Trap focus within an element (for modals)
   */
  trapFocus(element: HTMLElement): () => void {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus()
          event.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus()
          event.preventDefault()
        }
      }
    }

    element.addEventListener('keydown', handleKeyDown)
    firstElement?.focus()

    return () => {
      element.removeEventListener('keydown', handleKeyDown)
    }
  },

  /**
   * Restore focus to previously focused element
   */
  saveFocus(): () => void {
    const previouslyFocused = document.activeElement as HTMLElement
    return () => {
      previouslyFocused?.focus()
    }
  },

  /**
   * Announce message to screen readers
   */
  announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    const announcement = document.createElement('div')
    announcement.setAttribute('role', 'status')
    announcement.setAttribute('aria-live', priority)
    announcement.setAttribute('aria-atomic', 'true')
    announcement.className = 'sr-only'
    announcement.textContent = message

    document.body.appendChild(announcement)

    // Remove after announcement is read
    setTimeout(() => announcement.remove(), 1000)
  },

  /**
   * Disable focus management (useful for nested focus traps)
   */
  releaseFocus(): void {
    const element = document.activeElement as HTMLElement
    element?.blur()
  },
}

/**
 * ARIA attribute helpers
 */
export const ariaHelpers = {
  /**
   * Mark element as loading
   */
  setLoading(element: HTMLElement, isLoading: boolean): void {
    element.setAttribute('aria-busy', isLoading.toString())
    if (isLoading) {
      element.setAttribute('aria-disabled', 'true')
    } else {
      element.removeAttribute('aria-disabled')
    }
  },

  /**
   * Mark element as invalid with error message
   */
  setInvalid(element: HTMLElement, isInvalid: boolean, errorId?: string): void {
    element.setAttribute('aria-invalid', isInvalid.toString())
    if (isInvalid && errorId) {
      element.setAttribute('aria-describedby', errorId)
    } else if (!isInvalid) {
      element.removeAttribute('aria-describedby')
    }
  },

  /**
   * Link elements with aria-labelledby
   */
  linkLabel(element: HTMLElement, labelId: string): void {
    element.setAttribute('aria-labelledby', labelId)
  },

  /**
   * Link elements with aria-describedby
   */
  linkDescription(element: HTMLElement, descriptionId: string): void {
    element.setAttribute('aria-describedby', descriptionId)
  },

  /**
   * Mark element as selected/active
   */
  setCurrent(
    element: HTMLElement,
    current: boolean = true,
    type: 'page' | 'step' | 'location' | 'date' | 'time' | 'true' = 'page'
  ): void {
    element.setAttribute('aria-current', current ? type : 'false')
  },

  /**
   * Announce that content is expanded/collapsed
   */
  setExpanded(element: HTMLElement, expanded: boolean): void {
    element.setAttribute('aria-expanded', expanded.toString())
  },

  /**
   * Control visibility without hiding from screen readers
   */
  setHidden(element: HTMLElement, hidden: boolean): void {
    element.setAttribute('aria-hidden', hidden.toString())
  },

  /**
   * Add tooltip/descriptive text
   */
  addTooltip(element: HTMLElement, text: string): void {
    element.setAttribute('title', text)
    element.setAttribute('aria-label', text)
  },
}

/**
 * Keyboard event helpers
 */
export const keyboardHelpers = {
  /**
   * Check if event is from keyboard (not mouse/touch)
   */
  isKeyboardEvent(event: Event): boolean {
    return event instanceof KeyboardEvent
  },

  /**
   * Check for Enter key press
   */
  isEnterKey(event: KeyboardEvent): boolean {
    return event.key === 'Enter' || event.code === 'Space'
  },

  /**
   * Check for Escape key press
   */
  isEscapeKey(event: KeyboardEvent): boolean {
    return event.key === 'Escape' || event.keyCode === 27
  },

  /**
   * Check for Arrow key press
   */
  isArrowKey(event: KeyboardEvent): boolean {
    return ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)
  },

  /**
   * Handle keyboard navigation for custom components
   */
  handleMenuKeyboard(
    event: KeyboardEvent,
    items: HTMLElement[],
    currentIndex: number
  ): number {
    if (event.key === 'ArrowDown') {
      return Math.min(currentIndex + 1, items.length - 1)
    }
    if (event.key === 'ArrowUp') {
      return Math.max(currentIndex - 1, 0)
    }
    if (event.key === 'Home') {
      return 0
    }
    if (event.key === 'End') {
      return items.length - 1
    }
    return currentIndex
  },
}

/**
 * Color contrast checker
 */
export const contrastChecker = {
  /**
   * Calculate relative luminance
   */
  getLuminance(r: number, g: number, b: number): number {
    const [rs, gs, bs] = ([r, g, b].map((c) => {
      c = c / 255
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    }) as [number, number, number])
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
  },

  /**
   * Parse color string to RGB
   */
  parseColor(color: string): [number, number, number] | null {
    const ctx = document.createElement('canvas').getContext('2d')
    if (!ctx) return null

    ctx.fillStyle = color
    const computedColor = ctx.fillStyle
    const rgb = computedColor.match(/\d+/g)

    return rgb && rgb.length >= 3
      ? ([parseInt(rgb[0] ?? '0'), parseInt(rgb[1] ?? '0'), parseInt(rgb[2] ?? '0')] as [
          number,
          number,
          number
        ])
      : null
  },

  /**
   * Calculate contrast ratio
   */
  getContrastRatio(color1: string, color2: string): number {
    const rgb1 = this.parseColor(color1)
    const rgb2 = this.parseColor(color2)

    if (!rgb1 || !rgb2) return 0

    const lum1 = this.getLuminance(...rgb1)
    const lum2 = this.getLuminance(...rgb2)

    const lighter = Math.max(lum1, lum2)
    const darker = Math.min(lum1, lum2)

    return (lighter + 0.05) / (darker + 0.05)
  },

  /**
   * Check if contrast meets WCAG AA standard (4.5:1 for normal text)
   */
  meetsWCAG_AA(color1: string, color2: string): boolean {
    return this.getContrastRatio(color1, color2) >= 4.5
  },

  /**
   * Check if contrast meets WCAG AAA standard (7:1 for normal text)
   */
  meetsWCAG_AAA(color1: string, color2: string): boolean {
    return this.getContrastRatio(color1, color2) >= 7
  },
}

/**
 * Form validation accessibility
 */
export const formAccessibility = {
  /**
   * Create accessible error message
   */
  createErrorMessage(
    inputId: string,
    errorText: string
  ): { id: string; element: HTMLElement } {
    const errorElement = document.createElement('span')
    const errorId = `${inputId}-error`

    errorElement.id = errorId
    errorElement.className = 'form-error'
    errorElement.setAttribute('role', 'alert')
    errorElement.textContent = errorText

    return { id: errorId, element: errorElement }
  },

  /**
   * Create accessible helper text
   */
  createHelperText(inputId: string, helpText: string): { id: string; element: HTMLElement } {
    const helperElement = document.createElement('span')
    const helperId = `${inputId}-helper`

    helperElement.id = helperId
    helperElement.className = 'form-helper'
    helperElement.textContent = helpText

    return { id: helperId, element: helperElement }
  },

  /**
   * Link input to error/helper text
   */
  linkInputToDescription(
    input: HTMLElement,
    errorId?: string,
    helperId?: string
  ): void {
    const describedBy = [errorId, helperId].filter(Boolean).join(' ')
    if (describedBy) {
      input.setAttribute('aria-describedby', describedBy)
    }
  },

  /**
   * Mark required fields
   */
  markRequired(input: HTMLElement, required: boolean = true): void {
    input.setAttribute('aria-required', required.toString())
    if (required) {
      input.setAttribute('required', '')
    } else {
      input.removeAttribute('required')
    }
  },
}

/**
 * Testing utilities
 */
export const a11yTesting = {
  /**
   * Log accessibility issues
   */
  checkElement(element: HTMLElement): string[] {
    const issues: string[] = []

    // Check for alt text on images
    if (element.tagName === 'IMG' && !element.getAttribute('alt')) {
      issues.push('Image missing alt text')
    }

    // Check for label on form inputs
    if (
      ['INPUT', 'TEXTAREA', 'SELECT'].includes(element.tagName) &&
      !element.getAttribute('aria-label') &&
      !element.getAttribute('aria-labelledby')
    ) {
      issues.push('Form input missing label')
    }

    // Check for accessible name on button
    if (
      (element.tagName === 'BUTTON' || element.getAttribute('role') === 'button') &&
      !element.textContent &&
      !element.getAttribute('aria-label')
    ) {
      issues.push('Button missing accessible name')
    }

    // Check contrast ratio
    const style = window.getComputedStyle(element)
    const bgColor = style.backgroundColor
    const textColor = style.color

    if (bgColor && textColor) {
      const ratio = contrastChecker.getContrastRatio(bgColor, textColor)
      if (ratio < 4.5) {
        issues.push(`Low contrast ratio: ${ratio.toFixed(2)}:1`)
      }
    }

    return issues
  },

  /**
   * Check entire page for accessibility issues
   */
  checkPage(): Map<HTMLElement, string[]> {
    const issues = new Map<HTMLElement, string[]>()
    const elements = document.querySelectorAll('*')

    elements.forEach((el) => {
      const problems = this.checkElement(el as HTMLElement)
      if (problems.length > 0) {
        issues.set(el as HTMLElement, problems)
      }
    })

    return issues
  },

  /**
   * Log accessibility audit report
   */
  auditLog(): void {
    const issues = this.checkPage()
    if (issues.size === 0) {
      console.log('✓ No accessibility issues detected')
      return
    }

    console.error(`Found ${issues.size} accessibility issues:`)
    issues.forEach((problems, element) => {
      console.error(`  ${element.tagName}:`, problems)
    })
  },
}

/**
 * Skip to content helper
 */
export const skipToContent = {
  /**
   * Focus main content area
   */
  focusMainContent(): void {
    const main = document.querySelector('main')
    if (main) {
      main.tabIndex = -1
      main.focus()
      main.addEventListener('blur', () => {
        main.tabIndex = -1
      })
    }
  },
}

/**
 * Live region announcer
 */
export const announcer = {
  /**
   * Announce to screen readers
   */
  announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    const liveRegion = document.createElement('div')
    liveRegion.setAttribute('aria-live', priority)
    liveRegion.setAttribute('aria-atomic', 'true')
    liveRegion.className = 'sr-only'
    liveRegion.textContent = message

    document.body.appendChild(liveRegion)

    // Remove after a delay to allow screen reader to announce
    setTimeout(() => liveRegion.remove(), 1000)
  },

  /**
   * Create persistent announcer for dynamic updates
   */
  createAnnouncer(priority: 'polite' | 'assertive' = 'polite'): (message: string) => void {
    const liveRegion = document.createElement('div')
    liveRegion.setAttribute('aria-live', priority)
    liveRegion.setAttribute('aria-atomic', 'true')
    liveRegion.className = 'sr-only'
    document.body.appendChild(liveRegion)

    return (message: string) => {
      liveRegion.textContent = message
    }
  },
}
