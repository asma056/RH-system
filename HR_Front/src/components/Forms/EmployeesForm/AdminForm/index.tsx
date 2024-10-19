import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { postEditEmployee, getEmployeeCep } from '../../../../services/Employee'

import { isValidDate } from '../../../../functions/IsValidDate'

import {
  Button,
  CustomSelectInput,
  Input,
  InputGroupTitle,
  Calendar
} from '../../..'

import { DefaultLayoutPopUp } from '../../../../layouts/DefaultLayoutPopUp'

import AddPhotoIcon from '../../../../assets/icons/add-photo.svg'
import CheckedIcon from '../../../../assets/icons/checked.svg'
import ProfilePicture from '../../../../assets/img/user.png'

import {
  PersonalData,
  AddressData,
  ProfessionalData,
  usePersonalData,
  useAddressData,
  useProfessionalData
} from '../data/input'

import {
  SelectWorkFormatData,
  SelectWorkPositionData,
  SelectWorkLevelData
} from '../data/select'

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
import { handleInputBlankError } from '../../../../functions/handleInputBlanckError'
import { EmployeesList, EmployeesListProps } from '../../../../pages/Employees/employeeItems'
import axios from 'axios'

interface Props {
  sendDocumentsButton: boolean
}

export default function SettingForm({ id }: { id: number }) {
  const navigate = useNavigate()
  const UserId = localStorage.getItem('@3035TECH/userId')

  const [submitted, setSubmitted] = useState(false)
  const { personalData, handlePersonalDataChange } = usePersonalData()
  const [currentPassword, setCurrentPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const userId = localStorage.getItem('@3035TECH/userId')

  const [showPopupSuccess, setShowPopupSuccess] = useState(false)
  const [showPopupSave, setShowPopupSave] = useState(false)

  const [showBlankWarning, setShowBlankWarning] = useState(false)
  const [showIncorrectSpellWarning, setShowIncorrectSpellWarning] =
    useState(false)

  const handleSelectBlankError = () => {}

  const hidePopupSuccess = () => {
    setShowPopupSuccess(false)
  }

  const hidePopupSave = () => {
    setShowPopupSave(false)
  }

  const handleSaveSuccess = async () => {

    console.log('currentPassword =>',currentPassword)
    console.log('newPassword=>',newPassword)

    const response = await axios.put(
      `http://localhost:3000/user/password/${userId}`,
      {currentPassword,newPassword},
      {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log(response.data.message)

      if (response.data.message === "Password updated" )
        {
          setShowPopupSuccess(true)
          setShowPopupSave(false)
          setTimeout(hidePopupSuccess, 3000)
      
        }
        else{
          setShowBlankWarning(true)
          setShowPopupSave(false)


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
    const hasSelectBlankError = handleSelectBlankError()
    let hasInputBlankError = false
    let hasError = false

    if (!currentPassword || !newPassword || !confirmPassword) {
      hasError = true
      setShowBlankWarning(true)
    } else {
      setShowBlankWarning(false)
    }
    handleSave(hasError)
  }





  return (
    <EmployeesFormBody onSubmit={errorChecking}>
      <InputGroupTitle text="Update password" />
      <DivInput>
        <Input
          value={currentPassword}
          type={'password'}
          id={'currentPassword'}
          placeholder={'Current Password'}
          required={false}
          text={'Current Password'}
          className={''}
          key={'currentPassword'}
          onChange={(e) => setCurrentPassword(e.target.value)}
          error={false}
          maxCharacters={50}
        />
        <Input
          value={newPassword}
          type={'password'}
          id={'newPassword'}
          placeholder={'New Password'}
          required={false}
          text={'New Password'}
          className={''}
          key={'newPassword'}
          onChange={(e) => setNewPassword(e.target.value)}
          error={false}
          maxCharacters={50}
        />
        <Input
          value={confirmPassword}
          type={'password'}
          id={'confirmPassword'}
          placeholder={'Confirm Password'}
          required={false}
          text={'Confirm Password'}
          className={''}
          key={'confirmPassword'}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={false}
          maxCharacters={50}
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
                setTimeout(() => {
                  navigate('/users')
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
