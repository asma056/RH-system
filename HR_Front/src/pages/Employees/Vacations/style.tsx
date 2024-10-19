import styled from 'styled-components'

export const EmployeesContainerBody = styled.div`
  transform: translateY(1rem);
  width: 95%;
  padding: 2.5rem 0;
  box-shadow: 0px 0px 20px rgba(139, 139, 139, 0.5);
  margin-bottom: 5rem;
`
export const TableVacationStyle = styled.table`
  text-align: justify;
  border-collapse: collapse;
  width: 100%;
`
export const Tbody = styled.tbody`
  font-size: 1rem;
  text-align: center;
`
export const TheadTable = styled.thead`
  color: var(--purple);
  box-shadow: none;
  font-size: 1.2rem;
  border-bottom: 1px solid var(--gray);
`
export const Th = styled.th`
  font-size: var(--fontsize-subTitle);
  font-weight: normal;
  padding: 1rem 0 0.5rem;
  text-align: center;
`
export const Td = styled.td`
  padding: 1rem 0;
`
export const ButtonVestingPeriod = styled.button`
  background-color: transparent;
  border: none;
  padding-right: 1rem;
`
export const TdSmal = styled.td`
  width: 15%;

  @media (max-width: 1049px) {
    width: 10%;
  }
`
export const StatusTd = styled.td`
  text-align: start;
  display: -webkit-box;
  padding: 0 0 1rem 20%;
`
export const Status = styled.p<{ textColor: string }>`
  color: ${(props) => props.textColor};
  padding-left: 0.5rem;
`
export const EditVacationImg = styled.img`
  height: 1rem;
  padding-right: 1rem;
  filter: var(--filter-purple);
`
export const TableRow = styled.tr<{ textColor: string; border?: string }>`
  color: ${(props) => props.textColor};
  border-bottom: ${(props) => props.border};
`

export const EmployeesVacationHeader = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  z-index: 2;
  flex-direction: column;
  width: 100%;
  height: auto;
  padding: 1rem 2.5rem 0;
  background-color: var(--background);
`
export const VacationEmployeesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  font-size: 1.5rem;
  overflow-x: hidden;
  align-items: center;
`
export const Name = styled.p`
  color: var(--purple);
  font-size: var(--fontsize-title);
`
export const Job = styled.p`
  color: var(--gray);
  font-size: var(--fontsize-title);
`
export const HeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 2.5rem 1rem;

  & button {
    width: 35%;
    height: 3.5rem;
    font-size: var(--fontsize-text);
    padding: 0 !important;
  }
`

export const EmployeeInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 60%;
`
