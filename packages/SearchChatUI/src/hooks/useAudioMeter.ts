import { useEffect, useRef, useState } from "react"

type UseAudioMeterOptions = {
  active: boolean
  bins?: number
}

export function useAudioMeter({ active, bins = 24 }: UseAudioMeterOptions) {
  const [levels, setLevels] = useState<number[]>([])
  const audioCtxRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const mediaStreamRef = useRef<MediaStream | null>(null)
  const rafIdRef = useRef<number | null>(null)

  useEffect(() => {
    const start = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        const w = window as Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext }
        const AC = w.AudioContext ?? w.webkitAudioContext
        if (!AC) throw new Error("AudioContext unsupported")
        const ctx = new AC()
        const analyser = ctx.createAnalyser()
        analyser.fftSize = 1024
        analyser.smoothingTimeConstant = 0.8
        const source = ctx.createMediaStreamSource(stream)
        source.connect(analyser)
        audioCtxRef.current = ctx
        analyserRef.current = analyser
        mediaStreamRef.current = stream
        const data = new Uint8Array(analyser.frequencyBinCount)
        const loop = () => {
          if (!analyserRef.current) return
          analyserRef.current.getByteFrequencyData(data)
          const step = Math.floor(data.length / bins)
          const lvls: number[] = []
          for (let i = 0; i < bins; i++) {
            const idx = i * step
            const v = data[idx]
            lvls.push(Math.min(100, Math.max(2, (v / 255) * 100)))
          }
          setLevels(lvls)
          rafIdRef.current = requestAnimationFrame(loop)
        }
        rafIdRef.current = requestAnimationFrame(loop)
      } catch {
        // 麦克风权限失败时，忽略音波显示
        setLevels([])
      }
    }

    const stop = () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
        rafIdRef.current = null
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((t) => t.stop())
        mediaStreamRef.current = null
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close()
        audioCtxRef.current = null
      }
      analyserRef.current = null
      setLevels([])
    }

    if (active) start()
    else stop()

    return () => stop()
  }, [active, bins])

  return { levels }
}

