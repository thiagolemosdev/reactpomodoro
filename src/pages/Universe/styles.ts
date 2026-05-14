import styled, { css, keyframes } from 'styled-components'

const twinkle = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(0.85); }
`

const appear = keyframes`
  from { opacity: 0; transform: scale(0); }
  to { opacity: 1; transform: scale(1); }
`

export const UniverseContainer = styled.main`
  flex: 1;
  padding: 2rem;
  max-width: 1000px;
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

export const SectionTitle = styled.h3`
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${(props) => props.theme['text-muted']};
`

export const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.875rem;
`

interface StatCardProps {
  $highlight?: boolean
}

export const StatCard = styled.div<StatCardProps>`
  background: ${(props) => props.theme['space-surface']};
  border: 1px solid
    ${(props) =>
      props.$highlight
        ? `${props.theme['star-gold']}55`
        : props.theme['border']};
  border-radius: 12px;
  padding: 1.25rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  text-align: center;

  .value {
    font-size: 1.75rem;
    font-weight: 700;
    color: ${(props) =>
      props.$highlight
        ? props.theme['star-gold']
        : props.theme['text-primary']};
    font-family: 'Roboto Mono', monospace;
  }

  .label {
    font-size: 0.75rem;
    color: ${(props) => props.theme['text-muted']};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`

export const LegendRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
`

interface LegendItemProps {
  $color: string
}

export const LegendItem = styled.div<LegendItemProps>`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.8rem;
  color: ${(props) => props.theme['text-secondary']};

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${(props) => props.$color};
    box-shadow: 0 0 6px ${(props) => props.$color};
    flex-shrink: 0;
  }
`

export const SpaceCanvas = styled.div`
  position: relative;
  width: 100%;
  height: 480px;
  background: radial-gradient(
      ellipse at 30% 40%,
      rgba(124, 58, 237, 0.08) 0%,
      transparent 60%
    ),
    radial-gradient(
      ellipse at 70% 70%,
      rgba(37, 99, 235, 0.06) 0%,
      transparent 50%
    ),
    ${(props) => props.theme['space-deep']};
  border: 1px solid ${(props) => props.theme['border']};
  border-radius: 16px;
  overflow: hidden;

  /* subtle nebula clouds */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(
        2px 2px at 15% 25%,
        rgba(255, 255, 255, 0.15) 0%,
        transparent 100%
      ),
      radial-gradient(
        1px 1px at 70% 15%,
        rgba(255, 255, 255, 0.1) 0%,
        transparent 100%
      ),
      radial-gradient(
        1px 1px at 45% 80%,
        rgba(255, 255, 255, 0.12) 0%,
        transparent 100%
      ),
      radial-gradient(
        2px 2px at 85% 50%,
        rgba(255, 255, 255, 0.1) 0%,
        transparent 100%
      ),
      radial-gradient(
        1px 1px at 55% 45%,
        rgba(255, 255, 255, 0.08) 0%,
        transparent 100%
      );
    pointer-events: none;
  }

  @media (max-width: 600px) {
    height: 320px;
  }
`

interface StarProps {
  $x: number
  $y: number
  $size: string
  $color: string
  $glow: string
  $pulse: boolean
}

export const Star = styled.div<StarProps>`
  position: absolute;
  left: ${(props) => props.$x}%;
  top: ${(props) => props.$y}%;
  width: ${(props) => props.$size};
  height: ${(props) => props.$size};
  border-radius: 50%;
  background: ${(props) => props.$color};
  box-shadow: 0 0 ${(props) => props.$glow} ${(props) => props.$color};
  transform: translate(-50%, -50%);
  cursor: pointer;
  animation: ${appear} 0.4s ease;

  ${(props) =>
    props.$pulse &&
    css`
      animation: ${appear} 0.4s ease, ${twinkle} 3s ease-in-out infinite;
    `}

  &:hover > div {
    opacity: 1;
    pointer-events: auto;
    transform: translate(-50%, calc(-100% - 10px)) scale(1);
  }
`

export const StarTooltip = styled.div`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translate(-50%, calc(-100% - 10px)) scale(0.8);
  background: rgba(11, 11, 36, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.625rem 0.875rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s, transform 0.15s;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 0.125rem;

  strong {
    font-size: 0.8rem;
    color: ${(props) => props.theme['text-primary']};
    max-width: 160px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span {
    font-size: 0.7rem;
    color: ${(props) => props.theme['text-muted']};
  }
`

export const EmptyUniverse = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  height: 300px;
  background: ${(props) => props.theme['space-deep']};
  border: 1px solid ${(props) => props.theme['border']};
  border-radius: 16px;
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
