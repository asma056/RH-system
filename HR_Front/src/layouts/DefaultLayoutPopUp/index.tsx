import {
  ContentPopUp,
  DivContentPopUp,
  DivPopUp,
  ImgPopUp,
  TitlePopUp
} from './style'

interface Props {
  title?: string
  content?: string
  children?: React.ReactNode
  img?: string
}

export function DefaultLayoutPopUp({ title, children, content, img }: Props) {
  return (
    <DivPopUp id="popUp">
      <DivContentPopUp>
        {img && <ImgPopUp src={img} alt="Cadastrado com sucesso" />}
        {title && <TitlePopUp>{title}</TitlePopUp>}
        {content && <ContentPopUp>{content}</ContentPopUp>}
        {children}
      </DivContentPopUp>
    </DivPopUp>
  )
}
