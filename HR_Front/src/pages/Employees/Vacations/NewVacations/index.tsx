import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useSelectedEmployee } from '../../../../contexts/selectedEmployee'
import { PageContext } from '../../../../contexts/pageName'

import getJobFormat from '../../../../functions/getJobFormat'
import alert from '../../../../assets/icons/alert.svg'

import { DefaultLayoutPopUp } from '../../../../layouts/DefaultLayoutPopUp'
import {
  Button,
  Calendar,
  CustomSelectInput,
  Input,
  InternNavigationBar,
  NavigationBar
} from '../../../../components'
import { DivButton } from '../../../../components/Forms/EmployeesForm/styles'
import {
  GetNavigationDropdownMenuItems,
  GetNavigationItemButtonData
} from '../../NavigationEmployees/navigation'

import CheckedIcon from '../../../../assets/icons/checked.svg'
import pageIcon from '../../../../assets/icons/employees.svg'

import { NavigationContainer, OverlayDiv } from '../../styles'
import { EmployeesVacationHeader, VacationEmployeesContainer } from '../style'
import {
  DivButtonSave,
  EmployeesContainerBody,
  FirstDiv,
  Form,
  GridInputDiv,
  Info,
  InfoContainer,
  InfoContainerDiv,
  InputDivForm,
  Label,
  SecondDiv
} from './style'
import { EmployeesList, EmployeesListProps } from '../../employeeItems'
import { createVactions } from '../../../../services/vactions'
import { format } from 'date-fns'

export function NewVacation() {
  const { setPageTitle, setPageImage } = useContext(PageContext)
  const { selectedEmployeeId,selectedEmployeeName } = useSelectedEmployee()
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [situation, setSituation] = useState('Aguardando liberação')
  const [vacationDays, setVacationDays] = useState('')
  const [admissionDate, setAdmissionDate] = useState(new Date())
  const [initVacationPeriod, setInitVacationPeriod] = useState(new Date())
  const [finalVacatioPeriod, setFinalVacationPeriod] = useState(new Date())
  const [employee, setEmployee] = useState<EmployeesListProps | null>(null)
  const [jobFormat, setJobFormat] = useState<null | boolean>(null)
  const [showPopupSuccess, setShowPopupSuccess] = useState(false)
  const [showPopupSave, setShowPopupSave] = useState(false)
  const [showPopupDeleteerror, setShowPopupDeleteerror] = useState(false)

  const navigate = useNavigate()

  const handleCancel = () => {
    navigate(`/employees/vacation/${selectedEmployeeId}`)
  }

  const hidePopupSuccess = () => {
    setShowPopupSuccess(false)
  }
  const hidePopupSave = () => {
    setShowPopupSave(false)
  }
  
  const hidePopupDeleteError = () => {
    setShowPopupDeleteerror(false)
  }

  const handleSaveSuccess = async () => {

    try{
    const response = await createVactions(selectedEmployeeId || 0, format(startDate,'yyyy-MM-dd'),format(endDate,'yyyy-MM-dd') , 'Aguardando liberação') ;

    if(response.message == 'Successfully created period of vacation'){
    setShowPopupSuccess(true)
    setShowPopupSave(false)
    setTimeout(hidePopupSuccess, 3000)
    setTimeout(handleCancel, 3250)
    }
  }
    catch{
      console.log('error')
      setShowPopupDeleteerror(true)
      setTimeout(hidePopupDeleteError, 3000)
      setTimeout(hidePopupSave, 3000)




  
    }
  }

  const handleSave = () => {
    setShowPopupSave(true)
  }

  useEffect(() => {
    setPageTitle('Dados colaboradores')
    setPageImage(pageIcon)
  }, [])

  useEffect(() => {
    const searchEmployee = EmployeesList.find(
      (y) => y.id === selectedEmployeeId
    )
    setEmployee(searchEmployee as EmployeesListProps)
    setJobFormat(getJobFormat(searchEmployee?.jobFormat) || null)
  }, [selectedEmployeeId])

  return (
    <>
      <VacationEmployeesContainer id="newVacationPage">
        <EmployeesVacationHeader>
          <NavigationContainer>
            <NavigationBar
              buttonItems={
                GetNavigationItemButtonData(selectedEmployeeId).items
              }
              id={GetNavigationDropdownMenuItems(selectedEmployeeId).id}
              title={GetNavigationDropdownMenuItems(selectedEmployeeId).title}
              dropdownItems={
                GetNavigationDropdownMenuItems(selectedEmployeeId).items
              }
              activeItemId={
                GetNavigationItemButtonData(selectedEmployeeId).items[3].id
              }
              disableMenu={false}
            />
            <InternNavigationBar
              idFirstPage="NavLinkEmployeesPage"
              firstPage={selectedEmployeeName || ''}
              firstRoute={`/employees/view/${selectedEmployeeId}`}
              secondPage="Férias"
              idSecondPage="EmployeesVacationPage"
            />
          </NavigationContainer>
        </EmployeesVacationHeader>
        <EmployeesContainerBody>
         
          <Form id="NewVacationForm">
            <Calendar
              id="inputStartVacation"
              required
              text="Data início"
              date={startDate}
              value="01/02/2023"
              error={false}
              onChange={(d: Date) => {
                setStartDate(d as Date)
              }}
            />
            <Calendar
              id="inputEndVacation"
              required
              text="Data término"
              date={endDate}
              value="01/02/2023"
              error={false}
              onChange={(d: Date) => {
                setEndDate(d as Date)
              }}
            />
            <CustomSelectInput
              id="inputSituationVacation"
              placeholder="Status do pedido"
              required
              options={[
                {
                  value: 'Aguardando liberação',
                  text: 'Aguardando liberação'
                },
            
              ]}
              text="Status do pedido"
              readonly
              data={situation}
              setData={setSituation}
              textArrow={false}
              inputArrow
            />
          </Form>
          <DivButtonSave>
            <Button
              text="SALVAR"
              id="buttonSaveVacation"
              invertColor={false}
              onClick={handleSave}
              cancelColor={false}
            />
          </DivButtonSave>
        </EmployeesContainerBody>
      </VacationEmployeesContainer>
      {(showPopupSave || showPopupSuccess) && <OverlayDiv />}
      {showPopupSave && (
        <DefaultLayoutPopUp title="Tem certeza que deseja adicionar férias a este colaborador?">
          <DivButton>
            <Button
              text="Confirmar"
              id="ButtonSaveVacation"
              invertColor
              onClick={handleSaveSuccess}
              cancelColor={false}
            />
            <Button
              text="Cancelar"
              id="ButtonCancel"
              invertColor={false}
              onClick={hidePopupSave}
              cancelColor={false}
            />
          </DivButton>
        </DefaultLayoutPopUp>
      )}

      {showPopupSuccess && (
        <DefaultLayoutPopUp
          img={CheckedIcon}
          title="Férias adicionadas com sucesso!"
        />
      )}
       {showPopupDeleteerror && (
        <DefaultLayoutPopUp
          img={alert}
          title="Vactions excluído com error!"
          content=""
        />
      )}
    </>
  )
}
