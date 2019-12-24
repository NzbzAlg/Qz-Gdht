import axios from 'axios'

let server = axios.create({
  baseURL: '',
})

server.interceptors.