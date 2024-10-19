import styled from 'styled-components'

interface ButtonProps {
  invertColor: boolean
  cancelColor: boolean
}

export const Mybutton = styled.button<ButtonProps>`
  width: 100%;
  border-radius: 40px;
  border: 1px solid var(--purple);
  outline: none;
  font-weight: 600;
  font-size: var(--fontsize-title);
  padding: 1.5rem 0;
  text-align: center;
  letter-spacing: 1.25px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    filter: var(--filter-white);
  }

  ${({ invertColor, cancelColor }) => {
    if (invertColor) {
      if (cancelColor) {
        return `
        background-color: var(--red);
        color: var(--white);
        border: 1px solid var(--red);
        `
      }
      return `
        background-color: var(--purple);
        color: var(--white);
        border: 1px solid var(--purple);
        `
    }
    return `
      background-color: var(--white);
      color: var(--purple);
      border: 1px solid var(--purple);
      img { 
        filter: var(--filter-purple);
      }
      `
  }}

  &:hover {
    ${({ invertColor, cancelColor }) => {
      if (invertColor) {
        if (cancelColor) {
          return `
          background-color: var(--white);
          color: var(--red);
          border: 1px solid var(--red);
          `
        }
        return `
          background-color: var(--white);
          color: var(--purple);
          border: 1px solid var(--purple);
          img { 
            filter: var(--filter-purple);
          }
          `
      }
      return `
        background-color: var(--purple);
        color: var(--white);
        border: 1px solid var(--purple);
        `
    }}
  }
`
