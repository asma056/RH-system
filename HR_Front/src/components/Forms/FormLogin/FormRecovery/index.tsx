import { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { Button, Input } from '../../../index'

import { Container, DivInput, PSubtitle } from './style'

export function FormRecovery() {
  const [email, setEmail] = useState('')

  return (
    <Container>
      <PSubtitle id="copyForgotYourPassword">
        Esqueceu sua senha? Digite seu email que enviaremos um link para definir
        uma nova senha.
      </PSubtitle>

      <form id="RecoveryForm">
        <DivInput>
          <Input
            type="email"
            id="inputEmailRecovery"
            value={email}
            required
            placeholder="XXXXX@3035tech.com"
            text="E-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
        </DivInput>
      </form>
      <NavLink to="/login">
        <Button
          type="submit"
          text="ENVIAR"
          id="buttonSubmitRecoveryForm"
          invertColor={false}
          cancelColor={false}
        />
      </NavLink>
    </Container>
  )
}
