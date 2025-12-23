import { useMemo, useState } from 'react'
import { detectInputMode } from './detectInputMode'
import type { InputMode } from './types'

interface Props {
  onSubmit: (q: string, mode: InputMode) => void
}

export function InputBar({ onSubmit }: Props) {
  const [q, setQ] = useState('')
  const mode = useMemo(() => detectInputMode(q), [q])

  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 cc-floating">
      <span className="inline-flex w-6 h-6 items-center justify-center text-neutral-500">🔎</span>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSubmit(q, mode)
        }}
        className="flex-1 bg-transparent outline-none text-sm placeholder-neutral-400"
        placeholder={
          mode === 'command'
            ? '输入 / 开始命令，例如 /open, /optimize'
            : mode === 'ai'
            ? '提出你的问题，AI 会分析与推荐下一步'
            : '搜索关键字，例如 error logs last hour'
        }
      />
      <div className="text-xs px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
        {mode.toUpperCase()}
      </div>
      <button
        className="px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
        onClick={() => onSubmit(q, mode)}
      >
        Go
      </button>
    </div>
  )
}

