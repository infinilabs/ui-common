import type { InputMode } from './types'

export function detectInputMode(input: string): InputMode {
  const q = input.trim()
  if (!q) return 'search'
  if (q.startsWith('/')) return 'command'
  // 简单启发式：包含空格/问号/自然语言痕迹 → AI
  const aiHints = [/\?$/, /\s+/, /(explain|why|how|优化|分析)/i]
  if (aiHints.some((re) => re.test(q))) return 'ai'
  return 'search'
}

