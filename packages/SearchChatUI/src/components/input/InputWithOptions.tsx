import { useState } from "react"
import CustomInput from "@/components/input/custom-input"
import ModeOptionsBar, { type Mode, type ScopeItem, type LeftDataItem } from "@/components/input/ModeOptionsBar"
import { useI18n } from "@/i18n/useI18n"

export type InputWithOptionsProps = {
  // 输入框配置与反馈
  placeholder?: string
  onSend?: (payload: { text: string; images: File[] }) => void

  // 右侧模式（可控/不可控）
  mode?: Mode
  onModeChange?: (next: Mode) => void
  defaultMode?: Mode

  // 左侧数据（可控/不可控）
  leftData?: LeftDataItem[]
  onLeftItemToggle?: (id: string, selected: boolean) => void
  defaultLeftData?: LeftDataItem[]

  // 下拉 scopes（可控/不可控）
  scopes?: ScopeItem[]
  onToggleScope?: (id: string, enabled: boolean) => void
  defaultScopes?: ScopeItem[]

  // 统一用户事件上报
  onUserAction?: (event:
    | { type: "left_item"; id: string; value: boolean }
    | { type: "scope"; id: string; value: boolean }
    | { type: "mode"; value: Mode }
    | { type: "dropdown_open"; id: string }
  ) => void
}

export default function InputWithOptions({
  placeholder,
  onSend,
  mode: modeProp,
  onModeChange,
  defaultMode = "search",
  leftData: leftDataProp,
  onLeftItemToggle,
  defaultLeftData,
  scopes: scopesProp,
  onToggleScope,
  defaultScopes,
  onUserAction,
}: InputWithOptionsProps) {
  const { t } = useI18n()

  // 右侧模式：受控或非受控
  const [modeInner, setModeInner] = useState<Mode>(defaultMode)
  const mode = modeProp ?? modeInner
  const setMode = onModeChange ?? setModeInner

  // 左侧数组：受控或非受控
  const [leftDataInner, setLeftDataInner] = useState<LeftDataItem[]>(
    defaultLeftData ?? [
      { type: "chip", id: "deepThink", label: t("options.deepThink"), iconName: "sparkles", selected: false },
      { type: "chip", id: "search", label: t("options.search"), iconName: "search", selected: true },
      { type: "dropdown", id: "mcp", label: t("options.mcp"), iconName: "bot", selected: false },
    ]
  )
  const leftData = leftDataProp ?? leftDataInner
  const onLeftToggle = onLeftItemToggle ?? ((id: string, selected: boolean) => {
    setLeftDataInner((prev) => prev.map((it) => (it.id === id ? { ...it, selected } : it)))
  })

  // scopes：受控或非受控
  // 模拟较多数据 + 搜索 + 滚动加载
  const initialAll: ScopeItem[] = defaultScopes ?? [
    { id: "all", name: t("scope.all"), enabled: true },
    { id: "gitlab", name: "Gitlab CI Webhook", enabled: true },
    { id: "server", name: "Coco Server 文档", enabled: true },
    { id: "app", name: "Coco App 文档", enabled: true },
    { id: "hn", name: "Hacker News", enabled: false },
    // 追加一些示例条目
    ...Array.from({ length: 40 }).map((_, i) => ({ id: `extra-${i}`, name: `示例源 ${i + 1}`, enabled: i % 3 === 0 }))
  ]
  const [allScopes, setAllScopes] = useState<ScopeItem[]>(initialAll)
  const [query, setQuery] = useState("")
  const PAGE_SIZE = 10
  const [page, setPage] = useState(1)

  const filtered = allScopes.filter((s) =>
    query ? s.name.toLowerCase().includes(query.toLowerCase()) : true
  )
  const scopesDerived = filtered.slice(0, page * PAGE_SIZE)
  const scopes = scopesProp ?? scopesDerived
  const toggleScope = onToggleScope ?? ((id: string, enabled: boolean) => {
    // 修改 allScopes，以便筛选与翻页一致
    setAllScopes((prev) => prev.map((s) => (s.id === id ? { ...s, enabled } : s)))
  })

  const hasMore = page * PAGE_SIZE < filtered.length
  const loadMore = () => {
    if (!hasMore) return
    setPage((p) => p + 1)
  }
  const onQueryChange = (q: string) => {
    setQuery(q)
    setPage(1)
  }

  return (
    <div>
      <CustomInput placeholder={placeholder} onSend={onSend} />
      <ModeOptionsBar
        mode={mode}
        onModeChange={setMode}
        scopes={scopes}
        onToggleScope={toggleScope}
        scopesQuery={query}
        onScopesQueryChange={onQueryChange}
        scopesHasMore={hasMore}
        onLoadMoreScopes={loadMore}
        leftData={leftData}
        onLeftItemToggle={onLeftToggle}
        onUserAction={onUserAction}
      />
    </div>
  )
}
