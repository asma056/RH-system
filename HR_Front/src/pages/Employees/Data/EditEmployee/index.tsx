import { useContext, useEffect, useState } from 'react'
import { useSelectedEmployee } from '../../../../contexts/selectedEmployee'
import {InternNavigationBar,NavigationBar,} from '../../../../components'
import EditFormEmployee from "src/components/Forms/EmployeesForm/EditEmployee/"
import PageIcon from '../../../../assets/icons/employees.svg'
import { PageContext } from '../../../../contexts/pageName'
import {GetNavigationItemButtonData,GetNavigationDropdownMenuItems} from '../../NavigationEmployees/navigation'
import { ContainerEmloyee, DivForm, EmployeesFormHeader } from '../../styles'



export function EditEmployee() {
  const { setPageTitle, setPageImage } = useContext(PageContext)
  const { selectedEmployeeId,selectedEmployeeName } = useSelectedEmployee()


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
          disableMenu={false}
        />
        <InternNavigationBar
          idFirstPage="NavLinkEmployeesPage"
          firstPage="Colaboradores"
          firstRoute="/employees"
          secondPage={selectedEmployeeName || ''}
          idSecondPage="EmployeesEditPage"
        />
      </EmployeesFormHeader>
      <DivForm>
        <EditFormEmployee id={selectedEmployeeId || 0  } />
      </DivForm>
    </ContainerEmloyee>
  )
}
