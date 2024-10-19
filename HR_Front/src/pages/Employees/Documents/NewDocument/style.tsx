import styled from 'styled-components'

export const DivPopUp = styled.div`
  position: absolute;
  z-index: 3;
  top: 15%;
  right: 5%;

  width: 70vw;
  height: 80vh;
  display: flex;

  background: var(--background);
  box-shadow: 0px 0px 20px rgba(139, 139, 139, 0.5);
  border-radius: 40px;

  flex-direction: column;
  justify-content: space-around;

  @media (min-width: 1500px) {
    right: 7%;
  }
  @media (min-width: 2000px) {
    right: 8%;
  }
`
export const DivContentPopUp = styled.div`
  position: absolute;
  z-index: 3;
  display: flex;
  flex-direction: column;
  margin: 3%;
  width: 94%;
`

export const ContainerInitial = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2%;
  h2 {
    font-size: var(--fontsize-title);
    color: var(--purple);
    font-weight: 400;
  }

  button {
    background-color: transparent;
    border: none;
    img {
      width: 2rem;
    }
  }
`
export const ContainerUpload = styled.div`
  border-radius: 2.5rem;
  border: 4px dashed var(--gray);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2%;
  background-color: var(--gray-light);
  margin-bottom: 1%;

  img {
    width: 6%;
    margin: 2%;
  }
  p {
    color: var(--gray);
    text-align: center;
    font-size: var(--fontsize-title);
    font-weight: 400;
    margin: 1% 0 1% 0;

    :last-child {
      opacity: 0.5;
      font-size: 1rem;
    }
  }
`

export const TableStyle = styled.table`
  font-size: var(--fontsize-title);
  text-align: justify;
  border-collapse: collapse;

  & thead {
    color: var(--gray);
    border-bottom: 1px solid var(--gray);
  }

  & tbody {
    transform: translateY(0.2rem);
    color: var(--purple);
  }

  & th,
  td {
    font-weight: normal !important;
    text-align: center;
    padding: 0.5rem 0;
    :first-child {
      text-align: start !important;
    }
  }
`
export const Tr = styled.tr<{ background: string }>`
  background-color: ${(props) => props.background};
  border-color: ${(props) => props.background};
`
export const ImgTable = styled.img`
  height: 1.3rem;
`
export const ImgTableLoader = styled.img`
  height: 1.3rem;
  animation: rotate 1s linear infinite;

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
export const NameTable = styled.td`
  display: flex;
  img {
    margin: 0 3% 0 2%;
  }
`
export const ButtonDiv = styled.div`
  display: flex;
  padding: 2% 20% 0 20%;
  align-items: center;
  justify-content: center;
`
