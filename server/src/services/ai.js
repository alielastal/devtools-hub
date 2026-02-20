import OpenAI from 'openai'

let client = null

function getClient() {
  if (!client) {
    const key = process.env.OPENROUTER_API_KEY
    if (!key) {
      throw new Error('OPENROUTER_API_KEY is not configured. Get a free key at openrouter.ai')
    }
    client = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: key,
    })
  }
  return client
}

function parseError(err) {
  const msg = err.message || ''
  if (msg.includes('429') || msg.includes('rate') || msg.includes('quota')) {
    return { status: 429, message: 'Rate limit reached. Please wait a moment and try again.' }
  }
  if (msg.includes('401') || msg.includes('403')) {
    return { status: 403, message: 'API key is invalid.' }
  }
  console.error('AI raw error:', msg)
  return { status: 500, message: 'AI service error. Please try again.' }
}

async function withRetry(fn, retries = 2) {
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn()
    } catch (err) {
      const parsed = parseError(err)
      if (parsed.status === 429 && i < retries) {
        await new Promise((r) => setTimeout(r, (i + 1) * 3000))
        continue
      }
      const error = new Error(parsed.message)
      error.status = parsed.status
      throw error
    }
  }
}

const MODEL = 'arcee-ai/trinity-large-preview:free'

export async function askAI(systemPrompt, userMessage) {
  return withRetry(async () => {
    const res = await getClient().chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.3,
      max_tokens: 3000,
    })
    return res.choices[0].message.content
  })
}

export async function streamAI(systemPrompt, userMessage, onChunk) {
  return withRetry(async () => {
    const stream = await getClient().chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.3,
      max_tokens: 3000,
      stream: true,
    })

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content
      if (content) onChunk(content)
    }
  })
}
