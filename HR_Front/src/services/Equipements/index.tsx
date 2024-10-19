import { Api } from '..'

export async function getAllEquip() {

    const token = localStorage.getItem('@3035TECH/key')
  
    const headers = {
      Authorization: `Bearer ${token}`
    }
    const response = await Api.get(`/equipment/order/all`,{
      headers
    })
  
    return response.data
  }

  export async function getOrderById(
    id: number
  ) {

    const token = localStorage.getItem('@3035TECH/key')
  
    const headers = {
      Authorization: `Bearer ${token}`
    }
    const response = await Api.get(`/equipment/order/${id}`,{
      headers
    })
  
    return response.data
  }


  export async function returnEquipmentOrder(
    id: number
  ) {

    const token = localStorage.getItem('@3035TECH/key')
  
    const headers = {
      Authorization: `Bearer ${token}`
    }
    const response = await Api.patch(`/equipment/order/return`,
    
    {id},
    {
      headers,
    }
    )
  
    return response.data
  }


  export async function updateEquipmentOrder(
    id: number,
    deliveryDate: Date,
    observation: string
  ) {

    const token = localStorage.getItem('@3035TECH/key')
  
    const headers = {
      Authorization: `Bearer ${token}`
    }
    const response = await Api.patch(`/equipment/order/update/${id}`,
    
    {deliveryDate,
      observation
    },
    {
      headers,
    }
    )
  
    return response.data
  }

  export async function NewEquip(
    employeeId: string ,
    name: string,
    equipmentId: string,
    deliveryDate: string,
    file: File[],
    observation: string,
){
    const token = localStorage.getItem('@3035TECH/key')
  
    const formData = new FormData();
    formData.append('employeeId', employeeId);
    formData.append('name', name);
    formData.append('equipmentId', equipmentId);
    formData.append('deliveryDate', deliveryDate);
    formData.append('observation', observation);
    formData.append('file', file[0]);

  
    const response = await Api.post(
      '/equipment/order/create',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
    
          }
        }
    );
  
    return response.data ;
  }


