import { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { format } from 'date-fns'

import { getAllUser } from '../../services/User'
import { PageContext } from '../../contexts/pageName'
import getRoleLabel from '../../functions/getRoleLabel'

import Table, {
  Button,
  ConectionError,
  CustomSelectInput,
  Input
} from '../../components'

import EditIcon from '../../assets/icons/edit.svg'
import SearchIcon from '../../assets/icons/search.svg'
import pageIcon from '../../assets/icons/user.svg'
import userIcon from '../../assets/img/user.png'

import { GrayImg } from '../../components/Tables/style'
import {
  DivInput,
  ImgSearch,
  RadioInputUser,
  SituationHeadTable,
  UserContainer,
  UserHeader,
  UserPhoto,
  UsernameColumn,
  UsernameHeadTable
} from './style'

interface UsersListProps {
  id: number
  actived: boolean
  name: string
  role: string
  img: string
  createdAt: string
}

const UserList = ({
  id,
  actived,
  name,
  role,
  createdAt,
  img
}: UsersListProps) => {
  const date = new Date(createdAt)
  const UserId = localStorage.getItem('@3035TECH/userId')
  const roleUser = localStorage.getItem('@3035TECH/role')

  return (
    <>
      <td>
        <RadioInputUser type="radio" checked={actived} readOnly />
      </td>
      <UsernameColumn>
      { ( roleUser === 'SUPER_ADMIN'  || Number(UserId) === id ) ? (
        <NavLink to={`view/${id}`}>
          <UserPhoto
            src={img || userIcon}
            className="userPhoto"
            alt="Foto de usuário"
          />
          {name}
        </NavLink>):(
            <NavLink  style={{cursor:'not-allowed'}} to={``}>
            <UserPhoto
              src={img || userIcon}
              className="userPhoto"
              alt="Foto de usuário"
            />
            {name}
          </NavLink>
        )
      }
      </UsernameColumn>
      <td>{role}</td>
      <td>{format(date, 'dd/MM/yy')}</td>
      <td>
        { ( roleUser === 'SUPER_ADMIN'  || Number(UserId) === id ) ? (
        <NavLink to={`edit/${id}`}>
          <GrayImg src={EditIcon} className="editIcon" alt="Editar Usuário" />
        </NavLink>) :
         ( 
          <NavLink to={``} >
          <GrayImg src={EditIcon} style={{cursor:'not-allowed'}} className="editIcon" alt="Editar Usuário" />
        </NavLink>

        )}
      </td>
    </>
  )
}

async function allUsersList(): Promise<UsersListProps[]> {
  try {
    const response = await getAllUser()
    return response
  } catch (error) {
    return []
  }
}

export function Users() {
  const { setPageTitle, setPageImage } = useContext(PageContext)
  const [situation, setSituation] = useState('Todos')
  const [search, setSearch] = useState('')
  const [connectionError, setConnectionError] = useState<string>('')
  const [filteredUsers, setFilteredUsers] = useState<UsersListProps[]>([])
  const role = localStorage.getItem('@3035TECH/role')

  useEffect(() => {
    setPageTitle('Usuários')
    setPageImage(pageIcon)
  }, [])

  useEffect(() => {
    allUsersList()
      .then((users) => {
        setFilteredUsers(users)
        if (users.length === 0) {
          setConnectionError(
            'Erro de conexão, não foi possível buscar os usuário, por favor aguarde a conexão estabilizar'
          )
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar os usuários:', error)
      })
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await allUsersList()
        const filteredData = users
          .filter((user) =>
            user.name.toLowerCase().includes(search.toLowerCase())
          )
          .sort((a, b) => a.name.localeCompare(b.name))
        setFilteredUsers(filteredData)
      } catch (error) {
        setConnectionError(
          'Erro de conexão, não foi possível buscar os usuário, por favor aguarde a conexão estabilizar.'
        )
      }
    }
    fetchData()
  }, [search])

  const tableHeader = () => (
    <tr>
      <SituationHeadTable>
        <CustomSelectInput
          id="selectUserSituation"
          options={[
            {
              value: 'Ativos',
              text: 'Ativos'
            },
            {
              value: 'Inativos',
              text: 'Inativos'
            },
            {
              value: 'Todos',
              text: 'Todos'
            }
          ]}
          text={situation}
          readonly
          data={situation}
          setData={setSituation}
          required={false}
          textArrow
          inputArrow={false}
        />
      </SituationHeadTable>
      <UsernameHeadTable>Usuários</UsernameHeadTable>
      <th>Nível</th>
      <th>Acesso</th>
      <th>Editar</th>
    </tr>
  )

  const rows = filteredUsers
    .filter((user) => {
      if (situation === 'Ativos') {
        return user.actived
      }
      if (situation === 'Inativos') {
        return !user.actived
      }
      return true
    })
    .map((user) => ({
      id: user.id,
      content: <UserList key={user.id} {...user} />
    }))

  return (
    <>
      <UserContainer>
        <UserHeader>
          <DivInput>
            <Input
              type="text"
              id="inputSerchUsers"
              value={search}
              placeholder="Pesquisar usuário"
              onChange={(e) => setSearch(e.target.value)}
              required={false}
            />
            <button type="button" id="buttonSearch">
              <ImgSearch src={SearchIcon} alt="Ícone de pesquisar" />
            </button>
          </DivInput>
          { (role === 'SUPER_ADMIN' ) && (

          <NavLink to="new">
            <Button
              type="button"
              text="NOVO USUÁRIO"
              id="buttonNewUserPage"
              invertColor
              cancelColor={false}
            />
          </NavLink> )}
        </UserHeader>
        <Table
          idTable="UserTable"
          headerRenderer={tableHeader}
          rowRenderer={rows}
        />
      </UserContainer>
      {connectionError && <ConectionError message={connectionError} />}
    </>
  )
}
