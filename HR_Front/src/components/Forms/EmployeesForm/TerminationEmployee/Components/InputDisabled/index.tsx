import { LabelContent, LabelDiv, LabelTitle } from './style'

interface InputDisabledProps {
  title?: string
  content: string
  required?: boolean
}

export function InputDisabled({
  title,
  content,
  required
}: InputDisabledProps) {
  return (
    <LabelDiv>
      <LabelTitle>
        {title}
        {required && <span>*</span>}
      </LabelTitle>
      <LabelContent>{content}</LabelContent>
    </LabelDiv>
  )
}
