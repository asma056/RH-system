export interface CustomSelectDataProps {
  id: string
  placeholder?: string
  required: boolean
  text?: string
  options: { value: string; text: string }[]
  error?: boolean
}

export const SelectWorkPositionData: CustomSelectDataProps = {
  id: 'inputWorkPositionEmployee',
  required: true,
  placeholder: 'position',
  options: [
    {
      value: 'position 1',
      text: 'position 1'
    },
    {
      value: 'position 2',
      text: 'position 2'
    }
  ],
  error: false
}
export const SelectWorkLevelData: CustomSelectDataProps = {
  id: 'inputWorkLevelEmployee',
  required: true,
  placeholder: 'Nível',
  options: [
    {
      value: 'Nível 1',
      text: 'Nível 1'
    },
    {
      value: 'Nível 2',
      text: 'Nível 2'
    }
  ],
  error: false
}

export const SelectWorkFormatData: CustomSelectDataProps = {
  id: 'selectWorkFormatEmployee',
  placeholder: 'Ex: CLT',
  required: true,
  text: 'Formato de trabalho',
  options: [
    {
      value: 'PJ',
      text: 'PJ'
    },
    {
      value: 'CLT',
      text: 'CLT'
    }
  ],
  error: false
}
