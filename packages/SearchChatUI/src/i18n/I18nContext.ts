import { createContext } from "react"
import type { Locale } from "./types"

export type I18nContextValue = {
  locale: Locale
  setLocale: (next: Locale) => void
  t: (key: string) => string
}

export const I18nContext = createContext<I18nContextValue | null>(null)

