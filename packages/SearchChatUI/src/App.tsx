import { ThemeProvider } from "@/features/theme-provider";
import { I18nProvider } from "@/i18n";
import SettingsFab from "@/features/settings-fab";
import InputWithOptionsFeature from "@/features/input-with-options-feature";

function App() {
  return (
    <I18nProvider>
      <ThemeProvider
      defaultTheme="dark"
      storageKey="vite-ui-theme"
      defaultColorTheme="blue"
      colorStorageKey="vite-ui-color-theme"
      >
        <div className="flex min-h-svh flex-col items-center gap-6 py-6">
          <div className="w-full max-w-2xl px-4">
            <div className="rounded-lg border p-4">
              <h2 className="font-medium">Custom Input 示例</h2>
              <p className="text-sm text-muted-foreground mb-3">默认左右布局，接近临界点后自动上下布局。输入区最多 5 行，超出滚动。</p>
              <InputWithOptionsFeature />
            </div>
          </div>
          <SettingsFab />
        </div>
      </ThemeProvider>
    </I18nProvider>
  );
}

export default App;
