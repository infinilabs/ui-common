import { useEffect, useRef } from "react"
import { DropdownMenuCheckboxItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { useI18n } from "@/i18n/useI18n"
import { cn } from "@/lib/utils"
import type { ScopeItem } from "@/components/input/ModeOptionsBar"

type Pagination = {
  page: number
  pageSize: number
  total: number
  onPageChange: (page: number) => void
}

type ScopesMenuProps = {
  className?: string
  scopes: ScopeItem[]
  onToggleScope: (id: string, enabled: boolean) => void
  // 搜索
  query?: string
  onQueryChange?: (q: string) => void
  // 滚动加载
  hasMore?: boolean
  onLoadMore?: () => void
  // 翻页（与滚动二选一，若同时提供，则优先滚动加载）
  pagination?: Pagination
}

export default function ScopesMenu({
  className,
  scopes,
  onToggleScope,
  query,
  onQueryChange,
  hasMore,
  onLoadMore,
  pagination,
}: ScopesMenuProps) {
  const { t } = useI18n()
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  // 简单的滚动加载：当 sentinel 进入可视区域时触发 onLoadMore
  useEffect(() => {
    if (!onLoadMore || !hasMore) return
    const el = sentinelRef.current
    if (!el) return
    const observer = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          onLoadMore()
        }
      }
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [onLoadMore, hasMore])

  const totalPages = pagination ? Math.max(1, Math.ceil(pagination.total / Math.max(1, pagination.pageSize))) : 1

  return (
    <div className={cn("w-full", className)}>
      <DropdownMenuLabel>{t("options.scopes")}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <div className="px-2 pb-2">
        <input
          type="text"
          value={query ?? ""}
          onChange={(e) => onQueryChange?.(e.target.value)}
          placeholder={t("scope.searchPlaceholder")}
          className={cn(
            "w-full rounded-md border px-2 py-1 text-sm",
            "bg-background focus:outline-none focus:ring-1 focus:ring-primary/40"
          )}
        />
      </div>

      <div className="max-h-64 overflow-y-auto">
        {scopes.map((s) => (
          <DropdownMenuCheckboxItem
            key={s.id}
            checked={s.enabled}
            onCheckedChange={(v) => onToggleScope(s.id, Boolean(v))}
          >
            {s.name}
          </DropdownMenuCheckboxItem>
        ))}
        {onLoadMore && hasMore ? (
          <div ref={sentinelRef} className="py-2 text-center text-xs text-muted-foreground">{t("action.loadMore")}</div>
        ) : null}
      </div>

      {onLoadMore ? null : pagination ? (
        <div className="flex items-center justify-between px-2 py-2 text-xs text-muted-foreground">
          <span>
            {t("pagination.page")} {pagination.page} / {totalPages}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded border px-2 py-1"
              onClick={() => pagination.onPageChange(Math.max(1, pagination.page - 1))}
              disabled={pagination.page <= 1}
            >
              {t("pagination.prev")}
            </button>
            <button
              type="button"
              className="rounded border px-2 py-1"
              onClick={() => pagination.onPageChange(Math.min(totalPages, pagination.page + 1))}
              disabled={pagination.page >= totalPages}
            >
              {t("pagination.next")}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
