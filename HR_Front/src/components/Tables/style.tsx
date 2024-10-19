import styled from 'styled-components'

export const TableStyle = styled.table`
  font-size: var(--fontsize-text);
  color: var(--purple);
  text-align: justify;
  border-collapse: collapse;
  width: 100%;

  & thead {
    font-size: var(--fontsize-subTitle);
    box-shadow: rgba(139, 139, 139, 0.3) 0px 0px 10px;
    position: sticky;
    top: 0rem;
    z-index: 1;
    background-color: var(--background);
  }

  & th,
  td {
    padding: 1rem 0;
    font-weight: normal !important;
    text-align: center;
  }
`
export const Tr = styled.tr<{ background: string }>`
  background-color: ${(props) => props.background};
  border-color: ${(props) => props.background};
`
export const GrayImg = styled.img`
  filter: var(--filter-gray);
`
export const PaginationDiv = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;

  & .active {
    color: var(--purple);
  }
`
export const ArrowButton = styled.button`
  font-weight: 500;
  font-size: var(--fontsize-text);
  color: var(--purple);
  border: none;
  background-color: var(--background);
  margin: 1rem;
`
export const PageButton = styled.button`
  font-size: var(--fontsize-text);
  color: var(--gray);
  border: none;
  background-color: var(--background);
  margin: 1rem;
`
