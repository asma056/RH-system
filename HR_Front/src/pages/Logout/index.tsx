import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'

export function Logout() {
  const { SignOut } = useContext(AuthContext)
  const navigator = useNavigate()

  useEffect(() => {
    SignOut()
    navigator('/login')
  }, [])

  return null
}
