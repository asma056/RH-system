import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  input,
  textarea {
    min-width: 26.5rem !important;
    max-width: 33.5rem;
    resize: vertical;
  }
  & label:first-child {
    margin-bottom: 1rem;
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
