import { FormRegister } from '../../../components'
import { DefaultLayoutLogin } from '../../../layouts/DefaultLayoutLogin'

export function Register() {
  return (
    <DefaultLayoutLogin
      title="Faça seu cadastro"
      idTitle="copyTitleRegisterPage"
      subtitle="Escolha sua senha de login"
      idSubtitle="copySubtitleRegisterPage"
    >
      <FormRegister />
    </DefaultLayoutLogin>
  )
}
