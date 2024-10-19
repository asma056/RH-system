import { NavLink } from 'react-router-dom'
import { CSSProperties } from 'react'

import { Mybutton } from './style'

interface Props {
  link: string
  imgSrc?: string
  imgStyle?: CSSProperties
}

export function EditButton({ link, imgSrc, imgStyle }: Props) {
  return (
    <Mybutton>
      <NavLink to={link} style={imgStyle}>
        {imgSrc && <img src={imgSrc} alt="Ícone de edição" />}
      </NavLink>
    </Mybutton>
  )
}
