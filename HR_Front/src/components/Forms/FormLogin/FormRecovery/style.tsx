import styled from 'styled-components'

export const Container = styled.div`
  width: -webkit-fill-available;
  padding: 0 18rem;

  @media (max-width: 1900px) {
    padding: 0 15rem;
  }
  @media (max-width: 1755px) {
    padding: 0 10rem;
  }
  @media (max-width: 1490px) {
    padding: 0 8rem;
  }
`
export const PSubtitle = styled.h2`
  text-align: center;
  font-style: normal;
  font-weight: 400;
  font-size: var(--fontsize-title);
  letter-spacing: 0.15px;
  color: var(--purple);
  padding: 1rem;
`
export const DivInput = styled.div`
  margin: 2rem 0;
`
