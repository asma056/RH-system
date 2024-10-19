import styled from 'styled-components'

export const Container = styled.div`
  width: -webkit-fill-available;
  padding: 0 18rem;

  & form {
    margin-bottom: 3rem;
  }

  @media (max-width: 1890px) {
    padding: 0 15rem;
  }
  @media (max-width: 1740px) {
    padding: 0 10rem;
  }
  @media (max-width: 1340px) {
    padding: 0 5rem;
  }
`

export const DivInput = styled.div`
  margin-top: 2rem;
  position: relative;

  & button {
    display: list-item;
  }
`

export const ImgEye = styled.img`
  position: absolute;
  background: transparent;
  border: none;
  right: 1.5rem;
  top: 50%;
`
export const PasswordRulesText = styled.h4`
  font-size: var(--fontsize-text);
  color: var(--red);
  letter-spacing: 0.1px;
`
export const AlertIcon = styled.img`
  width: 1rem;
  margin: 0 1rem;
`

export const PasswordContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`
