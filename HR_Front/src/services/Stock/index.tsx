import { Api } from '..'

export async function getAllStock() {

    const token = localStorage.getItem('@3035TECH/key')
  
    const headers = {
      Authorization: `Bearer ${token}`
    }
    const response = await Api.get(`/equipment/all`,{
      headers
    })
  
    return response.data
  }

  export async function DeleteStock(id: string[]){
    const token = localStorage.getItem('@3035TECH/key')
  
    const headers = {
      Authorization: `Bearer ${token}`
    }
    const response = await Api.delete(
      `/equipment/${id}`,
      {headers}
    );
  
    return response.data ;
  }


  export async function postNewEquip(
    name: string,
    description: string
){
    const token = localStorage.getItem('@3035TECH/key')
  
    const headers = {
      Authorization: `Bearer ${token}`
    }
    const response = await Api.post(
      '/equipment/create',
      {
        name,
        description
      },
      {headers}
    );
  
    return response.data ;
  }


  export async function UpdateEquip(
    id: string,
    name: string,
    description: string
){
    const token = localStorage.getItem('@3035TECH/key')
  
    const headers = {
      Authorization: `Bearer ${token}`
    }
    const response = await Api.patch(
      `/equipment/update/${id}`,
      {
        name,
        description
      },
      {headers}
    );
  
    return response.data ;
  }
  
  export async function getEquip(
    id: string,
){
    const token = localStorage.getItem('@3035TECH/key')
  
    const headers = {
      Authorization: `Bearer ${token}`
    }
    const response = await Api.get(
      `/equipment/${id}`,
      {headers}
    );
  
    return response.data ;
  }
