import {
  InputGroupTitle as Title,
  InputGroupTitleWrapper as Wrapper,
  Line
} from './style'

interface InputGroupTitleProps {
  text: string
}

export function InputGroupTitle({ text }: InputGroupTitleProps) {
  return (
    <Wrapper>
      <Title>{text}</Title>
      <Line />
    </Wrapper>
  )
}
