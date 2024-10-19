import styled from 'styled-components'

interface BottomButtonProps {
  invertColor: boolean
  disabled?: boolean
}

export const DivSelect = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 2rem;
  justify-items: start;
  align-items: center;
  width: 100%;
`

export const DivTopButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  button:first-child {
    margin-right: 2rem;
  }
  & button {
    & img {
      width: 1.125rem;
      height: 1.125rem;
      margin: auto;
    }
  }
`

export const DivBottomButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: -webkit-fill-available;
  margin-top: 1rem;
  button:first-child {
    margin-right: 3rem;
  }
`

export const BottomButton = styled.button<BottomButtonProps>`
  display: flex;
  flex-direction: row !important;
  width: 17rem;
  height: 3.5rem;
  align-items: center;
  justify-content: center;
  outline: none;
  border-radius: 40px;
  border: 1px solid var(--purple);
  font-weight: 600;
  padding: 1.5rem 0;
  font-size: var(--fontsize-text);
  background-color: var(--purple);
  color: var(--white);
  ${({ invertColor }) =>
    invertColor && `background-color: var(--white); color: var(--purple);`}
  :hover {
    background-color: var(--white);
    color: var(--purple);
    ${({ invertColor }) =>
      invertColor && `background-color: var(--purple); color: var(--white);`}
    img {
      filter: var(--filter-purple);
    }
  }
  img {
    width: 1.125rem;
    height: 1.125rem;
    margin-right: 1rem;
    filter: var(--filter-white);
  }
  ${({ disabled }) =>
    disabled &&
    `
      color: var(--gray);
      border: 1px solid var(--gray);
      background-color: var(--white);
      color: var(--gray);
      img {
        filter: invert(54%) sepia(0%) saturate(0%) hue-rotate(143deg) brightness(101%) contrast(90%);
        }
      :hover {
      color: var(--gray);
      img {
        filter: invert(54%) sepia(0%) saturate(0%) hue-rotate(143deg) brightness(101%) contrast(90%);
        }`}
`
