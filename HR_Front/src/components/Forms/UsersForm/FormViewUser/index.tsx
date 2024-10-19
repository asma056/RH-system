import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ConectionError } from '../../..'
import { deleteUser, getUser } from '../../../../services/User'

import { UserName } from '../../../../pages/Users/style'
import { Button } from '../../../Button'
import { DefaultLayoutPopUp } from '../../../../layouts/DefaultLayoutPopUp'

import CheckedIcon from '../../../../assets/icons/checked.svg'

import getRoleLabel from '../../../../functions/getRoleLabel'

import {
  DivButton,
  DivFormViewUser,
  GridDiv,
  GridFormViewUser,
  LabelContent,
  LabelDiv,
  LabelTitle
} from './style'
import { OverlayDiv } from '../style'

interface FormViewUserProps {
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

export function FormViewUser({ id }: FormViewUserProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [accessType, setAccessType] = useState('')
  const [showPopupDelete, setShowPopupDelete] = useState(false)
  const [showPopupDeleteSucess, setShowPopupDeleteSuccess] = useState(false)
  const [connectionError, setConnectionError] = useState<string>('')
  const [IsLoading, SetIsLoading] = useState(false)

  const navigate = useNavigate()

  const handleCancel = () => {
    navigate('/users')
    setName('')
    setEmail('')
    setAccessType('')
  }

  const handleEdit = () => {
    navigate(`/users/edit/${id}`)
  }

  const hidePopupDelete = () => {
    setShowPopupDelete(false)
    SetIsLoading(false)
  }
  const hidePopupDeleteSuccess = () => {
    setShowPopupDeleteSuccess(false)
    SetIsLoading(false)
  }
  const handleDelete = () => {
    setShowPopupDelete(true)
  }
  const handleDeleteSuccess = async () => {
    SetIsLoading(true)
    try {
      const response = await deleteUser(id)
      if (response.message === 'User deleted successfully') {
        setShowPopupDeleteSuccess(true)
        setShowPopupDelete(false)
        setTimeout(hidePopupDeleteSuccess, 3000)
        setTimeout(handleCancel, 3250)
      } else {
        setConnectionError(
          'Erro de conexão, não foi possível deletar o usuário, por favor aguarde a conexão estabilizar'
        )
        console.error('Falha ao deletar usuário. Status:', response.status)
      }
    } catch (error) {
      setConnectionError(
        'Erro de conexão, não foi possível deletar o usuário, por favor aguarde a conexão estabilizar'
      )
      console.error('Ocorreu um erro ao enviar a requisição:', error)
    }
  }

  useEffect(() => {
    getUserId(id)
      .then((userData) => {
        if (userData.length === 0) {
          setConnectionError(
            'Erro de conexão, não foi possível buscar os usuário, por favor aguarde a conexão estabilizar'
          )
        }
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
      <DivFormViewUser>
        <GridDiv>
          <LabelDiv>
            <LabelTitle>Nome</LabelTitle>
            <LabelContent>{name}</LabelContent>
          </LabelDiv>
          <LabelDiv>
            <LabelTitle>E-mail</LabelTitle>
            <LabelContent>{email}</LabelContent>
          </LabelDiv>
          <LabelDiv>
            <LabelTitle>Tipo de Acesso</LabelTitle>
            <LabelContent>{getRoleLabel(accessType)}</LabelContent>
          </LabelDiv>
        </GridDiv>
        <GridFormViewUser>
          <Button
            text="EDITAR"
            id="buttonEdit"
            invertColor
            onClick={handleEdit}
            cancelColor={false}
          />
          <Button
            text="EXCLUIR"
            id="buttonDelete"
            invertColor={false}
            onClick={handleDelete}
            cancelColor
          />
        </GridFormViewUser>
      </DivFormViewUser>
      {(showPopupDelete || showPopupDeleteSucess) && <OverlayDiv />}
      {showPopupDelete && (
        <DefaultLayoutPopUp title="Tem certeza que deseja excluir este usuário?">
          <DivButton>
            <Button
              text={IsLoading ? '' : 'Excluir'}
              id="ButtonDeleteUser"
              invertColor
              onClick={handleDeleteSuccess}
              cancelColor
              isLoading={!IsLoading}
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
          title="Usuário Excluído com sucesso!"
          content=""
        />
      )}
      {connectionError && <ConectionError message={connectionError} />}
    </>
  )
}
