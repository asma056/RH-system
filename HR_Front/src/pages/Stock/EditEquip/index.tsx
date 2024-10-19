import { useContext, useEffect, useState } from 'react'
import { useSelectedEmployee } from '../../../contexts/selectedEmployee'
import {InternNavigationBar,NavigationBar,} from '../../../components'
import PageIcon from '../../../assets/icons/stock.svg'
import { PageContext } from '../../../contexts/pageName'
import { ContainerEmloyee, DivForm, EmployeesFormHeader } from '../styles'
import { FormEditEquip } from '../../../components/Forms/StockForm/EditEquip'



export function EditEquipement() {
  const { setPageTitle, setPageImage } = useContext(PageContext)
  const { selectedEmployeeId,selectedEmployeeName } = useSelectedEmployee()


  useEffect(() => {
    setPageTitle('Dados dos Colaboradores')
    setPageImage(PageIcon)
  }, [])
 

  return (
    <ContainerEmloyee>
      <EmployeesFormHeader>
        <InternNavigationBar
          idFirstPage="NavLinkEmployeesPage"
          firstPage="Estoque"
          firstRoute="/stock"
          secondPage={''}
          idSecondPage="EmployeesEditPage"
        />
      </EmployeesFormHeader>
      <DivForm>
        <FormEditEquip    />
      </DivForm>
    </ContainerEmloyee>
  )
}
