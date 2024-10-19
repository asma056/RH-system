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
import { StocksList, StockListProps } from './stockItems'
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
import { getAllStock, DeleteStock} from '../../services/Stock'




const EquipList = ({
  id,
  name,
  description,
  isInOrder,
  isChecked,
  handleEquipSelection 
}: StockListProps & {
  isChecked: boolean
  handleEquipSelection: (idSelected: number) => void

}) => {
  const { setSelectedEmployee } = useSelectedEmployee()
  const { selectedEmployeeId } = useSelectedEmployee()

  const navigate = useNavigate()
  const empId = localStorage.getItem('@3035TECH/userId')
  const role = localStorage.getItem('@3035TECH/role')
  


  return (
    <>
      <td>
      {id}
      </td>
        <td >
        {name}
        </td>
      <td>{description}</td>
      <PositionFuctionColumn>{isInOrder.toString()}</PositionFuctionColumn>
      <td></td>
      <td>
      { ( role != 'EMPLOYEE' ) ? (
        <NavLink to={`edit/${id}`} onClick={() => setSelectedEmployee(id,name)} style={{cursor:'pointer'}}>
        <GrayImg src={EditIcon} className="editIcon" alt="Editar Colaborador" />
        </NavLink>

            ) : (
              <NavLink to={``} style={{cursor:'not-allowed'}} >
              <GrayImg src={EditIcon} className="editIcon" alt="Editar Colaborador" />
              </NavLink>

            )}
      </td>
      <DocumentsBobyTableButtons>
      { (role != 'EMPLOYEE' ) ? (
        <RadioInputButtonDocuments style={{cursor:'pointer'}} type="radio"  checked={isChecked}  onClick={() => handleEquipSelection(id)}  readOnly />
      ) : (
        <RadioInputButtonDocuments style={{cursor:'not-allowed'}} type="radio"  checked={isChecked}    readOnly />
      )}
      </DocumentsBobyTableButtons>
    </>
  );
  }

export function Stock() {
  const { setPageTitle, setPageImage } = useContext(PageContext)
  const [search, setSearch] = useState('')
  const [situation, setSituation] = useState('Todos')
  const [ListStock, setListStock] = useState(StocksList)
  const [filteredStock, setFilteredStock] = useState(StocksList)
  const [employeesView, setEmployeesView] = useState(true)
  const { selectedEmployeeId, clearSelectedEmployee } = useSelectedEmployee()
  const [showPopupDelete, setShowPopupDelete] = useState(false)
  const [showPopupDeleteSucess, setShowPopupDeleteSuccess] = useState(false)
  const [showPopupDeleteerror, setShowPopupDeleteerror] = useState(false)
  const [selectedEquipIds, setselectedEquipIds] = useState<string[]>([])
  const [IsDeleted, setIsDeleted] = useState(false)
  const role = localStorage.getItem('@3035TECH/role')

  useEffect(() => {
    setPageTitle('Estoque')
    setPageImage(pageIcon)
    clearSelectedEmployee()


  }, [])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllStock();
  
        if (!response) {
          console.log('Error: No response');
        } else {
          const data = response
          console.log(data)
          setListStock(data.results) 
          setFilteredStock(data.results)
  
        }
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };
  
    fetchData();
  }, [IsDeleted,employeesView]);


  useEffect(() => {
    const filteredData = filteredStock.filter((item) => {
      const NameMatch = item.name.toLowerCase().includes(
        search.toLowerCase()
      )
      return NameMatch 
    }).sort((a, b) => {
      return a.name.localeCompare(b.name)
    })
    setListStock(filteredData)
    if( search == ''){
      setListStock(filteredStock)

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
    const response = await DeleteStock(selectedEquipIds);
      if(response.message == "Successfully deleted equipment"){
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
  
    const handleEquipSelection = (id: number) => {
      if (selectedEquipIds.includes(id.toString())) {
        // Si le document est déjà sélectionné, déselectionnez-le
        setselectedEquipIds([]);
      } else {
        // Sinon, déselectionnez tous les autres documents et sélectionnez celui-ci
        setselectedEquipIds([id.toString()]);
      }
    }

  const changeEmployeesView = () => setEmployeesView(!employeesView)

  const tableHeader = () => (
    <tr>
      <SituationHeadTable>

        <CustomSelectInput
          id="selectEmployeeSituation"
          options={[
           
          ]}
          text={'ID'}
          readonly
          data={''}
          setData={setSituation}
          required={false}
          textArrow
          inputArrow={false}
        />
      </SituationHeadTable>
      <th>Name</th>
      <th>Desciption</th>
      <th>isInOrder</th>
      <th></th>
      <th>Editar</th>
      <th>
        <button
          type="submit"
          onClick={handleDelete}
          disabled={selectedEquipIds.length === 0}
          style={{background:'none',border:0 ,padding: 0,
          margin:0
              }}
        >
          <DocumentsIcons
            disabled={selectedEquipIds.length === 0}
            src={deleteImg}
            alt="excluir os arquivos"
          />
        </button>
      </th>
    </tr>
  )


  const rows = ListStock
  .map((equip) => ({
    id: equip.id,
    content: <EquipList key={equip.id} {...equip} 
    isChecked= {selectedEquipIds.includes(equip.id.toString())}
    handleEquipSelection={handleEquipSelection}
/>
  }))


  const rowsWithOrder = employeesView ? rows : rows.reverse()

  return (
    <>
    <EmployeesContainer>
      <EmployeesHeader>
        <NavigationContainer>
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
              text="Novo Equipement"
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
