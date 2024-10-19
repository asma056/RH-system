import styled from 'styled-components'

export const NavBarContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 3rem;
  justify-content: space-between;
  align-items: center;
  button:first-child {
    margin-left: -1rem;
  }
  button {
    display: flex;
    border-radius: 2.5rem;
    color: var(--purple);
    font-size: var(--fontsize-title);
    border: none;
  }
`

export const ItemButton = styled.button`
  padding: 0.125rem 1rem;
  background-color: var(--white);
  :hover {
    background-color: var(--purple-opaque);
  }
`

export const ActiveItemButton = styled.button`
  padding: 0.125rem 1rem;
  background-color: var(--purple-opaque);
`

export const DropdownContainer = styled.div`
  position: absolute;
  top: 27%;
  right: 2%;
  background: var(--white);
  box-shadow: 0px 0px 20px rgba(139, 139, 139, 0.5);
  border-radius: 8px;
  z-index: 3;
`

export const ItemDropdown = styled.li`
  display: flex;
  padding: 0.5rem 2.5rem;
  text-align: left;
  list-style: none;
  border-radius: 8px;
  color: var(--purple);
  :hover {
    color: var(--white);
    background-color: var(--purple);
  }
`

export const ActiveItemDropdown = styled.li`
  display: flex;
  padding: 0.5rem 2.5rem;
  text-align: left;
  list-style: none;
  border-radius: 8px;
  color: var(--white);
  background-color: var(--purple);
`
