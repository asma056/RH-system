import { useState } from 'react'

import { Button } from '../../../../components'
import { OverlayDiv } from '../../../../components/Forms/EmployeesForm/styles'
import { DefaultLayoutPopUp } from '../../../../layouts/DefaultLayoutPopUp'

import {
  UploadDocumentsDataList,
  UploadDocumentsListProps
} from './uploadDocumentData'

import {
  ButtonDiv,
  ContainerInitial,
  ContainerUpload,
  DivContentPopUp,
  DivPopUp,
  ImgTable,
  ImgTableLoader,
  NameTable,
  TableStyle,
  Tr
} from './style'

import closeImg from '../../../../assets/icons/close.svg'
import fileImg from '../../../../assets/icons/file.svg'
import pdfImg from '../../../../assets/icons/pdf_gray.svg'
import fileImage from '../../../../assets/icons/fileImage.svg'
import CheckedImg from '../../../../assets/icons/checked.svg'
import loaderImg from '../../../../assets/icons/load.svg'
import deleteImg from '../../../../assets/icons/delete.svg'
import axios from 'axios'
import { useSelectedEmployee } from '../../../../contexts/selectedEmployee'
import { useNavigate } from 'react-router-dom'

interface NewDocumentProps {
  onClose: () => void
}

const DocumentsUploadList = ({
  id,
  name,
  isUpload,
  size,
  type,
  onDelete
}: UploadDocumentsListProps & { onDelete: () => void }) => {
  const [isLoading, setIsLoading] = useState(isUpload)
  const handleDelete = () => {
    // You can perform any additional logic here before deleting if needed
    onDelete(); // Call onDelete to delete the file from the document list
  };

  return (
    <>
      <NameTable>
        { type == 'application/pdf' ? 
        (<img id="imgPdfDocument" src={pdfImg} alt="documento pdf" />) :
        (<img id="imgPdfDocument" src={fileImage} alt="documento pdf" />)
        }
        {name}
      </NameTable>
      <td id="sizePdfDocument">{size}</td>
      <td id="situationPdfDocument">
        {!isLoading ? (
          <ImgTableLoader src={loaderImg} alt="loading" />
        ) : (
          <ImgTable src={CheckedImg} alt="concluído o upload" />
        )}
      </td>
      <td>
        <ImgTable id="deleteDocument" src={deleteImg} onClick={handleDelete} style={{ cursor: 'pointer' }} alt="excluir documento" />
      </td>
    </>
  )
}

export function NewDocument({ onClose }: NewDocumentProps) {
  const [documentsList, setDocumentsList] = useState(UploadDocumentsDataList)
  const [showPopupConfirmSucess, setShowPopupSuccess] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { selectedEmployeeId } = useSelectedEmployee()
  const navigate = useNavigate()


  const hidePopupSuccess = () => {
    setShowPopupSuccess(false)
  }
  const handleConfirmSuccess = async () => {
    // Create a new FormData object
    const formData = new FormData();

    // Append each selected file to the FormData object
    selectedFiles.forEach(file => {
      formData.append('files', file);
    });

    try {
      // Send a POST request to your API endpoint
      const response = await axios.post(
        `http://localhost:3000/employee/document/upload/${selectedEmployeeId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if( response ){

      // Handle successful response
      console.log('Upload successful:', response.data);
      setShowPopupSuccess(true)
      setTimeout(hidePopupSuccess, 3000)
      setTimeout(onClose, 3100)
      }
  
    } catch (error) {
      // Handle error
      console.error('Error uploading files:', error);
    }
    onClose();
  }

  const handleDeleteDocument = (id: number) => {
    setDocumentsList(prevList => prevList.filter(doc => doc.id !== id));
    // Perform any additional logic for deleting the file from the document list
  };


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const filesArray = Array.from(files);
      const newFiles = Array.from(files).map(file => {
        // Extract id, name, and size from each selected file
        const id =Math.floor(Math.random() * 100) + 1;
        const name = file.name;
        const sizeInBytes = file.size;
        const type = file.type;
        const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
        const size = `${sizeInMB} MB`; 
  
        // Return an object representing the file information
        return { id, name, size, type , isUpload: true };
      });

      // Update the documents list state with the new files information
      setDocumentsList(prevList => [...prevList, ...newFiles]);
      setSelectedFiles(prevList => [...prevList, ...filesArray]);

    }
  }
  

  const rows = documentsList.map((document) => ({
    id: document.id,
    content: <DocumentsUploadList key={document.id} {...document} 
    onDelete={() => handleDeleteDocument(document.id)} />
  }))

  return (
    <>
      <DivPopUp id="documentsPage">
        <DivContentPopUp>
          <ContainerInitial>
            <h2 id="titleDocumentsPage">Faça o Upload dos documentos</h2>
            <button
              id="buttonCloseDocumentsPage"
              type="submit"
              onClick={onClose}
            >
              <img src={closeImg} alt="Fechar" />
            </button>
          </ContainerInitial>
          <ContainerUpload id="ContainerDownloadDocument">
          <label htmlFor="fileInput">

            <img src={fileImg} alt="faça download dos arquivos" />
            <p>Arraste ou selecione um arquivo</p>
            <p>PDF, PNG e JPG são arquivos válidos</p>
            <input
                id="fileInput"
                type="file"
                accept=".pdf,.png,.jpg"
                multiple
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </label>
          </ContainerUpload>
          <ContainerInitial>
            <h2>Documentos</h2>
          </ContainerInitial>
          <TableStyle id="documentsTable">
            <thead>
              <tr>
                <th>Nome do Aquivo</th>
                <th>Tamanho</th>
                <th> </th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <Tr
                  background={
                    row.content.props.isUpload
                      ? 'var(--background)'
                      : 'var(--gray-light)'
                  }
                  key={row.id}
                >
                  {row.content}
                </Tr>
              ))}
            </tbody>
          </TableStyle>
          <ButtonDiv>
            <Button
              text="CONCLUIR"
              id="buttonConfirNewDocuments"
              invertColor={false}
              cancelColor={false}
              onClick={handleConfirmSuccess}
              
            />
          </ButtonDiv>
        </DivContentPopUp>
      </DivPopUp>
      {showPopupConfirmSucess && (
        <DefaultLayoutPopUp
          img={CheckedImg}
          title="Documentos salvos com sucesso!"
        />
      )}


      
    </>
  )
}
