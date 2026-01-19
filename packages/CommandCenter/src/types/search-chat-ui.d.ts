declare module "@infinilabs/search-chat-ui" {
  import type { ComponentType, ReactNode } from "react"

  // Shared types
  export type Mode = "search" | "chat"
  export type ScopeItem = { id: string; name: string; enabled: boolean }
  export type LeftDataItem =
    | { type: "chip"; id: string; label?: string; labelKey?: string; iconName?: "sparkles" | "search" | "bot"; selected?: boolean }
    | { type: "dropdown"; id: string; label?: string; labelKey?: string; iconName?: "sparkles" | "search" | "bot"; selected?: boolean }

  // InputWithOptions
  export type InputWithOptionsProps = {
    placeholder?: string
    onSend?: (payload: { text: string; images: File[] }) => void

    // Mode (controlled / uncontrolled)
    mode?: Mode
    onModeChange?: (next: Mode) => void
    defaultMode?: Mode

    // Left chips data (controlled / uncontrolled)
    leftData?: LeftDataItem[]
    onLeftItemToggle?: (id: string, selected: boolean) => void
    defaultLeftData?: LeftDataItem[]

    // Scopes (controlled / uncontrolled)
    scopes?: ScopeItem[]
    onToggleScope?: (id: string, enabled: boolean) => void
    defaultScopes?: ScopeItem[]

    // Unified user events
    onUserAction?: (
      event:
        | { type: "left_item"; id: string; value: boolean }
        | { type: "scope"; id: string; value: boolean }
        | { type: "mode"; value: Mode }
        | { type: "dropdown_open"; id: string }
    ) => void
  }

  export const InputWithOptions: ComponentType<InputWithOptionsProps>
  export const ModeOptionsBar: ComponentType<any>
  export const CustomInput: ComponentType<any>

  // Providers
  export type Theme = "system" | "light" | "dark"
  export type ColorTheme = "default" | "blue" | "green" | "orange" | "red" | "rose" | "violet" | "yellow"

  export type SearchChatProvidersProps = {
    children: ReactNode
    themeMode?: Theme
    themeColor?: ColorTheme
    locale?: "zh-CN" | "en"
  }
  export const SearchChatProviders: ComponentType<SearchChatProvidersProps>
}

