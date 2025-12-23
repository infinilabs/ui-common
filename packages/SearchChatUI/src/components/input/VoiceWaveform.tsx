import { cn } from "@/lib/utils"
import { useI18n } from "@/i18n/useI18n"

type VoiceWaveformProps = {
  levels: number[]
  listening: boolean
  className?: string
}

export default function VoiceWaveform({ levels, listening, className }: VoiceWaveformProps) {
  const { t } = useI18n()
  if (!listening) return null
  return (
    <div className={cn("mb-2 flex items-center justify-start gap-2 text-xs text-muted-foreground", className)}>
      <div className="flex items-end gap-[2px] h-5">
        {levels.length > 0 ? (
          levels.map((h, i) => (
            <span key={i} className="w-[3px] bg-primary/70 rounded-sm" style={{ height: `${h}%` }} />
          ))
        ) : (
          <span>{t("voice.listening")}</span>
        )}
      </div>
    </div>
  )
}
