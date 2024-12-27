import axios from 'axios'

interface TSettings {
  url: string,
  method: 'get' | 'post' | 'put' | 'delete',
  data?: object,
  headers?: any
}

const  API_URL = "http://localhost:3000/api"

export const request = async <T = any> ({ url, method, data }: TSettings): Promise<T> => {
  return await axios[method](`${API_URL}/${url}`, data)
}