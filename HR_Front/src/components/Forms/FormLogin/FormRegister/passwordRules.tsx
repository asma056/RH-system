import alertIcon from '../../../../assets/icons/alert.svg'

import { AlertIcon, PasswordContainer, PasswordRulesText } from './style'

export function PasswordRules() {
  return (
    <PasswordContainer>
      <AlertIcon src={alertIcon} />
      <PasswordRulesText>
        Senha deve conter mínimo de:
        <br />8 caracteres
        <br />1 letra maiúscula minúscula
        <br />1 número
        <br />1 caractere especial
      </PasswordRulesText>
    </PasswordContainer>
  )
}
