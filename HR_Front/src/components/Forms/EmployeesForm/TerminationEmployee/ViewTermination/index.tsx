import { NavLink } from 'react-router-dom'

import { InputGroupTitle, EditButton } from '../../../..'
import EditIcon from '../../../../../assets/icons/edit.svg'

import { InputDisabled } from '../Components/InputDisabled'

import { Container, EditButtonContainer, InputGroup } from './style'
import { EmployeesFormBody } from '../../styles'

import { ProfessionalData } from '../../data/input'
import { SelectWorkFormatData } from '../../data/select'
import { useEffect, useState } from 'react'
import { getEmploye } from '../../../../../services/Employee'
import { EmployeesList } from '../../../../../pages/Employees/employeeItems'
import { DateFrom } from '../../../../../functions/ConvertirDate'

interface FormViewTerminationEmployeeProps {
  id: number
}

export function FormViewTerminationEmployee({
  id
}: FormViewTerminationEmployeeProps) {
  
  const date = new Date()
  const stringDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`
  const selectWorkFormatEmployee = 'CLT'

  const [data,setData]=useState<any>([])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEmploye(id || 0);
  
        if (!response) {
          console.log('Error: No response');
        } else {
          console.log(response)
          setData(response)
        
        }
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };
  
    fetchData();
  }, []);


  return (
    <EmployeesFormBody>
      <InputGroupTitle text="Dados Profissionais" />
      <Container>
        <InputGroup>
          <InputDisabled
            content={DateFrom(data.admissionDate)}
            title={ProfessionalData[0].text}
            required={ProfessionalData[0].required}
          />
          <InputDisabled
            content={data.jobFormat}
            title={SelectWorkFormatData.text}
            required={SelectWorkFormatData.required}
          />
        </InputGroup>
        <InputGroup>
          <InputDisabled
            content={data.corporateEmail}
            title={ProfessionalData[2].text}
            required={ProfessionalData[2].required}
          />
         {/* <EditButtonContainer>
            <NavLink to={`/employees/termination/edit/${id}`}>
              <EditButton
                link={`/employees/termination/edit/${id}`}
                imgSrc={EditIcon}
                imgStyle={{
                  width: '1.125rem',
                  height: '1.125rem',
                  margin: 'auto'
                }}
              />
            </NavLink>
              </EditButtonContainer>*/}
          <InputDisabled
            content={data.notes}
            title={ProfessionalData[6].text}
            required={ProfessionalData[6].required}
          />
        </InputGroup>
      </Container>
    </EmployeesFormBody>
  )
}
