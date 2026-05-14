import { useEffect, useRef, useState } from 'react'
import { differenceInSeconds } from 'date-fns'

// Capacitor App plugin — only available when running as native Android/iOS
let CapacitorApp: typeof import('@capacitor/app').App | null = null
let isNative = false

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { App } = require('@capacitor/app')
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { Capacitor } = require('@capacitor/core')
  if (Capacitor.isNativePlatform()) {
    CapacitorApp = App
    isNative = true
  }
} catch {
  // running in browser — use visibilitychange instead
}

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

  useEffect(() => {
    onFailRef.current = onFail
  }, [onFail])

  // Native Android: use Capacitor App state changes (more reliable than visibilitychange)
  useEffect(() => {
    if (!enabled || !isNative || !CapacitorApp) return

    let listenerHandle: { remove: () => void } | null = null

    CapacitorApp.addListener('appStateChange', ({ isActive }) => {
      if (!isActive) {
        awayStartRef.current = new Date()
        setIsAway(true)
      } else {
        awayStartRef.current = null
        setIsAway(false)
        setSecondsAway(0)
      }
    }).then((handle) => {
      listenerHandle = handle
    })

    return () => {
      listenerHandle?.remove()
    }
  }, [enabled])

  // Web: use Page Visibility API
  useEffect(() => {
    if (!enabled || isNative) return

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

  // Countdown when away — shared between native and web paths
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
