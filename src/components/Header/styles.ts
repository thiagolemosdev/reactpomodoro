import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 2rem;
  border-bottom: 1px solid ${(props) => props.theme['border']};
  background: rgba(6, 6, 26, 0.7);
  backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
  z-index: 100;

  nav {
    display: flex;
    gap: 0.25rem;

    a {
      color: ${(props) => props.theme['text-secondary']};
      text-decoration: none;
      border-radius: 8px;
      transition: color 0.2s, background 0.2s;
      padding: 0.5rem 0.875rem;

      &:hover {
        color: ${(props) => props.theme['text-primary']};
        background: rgba(124, 58, 237, 0.15);
      }

      &.active {
        color: ${(props) => props.theme['nebula-purple-light']};
        background: rgba(124, 58, 237, 0.2);
      }
    }
  }
`

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  color: ${(props) => props.theme['nebula-purple-light']};
  font-weight: 700;
  font-size: 1.125rem;
  letter-spacing: 0.5px;

  svg {
    color: ${(props) => props.theme['star-gold']};
  }
`

export const NavIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  font-weight: 500;
`
