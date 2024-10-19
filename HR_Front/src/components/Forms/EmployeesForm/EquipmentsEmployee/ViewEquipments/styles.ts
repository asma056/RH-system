import styled from 'styled-components'

interface TableaHeaderProps {
  colorGray?: boolean
}

export const EmployeesEquipmentsBody = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 2rem;
  overflow-x: hidden;
  height: auto;
  padding-top: 2.5rem;
  box-shadow: 0px 0px 20px rgba(139, 139, 139, 0.5);
  align-items: center;
  justify-content: space-between;
`

export const InputGroupTitleWrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 0 2.5rem 2rem;
  justify-content: space-between;
  flex-wrap: nowrap;
  align-items: center;
`

export const InputGroupTitle = styled.h3`
  margin: 2rem 0 0 0;
  width: fit-content;
  white-space: nowrap;
  font-size: var(--fontsize-title);
  font-weight: 400;
  color: var(--purple);
`

export const TableColumnHeader = styled.th<TableaHeaderProps>`
  padding: 0.8rem 0;
  font-size: var(--fontsize-subTitle);
  font-style: normal;
  font-weight: 400;
  ${({ colorGray }: TableaHeaderProps) =>
    colorGray
      ? `
    color: var(--gray);
  `
      : `
      color: var(--purple);
  `}
`

export const DivTable = styled.div`
  overflow-y: auto;
  width: 100%;
`

export const TableCell = styled.td`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const InformLink = styled.a`
  color: var(--purple-light);
  font-family: Prompt;
  font-size: var(--fontsize-text);
  text-decoration-line: underline;
`
