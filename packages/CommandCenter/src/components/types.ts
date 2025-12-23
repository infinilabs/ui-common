export type TabKey = 'search' | 'chat' | 'history'

export type InputMode = 'command' | 'search' | 'ai'

export interface QuickAction {
  id: string
  label: string
  hint?: string
}

export interface SearchResultItem {
  id: string
  title: string
  snippet?: string
  url?: string
}

