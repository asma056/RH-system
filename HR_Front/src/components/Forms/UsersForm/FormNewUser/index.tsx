import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { postNewUser } from '../../../../services/User'

import {
  Button,
  Input,
  CustomSelectInput,
  ConectionError
} from '../../../index'
import { DefaultLayoutPopUp } from '../../../../layouts/DefaultLayoutPopUp'

import CheckedIcon from '../../../../assets/icons/checked.svg'

import getRoleLabel from '../../../../functions/getRoleLabel'
import {
  DivButton,
  DivFormUser,
  GridFormButtonUser,
  OverlayDiv
} from '../style'

export function FormNewUser() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [AccessType, setAccessType] = useState('')
  const [showPopupSuccess, setShowPopupSuccess] = useState(false)
  const [showPopupSave, setShowPopupSave] = useState(false)
  const [connectionError, setConnectionError] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const handleCancel = () => {
    navigate('/users')
  }

  const hidePopupSuccess = () => {
    setShowPopupSuccess(false)
    setIsLoading(false)
  }
  const hidePopupSave = () => {
    setShowPopupSave(false)
    setIsLoading(false)
  }
  const handleSaveSuccess = async () => {
    setIsLoading(true)
    try {
      const response = await postNewUser(
        name,
        email,
        '3035tech',
        1,
        AccessType
      )
      if (response.message === 'User created successfully') {
        setShowPopupSuccess(true)
        setShowPopupSave(false)
        setTimeout(hidePopupSuccess, 3000)
        setTimeout(handleCancel, 3250)
      } else {
        console.error('Falha ao cadastrar usuário. Status:', response.status)
        setIsLoading(false)
        setConnectionError(
          'Erro de conexão, não foi possível criar o usuário, por favor aguarde a conexão estabilizar'
        )
      }
    } catch (error) {
      setConnectionError(
        'Erro de conexão, não foi possível criar o usuário, por favor aguarde a conexão estabilizar'
      )
      console.error('Ocorreu um erro ao enviar a requisição:', error)
      setIsLoading(false)
    }
  }

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault()
    setShowPopupSave(true)
  }

  return (
    <>
      <DivFormUser id="NewUserForm" onSubmit={handleSave}>
        <Input
          type="text"
          onChange={(e) => setName(e.target.value)}
          id="inputNameEditUser"
          value={name}
          placeholder="XXXXX"
          required
          text="Nome"
        />
        <Input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          id="inputEmailEditUser"
          value={email}
          placeholder="XXXXX@3035tech.com"
          required
          text="E-mail"
        />
        <CustomSelectInput
          id="selectAccessTypeNewUSer"
          placeholder="Escolha o tipo"
          required
          options={[
            {
              value: 'ADMIN',
              text: 'ADMIN'
            },
            {
              value: 'SUPER_ADMIN',
              text: 'SUPER_ADMIN'
            }
          ]}
          text="Tipo de Acesso"
          readonly
          data={AccessType}
          setData={setAccessType}
          textArrow={false}
          inputArrow
        />
        <GridFormButtonUser>
          <Button
            type="submit"
            text="SALVAR"
            id="buttonSave"
            invertColor
            cancelColor={false}
          />
          <Button
            text="CANCELAR"
            id="buttonCancel"
            invertColor={false}
            onClick={handleCancel}
            cancelColor={false}
          />
        </GridFormButtonUser>
      </DivFormUser>
      {(showPopupSave || showPopupSuccess) && <OverlayDiv />}
      {showPopupSave && (
        <DefaultLayoutPopUp title="Tem certeza que deseja salvar as alterações? ">
          <DivButton>
            <Button
              text={isLoading ? '' : 'Confirmar'}
              id="ButtonSaveNewUser"
              invertColor
              onClick={handleSaveSuccess}
              cancelColor={false}
              isLoading={!isLoading}
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
      )}

      {showPopupSuccess && (
        <DefaultLayoutPopUp
          img={CheckedIcon}
          title="Cadastro realizado com sucesso!"
          content="E-mail para definição de senha do novo usuário enviado ao e-mail cadastrado com prazo de 24h para realizá-lo.
          Após o prazo será necessário realizar um novo cadastro."
        />
      )}
      {connectionError && <ConectionError message={connectionError} />}
    </>
  )
}
