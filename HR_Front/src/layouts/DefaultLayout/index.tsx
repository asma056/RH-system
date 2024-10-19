import { Outlet } from 'react-router-dom'
import { usePageContext } from '../../contexts/pageName'

import { Sidebar, Header } from '../../components'

import PerfilPhoto from '../../assets/img/user.png'

import { GeneralContainer, ContentContainer } from './styles'

export function DefaultLayout() {
  const { pageTitle, pageImage } = usePageContext()
  const userName = localStorage.getItem('@3035TECH/name')
  return (
    <GeneralContainer>
      <Header
        userName={userName || 'nome de usuário'}
        perfilPhoto={PerfilPhoto}
      />
      <Sidebar title={pageTitle} icon={pageImage} />
      <ContentContainer>
        <Outlet />
      </ContentContainer>
    </GeneralContainer>
  )
}
