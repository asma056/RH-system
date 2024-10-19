import { LabelContent, LabelDiv, LabelTitle } from './styles'

interface InputDisabledProps {
  title?: string
  content: string
  required?: boolean
  placeholder?: string
}

export function InputDisabled({
  title,
  content,
  required,
  placeholder
}: InputDisabledProps) {
  return (
    <LabelDiv>
      <LabelTitle>
        {title}
        {required && <span>*</span>}
      </LabelTitle>
      <LabelContent>{content || placeholder}</LabelContent>
    </LabelDiv>
  )
}
