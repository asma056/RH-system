import styled from 'styled-components'

export const InputGroupTitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  align-items: center;
  margin-bottom: 2rem;
`

export const InputGroupTitle = styled.h3`
  margin: 0;
  width: fit-content;
  white-space: nowrap;
  font-size: var(--fontsize-title);
  font-weight: 400;
  color: var(--purple);
`

export const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: var(--purple);
  margin-left: 2.5rem;
`
