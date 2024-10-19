import { useContext, useEffect, useState } from 'react'
import { useSelectedEmployee } from '../../../contexts/selectedEmployee'
import { DateFrom } from '../../../functions/ConvertirDate'

import { DefaultLayoutPopUp } from '../../../layouts/DefaultLayoutPopUp'
import { DivButton } from '../../../components/Forms/EmployeesForm/styles'
import { DownloadComponent } from './styles'

import Table, {
  Button,
  Input,
  InternNavigationBar,
  NavigationBar
} from '../../../components'

import SearchIcon from '../../../assets/icons/search.svg'
import pageIcon from '../../../assets/icons/employees.svg'
import plusImg from '../../../assets/icons/plus.svg'
import downloadImg from '../../../assets/icons/download.svg'
import deleteImg from '../../../assets/icons/delete.svg'
import pfdImg from '../../../assets/icons/pdfIcon.svg'
import fileImage from '../../../assets/icons/imageIcon.svg'

import CheckedIcon from '../../../assets/icons/checked.svg'
import alert from '../../../assets/icons/alert.svg'

import { PageContext } from '../../../contexts/pageName'

import {
  GetNavigationItemButtonData,
  GetNavigationDropdownMenuItems
} from '../NavigationEmployees/navigation'
import {
  Container,
  DivInput,
  DocumentsBobyTableButtons,
  DocumentsBodyTableName,
  DocumentsHeadTable,
  DocumentsIcons,
  EmployeesContainer,
  EmployeesHeader,
  ImgSearch,
  NavigationContainer,
  OverlayDiv,
  RadioInputButtonDocuments,
  SearchButton
} from '../styles'

import { DocumentsDataList, DocumentsListProps } from './documentsItems'
import { NewDocument } from './NewDocument'
import { EmployeesList, EmployeesListProps } from '../employeeItems'
import axios from 'axios'
import { useNavigate, useNavigation } from 'react-router-dom'

const DocumentsList = ({
  id,
  name,
  type,
  dateOfUpload,
  isChecked,
  url,
  handleDocumentSelection,
  handleDocumentSelectionUrl
}: DocumentsListProps & {
  isChecked: boolean
  handleDocumentSelection: (idSelected: number) => void
  handleDocumentSelectionUrl: (url: string) => void
}) => {
  return (
    <>
      <DocumentsBodyTableName>
      { type == 'application/pdf' ? 
        (<img id="imgPdfDocument" src={pfdImg} alt="documento pdf" />) :
        (<img id="imgPdfDocument" src={fileImage} alt="documento pdf" />)
        }
       
        {name}
      </DocumentsBodyTableName>
      <td>{type.split('/')[1].toLocaleUpperCase()}</td>
      <td>{DateFrom(dateOfUpload)}</td>
      <DocumentsBobyTableButtons>
        <RadioInputButtonDocuments
          type="radio"
          checked={isChecked}
          onClick={() =>{

           handleDocumentSelection(id)  
           handleDocumentSelectionUrl(url)
          }}
          readOnly
        />
      </DocumentsBobyTableButtons>
    </>
  )
}

