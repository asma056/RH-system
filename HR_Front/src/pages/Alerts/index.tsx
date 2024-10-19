import { useEffect, useState } from 'react'
import { usePageContext } from '../../contexts/pageName'
import pageIcon from '../../assets/icons/alerts.svg'
import icon from '../../assets/img/warning.png'

import {
  Button,
} from '../../components'
import {
  Container,
  DivInput,
  EmployeesContainer,
  EmployeesHeader,
  NavigationContainer,
} from './styles'

import './style.css'
import { NavLink } from 'react-router-dom'
import { getAllAlerts } from '../../services/Alerts'
export function Alerts() {
  const { setPageTitle, setPageImage } = usePageContext()
  const role = localStorage.getItem('@3035TECH/role')
  const [listAlerts, setListAlerts] = useState<any>([])

  useEffect(() => {
    setPageTitle('Alertas')
    setPageImage(pageIcon)
  }, [])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllAlerts();
  
        if (!response) {
          console.log('Error: No response');
        } else {
          const data = response
          console.log(data)
          setListAlerts(data.results) 
        }
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };
  
    fetchData();
  }, []);

  
    // Fonction pour diviser les événements en groupes de deux
    const chunkArray = (array: any[], size: number) => {
      const chunkedArr = []
      for (let i = 0; i < array.length; i += size) {
        chunkedArr.push(array.slice(i, i + size))
      }
      return chunkedArr
    }
  
    // Diviser les événements en groupes de deux
    const groupedEvents = chunkArray(listAlerts, 2)
  return (
    <EmployeesContainer>
    <EmployeesHeader>
      <NavigationContainer>
      </NavigationContainer>
      <Container>
      <DivInput>
        </DivInput>
        { (role != 'EMPLOYEE' ) && (

      <NavLink to="new">
            <Button
              type="button"
              text="New alerts"
              id="buttonNewEmployeePage"
              className="new-employee-button"
              invertColor
              cancelColor={false}
            />
            </NavLink>)}
          

      </Container>
    </EmployeesHeader>

      <div className="events-container">
        {groupedEvents.map((group: any[], index: number) => (
          <div key={index} className="events-row">
            {group.map((event: any, eventIndex: number) => (
              <div key={eventIndex} className="event-card">
                <img src={icon} alt={event.name} style={{width:'50px',height:'50px'}}  />
                <h2>{event.name}</h2>
                <p>{event.description}</p>
              </div>
            ))}
          </div>
        ))}
      </div>    
    </EmployeesContainer>

  )

}
