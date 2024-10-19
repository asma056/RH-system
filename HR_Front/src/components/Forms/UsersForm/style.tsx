import styled from 'styled-components'

export const OverlayDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.6);
  z-index: 2;
  pointer-events: auto;
`

/* Esilos usados nas páginas internas */

export const DivFormUser = styled.form`
  position: relative;
  height: auto;
  display: flex;
  flex-direction: column;
  width: 60%;
  @media (min-width: 1000px) {
    width: 40%;
  }

  & span {
    display: none;
  }
  & label {
    margin-bottom: 0.5rem;
    padding: 0rem;
  }
  & input {
    padding: 1.2rem 1.6rem;
  }
  & a {
    margin: 2rem 5rem;

    @media (max-height: 800px) {
      margin: 1.8rem 5rem;
    }

    @media (max-height: 750px) {
      margin: 1.6rem 5rem;
    }

    @media (max-height: 700px) {
      margin: 1.4rem 5rem;
    }
  }

  & label div {
    cursor: pointer;
    background: var(--white);
    border-radius: 30px;
    width: -webkit-fill-available;
    box-sizing: border-box;
    & input::placeholder {
      font-size: var(--fontsize-text);
      padding: 2rem 0.5rem;
      text-align: initial;
      letter-spacing: 1.25px;
      opacity: 0.5;
    }
  }

  & label div ul {
    color: var(--gray);
    width: 100%;
  }

  & label div ul li {
    display: flex;
    text-align: initial;
    list-style: none;
    border-radius: 0.5rem;
    padding: 1rem 2rem;

    :hover {
      background-color: var(--gray-light);
      color: var(--gray);
      box-shadow: rgba(139, 139, 139, 0.5) 0px 0px 2px;
      border-radius: 30px;
    }
  }
`
export const GridFormButtonUser = styled.div`
  display: flex;
  justify-content: space-between;

  & button,
  a button {
    margin-top: 3rem;
    width: 45%;
    font-size: var(--fontsize-text);
    padding: 1.2rem 0;
    @media (max-height: 800px) {
      margin-top: 2rem;
    }

    @media (max-height: 750px) {
      margin-top: 1.5rem;
    }

    @media (max-height: 700px) {
      margin-top: 1rem;
    }
  }
`
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
export const CancelText = styled.p`
  color: var(--purple);
  font-size: var(--fontsize-text);
  font-weight: bold;
  text-align: center;
`

export const LabelDivView = styled.div`
  width: 100%;
  letter-spacing: 0.15px;
  font-size: var(--fontsize-title);
  color: var(--purple);
`

export const LabelTitleView = styled.h3`
  color: var(--purple);
  font-weight: 400;
  padding: 1rem 0;

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
export const LabelContentView = styled.p`
  color: var(--gray);
  opacity: 0.5;
`
