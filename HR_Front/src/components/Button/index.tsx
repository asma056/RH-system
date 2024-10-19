import { Loader } from '../Loader'
import { Mybutton } from './style'

interface Props {
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset' | undefined
  className?: string
  text: string
  id: string
  invertColor: boolean
  cancelColor: boolean
  imgSrc?: string
  isLoading?: boolean
}

export function Button({
  onClick,
  type,
  text,
  id,
  className,
  invertColor,
  cancelColor,
  imgSrc,
  isLoading = true
}: Props) {
  return (
    <Mybutton
      onClick={onClick}
      type={type}
      id={id}
      className={className}
      invertColor={invertColor}
      cancelColor={cancelColor}
    >
      {imgSrc && <img src={imgSrc} alt="Ícone" />}
      {isLoading ? null : <Loader />}
      {text}
    </Mybutton>
  )
}
