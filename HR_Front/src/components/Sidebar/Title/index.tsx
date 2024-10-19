import { Icon, TitleContainer, TitlePage } from '../styles'

interface TitlePageProps {
  title?: string
  icon?: string
  sidebar: boolean
}

const Title = ({ title, icon, sidebar }: TitlePageProps) => {
  return (
    <TitleContainer sidebar={sidebar}>
      <Icon src={icon} alt={title} />
      <TitlePage>{title}</TitlePage>
    </TitleContainer>
  )
}

export default Title
