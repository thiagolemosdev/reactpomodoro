import styled, { css } from 'styled-components'

export const HistoryContainer = styled.main`
  flex: 1;
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  h1 {
    font-size: 1.75rem;
    font-weight: 700;
    color: ${(props) => props.theme['text-primary']};
  }
`

export const HistoryList = styled.div`
  flex: 1;
  overflow: auto;
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme['border']};

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 520px;

    th {
      background: ${(props) => props.theme['space-surface']};
      padding: 0.875rem 1rem;
      text-align: left;
      color: ${(props) => props.theme['text-muted']};
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      font-weight: 600;

      &:first-child {
        padding-left: 1.5rem;
        border-radius: 12px 0 0 0;
      }

      &:last-child {
        padding-right: 1.5rem;
        border-radius: 0 12px 0 0;
      }
    }

    td {
      background: ${(props) => props.theme['space-mid']};
      border-top: 1px solid ${(props) => props.theme['border']};
      padding: 0.875rem 1rem;
      font-size: 0.875rem;
      color: ${(props) => props.theme['text-secondary']};
      line-height: 1.5;

      &:first-child {
        padding-left: 1.5rem;
        color: ${(props) => props.theme['text-primary']};
        width: 45%;
      }

      &:last-child {
        padding-right: 1.5rem;
      }
    }

    tr:hover td {
      background: ${(props) => props.theme['space-surface']};
    }
  }
`

type StatusColor = 'green' | 'yellow' | 'red'

interface StatusProps {
  $color: StatusColor
}

const STATUS_THEME_MAP = {
  green: 'status-success',
  yellow: 'status-warning',
  red: 'status-danger',
} as const

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;

  &::before {
    content: '';
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${(props) => props.theme[STATUS_THEME_MAP[props.$color]]};
    box-shadow: 0 0 6px ${(props) => props.theme[STATUS_THEME_MAP[props.$color]]};
    flex-shrink: 0;
  }
`

interface GoalTagProps {
  $color: string
}

export const GoalTag = styled.span<GoalTagProps>`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.7rem;
  font-weight: 600;
  color: ${(props) => props.$color};
  background: ${(props) => props.$color}22;
  padding: 0.1rem 0.5rem;
  border-radius: 100px;
  width: fit-content;
`

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  padding: 4rem 1rem;
  text-align: center;

  span {
    font-size: 3rem;
    opacity: 0.4;
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
