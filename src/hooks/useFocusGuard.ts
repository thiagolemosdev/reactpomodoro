import { useEffect, useRef, useState } from 'react'
import { differenceInSeconds } from 'date-fns'

interface FocusGuardResult {
  isAway: boolean
  secondsAway: number
  hasFailed: boolean
  reset: () => void
}

export function useFocusGuard(
  enabled: boolean,
  onFail: () => void,
  threshold = 10,
): FocusGuardResult {
  const [isAway, setIsAway] = useState(false)
  const [secondsAway, setSecondsAway] = useState(0)
  const [hasFailed, setHasFailed] = useState(false)
  const awayStartRef = useRef<Date | null>(null)
  const onFailRef = useRef(onFail)

  // keep ref in sync so the interval doesn't capture stale onFail
  useEffect(() => {
    onFailRef.current = onFail
  }, [onFail])

  useEffect(() => {
    if (!enabled) return

    function handleVisibilityChange() {
      if (document.hidden) {
        awayStartRef.current = new Date()
        setIsAway(true)
      } else {
        awayStartRef.current = null
        setIsAway(false)
        setSecondsAway(0)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () =>
      document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [enabled])

  useEffect(() => {
    if (!enabled || !isAway) return

    const interval = setInterval(() => {
      if (!awayStartRef.current) return
      const secs = differenceInSeconds(new Date(), awayStartRef.current)
      setSecondsAway(secs)
      if (secs >= threshold) {
        clearInterval(interval)
        setHasFailed(true)
        onFailRef.current()
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [enabled, isAway, threshold])

  function reset() {
    setIsAway(false)
    setSecondsAway(0)
    setHasFailed(false)
    awayStartRef.current = null
  }

  return { isAway, secondsAway, hasFailed, reset }
}
