import { useContext, useEffect } from 'react'
import { useSelectedEmployee } from '../../../../contexts/selectedEmployee'

import {
  InternNavigationBar,
  NavigationBar,
  FormNewEmployee
} from '../../../../components'

import PageIcon from '../../../../assets/icons/employees.svg'
import { PageContext } from '../../../../contexts/pageName'

import {
  GetNavigationItemButtonData,
  GetNavigationDropdownMenuItems
} from '../../NavigationEmployees/navigation'

import { ContainerEmloyee, DivForm, EmployeesFormHeader } from '../../styles'

export function NewEmployee() {
  const { setPageTitle, setPageImage } = useContext(PageContext)
  const { selectedEmployeeId } = useSelectedEmployee()

  useEffect(() => {
    setPageTitle('Dados dos Colaboradores')
    setPageImage(PageIcon)
  }, [])
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
            GetNavigationItemButtonData(selectedEmployeeId).items[1].id
          }
          disableMenu
        />
        <InternNavigationBar
          idFirstPage="NavLinkEmployeesPage"
          firstPage="Colaboradores"
          firstRoute="/employees"
          secondPage="Novo Colaborador"
          idSecondPage="EmployeesEditPage"
        />
      </EmployeesFormHeader>
      <DivForm>
        <FormNewEmployee sendDocumentsButton />
      </DivForm>
    </ContainerEmloyee>
  )
}
