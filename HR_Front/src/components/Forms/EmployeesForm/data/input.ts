import { useState, ChangeEvent } from 'react'

export interface InputDataProps {
  style?: any
  type?: 'email' | 'password' | 'text' | 'number' | 'date' | undefined
  id: string
  value: string
  placeholder: string
  required: boolean
  text?: string
  className?: string
  error?: boolean
  characters?: number
}

export const PersonalData: InputDataProps[] = [
  {
    type: 'text' as const,
    id: 'inputNameEmployee',
    value: 'nameEmployee',
    placeholder: 'Maria da Silva de Souza Rodrigues',
    required: true,
    text: 'Nome completo',
    error: false,
    characters: 60
  },
  {
    type: 'date' as const,
    id: 'inputBirthEmployee',
    value: 'birthEmployee',
    placeholder: '00/00/0000',
    required: true,
    text: 'Data de nascimento',
    error: false
  },
  {
    type: 'text' as const,
    id: 'inputRgEmployee',
    value: 'rgEmployee',
    placeholder: '0000000000',
    required: true,
    text: 'RG',
    error: false,
    characters: 12
  },
  {
    type: 'text' as const,
    id: 'inputCpfEmployee',
    value: 'cpfEmployee',
    placeholder: '000.000.000-00',
    required: true,
    text: 'CPF',
    error: false,
    characters: 11
  },
  {
    type: 'text' as const,
    id: 'inputUfEmployee',
    value: 'ufEmployee',
    placeholder: 'RS',
    required: true,
    text: 'UF',
    error: false,
    characters: 2
  },
  {
    type: 'text' as const,
    id: 'inputOeEmployee',
    value: 'oeEmployee',
    placeholder: 'SSP',
    required: true,
    text: 'Órgão expedidor',
    error: false,
    characters: 5
  },
  {
    type: 'date' as const,
    id: 'inputIssueDateEmployee',
    value: 'issueDateEmployee',
    placeholder: '00/00/0000',
    required: true,
    text: 'Data de emissão',
    error: false
  },
  {
    type: 'text' as const,
    id: 'inputMotherNameEmployee',
    value: 'motherNameEmployee',
    placeholder: 'Maria da Silva',
    required: true,
    text: 'Nome da mãe',
    error: false,
    characters: 60
  },
  {
    type: 'email' as const,
    id: 'inputPersonalEmailEmployee',
    value: 'personalEmailEmployee',
    placeholder: 'maria@gmail.com',
    required: false,
    text: 'E-mail pessoal',
    error: false,
    characters: 60
  },
  {
    type: 'text' as const,
    id: 'inputPhoneEmployee',
    value: 'phoneEmployee',
    placeholder: '(00) 00000-0000',
    required: false,
    text: 'Telefone',
    error: false,
    characters: 15
  }
]

export const AddressData: InputDataProps[] = [
  {
    type: 'text' as const,
    id: 'inputCepEmployee',
    value: 'cepEmployee',
    placeholder: '00000000',
    required: false,
    text: 'CEP',
    error: false,
    characters: 9
  },
  {
    type: 'text' as const,
    id: 'inputNeighborhoodEmployee',
    value: 'neighborhoodEmployee',
    placeholder: 'Ex: Jardim das Flores',
    required: false,
    text: 'Bairro',
    error: false,
    characters: 40
  },
  {
    type: 'text' as const,
    id: 'inputAddressEmployee',
    value: 'addressEmployee',
    placeholder: 'Ex: Rua das Flores',
    required: false,
    text: 'Endereço',
    error: false,
    characters: 60
  },
  {
    type: 'number' as const,
    id: 'inputNumberEmployee',
    value: 'numberEmployee',
    placeholder: 'Ex: 123',
    required: false,
    text: 'Número',
    error: false,
    characters: 10
  },
  {
    type: 'text' as const,
    id: 'inputCityEmployee',
    value: 'cityEmployee',
    placeholder: 'Ex: Porto Alegre',
    required: false,
    text: 'Cidade',
    error: false,
    characters: 60
  },
  {
    type: 'text' as const,
    id: 'inputStateEmployee',
    value: 'stateEmployee',
    placeholder: 'Ex: Rio Grande do Sul',
    required: false,
    text: 'Estado',
    error: false,
    characters: 60
  }
]

