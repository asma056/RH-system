import { createContext, useContext, useEffect, useState } from 'react'
import { postLogin } from '../services/Login'
import { Api } from '../services'

type LoginValues = {
  email: string
  password: string
}

interface AuthContextData {
  signed: boolean
  userData: object | null
  SignIn({ email, password }: LoginValues): Promise<boolean | null>
  SignOut(): void
}

interface UserData {
  accessToken: string | null
  refreshToken: string | null
  name: string | null
  company_id: number
  email: string | null
  role: string | null
  userId: number
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider = ({ children }: any) => {
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    async function loadStorageData() {
      const storageToken = localStorage.getItem('@3035TECH/key')
      const storageCompanyId = localStorage.getItem('@3035TECH/company_id')
      const storageEmail = localStorage.getItem('@3035TECH/email')
      const storageName = localStorage.getItem('@3035TECH/name')
      const storageRole = localStorage.getItem('@3035TECH/role')
      const storageUserId = localStorage.getItem('@3035TECH/userId')

      const user = {
        accessToken: storageToken,
        refreshToken: storageToken,
        name: storageName,
        company_id: Number(storageCompanyId),
        email: storageEmail,
        role: storageRole,
        userId: Number(storageUserId)
      }

      if (storageToken && storageEmail) {
        setUserData(user)
        Api.defaults.headers.Authorization = `Bearer ${storageToken}`
      }
    }

    loadStorageData()
  }, [])

  async function SignIn({ email, password }: LoginValues) {
    try {
      const response = await postLogin(email, password)
      if (response.accessToken) {
        setUserData(response)
        localStorage.setItem('@3035TECH/key', response.accessToken)
        localStorage.setItem('@3035TECH/company_id', response.company_id)
        localStorage.setItem('@3035TECH/email', response.email)
        localStorage.setItem('@3035TECH/name', response.name)
        localStorage.setItem('@3035TECH/role', response.role)
        localStorage.setItem('@3035TECH/userId', response.userId)
        return true
      }
      return false
    } catch (error) {
      console.error('Não foi possível fazer o login, erro:', error)
      return null
    }
  }

  function SignOut() {
    setUserData(null)
    localStorage.clear()
  }

  return (
    <AuthContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ signed: !!userData, userData, SignIn, SignOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  return context
}
