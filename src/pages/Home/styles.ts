import styled, { css } from 'styled-components'

export const HomeContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    width: 100%;
    max-width: 560px;
  }
`

export const FormSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`

export const SectionLabel = styled.label`
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${(props) => props.theme['text-muted']};
`

export const TaskInput = styled.input`
  width: 100%;
  background: ${(props) => props.theme['space-surface']};
  border: 1px solid ${(props) => props.theme['border']};
  border-radius: 10px;
  padding: 0.875rem 1rem;
  color: ${(props) => props.theme['text-primary']};
  font-size: 1rem;
  transition: border-color 0.2s;

  &::placeholder {
    color: ${(props) => props.theme['text-muted']};
  }

  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme['nebula-purple']};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const GoalChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

interface GoalChipProps {
  $color: string
  $active: boolean
}

export const GoalChip = styled.button<GoalChipProps>`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 1rem;
  border-radius: 100px;
  border: 1.5px solid;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  ${(props) =>
    props.$active
      ? css`
          background: ${props.$color}22;
          border-color: ${props.$color};
          color: ${props.$color};
        `
      : css`
          background: transparent;
          border-color: ${(p) => p.theme['border']};
          color: ${(p) => p.theme['text-secondary']};

          &:hover {
            border-color: ${props.$color}88;
            color: ${props.$color};
          }
        `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const MinutePresets = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`

interface PresetButtonProps {
  $active: boolean
}

export const PresetButton = styled.button<PresetButtonProps>`
  padding: 0.5rem 1.125rem;
  border-radius: 8px;
  border: 1.5px solid;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  ${(props) =>
    props.$active
      ? css`
          background: ${(p) => p.theme['nebula-purple']}33;
          border-color: ${(p) => p.theme['nebula-purple']};
          color: ${(p) => p.theme['nebula-purple-light']};
        `
      : css`
          background: transparent;
          border-color: ${(p) => p.theme['border']};
          color: ${(p) => p.theme['text-secondary']};

          &:hover {
            border-color: ${(p) => p.theme['nebula-purple']}88;
            color: ${(p) => p.theme['text-primary']};
          }
        `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const CustomMinutesInput = styled.input`
  width: 90px;
  background: ${(props) => props.theme['space-surface']};
  border: 1.5px solid ${(props) => props.theme['border']};
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  color: ${(props) => props.theme['text-primary']};
  font-size: 0.875rem;
  text-align: center;

  &::placeholder {
    color: ${(props) => props.theme['text-muted']};
  }

  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme['nebula-purple']};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const TimerSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
`

interface FocusGuardToggleProps {
  $enabled: boolean
}

export const FocusGuardToggle = styled.div<FocusGuardToggleProps>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.875rem 1rem;
  border-radius: 10px;
  border: 1px solid
    ${(props) =>
      props.$enabled
        ? `${props.theme['nebula-purple']}55`
        : props.theme['border']};
  background: ${(props) =>
    props.$enabled
      ? `${props.theme['nebula-purple']}11`
      : props.theme['space-surface']};
  transition: all 0.2s;

  svg {
    color: ${(props) =>
      props.$enabled
        ? props.theme['nebula-purple-light']
        : props.theme['text-muted']};
    flex-shrink: 0;
  }

  div {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.125rem;

    strong {
      font-size: 0.875rem;
      color: ${(props) =>
        props.$enabled
          ? props.theme['text-primary']
          : props.theme['text-secondary']};
    }

    span {
      font-size: 0.75rem;
      color: ${(props) => props.theme['text-muted']};
    }
  }
`

interface ToggleSwitchProps {
  $active: boolean
}

export const ToggleSwitch = styled.button<ToggleSwitchProps>`
  width: 40px;
  height: 22px;
  border-radius: 100px;
  border: none;
  cursor: pointer;
  position: relative;
  flex-shrink: 0;
  transition: background 0.2s;
  background: ${(props) =>
    props.$active
      ? props.theme['nebula-purple']
      : props.theme['gray-600']};

  &::after {
    content: '';
    position: absolute;
    top: 3px;
    left: ${(props) => (props.$active ? '21px' : '3px')};
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: white;
    transition: left 0.2s;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

interface ActionButtonProps {
  $color?: string
}

export const ActionButton = styled.button<ActionButtonProps>`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  background: ${(props) => props.$color ?? props.theme['nebula-purple']};
  color: white;

  &:hover {
    filter: brightness(1.15);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

export const StopButton = styled.button`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  background: ${(props) => props.theme['status-danger']};
  color: white;

  &:hover {
    background: ${(props) => props.theme['red-700']};
  }
`
