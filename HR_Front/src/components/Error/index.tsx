import { Loader } from '../Loader'
import { DivError } from './style'

interface Props {
  message: string
}

export function ConectionError({ message }: Props) {
  return (
    <DivError>
      <Loader />
      <p>{message}</p>
    </DivError>
  )
}
