import { useContext, useEffect, useState } from 'react'
import { useSelectedEmployee } from '../../../../contexts/selectedEmployee'
import {
  InternNavigationBar,
  NavigationBar,
  FormEditTerminationEmployee
} from '../../../../components'

import PageIcon from '../../../../assets/icons/employees.svg'
import { PageContext } from '../../../../contexts/pageName'

import {
  GetNavigationItemButtonData,
  GetNavigationDropdownMenuItems
} from '../../NavigationEmployees/navigation'

import { ContainerEmloyee, DivForm, EmployeesFormHeader } from '../../styles'

export function EditTerminationEmployee() {
  const { selectedEmployeeId } = useSelectedEmployee()
  const { setPageTitle, setPageImage } = useContext(PageContext)
  const [employeeName, setEmployeeName] = useState(
    'Maria da Silva de Souza Rodrigues'
  )

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
            GetNavigationDropdownMenuItems(selectedEmployeeId).items[2].id
          }
          disableMenu={false}
        />
        <InternNavigationBar
          idFirstPage="NavLinkEmployeesPage"
          firstPage="Colaboradores"
          firstRoute="/employees"
          secondPage={employeeName}
          idSecondPage="EmployeesTerminationPage"
        />
      </EmployeesFormHeader>
      <DivForm>
        <FormEditTerminationEmployee />
      </DivForm>
    </ContainerEmloyee>
  )
}
