import { DefaultLayoutLogin } from '../../layouts/DefaultLayoutLogin'
import { FormLogin } from '../../components'

export function Login() {
  return (
    <DefaultLayoutLogin
      title="RH"
      idTitle="copyTitleLoginPage"
      subtitle="Acesse sua conta"
      idSubtitle="copySubitleLoginPage"
    >
      <FormLogin />
    </DefaultLayoutLogin>
  )
}
