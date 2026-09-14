/**
 * Bjlinks News — AI Service
 *
 * Primary:  OpenRouter (free models — no billing needed)
 * Fallback: Google Gemini API (free tier) → OpenAI-compatible API
 *
 * Priority order:
 *   1. OpenRouter  (VITE_OPENROUTER_API_KEY) — free :free models
 *   2. Gemini Developer API (VITE_GEMINI_API_KEY) — free, no billing needed
 *   3. OpenAI-compatible API (VITE_AI_API_KEY)    — arbitrary provider
 *
 * Falls back gracefully if no key is configured.
 */

// ── OpenRouter (primary, free models) ─────────────────────────────────────────
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || ''
const OPENROUTER_BASE_URL = import.meta.env.VITE_OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1'
// Default to a strong free model; override with any model id (use ":free" suffix for free tiers)
const OPENROUTER_MODEL = import.meta.env.VITE_OPENROUTER_MODEL || 'nex-agi/nex-n2.5-mini:free'

// ── Gemini (fallback, free tier) ──────────────────────────────────────────────
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || ''
// gemini-2.0-flash-lite is the free-tier model (no billing required)
const GEMINI_MODEL = 'gemini-2.0-flash-lite'
const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta'

// ── OpenAI-compatible fallback ────────────────────────────────────────────────
const OPENAI_API_KEY = import.meta.env.VITE_AI_API_KEY || ''
const OPENAI_BASE_URL = import.meta.env.VITE_AI_BASE_URL || 'https://api.openai.com/v1'
// gpt-4o-mini is the cheapest OpenAI model; swap for any free provider model
const OPENAI_MODEL = import.meta.env.VITE_AI_MODEL || 'gpt-4o-mini'

export const isAIEnabled = () => Boolean(OPENROUTER_API_KEY || GEMINI_API_KEY || OPENAI_API_KEY)

interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

// ── OpenRouter call (OpenAI-compatible) ──────────────────────────────────────
async function openrouterCompletion(
  messages: ChatMessage[],
  options: { temperature?: number; max_tokens?: number } = {}
): Promise<string> {
  const res = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      'HTTP-Referer': 'https://bjlinks-news.vercel.app',
      'X-Title': 'Bjlinks News',
    },
    body: JSON.stringify({
      model: OPENROUTER_MODEL,
      messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.max_tokens ?? 512,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`OpenRouter API error ${res.status}: ${err}`)
  }

  const data = await res.json() as {
    choices: { message: { content: string } }[]
  }
  return data.choices[0]?.message?.content?.trim() ?? ''
}

// ── Gemini call ───────────────────────────────────────────────────────────────
async function geminiCompletion(
  messages: ChatMessage[],
  options: { temperature?: number; max_tokens?: number } = {}
): Promise<string> {
  // Gemini uses a different message format — merge system + user into contents
  const systemMsg = messages.find(m => m.role === 'system')
  const userMsgs = messages.filter(m => m.role !== 'system')

  const contents = userMsgs.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }))

  const body: Record<string, unknown> = {
    contents,
    generationConfig: {
      temperature: options.temperature ?? 0.7,
      maxOutputTokens: options.max_tokens ?? 512,
    },
  }

  if (systemMsg) {
    body.systemInstruction = { parts: [{ text: systemMsg.content }] }
  }

  const url = `${GEMINI_BASE}/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Gemini API error ${res.status}: ${err}`)
  }

  const data = await res.json() as {
    candidates?: { content?: { parts?: { text?: string }[] } }[]
  }
  return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? ''
}

// ── OpenAI-compatible call ────────────────────────────────────────────────────
async function openaiCompletion(
  messages: ChatMessage[],
  options: { temperature?: number; max_tokens?: number } = {}
): Promise<string> {
  const res = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.max_tokens ?? 512,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`OpenAI API error ${res.status}: ${err}`)
  }

  const data = await res.json() as {
    choices: { message: { content: string } }[]
  }
  return data.choices[0]?.message?.content?.trim() ?? ''
}

// ── Unified dispatcher — OpenRouter → Gemini → OpenAI ──────────────────────
async function chatCompletion(
  messages: ChatMessage[],
  options: { temperature?: number; max_tokens?: number } = {}
): Promise<string> {
  if (!isAIEnabled()) {
    throw new Error('No AI API key configured. Add VITE_OPENROUTER_API_KEY to your .env file.')
  }

  if (OPENROUTER_API_KEY) {
    try {
      return await openrouterCompletion(messages, options)
    } catch (err) {
      if (!GEMINI_API_KEY && !OPENAI_API_KEY) throw err
      console.warn('[ai] OpenRouter failed, falling back:', err)
    }
  }

  if (GEMINI_API_KEY) {
    try {
      return await geminiCompletion(messages, options)
    } catch (err) {
      // If Gemini fails and OpenAI key exists, fall through to OpenAI
      if (!OPENAI_API_KEY) throw err
      console.warn('[ai] Gemini failed, falling back to OpenAI:', err)
    }
  }

  return openaiCompletion(messages, options)
}

// ─── Article Editor Helpers ───────────────────────────────────────────────────

