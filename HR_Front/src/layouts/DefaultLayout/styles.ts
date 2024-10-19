import styled from 'styled-components'

export const GeneralContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;

  width: 100vw;
  height: 100vh;
`

export const ContentContainer = styled.main`
  top: 6rem;
  display: flex;
  width: 100%;
  height: calc(100vh - 6rem);
  background-color: var(--white);
  overflow-x: hidden;
  flex-direction: column;
  justify-content: center;
`
