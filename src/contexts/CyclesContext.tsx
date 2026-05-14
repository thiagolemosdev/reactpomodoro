import {
  createContext,
  useContext,
  useReducer,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from 'react'

export interface Cycle {
  id: string
  task: string
  goalId: string | null
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export interface CreateCycleData {
  task: string
  minutesAmount: number
  goalId: string | null
  focusGuardEnabled: boolean
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  focusGuardEnabled: boolean
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

type CyclesAction =
  | { type: 'ADD_NEW_CYCLE'; payload: { newCycle: Cycle } }
  | { type: 'INTERRUPT_CURRENT_CYCLE' }
  | { type: 'MARK_CURRENT_CYCLE_AS_FINISHED' }

function cyclesReducer(state: CyclesState, action: CyclesAction): CyclesState {
  switch (action.type) {
    case 'ADD_NEW_CYCLE':
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id,
      }
    case 'INTERRUPT_CURRENT_CYCLE':
      return {
        ...state,
        cycles: state.cycles.map((cycle) =>
          cycle.id === state.activeCycleId
            ? { ...cycle, interruptedDate: new Date() }
            : cycle,
        ),
        activeCycleId: null,
      }
    case 'MARK_CURRENT_CYCLE_AS_FINISHED':
      return {
        ...state,
        cycles: state.cycles.map((cycle) =>
          cycle.id === state.activeCycleId
            ? { ...cycle, finishedDate: new Date() }
            : cycle,
        ),
        activeCycleId: null,
      }
    default:
      return state
  }
}

const STORAGE_KEY = '@cosmicfocus:cycles-1.0.0'

function loadFromStorage(): CyclesState {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return { cycles: [], activeCycleId: null }
  try {
    const parsed = JSON.parse(stored)
    return {
      cycles: (parsed.cycles ?? []).map((c: any) => ({
        ...c,
        startDate: new Date(c.startDate),
        interruptedDate: c.interruptedDate
          ? new Date(c.interruptedDate)
          : undefined,
        finishedDate: c.finishedDate ? new Date(c.finishedDate) : undefined,
      })),
      activeCycleId: null, // never restore an active cycle on reload
    }
  } catch {
    return { cycles: [], activeCycleId: null }
  }
}

export const CyclesContext = createContext({} as CyclesContextType)

export function CyclesContextProvider({ children }: { children: ReactNode }) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    undefined,
    loadFromStorage,
  )
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const [focusGuardEnabled, setFocusGuardEnabled] = useState(false)

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((c) => c.id === activeCycleId)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cyclesState))
  }, [cyclesState])

  const markCurrentCycleAsFinished = useCallback(() => {
    dispatch({ type: 'MARK_CURRENT_CYCLE_AS_FINISHED' })
  }, [])

  const setSecondsPassed = useCallback((seconds: number) => {
    setAmountSecondsPassed(seconds)
  }, [])

  const createNewCycle = useCallback((data: CreateCycleData) => {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      goalId: data.goalId,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    setFocusGuardEnabled(data.focusGuardEnabled)
    dispatch({ type: 'ADD_NEW_CYCLE', payload: { newCycle } })
    setAmountSecondsPassed(0)
  }, [])

  const interruptCurrentCycle = useCallback(() => {
    dispatch({ type: 'INTERRUPT_CURRENT_CYCLE' })
    setAmountSecondsPassed(0)
  }, [])

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        focusGuardEnabled,
        markCurrentCycleAsFinished,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}

export function useCycles() {
  return useContext(CyclesContext)
}
