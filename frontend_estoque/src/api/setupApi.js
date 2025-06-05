import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://localhost:22',
    headers: {
    'Content-Type': 'application/json'
  }
})