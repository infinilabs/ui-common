import type { QuickAction } from './types'

const defaultActions: QuickAction[] = [
  { id: 'optimize-query', label: 'Query Slow? Ask AI to optimize', hint: '优化慢查询' },
  { id: 'find-errors', label: 'Find logs with errors', hint: '筛选错误日志' },
  { id: 'compare-periods', label: 'Compare 2 time periods', hint: '对比两个时间段' },
  { id: 'explain-code', label: 'Explain this error code', hint: '解释错误码' }
]

interface Props {
  onRun: (id: string) => void
}

export function QuickActions({ onRun }: Props) {
  return (
    <div className="mt-3 grid grid-cols-2 gap-2">
      {defaultActions.map((a) => (
        <button
          key={a.id}
          className="text-left px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 cc-floating"
          onClick={() => onRun(a.id)}
        >
          <div className="text-sm font-medium">{a.label}</div>
          {a.hint && <div className="text-xs opacity-70">{a.hint}</div>}
        </button>
      ))}
    </div>
  )
}

