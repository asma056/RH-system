import axios from 'axios';
import { Api, ApiCep } from '..'

export async function postNewEmployee(
  fullName: string,
  dateOfBirth: string,
  position: string,
  level: string,
  rg: string,
  cpf: string,
  uf: string,
  emissionAgency: string,
  emissionDate: string,
  mothersName: string,
  jobFormat: string,
  admissionDate: string,
  pisNumber: string  ,
  personalEmail: string,
  corporateEmail: string,
  phone: string,
  notes: string,
  salaire: string,
  profileImage: File,
  address: {
    street: string,
    number: number,
    neighborhood: string,
    cep: string,
    city: string,
    state: string
  }

) {

  const token = localStorage.getItem('@3035TECH/key')


console.log("en api ==>",profileImage)


  const formData = new FormData();
  formData.append('fullName', fullName);
  formData.append('dateOfBirth', dateOfBirth);
  formData.append('position', position);
  formData.append('level', level);
  formData.append('rg', rg);
  formData.append('cpf', cpf);
  formData.append('uf', uf);
  formData.append('emissionAgency', emissionAgency);
  formData.append('emissionDate', emissionDate);
  formData.append('mothersName', mothersName);
  formData.append('jobFormat', jobFormat);
  formData.append('admissionDate', admissionDate);
  formData.append('pisNumber', pisNumber);
  formData.append('personalEmail', personalEmail);
  formData.append('corporateEmail', corporateEmail);
  formData.append('phone', phone);
  formData.append('notes', notes);
  formData.append('salaire', salaire);
  formData.append('address[street]', address.street);
  formData.append('address[number]', address.number.toString());
  formData.append('address[neighborhood]', address.neighborhood);
  formData.append('address[cep]', address.cep);
  formData.append('address[city]', address.city);
  formData.append('address[state]', address.state);
  formData.append('file', profileImage);
  

  





  
  const response = await axios.post(
    'http://localhost:3000/employee/create',
    
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,

      }
    }

  )
  return response.data
}








export async function postEditEmployee(
  id:number,
  fullName: string,
  position: string,
  level: string,
  jobFormat: string,
  admissionDate: string,
  pisNumber: string,
  phone: string,
  notes: string,
  salaire: string,
  img: string,

) {

  const token = localStorage.getItem('@3035TECH/key')

  const headers = {
    Authorization: `Bearer ${token}`
  }



  const formData = new FormData();
  formData.append('fullName', fullName);
  formData.append('position', position);
  formData.append('level', level);
  formData.append('jobFormat', jobFormat);
  formData.append('admissionDate', admissionDate);
  formData.append('pisNumber', pisNumber);
  formData.append('phone', phone);
  formData.append('notes', notes);
  formData.append('salaire', salaire);
  if(img){
    formData.append('file', img);
  }



  const response = await Api.patch(
    `/employee/update/${id}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,

      }
    }

  )
  return response.data
}





export async function getEmploye(id: number){
  const token = localStorage.getItem('@3035TECH/key')

  const headers = {
    Authorization: `Bearer ${token}`
  }

  const response = await Api.get(
    `/employee/${id}`,
    {headers}
  );

  return response.data ;
}


export async function DeleteEmploye(id: string[]){
  const token = localStorage.getItem('@3035TECH/key')

  const headers = {
    Authorization: `Bearer ${token}`
  }
  const response = await Api.delete(
    `/employee/delete/${id}`,
    {headers}
  );

  return response.data ;
}


export async function getAllEmploye(){
  const token = localStorage.getItem('@3035TECH/key')

  const headers = {
    Authorization: `Bearer ${token}`
  }
  const response = await Api.get(
    '/employee/all',
    {headers}
  );

  return response.data ;
}


export async function updateEmployeStatuts(id: number,active: boolean){
  const token = localStorage.getItem('@3035TECH/key')

  const headers = {
    Authorization: `Bearer ${token}`
  }
  const response = await Api.patch(
    `/employee/update/active/${id}`,
    
    {
      active
    },
    {headers}
  );

  return response.data ;
}













export async function getEmployeeCep(cep: string) {
  const response = await ApiCep.get(`${cep}/json`)

  return response
}
