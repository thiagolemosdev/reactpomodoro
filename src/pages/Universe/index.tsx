import { useMemo } from 'react'
import { isToday, isThisWeek } from 'date-fns'
import {
  UniverseContainer,
  PageHeader,
  StatsRow,
  StatCard,
  SpaceCanvas,
  Star,
  StarTooltip,
  SectionTitle,
  EmptyUniverse,
  LegendRow,
  LegendItem,
} from './styles'
import { useCycles } from '../../contexts/CyclesContext'
import { useGoals, CATEGORY_COLORS, GoalCategory } from '../../contexts/GoalsContext'

// Deterministic position from cycle id
function hashPosition(id: string): { x: number; y: number; size: number } {
  let h = 5381
  for (let i = 0; i < id.length; i++) {
    h = ((h << 5) + h) ^ id.charCodeAt(i)
    h = h >>> 0
  }
  const h2 = h * 1664525 + 1013904223
  const h3 = h2 * 22695477 + 1

  return {
    x: (h % 88) + 4,       // 4–92%
    y: ((h2 >>> 0) % 80) + 6, // 6–86%
    size: ((h3 >>> 0) % 3) + 1, // 1–3 (small, medium, large)
  }
}

const SIZE_MAP: Record<number, string> = {
  1: '6px',
  2: '9px',
  3: '13px',
}

const GLOW_MAP: Record<number, string> = {
  1: '6px',
  2: '10px',
  3: '16px',
}

export function Universe() {
  const { cycles } = useCycles()
  const { goals, getCategoryColor } = useGoals()

  const completedCycles = useMemo(
    () => cycles.filter((c) => !!c.finishedDate),
    [cycles],
  )

  const todayCount = useMemo(
    () => completedCycles.filter((c) => isToday(c.startDate)).length,
    [completedCycles],
  )

  const weekCount = useMemo(
    () => completedCycles.filter((c) => isThisWeek(c.startDate)).length,
    [completedCycles],
  )

  const totalMinutes = useMemo(
    () => completedCycles.reduce((acc, c) => acc + c.minutesAmount, 0),
    [completedCycles],
  )

  const totalHours = Math.floor(totalMinutes / 60)
  const remainingMins = totalMinutes % 60

  function getCycleColor(cycle: (typeof cycles)[0]): string {
    if (!cycle.goalId) return '#A78BFA'
    const goal = goals.find((g) => g.id === cycle.goalId)
    if (!goal) return '#A78BFA'
    return getCategoryColor(goal.category)
  }

  return (
    <UniverseContainer>
      <PageHeader>
        <h1>✨ Meu Universo</h1>
        <p>
          Cada Pomodoro concluído acende uma estrela. Complete seus objetivos e
          expanda seu universo.
        </p>
      </PageHeader>

      {/* Stats */}
      <StatsRow>
        <StatCard>
          <span className="value">{completedCycles.length}</span>
          <span className="label">Estrelas totais</span>
        </StatCard>
        <StatCard $highlight>
          <span className="value">{todayCount}</span>
          <span className="label">Hoje</span>
        </StatCard>
        <StatCard>
          <span className="value">{weekCount}</span>
          <span className="label">Essa semana</span>
        </StatCard>
        <StatCard>
          <span className="value">
            {totalHours}h{remainingMins > 0 ? ` ${remainingMins}min` : ''}
          </span>
          <span className="label">Horas focadas</span>
        </StatCard>
      </StatsRow>

      {/* Category legend */}
      {goals.length > 0 && (
        <LegendRow>
          {goals.map((goal) => (
            <LegendItem key={goal.id} $color={getCategoryColor(goal.category)}>
              <span className="dot" />
              {goal.emoji} {goal.label}
            </LegendItem>
          ))}
          <LegendItem $color="#A78BFA">
            <span className="dot" />
            Sem objetivo
          </LegendItem>
        </LegendRow>
      )}

      {/* Space canvas */}
      <SectionTitle>Seu Espaço</SectionTitle>

      {completedCycles.length === 0 ? (
        <EmptyUniverse>
          <span>🌑</span>
          <p>Seu universo está vazio.</p>
          <small>Complete Pomodoros para acender estrelas aqui.</small>
        </EmptyUniverse>
      ) : (
        <SpaceCanvas>
          {completedCycles.map((cycle) => {
            const { x, y, size } = hashPosition(cycle.id)
            const color = getCycleColor(cycle)
            const isRecent = isToday(cycle.startDate)

            return (
              <Star
                key={cycle.id}
                $x={x}
                $y={y}
                $size={SIZE_MAP[size]}
                $color={color}
                $glow={GLOW_MAP[size]}
                $pulse={isRecent}
              >
                <StarTooltip>
                  <strong>{cycle.task}</strong>
                  <span>{cycle.minutesAmount}min</span>
                  <span>
                    {cycle.finishedDate
                      ? new Date(cycle.finishedDate).toLocaleDateString(
                          'pt-BR',
                          { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' },
                        )
                      : ''}
                  </span>
                </StarTooltip>
              </Star>
            )
          })}
        </SpaceCanvas>
      )}
    </UniverseContainer>
  )
}
