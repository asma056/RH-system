import { Api } from '..'

export async function postLogin(email: string, password: string) {
  const response = await Api.post('/auth/login', { email, password })

  return response.data
}