/** Generate a compelling subtitle (dek) from headline + body */
export async function generateDek(title: string, body: string): Promise<string> {
  return chatCompletion([
    {
      role: 'system',
      content:
        'You are an expert Nigerian news editor. Write a single compelling subtitle (dek) for the article. ' +
        'It must be 1–2 sentences, max 160 characters, journalistic in tone, and capture the key angle. ' +
        'Return ONLY the dek text, no quotes, no labels.',
    },
    {
      role: 'user',
      content: `Headline: ${title}\n\nArticle body:\n${body.slice(0, 2000)}`,
    },
  ], { temperature: 0.6, max_tokens: 100 })
}

/** Suggest up to 8 relevant tags from article content */
export async function suggestTags(title: string, body: string, category: string): Promise<string[]> {
  const raw = await chatCompletion([
    {
      role: 'system',
      content:
        'You are a Nigerian news tagging expert. Return a JSON array of 5–8 short, relevant tags for the article. ' +
        'Tags should be title-cased, max 3 words each, specific and searchable. ' +
        'Return ONLY valid JSON array, e.g. ["Delta State","Governor","Infrastructure"]',
    },
    {
      role: 'user',
      content: `Category: ${category}\nHeadline: ${title}\n\nBody:\n${body.slice(0, 1500)}`,
    },
  ], { temperature: 0.4, max_tokens: 120 })

  try {
    const match = raw.match(/\[[\s\S]*\]/)
    if (!match) return []
    const parsed = JSON.parse(match[0]) as unknown[]
    return parsed
      .filter((t): t is string => typeof t === 'string')
      .slice(0, 8)
  } catch {
    return []
  }
}

/** Generate an SEO meta description (max 160 chars) */
export async function generateSEODescription(title: string, body: string): Promise<string> {
  return chatCompletion([
    {
      role: 'system',
      content:
        'You are an SEO expert for a Nigerian news website. Write a Google meta description for this article. ' +
        'Must be under 155 characters, include the key topic, and encourage clicks. ' +
        'Return ONLY the description text, no quotes.',
    },
    {
      role: 'user',
      content: `Headline: ${title}\n\nBody:\n${body.slice(0, 1500)}`,
    },
  ], { temperature: 0.5, max_tokens: 80 })
}

/** Improve/polish a paragraph of body text */
export async function improveText(text: string): Promise<string> {
  return chatCompletion([
    {
      role: 'system',
      content:
        'You are a senior Nigerian news editor. Improve the clarity, flow, and journalistic quality of the text. ' +
        'Keep the same facts and meaning. Do not add new information. ' +
        'Return ONLY the improved text, no explanations.',
    },
    { role: 'user', content: text },
  ], { temperature: 0.5, max_tokens: 600 })
}

// ─── Comment Moderation ───────────────────────────────────────────────────────

export type ModerationResult = {
  verdict: 'approve' | 'reject' | 'review'
  reason: string
  toxicity: 'none' | 'low' | 'medium' | 'high'
}

/** Moderate a comment — returns verdict, reason, and toxicity level */
export async function moderateComment(commentBody: string, articleTitle: string): Promise<ModerationResult> {
  const raw = await chatCompletion([
    {
      role: 'system',
      content:
        'You are a content moderator for a Nigerian news website. Analyze the comment and return a JSON object with:\n' +
        '- verdict: "approve" (safe, constructive), "reject" (spam, hate, explicit, dangerous), or "review" (borderline)\n' +
        '- reason: one short sentence explaining your decision\n' +
        '- toxicity: "none", "low", "medium", or "high"\n' +
        'Return ONLY valid JSON, no markdown.',
    },
    {
      role: 'user',
      content: `Article: "${articleTitle}"\n\nComment: "${commentBody}"`,
    },
  ], { temperature: 0.2, max_tokens: 120 })

  try {
    const match = raw.match(/\{[\s\S]*\}/)
    if (!match) throw new Error('No JSON')
    const parsed = JSON.parse(match[0]) as Partial<ModerationResult>
    return {
      verdict: parsed.verdict ?? 'review',
      reason: parsed.reason ?? 'Could not determine.',
      toxicity: parsed.toxicity ?? 'none',
    }
  } catch {
    return { verdict: 'review', reason: 'AI moderation unavailable.', toxicity: 'none' }
  }
}

// ─── Article Summarizer (Reader-facing) ───────────────────────────────────────

/** Generate a 3-bullet executive summary for readers */
export async function summarizeArticle(title: string, body: string[]): Promise<string[]> {
  const raw = await chatCompletion([
    {
      role: 'system',
      content:
        'You are a Nigerian news summarizer. Create exactly 3 concise bullet points summarizing the key facts of this article. ' +
        'Each bullet must be 1 sentence, factual, and under 120 characters. ' +
        'Return ONLY a JSON array of 3 strings, e.g. ["Point one.", "Point two.", "Point three."]',
    },
    {
      role: 'user',
      content: `Headline: ${title}\n\nBody:\n${body.join('\n\n').slice(0, 3000)}`,
    },
  ], { temperature: 0.3, max_tokens: 200 })

  try {
    const match = raw.match(/\[[\s\S]*\]/)
    if (!match) return []
    const parsed = JSON.parse(match[0]) as unknown[]
    return parsed
      .filter((s): s is string => typeof s === 'string')
      .slice(0, 3)
  } catch {
    return []
  }
}
