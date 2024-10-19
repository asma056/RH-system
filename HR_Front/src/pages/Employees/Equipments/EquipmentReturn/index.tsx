import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'

import { PageContext } from '../../../../contexts/pageName'
import { useSelectedEmployee } from '../../../../contexts/selectedEmployee'

import {
  InternNavigationBar,
  NavigationBar,
  EquipmentReturn as EquipmentReturnComponent
} from '../../../../components'

import {
  GetNavigationItemButtonData,
  GetNavigationDropdownMenuItems
} from '../../NavigationEmployees/navigation'
import { EmployeesList, EmployeesListProps } from '../../employeeItems'

import pageIcon from '../../../../assets/icons/employees.svg'

import {
  EmployeesContainer,
  EmployeesHeader,
  NavigationContainer
} from '../styles'

export function EquipmentReturn() {
  const { setPageTitle, setPageImage } = useContext(PageContext)

  const { selectedEmployeeId,selectedEmployeeName } = useSelectedEmployee()
  const { id } = useParams()
  const [employee, setEmployee] = useState<EmployeesListProps | null>(null)
  const userIdNumber = Number(id)
  useEffect(() => {
    setPageTitle('Dados dos Colaboradores')
    setPageImage(pageIcon)
  }, [])

  useEffect(() => {
    const searchEmployee = EmployeesList.find(
      (y) => y.id === selectedEmployeeId
    )
    setEmployee(searchEmployee as EmployeesListProps)
  }, [selectedEmployeeId])

  return (
    <EmployeesContainer>
      <EmployeesHeader>
        <NavigationContainer>
          <NavigationBar
            buttonItems={GetNavigationItemButtonData(selectedEmployeeId).items}
            id={GetNavigationDropdownMenuItems(selectedEmployeeId).id}
            title={GetNavigationDropdownMenuItems(selectedEmployeeId).title}
            dropdownItems={
              GetNavigationDropdownMenuItems(selectedEmployeeId).items
            }
            activeItemId={
              GetNavigationItemButtonData(selectedEmployeeId).items[5].id
            }
          />
        </NavigationContainer>
        <InternNavigationBar
          idFirstPage="NavLinkEmployeesPage"
          firstPage="Equipements"
          firstRoute={`/employees/equipments/view/${selectedEmployeeId}`}
          secondPage={selectedEmployeeName || ''}
          idSecondPage="EmployeesTerminationPage"
        />
      </EmployeesHeader>
      <EquipmentReturnComponent id={userIdNumber} />
    </EmployeesContainer>
  )
}
