import { NavLink } from 'react-router-dom'

import { ActiveItemButton, ItemButton } from './styles'

export interface NavigationItemButtonsProps {
  items: {
    id: string
    route: string
    title: string
  }[]
  activeItemId?: string
  disableMenu?: boolean
}

export function NavigationItemButtons({
  items,
  activeItemId,
  disableMenu
}: NavigationItemButtonsProps) {
  return (
    <>
      {items.map((item) => {
        return (
          <NavLink key={item.id} to={item.route}>
            {item.id === activeItemId ? (
              <ActiveItemButton id={item.id}>{item.title}</ActiveItemButton>
            ) : (
              <ItemButton
                id={item.id}
                disabled={item.title === 'Todos' ? false : disableMenu}
              >
                {item.title}
              </ItemButton>
            )}
          </NavLink>
        )
      })}
    </>
  )
}
