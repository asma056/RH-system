import { createContext, useContext, useState } from 'react'

interface PageContextData {
  pageTitle: string
  pageImage: string
  setPageTitle: (title: string) => void
  setPageImage: (image: string) => void
}

export const PageContext = createContext<PageContextData>({
  pageTitle: '',
  pageImage: '',
  setPageTitle: () => {},
  setPageImage: () => {}
})

export function usePageContext() {
  return useContext(PageContext)
}

export function PageContextProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [pageTitle, setPageTitle] = useState('')
  const [pageImage, setPageImage] = useState('')

  const contextValue = {
    pageTitle,
    pageImage,
    setPageTitle,
    setPageImage
  }

  return (
    <PageContext.Provider value={contextValue}>{children}</PageContext.Provider>
  )
}
