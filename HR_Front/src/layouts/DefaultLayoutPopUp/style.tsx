import styled from 'styled-components'

export const DivPopUp = styled.div`
  position: absolute;
  z-index: 3;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 40vw;
  height: 40vh;
  display: flex;

  background: var(--background);
  box-shadow: 0px 0px 20px rgba(139, 139, 139, 0.5);
  border-radius: 40px;

  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`
export const DivContentPopUp = styled.div`
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 5rem;
  justify-content: center;
`
export const ImgPopUp = styled.img`
  z-index: 3;
  width: 4rem;
  margin: 1rem 1rem 3rem 1rem;
`
export const TitlePopUp = styled.h2`
  z-index: 3;
  font-size: var(--fontsize-title);
  padding-bottom: 1rem;
  color: var(--purple);
  text-align: center;
  font-weight: 400;
`
export const ContentPopUp = styled.p`
  z-index: 3;
  font-size: var(--fontsize-text);
  text-align: justify;
  color: var(--black);
  text-align: center;
  margin-bottom: 2rem;
`
