import styled from 'styled-components'

interface imgProps {
  disabled: boolean
}

export const EmployeesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  font-size: var(--fontsize-text);
  overflow-x: hidden;
`

export const EmployeesHeader = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  z-index: 2;
  flex-direction: column;
  width: 100%;
  height: auto;
  padding: 1rem 2.5rem;
  background-color: var(--background);
  box-shadow: rgba(139, 139, 139, 0.3) 0px -1px 10px 0px inset;
`

export const NavigationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 1rem;
`

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  label {
    margin-bottom: 0;
    padding-left: 0;
  }
  input,
  button {
    display: flex;
    height: 3.5rem;

    img {
      padding-right: 0.5rem;
    }
  }
  button {
    width: 22rem;
    align-self: flex-end;
    justify-content: center;
    align-items: center;
    font-size: var(--fontsize-text);
  }
`

export const DivInput = styled.div`
  position: relative;

  button {
    display: list-item;
    width: 2rem;
    height: var(--fontsize-text);
  }
  input {
    width: 30rem;
    justify-content: space-between;
    border-color: var(--purple);
  }
`

export const SearchButton = styled.button`
  position: absolute;
  left: 90%;
  top: 27%;
  background: transparent;
  border: none;
`

export const ImgSearch = styled.img`
  filter: var(--filter-purple);
`
export const PositionFuctionColumn = styled.td`
  width: 15%;
`
export const PositionDateColumn = styled.td`
  width: 25%;
`

/* Table Row Style */
export const EmployeesPhoto = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50px;
  margin-right: 1rem;
  margin-left: 2rem;
`
export const RadioInputEmployee = styled.input`
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
export const EmployeesNameColumn = styled.td`
  cursor: pointer;
  display: flex;
  align-items: center;
  color: var(--purple);
  :hover {
    transform: scale(1.025);
  }
`
export const DivTable = styled.div`
  overflow-y: auto;
`

/* Table Head Style */
export const UsernameHeadTable = styled.th`
  padding-left: 2rem !important;
  text-align: initial !important;

  & button {
    background: transparent;
    border: none;
    color: var(--purple);
    font-size: var(--fontsize-subTitle);
    text-align: justify;
    font-family: 'Prompt', sans-serif;
  }
`
export const SituationHeadTable = styled.th`
  width: 15%;

  & input {
    display: none;
  }

  & label {
    padding-left: 0;
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

// Styles usados nas páginas internas

export const ContainerEmloyee = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  font-size: var(--fontsize-text);
`
export const DivForm = styled.div`
  margin: 0 2.5rem 2rem 2.5rem;
`
export const EmployeesFormHeader = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 2.5rem 0px;
  z-index: 1;
  background-color: var(--background);
`
export const RadioInputButtonDocuments = styled.input`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 60%;
  border: 2px solid var(--gray);
  background-color: transparent;

  &:checked {
    background-color: var(--purple);
  }
`
export const DocumentsHeadTable = styled.tr`
  th {
    :first-child {
      text-align: start !important;
      padding-left: 2.5rem !important;
    }

    :last-child {
      display: flex;
      align-items: center;
      justify-content: center;

      button {
        border: none;
        background-color: transparent;

        img {
          height: 1.5rem;
          padding: 0 1rem;
        }
      }
    }
  }
`
export const DocumentsBodyTableName = styled.td`
  display: flex;
  text-align: center;

  img {
    padding: 0 1rem 0 2.5rem;
  }
`
export const DocumentsBobyTableButtons = styled.td`
  width: 15%;
`
export const OverlayDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.6);
  z-index: 2;
  pointer-events: auto;
`
export const DocumentsIcons = styled.img<imgProps>`
  ${({ disabled }) => (disabled ? '' : 'filter: var(--filter-purple)')}
`
