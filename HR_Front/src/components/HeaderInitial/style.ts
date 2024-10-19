import styled from 'styled-components'

export const LogoSession = styled.div`
  background-color: var(--purple);
  height: 100vh;
  width: 40vw;
  border-radius: 0 0 100px 0;
  display: flex;
  align-items: center;
  -webkit-box-align: center;
  justify-content: center;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: center;

  img {
    width: 15vw;
    margin: 0 auto;
    margin-bottom: 3em;
  }
`
export const ContentSession = styled.div`
  background-color: var(--white);
  height: 100vh;
  width: 60vw;
  border-radius: 100px 0 0 0;
  display: flex;
  align-items: center;
  -webkit-box-align: center;
  justify-content: center;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: center;

  h1 {
    font-style: normal;
    font-weight: 400;
    font-size: 2.8rem;
    color: var(--purple);
    margin-bottom: 0.8em;
  }
  p {
    font-style: normal;
    font-weight: 400;
    font-size: 1.8rem;
    color: var(--purple);
  }
`
export const DivArround = styled.div`
  display: flex;
  background-image: linear-gradient(var(--purple) 30%, var(--white) 70%);
`
