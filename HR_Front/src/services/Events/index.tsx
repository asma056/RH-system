import { Api } from '..'

export async function getAllEvents() {

    const token = localStorage.getItem('@3035TECH/key')
  
    const headers = {
      Authorization: `Bearer ${token}`
    }
    const response = await Api.get(`/events/all`,{
      headers
    })
  
    return response.data
  }


  export async function NewEvent(
    name: string,
    description: string,
    date: string,
    time: string
){
    const token = localStorage.getItem('@3035TECH/key')
  
    const headers = {
      Authorization: `Bearer ${token}`
    }
    const response = await Api.post(
      '/events/create',
      {
        name,
        description,
        date,
        time
      },
      {headers}
    );
  
    return response.data ;
  }


