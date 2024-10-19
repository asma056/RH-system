import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { documentsReturnList } from '../data/documentList'
import { EquipmentInputSelectData } from '../data/equipmentInputSelectData'

import { Button, InputDisabled } from '../../../../index'
import { TermsTable } from '../TermsTable'
import { DivButton, EmployeesFormBody, OverlayDiv } from '../../styles'
import {
  InputGroupTitleWrapper,
  InputGroupTitle
} from '../ViewEquipments/styles'
import {
  ContainerInputGroup,
  DivInputGroup,
  DivBottomButtons,
  ContainerUploadWrapper
} from '../styles'
import { BottomButton } from '../../ViewEmployee/styles'
import { ContainerUpload } from '../../../../../pages/Employees/Documents/NewDocument/style'
import { DefaultLayoutPopUp } from '../../../../../layouts/DefaultLayoutPopUp'

import DownloadIcon from '../../../../../assets/icons/download.svg'
import UploadFileIcon from '../../../../../assets/icons/file.svg'
import CheckedIcon from '../../../../../assets/icons/checked.svg'
import { getOrderById, returnEquipmentOrder } from '../../../../../services/Equipements'
import { format } from 'date-fns'

interface EquipmentReturnProps {
  id: number
}

export function EquipmentReturn({ id }: EquipmentReturnProps) {
  const generateDocumentButton = documentsReturnList.length === 0
  const attachDocumentButton = documentsReturnList.length === 1
  const [selectEquipment, setSelectEquipment] = useState('')
  const [returnDate, setReturnDate] = useState(new Date())
  const [dateError, setDateError] = useState(false)
  const [order, setOrder] = useState<any>()

  const [returnDateObservation, setReturnDateObservation] = useState('')
  const [showAttachComponent, setShowAttachComponent] = useState(false)
  const [showPopupGenerateDocument, setShowPopupGenerateDocument] =
    useState(false)
  const [showPopupSuccess, setShowPopupSuccess] = useState(false)
  const testRef = useRef<HTMLDivElement | null>(null)
  const navigate = useNavigate()
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOrderById(id);
  
        if (!response) {
          console.log('Error: No response');
        } else {
          const data = response
          setOrder(data.results) 
  
        }
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };
  
    fetchData();
  }, []);

  const scrollToElement = () =>
    testRef.current && testRef.current.scrollIntoView({ behavior: 'smooth' })
  const hidePopupGenerateDocument = () => {
    setShowPopupGenerateDocument(false)
  }
  const handleSaveDocumentAttach = async  () => {

    try {

      const response = await returnEquipmentOrder(
        id
      )
      if (response.message === 'Order returned successfully') {
        setShowPopupSuccess(true)
        setTimeout(() => {
          navigate(`/employees/equipments/view/${id}`)
        }, 3250)
          } else {
        console.error('Falha ao cadastrar usuário. Status:', response.status)
      }
    } catch (error) {
      console.error('Ocorreu um erro ao enviar a requisição:', error)
    }


    
  }
  useEffect(() => {
    scrollToElement()
    if (showAttachComponent) setShowPopupGenerateDocument(true)
  }, [showAttachComponent])

  return (
    <EmployeesFormBody style={{ padding: 0 }}>
      <ContainerInputGroup>
        <InputGroupTitleWrapper>
          <InputGroupTitle>Devolução de equipamento</InputGroupTitle>
        </InputGroupTitleWrapper>
        <DivInputGroup>
          <InputDisabled
            content={order?.name || ''}
            title="Equipamento"
            required
            placeholder="Notebook Acer Aspite 5"
          />
          <InputDisabled
            content={
              order?.equipmentId || ''
            }
            title="Número de identificação"
            required
            placeholder="Ex.: 1b3d5f7h9"
          />
        </DivInputGroup>
        <DivInputGroup>
          <InputDisabled
            content={order?.deliveryDate || ''}
            title="Data entrega"
            required
            placeholder="DD/MM/YYYY"
          />
          <InputDisabled
            content={order?.observation || ''}
            title="Observação"
            required
            placeholder="Deve ser entrega até as 18h"
          />
        </DivInputGroup>
        <DivBottomButtons>
          <BottomButton
            id="ButtonAttachDocument"
            invertColor={true}
            onClick={(e) => {
              e.preventDefault()
              handleSaveDocumentAttach()
            }}
          >
            <p>Return Equipements</p>
          </BottomButton>
        </DivBottomButtons>
      </ContainerInputGroup>
      {(showPopupSuccess || showPopupGenerateDocument) && <OverlayDiv />}
      {showPopupGenerateDocument && (
        <DefaultLayoutPopUp title="Tem certeza que deseja adicionar entrega deste equipamento?">
          <DivButton>
            <Button
              text="Salvar"
              id="ButtonSaveDocumentAttach"
              invertColor
              onClick={() => handleSaveDocumentAttach()}
              cancelColor={false}
            />
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
