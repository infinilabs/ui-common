import { useState } from "react"
import { InputWithOptions } from "@/components/index"
import type { Mode, ScopeItem, LeftDataItem } from "@/components/index"

export default function InputWithOptionsFeature() {
  // 右侧模式（受控示例）
  const [mode, setMode] = useState<Mode>("search")
  // 左侧数据（受控示例）
  const [leftData, setLeftData] = useState<LeftDataItem[]>([
    { type: "chip", id: "deepThink", label: "深度思考", iconName: "sparkles", selected: false },
    { type: "chip", id: "search", label: "搜索", iconName: "search", selected: true },
    { type: "dropdown", id: "mcp", label: "MCP", iconName: "bot", selected: false },
  ])
  // scopes（受控示例）
  const [scopes, setScopes] = useState<ScopeItem[]>([
    { id: "all", name: "全部范围", enabled: true },
    { id: "gitlab", name: "Gitlab CI Webhook", enabled: true },
    { id: "server", name: "Coco Server 文档", enabled: true },
    { id: "app", name: "Coco App 文档", enabled: true },
    { id: "hn", name: "Hacker News", enabled: false },
  ])

  return (
    <InputWithOptions
      // 上方输入框反馈
      placeholder="请输入内容…"
      onSend={(payload) => {
        console.log("发送", payload)
      }}
      // 右侧模式（受控示例）
      mode={mode}
      onModeChange={setMode}
      // 左侧数据（受控示例）
      leftData={leftData}
      onLeftItemToggle={(id, selected) => {
        setLeftData((prev) => prev.map((it) => (it.id === id ? { ...it, selected } : it)))
      }}
      // 下拉 scopes（受控示例）
      scopes={scopes}
      onToggleScope={(id, enabled) => {
        setScopes((prev) => prev.map((s) => (s.id === id ? { ...s, enabled } : s)))
      }}
      // 统一事件上报
      onUserAction={(e) => {
        console.log("用户事件", e)
      }}
    />
  )
}
