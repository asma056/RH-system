import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { documentsDeliveryList } from '../data/documentList'
import { EquipmentInputSelectData } from '../data/equipmentInputSelectData'

import {
  Button,
  Calendar,
  CustomSelectInput1,
  InputDisabled
} from '../../../../index'
import { TermsTable } from '../TermsTable'
import { InputTextArea } from '../../../../InputTextArea'
import { DivButton, EmployeesFormBody, OverlayDiv } from '../../styles'
import {
  InputGroupTitleWrapper,
  InputGroupTitle
} from '../ViewEquipments/styles'
import {
  ContainerInputGroup,
  ContainerUploadWrapper,
  DivInputGroup,
  DivBottomButtons
} from '../styles'
import { BottomButton } from '../../ViewEmployee/styles'
import { ContainerUpload } from '../../../../../pages/Employees/Documents/NewDocument/style'
import { DefaultLayoutPopUp } from '../../../../../layouts/DefaultLayoutPopUp'

import { isValidDate } from '../../../../../functions/IsValidDate'

import DownloadIcon from '../../../../../assets/icons/download.svg'
import UploadFileIcon from '../../../../../assets/icons/file.svg'
import CheckedIcon from '../../../../../assets/icons/checked.svg'
import { NewEquip} from '../../../../../services/Equipements'
import { getAllStock} from '../../../../../services/Stock'

import {
  UploadDocumentsDataList,
  UploadDocumentsListProps
} from '../../../../../pages/Employees/Documents/NewDocument/uploadDocumentData'
import { useSelectedEmployee } from '../../../../../contexts/selectedEmployee'

interface EquipmentDeliveryProps {
  id: number
}

