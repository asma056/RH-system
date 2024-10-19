import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { deleteUser, getUser, updateUser } from '../../../../services/User'

import { ConectionError, Input, Button, CustomSelectInput } from '../../..'
import { UserName } from '../../../../pages/Users/style'
import { DefaultLayoutPopUp } from '../../../../layouts/DefaultLayoutPopUp'

import CheckedIcon from '../../../../assets/icons/checked.svg'

import getRoleLabel from '../../../../functions/getRoleLabel'
import {
  CancelText,
  DivButton,
  DivFormUser,
  GridFormButtonUser,
  LabelContentView,
  LabelDivView,
  LabelTitleView,
  OverlayDiv
} from '../style'

interface FormEditUserProps {
  id: number
}

async function getUserId(id: number) {
  try {
    const response = await getUser(id)
    return response
  } catch (error) {
    return error
  }
}

export function FormEditUser({ id }: FormEditUserProps) {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [AccessType, setAccessType] = useState('')
  const [showPopupSave, setShowPopupSave] = useState(false)
  const [showPopupSaveSuccess, setShowPopupSaveSuccess] = useState(false)
  const [showPopupDelete, setShowPopupDelete] = useState(false)
  const [showPopupDeleteSucess, setShowPopupDeleteSuccess] = useState(false)
  const [connectionError, setConnectionError] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const handleCancel = () => {
    setName('')
    setEmail('')
    setAccessType('')
    navigate('/users')
  }

  const hidePopupSave = () => {
    setShowPopupSave(false)
  }
  const hidePopupSaveSuccess = () => {
    setShowPopupSaveSuccess(false)
    setIsLoading(false)
  }
  const handleSave = (event: React.FormEvent) => {
    event.preventDefault()
    setShowPopupSave(true)
  }
  const handleSaveSuccess = async () => {
    setIsLoading(true)
    try {
      const response = await updateUser(id, name, email,AccessType)
      if (response.message === 'User updated successfully') {
        setShowPopupSaveSuccess(true)
        setShowPopupSave(false)
        setTimeout(hidePopupSaveSuccess, 4000)
        setTimeout(handleCancel, 4250)
      } else {
        setConnectionError(
          'Erro de conexão, não foi possível salvar os dados do usuário, por favor aguarde a conexão estabilizar.'
        )
      }
    } catch (error) {
      setConnectionError(
        'Erro de conexão, por favor aguarde a conexão estabilizar.'
      )
    }
  }

  const hidePopupDelete = () => {
    setShowPopupDelete(false)
    setIsLoading(false)
  }
  const hidePopupDeleteSuccess = () => {
    setShowPopupDeleteSuccess(false)
    setIsLoading(false)
  }
  const handleDelete = () => {
    setShowPopupDelete(true)
  }
  const handleDeleteSuccess = async () => {
    setIsLoading(true)
    try {
      const response = await deleteUser(id)
      if (response.message === 'User deleted successfully') {
        setShowPopupDeleteSuccess(true)
        setShowPopupDelete(false)
        setTimeout(hidePopupDeleteSuccess, 3000)
        setTimeout(handleCancel, 3250)
      } else {
        setConnectionError(
          'Erro de conexão, não foi possível deletar o usuário, por favor aguarde a conexão estabilizar.'
        )
      }
    } catch (error) {
      setConnectionError(
        'Erro de conexão, por favor aguarde a conexão estabilizar.'
      )
      console.error('Ocorreu um erro ao enviar a requisição:', error)
    }
  }

  useEffect(() => {
    getUserId(id)
      .then((userData) => {
        setName(userData.name)
        setEmail(userData.email)
        setAccessType(userData.role)
      })
      .catch((error) => {
        console.error('Erro ao obter usuário:', error)
      })
  }, [id])

  return (
    <>
      <UserName>{name}</UserName>
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
        <LabelDivView>
          <CustomSelectInput
          id="selectAccessTypeNewUSer"
          placeholder="Escolha o tipo"
          required
          options={[
            {
              value: 'USER',
              text: 'USER'
            },
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
        </LabelDivView>
        <GridFormButtonUser>
          <Button
            type="submit"
            text="SALVAR"
            id="buttonSAlvar"
            invertColor
            cancelColor={false}
          />
          <Button
            text="EXCLUIR USUÁRIO"
            id="buttonSAlvar"
            invertColor={false}
            onClick={handleDelete}
            cancelColor={false}
          />
        </GridFormButtonUser>
        <NavLink to="/users">
          <CancelText>CANCELAR</CancelText>
        </NavLink>
      </DivFormUser>

      {(showPopupSave ||
        showPopupSaveSuccess ||
        showPopupDelete ||
        showPopupDeleteSucess) && <OverlayDiv />}

      {showPopupSave && (
        <DefaultLayoutPopUp title="Tem certeza que deseja salvar as alteções? ">
          <DivButton>
            <Button
              text={isLoading ? '' : 'Salvar'}
              id="ButtonSaveEditUser"
              invertColor
              onClick={handleSaveSuccess}
              cancelColor={false}
              isLoading={!isLoading}
            />
            <Button
              text="Cancelar"
              id="ButtonCancelEditUser"
              invertColor={false}
              onClick={hidePopupSave}
              cancelColor={false}
            />
          </DivButton>
        </DefaultLayoutPopUp>
      )}

      {showPopupSaveSuccess && (
        <DefaultLayoutPopUp
          img={CheckedIcon}
          title="Cadastro alterado com sucesso!"
          content="E-mail para definição de senha do novo usuário enviado ao e-mail cadastrado com prazo de 24h para realizá-lo.
          Após o prazo será necessário realizar um novo cadastro."
        />
      )}

      {showPopupDelete && (
        <DefaultLayoutPopUp title="Tem certeza que deseja excluir este usuário?">
          <DivButton>
            <Button
              text={isLoading ? '' : 'Excluir'}
              id="ButtonDeleteUser"
              invertColor
              onClick={handleDeleteSuccess}
              cancelColor
              isLoading={!isLoading}
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
          title="Usuário excluído com sucesso!"
          content=""
        />
      )}
      {connectionError && <ConectionError message={connectionError} />}
    </>
  )
}
