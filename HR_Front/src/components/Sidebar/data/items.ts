import { CSSProperties } from 'react'

import ReportIcon from '../../../assets/icons/reports.svg'
import UsersIcon from '../../../assets/icons/user.svg'
import StockIcon from '../../../assets/icons/stock.svg'
import AlertsIcon from '../../../assets/icons/alerts.svg'
import EventsIcon from '../../../assets/icons/events.svg'
import EmployeesIcon from '../../../assets/icons/employees.svg'
import ConfigIcon from '../../../assets/icons/config.svg'
import LogoutIcon from '../../../assets/icons/logout.svg'

export interface SidebarItemsProps {
  id: string
  title: string
  alt: string
  path: string
  src: string
  style?: CSSProperties
  isActive: boolean
}

export const SidebarItems = [
  {
    id: 'buttonUsersPage',
    title: 'Usuários',
    alt: 'Ícone de usuários',
    path: '/users',
    src: UsersIcon
  },
  {
    id: 'buttonStockPage',
    title: 'Estoque',
    alt: 'Ícone de estoque',
    path: '/stock',
    src: StockIcon
  },
  {
    id: 'buttonAlertsPage',
    title: 'Alertas',
    alt: 'Ícone de alertas',
    path: '/alerts',
    src: AlertsIcon
  },
  {
    id: 'buttonEventsPage',
    title: 'Eventos',
    alt: 'Ícone de eventos',
    path: '/events',
    src: EventsIcon
  },
  {
    id: 'buttonEmployeesPage',
    title: 'Colaboradores',
    alt: 'Ícone de dados colaboradores',
    path: '/employees',
    src: EmployeesIcon
  },
 /* {
    id: 'buttonReportsPage',
    title: 'Relatórios',
    alt: 'Ícone de relatórios',
    path: '/reports',
    src: ReportIcon
  }*/
]

export const SidebarLogoutConfiguration = [
  {
    id: 'buttonConfigPage',
    title: 'Configuração',
    alt: 'Ícone de configuração',
    path: '/config',
    src: ConfigIcon
  },
  {
    id: 'buttonLogoutPage',
    title: 'Sair',
    alt: 'Ícone de Logout',
    path: '/logout',
    src: LogoutIcon,
    style: {
      marginLeft: '-0.3rem'
    }
  }
]
