import styled from 'styled-components'

export const Container = styled.div`
  width: -webkit-fill-available;
  padding: 0 25rem;

  @media (max-width: 1890px) {
    padding: 0 22rem;
  }
  @media (max-width: 1740px) {
    padding: 0 18rem;
  }
  @media (max-width: 1540px) {
    padding: 0 15rem;
  }
  @media (max-width: 1340px) {
    padding: 0 12rem;
  }
  @media (max-width: 1200px) {
    padding: 0 5rem;
  }
  & .divForgetPassword {
    padding: 0 30% 3rem 2rem;
  }
`
export const ButtonVisibility = styled.button`
  position: absolute;
  right: 0;
  top: 48%;
  background: transparent;
  border: none;
  cursor: pointer;
  right: 1rem;
`

export const ForgotPasswordText = styled.h5`
  font-style: normal;
  font-weight: 400;
  font-size: var(--fontsize-text);
  letter-spacing: 0.15px;
  color: var(--gray);
`
export const DivInput = styled.div`
  margin-top: 2rem;
  position: relative;

  & button {
  }
`
export const ErrorMessage = styled.p`
  color: var(--red) !important;
  font-size: var(--fontsize-text) !important;
  padding-left: 2rem;
`
