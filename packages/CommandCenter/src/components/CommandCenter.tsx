import { useMemo, useState } from 'react'
import { SearchChatProviders, InputWithOptions } from '@infinilabs/search-chat-ui'
import type { Mode, ScopeItem, LeftDataItem } from '@infinilabs/search-chat-ui'

interface Props {
  open: boolean
  onOpenChange: (v: boolean) => void
}

export function CommandCenter({ open, onOpenChange }: Props) {
  const [mode, setMode] = useState<Mode>('search')
  const [leftData, setLeftData] = useState<LeftDataItem[]>([
    { type: 'chip', id: 'deepThink', label: '深度思考', iconName: 'sparkles', selected: false },
    { type: 'chip', id: 'search', label: '搜索', iconName: 'search', selected: true },
    { type: 'dropdown', id: 'mcp', label: 'MCP', iconName: 'bot', selected: false },
  ])
  const [scopes, setScopes] = useState<ScopeItem[]>([
    { id: 'all', name: '全部范围', enabled: true },
    { id: 'gitlab', name: 'Gitlab CI Webhook', enabled: true },
    { id: 'server', name: 'Coco Server 文档', enabled: true },
    { id: 'app', name: 'Coco App 文档', enabled: true },
    { id: 'hn', name: 'Hacker News', enabled: false },
  ])

  const overlayStyle = useMemo(
    () => ({ display: open ? 'flex' : 'none' }),
    [open]
  )

  return (
    <div
      className="fixed inset-0 items-center justify-center cc-backdrop z-50"
      style={overlayStyle}
      onClick={() => onOpenChange(false)}
    >
      <div
        className="w-[880px] max-w-[95vw] max-h-[85vh] cc-card shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4">
          <SearchChatProviders themeMode="system" themeColor="blue" locale="zh-CN">
            <InputWithOptions
              placeholder="搜索 / 询问 AI / 输入命令…"
              onSend={(payload) => {
                console.log('发送', payload)
                onOpenChange(false)
              }}
              mode={mode}
              onModeChange={setMode}
              leftData={leftData}
              onLeftItemToggle={(id, selected) => {
                setLeftData((prev) => prev.map((it) => (it.id === id ? { ...it, selected } : it)))
              }}
              scopes={scopes}
              onToggleScope={(id, enabled) => {
                setScopes((prev) => prev.map((it) => (it.id === id ? { ...it, enabled } : it)))
              }}
              onUserAction={(e) => console.log('用户事件', e)}
            />
          </SearchChatProviders>
        </div>
      </div>
    </div>
  )
}
