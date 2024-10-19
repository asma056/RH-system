import { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { useAuth } from '../../../contexts/auth'

import { Button, Input } from '../../index'

import Eye from '../../../assets/icons/eyes.svg'
import EyeClosed from '../../../assets/icons/eyesClosed.svg'

import {
  Container,
  DivInput,
  ForgotPasswordText,
  ErrorMessage,
  ButtonVisibility
} from './style'

export function FormLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { SignIn } = useAuth()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault()
    setErrorMessage('')
    setIsLoading(true)

    try {
      const login = await SignIn({ email, password })
      if (!login) {
        setErrorMessage('Usuário ou senha inválidos')
        setIsLoading(false)
      }
      if (login === null) {
        setErrorMessage('Erro ao se conectar com o servidor')
        setIsLoading(false)
      }
    } catch (error) {
      setErrorMessage('Não foi possível fazer o login')
      setIsLoading(false)
    }
  }

  return (
    <Container>
      <form id="loginForm" onSubmit={handleLogin}>
        <DivInput>
          <Input
            type="email"
            id="inputEmailLogin"
            value={email}
            placeholder="XXXXX@3035tech.com"
            required
            onChange={(e) => setEmail(e.target.value)}
            text="E-mail"
          />
        </DivInput>
        <DivInput>
          <Input
            type={showPassword ? 'text' : 'password'}
            id="inputPasswordLogin"
            value={password}
            placeholder="***************"
            required
            text="Senha"
            onChange={(e) => setPassword(e.target.value)}
          />
          <ButtonVisibility
            type="button"
            id="buttonChangePasswordVisibility"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <img src={Eye} alt="Mostrar senha" />
            ) : (
              <img src={EyeClosed} alt="Esconder senha" />
            )}
          </ButtonVisibility>
        </DivInput>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <div className="divForgetPassword">
          <NavLink to="/Recoverty">
            <ForgotPasswordText id="ForgotYourPassword?">
              Esqueceu sua senha?
            </ForgotPasswordText>
          </NavLink>
        </div>
        <Button
          type="submit"
          text={isLoading ? '' : 'ENTRAR'}
          id="buttonSubmitLoginForm"
          invertColor={false}
          cancelColor={false}
          isLoading={!isLoading}
        />
      </form>
    </Container>
  )
}
