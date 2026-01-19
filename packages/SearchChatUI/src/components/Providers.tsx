import type { ReactNode } from "react"
import { ThemeProvider } from "../features/theme-provider"
import type { Theme, ColorTheme } from "../features/theme-context.ts"
import { I18nProvider } from "../i18n"

type ProvidersProps = {
  children: ReactNode
  themeMode?: Theme
  themeColor?: ColorTheme
  locale?: "zh-CN" | "en"
}

export default function SearchChatProviders({
  children,
  themeMode = "system",
  themeColor = "default",
  locale = "zh-CN",
}: ProvidersProps) {
  return (
    <I18nProvider locale={locale}>
      <ThemeProvider defaultTheme={themeMode} defaultColorTheme={themeColor}>
        {children}
      </ThemeProvider>
    </I18nProvider>
  )
}

