import { NavLink } from 'react-router-dom'
import { Divisor, FisrtElement, InternNavDiv, SecondElement } from './style'

interface Props {
  idFirstPage: string
  idSecondPage: string
  firstPage: string
  firstRoute: string
  secondPage: string
}

export function InternNavigationBar({
  idFirstPage,
  idSecondPage,
  firstPage,
  firstRoute,
  secondPage
}: Props) {
  return (
    <InternNavDiv>
      <NavLink to={firstRoute}>
        <FisrtElement id={idFirstPage}>{firstPage}</FisrtElement>
      </NavLink>
      <Divisor> {' > '} </Divisor>
      <SecondElement id={idSecondPage}>{secondPage}</SecondElement>
    </InternNavDiv>
  )
}
