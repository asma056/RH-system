import { useState } from 'react'

import { DocumentsListProps } from '../data/documentList'

import Table from '../../../../index'

import {
  DocumentsBodyTableName,
  DocumentsHeadTable,
  TableContainer
} from './styles'
import { IconImage } from '../styles'
import pdfImg from '../../../../../assets/icons/pdf_gray.svg'
import fileImage from '../../../../../assets/icons/fileImage.svg'

import PdfIcon from '../../../../../assets/icons/pdfIcon.svg'
import RightIcon from '../../../../../assets/icons/checked.svg'
import DeleteIcon from '../../../../../assets/icons/delete.svg'

const DocumentsList = ({ id, name, size,type,isUpload }: DocumentsListProps) => {
  return (
    <>
      <DocumentsBodyTableName>
        { type == 'application/pdf' ? 
        (<img id="imgPdfDocument" src={pdfImg} alt="documento pdf" />) :
        (<img id="imgPdfDocument" src={fileImage} alt="documento pdf" />)
        }
        {name}
      </DocumentsBodyTableName>
      <td>{size}</td>
      <td>
        <IconImage src={RightIcon} alt="Arquivo enviado!" />
      </td>
    </>
  )
}

export function TermsTable({
  documentsList
}: {
  documentsList: DocumentsListProps[]
}) {
  const [documents, setDocuments] = useState(documentsList)
  const tableHeader = () => (
    <DocumentsHeadTable>
      <th>Nome do Arquivo</th>
      <th>Tamanho</th>
      <th> </th>
      <th> </th>
    </DocumentsHeadTable>
  )

  const rows = documentsList.map((document) => ({
    id: document.id,
    content: <DocumentsList key={document.id} {...document} />
  }))
  return (
    <TableContainer>
      <Table
        idTable="documentsTable"
        rowRenderer={rows}
        headerRenderer={tableHeader}
      />
    </TableContainer>
  )
}
