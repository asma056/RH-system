import { SyntheticEvent } from 'react'
import DatePicker, { CalendarContainer, registerLocale } from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

import { CalendarInput, Container, Label } from './style'

interface InputCalendarProps {
  id: string
  text?: string
  required?: boolean
  value?: string
  date: Date
  error?: boolean
  onChange: (d: Date, event: SyntheticEvent<any, Event> | undefined) => void
}

const MyContainer = ({ children }: any) => {
  return (
    <Container>
      <CalendarContainer>{children}</CalendarContainer>
    </Container>
  )
}

export function Calendar({
  id,
  text,
  required,
  value,
  date,
  error,
  onChange
}: InputCalendarProps) {
  const days = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ]
  registerLocale('pt', {
    match: {
      ordinalNumber: () => '',
      era: () => '',
      quarter: () => '',
      month: () => '',
      day: () => '',
      dayPeriod: () => ''
    },
    localize: {
      day: (n: number) => days[n],
      month: (n: number) => months[n],
      ordinalNumber: (n: number) => `${n}º`,
      era: (n: number) => (n === 1 ? 'DC' : 'AC'),
      quarter: (n: number) => `${n}º trimestre`,
      dayPeriod: (n: number) => (n < 12 ? 'AM' : 'PM')
    },
    formatLong: {
      date: () => 'yyyy-MM-dd',
      time: () => 'HH:mm',
      dateTime: () => 'yyyy-MM-dd HH:mm'
    }
  })
  return (
    <Label id={`label${id}`} htmlFor={id}>
      {text}
      {required && '*'}
      <DatePicker
        id={id}
        locale="pt"
        closeOnScroll={(e) => e.target === document}
        dateFormat="dd/MM/yyyy"
        selected={date}
        onChange={onChange}
        calendarContainer={MyContainer}
        customInput={<CalendarInput error={error} />}
      />
    </Label>
  )
}
