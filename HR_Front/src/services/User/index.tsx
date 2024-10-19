import { Api } from '..'



export async function postNewUser(
  name: string,
  email: string,
  password: string,
  // eslint-disable-next-line camelcase
  company_id: number,
  role: string
) {

  const token = localStorage.getItem('@3035TECH/key')

  const headers = {
    Authorization: `Bearer ${token}`
  }

  const response = await Api.post(
    '/user/create',
    // eslint-disable-next-line camelcase
    { name, email, password, company_id, role },
    {headers}
  )

  return response.data
}

export async function getAllUser() {

  const token = localStorage.getItem('@3035TECH/key')

  const headers = {
    Authorization: `Bearer ${token}`
  }
  const response = await Api.get('/user/all',{
    headers
  })

  return response.data.results
}

export async function getUser(id: number) {
  const token = localStorage.getItem('@3035TECH/key')

  const headers = {
    Authorization: `Bearer ${token}`
  }

  const response = await Api.get(`/user/${id}`,{
    headers
  })

  return response.data.results
}

export async function deleteUser(id: number) {
  const token = localStorage.getItem('@3035TECH/key')

  const headers = {
    Authorization: `Bearer ${token}`
  }

  const response = await Api.delete(`/user/delete/${id}`,{
    headers
  })

  return response.data
}

export async function updateUser(id: number, name: string, email: string, role: string) {
  const token = localStorage.getItem('@3035TECH/key')

  const headers = {
    Authorization: `Bearer ${token}`
  }

  const response = await Api.patch(
    `/user/update/${id}`,
    { name, email, role },
    {headers}
  )

  return response.data
}
