import { Outlet } from 'react-router-dom'
import { HeaderInitial } from '../../components'

interface DefaultLayoutLoginProps {
  children: React.ReactNode
  title?: string
  idTitle?: string
  subtitle: string
  idSubtitle: string
}

export function DefaultLayoutLogin({
  children,
  title,
  idTitle,
  subtitle,
  idSubtitle
}: DefaultLayoutLoginProps) {
  return (
    <div>
      <HeaderInitial
        title={title}
        idTitle={idTitle}
        subtitle={subtitle}
        idSubtitle={idSubtitle}
      >
        {children}
      </HeaderInitial>
      <Outlet />
    </div>
  )
}
