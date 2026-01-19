import { clsx } from 'clsx'
import type { TabKey } from './types'

interface Props {
  value: TabKey
  onChange: (v: TabKey) => void
}

const tabs: { key: TabKey; label: string }[] = [
  { key: 'search', label: 'Search' },
  { key: 'chat', label: 'Chat AI' },
  { key: 'history', label: 'History' },
]

export function Tabs({ value, onChange }: Props) {
  return (
    <div className="flex border-b border-neutral-200 dark:border-neutral-800">
      {tabs.map((t) => (
        <button
          key={t.key}
          className={clsx(
            'px-4 py-2 text-sm -mb-px border-b-2 transition-colors',
            value === t.key
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white'
          )}
          onClick={() => onChange(t.key)}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}

