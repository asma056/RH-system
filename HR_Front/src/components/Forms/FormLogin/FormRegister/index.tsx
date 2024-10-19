import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Input } from '../../../index'

import Eye from '../../../../assets/icons/eyes.svg'
import EyeClosed from '../../../../assets/icons/eyesClosed.svg'

import { Container, DivInput, ImgEye } from './style'
import { PasswordRules } from './passwordRules'
import { PasswordNotEqual } from './passwordNotEqual'

export function FormRegister() {
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
  const [showPasswordIsEqual, setShowPasswordIsEqual] = useState(false)
  const [showPasswordRules, setShowPasswordRules] = useState(false)
  const navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  const togglePasswordConfirmVisibility = () => {
    setShowPasswordConfirm(!showPasswordConfirm)
  }

  const passwordIsEqual = () => {
    if (password === passwordConfirm) {
      return true
    }
    return false
  }

  const passwordRules = () => {
    if (password.length >= 8) {
      return true
    }
    return false
  }

  const passwordSettings = () => {
    if (passwordIsEqual() === true && passwordRules() === true) {
      navigate('/login')
    }
    if (passwordIsEqual() === false) {
      setShowPasswordIsEqual(true)
    } else {
      setShowPasswordIsEqual(false)
    }
    if (passwordRules() === false) {
      setShowPasswordRules(true)
    } else {
      setShowPasswordRules(false)
    }
  }

  return (
    <Container>
      <form id="registerForm">
        <DivInput>
          <Input
            type={showPassword ? 'text' : 'password'}
            id="inputPasswordRegister"
            value={password}
            placeholder="***************"
            required
            text="Senha"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            id="buttonChangePasswordVisibility"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <ImgEye src={EyeClosed} alt="Mostrar senha" />
            ) : (
              <ImgEye src={Eye} alt="Esconder senha" />
            )}
          </button>
        </DivInput>

        {showPasswordRules && <PasswordRules />}

        <DivInput>
          <Input
            type={showPasswordConfirm ? 'text' : 'password'}
            id="inputPasswordConfirmRegister"
            value={passwordConfirm}
            placeholder="***************"
            required
            onChange={(e) => setPasswordConfirm(e.target.value)}
            text="Confirme sua senha:"
          />
          <button
            type="button"
            id="buttonChangeConfirmPasswordVisibility"
            onClick={togglePasswordConfirmVisibility}
          >
            {showPasswordConfirm ? (
              <ImgEye src={EyeClosed} alt="Mostrar senha" />
            ) : (
              <ImgEye src={Eye} alt="Esconder senha" />
            )}
          </button>
        </DivInput>

        {showPasswordIsEqual && <PasswordNotEqual />}
      </form>

      <Button
        type="submit"
        text="CADASTRAR"
        id="buttonSubmitRegisterForm"
        invertColor={false}
        cancelColor={false}
        onClick={passwordSettings}
      />
    </Container>
  )
}
