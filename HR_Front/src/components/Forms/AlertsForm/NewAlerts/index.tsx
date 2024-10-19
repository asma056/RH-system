import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NewAlerts } from '../../../../services/Alerts'


import {
  Button,
  CustomSelectInput,
  Input,
  InputGroupTitle,
  Calendar
} from '../../..'

import { DefaultLayoutPopUp } from '../../../../layouts/DefaultLayoutPopUp'

import CheckedIcon from '../../../../assets/icons/checked.svg'


import {
  AddPhotoButton,
  AddPhoto,
  DivButton,
  DivInput,
  DivPerfilPhoto,
  DivSelect,
  EmployeesFormBody,
  OverlayDiv,
  PerfilPhoto,
  SaveButton,
  SendDocsButton,
  WarningText
} from '../styles'

interface Props {
  sendDocumentsButton: boolean
}

export function FormNewAlerts({ sendDocumentsButton }: Props) {
  const navigate = useNavigate()
  const [submitted, setSubmitted] = useState(false)

  const [name, setName] = useState('');

  const [description, setDescription] = useState('')


  const [showPopupSuccess, setShowPopupSuccess] = useState(false)
  const [showPopupSave, setShowPopupSave] = useState(false)

  const [showBlankWarning, setShowBlankWarning] = useState(false)
  const [showIncorrectSpellWarning, setShowIncorrectSpellWarning] =
    useState(false)

 

  const hidePopupSuccess = () => {
    setShowPopupSuccess(false)
  }

  const hidePopupSave = () => {
    setShowPopupSave(false)
  }

  const handleSaveSuccess = async () => {


    try {

      const response = await NewAlerts(
        name,
        description
      )
      if (response.message === 'Successfully created alert') {
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



  const handleSave = (hasError: boolean) => {
    if (hasError) {
      setShowPopupSave(false)
    } else {
      setShowPopupSave(true)
    }
  }

  const errorChecking = (event: React.FormEvent) => {
    event.preventDefault()
    let hasError = false

    if (name.length != 0 && description.length != 0) {
      setShowBlankWarning(false)
    } else {
      hasError = true
      setShowBlankWarning(true)
    }
    handleSave(hasError)
  }


  

  return (
    <EmployeesFormBody onSubmit={errorChecking}>
      <InputGroupTitle text="Alerts" />
      <DivInput>
            <Input
              value={name}
              type={'text'}
              id={'inputName'}
              placeholder={'input name'}
              required={false}
              text={'Name'}
              className={'inputName'}
              key={'inputName'}
              onChange={(e) => setName(e.target.value)}
              error={false}
              maxCharacters={60}
            />
              <Input
              value={description}
              type={'text'}
              id={'inputDesc'}
              placeholder={'input description'}
              required={false}
              text={'Description'}
              className={'inputDesc'}
              key={'inputDesc'}
              onChange={(e) => setDescription(e.target.value)}
              error={false}
              maxCharacters={60}
            />
         
      </DivInput>

      <SaveButton
        type="submit"
        id="buttonSaveEmployeeForm"
        onClick={() => {
          setSubmitted(true)
        }}
      >
        SALVAR
      </SaveButton>
      {showBlankWarning && (
        <WarningText>
          Existem itens obrigatórios a serem preenchidos
        </WarningText>
      )}
      {showIncorrectSpellWarning && (
        <WarningText>Existem itens preenchidos incorretamente</WarningText>
      )}
      {(showPopupSave || showPopupSuccess) && <OverlayDiv />}
      {showPopupSave ? (
        <DefaultLayoutPopUp title="Tem certeza que deseja salvar as alterações? ">
          <DivButton>
            <Button
              text="Confirmar"
              id="ButtonSaveNewUser"
              invertColor
              onClick={() => {
                handleSaveSuccess()
                console.log('taper')
                setTimeout(() => {
                  navigate('/alerts')
                }, 3250)
              }}
              cancelColor={false}
            />
            <Button
              text="Cancelar"
              id="ButtonSaveNewUser"
              invertColor={false}
              onClick={hidePopupSave}
              cancelColor={false}
            />
          </DivButton>
        </DefaultLayoutPopUp>
      ) : null}

      {showPopupSuccess && (
        <DefaultLayoutPopUp
          img={CheckedIcon}
          title="Cadastro realizado com sucesso!"
        />
      )}
    </EmployeesFormBody>
  )
}
