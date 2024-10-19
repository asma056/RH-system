import { Content, Div } from './styles'

interface SelectDisabledProps {
  content: string
}

export function SelectDisabled({ content }: SelectDisabledProps) {
  return (
    <Div>
      <Content>{content}</Content>
    </Div>
  )
}
