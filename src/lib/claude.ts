// Calls the Anthropic API directly from the browser using VITE_ANTHROPIC_API_KEY.
// Fine for prototyping — for production, proxy through a backend so the key stays server-side.

const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY as string | undefined

export interface ClaudeMessage {
  role: 'user' | 'assistant'
  content: string
}

export async function streamChat(
  messages: ClaudeMessage[],
  system: string,
  onChunk: (text: string) => void,
  onDone: () => void,
  onError: (err: Error) => void,
): Promise<void> {
  if (!API_KEY) {
    onError(new Error('Missing VITE_ANTHROPIC_API_KEY — add it to .env.local'))
    return
  }

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1024,
        system,
        messages,
        stream: true,
      }),
    })

    if (!res.ok) {
      const body = await res.json().catch(() => ({})) as { error?: { message?: string } }
      throw new Error(body.error?.message ?? `HTTP ${res.status}`)
    }

    const reader = res.body?.getReader()
    if (!reader) throw new Error('No response body')

    const decoder = new TextDecoder()

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const lines = decoder.decode(value, { stream: true }).split('\n')
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue
        const data = line.slice(6).trim()
        if (!data || data === '[DONE]') continue
        try {
          const parsed = JSON.parse(data) as {
            type: string
            delta?: { type: string; text: string }
          }
          if (parsed.type === 'content_block_delta' && parsed.delta?.type === 'text_delta') {
            onChunk(parsed.delta.text)
          }
        } catch {
          // ignore malformed SSE lines
        }
      }
    }

    onDone()
  } catch (err) {
    onError(err instanceof Error ? err : new Error(String(err)))
  }
}
