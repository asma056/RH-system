import { NavigationDropdownMenu } from './dropdownMenu'
import { NavigationItemButtons } from './itemButton'

import { NavBarContainer } from './styles'

export interface NavigationBarProps {
  buttonItems: {
    id: string
    route: string
    title: string
  }[]
  id: string
  title: string
  dropdownItems: {
    id: string
    route: string
    title: string
  }[]
  activeItemId?: string
  disableMenu?: boolean
}

export function NavigationBar({
  buttonItems,
  id,
  title,
  dropdownItems,
  activeItemId,
  disableMenu
}: NavigationBarProps) {
  return (
    <NavBarContainer>
      <NavigationItemButtons
        items={buttonItems}
        activeItemId={activeItemId}
        disableMenu={disableMenu}
      />
    
    </NavBarContainer>
  )
}
