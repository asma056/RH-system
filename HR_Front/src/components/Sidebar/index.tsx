import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import Logo from '../../assets/img/logo.png'
import LogoName from '../../assets/img/logo-name.png'
import BackArrows from '../../assets/icons/back-arrows.svg'

import Title from './Title'
import {
  SidebarItems,
  SidebarItemsProps,
  SidebarLogoutConfiguration
} from './data/items'

import {
  Container,
  SidebarList,
  HideIcon,
  LogoContainer,
  SidebarLists,
  SidebarItemContainer,
  HideIconContainer
} from './styles'

interface PageProps {
  icon?: string
  title?: string
}

const SidebarItem = ({
  path,
  src,
  alt,
  title,
  style,
  id,
  isActive
}: SidebarItemsProps) => {
  return (
    <NavLink to={path}>
      <SidebarItemContainer isActive={isActive}>
        <li>
          <button type="button" id={id}>
            <img src={src} alt={alt} style={style} />
            <span>{title}</span>
          </button>
        </li>
      </SidebarItemContainer>
    </NavLink>
  )
}

const Sidebar = ({ icon, title }: PageProps) => {
  const [active, setActive] = useState(true)
  const location = useLocation()
  const role = localStorage.getItem('@3035TECH/role')
  const filteredSidebarItems = SidebarItems.filter(item => {
    // Check if the item is the "Usuários" (Users) page button and the user's role is EMPLOYEE
    return !(item.id === 'buttonUsersPage' && role === 'EMPLOYEE');
  });
  return (
    <Container sidebar={active}>
      <NavLink to="/home">
        <LogoContainer sidebar={active}>
          <img src={Logo} alt="Logo" />
          <img src={LogoName} alt="Logo escrita" />
        </LogoContainer>
      </NavLink>
      <HideIconContainer sidebar={active}>
        <HideIcon
          onClick={() => setActive(!active)}
          id="buttonAnimationSidebar"
        >
          <img src={BackArrows} alt="Ícone de voltar" />
        </HideIcon>
      </HideIconContainer>
      <Title title={title} icon={icon} sidebar={active} />
      <SidebarLists>
        <SidebarList>
        {filteredSidebarItems.map((item) => {
    const isActive = location.pathname.includes(item.path)
    return <SidebarItem {...item} key={item.id} isActive={isActive} />
  })}
        </SidebarList>
        <SidebarList>
          {SidebarLogoutConfiguration.map((item) => {
            const isActive = location.pathname.includes(item.path)
            return <SidebarItem {...item} key={item.id} isActive={isActive} />
          })}
        </SidebarList>
      </SidebarLists>
    </Container>
  )
}
export { Sidebar }
