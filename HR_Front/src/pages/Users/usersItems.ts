import ImgPerfil from 'assets/img/user.png'

export interface UsersListProps {
  id: number
  actived: boolean
  name: string
  role: string
  img: string
  createdAt: string
}

export const UsersList = [
  {
    id: 1,
    actived: false,
    name: 'Kaiane',
    role: 'II',
    createdAt: '18/01/22',
    img: ImgPerfil
  }
]
