import { CSSProperties } from 'react'
import ImgPerfil from '../../assets/img/user.png'

export interface EmployeesListProps {
  id: number
  active: boolean
  fullName: string
  jobFormat: string
  position: string
  admissionDate: string
  img: string
  userId: number
  imgUrl: string
  style?: CSSProperties
}

export const EmployeesList: EmployeesListProps[] = [
 
]
