import { NavigationDropdownMenuProps } from '../../../components/NavigationBar/dropdownMenu'
import { NavigationItemButtonsProps } from '../../../components/NavigationBar/itemButton'

export const GetNavigationItemButtonData = (
  selectedEmployeeId: number | null
): NavigationItemButtonsProps => {
  return {
    items: [
      {
        id: 'ButtonEmployeesPage',
        route: '/employees',
        title: 'Todos'
      },
      {
        id: 'ButtonEmployeesEditPage',
        route: `/employees/view/${selectedEmployeeId}`,
        title: 'Dados'
      },
      {
        id: 'ButtonEmployeesDocumentsPage',
        route: `/employees/documents/${selectedEmployeeId}`,
        title: 'Documentos'
      },
      {
        id: 'ButtonEmployeesVacationPage',
        route: `/employees/vacation/${selectedEmployeeId}`,
        title: 'Férias'
      },
     {
        id: 'ButtonEmployeesSalaryPage',
        route: `/employees/salary/${selectedEmployeeId}`,
        title: 'Salário'
      },
      {
        id: 'ButtonEmployeesEquipmentsPage',
        route: `/employees/equipments/view/${selectedEmployeeId}`,
        title: 'Equipamentos'
      },
      {
        id: 'ButtonEditEmployeesTerminationPage',
        route: `/employees/termination/view/${selectedEmployeeId}`,
        title: 'Desligamento'
      }
    ]
  }
}
export const GetNavigationDropdownMenuItems = (
  selectedEmployeeId: number | null
): NavigationDropdownMenuProps => {
  return {
    id: 'ButtonEmployeesMoreSelect',
    title: '',
    items: [
      {
        id: 'ButtonEmployeesEvaluationPage',
        route: `/employees/evaluation/${selectedEmployeeId}`,
        title: 'Avaliação'
      },
      {
        id: 'ButtonEmployeesEventsPage',
        route: `/employees/event/${selectedEmployeeId}`,
        title: 'Eventos'
      },
      {
        id: 'ButtonEditEmployeesTerminationPage',
        route: `/employees/termination/view/${selectedEmployeeId}`,
        title: 'Desligamento'
      }
    ]
  }
}
