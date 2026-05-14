import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { Plus, Trash, Moon, Sun, Clock } from 'phosphor-react'
import {
  GoalsContainer,
  PageHeader,
  ScheduleCard,
  ScheduleRow,
  ScheduleInput,
  GoalsList,
  GoalCard,
  GoalCardLeft,
  GoalCardProgress,
  ProgressBar,
  ProgressFill,
  GoalActions,
  DeleteButton,
  AddGoalForm,
  FormRow,
  FormInput,
  FormSelect,
  MinutesRow,
  QuickMinutes,
  AddButton,
  EmptyState,
  CategoryBadge,
  SectionTitle,
} from './styles'
import {
  useGoals,
  GoalCategory,
  CATEGORY_COLORS,
} from '../../contexts/GoalsContext'
import { useCycles } from '../../contexts/CyclesContext'
import { format, isToday } from 'date-fns'

const CATEGORY_LABELS: Record<GoalCategory, string> = {
  study: 'Estudo',
  work: 'Trabalho',
  exercise: 'Exercício',
  personal: 'Pessoal',
}

const CATEGORY_EMOJIS: Record<GoalCategory, string> = {
  study: '📚',
  work: '💼',
  exercise: '🏋️',
  personal: '🌟',
}

const MINUTE_SHORTCUTS = [
  { label: '30min', value: 30 },
  { label: '1h', value: 60 },
  { label: '2h', value: 120 },
  { label: '3h', value: 180 },
  { label: '5h', value: 300 },
]

const addGoalSchema = zod.object({
  label: zod.string().min(1, 'Nome obrigatório'),
  category: zod.enum(['study', 'work', 'exercise', 'personal']),
  targetMinutes: zod.number().min(1).max(720),
})

type AddGoalFormData = zod.infer<typeof addGoalSchema>

function formatMinutes(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `${m}min`
  if (m === 0) return `${h}h`
  return `${h}h ${m}min`
}

