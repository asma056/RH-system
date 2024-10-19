import styled from 'styled-components'

export const EmployeesContainerBody = styled.div`
  transform: translateY(1rem);
  width: 95%;
  padding: 2.5rem;
  box-shadow: 0px 0px 20px rgba(139, 139, 139, 0.5);
  margin-bottom: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`
export const InfoContainerDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 65%;

  & div:last-child {
    margin-left: 20%;
    transform: translateY(-10px);
  }
`
export const FirstDiv = styled.div`
  width: 25%;

  & label {
    margin: 0;
    padding: 0;
  }
`
export const SecondDiv = styled.div`
  width: 65%;
`
export const Label = styled.h4`
  letter-spacing: 0.15px;
  font-size: var(--fontsize-text);
  color: var(--purple);
  font-weight: normal;
`
export const Info = styled.p`
  letter-spacing: 0.15px;
  font-size: var(--fontsize-text);
  color: var(--gray);
  font-weight: normal;
  margin: 1rem 0;
`
export const Form = styled.form`
  margin: 3rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem 3rem;
  width: 100%;

  & label {
    margin: 0;
    padding: 0;
  }

  & label:last-child div {
    cursor: pointer;
    background: var(--white);
    border-radius: 30px;
    width: -webkit-fill-available;
    box-sizing: border-box;
    & input::placeholder {
      padding: 2rem 0.5rem;
      text-align: initial;
      letter-spacing: 1.25px;
      opacity: 0.5;
    }
  }

  & label div ul {
    color: var(--gray);
    width: 100%;
  }

  & label div ul li {
    display: flex;
    text-align: initial;
    list-style: none;
    border-radius: 0.5rem;
    padding: 1rem 2rem;

    :hover {
      background-color: var(--gray-light);
      color: var(--gray);
      box-shadow: rgba(139, 139, 139, 0.5) 0px 0px 2px;
      border-radius: 30px;
    }
  }
`
export const DivButtonSave = styled.div`
  width: 80%;
`

export const InputDivForm = styled.div`
  & label {
    margin: 0;
    padding: 0;
  }
  & p:first-child {
    margin: 0 1rem 0 0;
  }
`

export const GridInputDiv = styled.div`
  display: flex;
  align-items: center;

  & p {
    margin: 1rem;
  }
`
