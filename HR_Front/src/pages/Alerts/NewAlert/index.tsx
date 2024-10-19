import { useContext, useEffect } from 'react'
import { useSelectedEmployee } from '../../../contexts/selectedEmployee'

import {
  InternNavigationBar,
} from '../../../components'

import PageIcon from '../../../assets/icons/alerts.svg'
import { PageContext } from '../../../contexts/pageName'


import { ContainerEmloyee, DivForm, EmployeesFormHeader } from '../styles'
import { FormNewAlerts} from '../../../components/Forms/AlertsForm/NewAlerts'

export function NewAlert() {
  const { setPageTitle, setPageImage } = useContext(PageContext)
  const { selectedEmployeeId } = useSelectedEmployee()

  useEffect(() => {
    setPageTitle('Alerts')
    setPageImage(PageIcon)
  }, [])
  return (
    <ContainerEmloyee>
      <EmployeesFormHeader>
        <InternNavigationBar
          idFirstPage="NavLinkEmployeesPage"
          firstPage="Alerts"
          firstRoute="/alerts"
          secondPage=""
          idSecondPage=""
        />
      </EmployeesFormHeader>
      <DivForm>
        <FormNewAlerts sendDocumentsButton />
      </DivForm>
    </ContainerEmloyee>
  )
}
