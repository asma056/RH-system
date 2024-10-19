import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelectedEmployee } from '../../../../contexts/selectedEmployee'

import { InternNavigationBar, NavigationBar } from '../../../../components'
import { FormViewEmployee } from '../../../../components/Forms/EmployeesForm/ViewEmployee'

import PageIcon from '../../../../assets/icons/employees.svg'
import { PageContext } from '../../../../contexts/pageName'

import {
  GetNavigationItemButtonData,
  GetNavigationDropdownMenuItems
} from '../../NavigationEmployees/navigation'

import { ContainerEmloyee, DivForm, EmployeesFormHeader } from '../../styles'
import { EmployeesList, EmployeesListProps } from '../../employeeItems'
import axios from 'axios'

export function ViewEmployee() {
  const { selectedEmployeeId,selectedEmployeeName } = useSelectedEmployee()
  const { id } = useParams()
  const [employee, setEmployee] = useState<any>(null)
  const userIdNumber = Number(id)
  const { setPageTitle, setPageImage } = useContext(PageContext)

  useEffect(() => {
    setPageTitle('Dados dos Colaboradores')
    setPageImage(PageIcon)
  }, [])


  /*useEffect(() => {
    // Effectuez la requête GET à votre API pour récupérer les données des employés
    axios.get(`http://localhost:3000/employee/${id}`)
      .then(response => {
        const data = response.data
       // console.log('data =>',data)
        setEmployee(data) 
      })
      .catch(error => {
        console.error('Erreur :', error)
      })
  }, []) // Utilisez un tableau vide pour exécuter l'effet une seule fois au chargement du composant
*/


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
        <FormViewEmployee id={selectedEmployeeId}  />
      </DivForm>
    </ContainerEmloyee>
  )
}
