import { useCallback, useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import { useSelectedEmployee } from '../../contexts/selectedEmployee'
import { PageContext } from '../../contexts/pageName'
import { DivButton } from '../../components/Forms/EmployeesForm/styles'
import { DefaultLayoutPopUp } from '../../layouts/DefaultLayoutPopUp'
import CheckedIcon from '../../assets/icons/checked.svg'
import Table, {
  Button,
  CustomSelectInput,
  Input,
  NavigationBar
} from '../../components'
import { EmployeesList, EmployeesListProps } from './employeeItems'
import {
  GetNavigationItemButtonData,
  GetNavigationDropdownMenuItems
} from './NavigationEmployees/navigation'
import ImgPerfil from '../../assets/img/user.png'
import { DateFrom } from '../../functions/ConvertirDate'
import { format } from 'date-fns'

import SearchIcon from '../../assets/icons/search.svg'
import EditIcon from '../../assets/icons/edit.svg'
import pageIcon from '../../assets/icons/employees.svg'
import ArrowIconDown from '../../assets/icons/angle-down.svg'
import ArrowIconTop from '../../assets/icons/angle-top.svg'
import deleteImg from '../../assets/icons/delete.svg'
import alert from '../../assets/icons/alert.svg'

import { GrayImg } from '../../components/Tables/style'
import { ArrowImg } from '../../components/CustomSelectInput/styles'
import {
  Container,
  DivInput,
  DivTable,
  DocumentsBobyTableButtons,
  DocumentsIcons,
  EmployeesContainer,
  EmployeesHeader,
  EmployeesNameColumn,
  EmployeesPhoto,
  ImgSearch,
  NavigationContainer,
  OverlayDiv,
  PositionDateColumn,
  PositionFuctionColumn,
  RadioInputButtonDocuments,
  RadioInputEmployee,
  SearchButton,
  SituationHeadTable,
  UsernameHeadTable
} from './styles'
import axios from 'axios'
import { DeleteEmploye, getAllEmploye, updateEmployeStatuts } from '../../services/Employee'




const EmployeeList = ({
  id,
  active,
  fullName,
  jobFormat,
  position,
  admissionDate,
  isChecked,
  imgUrl,
  userId,
  handleEmployeSelection 
}: EmployeesListProps & {
  isChecked: boolean
  handleEmployeSelection: (idSelected: number) => void

}) => {
  const { setSelectedEmployee } = useSelectedEmployee()
  const { selectedEmployeeId } = useSelectedEmployee()

  const navigate = useNavigate()
  const [actived,setActived] = useState(active)
  const date = new Date(admissionDate)
  const empId = localStorage.getItem('@3035TECH/userId')
  const role = localStorage.getItem('@3035TECH/role')


  const handleUpdateActive = async (id : number, status: boolean) => {
    try{
    const response = await updateEmployeStatuts(id,status);
      if(response.message == "Successfully updated active"){
        setActived(!actived)
      }
      //console.log('Response:', response.data);
    
    }catch (error) {
      console.error('Error:', error);
      console.log(!actived)
  
      
    };
  
    }


  const handleEmployeeClick = useCallback(() => {
    setSelectedEmployee(id,fullName)
    navigate(`/employees/view/${id}`)
  }, [id, navigate, setSelectedEmployee])

  return (
    <>
      <td>
          { ( role !='EMPLOYEE' ) ? (
               <RadioInputEmployee onClick={() => handleUpdateActive(id,!actived)} type="radio" style={{cursor:'pointer'}} checked={actived} readOnly />
              ) : (
                <RadioInputEmployee  type="radio" style={{cursor:'not-allowed'}} checked={actived} readOnly />
              )}
      </td>
      { ((role === 'EMPLOYEE' && userId === Number(empId)) || role !='EMPLOYEE' ) ? (
        <EmployeesNameColumn onClick={handleEmployeeClick}>
          <EmployeesPhoto src={imgUrl || ImgPerfil} className="userPhoto" alt="Foto do colaborador" />
          {fullName}
        </EmployeesNameColumn>
      ) : (
        <EmployeesNameColumn style={{cursor:'not-allowed'}}>
          <EmployeesPhoto src={imgUrl || ImgPerfil} className="userPhoto" alt="Foto do colaborador" />
          {fullName}
        </EmployeesNameColumn>
      )}
      <td>{jobFormat}</td>
      <PositionFuctionColumn>{position}</PositionFuctionColumn>
      <PositionDateColumn>{format(date, 'dd/MM/yy')}</PositionDateColumn>
      <td>
      { ((role === 'EMPLOYEE' && userId === Number(empId)) || role !='EMPLOYEE' ) ? (
        <NavLink to={`edit/${id}`} onClick={() => setSelectedEmployee(id,fullName)} style={{cursor:'pointer'}}>
        <GrayImg src={EditIcon} className="editIcon" alt="Editar Colaborador" />
        </NavLink>

            ) : (
              <NavLink to={``} style={{cursor:'not-allowed'}} >
              <GrayImg src={EditIcon} className="editIcon" alt="Editar Colaborador" />
              </NavLink>

            )}
      </td>
      <DocumentsBobyTableButtons>
      { ((role === 'EMPLOYEE' && userId === Number(empId)) || role !='EMPLOYEE' ) ? (
        <RadioInputButtonDocuments style={{cursor:'pointer'}} type="radio"  checked={isChecked}  onClick={() => handleEmployeSelection(id)}  readOnly />
      ) : (
        <RadioInputButtonDocuments style={{cursor:'not-allowed'}} type="radio"  checked={isChecked}    readOnly />
      )}
      </DocumentsBobyTableButtons>
    </>
  );
  }

export function Employees() {
  const navigation = useNavigate()
  const { setPageTitle, setPageImage } = useContext(PageContext)
  const [search, setSearch] = useState('')
  const [situation, setSituation] = useState('Todos')
  const [ListEmployee, setListEmployee] = useState(EmployeesList)
  const [filteredEmploye, setFilteredEmploye] = useState(EmployeesList)
  const [employeesView, setEmployeesView] = useState(true)
  const { selectedEmployeeId, clearSelectedEmployee } = useSelectedEmployee()
  const [showPopupDelete, setShowPopupDelete] = useState(false)
  const [showPopupDeleteSucess, setShowPopupDeleteSuccess] = useState(false)
  const [showPopupDeleteerror, setShowPopupDeleteerror] = useState(false)
  const [selectedEmployesIds, setselectedEmployesIds] = useState<string[]>([])
  const [IsDeleted, setIsDeleted] = useState(false)
  const role = localStorage.getItem('@3035TECH/role')

  useEffect(() => {
    setPageTitle('Dados dos Colaboradores')
    setPageImage(pageIcon)
    clearSelectedEmployee()
    console.log('employe id ===>',selectedEmployeeId)


  }, [])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllEmploye();
  
        if (!response) {
          console.log('Error: No response');
        } else {
          const data = response
          console.log(data)
          setListEmployee(data.results) 
          setFilteredEmploye(data.results)
  
        }
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };
  
    fetchData();
  }, [IsDeleted,employeesView,navigation]);


  useEffect(() => {
    const filteredData = filteredEmploye.filter((employee) => {
      const employeeMatch = employee.fullName.toLowerCase().includes(
        search.toLowerCase()
      )
      const jobFormatMatch = employee.jobFormat.toLowerCase().includes(
        search.toLowerCase()
      )
      const fuctionMatch = employee.position.toLowerCase().includes(
        search.toLowerCase()
      )
      return employeeMatch || jobFormatMatch || fuctionMatch
    }).sort((a, b) => {
      return a.fullName.localeCompare(b.fullName)
    })
    setListEmployee(filteredData)
    if( search == ''){
      setListEmployee(filteredEmploye)

    }
  }, [search])

  const hidePopupDelete = () => {
    setShowPopupDelete(false)
  }
  const hidePopupDeleteSuccess = () => {
    setShowPopupDeleteSuccess(false)
  }

  const hidePopupDeleteError = () => {
    setShowPopupDeleteerror(false)
  }

  const handleDelete = () => {
    setShowPopupDelete(true)
  }


  const handleDeleteSuccess = async () => {

    try{
    const response = await DeleteEmploye(selectedEmployesIds);
      if(response.message == "Successfully deleted employee"){
      setShowPopupDeleteSuccess(true)
      setShowPopupDelete(false)
      setTimeout(hidePopupDeleteSuccess, 3000)
      setIsDeleted(true);
  
      }
      //console.log('Response:', response.data);
    
    }catch (error) {
      console.error('Error:', error);
      setShowPopupDeleteerror(true)
      setTimeout(hidePopupDeleteError, 3000)
  
      
    };
  
    }
  
    const handleEmployeSelection = (id: number) => {
      if (selectedEmployesIds.includes(id.toString())) {
        // Si le document est déjà sélectionné, déselectionnez-le
        setselectedEmployesIds([]);
      } else {
        // Sinon, déselectionnez tous les autres documents et sélectionnez celui-ci
        setselectedEmployesIds([id.toString()]);
      }
    }

  const changeEmployeesView = () => setEmployeesView(!employeesView)

  const tableHeader = () => (
    <tr>
      <SituationHeadTable>

        <CustomSelectInput
          id="selectEmployeeSituation"
          options={[
            {
              value: 'Ativos',
              text: 'Ativos'
            },
            {
              value: 'Inativos',
              text: 'Inativos'
            },
            {
              value: 'Todos',
              text: 'Todos'
            }
          ]}
          text={situation}
          readonly
          data={situation}
          setData={setSituation}
          required={false}
          textArrow
          inputArrow={false}
        />
                  <ArrowImg
            src={ArrowIconDown}
          />

      </SituationHeadTable>
      <UsernameHeadTable>
        <button type="button" onClick={changeEmployeesView}>
          Colaborador
          <ArrowImg
            src={employeesView ? ArrowIconDown : ArrowIconTop}
            alt="Vizualizar em ordem crescente/decrescente"
          />
        </button>
      </UsernameHeadTable>
      <th>Formato de trabalho</th>
      <th>position</th>
      <th>Data início Empresa</th>
      <th>Editar</th>
      <th>
        <button
          type="submit"
          onClick={handleDelete}
          disabled={selectedEmployesIds.length === 0}
          style={{background:'none',border:0 ,padding: 0,
          margin:0
              }}
        >
          <DocumentsIcons
            disabled={selectedEmployesIds.length === 0}
            src={deleteImg}
            alt="excluir os arquivos"
          />
        </button>
      </th>
    </tr>
  )


  const rows = ListEmployee
  .filter((employee) => {
    if (situation === 'Ativos') {
      return employee.active
    }
    if (situation === 'Inativos') {
      return !employee.active
    }
    return true
  })
  .map((employee) => ({
    id: employee.id,
    content: <EmployeeList key={employee.id} {...employee} 
    isChecked= {selectedEmployesIds.includes(employee.id.toString())}
    handleEmployeSelection={handleEmployeSelection}
/>
  }))


  const rowsWithOrder = employeesView ? rows : rows.reverse()

  return (
    <>
    <EmployeesContainer>
      <EmployeesHeader>
        <NavigationContainer>
          <NavigationBar
            buttonItems={GetNavigationItemButtonData(selectedEmployeeId).items}
            id={GetNavigationDropdownMenuItems(selectedEmployeeId).id}
            title={GetNavigationDropdownMenuItems(selectedEmployeeId).title}
            dropdownItems={
              GetNavigationDropdownMenuItems(selectedEmployeeId).items
            }
            activeItemId={
              GetNavigationItemButtonData(selectedEmployeeId).items[0].id
            }
            disableMenu
          />
        </NavigationContainer>
        <Container>
          <DivInput>
            <Input
              type="text"
              id="inputSerchEmployees"
              value={search}
              placeholder="Pesquisar colaborador / trabalho / position"
              required={false}
              className="employee-input"
              onChange={(e) => setSearch(e.target.value)}
              
            />
            <SearchButton type="button" id="buttonSearchEmployee">
              <ImgSearch src={SearchIcon} alt="Ícone de pesquisar" />
            </SearchButton>
          </DivInput>
          { (role != 'EMPLOYEE' ) && (
            
          <NavLink to="new">
            <Button
              type="button"
              text="NOVO COLABORADOR"
              id="buttonNewEmployeePage"
              className="new-employee-button"
              invertColor
              cancelColor={false}
            />
            </NavLink>)}

        </Container>
      </EmployeesHeader>
      <DivTable>
        <Table
          idTable="employeeTable"
          rowRenderer={rowsWithOrder}
          headerRenderer={tableHeader}
          pageSize={10}
        />
      </DivTable>
    </EmployeesContainer>

      {(showPopupDelete || showPopupDeleteSucess ) && (
               <OverlayDiv />
      )}
{showPopupDelete && (
  <DefaultLayoutPopUp title="Tem certeza que deseja excluir este employee ?">
    <DivButton>
      <Button
        text="Excluir"
        id="ButtonDeleteUser"
        invertColor
        onClick={handleDeleteSuccess}
        cancelColor
      />
      <Button
        text="Cancelar"
        id="ButtonCancelDeleteEditUser"
        invertColor={false}
        onClick={hidePopupDelete}
        cancelColor={false}
      />
    </DivButton>
  </DefaultLayoutPopUp>
)}

{showPopupDeleteSucess && (
  <DefaultLayoutPopUp
    img={CheckedIcon}
    title="Employee excluído com sucesso!"
    content=""
  />
)}
{showPopupDeleteerror && (
  <DefaultLayoutPopUp
    img={alert}
    title="Employee excluído com error!"
    content=""
  />
)}
</>
  )
}
