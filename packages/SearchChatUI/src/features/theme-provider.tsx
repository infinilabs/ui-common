import { useEffect, useState, type ReactNode } from "react"
import { ThemeProviderContext, type Theme } from "./theme-context.ts"
import type { ColorTheme } from "./theme-context.ts"

// 引入各主题样式的构建后 URL，用于按需挂载 <link>
import defaultThemeUrl from "../styles/default.css?url"
import blueThemeUrl from "../styles/blue.css?url"
import greenThemeUrl from "../styles/green.css?url"
import orangeThemeUrl from "../styles/orange.css?url"
import redThemeUrl from "../styles/red.css?url"
import roseThemeUrl from "../styles/rose.css?url"
import violetThemeUrl from "../styles/violet.css?url"
import yellowThemeUrl from "../styles/yellow.css?url"

type ThemeProviderProps = {
  children: ReactNode
  defaultTheme?: Theme
  storageKey?: string
  defaultColorTheme?: ColorTheme
  colorStorageKey?: string
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  defaultColorTheme = "default",
  colorStorageKey = "vite-ui-color-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )
  const [colorTheme, setColorTheme] = useState<ColorTheme>(
    () => (localStorage.getItem(colorStorageKey) as ColorTheme) || defaultColorTheme
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  useEffect(() => {
    const themeUrlMap: Record<ColorTheme, string> = {
      default: defaultThemeUrl,
      blue: blueThemeUrl,
      green: greenThemeUrl,
      orange: orangeThemeUrl,
      red: redThemeUrl,
      rose: roseThemeUrl,
      violet: violetThemeUrl,
      yellow: yellowThemeUrl,
    }

    const href = themeUrlMap[colorTheme]
    const id = "color-theme-stylesheet"
    const prev = document.getElementById(id) as HTMLLinkElement | null
    if (prev) {
      prev.remove()
    }
    const link = document.createElement("link")
    link.id = id
    link.rel = "stylesheet"
    link.href = href
    document.head.appendChild(link)
  }, [colorTheme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
    colorTheme,
    setColorTheme: (t: ColorTheme) => {
      localStorage.setItem(colorStorageKey, t)
      setColorTheme(t)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}
