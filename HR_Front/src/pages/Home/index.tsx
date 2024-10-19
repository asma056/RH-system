import { useContext, useEffect } from 'react'
import { HomeContainer, Container } from './styles'
import { PageContext } from '../../contexts/pageName'

export function Home() {
  const { setPageTitle, setPageImage } = useContext(PageContext)

  useEffect(() => {
    setPageTitle('')
    setPageImage('')
  }, [])
  return (
    <HomeContainer>
      <Container>
        <h1 id="WelcomeHome" className="home-title">
          Bem-vindo ao RH
        </h1>
      </Container>
    </HomeContainer>
  )
}
