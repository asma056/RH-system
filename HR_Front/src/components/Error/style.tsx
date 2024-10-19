import styled from 'styled-components'

export const DivError = styled.div`
  background-color: var(--purple-opaque);
  color: var(--purple);
  font-size: var(--fontsize-text);
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100vw;
  align-items: center;

  & div:first-child {
    margin: 0.5rem 1rem;
  }
`
