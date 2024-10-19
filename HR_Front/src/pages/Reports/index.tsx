import { useContext, useEffect } from 'react'
import { PageContext } from '../../contexts/pageName'
import pageIcon from '../../assets/icons/reports.svg'

export function Reports() {
  const { setPageTitle, setPageImage } = useContext(PageContext)

  useEffect(() => {
    setPageTitle('Relatórios')
    setPageImage(pageIcon)
  }, [])
  return <div />
}
