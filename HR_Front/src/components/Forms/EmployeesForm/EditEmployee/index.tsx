import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { postEditEmployee, getEmployeeCep, getEmploye } from '../../../../services/Employee'

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

interface Props {
  sendDocumentsButton: boolean
}

export default function EditFormEmployee({ id }: { id: number }) {
  const navigate = useNavigate()
  const [submitted, setSubmitted] = useState(false)
  const { personalData, handlePersonalDataChange } = usePersonalData()
  const { addressData, handleAddressDataChange, handleAddressDataCep } =
    useAddressData()
  const { professionalData, handleProfessionalDataChange } =
    useProfessionalData()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [pisNumber, setPisNumber] = useState('')
  const [salary, setSalary] = useState('')
  const [notes, setNotes] = useState('')
  const [image, setImage] = useState<any>()
  const [profileImage, setProfileImage] = useState<string | null>(null);


  const [issueDate, setIssueDate] = useState(new Date())
  const [admissionDate, setAdmissionDate] = useState(new Date())

  const [selectWorkFormatEmployee, setSelectWorkFormatEmployee] = useState('')
  const [selectWorkPositionEmployee, setSelectWorkPositionEmployee] =
    useState('')
  const [selectWorkLevelEmployee, setSelectWorkLevelEmployee] = useState('')

  const [isCtpsLabelHidden, setIsCtpsLabelHidden] = useState(false)

  const [showPopupSuccess, setShowPopupSuccess] = useState(false)
  const [showPopupSave, setShowPopupSave] = useState(false)

  const [showBlankWarning, setShowBlankWarning] = useState(false)
  const [showIncorrectSpellWarning, setShowIncorrectSpellWarning] =
    useState(false)

    const [data, setData] = useState<any >(null);
  

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await getEmploye(id || 0);
    
          if (!response) {
            console.log('Error: No response');
          } else {
            const data = response
            console.log(data)
            setData(data)
            setName(data?.fullName)
            setPisNumber(data?.pisNumber)
            setPhone(data?.phone)
            setSalary(data?.salaire)
            setNotes(data?.notes)
            setSelectWorkFormatEmployee(data?.jobFormat)
            setSelectWorkLevelEmployee(data?.level)
            setSelectWorkPositionEmployee(data?.position)
            setProfileImage(data?.imgUrl)
          
          }
        } catch (error) {
          console.error('Error fetching employee data:', error);
        }
      };
    
      fetchData();
    }, []);
  

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


    try {

      const response = await postEditEmployee(
        id,
        name,
        selectWorkPositionEmployee,
        selectWorkLevelEmployee,
        selectWorkFormatEmployee,
        admissionDate.toString(),
        pisNumber,
        phone,
        notes,
        salary,
        image

      )
      if (response.message === 'Successfully updated employee') {
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
            <PerfilPhoto src={ profileImage || ProfilePicture  } alt="Foto de perfil" />

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
            <Input value={name} type={"text"} id={"inputNameEmployee"} placeholder={"Name"} required={false}
              text={"Nome completo"}  key={"inputNameEmployee"} onChange={(e) =>  setName(e.target.value) }
              error={false} maxCharacters={60} />

            <Input value={phone} type={"text"} id={"inputPhoneEmployee"} placeholder={"(00) 00000-0000"} required={false}
              text={"Telefone"}  key={"inputPhoneEmployee"} onChange={(e) =>  setPhone(e.target.value) }
              error={false} maxCharacters={60} />

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
        { !isCtpsLabelHidden && 
            <Input value={pisNumber} type={"text"} id={"inputCtpsEmployee"} placeholder={"Name"} required={false}
              text={'Nº PIS/NIS/NIT'}  key={"inputCtpsEmployee"} onChange={(e) =>  setPisNumber(e.target.value) }
              error={false} maxCharacters={60} />}
              
              <Calendar
                id={"inputAdmissionDateEmployee"}
                key={"inputAdmissionDateEmployee"}
                required={false}
                text={"Data de início"}
                date={admissionDate}
                value={data?.admissionDate}
                error={false}
                onChange={(d: Date) => {
                  setAdmissionDate(d as Date)
                  ProfessionalData[0].error = !isValidDate(d)
                }}
              />

            <Input value={salary} type={"text"} id={"inputSalaireEmployee"} placeholder={"0000$"} required={false}
              text={"Salary"}  key={"inputSalaireEmployee"} onChange={(e) =>  setSalary(e.target.value) }
              error={false} maxCharacters={60} />

                          <Input value={data?.notes} type={"text"} id={"inputObservationEmployee"} placeholder={"Observation"} required={false}
              text={"Observações"}  key={"inputObservationEmployee"} onChange={(e) =>  setNotes(e.target.value) }
              error={false} maxCharacters={60} />



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
