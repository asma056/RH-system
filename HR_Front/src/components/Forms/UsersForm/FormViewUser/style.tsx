import styled from 'styled-components'

export const DivButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: -webkit-fill-available;
  margin-top: 1rem;

  & button {
    width: 45%;
  }
`
export const DivFormViewUser = styled.div`
  position: relative;
  height: auto;
  margin: 0 10%;
  display: flex;
  flex-direction: column;
  width: 60%;
  font-size: 1.2rem;
  transform: translateY(-18%);

  @media (max-height: 893px) {
    transform: translateY(-18%);
  }

  @media (max-height: 850px) {
    transform: translateY(-16%);
  }

  @media (max-height: 800px) {
    transform: translateY(-14%);
  }

  @media (max-height: 750px) {
    transform: translateY(-12%);
  }

  @media (max-height: 700px) {
    transform: translateY(-8%);
  }

  @media (max-height: 650px) {
    transform: translateY(-6%);
  }
`
export const GridDiv = styled.div``

export const LabelDiv = styled.div`
  width: 100%;
`

export const LabelTitle = styled.h3`
  font-size: var(--fontsize-title);
  color: var(--purple);
  font-weight: 400;
  padding: 0.3rem 0;

  @media (max-height: 700px) {
    padding: 0.8rem 0;
  }

  @media (max-height: 650px) {
    padding: 0.6rem 0;
  }

  @media (max-height: 600px) {
    padding: 0.4rem 0;
  }
  @media (max-height: 650px) {
    padding: 0;
  }
`
export const LabelContent = styled.p`
  font-size: var(--fontsize-text);
  padding-bottom: 1rem;
  color: var(--gray);
  opacity: 0.5;
`

export const GridFormViewUser = styled.div`
  display: flex;
  justify-content: space-between;

  & :first-child {
    padding-left: 0;
  }

  & label {
    width: 45%;
  }

  & button {
    margin-top: 3rem;
    width: 45%;
    font-size: var(--fontsize-text);
    padding: 1.2rem 0;

    @media (max-height: 800px) {
      margin-top: 2.5rem;
    }

    @media (max-height: 700px) {
      margin-top: 2rem;
    }

    @media (max-height: 600px) {
      margin-top: 1rem;
    }
  }

  & input,
  select {
    padding: 1.2rem 1.5rem;
  }
`
export const ViewUserDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  & :last-child {
    margin-right: 5rem;
  }
`
