import type { SearchResultItem } from './types'

interface Props {
  results: SearchResultItem[]
}

export function SearchPreview({ results }: Props) {
  return (
    <div className="mt-4">
      <div className="text-xs uppercase tracking-wide opacity-60">Top results</div>
      <ul className="mt-2 space-y-2">
        {results.map((r) => (
          <li key={r.id} className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 cc-floating">
            <div className="text-sm font-medium">{r.title}</div>
            {r.snippet && <div className="text-xs opacity-70 mt-1">{r.snippet}</div>}
          </li>
        ))}
      </ul>
      <div className="mt-2">
        <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">查看全部</button>
      </div>
    </div>
  )
}

