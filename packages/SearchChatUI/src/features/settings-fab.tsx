import { useEffect, useState } from "react"
import { Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/features/theme-context"
import ThemeColorSwitcher from "@/features/theme-color-switcher"
import { useI18n } from "@/i18n/useI18n"
import type { Locale } from "@/i18n/types"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@/components/ui/drawer"

export default function SettingsFab() {
  const [open, setOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { t, locale, setLocale } = useI18n()

  // ESC 关闭
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      {/* 浮球按钮 */}
      <DrawerTrigger asChild>
        <Button
          aria-label="Open settings"
          variant="default"
          size="icon"
          className="fixed right-6 top-6 z-50 shadow-lg"
        >
          <Settings className="size-5" />
        </Button>
      </DrawerTrigger>

      {/* 右侧抽屉 */}
      <DrawerContent className="text-popover-foreground">
        <DrawerHeader className="flex flex-row items-center justify-between">
          <div>
            <DrawerTitle>{t("settings.title")}</DrawerTitle>
            <DrawerDescription>{t("settings.description")}</DrawerDescription>
          </div>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon" aria-label="Close">
              {/* 使用普通字符 ×，避免额外图标依赖 */}
              <span className="text-xl leading-none">×</span>
            </Button>
          </DrawerClose>
        </DrawerHeader>

        <div className="p-4 space-y-6">
          <section className="space-y-2">
            <div className="text-sm font-medium">{t("settings.themeMode")}</div>
            <div className="flex gap-2">
              <Button
                variant={theme === "light" ? "default" : "outline"}
                onClick={() => setTheme("light")}
              >
                {t("settings.theme.light")}
              </Button>
              <Button
                variant={theme === "dark" ? "default" : "outline"}
                onClick={() => setTheme("dark")}
              >
                {t("settings.theme.dark")}
              </Button>
              <Button
                variant={theme === "system" ? "default" : "outline"}
                onClick={() => setTheme("system")}
              >
                {t("settings.theme.system")}
              </Button>
            </div>
          </section>

          <section className="space-y-2">
            <div className="text-sm font-medium">{t("settings.themeColor")}</div>
            <ThemeColorSwitcher />
          </section>

          <section className="space-y-2">
            <div className="text-sm font-medium">{t("settings.language")}</div>
            <RadioGroup value={locale} onValueChange={(v) => setLocale(v as Locale)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="zh-CN" id="lang-zh" />
                <Label htmlFor="lang-zh">简体中文</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="en" id="lang-en" />
                <Label htmlFor="lang-en">English</Label>
              </div>
            </RadioGroup>
          </section>
        </div>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="ghost">{t("settings.close")}</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
