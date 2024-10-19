import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { DefaultLayoutPopUp } from '../../../../../layouts/DefaultLayoutPopUp'

import { isValidDate } from '../../../../../functions/IsValidDate'

import CheckedIcon from '../../../../../assets/icons/checked.svg'

import { InputGroupTitle, Calendar, Button } from '../../../..'
import { InputTextArea } from '../../../../InputTextArea'
import { InputDisabled } from '../Components/InputDisabled'

import { Container, InputGroup, SaveButton } from './style'
import { DivButton, EmployeesFormBody, OverlayDiv } from '../../styles'

import { ProfessionalData, useProfessionalData } from '../../data/input'
import { SelectWorkFormatData } from '../../data/select'

export function FormEditTerminationEmployee() {
  const navigate = useNavigate()
  const [dismissedDateEmployee, setDismissedDateEmployee] = useState(new Date())
  const { professionalData, handleProfessionalDataChange } =
    useProfessionalData()
  const selectWorkFormatEmployee = 'CLT'
  const [showPopupSuccess, setShowPopupSuccess] = useState(false)
  const [showPopupSave, setShowPopupSave] = useState(false)
  const hidePopupSuccess = () => {
    setShowPopupSuccess(false)
  }
  const hidePopupSave = () => {
    setShowPopupSave(false)
  }
  const handleSaveSuccess = () => {
    setShowPopupSuccess(true)
    setShowPopupSave(false)
    setTimeout(hidePopupSuccess, 3000)
  }

  return (
    <EmployeesFormBody>
      <InputGroupTitle text="Dados Profissionais" />
      <Container>
        <InputGroup>
          <InputDisabled
            content={ProfessionalData[0].value}
            title={ProfessionalData[0].text}
            required={ProfessionalData[0].required}
          />
          <InputDisabled
            content={selectWorkFormatEmployee}
            title={SelectWorkFormatData.text}
            required={SelectWorkFormatData.required}
          />
        </InputGroup>
        <InputGroup>
          <Calendar
            id={ProfessionalData[5].id}
            required
            text={ProfessionalData[5].text}
            date={dismissedDateEmployee}
            value={professionalData[ProfessionalData[5].id]}
            error={ProfessionalData[5].error}
            onChange={(d: Date) => {
              setDismissedDateEmployee(d as Date)
              handleProfessionalDataChange(d, ProfessionalData[5].id)
              ProfessionalData[5].error = !isValidDate(d)
            }}
          />
          <InputTextArea
            id={ProfessionalData[6].id}
            value={professionalData[ProfessionalData[6].id]}
            text={ProfessionalData[6].text}
            placeholder={ProfessionalData[6].placeholder}
            required={ProfessionalData[6].required}
            onChange={(e) =>
              handleProfessionalDataChange(e, ProfessionalData[6].id)
            }
          />
        </InputGroup>
      </Container>
      <SaveButton
        id="buttonSaveEmployeeTerminationForm"
        type="button"
        onClick={() => setShowPopupSave(true)}
      >
        SALVAR
      </SaveButton>
      {(showPopupSave || showPopupSuccess) && <OverlayDiv />}
      {showPopupSave ? (
        <DefaultLayoutPopUp title="Tem certeza que deseja finalizar o desligamento deste colaborador?">
          <DivButton>
            <Button
              text="Confirmar"
              id="ButtonSaveNewUser"
              invertColor
              onClick={() => {
                handleSaveSuccess()
                setTimeout(() => {
                  navigate('/employees/termination/view')
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
          title="Desligamento concluído com sucesso!"
        />
      )}
    </EmployeesFormBody>
  )
}
