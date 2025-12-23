import { useTheme, type ColorTheme } from "./theme-context.ts"

const options: { key: ColorTheme; label: string }[] = [
  { key: "default", label: "Default" },
  { key: "blue", label: "Blue" },
  { key: "green", label: "Green" },
  { key: "orange", label: "Orange" },
  { key: "red", label: "Red" },
  { key: "rose", label: "Rose" },
  { key: "violet", label: "Violet" },
  { key: "yellow", label: "Yellow" },
]

export function ThemeColorSwitcher() {
  const { colorTheme, setColorTheme } = useTheme()

  return (
    <div className="flex flex-wrap gap-4">
      {options.map((opt) => (
        <button
          key={opt.key}
          className={
            "px-3 py-2 rounded-md text-sm border transition-colors " +
            (colorTheme === opt.key
              ? "bg-primary text-primary-foreground"
              : "bg-background hover:bg-accent hover:text-accent-foreground")
          }
          onClick={() => setColorTheme(opt.key)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

export default ThemeColorSwitcher
