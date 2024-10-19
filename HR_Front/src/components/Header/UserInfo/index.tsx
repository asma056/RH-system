import { PerfilPhoto, UserContainer } from './styles'

interface UserInfoProps {
  userName: string
  img: string
}
const UserInfo = ({ userName, img }: UserInfoProps) => {
  return (
    <UserContainer>
      <span>{userName}</span>
      <PerfilPhoto src={img} alt="Foto de perfil" />
    </UserContainer>
  )
}
export default UserInfo