export function Goals() {
  const { goals, schedule, addGoal, removeGoal, updateSchedule, getCategoryColor } =
    useGoals()
  const { cycles } = useCycles()

  const [showForm, setShowForm] = useState(false)
  const [selectedMinutes, setSelectedMinutes] = useState<number>(60)

  const { register, handleSubmit, setValue, watch, reset } =
    useForm<AddGoalFormData>({
      resolver: zodResolver(addGoalSchema),
      defaultValues: {
        label: '',
        category: 'study',
        targetMinutes: 60,
      },
    })

  const selectedCategory = watch('category') as GoalCategory
  const targetMinutes = watch('targetMinutes')

  function handleAddGoal(data: AddGoalFormData) {
    addGoal({
      label: data.label,
      category: data.category,
      targetMinutes: data.targetMinutes,
      emoji: CATEGORY_EMOJIS[data.category],
    })
    reset()
    setSelectedMinutes(60)
    setShowForm(false)
  }

  function handleSelectMinutes(minutes: number) {
    setSelectedMinutes(minutes)
    setValue('targetMinutes', minutes)
  }

  function getCompletedMinutesToday(goalId: string): number {
    return cycles
      .filter(
        (c) =>
          c.goalId === goalId &&
          c.finishedDate &&
          isToday(c.startDate),
      )
      .reduce((acc, c) => acc + c.minutesAmount, 0)
  }

  return (
    <GoalsContainer>
      <PageHeader>
        <h1>Metas do Dia</h1>
        <p>Configure seus objetivos diários e acompanhe seu progresso.</p>
      </PageHeader>

      {/* Sleep schedule */}
      <ScheduleCard>
        <SectionTitle>
          <Clock size={18} />
          Agenda do Dia
        </SectionTitle>
        <ScheduleRow>
          <div>
            <Sun size={16} />
            <span>Acordar</span>
            <ScheduleInput
              type="time"
              value={schedule.wakeTime}
              onChange={(e) =>
                updateSchedule({ ...schedule, wakeTime: e.target.value })
              }
            />
          </div>
          <div>
            <Moon size={16} />
            <span>Dormir</span>
            <ScheduleInput
              type="time"
              value={schedule.bedTime}
              onChange={(e) =>
                updateSchedule({ ...schedule, bedTime: e.target.value })
              }
            />
          </div>
        </ScheduleRow>
      </ScheduleCard>

      {/* Goals list */}
      <SectionTitle>
        <span>🎯</span>
        Objetivos Diários
      </SectionTitle>

      {goals.length === 0 ? (
        <EmptyState>
          <span>🌌</span>
          <p>Nenhum objetivo configurado ainda.</p>
          <small>Adicione seus objetivos para começar a rastrear o progresso.</small>
        </EmptyState>
      ) : (
        <GoalsList>
          {goals.map((goal) => {
            const completed = getCompletedMinutesToday(goal.id)
            const percent = Math.min(
              100,
              Math.round((completed / goal.targetMinutes) * 100),
            )
            const color = getCategoryColor(goal.category)

            return (
              <GoalCard key={goal.id} $color={color}>
                <GoalCardLeft>
                  <span className="emoji">{goal.emoji}</span>
                  <div>
                    <strong>{goal.label}</strong>
                    <CategoryBadge $color={color}>
                      {CATEGORY_LABELS[goal.category]}
                    </CategoryBadge>
                  </div>
                </GoalCardLeft>

                <GoalCardProgress>
                  <div className="numbers">
                    <span className="completed">{formatMinutes(completed)}</span>
                    <span className="separator">/</span>
                    <span className="target">{formatMinutes(goal.targetMinutes)}</span>
                    <span className="percent">{percent}%</span>
                  </div>
                  <ProgressBar>
                    <ProgressFill $percent={percent} $color={color} />
                  </ProgressBar>
                </GoalCardProgress>

                <GoalActions>
                  <DeleteButton
                    type="button"
                    onClick={() => removeGoal(goal.id)}
                    title="Remover meta"
                  >
                    <Trash size={16} />
                  </DeleteButton>
                </GoalActions>
              </GoalCard>
            )
          })}
        </GoalsList>
      )}

      {/* Add goal form */}
      {showForm ? (
        <AddGoalForm onSubmit={handleSubmit(handleAddGoal)}>
          <SectionTitle>Nova Meta</SectionTitle>

          <FormRow>
            <FormInput
              placeholder="Nome do objetivo (ex: Estudar React)"
              {...register('label')}
            />
          </FormRow>

          <FormRow>
            <FormSelect {...register('category')}>
              {(Object.keys(CATEGORY_LABELS) as GoalCategory[]).map((cat) => (
                <option key={cat} value={cat}>
                  {CATEGORY_EMOJIS[cat]} {CATEGORY_LABELS[cat]}
                </option>
              ))}
            </FormSelect>
          </FormRow>

          <FormRow>
            <span style={{ fontSize: '0.875rem', color: '#94A3B8' }}>
              Meta diária
            </span>
            <MinutesRow>
              {MINUTE_SHORTCUTS.map((s) => (
                <QuickMinutes
                  key={s.value}
                  type="button"
                  $active={selectedMinutes === s.value}
                  $color={CATEGORY_COLORS[selectedCategory]}
                  onClick={() => handleSelectMinutes(s.value)}
                >
                  {s.label}
                </QuickMinutes>
              ))}
            </MinutesRow>
            <FormInput
              type="number"
              min={1}
              max={720}
              placeholder="Ou digite em minutos"
              value={targetMinutes || ''}
              onChange={(e) => {
                const v = Number(e.target.value)
                setValue('targetMinutes', v)
                setSelectedMinutes(v)
              }}
            />
          </FormRow>

          <FormRow $gap="0.5rem">
            <AddButton
              type="submit"
              $color={CATEGORY_COLORS[selectedCategory]}
            >
              Salvar Meta
            </AddButton>
            <AddButton
              type="button"
              $color="#475569"
              onClick={() => setShowForm(false)}
            >
              Cancelar
            </AddButton>
          </FormRow>
        </AddGoalForm>
      ) : (
        <AddButton
          type="button"
          $color="#7C3AED"
          onClick={() => setShowForm(true)}
        >
          <Plus size={18} />
          Nova Meta
        </AddButton>
      )}
    </GoalsContainer>
  )
}
