import styled, { css, keyframes } from 'styled-components'

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
`

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
`

interface CountdownContainerProps {
  $isActive: boolean
  $isFailing: boolean
}

export const CountdownContainer = styled.div<CountdownContainerProps>`
  font-family: 'Roboto Mono', monospace;
  font-size: 7rem;
  line-height: 1;
  color: ${(props) => props.theme['text-primary']};
  display: flex;
  gap: 0.5rem;
  align-items: center;

  span {
    background: ${(props) => props.theme['space-surface']};
    border: 1px solid ${(props) => props.theme['border']};
    padding: 1.25rem 0.875rem;
    border-radius: 10px;
    min-width: 5rem;
    text-align: center;
    transition: border-color 0.3s, box-shadow 0.3s;

    ${(props) =>
      props.$isActive &&
      !props.$isFailing &&
      css`
        border-color: ${(p) => p.theme['border-active']};
        box-shadow: 0 0 20px ${(p) => p.theme['nebula-purple']}33;
      `}

    ${(props) =>
      props.$isFailing &&
      css`
        border-color: ${(p) => p.theme['status-danger']}88;
        box-shadow: 0 0 20px ${(p) => p.theme['status-danger']}33;
        animation: ${shake} 0.3s ease;
      `}
  }

  @media (max-width: 600px) {
    font-size: 4.5rem;

    span {
      min-width: 3.25rem;
      padding: 1rem 0.625rem;
    }
  }
`

interface SeparatorProps {
  $isActive: boolean
}

export const Separator = styled.div<SeparatorProps>`
  color: ${(props) =>
    props.$isActive
      ? props.theme['nebula-purple-light']
      : props.theme['text-muted']};
  font-size: 6rem;
  line-height: 1;
  padding: 0 0.25rem;
  margin-top: -0.25rem;

  ${(props) =>
    props.$isActive &&
    css`
      animation: ${pulse} 2s ease-in-out infinite;
    `}
`

interface FocusWarningBannerProps {
  $danger: boolean
}

export const FocusWarningBanner = styled.div<FocusWarningBannerProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;

  ${(props) =>
    props.$danger
      ? css`
          background: ${(p) => p.theme['status-danger']}22;
          border: 1px solid ${(p) => p.theme['status-danger']}66;
          color: ${(p) => p.theme['status-danger']};
        `
      : css`
          background: ${(p) => p.theme['status-warning']}22;
          border: 1px solid ${(p) => p.theme['status-warning']}66;
          color: ${(p) => p.theme['status-warning']};
        `}
`
