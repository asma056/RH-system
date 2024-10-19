import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'

import {
  InputDisabled,
  EditButton,
  InputGroupTitle,
  SelectDisabled
} from '../../..'
import { DateFrom } from '../../../../functions/ConvertirDate'

import AddPhotoIcon from '../../../../assets/icons/add-photo.svg'
import AddIcon from '../../../../assets/icons/plus.svg'
import EditIcon from '../../../../assets/icons/edit.svg'
import ProfilePicture from '../../../../assets/img/user.png'
import { getEmploye } from '../../../../services/Employee'

import {
  AddPhotoButton,
  AddPhoto,
  DivInput,
  DivPerfilPhoto,
  EmployeesFormBody,
  PerfilPhoto,
  SendDocsButton
} from '../styles'

import {
  DivTopButtons,
  DivBottomButtons,
  DivSelect,
  BottomButton
} from './styles'

interface FormViewEmployeesProps {
  id: number | null
}


export function FormViewEmployee({ id }: FormViewEmployeesProps) {

  const [selectWorkFormatEmployee] = useState('')
  const [isCtpsLabelHidden, setIsCtpsLabelHidden] = useState(false)
  const [data, setData] = useState<any >(null);
  const [adress, setAdress] = useState<any >(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEmploye(id || 0);
  
        if (!response) {
          console.log('Error: No response');
        } else {
          const data = response
          console.log("view emp =>"+data)
          setData(data)
          setAdress(data.address)
        
        }
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    setIsCtpsLabelHidden(selectWorkFormatEmployee === 'PJ')
  }, [selectWorkFormatEmployee])
  return (
    <EmployeesFormBody>
      <InputGroupTitle text="Dados Pessoais" />
      <DivInput>
        <DivSelect>
          <DivPerfilPhoto>
            <PerfilPhoto src={data?.imgUrl || ProfilePicture} alt="Foto de perfil" />
          </DivPerfilPhoto>
          <div>
            <SelectDisabled content={data?.position ||''} />
            <SelectDisabled content={data?.level || ''} />
          </div>
        </DivSelect>
        <DivTopButtons>
          <EditButton link={`/employees/edit/${id}`} imgSrc={EditIcon} />
          <NavLink to={`/employees/documents/${id}`}>
            <SendDocsButton
              id="buttonSubmitDocumentsEmployeeForm"
              type="submit"
            >
              ENVIAR DOCUMENTOS
            </SendDocsButton>
          </NavLink>
        </DivTopButtons>
      </DivInput>
      <DivInput>
              <InputDisabled  content={data?.fullName }  title={"Nome completo"}  required={false} />
              <InputDisabled  content={DateFrom(data?.dateOfBirth) }  title={"Data de nascimento"}  required={false} />
              <InputDisabled  content={data?.rg }  title={"RG"}  required={false} />
              <InputDisabled  content={data?.cpf }  title={"CPF"}  required={false} />
              <InputDisabled  content={data?.uf }  title={"UF"}  required={false} />
              <InputDisabled  content={data?.emissionAgency }  title={"Órgão expedidor"}  required={false} />
              <InputDisabled  content={DateFrom(data?.emissionDate) }  title={"Data de emissão"}  required={false} />
              <InputDisabled  content={data?.mothersName }  title={"Nome da mãe"}  required={false} />
              <InputDisabled  content={data?.personalEmail }  title={"E-mail pessoal"}  required={false} />
              <InputDisabled  content={data?.phone }  title={"Telefone"}  required={false} />


      </DivInput>
      <InputGroupTitle text="Endereço" />
      <DivInput>
            <InputDisabled  content={adress?.cep }  title={"CEP"}  required={false} />
            <InputDisabled content={adress?.neighborhood }  title={"Bairro" }required={false} />
            <InputDisabled content={adress?.street }  title={"Endereço" }required={false} />
            <InputDisabled content={adress?.number }  title={"Número" }required={false} />
            <InputDisabled content={adress?.city }  title={"Cidade" }required={false} />
            <InputDisabled content={adress?.state }  title={"Estado" }required={false} />
      </DivInput>
      <InputGroupTitle text="Dados profissionais" />
      <DivInput>

            <InputDisabled  content={data?.jobFormat }  title={"Formato de trabalho"}  required={false} />
            <InputDisabled content={DateFrom(data?.admissionDate) }  title={"Data de início" }required={false} />
            <InputDisabled content={data?.pisNumber }  title={'Nº PIS/NIS/NIT' }required={false} />
            <InputDisabled content={data?.corporateEmail }  title={"E-mail corporativo" }required={false} />
            <InputDisabled content={data?.salaire }  title={"Salaire" }required={false} />
            <InputDisabled content={data?.notes }  title={"Observações" }required={false} />

      
      </DivInput>
      <DivBottomButtons>
        <NavLink to={`/employees/equipments/view/${id}`}>
          <BottomButton id="ButtonAddEquipment" invertColor={false}>
            <img src={AddIcon} alt="adicionar equipamentos para esse usuário" />
            <p>EQUIPAMENTOS</p>
          </BottomButton>
        </NavLink>
        <NavLink to={`/employees/termination/view/${id}`}>
          <BottomButton id="ButtonTerminationEmployee" invertColor>
            <p>DESLIGAMENTO</p>
          </BottomButton>
        </NavLink>
      </DivBottomButtons>
    </EmployeesFormBody>
  )
}
