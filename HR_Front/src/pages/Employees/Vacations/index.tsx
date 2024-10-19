import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelectedEmployee } from '../../../contexts/selectedEmployee'
import { PageContext } from '../../../contexts/pageName'

import {
  GetNavigationDropdownMenuItems,
  GetNavigationItemButtonData
} from '../NavigationEmployees/navigation'

import { Button, InternNavigationBar, NavigationBar } from '../../../components'
import { VacationTestList, VacationEmployeeListProps } from './items'
import { getEmploye } from '../../../services/Employee'
import { getAllVactions } from '../../../services/vactions'
import pageIcon from '../../../assets/icons/employees.svg'
import arrowDown from '../../../assets/icons/angle-down.svg'
import arrowTop from '../../../assets/icons/angle-top.svg'
import EditIcon from '../../../assets/icons/edit.svg'

import {
  ButtonVestingPeriod,
  EditVacationImg,
  EmployeeInformation,
  EmployeesContainerBody,
  EmployeesVacationHeader,
  HeaderDiv,
  Job,
  Name,
  Status,
  StatusTd,
  TableRow,
  TableVacationStyle,
  Tbody,
  Td,
  TdSmal,
  Th,
  TheadTable,
  VacationEmployeesContainer
} from './style'
import { NavigationContainer } from '../styles'
import {format} from 'date-fns'

const VacationList = ({
  id,
  actived,
  vestingStartDate,
  vestingEndDate,
  startDate,
  endDate,
  daysOf,
  balanceDays,
  status
}: VacationEmployeeListProps) => {
  const [employeesChangeView, setEmployeesChangeView] = useState(false)

  const handleChangeEmployeesChangeView = () => {
    setEmployeesChangeView(!employeesChangeView)
  }

  return (
    <>
      <TableRow
        textColor={actived ? 'var(--purple)' : 'var(--gray)'}
        border={employeesChangeView ? 'none' : '1px solid var(--gray-opaque)'}
      >
        <Td>
          <ButtonVestingPeriod
            type="button"
            onClick={handleChangeEmployeesChangeView}
          >
            <img
              src={employeesChangeView ? arrowTop : arrowDown}
              alt="Visualizar status de férias"
            />
          </ButtonVestingPeriod>
          {format(new Date(vestingStartDate),"yyyy-MM-dd")+' '+format(new Date(vestingEndDate),"yyyy-MM-dd")}
        </Td>
        <Td>{format(new Date(startDate),"yyyy-MM-dd")+' '+format(new Date(endDate),"yyyy-MM-dd")}</Td>
        <TdSmal>{daysOf}</TdSmal>
        <TdSmal>{balanceDays}</TdSmal>
        <Td>
          {actived && (
            <NavLink to={`/employees/vacation/edit/${id}`}>
              <EditVacationImg
                src={EditIcon}
                className="editIcon"
                alt="Editar Férias"
              />
            </NavLink>
          )}
        </Td>
      </TableRow>
      {employeesChangeView && (
        <TableRow
          textColor={actived ? 'var(--purple)' : 'var(--gray)'}
          border="1px solid var(--gray-opaque)"
        >
          <StatusTd colSpan={6}>
            Status:
            <Status textColor={actived ? 'var(--purple-light)' : 'var(--gray)'}>
              {status}
            </Status>
          </StatusTd>
        </TableRow>
      )}
    </>
  )
}

export function Vacations() {
  const { setPageTitle, setPageImage } = useContext(PageContext)
  const { selectedEmployeeId,selectedEmployeeName } = useSelectedEmployee()
  const [employee, setEmployee] = useState<any>(null)
  const [vacationList, setVacationList] = useState(VacationTestList)
  const navigate = useNavigate()
  const role = localStorage.getItem('@3035TECH/role')

  const NavigateSetVacation = () => {
    navigate(`/employees/vacation/new/${selectedEmployeeId}`)
  }


  useEffect(() => {
    const fetchVactionsList = async () => {
      try{
      const response = await getAllVactions(selectedEmployeeId || 0);
      if (!response) {
        console.log('Error: No response');
      } else {
        setVacationList(response.results);
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }


    }
    const fetchData = async () => {
      try {
        const response = await getEmploye(selectedEmployeeId || 0);
  
        if (!response) {
          console.log('Error: No response');
        } else {
          setEmployee(response);
        }
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };
  
    fetchData();
    fetchVactionsList();
  }, [selectedEmployeeId]);
  
  useEffect(() => {
    setPageTitle('Dados dos Colaboradores')
    setPageImage(pageIcon)
  }, [])



  const rows = vacationList && vacationList.map((vacation) => ({
    id: vacation.id,
    vacationData: vacation,
    content: <VacationList key={vacation.id} {...vacation} />
  })) 

  return (
    <VacationEmployeesContainer id="VacationPage">
      <EmployeesVacationHeader>
        <NavigationContainer>
          <NavigationBar
            buttonItems={GetNavigationItemButtonData(selectedEmployeeId).items}
            id={GetNavigationDropdownMenuItems(selectedEmployeeId).id}
            title={GetNavigationDropdownMenuItems(selectedEmployeeId).title}
            dropdownItems={
              GetNavigationDropdownMenuItems(selectedEmployeeId).items
            }
            activeItemId={
              GetNavigationItemButtonData(selectedEmployeeId).items[3].id
            }
            disableMenu={false}
          />
          <InternNavigationBar
            idFirstPage="NavLinkEmployeesPage"
            secondPage={selectedEmployeeName || ''}
            firstRoute={`/employees`}
            firstPage="Colaboradores"
            idSecondPage="EmployeesVacationPage"
          />
        </NavigationContainer>
      </EmployeesVacationHeader>
      <EmployeesContainerBody>
        <HeaderDiv>
          <EmployeeInformation>
            <Name>{employee?.fullName}</Name>
            <Job>{employee?.jobFormat}</Job>
          </EmployeeInformation>
          { role === 'EMPLOYEE' && 
          <Button
            type="button"
            text="INFORMAR FÉRIAS"
            id="buttonVacationEmployee"
            invertColor
            cancelColor={false}
            onClick={NavigateSetVacation}
          />
        }
        </HeaderDiv>
        <TableVacationStyle>
          <TheadTable>
            <tr>
              <Th>Período Aquisitivo</Th>
              <Th>Início - Fim</Th>
              <Th>Nº de dias</Th>
              <Th>Saldo Restante</Th>
              <Th> </Th>
            </tr>
          </TheadTable>
          <Tbody>
            { rows && rows.map((row) => (
              <React.Fragment key={row.id}>{row.content}</React.Fragment>
            ))}
          </Tbody>
        </TableVacationStyle>
      </EmployeesContainerBody>
    </VacationEmployeesContainer>
  )
}
