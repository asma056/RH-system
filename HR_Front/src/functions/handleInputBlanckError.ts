import { InputDataProps } from '../components/Forms/EmployeesForm/data/input'

export const handleInputBlankError = (
  value: { [key: string]: string },
  inputData: InputDataProps[]
) => {
  let hasError = false
  const object = value
  const arrayValues = Object.values(object)
  const updatedInputData = [...inputData]
  arrayValues.map((item, index) => {
    if (item === '' && updatedInputData[index].required) {
      updatedInputData[index].error = true
      hasError = true
    } else {
      updatedInputData[index].error = false
    }
    return hasError
  })
  return hasError
}
