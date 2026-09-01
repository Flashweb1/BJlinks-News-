import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { logger } from './logger'

describe('logger.error', () => {
  let spy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    spy = vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    spy.mockRestore()
  })

  it('redacts common secret keys from strings', () => {
    logger.error('boom', 'password=hunter2 and token=abc.def')
    expect(spy).toHaveBeenCalled()
    const msg = spy.mock.calls[0]?.[0] as string
    const args = spy.mock.calls[0]?.slice(1) as unknown[]
    const flat = JSON.stringify([msg, ...args])
    expect(flat).toContain('password=[REDACTED]')
    expect(flat).toContain('token=[REDACTED]')
    expect(flat).not.toContain('hunter2')
    expect(flat).not.toContain('abc.def')
  })

  it('redacts OpenAI-style sk- keys', () => {
    logger.error('boom', 'leaked sk-abcdefghijklmnopqrstuvwxyz')
    const msg = spy.mock.calls[0]?.[0] as string
    const args = spy.mock.calls[0]?.slice(1) as unknown[]
    const flat = JSON.stringify([msg, ...args])
    expect(flat).toContain('sk-[REDACTED]')
    expect(flat).not.toContain('sk-abcdefghijklmnopqrstuvwxyz')
  })

  it('redacts JWT-looking tokens', () => {
    const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    logger.error('boom', `bearer ${jwt}`)
    const msg = spy.mock.calls[0]?.[0] as string
    const args = spy.mock.calls[0]?.slice(1) as unknown[]
    const flat = JSON.stringify([msg, ...args])
    expect(flat).toContain('jwt.[REDACTED]')
  })

  it('does not throw on non-string values', () => {
    expect(() => logger.error('boom', new Error('oops'))).not.toThrow()
    expect(() => logger.error('boom', { token: 'plain-object' })).not.toThrow()
  })
})
