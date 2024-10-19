import { useContext, useEffect } from 'react'

import { PageContext } from '../../../contexts/pageName'
import { InternNavigationBar, FormNewUser } from '../../../components'

import pageIcon from '../../../assets/icons/user.svg'

import { ContainerNavigationUser, UserContainerDiv } from '../style'

export function NewUser() {
  const { setPageTitle, setPageImage } = useContext(PageContext)

  useEffect(() => {
    setPageTitle('Usuários')
    setPageImage(pageIcon)
  }, [])
  return (
    <>
      <ContainerNavigationUser>
        <InternNavigationBar
          firstPage="Usuários"
          firstRoute="/users"
          secondPage="Novo usuário"
          idFirstPage="NavLinkUserPage"
          idSecondPage="NewUserPage"
        />
      </ContainerNavigationUser>
      <UserContainerDiv>
        <FormNewUser />
      </UserContainerDiv>
    </>
  )
}
