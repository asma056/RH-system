import styled from 'styled-components'

interface CustomSelectProps {
  error?: boolean
}

export const Label = styled.label`
  position: relative;
  letter-spacing: 0.15px;
  font-size: var(--fontsize-subTitle);
  color: var(--purple);
  margin-bottom: 4rem;
  padding-left: 2rem;
`

export const DropdownContainer = styled.div`
  position: absolute;
  width: 100%;
  z-index: 5;
  cursor: pointer;
  background: var(--white);
  box-shadow: 0px 0px 20px rgba(139, 139, 139, 0.5);
  border-radius: 8px;
`

export const DivSelect = styled.div`
  position: relative;
  display: flex;
  cursor: pointer;

  
`

export const CustomSelect = styled.input<CustomSelectProps>`
  appearance: none;
  width: 100%;
  cursor: pointer;
  border-radius: 40px;
  border: 1px solid var(--gray);
  color: var(--purple);
  outline: none;
  display: block;

  ${({ error }) => error && 'border-color: var(--red);'}

  font-size: var(--fontsize-text);
  padding: 1.2rem 1.6rem;
  text-align: initial;
  letter-spacing: 1.25px;
`

export const SelectIcon = styled.img`
  position: absolute;
  cursor: pointer;
  right: 1.5rem;
  top: 45%;
`

export const OptionList = styled.ul`
  color: var(--purple);
`

export const OptionDropdown = styled.li`
  display: flex;
  padding: 0.5rem 2.5rem;
  text-align: initial;
  list-style: none;
  border-radius: 0.5rem;
  padding: 1.6rem 1.5rem;
  :hover {
    color: var(--white);
    background-color: var(--purple);
  }
`

export const ArrowImg = styled.img`
  width: 1rem;
  margin-left: 0.5rem;
`
