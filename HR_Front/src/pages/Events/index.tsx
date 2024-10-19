import { useEffect, useState } from 'react'
import { usePageContext } from '../../contexts/pageName'
import pageIcon from '../../assets/icons/events.svg'
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
import { getAllEvents } from '../../services/Events'
import { DateFrom } from '../../functions/ConvertirDate'

export function Events() {
  const { setPageTitle, setPageImage } = usePageContext()
  const role = localStorage.getItem('@3035TECH/role')

  const [ListEvents, setListEvents] = useState<any>([])

  useEffect(() => {
    setPageTitle('Eventos')
    setPageImage(pageIcon)
  }, [])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllEvents();
  
        if (!response) {
          console.log('Error: No response');
        } else {
          const data = response
          console.log(data)
          setListEvents(data.results) 
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
  const groupedEvents = chunkArray(ListEvents, 2)

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
              text="New Event"
              id="buttonNewEmployeePage"
              className="new-employee-button"
              invertColor
              cancelColor={false}
            />
            </NavLink>
    )}
          

      </Container>
    </EmployeesHeader>

      <div className="events-container">
        {groupedEvents.map((group: any[], index: number) => (
          <div key={index} className="events-row">
            {group.map((event: any, eventIndex: number) => (
              <div key={eventIndex} className="event-card">
                <img src={pageIcon} alt={event.name} />
                <h2>{event.name}</h2>
                <p>Date: {DateFrom(event.date)} {event.time}</p>
                <p>Description: {event.description}</p>
              </div>
            ))}
          </div>
        ))}
      </div>    
    </EmployeesContainer>

  )
}
