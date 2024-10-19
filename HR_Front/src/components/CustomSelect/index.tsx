import { useComponentVisible } from '../../functions/useComponentVisible'

import AngleDown from '../../assets/icons/angle-down.svg'

import {
  DivSelect,
  DropdownContainer,
  CustomSelect,
  OptionDropdown,
  OptionList,
  Label,
  ArrowImg,
  SelectIcon
} from './styles'

export interface CustomSelectProps {
  required: boolean
  id: string
  placeholder?: string
  text?: string
  textArrow: boolean
  inputArrow: boolean
  readonly: boolean
  options: {
    id: string
    name: string
    description: string
    isInOrder: boolean
  }[]
  data: string
  setData: (value: string) => void
  setId: (value: string) => void

  error?: boolean
}

export function CustomSelectInput1({
  required,
  id,
  placeholder,
  text,
  textArrow,
  inputArrow,
  options,
  readonly,
  data,
  setData,
  setId,
  error
}: CustomSelectProps) {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible<HTMLLabelElement>(false)
  const toggleDropdown = () => {
    setIsComponentVisible(!isComponentVisible)
  }

  return (
    <Label id={`label${id}`} htmlFor={id} ref={ref}>
      {text}
     
      {required && <span>*</span>}
      <DivSelect>
        <CustomSelect
          id={id}
          placeholder={placeholder}
          onClick={toggleDropdown}
          required={required}
          value={data}
          readOnly={readonly}
          error={error}
        />
        {inputArrow && <SelectIcon src={AngleDown} alt="Seta para baixo" />}
      </DivSelect>
      {isComponentVisible && (
        <DropdownContainer>
          <OptionList>
            {options.map((option) => (
              ( !option.isInOrder && 
              <OptionDropdown
                key={option.name}
                value={option.name}
                onClick={(evt) => {
                  evt.preventDefault()
                  evt.stopPropagation()
                  setData(option.name)
                  setId(option.id)
                  setIsComponentVisible(false)
                }}
              >
                {option.name}
              </OptionDropdown>)
            ))}
          </OptionList>
        </DropdownContainer>
      )}
    </Label>
  )
}
