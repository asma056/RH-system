import styled from 'styled-components'

interface SidebarProps {
  sidebar: boolean
}

interface IsActive {
  isActive: boolean
}

export const Container = styled.aside<SidebarProps>`
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  margin: 0;
  top: 0;
  left: 0px;
  width: 21.25rem;
  height: 100vh;
  background-color: var(--purple);
  ${({ sidebar }) =>
    sidebar
      ? `animation: showSidebar 0.5s ease forwards;`
      : `animation: hiddenSidebar 0.5s ease forwards;`}
  align-items: center;

  button {
    margin: 1rem 2rem;
    font-size: var(--fontsize-title);
    padding: 0;
    background-color: rgb(0, 0, 0, 0);
    align-items: start;
    justify-content: space-between;
    color: var(--purple-opaque);
    border: 0;
    cursor: pointer;
    ${({ sidebar }) =>
      sidebar
        ? `animation: showText 0.4s ease forwards;`
        : `animation: hideText 0.4s ease forwards;`}
    img {
      width: ${({ sidebar }) => (sidebar ? '1.25rem' : '1.7rem')};
      height: ${({ sidebar }) => (sidebar ? '1.25rem' : '1.7rem')};
      margin-right: 0.5rem;
      cursor: pointer;
      filter: var(--filter-purple-opaque);
    }
  }

  @keyframes showText {
    from {
      font-size: 0;
      align-items: center;
      margin-left: calc(50% - 0.75rem);
      margin-right: calc(50% - 0.75rem);
    }
    to {
      font-size: var(--fontsize-title);
      align-items: start;
      margin: 1rem 2rem;
    }
  }
  @keyframes hideText {
    from {
      font-size: var(--fontsize-title);
      align-items: start;
      margin: 1rem 2rem;
    }
    to {
      font-size: 0;
      align-items: center;
      margin-left: calc(50% - 0.75rem);
      margin-right: calc(50% - 0.75rem);
    }
  }

  @keyframes hiddenSidebar {
    from {
      width: 21.25rem;
      align-items: center;
    }
    to {
      width: 10.125rem;
      align-items: center;
    }
  }
  @keyframes showSidebar {
    from {
      width: 10.125rem;
      align-items: center;
    }
    to {
      width: 21.25rem;
      align-items: center;
    }
  }

  @keyframes hide {
    from {
      width: 10rem;
    }
    to {
      width: 0%;
    }
  }
  @keyframes show {
    from {
      width: 0%;
    }
    to {
      width: 10rem;
    }
  }
`

export const LogoContainer = styled.div<SidebarProps>`
  display: flex;
  flex-direction: column;
  margin: 2rem auto;
  justify-content: center;
  align-items: center;
  img:first-child {
    width: 5.75rem;
  }
  img:last-child {
    width: 10rem;
    ${({ sidebar }) =>
      sidebar
        ? `animation: show-text 0.7s ease forwards;`
        : `animation: hide-text 0.7s ease forwards;`}
  }

  @keyframes hide-text {
    from {
      width: 10rem;
    }
    to {
      width: 0%;
    }
  }
  @keyframes show-text {
    from {
      width: 0%;
    }
    to {
      width: 10rem;
    }
  }
`

export const TitleContainer = styled.div<SidebarProps>`
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: var(--purple);
  margin: 1.75rem 0rem;
  ${({ sidebar }) =>
    sidebar
      ? `animation: shiftRight 0.5s ease forwards;`
      : `animation: shiftLeft 0.5s ease forwards;`}

  & h1 {
    width: 20rem;
  }

  @keyframes shiftRight {
    from {
      margin-left: 45rem;
    }
    to {
      margin-left: 50rem;
    }
  }
  @keyframes shiftLeft {
    from {
      margin-left: 50rem;
    }
    to {
      margin-left: 45rem;
    }
  }
`

export const HideIcon = styled.button`
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 100%;
  border-color: var(--purple);
  border-style: solid;
  background-color: var(--white);
  cursor: pointer;
  z-index: 4;
`

export const HideIconContainer = styled.div<SidebarProps>`
  position: absolute;
  display: flex;
  align-self: flex-end;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 100%;
  border-color: var(--purple);
  border-style: solid;
  background-color: var(--white);
  top: calc(4.75rem);
  right: -1.25rem;
  cursor: pointer;
  z-index: 2;

  button {
    margin: 0;
    ${({ sidebar }) =>
      sidebar
        ? `animation: rotateRight 0.5s ease forwards;`
        : `animation: rotateLeft 0.5s ease forwards;`}
    img {
      margin-top: 0.5rem;
      margin-left: 0.65rem;
      width: 0.75rem;
      filter: invert(8%) sepia(57%) saturate(4907%) hue-rotate(273deg)
        brightness(82%) contrast(107%);
    }
  }
  @keyframes rotateRight {
    from {
      transform: rotate(180deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
  @keyframes rotateLeft {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(180deg);
    }
  }
`

export const SidebarLists = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;
  width: 100%;
  height: calc(100vh - 9.9375rem);
  margin: 0;
  padding: 0;
`

export const SidebarItemContainer = styled.div<IsActive>`
  & span {
    font-size: var(--fontsize-title);
  }
  ${({ isActive }) =>
    isActive &&
    `
  li {
    background-color: var(--purple-opaque);
    button {
      color: var(--purple);
    }
    img {
      filter: var(--filter-purple);
    }
  }
  `}
`

export const Icon = styled.img`
  width: 1.5rem;
  margin-right: 1rem;
  filter: var(--filter-purple);
`

export const TitlePage = styled.h1`
  font-size: var(--fontsize-title);
  color: var(--purple);
  font-weight: 400;
`

export const SidebarList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: left;

  li:hover {
    background-color: var(--purple-opaque);
    button {
      color: var(--purple);
    }
    img {
      filter: var(--filter-purple);
    }
  }
`
