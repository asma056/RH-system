import { Api } from '..'

export async function getAllVactions(id : number) {

    const token = localStorage.getItem('@3035TECH/key')
  
    const headers = {
      Authorization: `Bearer ${token}`
    }
    const response = await Api.get(`/employee/vacation/listAllVacations/${id}`,{
      headers
    })
  
    return response.data
  }


  export async function createVactions(id : number,startDate: String, endDate: String, status: String) {

    const token = localStorage.getItem('@3035TECH/key')
  
    const headers = {
      Authorization: `Bearer ${token}`
    }
    const response = await Api.patch(`/employee/vacation/create/${id}/${id}`,{
        startDate,
        endDate,
        status},
        {  
      headers
    })
  
    return response.data
  }
  

  export async function getVacation(id : number) {

    const token = localStorage.getItem('@3035TECH/key')
  
    const headers = {
      Authorization: `Bearer ${token}`
    }
    const response = await Api.get(`/employee/vacation/${id}`,{
 
      headers
    })
  
    return response.data
  }
  

  export async function UpdateVacation(id : number, startDate: string, endDate: string, status: string) {

    const token = localStorage.getItem('@3035TECH/key')
  
    const headers = {
      Authorization: `Bearer ${token}`
    }
    const response = await Api.put(`/employee/vacation/update/${id}`,{
      startDate,
      endDate,
      status
    },
    {
 
      headers
    })
  
    return response.data
  }
  