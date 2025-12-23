interface Item { id: string; text: string; ts: number }

const mock: Item[] = [
  { id: '1', text: 'error logs last hour', ts: Date.now() - 3600_000 },
  { id: '2', text: '/open settings', ts: Date.now() - 15_000 },
  { id: '3', text: 'slow search logs', ts: Date.now() - 5_000 },
]

export function History() {
  return (
    <div className="mt-3">
      <ul className="space-y-2">
        {mock.map((i) => (
          <li key={i.id} className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 cc-floating">
            <div className="text-sm font-medium">{i.text}</div>
            <div className="text-xs opacity-60">{new Date(i.ts).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

