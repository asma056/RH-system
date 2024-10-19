import { useContext, useEffect } from 'react'
import { useSelectedEmployee } from '../../../contexts/selectedEmployee'

import {
  InternNavigationBar,
} from '../../../components'

import PageIcon from '../../../assets/icons/stock.svg'
import { PageContext } from '../../../contexts/pageName'


import { ContainerEmloyee, DivForm, EmployeesFormHeader } from '../styles'
import { FormNewEvent } from '../../../components/Forms/EventForm/NewEvent'

export function NewEvent() {
  const { setPageTitle, setPageImage } = useContext(PageContext)
  const { selectedEmployeeId } = useSelectedEmployee()

  useEffect(() => {
    setPageTitle('Estoque')
    setPageImage(PageIcon)
  }, [])
  return (
    <ContainerEmloyee>
      <EmployeesFormHeader>
        <InternNavigationBar
          idFirstPage="NavLinkEmployeesPage"
          firstPage="Events"
          firstRoute="/events"
          secondPage=""
          idSecondPage=""
        />
      </EmployeesFormHeader>
      <DivForm>
        <FormNewEvent sendDocumentsButton />
      </DivForm>
    </ContainerEmloyee>
  )
}
