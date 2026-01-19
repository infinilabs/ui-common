export { default as InputWithOptions } from "./input/InputWithOptions"
export type { InputWithOptionsProps } from "./input/InputWithOptions"
export type { Mode, ScopeItem, LeftDataItem } from "./input/ModeOptionsBar"
export { default as CustomInput } from "./input/custom-input"
export { default as ModeOptionsBar } from "./input/ModeOptionsBar"
// 供库使用方按需包裹设置主题与国际化
export { ThemeProvider } from "../features/theme-provider"
export { I18nProvider } from "../i18n"
export { default as SearchChatProviders } from "./Providers"

// 引入库的组件样式（仅 components/utilities），避免污染宿主 base
import "./styles.css"
