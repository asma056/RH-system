import styled from 'styled-components'

export const Mybutton = styled.button`
  width: 5.625rem;
  height: 3.5rem;
  background-color: var(--white);
  border: var(--purple) 1px solid;
  border-radius: 2.5rem;
  a {
    display: flex;
    height: 100%;
    width: 100%;
    border-radius: 2.5rem;
  }
  img {
    width: 1.125rem;
    height: 1.125rem;
    margin-right: 1rem;
    filter: invert(5%) sepia(92%) saturate(7499%) hue-rotate(281deg)
      brightness(60%) contrast(99%);
  }
  :hover {
    background-color: var(--purple);
    border-color: var(--white);
    img {
      filter: var(--filter-white);
    }
  }
`
