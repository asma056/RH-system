import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { PageContext } from '../../../contexts/pageName'
import { FormViewUser, InternNavigationBar } from '../../../components'

import pageIcon from '../../../assets/icons/user.svg'

import { ContainerNavigationUser, UserContainerDiv } from '../style'

export function ViewUser() {
  const { id } = useParams()
  const userIdNumber = Number(id)
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
          secondPage="Visualizar Usuário"
          idFirstPage="NavlinkUsersPage"
          idSecondPage="AtualPage"
        />
      </ContainerNavigationUser>
      <UserContainerDiv>
        <FormViewUser id={userIdNumber} />
      </UserContainerDiv>
    </>
  )
}
