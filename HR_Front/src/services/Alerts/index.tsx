import { Api } from '..'

export async function getAllAlerts() {

    const token = localStorage.getItem('@3035TECH/key')
  
    const headers = {
      Authorization: `Bearer ${token}`
    }
    const response = await Api.get(`/alerts/all`,{
      headers
    })
  
    return response.data
  }


  export async function NewAlerts(
    name: string,
    description: string,
){
    const token = localStorage.getItem('@3035TECH/key')
  
    const headers = {
      Authorization: `Bearer ${token}`
    }
    const response = await Api.post(
      '/alerts/create',
      {
        name,
        description,
      },
      {headers}
    );
  
    return response.data ;
  }


