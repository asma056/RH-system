import styled from 'styled-components'

export const EmployeesFormBody = styled.form`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  padding: 2rem;
  box-shadow: 0px 0px 8px rgba(139, 139, 139, 0.5);
  align-items: center;
  justify-content: space-between;

  & button {
    display: flex;
    flex-direction: column;
    justify-self: end;
    font-weight: 600;
    align-items: center;
    justify-content: center;
  }
`

export const SendDocsButton = styled.button`
  height: 3.5rem;
  width: 17rem;
  padding: 1rem 1.75rem;
  font-size: var(--fontsize-text);
  color: var(--white);
  background-color: var(--purple);
  border: 1px solid var(--purple);
  border-radius: 2.5rem;
  &:hover {
    color: var(--purple);
    background-color: var(--white);
    border-color: var(--purple);
  }
`

export const SaveButton = styled.button`
  height: 5rem;
  width: 35rem;
  font-size: var(--fontsize-title);
  color: var(--purple);
  background-color: var(--white);
  border: 1px solid var(--purple);
  border-radius: 2.5rem;
  &:hover {
    color: var(--white);
    background-color: var(--purple);
  }
`

export const WarningText = styled.span`
  display: flex;
  margin-top: 2.5rem;
  font-weight: 400;
  font-size: var(--fontsize-text);
  color: var(--red);
`

export const DivInput = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 7rem;
  grid-row-gap: 1rem;
  width: 100%;
  margin-bottom: 1rem;

  input,
  select {
    max-height: 4.5rem;
  }
  label {
    margin-bottom: 0;
    padding-left: 0;
  }
`
export const DivSelect = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 1rem;
  justify-items: start;
  align-items: center;
  width: 100%;
  input,
  li {
    font-weight: 400;
    font-size: var(--fontsize-text);
    padding: 0.5rem 1rem;
    height: 2.6rem;
    width: 10rem;
  }
  span {
    display: none;
  }
  div {
    grid-column-start: 1;
    grid-row-start: 1;
    grid-row-end: 3;
  }
`

export const DivPerfilPhoto = styled.div`
  position: relative;
  align-self: baseline;
  width: 7.125rem;
  height: 7.125rem;
`

export const PerfilPhoto = styled.img`
  width: 7.125rem;
  height: 7.125rem;
  border-radius: 50%;
`

export const AddPhotoButton = styled.div`
  position: absolute;
  display: flex;
  height: 1.5rem;
  width: 2.25rem;
  border-radius: 7.5px 2.5px 8.75px;
  align-items: center;
  justify-content: center;
  right: 0;
  bottom: 0.5rem;
  border: none;
`

export const AddPhoto = styled.img`
cursor: pointer;
  filter: var(--filter-purple);
`

export const DivButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: -webkit-fill-available;
  margin-top: 1rem;

  & button {
    width: 45%;
  }
`

export const OverlayDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.6);
  z-index: 3;
  pointer-events: auto;
`
