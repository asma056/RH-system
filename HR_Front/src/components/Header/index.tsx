import UserInfo from './UserInfo'

import { Container } from './styles'

interface Props {
  userName: string
  perfilPhoto: string
}

export const Header = ({ userName, perfilPhoto }: Props) => {
  const storageToken = localStorage.getItem('@3035TECH/key')
  const storageCompanyId = localStorage.getItem('@3035TECH/company_id')
  const storageEmail = localStorage.getItem('@3035TECH/email')
  const storageName = localStorage.getItem('@3035TECH/name')
  const storageRole = localStorage.getItem('@3035TECH/role')
  const storageUserId = localStorage.getItem('@3035TECH/userId')

  return (
    <Container>
      <UserInfo userName={storageName || ''} img={perfilPhoto} />
    </Container>
  )
}
