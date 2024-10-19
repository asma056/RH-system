import { NavLink } from 'react-router-dom'

import { useComponentVisible } from '../../functions/useComponentVisible'

import {
  ActiveItemDropdown,
  DropdownContainer,
  ItemButton,
  ItemDropdown
} from './styles'

export interface NavigationDropdownMenuProps {
  id: string
  title: string
  items: {
    id: string
    route: string
    title: string
  }[]
  activeItemId?: string
  disableMenu?: boolean
}

export function NavigationDropdownMenu({
  id,
  title,
  items,
  activeItemId,
  disableMenu
}: NavigationDropdownMenuProps) {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible<HTMLDivElement>(false)
  const toggleDropdown = () => {
    setIsComponentVisible(!isComponentVisible)
  }
  return (
    <>
      <ItemButton id={id} onClick={toggleDropdown} disabled={disableMenu}>
        {title}
      </ItemButton>
      {isComponentVisible && (
        <DropdownContainer ref={ref}>
          <ul>
            {items.map((item) => (
              <NavLink key={item.id} to={item.route}>
                {item.id === activeItemId ? (
                  <ActiveItemDropdown id={item.id}>
                    {item.title}
                  </ActiveItemDropdown>
                ) : (
                  <ItemDropdown>{item.title}</ItemDropdown>
                )}
              </NavLink>
            ))}
          </ul>
        </DropdownContainer>
      )}
    </>
  )
}
