import { useEffect, useState } from 'react'
import { CommandCenter } from './components/CommandCenter'
import { Launcher } from './components/Launcher'

export default function App() {
  const [open, setOpen] = useState(false)

  // 统一快捷键唤起：⌘+K / Ctrl+K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toLowerCase().includes('mac')
      const hotkey = (isMac && e.metaKey && e.key.toLowerCase() === 'k') || (!isMac && e.ctrlKey && e.key.toLowerCase() === 'k')
      if (hotkey) {
        e.preventDefault()
        setOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      <div className="p-6 space-y-3">
        <h1 className="text-2xl font-semibold">Infinilabs Command Center</h1>
        <p className="text-sm opacity-80">支持 ⌘+K / Ctrl+K 快捷键，也可点击下方输入框打开</p>
        <Launcher onOpen={() => setOpen(true)} />
      </div>
      <CommandCenter open={open} onOpenChange={setOpen} />
    </div>
  )
}