export const ProfessionalData: InputDataProps[] = [
  {
    type: 'date' as const,
    id: 'inputAdmissionDateEmployee',
    value: 'admissionDateEmployee',
    placeholder: '00/00/0000',
    required: true,
    text: 'Data de início',
    error: false
  },
  {
    type: 'text' as const,
    id: 'inputCtpsEmployee',
    value: 'ctpsEmployee',
    placeholder: '000000000000',
    required: false,
    text: 'Nº PIS/NIS/NIT',
    error: false,
    characters: 20
  },
  {
    type: 'email' as const,
    id: 'inputWorkEmailEmployee',
    value: 'workEmailEmployee',
    placeholder: 'maria@3035tech.com',
    required: false,
    text: 'E-mail corporativo',
    error: false,
    characters: 50
  },
  {
    type: 'text' as const,
    id: 'inputSalaireEmployee',
    value: 'SalaireEmployee',
    placeholder: '$0000',
    required: false,
    text: 'Salaire',
    error: false,
    characters: 60
  },
  {
    type: 'text' as const,
    id: 'inputObservationEmployee',
    value: 'observationEmployee',
    placeholder: 'Ex: Maria é uma pessoa muito dedicada e esforçada.',
    required: false,
    text: 'Observações',
    error: false
  },
  {
    type: 'date' as const,
    id: 'inputDismissedDateEmployee',
    value: 'dismissedDateEmployee',
    placeholder: '00/00/0000',
    required: false,
    text: 'Data de desligamento',
    error: false
  },
  {
    type: 'text' as const,
    id: 'inputDismissalObservationEmployee',
    value: 'DismissalObservationEmployee',
    placeholder: 'xxxxxxxxxxxxxxxxxx',
    required: false,
    text: 'Observações',
    error: false
  }
]

export const usePersonalData = () => {
  const [personalData, setPersonalData] = useState<{ [key: string]: string }>(
    PersonalData.reduce((acc, cur) => {
      acc[cur.id] = ''
      return acc
    }, {} as { [key: string]: string })
  )

  const handlePersonalDataChange = (
    e: ChangeEvent<HTMLInputElement> | Date,
    id: string
  ) => {
    if (e instanceof Date) {
      setPersonalData((prevData) => ({
        ...prevData,
        [id]: e.toLocaleDateString('pt-BR')
      }))
    } else {
      const { value } = e.target
      setPersonalData((prevData) => ({
        ...prevData,
        [id]: value
      }))
    }
  }

  return { personalData, handlePersonalDataChange }
}

export const useAddressData = () => {
  const [addressData, setAddressData] = useState<{ [key: string]: string }>(
    AddressData.reduce((acc, cur) => {
      acc[cur.id] = ''
      return acc
    }, {} as { [key: string]: string })
  )

  const handleAddressDataChange = (
    e: ChangeEvent<HTMLInputElement> | Date,
    id: string
  ) => {
    if (e instanceof Date) {
      setAddressData((prevData) => ({
        ...prevData,
        [id]: e.toLocaleDateString('pt-BR')
      }))
    } else {
      const { value } = e.target
      setAddressData((prevData) => ({
        ...prevData,
        [id]: value
      }))
    }
  }

  const handleAddressDataCep = (id: string, apiResponse: string) => {
    setAddressData((prevData) => ({
      ...prevData,
      [id]: apiResponse
    }))
  }

  return { addressData, handleAddressDataChange, handleAddressDataCep }
}

export const useProfessionalData = () => {
  const [professionalData, setProfessionalData] = useState<{
    [key: string]: string
  }>(
    ProfessionalData.reduce((acc, cur) => {
      acc[cur.id] = ''
      return acc
    }, {} as { [key: string]: string })
  )

  const handleProfessionalDataChange = (
    e: ChangeEvent<HTMLInputElement> | Date,
    id: string
  ) => {
    if (e instanceof Date) {
      setProfessionalData((prevData) => ({
        ...prevData,
        [id]: e.toLocaleDateString('pt-BR')
      }))
    } else {
      const { value } = e.target
      setProfessionalData((prevData) => ({
        ...prevData,
        [id]: value
      }))
    }
  }

  return { professionalData, handleProfessionalDataChange }
}
