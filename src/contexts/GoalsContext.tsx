import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from 'react'

export type GoalCategory = 'study' | 'work' | 'exercise' | 'personal'

export interface DailyGoal {
  id: string
  category: GoalCategory
  label: string
  targetMinutes: number
  emoji: string
}

export interface Schedule {
  wakeTime: string
  bedTime: string
}

interface GoalsContextType {
  goals: DailyGoal[]
  schedule: Schedule
  addGoal: (goal: Omit<DailyGoal, 'id'>) => void
  removeGoal: (id: string) => void
  updateGoal: (id: string, data: Partial<Omit<DailyGoal, 'id'>>) => void
  updateSchedule: (s: Schedule) => void
  getCategoryColor: (category: GoalCategory) => string
}

const GOALS_KEY = '@cosmicfocus:goals-1.0.0'
const SCHEDULE_KEY = '@cosmicfocus:schedule-1.0.0'

const DEFAULT_GOALS: DailyGoal[] = [
  {
    id: 'default-study',
    category: 'study',
    label: 'Estudar',
    targetMinutes: 300,
    emoji: '📚',
  },
  {
    id: 'default-work',
    category: 'work',
    label: 'Trabalho focado',
    targetMinutes: 180,
    emoji: '💼',
  },
  {
    id: 'default-exercise',
    category: 'exercise',
    label: 'Treinar',
    targetMinutes: 60,
    emoji: '🏋️',
  },
  {
    id: 'default-personal',
    category: 'personal',
    label: 'Leitura',
    targetMinutes: 30,
    emoji: '📖',
  },
]

const DEFAULT_SCHEDULE: Schedule = {
  wakeTime: '07:00',
  bedTime: '23:00',
}

export const CATEGORY_COLORS: Record<GoalCategory, string> = {
  study: '#8B5CF6',
  work: '#3B82F6',
  exercise: '#10B981',
  personal: '#F59E0B',
}

function loadGoals(): DailyGoal[] {
  const stored = localStorage.getItem(GOALS_KEY)
  if (!stored) return DEFAULT_GOALS
  try {
    return JSON.parse(stored)
  } catch {
    return DEFAULT_GOALS
  }
}

function loadSchedule(): Schedule {
  const stored = localStorage.getItem(SCHEDULE_KEY)
  if (!stored) return DEFAULT_SCHEDULE
  try {
    return JSON.parse(stored)
  } catch {
    return DEFAULT_SCHEDULE
  }
}

export const GoalsContext = createContext({} as GoalsContextType)

export function GoalsContextProvider({ children }: { children: ReactNode }) {
  const [goals, setGoals] = useState<DailyGoal[]>(loadGoals)
  const [schedule, setSchedule] = useState<Schedule>(loadSchedule)

  useEffect(() => {
    localStorage.setItem(GOALS_KEY, JSON.stringify(goals))
  }, [goals])

  useEffect(() => {
    localStorage.setItem(SCHEDULE_KEY, JSON.stringify(schedule))
  }, [schedule])

  const addGoal = useCallback((goal: Omit<DailyGoal, 'id'>) => {
    setGoals((prev) => [
      ...prev,
      { ...goal, id: String(new Date().getTime()) },
    ])
  }, [])

  const removeGoal = useCallback((id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id))
  }, [])

  const updateGoal = useCallback(
    (id: string, data: Partial<Omit<DailyGoal, 'id'>>) => {
      setGoals((prev) =>
        prev.map((g) => (g.id === id ? { ...g, ...data } : g)),
      )
    },
    [],
  )

  const updateSchedule = useCallback((s: Schedule) => {
    setSchedule(s)
  }, [])

  const getCategoryColor = useCallback((category: GoalCategory) => {
    return CATEGORY_COLORS[category]
  }, [])

  return (
    <GoalsContext.Provider
      value={{
        goals,
        schedule,
        addGoal,
        removeGoal,
        updateGoal,
        updateSchedule,
        getCategoryColor,
      }}
    >
      {children}
    </GoalsContext.Provider>
  )
}

export function useGoals() {
  return useContext(GoalsContext)
}
