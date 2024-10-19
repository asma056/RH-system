import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { useSelectedEmployee } from '../../../../contexts/selectedEmployee'

import {
  InternNavigationBar,
  NavigationBar,
  FormViewTerminationEmployee
} from '../../../../components'

import PageIcon from '../../../../assets/icons/employees.svg'
import { PageContext } from '../../../../contexts/pageName'

import {
  GetNavigationItemButtonData,
  GetNavigationDropdownMenuItems
} from '../../NavigationEmployees/navigation'

import { ContainerEmloyee, DivForm, EmployeesFormHeader } from '../../styles'

import { EmployeesList, EmployeesListProps } from '../../employeeItems'

export function ViewTerminationEmployee() {
  const { selectedEmployeeId,selectedEmployeeName } = useSelectedEmployee()
  const { id } = useParams()
  const [employee, setEmployee] = useState<EmployeesListProps | null>(null)
  const userIdNumber = Number(id)
  const { setPageTitle, setPageImage } = useContext(PageContext)

  useEffect(() => {
    setPageTitle('Dados dos Colaboradores')
    setPageImage(PageIcon)
  }, [])

  useEffect(() => {
    const searchEmployee = EmployeesList.find(
      (y) => y.id === selectedEmployeeId
    )
    setEmployee(searchEmployee as EmployeesListProps)
  }, [selectedEmployeeId])

  return (
    <ContainerEmloyee>
      <EmployeesFormHeader>
        <NavigationBar
          buttonItems={GetNavigationItemButtonData(selectedEmployeeId).items}
          id={GetNavigationDropdownMenuItems(selectedEmployeeId).id}
          title={GetNavigationDropdownMenuItems(selectedEmployeeId).title}
          dropdownItems={
            GetNavigationDropdownMenuItems(selectedEmployeeId).items
          }
          activeItemId={
            GetNavigationDropdownMenuItems(selectedEmployeeId).items[2].id
          }
          disableMenu={false}
        />
        <InternNavigationBar
          idFirstPage="NavLinkEmployeesPage"
          firstPage="Colaboradores"
          firstRoute="/employees"
          secondPage={selectedEmployeeName || ''}
          idSecondPage="EmployeesTerminationPage"
        />
      </EmployeesFormHeader>
      <DivForm>
        <FormViewTerminationEmployee id={userIdNumber} />
      </DivForm>
    </ContainerEmloyee>
  )
}
