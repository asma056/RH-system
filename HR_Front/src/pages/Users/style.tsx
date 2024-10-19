import styled from 'styled-components'

export const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  font-size: var(--fontsize-title);
  overflow: scroll;
  overflow-x: hidden;
`
export const UserHeader = styled.div`
  display: flex;
  width: 100%;
  height: 8.5rem;
  padding: 2.5rem;
  align-items: center;
  justify-content: space-between;

  & input[type='text'] {
    display: flex;
    height: 3.5rem;
    width: 26.5rem;

    border-radius: 2.5rem;
    font-size: var(--fontsize-text);
  }

  & input {
    justify-content: space-between;
    border-color: var(--purple);
  }

  & a {
    width: 25%;
  }

  & a button {
    padding: 1rem 0;
    font-size: var(--fontsize-text);
  }
`

export const DivInput = styled.div`
  position: relative;

  & label {
    margin-bottom: 0 !important;
    padding-left: 0 !important;
  }

  & button {
    display: list-item;
  }
`

export const ImgSearch = styled.img`
  position: absolute;
  background: transparent;
  border: none;
  right: 1.5rem;
  top: 25%;
  filter: var(--filter-purple);
`

/* Table Row Style */
export const UserPhoto = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50px;
  margin-right: 1rem;
  margin-left: 2rem;
`
export const RadioInputUser = styled.input`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 60%;
  border: 2px solid var(--gray);
  background-color: var(--red);

  &:checked {
    background-color: var(--green);
  }
`
export const UsernameColumn = styled.td`
  a {
    color: var(--purple);
    display: flex;
    flex-direction: row;
    align-items: center;
    :hover {
      transform: scale(1.02);
    }
  }
`
/* Table Head Style */
export const UsernameHeadTable = styled.th`
  padding-left: 2rem !important;
  text-align: initial !important;
`
export const SituationHeadTable = styled.th`
  width: 15%;

  & input {
    display: none;
  }

  & label {
    padding-left: 0;
    size: 1rem !important;
    cursor: pointer;
  }

  & div {
    position: absolute;
    width: 200%;
    margin-left: 1rem;
    z-index: 5;
    cursor: pointer;
    background: var(--white);
    box-shadow: rgba(139, 139, 139, 0.5) 0px 0px 20px;
    border-radius: 8px;
  }
`

/* Usados nas páginas internas do usuários */

export const ContainerNavigationUser = styled.div`
  padding: 1rem 2.5rem;
`

export const UserContainerDiv = styled.div`
  position: relative;
  width: 83vw;
  height: 85%;
  box-sizing: border-box;
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 1rem 2.5rem;

  border: 1px solid var(--gray);
  border-radius: 8px;
  flex-direction: column;

  @media (max-width: 1890px) {
    width: 78vw;
  }

  @media (max-width: 1590px) {
    width: 75vw;
  }
  @media (max-width: 1200px) {
    width: 73vw;
  }
  @media (max-width: 990px) {
    width: 70vw;
  }
  @media (max-height: 700px) {
    height: 80%;
  }
`
export const UserName = styled.p`
  color: var(--gray);
  font-size: var(--fontsize-title);
  text-align: start;
  width: inherit;
  padding-left: 3rem;
  margin-top: 1rem;
`
