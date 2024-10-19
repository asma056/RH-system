import { NavLink } from 'react-router-dom'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'

import {
  DivTable,
  EmployeesEquipmentsBody,
  InformLink,
  InputGroupTitleWrapper,
  InputGroupTitle,
  TableCell,
  TableColumnHeader
} from './styles'

import { IconImage } from '../styles'

import { BottomButton } from '../../ViewEmployee/styles'

import AddIcon from '../../../../../assets/icons/plus.svg'
import PdfIcon from '../../../../../assets/icons/pdfIcon.svg'
import EditIcon from '../../../../../assets/icons/edit.svg'


import Table from '../../../../Tables'

import { equipmentsList, EquipmentsListProps } from './data/equipmentsList'
import { GrayImg } from '../../../../../components/Tables/style'
import { getAllEquip } from '../../../../../services/Equipements'

interface ViewEquipmentsEmployeeProps {
  id: number
}

function downloadArchive(productId: string, term: string) {
  console.log(productId, term)
}

const EquipmentsList = ({
  id,
  name,
  deliveryDate,
  returnDate,
  document,
  observation,
  equipmentId,
  employeeId
}: EquipmentsListProps) => {
  const delivery = new Date(deliveryDate)
  const devolutionDate = returnDate ? new Date(returnDate) : null
  return (
    <>
      <TableCell>{name}</TableCell>
      <td>{equipmentId}</td>
      <td>
        {deliveryDate ? (
          format(delivery, 'dd/MM/yyyy')
        ) : (
          <InformLink href={`/employees/equipments/delivery/new/${id}`}>
            Informar
          </InformLink>
        )}
      </td>
      <td>
              <IconImage
                key={'doc'}
                src={PdfIcon}
                alt="ícone de arquivo PDF"
                onClick={() => window.open(document, '_blank') }
              />
 
      </td>
      <td>
        {devolutionDate ? (
          format(devolutionDate, 'dd/MM/yyyy')
        ) : (
          <InformLink href={`/employees/equipments/return/new/${id}`}>
            Informar
          </InformLink>
        )}
      </td>
      <td>
        { !devolutionDate ? ( 
            <NavLink to={`/employees/equipments/delivery/edit/${id}`}>
            <GrayImg src={EditIcon} className="editIcon" alt="Editar Colaborador" />
            </NavLink>
          ) : (

            <NavLink to={``}>
            <GrayImg style={{cursor:'not-allowed'}} src={EditIcon} className="editIcon" alt="Editar Colaborador" />
            </NavLink>

          )}
      </td>
    </>
  )
}

export function ViewEquipmentsEmployee({ id }: ViewEquipmentsEmployeeProps) {
  const [listEquip,setListEquip]= useState(equipmentsList)


    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await getAllEquip();
    
          if (!response) {
            console.log('Error: No response');
          } else {
            const data = response
            console.log(data)
            setListEquip(data.results) 
    
          }
        } catch (error) {
          console.error('Error fetching employee data:', error);
        }
      };
    
      fetchData();
    }, []);
  


  const tableHeader = () => (
    <tr>
      <TableColumnHeader>Descrição</TableColumnHeader>
      <TableColumnHeader>ID</TableColumnHeader>
      <TableColumnHeader>Entrega</TableColumnHeader>
      <TableColumnHeader>Termos</TableColumnHeader>
      <TableColumnHeader>Devolução</TableColumnHeader>
      <TableColumnHeader>Edit</TableColumnHeader>
    </tr>
  )

  const rows = listEquip.map((equipment) => ({
    id: equipment.id,
    content: <EquipmentsList key={equipment.id} {...equipment} />
  }))

  return (
    <EmployeesEquipmentsBody>
      <InputGroupTitleWrapper>
        <InputGroupTitle>Empréstimo de equipamento</InputGroupTitle>
        <NavLink to={`/employees/equipments/delivery/new/${id}`}>
          <BottomButton id="ButtonAddEquipment" invertColor={false}>
            <img src={AddIcon} alt="Símbolos de mais" />
            <p>EQUIPAMENTOS</p>
          </BottomButton>
        </NavLink>
      </InputGroupTitleWrapper>
      <DivTable>
        <Table
          idTable="employeeEquipmentsTable"
          rowRenderer={rows}
          headerRenderer={tableHeader}
          pageSize={10}
        />
      </DivTable>
    </EmployeesEquipmentsBody>
  )
}
