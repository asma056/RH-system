import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { postNewEmployee, getEmployeeCep } from '../../../../services/Employee'

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

interface Props {
  sendDocumentsButton: boolean
}

export function FormNewEmployee({ sendDocumentsButton }: Props) {
  const navigate = useNavigate()
  const [submitted, setSubmitted] = useState(false)
  const { personalData, handlePersonalDataChange } = usePersonalData()
  const { addressData, handleAddressDataChange, handleAddressDataCep } =
    useAddressData()
  const { professionalData, handleProfessionalDataChange } =
    useProfessionalData()
  const [birthDate, setBirthDate] = useState(new Date())
  const [issueDate, setIssueDate] = useState(new Date())
  const [image, setImage] = useState<any>()

  const [admissionDate, setAdmissionDate] = useState(new Date())

  const [selectWorkFormatEmployee, setSelectWorkFormatEmployee] = useState('')
  const [selectWorkPositionEmployee, setSelectWorkPositionEmployee] =
    useState('')
  const [selectWorkLevelEmployee, setSelectWorkLevelEmployee] = useState('')
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const [isCtpsLabelHidden, setIsCtpsLabelHidden] = useState(false)

  const [showPopupSuccess, setShowPopupSuccess] = useState(false)
  const [showPopupSave, setShowPopupSave] = useState(false)

  const [showBlankWarning, setShowBlankWarning] = useState(false)
  const [showIncorrectSpellWarning, setShowIncorrectSpellWarning] =
    useState(false)

  const handleSelectBlankError = () => {
    const hasError =
      selectWorkPositionEmployee === '' ||
      selectWorkLevelEmployee === '' ||
      selectWorkFormatEmployee === ''

    SelectWorkPositionData.error = selectWorkPositionEmployee === ''
    SelectWorkLevelData.error = selectWorkLevelEmployee === ''
    SelectWorkFormatData.error = selectWorkFormatEmployee === ''
    return hasError
  }

  const hidePopupSuccess = () => {
    setShowPopupSuccess(false)
  }

  const hidePopupSave = () => {
    setShowPopupSave(false)
  }

  const handleSaveSuccess = async () => {
const formatDateToISO8601 = (dateString: string) => {
  const [day, month, year] = dateString.split('/');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

// Usage:
const formattedDateOfBirth = formatDateToISO8601(personalData.inputBirthEmployee);

    try {

      const response = await postNewEmployee(
        personalData.inputNameEmployee,
        formattedDateOfBirth,
        selectWorkPositionEmployee,
        selectWorkLevelEmployee,
        personalData.inputRgEmployee,
        personalData.inputCpfEmployee,
        personalData.inputUfEmployee,
        personalData.inputOeEmployee,
        formatDateToISO8601(personalData.inputIssueDateEmployee),
        personalData.inputMotherNameEmployee,
        selectWorkFormatEmployee,
        formatDateToISO8601(professionalData.inputAdmissionDateEmployee),
        professionalData.inputCtpsEmployee,
        personalData.inputPersonalEmailEmployee,
        professionalData.inputWorkEmailEmployee,
        personalData.inputPhoneEmployee,
        professionalData.inputObservationEmployee,
        professionalData.inputSalaireEmployee,
        image ,
        {
          street: addressData.inputAddressEmployee,
          number: parseInt(addressData.inputNumberEmployee),
          neighborhood: addressData.inputNeighborhoodEmployee,
          cep: addressData.inputCepEmployee,
          city: addressData.inputCityEmployee,
          state: addressData.inputStateEmployee
        }
      )
      if (response.message === 'Employee created successfully') {
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

  const handleGetCep = async (cep: string) => {
    const formatString = cep?.replace('-', '')
    try {
      const response = await getEmployeeCep(formatString)
      if (response?.data?.logradouro) {
        handleAddressDataCep(
          'inputNeighborhoodEmployee',
          response?.data?.bairro
        )
        handleAddressDataCep('inputCityEmployee', response?.data?.localidade)
        handleAddressDataCep('inputAddressEmployee', response?.data?.logradouro)
        handleAddressDataCep('inputStateEmployee', response?.data?.uf)
      }
    } catch (error) {
      console.log(error)
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

    if (
      handleInputBlankError(personalData, PersonalData) ||
      handleInputBlankError(addressData, AddressData) ||
      handleInputBlankError(professionalData, ProfessionalData)
    ) {
      hasInputBlankError = true
    }
    if (!hasSelectBlankError && !hasInputBlankError) {
      setShowBlankWarning(false)
    } else {
      hasError = true
      setShowBlankWarning(true)
    }
    handleSave(hasError)
  }

  useEffect(() => {
    if (addressData?.inputCepEmployee?.length === 8) {
      handleGetCep(addressData?.inputCepEmployee)
    }
  }, [addressData?.inputCepEmployee])

  useEffect(() => {
    setIsCtpsLabelHidden(selectWorkFormatEmployee === 'PJ')
  }, [selectWorkFormatEmployee])

  useEffect(() => {
    if (submitted) {
      handleInputBlankError(personalData, PersonalData)
      handleInputBlankError(addressData, AddressData)
      handleInputBlankError(professionalData, ProfessionalData)
      handleSelectBlankError()
    }
  }, [
    submitted,
    personalData,
    addressData,
    professionalData,
    selectWorkFormatEmployee,
    selectWorkPositionEmployee,
    selectWorkLevelEmployee
  ])

  useEffect(() => {
    if (personalData) {
      handlePersonalDataChange(issueDate, 'inputBirthEmployee')
      handlePersonalDataChange(issueDate, 'inputIssueDateEmployee')
      handleProfessionalDataChange(issueDate, 'inputAdmissionDateEmployee')
    }
  }, [])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0]; // Extract the first file from the FileList
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        console.log(file)
        setImage(file); // Set the File object to the state
      };
      reader.onerror = (error) => {
        console.error("Error reading the file:", error);
      };
      reader.readAsDataURL(file);
    } else {
      console.error("No file selected");
    }
  };
  

  return (
    <EmployeesFormBody onSubmit={errorChecking}>
      <InputGroupTitle text="Dados Pessoais" />
      <DivInput>
        <DivSelect>
          <DivPerfilPhoto>
            <PerfilPhoto src={ profileImage || ProfilePicture } alt="Foto de perfil" />

            <AddPhotoButton>
            <label htmlFor="fileInput" >

              <AddPhoto  src={AddPhotoIcon} alt="Ícone de adicionar foto" />
              <input  type="file" id="fileInput"  style={{ display: 'none' }}  accept="image/*" onChange={handleImageChange} />

              </label>

            </AddPhotoButton>
          </DivPerfilPhoto>
          <CustomSelectInput
            id={SelectWorkPositionData.id}
            placeholder={SelectWorkPositionData.placeholder}
            required={false}
            options={SelectWorkPositionData.options}
            readonly
            data={selectWorkPositionEmployee}
            setData={setSelectWorkPositionEmployee}
            error={SelectWorkPositionData.error}
            textArrow={false}
            inputArrow={false}
          />
          <CustomSelectInput
            id={SelectWorkLevelData.id}
            placeholder={SelectWorkLevelData.placeholder}
            required={false}
            options={SelectWorkLevelData.options}
            readonly
            data={selectWorkLevelEmployee}
            setData={setSelectWorkLevelEmployee}
            error={SelectWorkLevelData.error}
            textArrow={false}
            inputArrow={false}
          />
        </DivSelect>
      </DivInput>
      <DivInput>
        {PersonalData.map((item) => {
          if (item.id === 'inputBirthEmployee') {
            return (
              <Calendar
                id={item.id}
                key={item.id}
                required={item.required}
                text={item.text}
                date={birthDate}
                value={personalData[item.id]}
                error={item.error}
                onChange={(d: Date) => {
                  setBirthDate(d as Date)
                  handlePersonalDataChange(d, item.id)
                  PersonalData[1].error = !isValidDate(d)
                }}
              />
            )
          }
          if (item.id === 'inputIssueDateEmployee') {
            return (
              <Calendar
                id={item.id}
                key={item.id}
                required={item.required}
                text={item.text}
                date={issueDate}
                value={personalData[item.id]}
                error={item.error}
                onChange={(d: Date) => {
                  setIssueDate(d as Date)
                  handlePersonalDataChange(d, item.id)
                  PersonalData[6].error = !isValidDate(d)
                }}
              />
            )
          }
          return (
            <Input
              value={personalData[item.id]}
              type={item.type}
              id={item.id}
              placeholder={item.placeholder}
              required={item.required}
              text={item.text}
              className={item.className}
              key={item.id}
              onChange={(e) => handlePersonalDataChange(e, item.id)}
              error={item.error}
              maxCharacters={item.characters}
            />
          )
        })}
      </DivInput>
      <InputGroupTitle text="Endereço" />
      <DivInput>
        {AddressData.map((item) => {
          return (
            <Input
              value={addressData[item.id]}
              type={item.type}
              id={item.id}
              placeholder={item.placeholder}
              required={item.required}
              text={item.text}
              className={item.className}
              key={item.id}
              onChange={(e) => handleAddressDataChange(e, item.id)}
              error={item.error}
              maxCharacters={item.characters}
            />
          )
        })}
      </DivInput>
      <InputGroupTitle text="Dados profissionais" />
      <DivInput>
        <CustomSelectInput
          id={SelectWorkFormatData.id}
          placeholder={SelectWorkFormatData.placeholder}
          text={SelectWorkFormatData.text}
          required={SelectWorkFormatData.required}
          options={SelectWorkFormatData.options}
          readonly
          data={selectWorkFormatEmployee}
          setData={setSelectWorkFormatEmployee}
          error={SelectWorkFormatData.error}
          textArrow={false}
          inputArrow={false}
        />
        {ProfessionalData.map((item) => {
          if (item.id === 'inputCtpsEmployee' && isCtpsLabelHidden) {
            return null
          }
          if (item.id === 'inputAdmissionDateEmployee') {
            return (
              <Calendar
                id={item.id}
                key={item.id}
                required={item.required}
                text={item.text}
                date={admissionDate}
                value={professionalData[item.id]}
                error={item.error}
                onChange={(d: Date) => {
                  setAdmissionDate(d as Date)
                  handleProfessionalDataChange(d, item.id)
                  ProfessionalData[0].error = !isValidDate(d)
                }}
              />
            )
          }
          if (
            item.id === 'inputDismissedDateEmployee' ||
            item.id === 'inputDismissalObservationEmployee'
          )
            return null
          return (
            <Input
              value={professionalData[item.id]}
              type={item.type}
              id={item.id}
              placeholder={item.placeholder}
              required={item.required}
              text={item.text}
              className={item.className}
              key={item.id}
              onChange={(e) => handleProfessionalDataChange(e, item.id)}
              style={item.style}
              error={item.error}
              maxCharacters={item.characters}
            />
          )
        })}
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
                  navigate('/employees')
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
