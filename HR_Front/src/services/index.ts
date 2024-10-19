import axios from 'axios'
import urls from './urls'

export const Api = axios.create({
  baseURL: urls.baseUrl,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',    
    
  }
})

export const ApiCep = axios.create({
  baseURL: 'https://viacep.com.br/ws',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})
