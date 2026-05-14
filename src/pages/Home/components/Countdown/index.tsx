import { useEffect } from 'react'
import { differenceInSeconds } from 'date-fns'
import {
  CountdownContainer,
  Separator,
  FocusWarningBanner,
} from './styles'
import { useCycles } from '../../../../contexts/CyclesContext'
import { useFocusGuard } from '../../../../hooks/useFocusGuard'
import { Warning, Skull } from 'phosphor-react'

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    focusGuardEnabled,
    interruptCurrentCycle,
    setSecondsPassed,
    amountSecondsPassed,
  } = useCycles()

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>

    if (activeCycle) {
      interval = setInterval(() => {
        const diff = differenceInSeconds(new Date(), activeCycle.startDate)

        if (diff >= totalSeconds) {
          markCurrentCycleAsFinished()
          setSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setSecondsPassed(diff)
        }
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [activeCycle, totalSeconds, activeCycleId, markCurrentCycleAsFinished, setSecondsPassed])

  const { isAway, secondsAway, hasFailed, reset } = useFocusGuard(
    !!activeCycle && focusGuardEnabled,
    interruptCurrentCycle,
    10,
  )

  // reset guard state when a new cycle starts
  useEffect(() => {
    reset()
  }, [activeCycleId]) // eslint-disable-line react-hooks/exhaustive-deps

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60
  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds} — CosmicFocus`
    } else {
      document.title = 'CosmicFocus'
    }
  }, [minutes, seconds, activeCycle])

  return (
    <>
      {isAway && !hasFailed && (
        <FocusWarningBanner $danger={false}>
          <Warning size={16} weight="fill" />
          FocusGuard ativo — voltando em {Math.max(0, 10 - secondsAway)}s
        </FocusWarningBanner>
      )}

      {hasFailed && (
        <FocusWarningBanner $danger>
          <Skull size={16} weight="fill" />
          Pomodoro cancelado — você saiu do app!
        </FocusWarningBanner>
      )}

      <CountdownContainer $isActive={!!activeCycle} $isFailing={hasFailed}>
        <span>{minutes[0]}</span>
        <span>{minutes[1]}</span>
        <Separator $isActive={!!activeCycle}>:</Separator>
        <span>{seconds[0]}</span>
        <span>{seconds[1]}</span>
      </CountdownContainer>
    </>
  )
}
