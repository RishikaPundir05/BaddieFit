import { useState, useEffect, useRef, useCallback } from 'react'

export function useTimer(initialSeconds = 60) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds)
  const [isRunning, setIsRunning] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const intervalRef = useRef(null)

  const start = useCallback(() => setIsRunning(true), [])
  const pause = useCallback(() => setIsRunning(false), [])
  const reset = useCallback((seconds = initialSeconds) => {
    setIsRunning(false)
    setIsFinished(false)
    setTimeLeft(seconds)
  }, [initialSeconds])

  useEffect(() => {
    if (!isRunning) { clearInterval(intervalRef.current); return }
    intervalRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(intervalRef.current)
          setIsRunning(false)
          setIsFinished(true)
          // Play a simple beep using Web Audio API
          try {
            const ctx = new AudioContext()
            const osc = ctx.createOscillator()
            osc.connect(ctx.destination)
            osc.frequency.value = 880
            osc.start()
            osc.stop(ctx.currentTime + 0.3)
          } catch {}
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [isRunning])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  const progress = 1 - timeLeft / initialSeconds

  return { timeLeft, display, progress, isRunning, isFinished, start, pause, reset }
}
