import alertIcon from '../../../../assets/icons/alert.svg'

import { AlertIcon, PasswordContainer, PasswordRulesText } from './style'

export function PasswordNotEqual() {
  return (
    <PasswordContainer>
      <AlertIcon src={alertIcon} />
      <PasswordRulesText>
        As senhas não correspondem
        <br />
        Tente novamente
      </PasswordRulesText>
    </PasswordContainer>
  )
}
