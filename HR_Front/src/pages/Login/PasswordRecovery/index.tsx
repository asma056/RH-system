import { FormRecovery } from '../../../components'
import { DefaultLayoutLogin } from '../../../layouts/DefaultLayoutLogin'

export function PasswordRecoverty() {
  return (
    <DefaultLayoutLogin
      subtitle="Recupere sua senha"
      idSubtitle="copyTitleRecoveryPage"
    >
      <FormRecovery />
    </DefaultLayoutLogin>
  )
}
