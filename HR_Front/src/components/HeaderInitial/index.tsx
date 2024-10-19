import Logo from '../../assets/img/white-logo.svg'
import { LogoSession, DivArround, ContentSession } from './style'

interface Props {
  children: React.ReactNode
  title?: string
  idTitle?: string
  subtitle: string
  idSubtitle: string
}

export function HeaderInitial({
  children,
  title,
  subtitle,
  idTitle,
  idSubtitle
}: Props) {
  return (
    <DivArround>
      <LogoSession>
        <img id="imgLogo" src={Logo} alt="Logo" />
      </LogoSession>
      <ContentSession>
        <h1 id={idTitle}>{title}</h1>
        <p id={idSubtitle}>{subtitle}</p>
        {children}
      </ContentSession>
    </DivArround>
  )
}
