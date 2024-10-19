import { InputLogin, LabelLogin } from './style'

interface inputProps {
  onChange: (e: any) => void
  type?: 'email' | 'password' | 'text' | 'date' | 'number' | 'tel' | undefined
  id: string
  value: string
  placeholder: string
  required: boolean
  text?: string
  className?: string
  style?: any
  error?: boolean
  maxCharacters?: number
}

export function Input({
  type,
  id,
  value,
  placeholder,
  required,
  text,
  className,
  onChange,
  style,
  error,
  maxCharacters
}: inputProps) {
  return (
    <LabelLogin id={`label${id}`} htmlFor={id}>
      {text}
      {required && <span>*</span>}
      <InputLogin
        onChange={onChange}
        type={type}
        id={id}
        value={value}
        placeholder={placeholder}
        required={required}
        className={className}
        style={style}
        error={error}
        maxLength={maxCharacters}
      />
    </LabelLogin>
  )
}
