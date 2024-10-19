import React, { useState } from 'react'
import { ArrowButton, PageButton, PaginationDiv, TableStyle, Tr } from './style'

interface TableData {
  id: number
  content: React.ReactNode
}

interface TableProps {
  idTable: string
  headerRenderer: () => React.ReactNode
  rowRenderer: TableData[]
  pageSize?: number
}

const Table: React.FC<TableProps> = ({
  idTable,
  headerRenderer,
  rowRenderer,
  pageSize = 5000
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize

  const paginatedData = rowRenderer.slice(startIndex, endIndex)

  const totalPages = Math.ceil(rowRenderer.length / pageSize)

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <>
      <TableStyle id={idTable}>
        <thead>{headerRenderer()}</thead>
        <tbody>
          {paginatedData.map((row, index) => (
            <Tr
              background={
                index % 2 === 0 ? 'var(--gray-light)' : 'var(--background)'
              }
              key={row.id}
            >
              {row.content}
            </Tr>
          ))}
        </tbody>
      </TableStyle>

      {pageSize !== 5000 && (
        <PaginationDiv>
          <ArrowButton
            type="button"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            {'<'}
          </ArrowButton>
          {Array.from({ length: totalPages }, (_, index) => (
            <PageButton
              type="button"
              key={index}
              onClick={() => goToPage(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </PageButton>
          ))}
          <ArrowButton
            type="button"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            {'>'}
          </ArrowButton>
        </PaginationDiv>
      )}
    </>
  )
}

export default Table
