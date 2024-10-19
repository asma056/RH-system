import { useContext, useEffect } from 'react'
import { PageContext } from '../../contexts/pageName'
import pageIcon from '../../assets/icons/config.svg'
import { ContainerEmloyee, DivForm, EmployeesFormHeader } from '../Employees/styles'
import { GetNavigationDropdownMenuItems, GetNavigationItemButtonData } from '../Employees/NavigationEmployees/navigation'
import {InternNavigationBar,NavigationBar,} from '../../components'
import SettingForm from '../../components/Forms/EmployeesForm/AdminForm'
import { useSelectedEmployee } from '../../contexts/selectedEmployee'

export function Settings() {
  const { setPageTitle, setPageImage } = useContext(PageContext)

  useEffect(() => {
    setPageTitle('Configurações')
    setPageImage(pageIcon)
  }, [])
  return (
    <ContainerEmloyee>
    <DivForm>
      <SettingForm id={0  } />
    </DivForm>
  </ContainerEmloyee>

  )
}
