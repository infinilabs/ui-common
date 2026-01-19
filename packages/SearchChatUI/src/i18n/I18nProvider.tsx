import { useMemo, useState } from "react"
import zhCN from "./locales/zh-CN"
import en from "./locales/en"
import type { Locale, Dictionary } from "./types"
import { I18nContext } from "./I18nContext"

const dictionaries: Record<Locale, Dictionary> = {
  "zh-CN": zhCN,
  en,
}

export function I18nProvider({ locale: initial = "zh-CN", children }: { locale?: Locale; children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(initial)

  const t = useMemo(() => {
    const dict = dictionaries[locale] ?? dictionaries["zh-CN"]
    return (key: string) => dict[key] ?? key
  }, [locale])

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

