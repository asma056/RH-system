import styled from 'styled-components'

interface InputProps {
  error?: boolean
}

export const Container = styled.div`
  width: 14.75rem;
  height: 15.5rem;
  display: block;
  z-index: 10;
  border-radius: 2.5rem;
  box-shadow: 0px 0px 20px 0px rgba(139, 139, 139, 0.5);
  .react-datepicker__navigation {
    top: 1rem;
    .react-datepicker__navigation-icon {
      :before {
        border-color: var(--purple);
        border-width: 0.15rem 0.15rem 0 0;
        width: 0.625rem;
        height: 0.625rem;
        top: 0.4rem;
      }
    }
  }
  .react-datepicker__navigation--previous {
    left: 1.4rem;
  }
  .react-datepicker__navigation--next {
    right: -1rem;
  }
  .react-datepicker__month-container,
  .react-datepicker__header {
    position: relative;
    color: var(--purple);
    background-color: var(--white);
    border-color: var(--white);
  }
  .react-datepicker__header {
    position: relative;
    color: var(--purple);
    background-color: var(--white);
    padding: 0;
  }
  .react-datepicker__current-month {
    margin: 0.5rem;
    color: var(--purple);
    font-size: var(--fontsize-text);
  }
  .react-datepicker__day-name {
    color: var(--purple);
    font-size: 0.8125rem;
  }
  .react-datepicker__month-container {
    padding: 0.5rem 1rem;
    display: block;
    border-radius: 2.5rem;
    box-shadow: 0px 0px 20px 0px rgba(139, 139, 139, 0.5);
  }
  .react-datepicker__day {
    color: var(--black);
    font-size: 0.6875rem;
  }
  .react-datepicker__day--outside-month {
    color: var(--gray);
  }
  .react-datepicker__day--keyboard-selected,
  .react-datepicker__day--selected {
    background-color: var(--purple);
    color: var(--white);
  }
`

export const Label = styled.label`
  letter-spacing: 0.15px;
  font-size: var(--fontsize-text);
  color: var(--purple);
  margin-bottom: 4rem;
  padding-left: 2rem;
  display: flex;
  flex-direction: column;
`

export const CalendarInput = styled.input<InputProps>`
  width: 100%;
  background-color: var(--white);
  border: 1px solid;
  border-color: var(--gray);
  border-radius: 2.5rem;
  color: var(--purple);
  outline: none;
  display: block;

  font-size: var(--fontsize-text);
  padding: 1.2rem 1.6rem;
  text-align: initial;
  letter-spacing: 1.25px;

  &::placeholder {
    font-size: 0.8rem;
    padding: 2rem 0.5rem;
    text-align: initial;
    letter-spacing: 1.25px;
    opacity: 0.5;
  }
  ${({ error }) => error && 'border-color: var(--red)'}
`
