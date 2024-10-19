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

interface FormViewSalaryEmployeeProps {
  id: number
}

export function FormViewSalaryEmployee({
  id
}: FormViewSalaryEmployeeProps) {
  
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
      <InputGroupTitle text={data.fullName} />
      <Container>
        <InputGroup >
        <div style={{fontSize:'25px'}}>Salary :</div>
        <div style={{fontSize:'35px',fontWeight:'bold',color:'GrayText'}}>{data.salaire} $</div>
        </InputGroup>
      </Container>
    </EmployeesFormBody>
  )
}
