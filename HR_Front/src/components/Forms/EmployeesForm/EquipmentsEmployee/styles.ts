import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

export const SaveButton = styled.button`
  height: 5rem;
  width: 35rem;
  font-size: var(--fontsize-text);
  color: var(--purple);
  background-color: var(--white);
  border: 1px solid var(--purple);
  border-radius: 2.5rem;
  &:hover {
    color: var(--white);
    background-color: var(--purple);
  }
`

export const IconImage = styled.img`
  width: 2.25rem;
  height: 1.7rem;
  margin: 0 0.5rem;
  cursor: pointer;
`

export const ContainerUploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0.5rem 2.5rem;
  margin-bottom: 2.5rem;
`

export const DivBottomButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  img {
    margin-right: 2rem;
  }
  button {
    font-size: var(--fontsize-text);
    width: 22rem;
    height: 5rem;
    justify-content: center;
  }
  button + button {
    margin-left: 3rem;
  }
`

export const ContainerInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0.5rem 2.5rem;
  margin-bottom: 2.5rem;
`

export const DivInputGroup = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  input,
  textarea,
  label {
    width: 90%;
    min-width: 26.5rem !important;
    max-width: 40.5rem;
    resize: vertical;
  }
  label,
  h3 {
    padding-top: 0;
    padding-left: 0;
  }
`
