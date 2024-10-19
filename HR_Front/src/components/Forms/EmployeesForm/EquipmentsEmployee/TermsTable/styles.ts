import styled from 'styled-components'

export const TableContainer = styled.div`
  width: 100%;
  position: relative;
  margin-top: 2.5rem;
  overflow-x: auto;
  table tHead {
    z-index: 0;
  }
`

export const DocumentsHeadTable = styled.tr`
  th {
    :first-child {
      text-align: start !important;
      padding-left: 2.5rem !important;
    }

    :last-child {
      display: flex;
      align-items: center;
      justify-content: space-evenly;

      button {
        border: none;
        background-color: transparent;

        img {
          height: 1.7rem;
        }
      }
    }
  }
`

export const DocumentsBodyTableName = styled.td`
  display: flex;
  text-align: center;
  img {
    margin-left: 2.5rem;
  }
`
export const DocumentsBobyTableButtons = styled.td`
  width: 15%;
`
