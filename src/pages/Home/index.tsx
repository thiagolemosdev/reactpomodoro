import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { HandPalm, Play, ShieldCheck } from 'phosphor-react'
import {
  HomeContainer,
  FormSection,
  SectionLabel,
  TaskInput,
  GoalChips,
  GoalChip,
  MinutePresets,
  PresetButton,
  CustomMinutesInput,
  FocusGuardToggle,
  ToggleSwitch,
  ActionButton,
  StopButton,
  TimerSection,
} from './styles'
import { Countdown } from './components/Countdown'
import { useCycles } from '../../contexts/CyclesContext'
import { useGoals } from '../../contexts/GoalsContext'

const newCycleSchema = zod.object({
  task: zod.string().min(1, 'Descreva o que vai fazer'),
  minutesAmount: zod
    .number()
    .min(1, 'Mínimo 1 minuto')
    .max(120, 'Máximo 120 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCycleSchema>

const MINUTE_PRESETS = [5, 25, 50]

export function Home() {
  const { goals, getCategoryColor } = useGoals()
  const { activeCycle, createNewCycle, interruptCurrentCycle } = useCycles()

  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(
    goals[0]?.id ?? null,
  )
  const [focusGuardEnabled, setFocusGuardEnabled] = useState(true)
  const [selectedPreset, setSelectedPreset] = useState<number | null>(25)

  const { register, handleSubmit, setValue, watch, reset } =
    useForm<NewCycleFormData>({
      resolver: zodResolver(newCycleSchema),
      defaultValues: { task: '', minutesAmount: 25 },
    })

  const minutesAmount = watch('minutesAmount')

  function handleSelectPreset(minutes: number) {
    setSelectedPreset(minutes)
    setValue('minutesAmount', minutes)
  }

  function handleCustomMinutes(value: number) {
    setSelectedPreset(null)
    setValue('minutesAmount', value)
  }

  function handleCreateCycle(data: NewCycleFormData) {
    createNewCycle({
      task: data.task,
      minutesAmount: data.minutesAmount,
      goalId: selectedGoalId,
      focusGuardEnabled,
    })
    reset()
    setSelectedPreset(data.minutesAmount)
  }

  function handleInterrupt() {
    interruptCurrentCycle()
  }

  const selectedGoal = goals.find((g) => g.id === selectedGoalId)

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateCycle)}>
        {/* Task input */}
        <FormSection>
          <SectionLabel>Estou trabalhando em</SectionLabel>
          <TaskInput
            placeholder="Descreva sua tarefa..."
            disabled={!!activeCycle}
            {...register('task')}
          />
        </FormSection>

        {/* Goal selector */}
        <FormSection>
          <SectionLabel>Objetivo</SectionLabel>
          {goals.length === 0 ? (
            <p style={{ color: '#94A3B8', fontSize: '0.875rem' }}>
              Configure suas metas na página Metas primeiro.
            </p>
          ) : (
            <GoalChips>
              {goals.map((goal) => (
                <GoalChip
                  key={goal.id}
                  type="button"
                  $color={getCategoryColor(goal.category)}
                  $active={goal.id === selectedGoalId}
                  disabled={!!activeCycle}
                  onClick={() => setSelectedGoalId(goal.id)}
                >
                  <span>{goal.emoji}</span>
                  {goal.label}
                </GoalChip>
              ))}
            </GoalChips>
          )}
        </FormSection>

        {/* Minutes presets */}
        <FormSection>
          <SectionLabel>Duração</SectionLabel>
          <MinutePresets>
            {MINUTE_PRESETS.map((min) => (
              <PresetButton
                key={min}
                type="button"
                $active={selectedPreset === min}
                disabled={!!activeCycle}
                onClick={() => handleSelectPreset(min)}
              >
                {min}min
              </PresetButton>
            ))}
            <CustomMinutesInput
              type="number"
              min={1}
              max={120}
              placeholder="Custom"
              disabled={!!activeCycle}
              value={
                selectedPreset === null
                  ? minutesAmount || ''
                  : ''
              }
              onChange={(e) => handleCustomMinutes(Number(e.target.value))}
            />
          </MinutePresets>
        </FormSection>

        {/* Countdown */}
        <TimerSection>
          <Countdown />
        </TimerSection>

        {/* Focus Guard toggle */}
        <FocusGuardToggle $enabled={focusGuardEnabled}>
          <ShieldCheck size={18} weight={focusGuardEnabled ? 'fill' : 'regular'} />
          <div>
            <strong>FocusGuard</strong>
            <span>Sair do app por +10s cancela o pomodoro</span>
          </div>
          <ToggleSwitch
            type="button"
            $active={focusGuardEnabled}
            disabled={!!activeCycle}
            onClick={() => setFocusGuardEnabled((v) => !v)}
            aria-label="Alternar FocusGuard"
          />
        </FocusGuardToggle>

        {/* Action button */}
        {activeCycle ? (
          <StopButton type="button" onClick={handleInterrupt}>
            <HandPalm size={20} />
            Interromper
          </StopButton>
        ) : (
          <ActionButton
            type="submit"
            $color={
              selectedGoal
                ? getCategoryColor(selectedGoal.category)
                : undefined
            }
          >
            <Play size={20} />
            Começar
          </ActionButton>
        )}
      </form>
    </HomeContainer>
  )
}
