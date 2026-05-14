import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { HistoryContainer, HistoryList, Status, EmptyState, GoalTag } from './styles'
import { useCycles } from '../../contexts/CyclesContext'
import { useGoals } from '../../contexts/GoalsContext'

export function History() {
  const { cycles } = useCycles()
  const { goals, getCategoryColor } = useGoals()

  const sorted = [...cycles].reverse()

  function getStatus(cycle: (typeof cycles)[0]) {
    if (cycle.finishedDate) return 'finished'
    if (cycle.interruptedDate) return 'interrupted'
    return 'active'
  }

  function getGoalLabel(goalId: string | null) {
    if (!goalId) return null
    return goals.find((g) => g.id === goalId) ?? null
  }

  return (
    <HistoryContainer>
      <h1>Histórico</h1>

      {cycles.length === 0 ? (
        <EmptyState>
          <span>🌌</span>
          <p>Nenhum ciclo ainda.</p>
          <small>Inicie um Pomodoro para começar seu histórico.</small>
        </EmptyState>
      ) : (
        <HistoryList>
          <table>
            <thead>
              <tr>
                <th>Tarefa</th>
                <th>Duração</th>
                <th>Início</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((cycle) => {
                const status = getStatus(cycle)
                const goal = getGoalLabel(cycle.goalId)

                return (
                  <tr key={cycle.id}>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        {cycle.task}
                        {goal && (
                          <GoalTag $color={getCategoryColor(goal.category)}>
                            {goal.emoji} {goal.label}
                          </GoalTag>
                        )}
                      </div>
                    </td>
                    <td>{cycle.minutesAmount} min</td>
                    <td>
                      {formatDistanceToNow(cycle.startDate, {
                        addSuffix: true,
                        locale: ptBR,
                      })}
                    </td>
                    <td>
                      {status === 'finished' && (
                        <Status $color="green">Concluído</Status>
                      )}
                      {status === 'interrupted' && (
                        <Status $color="red">Interrompido</Status>
                      )}
                      {status === 'active' && (
                        <Status $color="yellow">Em andamento</Status>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </HistoryList>
      )}
    </HistoryContainer>
  )
}
