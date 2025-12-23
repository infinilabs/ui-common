import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import VoiceWaveform from "@/components/input/VoiceWaveform"
import ImagePreviewList from "@/components/input/ImagePreviewList"
import ActionsBar from "@/components/input/ActionsBar"
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition"
import { useAudioMeter } from "@/hooks/useAudioMeter"
import { useI18n } from "@/i18n/useI18n"

type CustomInputProps = {
  placeholder?: string
  className?: string
  onSend?: (payload: { text: string; images: File[] }) => void
}

export default function CustomInput({ placeholder, className, onSend }: CustomInputProps) {
  const { t } = useI18n()
  const [value, setValue] = useState("")
  const [stack, setStack] = useState(false)
  const [images, setImages] = useState<Array<{ file: File; url: string }>>([])
  const [speechSupported, setSpeechSupported] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const actionsRef = useRef<HTMLDivElement | null>(null)
  const mirrorRef = useRef<HTMLDivElement | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const listeningRef = useRef(false)
  const committedRef = useRef("") // 已确认的文本（final）
  // hooks
  const { supported, listening, start, stop } = useSpeechRecognition({
    lang: "zh-CN",
    autoRestart: true,
    onInterim: (interim) => {
      const composed = committedRef.current + (interim ? (committedRef.current ? " " : "") + interim : "")
      setValue(composed)
    },
    onFinal: (finalText) => {
      if (finalText) {
        committedRef.current = (committedRef.current ? committedRef.current + " " : "") + finalText
        setValue(committedRef.current)
      }
    },
  })
  const { levels } = useAudioMeter({ active: listening, bins: 24 })

  const gap = 8 // 与图标组的间距，px
  // 迟滞阈值，避免在临界点频繁左右切换
  const APPROACH = 0.95
  const RELEASE = 0.85
  const MAX_IMAGES = 5

  // 同步 textarea 高度：总体最多 5 行；有图片时，图片按 3 行占位
  const adjustTextareaHeight = () => {
    const el = textareaRef.current
    if (!el) return
    const style = window.getComputedStyle(el)
    const lh = parseFloat(style.lineHeight || "20")
    const textMaxLines = Math.max(1, 5 - (images.length > 0 ? 3 : 0))
    const max = lh * textMaxLines
    el.style.height = "auto"
    const h = el.scrollHeight
    const clamped = Math.min(h, max)
    el.style.height = `${clamped}px`
    el.style.overflowY = h > max ? "auto" : "hidden"
  }

  // 根据可用宽度与文本宽度决定是否上下布局（含迟滞与换行检测）
  const reevaluateLayout = () => {
    const container = containerRef.current
    const actions = actionsRef.current
    const mirror = mirrorRef.current
    if (!container || !actions || !mirror) return
    const containerWidth = container.clientWidth
    const actionsWidth = actions.clientWidth
    const available = containerWidth - actionsWidth - gap

    // 设置 mirror 文本用于测量（模拟 textarea 单行内容宽度）
    mirror.textContent = value.length ? value : (placeholder ?? "")
    const textWidth = mirror.scrollWidth
    // 检测是否已换到多行（接近或超过两行就认为需要堆叠）
    const ta = textareaRef.current
    let wrapped = false
    if (ta) {
      const style = window.getComputedStyle(ta)
      const lh = parseFloat(style.lineHeight || "20")
      wrapped = ta.scrollHeight > lh * 1.3
    }

    // 迟滞逻辑：避免在临界点来回切换
    const nearEdge = textWidth > available * APPROACH
    const farEnough = textWidth < available * RELEASE

    let nextStack = stack
    if (stack) {
      // 已经堆叠：只有远离到更小比例且未换行时才恢复左右
      nextStack = wrapped ? true : !farEnough ? true : false
    } else {
      // 尚未堆叠：接近边缘或已换行就切到上下
      nextStack = nearEdge || wrapped
    }
    setStack(nextStack)
  }

  useEffect(() => {
    adjustTextareaHeight()
    const id = requestAnimationFrame(() => {
      reevaluateLayout()
    })
    return () => cancelAnimationFrame(id)
  }, [value])

  // 图片变化也会影响文本最大可显示行数，需要重新调整高度与布局
  useEffect(() => {
    adjustTextareaHeight()
    const id = requestAnimationFrame(() => {
      reevaluateLayout()
    })
    return () => cancelAnimationFrame(id)
  }, [images.length])

  useEffect(() => {
    const onResize = () => {
      adjustTextareaHeight()
      reevaluateLayout()
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  // 同步 speech 支持标记与监听标记
  useEffect(() => {
    setSpeechSupported(supported)
  }, [supported])
  useEffect(() => {
    listeningRef.current = listening
  }, [listening])

  const startListening = () => {
    if (!speechSupported) return
    committedRef.current = value
    start()
  }

  const stopListening = () => {
    stop()
    // 停止后，确保输入框内容为最终文本
    setValue(committedRef.current)
  }

  // 音波可视化逻辑由 useAudioMeter 管理

  // 选择文件、粘贴图片、拖拽图片
  const addFiles = (files: FileList | File[]) => {
    setImages((prev) => {
      const remaining = Math.max(0, MAX_IMAGES - prev.length)
      if (remaining === 0) return prev
      const selected: Array<{ file: File; url: string }> = []
      for (const f of Array.from(files)) {
        if (!f.type.startsWith("image/")) continue
        selected.push({ file: f, url: URL.createObjectURL(f) })
        if (selected.length >= remaining) break
      }
      return selected.length ? [...prev, ...selected] : prev
    })
  }

  const onPaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = e.clipboardData?.items
    if (!items) return
    const files: File[] = []
    for (const it of items) {
      if (it.kind === "file") {
        const f = it.getAsFile()
        if (f && f.type.startsWith("image/")) files.push(f)
      }
    }
    if (files.length) {
      e.preventDefault()
      addFiles(files)
    }
  }

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer?.files?.length) addFiles(e.dataTransfer.files)
  }

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const removeImage = (url: string) => {
    setImages((prev) => {
      const found = prev.find((p) => p.url === url)
      if (found) URL.revokeObjectURL(found.url)
      return prev.filter((p) => p.url !== url)
    })
  }


  const handleSend = () => {
    if (onSend) onSend({ text: value, images: images.map((i) => i.file) })
    // 清空内容与图片
    setValue("")
    images.forEach((i) => URL.revokeObjectURL(i.url))
    setImages([])
  }

  return (
    <div className={cn("w-full", className)}>
      {/* 外层容器，圆角、阴影、聚焦态 */}
      <div
        ref={containerRef}
        className={cn(
          "rounded-xl border bg-background/50 shadow-sm",
          "focus-within:ring-2 focus-within:ring-primary/40",
          stack ? "p-2" : "px-2 py-1"
        )}
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        {/* 语音波形与提示 */}
        <VoiceWaveform levels={levels} listening={listening} />

        {/* 预览区：始终靠右，位于输入区域上方 */}
        <ImagePreviewList images={images} onRemove={removeImage} />
        {/* 布局：默认左右，临界后上下 */}
        <div className={cn(stack ? "grid grid-cols-1 gap-3" : "grid grid-cols-[1fr_auto] items-center gap-2")}> 
          {/* 输入区 */}
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => {
              const v = e.target.value
              setValue(v)
              if (listeningRef.current) {
                // 在听写中，用户输入视为最终文本的基线
                committedRef.current = v
              }
            }}
            onPaste={onPaste}
            placeholder={placeholder ?? t("input.placeholder")}
            rows={1}
            className={cn(
              "resize-none bg-transparent outline-none",
              "text-sm sm:text-base leading-6",
              "max-h-40" // 约等于 5 行，具体由 adjustTextareaHeight 控制
            )}
          />

          {/* 操作区：始终靠右对齐 */}
          <div ref={actionsRef} className={cn("flex items-center gap-1 sm:gap-2", "justify-end")}> 
            <ActionsBar
              listening={listening}
              speechSupported={speechSupported}
              imagesCount={images.length}
              maxImages={MAX_IMAGES}
              onVoiceToggle={() => (listening ? stopListening() : startListening())}
              onAttachClick={() => fileInputRef.current?.click()}
              onSend={handleSend}
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => e.target.files && addFiles(e.target.files)}
            />
          </div>
        </div>
      </div>

      {/* 参数与模式切换条由 InputWithOptions 进行组合渲染 */}

      {/* 隐藏镜像元素：用于测量文本单行宽度 */}
      <div
        ref={mirrorRef}
        aria-hidden="true"
        className="absolute -z-10 h-0 overflow-hidden whitespace-pre text-sm sm:text-base leading-6 px-0"
        style={{ visibility: "hidden" }}
      />
    </div>
  )
}
