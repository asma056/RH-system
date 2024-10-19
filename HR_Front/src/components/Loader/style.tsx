import styled from 'styled-components'

export const Loading = styled.div`
  border: 4px solid var(--background);
  border-left-color: var(--purple-light);
  height: 1.8rem;
  width: 1.8rem;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`
