import { HistoryList, HystoryContainer, Status } from './styles'

export function History() {
  return (
    <div>
      <HystoryContainer>
        <h1> Meu historico</h1>
        <HistoryList>
          <table>
            <thead>
              <tr>
                <th>Tarefa</th>
                <th>Duração</th>
                <th>Inicio</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tarefas</td>
                <td>20 minutos</td>
                <td>Há 2 meses</td>
                <td>
                  <Status statusColor="yellow">Concluido</Status>
                </td>
              </tr>
              <tr>
                <td>Tarefas</td>
                <td>20 minutos</td>
                <td>Há 2 meses</td>
                <td>
                  <Status statusColor="yellow">Concluido</Status>
                </td>
              </tr>
              <tr>
                <td>Tarefas</td>
                <td>20 minutos</td>
                <td>Há 2 meses</td>
                <td>
                  <Status statusColor="yellow">Concluido</Status>
                </td>
              </tr>
              <tr>
                <td>Tarefas</td>
                <td>20 minutos</td>
                <td>Há 2 meses</td>
                <td>
                  <Status statusColor="red">Interrompido</Status>
                </td>
              </tr>
              <tr>
                <td>Tarefas</td>
                <td>20 minutos</td>
                <td>Há 2 meses</td>
                <td>
                  <Status statusColor="yellow">Concluido</Status>
                </td>
              </tr>
              <tr>
                <td>Tarefas</td>
                <td>20 minutos</td>
                <td>Há 2 meses</td>
                <td>
                  <Status statusColor="green">Em Andamento</Status>
                </td>
              </tr>
              <tr>
                <td>Tarefas</td>
                <td>20 minutos</td>
                <td>Há 2 meses</td>
                <td>
                  <Status statusColor="yellow">Concluido</Status>
                </td>
              </tr>
            </tbody>
          </table>
        </HistoryList>
      </HystoryContainer>
    </div>
  )
}
