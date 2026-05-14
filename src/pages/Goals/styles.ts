import styled, { css } from 'styled-components'

export const GoalsContainer = styled.main`
  flex: 1;
  padding: 2rem;
  max-width: 760px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

export const PageHeader = styled.div`
  h1 {
    font-size: 1.75rem;
    font-weight: 700;
    color: ${(props) => props.theme['text-primary']};
    margin-bottom: 0.375rem;
  }

  p {
    color: ${(props) => props.theme['text-secondary']};
    font-size: 0.9rem;
  }
`

export const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: ${(props) => props.theme['text-muted']};
  margin-bottom: 0.25rem;
`

export const ScheduleCard = styled.div`
  background: ${(props) => props.theme['space-surface']};
  border: 1px solid ${(props) => props.theme['border']};
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const ScheduleRow = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;

  > div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: ${(props) => props.theme['text-secondary']};
    font-size: 0.9rem;

    svg {
      color: ${(props) => props.theme['star-gold']};
    }
  }
`

export const ScheduleInput = styled.input`
  background: ${(props) => props.theme['space-mid']};
  border: 1px solid ${(props) => props.theme['border']};
  border-radius: 8px;
  padding: 0.375rem 0.625rem;
  color: ${(props) => props.theme['text-primary']};
  font-size: 0.9rem;
  font-family: 'Roboto Mono', monospace;

  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme['nebula-purple']};
  }
`

export const GoalsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

interface GoalCardProps {
  $color: string
}

export const GoalCard = styled.div<GoalCardProps>`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: ${(props) => props.theme['space-surface']};
  border: 1px solid ${(props) => props.theme['border']};
  border-left: 3px solid ${(props) => props.$color};
  border-radius: 12px;
  padding: 1rem 1.25rem;
  transition: border-color 0.2s;

  &:hover {
    border-color: ${(props) => props.$color}88;
    border-left-color: ${(props) => props.$color};
  }

  @media (max-width: 600px) {
    flex-wrap: wrap;
  }
`

export const GoalCardLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 160px;

  .emoji {
    font-size: 1.5rem;
    line-height: 1;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    strong {
      font-size: 0.9rem;
      color: ${(props) => props.theme['text-primary']};
    }
  }
`

interface CategoryBadgeProps {
  $color: string
}

export const CategoryBadge = styled.span<CategoryBadgeProps>`
  font-size: 0.7rem;
  font-weight: 600;
  color: ${(props) => props.$color};
  background: ${(props) => props.$color}22;
  padding: 0.125rem 0.5rem;
  border-radius: 100px;
  width: fit-content;
`

export const GoalCardProgress = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .numbers {
    display: flex;
    align-items: baseline;
    gap: 0.25rem;
    font-size: 0.8rem;

    .completed {
      color: ${(props) => props.theme['text-primary']};
      font-weight: 600;
    }

    .separator, .target {
      color: ${(props) => props.theme['text-muted']};
    }

    .percent {
      margin-left: auto;
      color: ${(props) => props.theme['text-secondary']};
      font-weight: 500;
    }
  }
`

export const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: ${(props) => props.theme['space-mid']};
  border-radius: 3px;
  overflow: hidden;
`

interface ProgressFillProps {
  $percent: number
  $color: string
}

export const ProgressFill = styled.div<ProgressFillProps>`
  height: 100%;
  width: ${(props) => props.$percent}%;
  background: ${(props) => props.$color};
  border-radius: 3px;
  transition: width 0.4s ease;

  ${(props) =>
    props.$percent >= 100 &&
    css`
      box-shadow: 0 0 8px ${props.$color};
    `}
`

export const GoalActions = styled.div`
  display: flex;
  gap: 0.375rem;
`

export const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid transparent;
  background: transparent;
  color: ${(props) => props.theme['text-muted']};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${(props) => props.theme['status-danger']}22;
    border-color: ${(props) => props.theme['status-danger']}55;
    color: ${(props) => props.theme['status-danger']};
  }
`

export const AddGoalForm = styled.form`
  background: ${(props) => props.theme['space-surface']};
  border: 1px solid ${(props) => props.theme['border']};
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

interface FormRowProps {
  $gap?: string
}

export const FormRow = styled.div<FormRowProps>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.$gap ?? '0.5rem'};
`

export const FormInput = styled.input`
  background: ${(props) => props.theme['space-mid']};
  border: 1px solid ${(props) => props.theme['border']};
  border-radius: 8px;
  padding: 0.75rem 1rem;
  color: ${(props) => props.theme['text-primary']};
  font-size: 0.9rem;

  &::placeholder {
    color: ${(props) => props.theme['text-muted']};
  }

  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme['nebula-purple']};
  }
`

export const FormSelect = styled.select`
  background: ${(props) => props.theme['space-mid']};
  border: 1px solid ${(props) => props.theme['border']};
  border-radius: 8px;
  padding: 0.75rem 1rem;
  color: ${(props) => props.theme['text-primary']};
  font-size: 0.9rem;
  cursor: pointer;

  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme['nebula-purple']};
  }

  option {
    background: ${(props) => props.theme['space-mid']};
  }
`

export const MinutesRow = styled.div`
  display: flex;
  gap: 0.375rem;
  flex-wrap: wrap;
`

interface QuickMinutesProps {
  $active: boolean
  $color: string
}

export const QuickMinutes = styled.button<QuickMinutesProps>`
  padding: 0.375rem 0.875rem;
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: 1.5px solid;

  ${(props) =>
    props.$active
      ? css`
          background: ${props.$color}33;
          border-color: ${props.$color};
          color: ${props.$color};
        `
      : css`
          background: transparent;
          border-color: ${(p) => p.theme['border']};
          color: ${(p) => p.theme['text-secondary']};

          &:hover {
            border-color: ${props.$color}88;
          }
        `}
`

interface AddButtonProps {
  $color: string
}

export const AddButton = styled.button<AddButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  border-radius: 10px;
  border: none;
  background: ${(props) => props.$color};
  color: white;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: filter 0.2s;

  &:hover {
    filter: brightness(1.15);
  }
`

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 3rem 1rem;
  text-align: center;

  span {
    font-size: 3rem;
  }

  p {
    color: ${(props) => props.theme['text-secondary']};
    font-size: 1rem;
  }

  small {
    color: ${(props) => props.theme['text-muted']};
    font-size: 0.85rem;
  }
`
