import { HeaderContainer, Logo, NavIcon } from './styles'
import { Timer, Target, Planet, Scroll } from 'phosphor-react'
import { NavLink } from 'react-router-dom'

export function Header() {
  return (
    <HeaderContainer>
      <Logo>
        <Planet size={28} weight="fill" />
        <span>CosmicFocus</span>
      </Logo>
      <nav>
        <NavLink to="/" end title="Timer">
          <NavIcon>
            <Timer size={20} />
            <span>Timer</span>
          </NavIcon>
        </NavLink>
        <NavLink to="/goals" title="Metas">
          <NavIcon>
            <Target size={20} />
            <span>Metas</span>
          </NavIcon>
        </NavLink>
        <NavLink to="/universe" title="Universo">
          <NavIcon>
            <Planet size={20} />
            <span>Universo</span>
          </NavIcon>
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <NavIcon>
            <Scroll size={20} />
            <span>Histórico</span>
          </NavIcon>
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