export function DocumentsEmployee() {
  const { setPageTitle, setPageImage } = useContext(PageContext)
  const [search, setSearch] = useState('')
  const [documentsListFiltre, setDocumentsListFiltre] = useState(DocumentsDataList)
  const [documentsList, setDocumentsList] = useState(DocumentsDataList)
  const [selectedDocumentIds, setSelectedDocumentIds] = useState<string[]>([])
  const [selectedDocumentUrl, setSelectedDocumentUrl] = useState<string | null>(null);
  const [showPopupDelete, setShowPopupDelete] = useState(false)
  const [IsDeleted, setIsDeleted] = useState(false)
  const [showPopupDeleteSucess, setShowPopupDeleteSuccess] = useState(false)
  const [showPopupDeleteerror, setShowPopupDeleteerror] = useState(false)
  const [showModalNewDocument, setShowModalNewDocument] = useState(false)
  const { selectedEmployeeId,selectedEmployeeName } = useSelectedEmployee()
  const role = localStorage.getItem('@3035TECH/role')

  useEffect(() => {
    // Effectuez la requête GET à votre API pour récupérer les données des employés
    axios.get(`http://localhost:3000/employee/document/${selectedEmployeeId}`)
      .then(response => {
        const data = response.data
        console.log(data.results[0].documents)
        setDocumentsList(data.results[0].documents) 
        setDocumentsListFiltre(data.results[0].documents) 
        // Stockez les données des employés dans l'état
      })
      .catch(error => {
        console.error('Erreur :', error)
      })
  }, [{IsDeleted,showModalNewDocument}]) // Utilisez un tableau vide pour exécuter l'effet une seule fois au chargement du composant


  const handleDocumentSelectionUrl = (url: string) => {
    setSelectedDocumentUrl(url);
  };
  
  const hidePopupDelete = () => {
    setShowPopupDelete(false)
  }
  const hidePopupDeleteSuccess = () => {
    setShowPopupDeleteSuccess(false)
  }

  const hidePopupDeleteError = () => {
    setShowPopupDeleteerror(false)
  }
  
  const handleDelete = () => {
    setShowPopupDelete(true)
  }
  const handleDeleteSuccess = async () => {

  axios.delete(`http://localhost:3000/employee/document/delete/${selectedDocumentIds}`, {
  headers: {
    'accept': '*/*'
  }
})
  .then(response => {
    console.log('Response:', response.data.message);

    if(response.data.message == "Successfully deleted document"){
    setShowPopupDeleteSuccess(true)
    setShowPopupDelete(false)
    setTimeout(hidePopupDeleteSuccess, 3000)
    setIsDeleted(true);

    }
    console.log('Response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error.response.data);
    setShowPopupDeleteerror(true)
    setTimeout(hidePopupDeleteError, 3000)

    
  });

  }


  const downloadFile = async () => {

    if (!selectedDocumentUrl) {
      console.error('Aucun document sélectionné.');
      return;
    }
  
    window.open(selectedDocumentUrl, '_blank');
    
  };
    

  const handleModalNewDocument = () => {
    setShowModalNewDocument(true)
  }
  const hideModalNewDocument = () => {
    setShowModalNewDocument(false)
  }

  const handleDocumentSelection = (id: number) => {
    if (selectedDocumentIds.includes(id.toString())) {
      // Si le document est déjà sélectionné, déselectionnez-le
      setSelectedDocumentIds([]);
    } else {
      // Sinon, déselectionnez tous les autres documents et sélectionnez celui-ci
      setSelectedDocumentIds([id.toString()]);
    }
  }
  useEffect(() => {
    setPageTitle('Dados dos Colaboradores')
    setPageImage(pageIcon)
  }, [])


  useEffect(() => {
    const filteredData = documentsListFiltre.filter((documents) => {
      const nameMatch = documents.name
        .toLowerCase()
        .includes(search.toLowerCase())
      const dateMatch = documents.dateOfUpload
        .toLowerCase()
        .includes(search.toLowerCase())
      return nameMatch || dateMatch
    }).sort((a, b) => {
      return a.name.localeCompare(b.name)
    })
    setDocumentsList(filteredData)

    if( search == ''){
      setDocumentsList(documentsListFiltre)

    }
  }, [search])

  const tableHeader = () => (
    <DocumentsHeadTable>
      <th>Nome do Arquivo</th>
      <th>Tipo</th>
      <th>Data de Upload</th>
      <th>
        <button type="submit" disabled={selectedDocumentIds.length === 0}>
          <DocumentsIcons
            disabled={selectedDocumentIds.length === 0}
            src={downloadImg}
            onClick={downloadFile}
            alt="fazer download dos arquivos"
          />
        </button>
        <button
          type="submit"
          onClick={handleDelete}
          disabled={selectedDocumentIds.length === 0}
        >
          <DocumentsIcons
            disabled={selectedDocumentIds.length === 0}
            src={deleteImg}
            alt="excluir os arquivos"
          />
        </button>
      </th>
    </DocumentsHeadTable>
  )

  const rows = documentsList.map((document) => ({
    id: document.id,
    content: (
      <DocumentsList
        key={document.id}
        {...document}
        isChecked={selectedDocumentIds.includes(document.id.toString())}
        handleDocumentSelection={handleDocumentSelection}
        handleDocumentSelectionUrl={handleDocumentSelectionUrl}
      />
    )
  }))

  return (
    <>
      <EmployeesContainer id="DocumentsPage">
        <EmployeesHeader>
          <NavigationContainer>
            <NavigationBar
              buttonItems={
                GetNavigationItemButtonData(selectedEmployeeId).items
              }
              id={GetNavigationDropdownMenuItems(selectedEmployeeId).id}
              title={GetNavigationDropdownMenuItems(selectedEmployeeId).title}
              dropdownItems={
                GetNavigationDropdownMenuItems(selectedEmployeeId).items
              }
              activeItemId={
                GetNavigationItemButtonData(selectedEmployeeId).items[2].id
              }
              disableMenu={false}
            />
            <InternNavigationBar
              idFirstPage="NavLinkEmployeesPage"
              firstPage="Documentos"
              firstRoute="#"
              secondPage={selectedEmployeeName || ''}
              idSecondPage="EmployeesDocumentsPage"
            />
          </NavigationContainer>
          <Container>
            <DivInput>
              <Input
                type="text"
                id="inputSerchDocumentsEmployees"
                value={search}
                placeholder="Pesquisar documento"
                required={false}
                className="employee-input"
                onChange={(e) => setSearch(e.target.value)}
              />
              <SearchButton type="button" id="buttonSearchDocumentsEmployee">
                <ImgSearch src={SearchIcon} alt="Ícone de pesquisar" />
              </SearchButton>
            </DivInput>
            { (role === 'EMPLOYEE' ) && (

            <Button
              type="button"
              imgSrc={plusImg}
              text="DOCUMENTOS"
              id="buttonNewEmployeePage"
              className="new-employee-button"
              invertColor
              cancelColor={false}
              onClick={handleModalNewDocument}
            />)}

          </Container>
        </EmployeesHeader>
        <Table
          idTable="documentsTable"
          rowRenderer={rows}
          headerRenderer={tableHeader}
        />
      </EmployeesContainer>

      {(showPopupDelete || showPopupDeleteSucess || showModalNewDocument) && (
        <OverlayDiv />
      )}
      {showPopupDelete && (
        <DefaultLayoutPopUp title="Tem certeza que deseja excluir este documento?">
          <DivButton>
            <Button
              text="Excluir"
              id="ButtonDeleteUser"
              invertColor
              onClick={handleDeleteSuccess}
              cancelColor
            />
            <Button
              text="Cancelar"
              id="ButtonCancelDeleteEditUser"
              invertColor={false}
              onClick={hidePopupDelete}
              cancelColor={false}
            />
          </DivButton>
        </DefaultLayoutPopUp>
      )}

      {showPopupDeleteSucess && (
        <DefaultLayoutPopUp
          img={CheckedIcon}
          title="Documento excluído com sucesso!"
          content=""
        />
      )}
      {showPopupDeleteerror && (
        <DefaultLayoutPopUp
          img={alert}
          title="Documento excluído com error!"
          content=""
        />
      )}

      {showModalNewDocument && <NewDocument onClose={hideModalNewDocument} />}
    </>
  )
}
