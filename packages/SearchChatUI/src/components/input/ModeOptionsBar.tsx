import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { ChevronDown, Sparkles, Search as SearchIcon, Bot } from "lucide-react"
import { useI18n } from "@/i18n/useI18n"
import ModeSwitch from "@/components/ui/mode-switch"
import ScopesMenu from "@/components/input/ScopesMenu"

export type Mode = "search" | "chat"

export type ScopeItem = {
  id: string
  name: string
  enabled: boolean
}

export type LeftDataItem =
  | { type: "chip"; id: string; label?: string; labelKey?: string; iconName?: "sparkles" | "search" | "bot"; selected?: boolean }
  | { type: "dropdown"; id: string; label?: string; labelKey?: string; iconName?: "sparkles" | "search" | "bot"; selected?: boolean }

export type ModeOptionsBarProps = {
  className?: string
  mode: Mode
  onModeChange: (next: Mode) => void
  scopes: ScopeItem[]
  onToggleScope: (id: string, enabled: boolean) => void
  // 搜索与加载
  scopesQuery?: string
  onScopesQueryChange?: (q: string) => void
  scopesHasMore?: boolean
  onLoadMoreScopes?: () => void
  scopesPagination?: { page: number; pageSize: number; total: number; onPageChange: (p: number) => void }
  // 左侧基于数据的渲染：传入一个 JSON 数组逐项渲染
  leftData?: LeftDataItem[]
  // 左侧项选中状态变化回调（由父层维护数据状态）
  onLeftItemToggle?: (id: string, selected: boolean) => void
  // 统一事件回调：外部可监听用户操作
  onUserAction?: (event:
    | { type: "left_item"; id: string; value: boolean }
    | { type: "scope"; id: string; value: boolean }
    | { type: "mode"; value: Mode }
    | { type: "dropdown_open"; id: string }
  ) => void
}

// Small presentational components declared at module scope to avoid recreating during render
const Capsule = ({ active, children }: { active: boolean; children: React.ReactNode }) => (
  <div
    className={cn(
      "inline-flex h-7 items-center gap-1 rounded-full px-2 transition-colors border whitespace-nowrap leading-none",
      active
        ? "border-primary/30 bg-primary/10 text-primary shadow-sm"
        : "border-transparent bg-transparent text-muted-foreground group-hover:bg-muted/40 group-hover:text-foreground group-hover:shadow-sm"
    )}
  >
    {children}
  </div>
)

export default function ModeOptionsBar({
  className,
  mode,
  onModeChange,
  scopes,
  onToggleScope,
  scopesQuery,
  onScopesQueryChange,
  scopesHasMore,
  onLoadMoreScopes,
  scopesPagination,
  leftData,
  onLeftItemToggle,
  onUserAction,
}: ModeOptionsBarProps) {
  const { t } = useI18n()

  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    sparkles: Sparkles,
    search: SearchIcon,
    bot: Bot,
  }

  return (
    <div className={cn("mt-2 flex items-center justify-between gap-3", className)}>
      {/* Left: feature chips */}
      <div className="flex items-center gap-1">
        {(leftData ?? []).map((item, idx) => {
          const Icon = item.iconName ? iconMap[item.iconName] : undefined
          if (item.type === "chip") {
            const active = !!item.selected
            const label = item.labelKey ? t(item.labelKey) : item.label
            return (
              <button
                key={`chip-${item.id}-${idx}`}
                type="button"
                onClick={() => {
                  const next = !active
                  onLeftItemToggle?.(item.id, next)
                  onUserAction?.({ type: "left_item", id: item.id, value: next })
                }}
                className="group"
                aria-pressed={active}
              >
                <Capsule active={active}>
                  {Icon ? <Icon className="size-4" /> : null}
                  {active && label ? <span className="ml-1 text-xs sm:text-sm">{label}</span> : null}
                </Capsule>
              </button>
            )
          }
          // dropdown chip
          const active = !!item.selected
          const label = item.labelKey ? t(item.labelKey) : item.label
          return (
            <DropdownMenu key={`dropdown-${item.id}-${idx}`}>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="group"
                  aria-pressed={active}
                  onClick={() => {
                    const next = !active
                    onLeftItemToggle?.(item.id, next)
                    onUserAction?.({ type: "left_item", id: item.id, value: next })
                    onUserAction?.({ type: "dropdown_open", id: item.id })
                  }}
                >
                  <Capsule active={active}>
                    {Icon ? <Icon className="size-4" /> : null}
                    {active && label ? <span className="ml-1 text-xs sm:text-sm">{label}</span> : null}
                    <ChevronDown className="ml-1 size-4 opacity-70" />
                  </Capsule>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-56">
                <ScopesMenu
                  scopes={scopes}
                  onToggleScope={(id, enabled) => {
                    onToggleScope(id, enabled)
                    onUserAction?.({ type: "scope", id, value: enabled })
                  }}
                  query={scopesQuery}
                  onQueryChange={onScopesQueryChange}
                  hasMore={scopesHasMore}
                  onLoadMore={onLoadMoreScopes}
                  pagination={scopesPagination}
                />
              </DropdownMenuContent>
            </DropdownMenu>
          )
        })}
      </div>

      {/* Right: mode segmented */}
      <div className="flex items-center gap-2">
        <ModeSwitch
          checked={mode === "chat"}
          onCheckedChange={(v) => {
            const next = v ? "chat" : "search"
            onModeChange(next)
            onUserAction?.({ type: "mode", value: next })
          }}
        />
      </div>
    </div>
  )
}
