import styled from 'styled-components'

interface InputProps {
  error?: boolean
}

export const InputText = styled.textarea<InputProps>`
  width: 100%;
  height: 20rem;
  background-color: var(--white);
  border-radius: 40px;
  border: 1px solid;
  color: var(--purple);
  outline: none;
  display: block;

  height: 15rem;

  font-size: var(--fontsize-title);
  padding: 1.6rem 1.5rem;
  text-align: initial;
  letter-spacing: 1.25px;
  margin: 0.5rem 0;
  &::placeholder {
    font-size: 1.25rem;
    text-align: initial;
    letter-spacing: 1.25px;
    opacity: 0.5;
  }
  ${({ error }) =>
    error ? 'border-color: var(--red)' : 'border-color: var(--gray)'}
`

export const Label = styled.label`
  letter-spacing: 0.15px;
  font-size: var(--fontsize-title);
  color: var(--purple);
  margin-bottom: 4rem;
  padding-left: 2rem;
`
