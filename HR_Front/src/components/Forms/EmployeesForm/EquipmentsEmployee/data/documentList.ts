export interface DocumentsListProps {
  id: number
  name: string
  size: string
  type: string
  isUpload: boolean
}

export const documentsDeliveryList: DocumentsListProps[] = [
  {
    id: 1,
    name: 'Termo de Entrega',
    size: '16 MB',
    type: 'png',
    isUpload: true
  }
]
export const documentsReturnList: DocumentsListProps[] = [
  {
    id: 1,
    name: 'Termo de Devolução',
    size: '16 MB',
    type: 'pdf',
    isUpload: true

  },
  {
    id: 2,
    name: 'Termo de Devolução assinado',
    size: '16.5 MB',
    type: 'png',
    isUpload: true

  }
]
