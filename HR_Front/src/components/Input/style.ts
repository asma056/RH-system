import styled from 'styled-components'

interface InputProps {
  error?: boolean
}

export const InputLogin = styled.input<InputProps>`
  width: 100%;
  background-color: var(--white);
  border-radius: 40px;
  border: 1px solid var(--gray);
  color: var(--purple);
  font-size: var(--fontsize-text);
  outline: none;
  display: block;

  padding: 1.2rem 1.6rem;
  text-align: initial;
  letter-spacing: 1.25px;

  &::placeholder {
    font-size: var(--fontsize-text);
    padding: 1rem 0.5rem;
    text-align: initial;
    letter-spacing: 1.25px;
    opacity: 0.5;
  }
  ${({ error }) => (error ? 'border-color: var(--red)' : '')}
`

export const LabelLogin = styled.label`
  font-size: var(--fontsize-text);
  letter-spacing: 0.15px;
  color: var(--purple);
  padding-left: 2rem;
`
