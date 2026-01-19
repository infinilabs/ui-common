interface Props {
  onOpen: () => void
}

export function Launcher({ onOpen }: Props) {
  return (
    <button
      className="w-full max-w-xl mx-auto flex items-center gap-2 px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 cc-floating"
      onClick={onOpen}
      aria-label="打开命令中心"
    >
      <span className="inline-flex w-6 h-6 items-center justify-center text-neutral-500">⌘K</span>
      <span className="text-sm text-neutral-500">搜索 / 询问 AI / 输入命令…</span>
    </button>
  )
}

