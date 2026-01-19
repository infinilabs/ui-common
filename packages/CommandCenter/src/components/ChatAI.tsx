import { useState } from 'react'

interface Msg { role: 'user' | 'assistant'; content: string }

export function ChatAI() {
  const [messages, setMessages] = useState<Msg[]>([])
  const [q, setQ] = useState('')

  const send = () => {
    if (!q.trim()) return
    const userMsg: Msg = { role: 'user', content: q.trim() }
    const assistantMsg: Msg = {
      role: 'assistant',
      content: '（示例）我已分析你的问题，建议：Analyze slow query，Visualize latency distribution，Open documentation for search optimization'
    }
    setMessages((m) => [...m, userMsg, assistantMsg])
    setQ('')
  }

  return (
    <div className="mt-3">
      <div className="space-y-2 max-h-60 overflow-auto border border-neutral-200 dark:border-neutral-800 rounded-lg p-3">
        {messages.length === 0 && (
          <div className="text-sm opacity-70">提出你的问题，AI 将给出分析与下一步建议。</div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'text-right' : ''}>
            <div className={
              'inline-block px-3 py-2 rounded-xl ' +
              (m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-neutral-100 dark:bg-neutral-800')
            }>
              {m.content}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          className="flex-1 px-3 py-2 rounded border border-neutral-200 dark:border-neutral-800 bg-transparent"
          placeholder="例如：slow search logs"
        />
        <button className="px-3 py-2 rounded bg-blue-600 text-white" onClick={send}>发送</button>
      </div>
    </div>
  )
}

