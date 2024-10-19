import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

export const InputGroup = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  input {
    min-width: 26.5rem;
    max-width: 33.5rem;
  }
`

export const EditButtonContainer = styled.div`
  position: absolute;
  display: flex;
  right: 0;
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
