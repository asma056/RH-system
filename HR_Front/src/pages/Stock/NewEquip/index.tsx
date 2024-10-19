import { useContext, useEffect } from 'react'
import { useSelectedEmployee } from '../../../contexts/selectedEmployee'

import {
  InternNavigationBar,
} from '../../../components'

import PageIcon from '../../../assets/icons/stock.svg'
import { PageContext } from '../../../contexts/pageName'


import { ContainerEmloyee, DivForm, EmployeesFormHeader } from '../styles'
import { FormNewEmquip } from '../../../components/Forms/StockForm/NewEquip'

export function NewEquipement() {
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
          firstPage="Estoque"
          firstRoute="/stock"
          secondPage=""
          idSecondPage="EmployeesEditPage"
        />
      </EmployeesFormHeader>
      <DivForm>
        <FormNewEmquip sendDocumentsButton />
      </DivForm>
    </ContainerEmloyee>
  )
}