export function EquipmentDelivery({ id }: EquipmentDeliveryProps) {
  const { selectedEmployeeId } = useSelectedEmployee()

  const generateDocumentButton = documentsDeliveryList.length === 1
  const attachDocumentButton = documentsDeliveryList.length === 1
  const [selectEquipment, setSelectEquipment] = useState('')
  const [selectEquipmentId, setSelectEquipmentId] = useState('')
  const [deliveryDate, setDeliveryDate] = useState(new Date())
  const [dateError, setDateError] = useState(false)
  const [ListStock, setListStock] = useState<any>()
  const [deliveryDateObservation, setDeliveryDateObservation] = useState('')
  const [showAttachComponent, setShowAttachComponent] = useState(false)
  const [showPopupSave, setShowPopupSave] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [documentsList, setDocumentsList] = useState(UploadDocumentsDataList)
  
  const [showPopupSuccess, setShowPopupSuccess] = useState(false)
  const testRef = useRef<HTMLDivElement | null>(null)
  const navigate = useNavigate()

  const scrollToElement = () => {
    testRef.current && testRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  const hidePopupSuccess = () => {
    setShowPopupSuccess(false)
  }


  const hidePopupGenerateDocument = () => {
    setShowPopupSave(false)
  }
  const handleSaveDocumentAttach = async () => {

    try {

      const response = await NewEquip(
        selectedEmployeeId?.toString() || '' ,
        selectEquipment,
        selectEquipmentId,
        deliveryDate.toString(),
        selectedFiles,
        deliveryDateObservation

      )
      if (response.message === 'Order created successfully') {
        setShowPopupSuccess(true)
        setShowPopupSave(false)
        setTimeout(hidePopupSuccess, 3000)

          } else {
        console.error('Falha ao cadastrar usuário. Status:', response.status)
      }
    } catch (error) {
      console.error('Ocorreu um erro ao enviar a requisição:', error)
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllStock();
  
        if (!response) {
          console.log('Error: No response');
        } else {
          const data = response
          console.log(data)
          setListStock(data.results) 
  
        }
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    scrollToElement()
  }, [showAttachComponent])

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
      setDocumentsList(newFiles);
      setSelectedFiles(filesArray);

    }
  }

  return (
    <EmployeesFormBody style={{ padding: 0 }}>
      <ContainerInputGroup>
        <InputGroupTitleWrapper>
          <InputGroupTitle>Empréstimo de equipamento</InputGroupTitle>
        </InputGroupTitleWrapper>
        <DivInputGroup>
          {generateDocumentButton ? (
            <CustomSelectInput1
              id={EquipmentInputSelectData.id}
              placeholder="choisir Equipement"
              text="Equipamento"
              required
              options={ListStock}
              readonly
              data={selectEquipment}
              setData={setSelectEquipment}
              setId={setSelectEquipmentId}
              error={EquipmentInputSelectData.error}
              textArrow={false}
              inputArrow={false}
            />
          ) : (
            <InputDisabled
              content={selectEquipment}
              title="Equipamento"
              required
              placeholder="Notebook Acer Aspite 5"
            />
          )}
          <InputDisabled
            content={ selectEquipmentId|| ''
            }
            title="Número de identificação"
            required
            placeholder="Ex.: 1b3d5f7h9"
          />
        </DivInputGroup>
        <DivInputGroup>
          {generateDocumentButton ? (
            <>
              <Calendar
                id="InputDeliveryDate"
                required
                text="Data entrega"
                date={deliveryDate}
                error={dateError}
                onChange={(d: Date) => {
                  setDeliveryDate(d as Date)
                  setDateError(!isValidDate(d))
                }}
              />
              
              <InputTextArea
                id="deliveryDateObservationInput"
                value={deliveryDateObservation}
                text="Observação"
                placeholder="Deve ser entrega até as 18h"
                required
                onChange={(e) => setDeliveryDateObservation(e.target.value)}
                height={20}
              />
            </>
          ) : (
            <>
              <InputDisabled
                content={deliveryDate.toString()}
                title="Data entrega"
                required
                placeholder="DD/MM/YYYY"
              />
              
              <InputDisabled
                content={deliveryDateObservation}
                title="Observação"
                required
                placeholder="Deve ser entrega até as 18h"
              />
            </>
          )}
        </DivInputGroup>
        <DivBottomButtons>
          <BottomButton
            id="dqdq"
            invertColor={false}
            onClick={(e) => { 
              e.preventDefault()
              setShowPopupSave(true)
            }
            }

          >
          <p>Save</p>
          </BottomButton>

          <BottomButton
            id="ButtonAttachDocument"
            invertColor={false}
            disabled={!attachDocumentButton}
            onClick={(e) => {
              e.preventDefault()
              setShowAttachComponent(true)
            }}
          >
            <p>ANEXAR TERMO ASSINADO</p>
          </BottomButton>
        </DivBottomButtons>
      </ContainerInputGroup>
      <TermsTable documentsList={documentsList} />
      {showAttachComponent && (
        <ContainerUploadWrapper>
          <InputGroupTitle>Anexar termo assinado</InputGroupTitle>
          <ContainerUpload id="ContainerDownloadDocument" ref={testRef}>
          <label htmlFor="fileInput">

            <img src={UploadFileIcon} alt="faça download dos arquivos" />
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
        </ContainerUploadWrapper>
      )}
      {(showPopupSuccess || showPopupSave) && <OverlayDiv />}
      {showPopupSave && (
        <DefaultLayoutPopUp title="Tem certeza que deseja adicionar entrega deste equipamento?">
          <DivButton>
            <BottomButton
              id="ButtonSaveDocumentAttach"
              invertColor
                 onClick={(e) => {
                e.preventDefault()
                 handleSaveDocumentAttach()
                 setTimeout(() => {
                  navigate(`/employees/equipments/view/${id}`)
                }, 3250)

            
              }
        }
            >
              <p>Confirm</p>
              </BottomButton>

            <Button
              text="Cancelar"
              id="ButtonCancelDocumentAttach"
              invertColor={false}
              onClick={hidePopupGenerateDocument}
              cancelColor={false}
            />
          </DivButton>
        </DefaultLayoutPopUp>
      )}

      {showPopupSuccess && (
        <DefaultLayoutPopUp
          img={CheckedIcon}
          title="Entrega adicionada com sucesso!"
        />
      )}
    </EmployeesFormBody>
  )
}
