import { useCallback, useEffect, useRef, useState } from 'react'

interface CountdownOptions {
  initialValue: number
}

interface CountdownResult {
  value: number
  start: () => void
}

export function useCountdown(options: CountdownOptions): CountdownResult {
  const { initialValue } = options
  const [value, setValue] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // 组件卸载时清除定时器
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (value === initialValue) {
      // 启动新定时器
      timerRef.current = setInterval(() => {
        setValue((prev) => {
          if (prev <= 0) {
            timerRef.current && clearInterval(timerRef.current)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
  }, [initialValue, value])

  const start = useCallback(() => {
    // 清除现有定时器
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    // 重置为初始值
    setValue(initialValue)
  }, [initialValue])

  return { value, start }
}
